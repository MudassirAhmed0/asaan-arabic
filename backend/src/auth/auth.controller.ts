import { Body, Controller, Post, UseGuards, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SendOtpDto } from './dto/send-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { GoogleAuthDto } from './dto/google-auth.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { LinkPhoneDto, LinkPhoneVerifyDto } from './dto/link-phone.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import * as PrismaTypes from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('otp/send')
  @HttpCode(200)
  async sendOtp(@Body() dto: SendOtpDto) {
    await this.auth.sendOtp(dto.phone);
    return { message: 'OTP sent' };
  }

  @Post('otp/verify')
  @HttpCode(200)
  async verifyOtp(@Body() dto: VerifyOtpDto) {
    return this.auth.verifyOtp(dto.phone, dto.code);
  }

  @Post('google')
  @HttpCode(200)
  async googleAuth(@Body() dto: GoogleAuthDto) {
    return this.auth.googleAuth(dto.idToken);
  }

  @Post('refresh')
  @HttpCode(200)
  async refresh(@Body() dto: RefreshTokenDto) {
    return this.auth.refreshTokens(dto.refreshToken);
  }

  @Post('logout')
  @HttpCode(200)
  async logout(@Body() dto: RefreshTokenDto) {
    await this.auth.logout(dto.refreshToken);
    return { message: 'Logged out' };
  }

  @Post('phone/link')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  async linkPhone(@CurrentUser() user: PrismaTypes.User, @Body() dto: LinkPhoneDto) {
    await this.auth.sendLinkOtp(user.id, dto.phone);
    return { message: 'OTP sent' };
  }

  @Post('phone/link/verify')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  async linkPhoneVerify(
    @CurrentUser() user: PrismaTypes.User,
    @Body() dto: LinkPhoneVerifyDto,
  ) {
    await this.auth.verifyLinkOtp(user.id, dto.phone, dto.code);
    return { message: 'Phone linked' };
  }
}
