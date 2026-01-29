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

  // 4:00 UTC = 9:00 AM PKT
  @Cron('0 4 * * *')
  async sendDailyReminder() {
    this.logger.log('Running daily reminder cron...');

    const tokens = await this.prisma.fcmToken.findMany({
      where: { active: true },
      select: { token: true },
    });

    if (tokens.length === 0) {
      this.logger.log('No active tokens — skipping');
      return;
    }

    const tokenStrings = tokens.map((t) => t.token);

    const failedTokens = await this.firebase.sendToTokens(
      tokenStrings,
      'Time to learn!',
      "Your daily Qur'anic words are waiting. Just 5 minutes today.",
      { type: 'daily_reminder' },
    );

    await this.deactivateTokens(failedTokens);

    this.logger.log(`Daily reminder sent to ${tokenStrings.length} devices`);
  }
}
