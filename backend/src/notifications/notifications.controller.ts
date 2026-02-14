import { Controller, Post, Delete, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { User } from '@prisma/client';
import { NotificationsService } from './notifications.service';
import { RegisterTokenDto } from './dto/register-token.dto';

@Controller('notifications')
export class NotificationsController {
  constructor(private notificationsService: NotificationsService) {}

  @Post('register')
  @UseGuards(JwtAuthGuard)
  async register(@CurrentUser() user: User, @Body() dto: RegisterTokenDto) {
    await this.notificationsService.registerToken(user.id, dto.token, dto.platform);
    return { message: 'Token registered' };
  }

  @Delete('unregister')
  @UseGuards(JwtAuthGuard)
  async unregister(@Body() body: { token: string }) {
    await this.notificationsService.unregisterToken(body.token);
    return { message: 'Token unregistered' };
  }

  // Manual test — no auth so we can trigger via curl (TEMPORARY)
  @Post('test')
  async test() {
    await this.notificationsService.sendTestNotification();
    return { message: 'Test notification sent' };
  }
}
