import {
  Controller,
  Get,
  Post,
  Body,
  Headers,
  HttpCode,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { User } from '@prisma/client';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { SubscriptionsService } from './subscriptions.service';
import { VerifyReceiptDto } from './dto/verify-receipt.dto';
import { RevenueCatWebhookDto } from './dto/webhook.dto';

@Controller('subscriptions')
export class SubscriptionsController {
  constructor(
    private readonly subscriptionsService: SubscriptionsService,
    private readonly configService: ConfigService,
  ) {}

  @Get('status')
  @UseGuards(JwtAuthGuard)
  async getStatus(@CurrentUser() user: User) {
    return this.subscriptionsService.getSubscriptionStatus(user.id);
  }

  @Post('verify')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  async verify(@CurrentUser() user: User, @Body() dto: VerifyReceiptDto) {
    await this.subscriptionsService.verifyAndActivate(user.id, dto);
    return { success: true };
  }

  @Post('webhook')
  @HttpCode(200)
  async webhook(
    @Body() body: RevenueCatWebhookDto,
    @Headers('authorization') authHeader: string,
  ) {
    const webhookSecret = this.configService.get<string>(
      'REVENUECAT_WEBHOOK_SECRET',
    );
    if (webhookSecret && authHeader !== `Bearer ${webhookSecret}`) {
      throw new UnauthorizedException('Invalid webhook secret');
    }

    await this.subscriptionsService.handleWebhook(body);
    return { ok: true };
  }
}
