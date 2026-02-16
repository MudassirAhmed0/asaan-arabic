import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from '../prisma';
import { FirebaseService } from '../firebase/firebase.service';

// ── Copy Templates (variables: {streak}, {words}, {days}) ──

const STREAK_AT_RISK = [
  {
    title: '{streak} days with the Quran.',
    body: "Don't let tonight be the day it stops.",
  },
  {
    title: '{streak} days straight.',
    body: 'It either continues tonight… or it doesn\'t.',
  },
  {
    title: '{streak} days.',
    body: 'You know what to do.',
  },
  {
    title: '{streak} days with the Quran.',
    body: "That's not a streak — that's a habit. Keep it.",
  },
];

const WEEKLY_REVIEW_MISSED = [
  {
    title: 'Do you still remember?',
    body: 'You learned {words} words this week. How many stayed?',
  },
  {
    title: 'You learned it.',
    body: 'But did it stay? Find out in 2 minutes.',
  },
  {
    title: '{words} words this week.',
    body: "How many can you still get right?",
  },
];

const WIN_BACK = [
  {
    title: 'You learned {words} words.',
    body: "They're still yours.",
  },
  {
    title: '{words} words of the Quran.',
    body: 'Pick up where you left off. No need to start over.',
  },
  {
    title: 'Next time you pray…',
    body: "listen closely. You'll understand more than you think.",
  },
];

function pickTemplate(templates: typeof STREAK_AT_RISK): (typeof STREAK_AT_RISK)[0] {
  // Rotate by day of year so same user doesn't get same copy twice in a row
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  return templates[dayOfYear % templates.length];
}

