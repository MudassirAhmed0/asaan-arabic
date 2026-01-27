import { Controller, Get, Post, HttpCode, UseGuards } from '@nestjs/common';
import { WordsService } from './words.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import * as PrismaTypes from '@prisma/client';

@Controller('words')
@UseGuards(JwtAuthGuard)
export class WordsController {
  constructor(private readonly wordsService: WordsService) {}

  @Get('review')
  async getReviewWords(@CurrentUser() user: PrismaTypes.User) {
    return this.wordsService.getReviewWords(user.id);
  }

  @Post('review/complete')
  @HttpCode(200)
  async completeReview(@CurrentUser() user: PrismaTypes.User) {
    return this.wordsService.completeReview(user.id);
  }
}
