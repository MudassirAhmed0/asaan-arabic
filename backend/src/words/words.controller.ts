import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Query,
  Body,
  HttpCode,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { WordsService } from './words.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UpdateWordStatusDto } from './dto/update-word-status.dto';
import { QuizResultsDto } from './dto/quiz-results.dto';
import * as PrismaTypes from '@prisma/client';

@Controller('words')
@UseGuards(JwtAuthGuard)
export class WordsController {
  constructor(private readonly wordsService: WordsService) {}

  // Static routes MUST come before :id routes

  @Get()
  async getLearnedWords(
    @CurrentUser() user: PrismaTypes.User,
    @Query('search') search?: string,
    @Query('status') status?: 'LEARNED' | 'NEEDS_REVISION' | 'MASTERED',
  ) {
    return this.wordsService.getLearnedWords(user.id, search, status);
  }

  @Get('practice')
  async getPracticeWords(
    @CurrentUser() user: PrismaTypes.User,
    @Query('count') count?: string,
    @Query('status') status?: 'LEARNED' | 'NEEDS_REVISION' | 'MASTERED',
  ) {
    const parsedCount = count ? parseInt(count, 10) : undefined;
    return this.wordsService.getPracticeWords(user.id, parsedCount, status);
  }

  @Post('quiz-results')
  @HttpCode(200)
  async recordQuizResults(
    @CurrentUser() user: PrismaTypes.User,
    @Body() dto: QuizResultsDto,
  ) {
    return this.wordsService.recordQuizResults(user.id, dto.results);
  }

  // Parameterized routes AFTER static routes

  @Get(':id')
  async getWordDetail(
    @CurrentUser() user: PrismaTypes.User,
    @Param('id', ParseUUIDPipe) wordId: string,
  ) {
    return this.wordsService.getWordDetail(user.id, wordId);
  }

  @Patch(':id/status')
  async updateWordStatus(
    @CurrentUser() user: PrismaTypes.User,
    @Param('id', ParseUUIDPipe) wordId: string,
    @Body() dto: UpdateWordStatusDto,
  ) {
    return this.wordsService.updateWordStatus(user.id, wordId, dto.status);
  }
}
