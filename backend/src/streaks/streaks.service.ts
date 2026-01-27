import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma';

@Injectable()
export class StreaksService {
  constructor(private prisma: PrismaService) {}

  async getStreak(userId: string) {
    const streak = await this.prisma.streakRecord.findUnique({
      where: { userId },
    });

    return {
      currentStreak: streak?.currentStreak ?? 0,
      longestStreak: streak?.longestStreak ?? 0,
      lastActiveDate: streak?.lastActiveDate ?? null,
    };
  }

  async recordActivity(userId: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existing = await this.prisma.streakRecord.findUnique({
      where: { userId },
    });

    if (!existing) {
      // First activity ever
      return this.prisma.streakRecord.create({
        data: {
          userId,
          currentStreak: 1,
          longestStreak: 1,
          lastActiveDate: today,
        },
      });
    }

    const lastActive = existing.lastActiveDate
      ? new Date(existing.lastActiveDate)
      : null;

    if (lastActive) {
      lastActive.setHours(0, 0, 0, 0);
      const diffMs = today.getTime() - lastActive.getTime();
      const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

      if (diffDays === 0) {
        // Same day — no change
        return existing;
      }

      if (diffDays === 1) {
        // Consecutive day — increment
        const newStreak = existing.currentStreak + 1;
        const newLongest = Math.max(newStreak, existing.longestStreak);
        return this.prisma.streakRecord.update({
          where: { userId },
          data: {
            currentStreak: newStreak,
            longestStreak: newLongest,
            lastActiveDate: today,
          },
        });
      }
    }

    // Gap > 1 day or no lastActive — reset to 1
    return this.prisma.streakRecord.update({
      where: { userId },
      data: {
        currentStreak: 1,
        lastActiveDate: today,
      },
    });
  }
}
