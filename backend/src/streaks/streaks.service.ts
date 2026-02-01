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
    // Use UTC date strings to avoid timezone issues
    const now = new Date();
    const todayStr = now.toISOString().split('T')[0]; // "YYYY-MM-DD"
    const today = new Date(todayStr + 'T00:00:00.000Z');

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

    if (existing.lastActiveDate) {
      const lastStr = existing.lastActiveDate.toISOString().split('T')[0];

      if (lastStr === todayStr) {
        // Same day — no change
        return existing;
      }

      // Check if consecutive day
      const lastDate = new Date(lastStr + 'T00:00:00.000Z');
      const diffMs = today.getTime() - lastDate.getTime();
      const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

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
