import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SubmitReviewDto } from './dto/submit-review.dto';

@Controller('reviews')
@UseGuards(JwtAuthGuard)
export class ReviewsController {
  constructor(private reviewsService: ReviewsService) {}

  @Get('current')
  getCurrent(@Request() req: any) {
    return this.reviewsService.getCurrentReview(req.user.id);
  }

  @Post('submit')
  submit(@Request() req: any, @Body() dto: SubmitReviewDto) {
    return this.reviewsService.submitReview(req.user.id, dto.results);
  }

  @Get('history')
  getHistory(@Request() req: any) {
    return this.reviewsService.getHistory(req.user.id);
  }
}
