import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as twilio from 'twilio';

@Injectable()
export class SmsService {
  private readonly logger = new Logger(SmsService.name);
  private client: twilio.Twilio | null = null;
  private fromNumber: string;
  private otpEnabled: boolean;

  constructor(private config: ConfigService) {
    this.otpEnabled = this.config.get<string>('OTP_ENABLED') !== 'false';

    const sid = this.config.get<string>('TWILIO_ACCOUNT_SID');
    const token = this.config.get<string>('TWILIO_AUTH_TOKEN');
    this.fromNumber = this.config.get<string>('TWILIO_PHONE_NUMBER') ?? '';

    if (sid && token) {
      this.client = twilio.default(sid, token);
    }
  }

  isOtpEnabled(): boolean {
    return this.otpEnabled;
  }

  async sendOtp(phone: string, code: string): Promise<void> {
    if (!this.otpEnabled) {
      this.logger.warn('OTP is disabled via config. Skipping SMS send.');
      return;
    }

    const message = `Your verification code is: ${code}`;

    if (!this.client) {
      // Dev mode: log OTP to console when Twilio isn't configured
      this.logger.warn(`[DEV MODE] OTP for ${phone}: ${code}`);
      return;
    }

    try {
      await this.client.messages.create({
        body: message,
        to: phone,
        from: this.fromNumber,
      });
      this.logger.log(`OTP sent to ${phone}`);
    } catch (error) {
      this.logger.error(`Failed to send OTP to ${phone}`, error);
      throw error;
    }
  }
}
