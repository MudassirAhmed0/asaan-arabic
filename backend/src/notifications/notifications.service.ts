import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from '../prisma';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  constructor(
    private prisma: PrismaService,
    private firebase: FirebaseService,
  ) {}

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

  // 0:30 UTC = 5:30 AM PKT (~10-15 min after Fajr)
  @Cron('30 0 * * *')
  async sendFajrReminder() {
    this.logger.log('Running post-Fajr reminder cron...');
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
