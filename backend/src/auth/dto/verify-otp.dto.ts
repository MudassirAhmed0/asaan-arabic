import { IsString, Matches, Length } from 'class-validator';

export class VerifyOtpDto {
  @IsString()
  @Matches(/^\+923\d{9}$/, {
    message: 'Phone must be a valid Pakistani mobile number (+923XXXXXXXXX)',
  })
  phone!: string;

  @IsString()
  @Length(4, 4, { message: 'OTP must be exactly 4 digits' })
  @Matches(/^\d{4}$/, { message: 'OTP must be numeric' })
  code!: string;
}
