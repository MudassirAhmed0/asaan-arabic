import { IsString, IsEnum, IsOptional } from 'class-validator';
import { SubscriptionPlatform } from '@prisma/client';

export class VerifyReceiptDto {
  @IsString()
  revenuecatCustomerId: string;

  @IsEnum(SubscriptionPlatform)
  platform: SubscriptionPlatform;

  @IsString()
  productId: string;

  @IsOptional()
  @IsString()
  expiresAt?: string;
}
