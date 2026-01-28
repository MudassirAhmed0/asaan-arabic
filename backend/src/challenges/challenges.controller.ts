import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('challenges')
@UseGuards(JwtAuthGuard)
export class ChallengesController {
  constructor(private challengesService: ChallengesService) {}

  @Get('today')
  getTodayChallenge(@Request() req: any) {
    return this.challengesService.getTodayChallenge(req.user.id);
  }

  @Post(':id/attempt')
  submitAttempt(
    @Request() req: any,
    @Param('id') id: string,
    @Body() body: { answer?: number },
  ) {
    return this.challengesService.submitAttempt(req.user.id, id, body.answer);
  }

  @Get('history')
  getHistory(@Request() req: any) {
    return this.challengesService.getHistory(req.user.id);
  }
}
