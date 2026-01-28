import { IsIn } from 'class-validator';

export class UpdateWordStatusDto {
  @IsIn(['LEARNED', 'NEEDS_REVISION'])
  status: 'LEARNED' | 'NEEDS_REVISION';
}
