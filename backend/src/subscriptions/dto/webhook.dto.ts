import { IsString, IsOptional, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class RevenueCatEvent {
  @IsString()
  type: string;

  @IsString()
  app_user_id: string;

  @IsOptional()
  @IsNumber()
  expiration_at_ms?: number;

  @IsOptional()
  @IsString()
  product_id?: string;
}

export class RevenueCatWebhookDto {
  @ValidateNested()
  @Type(() => RevenueCatEvent)
  event: RevenueCatEvent;
}
