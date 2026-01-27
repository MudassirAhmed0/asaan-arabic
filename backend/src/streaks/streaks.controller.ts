import { Controller, Get, UseGuards } from '@nestjs/common';
import { StreaksService } from './streaks.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import * as PrismaTypes from '@prisma/client';

@Controller('streaks')
@UseGuards(JwtAuthGuard)
export class StreaksController {
  constructor(private readonly streaksService: StreaksService) {}

  @Get('me')
  async getStreak(@CurrentUser() user: PrismaTypes.User) {
    return this.streaksService.getStreak(user.id);
  }
}
