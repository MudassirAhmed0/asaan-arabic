import { IsUUID, IsOptional, IsInt, Min, Max } from 'class-validator';

export class LessonCompleteDto {
  @IsUUID()
  attemptId: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  score?: number;
}
