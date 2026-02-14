import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma';
import { StreaksService } from '../streaks/streaks.service';
import { SubscriptionsService } from '../subscriptions/subscriptions.service';
import { LessonCompleteDto } from './dto/lesson-complete.dto';

@Injectable()
export class LessonsService {
  constructor(
    private prisma: PrismaService,
    private streaksService: StreaksService,
    private subscriptionsService: SubscriptionsService,
  ) {}

  async listLessons(userId: string) {
    const lessons = await this.prisma.lesson.findMany({
      where: { isPublished: true },
      orderBy: { orderIndex: 'asc' },
    });

    const progress = await this.prisma.userProgress.findUnique({
      where: { userId },
    });
    const currentLessonIndex = progress?.currentLessonIndex ?? 1;

    const completedAttempts = await this.prisma.lessonAttempt.findMany({
      where: { userId, completed: true },
      select: { lessonId: true },
    });
    const completedLessonIds = new Set(
      completedAttempts.map((a) => a.lessonId),
    );

    const isPremium = await this.subscriptionsService.isPremium(userId);

    return lessons.map((lesson) => ({
      ...lesson,
      isCompleted: completedLessonIds.has(lesson.id),
      isLocked: lesson.orderIndex > currentLessonIndex,
      premiumTier: this.getLessonTier(lesson.orderIndex),
      isPremiumUser: isPremium,
    }));
  }

  private getLessonTier(
    orderIndex: number,
  ): 'free' | 'taste' | 'premium' {
    if (orderIndex <= 3) return 'free';
    if (orderIndex <= 7) return 'taste';
    return 'premium';
  }

  async getLessonContent(userId: string, lessonId: string) {
    const lesson = await this.prisma.lesson.findUnique({
      where: { id: lessonId },
      include: {
        words: {
          orderBy: { orderIndex: 'asc' },
          include: {
            introduction: true,
            ayahHighlights: true,
          },
        },
        activities: {
          orderBy: { orderIndex: 'asc' },
        },
        midLessonMessage: true,
        arabicInsight: true,
        celebrationStat: true,
      },
    });

    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }

    if (!lesson.isPublished) {
      throw new NotFoundException('Lesson not found');
    }

    // Check if sequence-locked
    const progress = await this.prisma.userProgress.findUnique({
      where: { userId },
    });
    const currentLessonIndex = progress?.currentLessonIndex ?? 1;

    if (lesson.orderIndex > currentLessonIndex) {
      throw new ForbiddenException('Lesson is locked');
    }

    const isPremium = await this.subscriptionsService.isPremium(userId);

    return {
      lesson: {
        id: lesson.id,
        orderIndex: lesson.orderIndex,
        title: lesson.title,
        subtitle: lesson.subtitle,
        wordCount: lesson.wordCount,
        isPublished: lesson.isPublished,
      },
      words: lesson.words,
      activities: lesson.activities,
      midLessonMessage: lesson.midLessonMessage,
      arabicInsight: lesson.arabicInsight,
      celebrationStat: lesson.celebrationStat,
      premiumTier: this.getLessonTier(lesson.orderIndex),
      isPremiumUser: isPremium,
    };
  }

  async startLesson(userId: string, lessonId: string) {
    const lesson = await this.prisma.lesson.findUnique({
      where: { id: lessonId },
    });

    if (!lesson || !lesson.isPublished) {
      throw new NotFoundException('Lesson not found');
    }

    // Check if sequence-locked
    const progress = await this.prisma.userProgress.findUnique({
      where: { userId },
    });
    const currentLessonIndex = progress?.currentLessonIndex ?? 1;

    if (lesson.orderIndex > currentLessonIndex) {
      throw new ForbiddenException('Lesson is locked');
    }

    const attempt = await this.prisma.lessonAttempt.create({
      data: {
        userId,
        lessonId,
      },
    });

    return { attemptId: attempt.id };
  }

  async completeLesson(userId: string, lessonId: string, dto: LessonCompleteDto) {
    const lesson = await this.prisma.lesson.findUnique({
      where: { id: lessonId },
      include: {
        words: { select: { id: true } },
      },
    });

    if (!lesson || !lesson.isPublished) {
      throw new NotFoundException('Lesson not found');
    }

    const attempt = await this.prisma.lessonAttempt.findUnique({
      where: { id: dto.attemptId },
    });

    if (!attempt || attempt.userId !== userId || attempt.lessonId !== lessonId) {
      throw new NotFoundException('Attempt not found');
    }

    const result = await this.prisma.$transaction(async (tx) => {
      // 1. Mark attempt completed
      await tx.lessonAttempt.update({
        where: { id: dto.attemptId },
        data: {
          completed: true,
          score: dto.score,
          completedAt: new Date(),
        },
      });

      // 2. Upsert WordProgress for each word
      for (const word of lesson.words) {
        await tx.wordProgress.upsert({
          where: {
            userId_wordId: { userId, wordId: word.id },
          },
          update: {
            lastReviewedAt: new Date(),
          },
          create: {
            userId,
            wordId: word.id,
            status: 'LEARNED',
          },
        });
      }

      // 3. Count total learned words
      const totalWords = await tx.wordProgress.count({
        where: { userId },
      });

      // 4. Advance currentLessonIndex only if this is the frontier lesson
      const progress = await tx.userProgress.findUnique({
        where: { userId },
      });
      const currentLessonIndex = progress?.currentLessonIndex ?? 1;
      const newLessonIndex =
        lesson.orderIndex === currentLessonIndex
          ? currentLessonIndex + 1
          : currentLessonIndex;

      // 5. Update UserProgress
      await tx.userProgress.upsert({
        where: { userId },
        update: {
          totalWordsLearned: totalWords,
          currentLessonIndex: newLessonIndex,
          lastActivityAt: new Date(),
        },
        create: {
          userId,
          totalWordsLearned: totalWords,
          currentLessonIndex: newLessonIndex,
          lastActivityAt: new Date(),
        },
      });

      return {
        totalWordsLearned: totalWords,
        currentLessonIndex: newLessonIndex,
        wordsInLesson: lesson.words.length,
      };
    });

    // Update streak (outside transaction for isolation)
    const streak = await this.streaksService.recordActivity(userId);

    return {
      ...result,
      currentStreak: streak.currentStreak,
      longestStreak: streak.longestStreak,
    };
  }
}
