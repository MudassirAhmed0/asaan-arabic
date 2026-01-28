import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma';
import { StreaksService } from '../streaks/streaks.service';

@Injectable()
export class WordsService {
  constructor(
    private prisma: PrismaService,
    private streaksService: StreaksService,
  ) {}

  async getLearnedWords(
    userId: string,
    search?: string,
    status?: 'LEARNED' | 'NEEDS_REVISION' | 'MASTERED',
  ) {
    const where: any = { userId };

    if (status) {
      where.status = status;
    }

    if (search) {
      where.word = {
        OR: [
          { meaning: { contains: search, mode: 'insensitive' } },
          { transliteration: { contains: search, mode: 'insensitive' } },
        ],
      };
    }

    const [words, totalCount] = await Promise.all([
      this.prisma.wordProgress.findMany({
        where,
        include: {
          word: {
            include: {
              introduction: {
                select: { headline: true, style: true },
              },
            },
          },
        },
        orderBy: { learnedAt: 'desc' },
      }),
      this.prisma.wordProgress.count({ where: { userId } }),
    ]);

    return { words, totalCount };
  }

  async getWordDetail(userId: string, wordId: string) {
    const word = await this.prisma.word.findUnique({
      where: { id: wordId },
      include: {
        introduction: true,
        ayahHighlights: true,
        lesson: { select: { title: true, orderIndex: true } },
      },
    });

    if (!word) {
      throw new NotFoundException('Word not found');
    }

    const progress = await this.prisma.wordProgress.findUnique({
      where: { userId_wordId: { userId, wordId } },
    });

    return {
      ...word,
      progress: progress
        ? {
            status: progress.status,
            timesCorrect: progress.timesCorrect,
            timesIncorrect: progress.timesIncorrect,
            lastReviewedAt: progress.lastReviewedAt,
            learnedAt: progress.learnedAt,
          }
        : null,
    };
  }

  async updateWordStatus(
    userId: string,
    wordId: string,
    status: 'LEARNED' | 'NEEDS_REVISION',
  ) {
    const progress = await this.prisma.wordProgress.findUnique({
      where: { userId_wordId: { userId, wordId } },
    });

    if (!progress) {
      throw new NotFoundException('Word not in your word bank');
    }

    return this.prisma.wordProgress.update({
      where: { userId_wordId: { userId, wordId } },
      data: { status },
      include: { word: true },
    });
  }

  async getPracticeWords(
    userId: string,
    count?: number,
    status?: 'LEARNED' | 'NEEDS_REVISION' | 'MASTERED',
  ) {
    // Always fetch all words for totalLearned count and distractor generation
    const allWordProgresses = await this.prisma.wordProgress.findMany({
      where: { userId },
      include: { word: true },
    });

    const totalLearned = allWordProgresses.length;
    const revisionCount = allWordProgresses.filter(
      (wp) => wp.status === 'NEEDS_REVISION',
    ).length;

    if (totalLearned < 4) {
      return { rounds: [], totalLearned, revisionCount };
    }

    // Apply status filter for word selection
    const wordProgresses = status
      ? allWordProgresses.filter((wp) => wp.status === status)
      : allWordProgresses;

    // Prioritize NEEDS_REVISION words when no filter is applied
    let selected: typeof wordProgresses;
    const limit = count ?? wordProgresses.length;

    if (!status) {
      const revisionWords = wordProgresses.filter(
        (wp) => wp.status === 'NEEDS_REVISION',
      );
      const otherWords = wordProgresses.filter(
        (wp) => wp.status !== 'NEEDS_REVISION',
      );

      // Shuffle both pools
      const shuffledRevision = [...revisionWords].sort(
        () => Math.random() - 0.5,
      );
      const shuffledOther = [...otherWords].sort(() => Math.random() - 0.5);

      // Take revision words first, then fill with others
      selected = [...shuffledRevision, ...shuffledOther].slice(0, limit);
    } else {
      const shuffled = [...wordProgresses].sort(() => Math.random() - 0.5);
      selected = shuffled.slice(0, limit);
    }

    // All meanings for generating distractors (from full pool, not filtered)
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

    return { rounds, totalLearned, revisionCount };
  }

  async recordQuizResults(
    userId: string,
    results: { wordId: string; correct: boolean }[],
  ) {
    const now = new Date();

    for (const result of results) {
      const progress = await this.prisma.wordProgress.findUnique({
        where: { userId_wordId: { userId, wordId: result.wordId } },
      });

      if (!progress) continue;

      let newTimesCorrect = progress.timesCorrect;
      let newTimesIncorrect = progress.timesIncorrect;
      let newStatus = progress.status;

      if (!result.correct) {
        // Wrong answer → flag for revision, reset correct counter
        newTimesIncorrect += 1;
        newTimesCorrect = 0;
        newStatus = 'NEEDS_REVISION';
      } else {
        newTimesCorrect += 1;
        if (
          progress.status === 'NEEDS_REVISION' &&
          newTimesCorrect >= 3
        ) {
          // 3 consecutive correct since being flagged → clear
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
      currentStreak: streak.currentStreak,
      longestStreak: streak.longestStreak,
    };
  }
}
