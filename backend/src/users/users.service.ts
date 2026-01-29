import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma';
import { User } from '@prisma/client';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findByPhone(phone: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { phone } });
  }

  async findByGoogleId(googleId: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { googleId } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findFirst({ where: { email } });
  }

  async createFromPhone(phone: string): Promise<User> {
    return this.prisma.user.create({
      data: { phone, phoneVerified: true },
    });
  }

  async createFromGoogle(data: {
    googleId: string;
    email: string;
    name?: string;
    profilePicture?: string;
  }): Promise<User> {
    return this.prisma.user.create({ data });
  }

  async linkGoogle(
    userId: string,
    data: {
      googleId: string;
      email: string;
      name?: string;
      profilePicture?: string;
    },
  ): Promise<User> {
    return this.prisma.user.update({
      where: { id: userId },
      data,
    });
  }

  async linkPhone(userId: string, phone: string): Promise<User> {
    return this.prisma.user.update({
      where: { id: userId },
      data: { phone, phoneVerified: true },
    });
  }

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        phone: true,
        email: true,
        name: true,
        profilePicture: true,
        createdAt: true,

        soundEnabled: true,
        hapticsEnabled: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const progress = await this.prisma.userProgress.findUnique({
      where: { userId },
    });

    const streak = await this.prisma.streakRecord.findUnique({
      where: { userId },
    });

    return {
      ...user,
      progress: {
        totalWordsLearned: progress?.totalWordsLearned ?? 0,
        currentLessonIndex: progress?.currentLessonIndex ?? 1,
        onboardingCompleted: progress?.onboardingCompleted ?? false,
        lastActivityAt: progress?.lastActivityAt ?? null,
      },
      streak: {
        currentStreak: streak?.currentStreak ?? 0,
        longestStreak: streak?.longestStreak ?? 0,
        lastActiveDate: streak?.lastActiveDate ?? null,
      },
    };
  }

  async updateProfile(userId: string, dto: UpdateProfileDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const updated = await this.prisma.user.update({
      where: { id: userId },
      data: dto,
      select: {
        id: true,
        phone: true,
        email: true,
        name: true,
        profilePicture: true,
        createdAt: true,

        soundEnabled: true,
        hapticsEnabled: true,
      },
    });

    return updated;
  }

  async completeOnboarding(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const progress = await this.prisma.userProgress.upsert({
      where: { userId },
      update: { onboardingCompleted: true },
      create: {
        userId,
        onboardingCompleted: true,
      },
    });

    return {
      message: 'Onboarding completed',
      onboardingCompleted: progress.onboardingCompleted,
    };
  }
}
