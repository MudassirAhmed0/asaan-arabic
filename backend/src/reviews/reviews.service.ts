import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma';
import { StreaksService } from '../streaks/streaks.service';

@Injectable()
export class ReviewsService {
  constructor(
    private prisma: PrismaService,
    private streaksService: StreaksService,
  ) {}

  private getISOWeek(date: Date): { weekNumber: number; year: number } {
    const d = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
    );
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const weekNumber = Math.ceil(
      ((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7,
    );
    return { weekNumber, year: d.getUTCFullYear() };
  }

  async getCurrentReview(userId: string) {
    const now = new Date();
    // Use PKT (UTC+5)
    const pkt = new Date(now.getTime() + 5 * 60 * 60 * 1000);
    const { weekNumber, year } = this.getISOWeek(pkt);

    // Check if already completed this week
    const existing = await this.prisma.weeklyReview.findUnique({
      where: { userId_weekNumber_year: { userId, weekNumber, year } },
    });

    if (existing) {
      return {
        available: true,
        completed: true,
        score: existing.score,
        totalWords: existing.totalWords,
        completedAt: existing.completedAt.toISOString(),
        weekNumber,
        year,
        rounds: [],
      };
    }

    // Get learned words
    const allWordProgresses = await this.prisma.wordProgress.findMany({
      where: { userId },
      include: { word: true },
    });

    const totalLearned = allWordProgresses.length;

    if (totalLearned < 5) {
      return {
        available: false,
        completed: false,
        weekNumber,
        year,
        rounds: [],
      };
    }

    // Generate quiz rounds (max 20, prioritize revision)
    const revisionWords = allWordProgresses.filter(
      (wp) => wp.status === 'NEEDS_REVISION',
    );
    const otherWords = allWordProgresses.filter(
      (wp) => wp.status !== 'NEEDS_REVISION',
    );

    const shuffledRevision = [...revisionWords].sort(
      () => Math.random() - 0.5,
    );
    const shuffledOther = [...otherWords].sort(() => Math.random() - 0.5);
    const selected = [...shuffledRevision, ...shuffledOther].slice(0, 20);

    const allMeanings = allWordProgresses.map((wp) => wp.word.meaning);

    const rounds = selected.map((wp) => {
      const correctMeaning = wp.word.meaning;
      const wrongMeanings = allMeanings
        .filter((m) => m !== correctMeaning)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);

      const options = [correctMeaning, ...wrongMeanings].sort(
        () => Math.random() - 0.5,
      );

      return {
        wordId: wp.wordId,
        arabic: wp.word.arabic,
        transliteration: wp.word.transliteration,
        meaning: wp.word.meaning,
        options,
        correctIndex: options.indexOf(correctMeaning),
      };
    });

    return {
      available: true,
      completed: false,
      weekNumber,
      year,
      rounds,
    };
  }

  async submitReview(
    userId: string,
    results: { wordId: string; correct: boolean }[],
  ) {
    const now = new Date();
    const pkt = new Date(now.getTime() + 5 * 60 * 60 * 1000);
    const { weekNumber, year } = this.getISOWeek(pkt);

    // Check if already submitted
    const existing = await this.prisma.weeklyReview.findUnique({
      where: { userId_weekNumber_year: { userId, weekNumber, year } },
    });

    if (existing) {
      throw new BadRequestException('Weekly review already completed');
    }

    const score = results.filter((r) => r.correct).length;
    const totalWords = results.length;

    // Save review
    await this.prisma.weeklyReview.create({
      data: { userId, weekNumber, year, score, totalWords },
    });

    // Process word results (same logic as practice quiz)
    const wrongWords: { id: string; arabic: string; meaning: string }[] = [];

    for (const result of results) {
      const progress = await this.prisma.wordProgress.findUnique({
        where: { userId_wordId: { userId, wordId: result.wordId } },
        include: { word: { select: { arabic: true, meaning: true } } },
      });

      if (!progress) continue;

      let newTimesCorrect = progress.timesCorrect;
      let newTimesIncorrect = progress.timesIncorrect;
      let newStatus = progress.status;

      if (!result.correct) {
        newTimesIncorrect += 1;
        newTimesCorrect = 0;
        newStatus = 'NEEDS_REVISION';
        wrongWords.push({
          id: result.wordId,
          arabic: progress.word.arabic,
          meaning: progress.word.meaning,
        });
      } else {
        newTimesCorrect += 1;
        if (progress.status === 'NEEDS_REVISION' && newTimesCorrect >= 3) {
          newStatus = 'LEARNED';
        }
      }

      await this.prisma.wordProgress.update({
        where: { userId_wordId: { userId, wordId: result.wordId } },
        data: {
          timesCorrect: newTimesCorrect,
          timesIncorrect: newTimesIncorrect,
          lastReviewedAt: now,
          status: newStatus,
        },
      });
    }

    // Update streak
    const streak = await this.streaksService.recordActivity(userId);

    // Update lastActivityAt
    await this.prisma.userProgress.update({
      where: { userId },
      data: { lastActivityAt: now },
    });

    return {
      score,
      totalWords,
      wrongWords,
      currentStreak: streak.currentStreak,
      longestStreak: streak.longestStreak,
    };
  }

  async getHistory(userId: string) {
    const reviews = await this.prisma.weeklyReview.findMany({
      where: { userId },
      orderBy: [{ year: 'desc' }, { weekNumber: 'desc' }],
      take: 10,
      select: {
        weekNumber: true,
        year: true,
        score: true,
        totalWords: true,
        completedAt: true,
      },
    });

    return reviews.map((r) => ({
      ...r,
      completedAt: r.completedAt.toISOString(),
    }));
  }
}
