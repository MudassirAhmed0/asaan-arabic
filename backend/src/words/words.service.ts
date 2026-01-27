import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma';
import { StreaksService } from '../streaks/streaks.service';

@Injectable()
export class WordsService {
  constructor(
    private prisma: PrismaService,
    private streaksService: StreaksService,
  ) {}

  async getReviewWords(userId: string) {
    // Get all words the user has learned
    const wordProgresses = await this.prisma.wordProgress.findMany({
      where: { userId },
      include: {
        word: true,
      },
    });

    if (wordProgresses.length < 2) {
      // Need at least 2 words to generate a quiz
      return { rounds: [], totalLearned: wordProgresses.length };
    }

    // Pick up to 5 random words for the review
    const shuffled = [...wordProgresses].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, Math.min(5, shuffled.length));

    // All meanings for generating distractors
    const allMeanings = wordProgresses.map((wp) => wp.word.meaning);

    const rounds = selected.map((wp) => {
      const correctMeaning = wp.word.meaning;

      // Pick 3 unique wrong meanings
      const wrongMeanings = allMeanings
        .filter((m) => m !== correctMeaning)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);

      // Combine and shuffle options
      const options = [correctMeaning, ...wrongMeanings].sort(
        () => Math.random() - 0.5,
      );

      return {
        arabic: wp.word.arabic,
        transliteration: wp.word.transliteration,
        options,
        correctIndex: options.indexOf(correctMeaning),
      };
    });

    return { rounds, totalLearned: wordProgresses.length };
  }

  async completeReview(userId: string) {
    const streak = await this.streaksService.recordActivity(userId);

    // Update lastActivityAt
    await this.prisma.userProgress.update({
      where: { userId },
      data: { lastActivityAt: new Date() },
    });

    return {
      currentStreak: streak.currentStreak,
      longestStreak: streak.longestStreak,
    };
  }
}
