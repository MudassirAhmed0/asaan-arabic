import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsUUID, ValidateNested } from 'class-validator';

class QuizResultItem {
  @IsUUID()
  wordId: string;

  @IsBoolean()
  correct: boolean;
}

export class QuizResultsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuizResultItem)
  results: QuizResultItem[];
}
