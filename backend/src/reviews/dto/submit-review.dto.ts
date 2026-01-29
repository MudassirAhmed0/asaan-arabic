import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsUUID, ValidateNested } from 'class-validator';

class ReviewResultItem {
  @IsUUID()
  wordId: string;

  @IsBoolean()
  correct: boolean;
}

export class SubmitReviewDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ReviewResultItem)
  results: ReviewResultItem[];
}
