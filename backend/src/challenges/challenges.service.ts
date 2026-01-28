import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma';
import { StreaksService } from '../streaks/streaks.service';

@Injectable()
export class ChallengesService {
  constructor(
    private prisma: PrismaService,
    private streaksService: StreaksService,
  ) {}

  async getTodayChallenge(userId: string) {
    // Use PKT (UTC+5) for "today"
    const now = new Date();
    const pkt = new Date(now.getTime() + 5 * 60 * 60 * 1000);
    const today = new Date(pkt.toISOString().split('T')[0] + 'T00:00:00.000Z');

    const challenge = await this.prisma.dailyChallenge.findUnique({
      where: { date: today },
    });

    if (!challenge) {
      return { challenge: null, attempt: null };
    }

    const attempt = await this.prisma.challengeAttempt.findUnique({
      where: { userId_challengeId: { userId, challengeId: challenge.id } },
    });

    return {
      challenge: {
        id: challenge.id,
        date: challenge.date,
        type: challenge.type,
        payload: challenge.payload,
      },
      attempt: attempt
        ? {
            answered: attempt.answered,
            correct: attempt.correct,
            answeredAt: attempt.answeredAt,
          }
        : null,
    };
  }

  async submitAttempt(userId: string, challengeId: string, answer?: number) {
    const challenge = await this.prisma.dailyChallenge.findUnique({
      where: { id: challengeId },
    });

    if (!challenge) {
      throw new NotFoundException('Challenge not found');
    }

    // Check if already answered
    const existing = await this.prisma.challengeAttempt.findUnique({
      where: { userId_challengeId: { userId, challengeId } },
    });

    if (existing?.answered) {
      const streak = await this.streaksService.getStreak(userId);
      return {
        correct: existing.correct,
        currentStreak: streak.currentStreak,
        longestStreak: streak.longestStreak,
      };
    }

    // Determine correctness
    let correct: boolean | null = null;
    const payload = challenge.payload as Record<string, any>;

    if (
      challenge.type === 'MEMORY_TEST' ||
      challenge.type === 'QUICK_QUIZ'
    ) {
      correct = answer === payload.correctIndex;
    }
    // FUN_FACT and WORD_OF_THE_DAY: correct stays null (no right/wrong)

    const now = new Date();

    await this.prisma.challengeAttempt.upsert({
      where: { userId_challengeId: { userId, challengeId } },
      create: {
        userId,
        challengeId,
        answered: true,
        correct,
        answeredAt: now,
      },
      update: {
        answered: true,
        correct,
        answeredAt: now,
      },
    });

    // Update streak
    const streak = await this.streaksService.recordActivity(userId);

    return {
      correct,
      currentStreak: streak.currentStreak,
      longestStreak: streak.longestStreak,
    };
  }

  async getHistory(userId: string) {
    const now = new Date();
    const pkt = new Date(now.getTime() + 5 * 60 * 60 * 1000);
    const today = new Date(pkt.toISOString().split('T')[0] + 'T00:00:00.000Z');

    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);

    const challenges = await this.prisma.dailyChallenge.findMany({
      where: {
        date: { gte: sevenDaysAgo, lte: today },
      },
      orderBy: { date: 'desc' },
    });

    const challengeIds = challenges.map((c) => c.id);

    const attempts = await this.prisma.challengeAttempt.findMany({
      where: {
        userId,
        challengeId: { in: challengeIds },
      },
    });

    const attemptMap = new Map(
      attempts.map((a) => [a.challengeId, a]),
    );

    return challenges.map((c) => {
      const attempt = attemptMap.get(c.id);
      return {
        id: c.id,
        date: c.date,
        type: c.type,
        answered: attempt?.answered ?? false,
        correct: attempt?.correct ?? null,
      };
    });
  }
}
