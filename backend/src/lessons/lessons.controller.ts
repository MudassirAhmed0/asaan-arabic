import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  UseGuards,
  HttpCode,
  ParseUUIDPipe,
} from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import * as PrismaTypes from '@prisma/client';
import { LessonCompleteDto } from './dto/lesson-complete.dto';

@Controller('lessons')
@UseGuards(JwtAuthGuard)
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Get()
  async listLessons(@CurrentUser() user: PrismaTypes.User) {
    return this.lessonsService.listLessons(user.id);
  }

  @Get(':id')
  async getLessonContent(
    @CurrentUser() user: PrismaTypes.User,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.lessonsService.getLessonContent(user.id, id);
  }

  @Post(':id/start')
  @HttpCode(201)
  async startLesson(
    @CurrentUser() user: PrismaTypes.User,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.lessonsService.startLesson(user.id, id);
  }

  @Post(':id/complete')
  @HttpCode(200)
  async completeLesson(
    @CurrentUser() user: PrismaTypes.User,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: LessonCompleteDto,
  ) {
    return this.lessonsService.completeLesson(user.id, id, dto);
  }
}
