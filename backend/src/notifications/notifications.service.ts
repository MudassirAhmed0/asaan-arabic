import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from '../prisma';
import { FirebaseService } from '../firebase/firebase.service';
import {
  Coordinates,
  CalculationMethod,
  PrayerTimes,
} from 'adhan';

// Karachi — largest city, safe default
const PAKISTAN_COORDS = new Coordinates(24.8607, 67.0011);
const FAJR_DELAY_MS = 15 * 60 * 1000; // 15 minutes after Fajr

@Injectable()
export class NotificationsService implements OnModuleInit {
  private readonly logger = new Logger(NotificationsService.name);
  private fajrTimeout: ReturnType<typeof setTimeout> | null = null;

  constructor(
    private prisma: PrismaService,
    private firebase: FirebaseService,
  ) {}

  onModuleInit() {
    // Schedule today's Fajr notification on startup
    this.scheduleFajrNotification();
  }

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

  async sendTestNotification() {
    this.logger.log('Sending test notification...');
    return this.sendToAll(
      'Time to learn!',
      "Your daily Qur'anic words are waiting. Just 5 minutes today.",
      { type: 'test' },
    );
  }

  // Runs at midnight PKT (19:00 UTC) to schedule next Fajr notification
  @Cron('0 19 * * *')
  scheduleFajrNotification() {
    // Calculate tomorrow's Fajr (since this runs at midnight PKT)
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const prayerTimes = new PrayerTimes(
      PAKISTAN_COORDS,
      tomorrow,
      CalculationMethod.Karachi(),
    );

    const fajrTime = prayerTimes.fajr;
    const sendAt = new Date(fajrTime.getTime() + FAJR_DELAY_MS);
    const delayMs = sendAt.getTime() - now.getTime();

    if (delayMs <= 0) {
      this.logger.warn(`Fajr send time already passed: ${sendAt.toISOString()}`);
      return;
    }

    // Clear any existing timeout
    if (this.fajrTimeout) {
      clearTimeout(this.fajrTimeout);
    }

    this.fajrTimeout = setTimeout(() => {
      this.sendFajrReminder();
    }, delayMs);

    const fajrLocal = fajrTime.toLocaleString('en-PK', { timeZone: 'Asia/Karachi' });
    const sendLocal = sendAt.toLocaleString('en-PK', { timeZone: 'Asia/Karachi' });
    this.logger.log(`Fajr: ${fajrLocal} — notification scheduled for: ${sendLocal}`);
  }

  async sendFajrReminder() {
    this.logger.log('Sending post-Fajr reminder...');
    return this.sendToAll(
      'Start your day with the Quran',
      'Learn 5 new words before the world wakes up.',
      { type: 'fajr_reminder' },
    );
  }

  // 18:00 UTC = 11:00 PM PKT
  @Cron('0 18 * * *')
  async sendNightReminder() {
    this.logger.log('Running night reminder cron...');
    return this.sendToAll(
      "Don't break your streak",
      'A quick lesson before bed — just 5 minutes.',
      { type: 'night_reminder' },
    );
  }

  private async sendToAll(title: string, body: string, data: Record<string, string>) {
    const tokens = await this.prisma.fcmToken.findMany({
      where: { active: true },
      select: { token: true },
    });

    if (tokens.length === 0) {
      this.logger.log('No active tokens — skipping');
      return;
    }

    const tokenStrings = tokens.map((t) => t.token);
    const failedTokens = await this.firebase.sendToTokens(tokenStrings, title, body, data);
    await this.deactivateTokens(failedTokens);

    this.logger.log(`${data.type} sent to ${tokenStrings.length} devices`);
  }
}
