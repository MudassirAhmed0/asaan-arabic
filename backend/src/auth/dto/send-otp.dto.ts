import { IsString, Matches } from 'class-validator';

export class SendOtpDto {
  @IsString()
  @Matches(/^\+923\d{9}$/, {
    message: 'Phone must be a valid Pakistani mobile number (+923XXXXXXXXX)',
  })
  phone!: string;
}