function fillVars(text: string, vars: Record<string, string | number>): string {
  let result = text;
  for (const [key, value] of Object.entries(vars)) {
    result = result.replace(new RegExp(`\\{${key}\\}`, 'g'), String(value));
  }
  return result;
}

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  constructor(
    private prisma: PrismaService,
    private firebase: FirebaseService,
  ) {}

  // ── Token Management ──

  async registerToken(userId: string, token: string, platform: string) {
    await this.prisma.fcmToken.upsert({
      where: { token },
      update: { userId, platform, active: true },
      create: { userId, token, platform },
    });
  }

  async unregisterToken(token: string) {
    await this.prisma.fcmToken.updateMany({
      where: { token },
      data: { active: false },
    });
  }

  async deactivateTokens(tokens: string[]) {
    if (tokens.length === 0) return;
    await this.prisma.fcmToken.updateMany({
      where: { token: { in: tokens } },
      data: { active: false },
    });
  }

  // ── Test ──

  async sendTestNotification() {
    this.logger.log('Sending test notification...');
    const tokens = await this.prisma.fcmToken.findMany({
      where: { active: true },
      select: { token: true },
    });
    if (tokens.length === 0) return;

    const failedTokens = await this.firebase.sendToTokens(
      tokens.map((t) => t.token),
      'Test',
      'If you see this, notifications work.',
      { type: 'test', screen: 'learn' },
    );
    await this.deactivateTokens(failedTokens);
  }

  // ── 1. STREAK AT RISK — 7 PM PKT (14:00 UTC) ──
  // Only users with streak >= 2 AND no activity today
  @Cron('0 14 * * *')
  async streakAtRisk() {
    this.logger.log('Running streak-at-risk check (7 PM PKT)...');

    const today = new Date();
    const todayDate = today.toISOString().split('T')[0]; // YYYY-MM-DD

    // Find users with active streak who haven't done anything today
    const atRiskUsers = await this.prisma.streakRecord.findMany({
      where: {
        currentStreak: { gte: 2 },
        // lastActiveDate is yesterday or earlier (not today)
        NOT: { lastActiveDate: new Date(todayDate) },
      },
      select: {
        userId: true,
        currentStreak: true,
      },
    });

    if (atRiskUsers.length === 0) {
      this.logger.log('No at-risk streaks — skipping');
      return;
    }

    const userIds = atRiskUsers.map((u) => u.userId);
    const streakMap = new Map(atRiskUsers.map((u) => [u.userId, u.currentStreak]));

    const tokens = await this.prisma.fcmToken.findMany({
      where: { active: true, userId: { in: userIds } },
      select: { token: true, userId: true },
    });

    if (tokens.length === 0) return;

    const template = pickTemplate(STREAK_AT_RISK);

    // Group tokens by userId for batched sending
    const tokensByUser = new Map<string, string[]>();
    for (const { token, userId } of tokens) {
      const existing = tokensByUser.get(userId) ?? [];
      existing.push(token);
      tokensByUser.set(userId, existing);
    }

    const allFailed: string[] = [];
    // Send in parallel batches of 50 users
    const entries = [...tokensByUser.entries()];
    for (let i = 0; i < entries.length; i += 50) {
      const batch = entries.slice(i, i + 50);
      const results = await Promise.all(
        batch.map(async ([userId, userTokens]) => {
          const streak = streakMap.get(userId) ?? 0;
          const title = fillVars(template.title, { streak });
          const body = fillVars(template.body, { streak });
          return this.firebase.sendToTokens(
            userTokens, title, body,
            { type: 'streak_risk', screen: 'learn' },
          );
        }),
      );
      allFailed.push(...results.flat());
    }
    await this.deactivateTokens(allFailed);

    this.logger.log(`streak_risk sent to ${tokensByUser.size} at-risk users`);
  }

  // ── 2. WEEKLY REVIEW MISSED — Saturday 7 PM PKT (14:00 UTC) ──
  // Only users with 5+ words who haven't completed this week's review
  @Cron('0 14 * * 6')
  async weeklyReviewMissed() {
    this.logger.log('Running weekly review missed check (Saturday 7 PM PKT)...');

    // Calculate current ISO week (same algorithm as reviews service)
    const now = new Date();
    const pkt = new Date(now.getTime() + 5 * 60 * 60 * 1000);
    const d = new Date(Date.UTC(pkt.getFullYear(), pkt.getMonth(), pkt.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const weekNumber = Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
    const year = d.getUTCFullYear();

    // Users who have enough words to review
    const eligibleUsers = await this.prisma.userProgress.findMany({
      where: { totalWordsLearned: { gte: 5 } },
      select: { userId: true, totalWordsLearned: true },
    });

    if (eligibleUsers.length === 0) {
      this.logger.log('No eligible users for weekly review — skipping');
      return;
    }

    // Find who already completed this week's review
    const completedReviews = await this.prisma.weeklyReview.findMany({
      where: { weekNumber, year },
      select: { userId: true },
    });
    const completedUserIds = new Set(completedReviews.map((r) => r.userId));

    // Filter to users who missed it
    const missedUsers = eligibleUsers.filter((u) => !completedUserIds.has(u.userId));

    if (missedUsers.length === 0) {
      this.logger.log('All eligible users completed their review — skipping');
      return;
    }

    const userIds = missedUsers.map((u) => u.userId);
    const wordsMap = new Map(missedUsers.map((u) => [u.userId, u.totalWordsLearned]));

    const tokens = await this.prisma.fcmToken.findMany({
      where: { active: true, userId: { in: userIds } },
      select: { token: true, userId: true },
    });

    if (tokens.length === 0) return;

    const template = pickTemplate(WEEKLY_REVIEW_MISSED);
    let totalSent = 0;

    for (const { token, userId } of tokens) {
      const words = wordsMap.get(userId) ?? 0;
      const title = fillVars(template.title, { words });
      const body = fillVars(template.body, { words });

      const failed = await this.firebase.sendToTokens(
        [token], title, body,
        { type: 'weekly_review', screen: 'review' },
      );
      await this.deactivateTokens(failed);
      totalSent++;
    }

    this.logger.log(`weekly_review_missed sent to ${totalSent} users`);
  }

  // ── 3. WIN-BACK — runs daily at 3 PM PKT (10:00 UTC) ──
  // Only users inactive 3-7 days AND had meaningful progress (10+ words)
  // Only sends ONCE (won't nag after 7 days)
  @Cron('0 10 * * *')
  async winBack() {
    this.logger.log('Running win-back check (3 PM PKT)...');

    const now = new Date();
    const threeDaysAgo = new Date(now.getTime() - 3 * 86400000);
    const sevenDaysAgo = new Date(now.getTime() - 7 * 86400000);

    // Users who were active 3-7 days ago with meaningful progress
    const lapsedUsers = await this.prisma.userProgress.findMany({
      where: {
        totalWordsLearned: { gte: 10 },
        lastActivityAt: {
          gte: sevenDaysAgo,
          lte: threeDaysAgo,
        },
      },
      select: { userId: true, totalWordsLearned: true, lastActivityAt: true },
    });

    if (lapsedUsers.length === 0) {
      this.logger.log('No lapsed users in win-back window — skipping');
      return;
    }

    // Only send to users whose lastActivityAt is exactly 3 days ago (±12 hours)
    // This ensures we send ONCE, not every day for 4 days
    const targetUsers = lapsedUsers.filter((u) => {
      if (!u.lastActivityAt) return false;
      const daysSince = Math.floor((now.getTime() - u.lastActivityAt.getTime()) / 86400000);
      return daysSince === 3;
    });

    if (targetUsers.length === 0) {
      this.logger.log('No users at exactly 3-day mark — skipping');
      return;
    }

    const userIds = targetUsers.map((u) => u.userId);
    const wordsMap = new Map(targetUsers.map((u) => [u.userId, u.totalWordsLearned]));

    const tokens = await this.prisma.fcmToken.findMany({
      where: { active: true, userId: { in: userIds } },
      select: { token: true, userId: true },
    });

    if (tokens.length === 0) return;

    const template = pickTemplate(WIN_BACK);
    let totalSent = 0;

    for (const { token, userId } of tokens) {
      const words = wordsMap.get(userId) ?? 0;
      const title = fillVars(template.title, { words });
      const body = fillVars(template.body, { words });

      const failed = await this.firebase.sendToTokens(
        [token], title, body,
        { type: 'win_back', screen: 'learn' },
      );
      await this.deactivateTokens(failed);
      totalSent++;
    }

    this.logger.log(`win_back sent to ${totalSent} lapsed users`);
  }
}
