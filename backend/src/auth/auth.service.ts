import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { createHash } from 'crypto';
import { OAuth2Client } from 'google-auth-library';
import { PrismaService } from '../prisma';
import { UsersService } from '../users/users.service';
import { SmsService } from '../sms/sms.service';

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse extends AuthTokens {
  isNewUser: boolean;
}

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private googleClient: OAuth2Client;
  private googleClientId: string;

  constructor(
    private prisma: PrismaService,
    private users: UsersService,
    private jwt: JwtService,
    private sms: SmsService,
    private config: ConfigService,
  ) {
    this.googleClientId = this.config.get<string>('GOOGLE_CLIENT_ID') ?? '';
    this.googleClient = new OAuth2Client(this.googleClientId);
  }

  // --- OTP Flow ---

  async sendOtp(phone: string): Promise<void> {
    if (!this.sms.isOtpEnabled()) {
      throw new BadRequestException('OTP authentication is currently disabled');
    }

    await this.checkOtpRateLimit(phone);

    const code = this.generateOtp();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    await this.prisma.otpCode.create({
      data: { phone, code, expiresAt },
    });

    await this.sms.sendOtp(phone, code);
  }

  async verifyOtp(phone: string, code: string): Promise<AuthResponse> {
    await this.checkVerifyRateLimit(phone);

    const otp = await this.prisma.otpCode.findFirst({
      where: {
        phone,
        code,
        used: false,
        expiresAt: { gt: new Date() },
      },
      orderBy: { createdAt: 'desc' },
    });

    if (!otp) {
      throw new UnauthorizedException('Invalid or expired OTP');
    }

    // Mark OTP as used
    await this.prisma.otpCode.update({
      where: { id: otp.id },
      data: { used: true },
    });

    // Find or create user
    let isNewUser = false;
    let user = await this.users.findByPhone(phone);

    if (!user) {
      user = await this.users.createFromPhone(phone);
      isNewUser = true;
    }

    const tokens = await this.generateTokens(user.id);
    return { ...tokens, isNewUser };
  }

  // --- Google Flow ---

  async googleAuth(idToken: string): Promise<AuthResponse> {
    const payload = await this.verifyGoogleToken(idToken);

    const { sub: googleId, email, name, picture } = payload;
    if (!googleId || !email) {
      throw new BadRequestException('Invalid Google token payload');
    }

    let isNewUser = false;

    // Check if user exists by Google ID
    let user = await this.users.findByGoogleId(googleId);

    if (!user) {
      // Check if user exists by email (might have signed up with phone and same email)
      const existingUser = await this.users.findByEmail(email);

      if (existingUser) {
        // Link Google account to existing user
        user = await this.users.linkGoogle(existingUser.id, {
          googleId,
          email,
          name: name ?? undefined,
          profilePicture: picture ?? undefined,
        });
      } else {
        // Create new user
        user = await this.users.createFromGoogle({
          googleId,
          email,
          name: name ?? undefined,
          profilePicture: picture ?? undefined,
        });
        isNewUser = true;
      }
    }

    const tokens = await this.generateTokens(user.id);
    return { ...tokens, isNewUser };
  }

  // --- Phone Linking (for Google sign-in users, after Lesson 1) ---

  async sendLinkOtp(userId: string, phone: string): Promise<void> {
    if (!this.sms.isOtpEnabled()) {
      throw new BadRequestException('OTP authentication is currently disabled');
    }

    // Check if phone is already taken by another user
    const existingUser = await this.users.findByPhone(phone);
    if (existingUser && existingUser.id !== userId) {
      throw new BadRequestException(
        'This phone number is already linked to another account',
      );
    }

    await this.checkOtpRateLimit(phone);

    const code = this.generateOtp();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await this.prisma.otpCode.create({
      data: { phone, code, expiresAt },
    });

    await this.sms.sendOtp(phone, code);
  }

  async verifyLinkOtp(
    userId: string,
    phone: string,
    code: string,
  ): Promise<void> {
    await this.checkVerifyRateLimit(phone);

    const otp = await this.prisma.otpCode.findFirst({
      where: {
        phone,
        code,
        used: false,
        expiresAt: { gt: new Date() },
      },
      orderBy: { createdAt: 'desc' },
    });

    if (!otp) {
      throw new UnauthorizedException('Invalid or expired OTP');
    }

    await this.prisma.otpCode.update({
      where: { id: otp.id },
      data: { used: true },
    });

    await this.users.linkPhone(userId, phone);
  }

  // --- Dev Login (non-production only) ---

  async devLogin(): Promise<AuthResponse> {
    const env = this.config.get<string>('NODE_ENV');
    if (env === 'production') {
      throw new BadRequestException('Dev login is not available in production');
    }

    const devPhone = '+920000000000';
    let user = await this.users.findByPhone(devPhone);
    let isNewUser = false;

    if (!user) {
      user = await this.users.createFromPhone(devPhone);
      isNewUser = true;
    }

    const tokens = await this.generateTokens(user.id);
    return { ...tokens, isNewUser };
  }

  // --- Token Management ---

  async refreshTokens(refreshToken: string): Promise<AuthTokens> {
    const payload = this.verifyRefreshToken(refreshToken);
    const tokenHash = this.hashToken(refreshToken);

    const storedToken = await this.prisma.refreshToken.findFirst({
      where: {
        userId: payload.sub,
        tokenHash,
        revoked: false,
        expiresAt: { gt: new Date() },
      },
    });

    if (!storedToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    // Revoke old token (rotation)
    await this.prisma.refreshToken.update({
      where: { id: storedToken.id },
      data: { revoked: true },
    });

    // Verify user still exists
    const user = await this.users.findById(payload.sub);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return this.generateTokens(user.id);
  }

  async logout(refreshToken: string): Promise<void> {
    const payload = this.verifyRefreshToken(refreshToken);
    const tokenHash = this.hashToken(refreshToken);

    await this.prisma.refreshToken.updateMany({
      where: {
        userId: payload.sub,
        tokenHash,
        revoked: false,
      },
      data: { revoked: true },
    });
  }

  // --- Private Helpers ---

  private generateOtp(): string {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }

  private async generateTokens(userId: string): Promise<AuthTokens> {
    const accessExpirySeconds =
      Number(this.config.get('JWT_ACCESS_EXPIRY_SECONDS')) || 900; // 15 min
    const refreshExpirySeconds =
      Number(this.config.get('JWT_REFRESH_EXPIRY_SECONDS')) || 2592000; // 30 days

    const accessToken = this.jwt.sign(
      { sub: userId },
      {
        secret: this.config.get<string>('JWT_SECRET'),
        expiresIn: accessExpirySeconds,
      },
    );

    const refreshToken = this.jwt.sign(
      { sub: userId },
      {
        secret: this.config.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: refreshExpirySeconds,
      },
    );

    // Store hashed refresh token
    const tokenHash = this.hashToken(refreshToken);
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days

    await this.prisma.refreshToken.create({
      data: { userId, tokenHash, expiresAt },
    });

    return { accessToken, refreshToken };
  }

  private verifyRefreshToken(token: string): { sub: string } {
    try {
      return this.jwt.verify<{ sub: string }>(token, {
        secret: this.config.get<string>('JWT_REFRESH_SECRET'),
      });
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  private async verifyGoogleToken(idToken: string) {
    try {
      const ticket = await this.googleClient.verifyIdToken({
        idToken,
        audience: this.googleClientId,
      });
      const payload = ticket.getPayload();
      if (!payload) {
        throw new Error('No payload');
      }
      return payload;
    } catch {
      throw new UnauthorizedException('Invalid Google token');
    }
  }

  private hashToken(token: string): string {
    return createHash('sha256').update(token).digest('hex');
  }

  private async checkOtpRateLimit(phone: string): Promise<void> {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const hourlyCount = await this.prisma.otpCode.count({
      where: { phone, createdAt: { gt: oneHourAgo } },
    });

    if (hourlyCount >= 3) {
      throw new BadRequestException(
        'Too many OTP requests. Try again in an hour.',
      );
    }

    const dailyCount = await this.prisma.otpCode.count({
      where: { phone, createdAt: { gt: oneDayAgo } },
    });

    if (dailyCount >= 10) {
      throw new BadRequestException(
        'Daily OTP limit reached. Try again tomorrow.',
      );
    }
  }

  private async checkVerifyRateLimit(phone: string): Promise<void> {
    // Count recent OTP records that were used (attempts) in the last 15 minutes
    // We track this by counting all OTPs created for this phone recently
    const fifteenMinAgo = new Date(Date.now() - 15 * 60 * 1000);

    const recentAttempts = await this.prisma.otpCode.count({
      where: {
        phone,
        used: true,
        createdAt: { gt: fifteenMinAgo },
      },
    });

    if (recentAttempts >= 5) {
      throw new BadRequestException(
        'Too many verification attempts. Try again later.',
      );
    }
  }
}
