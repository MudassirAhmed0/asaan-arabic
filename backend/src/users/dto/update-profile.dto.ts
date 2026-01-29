import { IsOptional, IsString, MaxLength, IsUrl, IsBoolean } from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  name?: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  @MaxLength(500)
  profilePicture?: string;

  @IsOptional()
  @IsBoolean()
  soundEnabled?: boolean;

  @IsOptional()
  @IsBoolean()
  hapticsEnabled?: boolean;
}
