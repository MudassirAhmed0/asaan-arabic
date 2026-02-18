import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma';
import { VerifyReceiptDto } from './dto/verify-receipt.dto';
import { RevenueCatEvent } from './dto/webhook.dto';

@Injectable()
export class SubscriptionsService {
  constructor(private prisma: PrismaService) {}

  async isPremium(userId: string): Promise<boolean> {
    // TODO: Re-enable after first 1000 users / payment setup
    // const sub = await this.prisma.userSubscription.findUnique({
    //   where: { userId },
    // });
    // if (!sub) return false;
    // if (sub.status !== 'ACTIVE') return false;
    // if (sub.expiresAt && sub.expiresAt < new Date()) return false;
    return true;
  }

  async getSubscriptionStatus(userId: string) {
    const sub = await this.prisma.userSubscription.findUnique({
      where: { userId },
    });

    if (!sub) return { isPremium: false, subscription: null };

    const isPremium =
      sub.status === 'ACTIVE' &&
      (!sub.expiresAt || sub.expiresAt > new Date());

    return {
      isPremium,
      subscription: {
        status: sub.status,
        productId: sub.productId,
        platform: sub.platform,
        expiresAt: sub.expiresAt,
      },
    };
  }

  async verifyAndActivate(userId: string, dto: VerifyReceiptDto) {
    return this.prisma.userSubscription.upsert({
      where: { userId },
      update: {
        revenuecatId: dto.revenuecatCustomerId,
        status: 'ACTIVE',
        platform: dto.platform,
        productId: dto.productId,
        purchasedAt: new Date(),
        expiresAt: dto.expiresAt ? new Date(dto.expiresAt) : null,
      },
      create: {
        userId,
        revenuecatId: dto.revenuecatCustomerId,
        status: 'ACTIVE',
        platform: dto.platform,
        productId: dto.productId,
        purchasedAt: new Date(),
        expiresAt: dto.expiresAt ? new Date(dto.expiresAt) : null,
      },
    });
  }

  async handleWebhook(event: RevenueCatEvent) {
    const sub = await this.prisma.userSubscription.findUnique({
      where: { revenuecatId: event.app_user_id },
    });
    if (!sub) return;

    const expiresAt = event.expiration_at_ms
      ? new Date(event.expiration_at_ms)
      : undefined;

    switch (event.type) {
      case 'INITIAL_PURCHASE':
      case 'RENEWAL':
      case 'UNCANCELLATION':
        await this.prisma.userSubscription.update({
          where: { id: sub.id },
          data: { status: 'ACTIVE', ...(expiresAt && { expiresAt }) },
        });
        break;
      case 'CANCELLATION':
        await this.prisma.userSubscription.update({
          where: { id: sub.id },
          data: { status: 'CANCELLED' },
        });
        break;
      case 'BILLING_ISSUE':
        await this.prisma.userSubscription.update({
          where: { id: sub.id },
          data: { status: 'BILLING_RETRY' },
        });
        break;
      case 'EXPIRATION':
        await this.prisma.userSubscription.update({
          where: { id: sub.id },
          data: { status: 'EXPIRED' },
        });
        break;
    }
  }
}
