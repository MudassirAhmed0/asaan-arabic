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
    private config: ConfigService,
  ) {
    this.googleClientId = this.config.get<string>('GOOGLE_CLIENT_ID') ?? '';
    this.googleClient = new OAuth2Client(this.googleClientId);
  }

  // --- Google Flow ---

  async googleAuth(idToken: string): Promise<AuthResponse> {
    const payload = await this.verifyGoogleToken(idToken);

    const { sub: googleId, email, name, picture } = payload;
    if (!googleId || !email) {
      throw new BadRequestException('Invalid Google token payload');
    }

    let isNewUser = false;

    let user = await this.users.findByGoogleId(googleId);

    if (!user) {
      const existingUser = await this.users.findByEmail(email);

      if (existingUser) {
        user = await this.users.linkGoogle(existingUser.id, {
          googleId,
          email,
          name: name ?? undefined,
          profilePicture: picture ?? undefined,
        });
      } else {
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

    await this.prisma.refreshToken.update({
      where: { id: storedToken.id },
      data: { revoked: true },
    });

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

  private async generateTokens(userId: string): Promise<AuthTokens> {
    const accessExpirySeconds =
      Number(this.config.get('JWT_ACCESS_EXPIRY_SECONDS')) || 900;
    const refreshExpirySeconds =
      Number(this.config.get('JWT_REFRESH_EXPIRY_SECONDS')) || 2592000;

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

    const tokenHash = this.hashToken(refreshToken);
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

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
}
