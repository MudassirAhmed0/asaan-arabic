import { Controller, Post, Delete, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { User } from '@prisma/client';
import { NotificationsService } from './notifications.service';
import { RegisterTokenDto } from './dto/register-token.dto';

@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationsController {
  constructor(private notificationsService: NotificationsService) {}

  @Post('register')
  async register(@CurrentUser() user: User, @Body() dto: RegisterTokenDto) {
    await this.notificationsService.registerToken(user.id, dto.token, dto.platform);
    return { message: 'Token registered' };
  }

  @Delete('unregister')
  async unregister(@Body() body: { token: string }) {
    await this.notificationsService.unregisterToken(body.token);
    return { message: 'Token unregistered' };
  }

  // Manual test — hit this to trigger a push right now
  @Post('test')
  async test(@CurrentUser() user: User) {
    await this.notificationsService.sendTestNotification();
    return { message: 'Test notification sent' };
  }
}
