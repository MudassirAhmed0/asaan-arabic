import { Body, Controller, Post, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleAuthDto } from './dto/google-auth.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

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

  @Post('dev-login')
  @HttpCode(200)
  async devLogin() {
    return this.auth.devLogin();
  }
}
