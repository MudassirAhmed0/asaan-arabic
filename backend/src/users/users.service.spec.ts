import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma';

const mockUser = {
  id: 'user-1',
  phone: '+923001234567',
  phoneVerified: true,
  googleId: null,
  email: null,
  name: 'Test User',
  profilePicture: null,
  createdAt: new Date('2026-01-01'),
  updatedAt: new Date('2026-01-01'),
};

const mockProgress = {
  id: 'progress-1',
  userId: 'user-1',
  totalWordsLearned: 10,
  currentLessonIndex: 3,
  onboardingCompleted: true,
  lastActivityAt: new Date('2026-01-26'),
  updatedAt: new Date('2026-01-26'),
};

const mockStreak = {
  id: 'streak-1',
  userId: 'user-1',
  currentStreak: 5,
  longestStreak: 7,
  lastActiveDate: new Date('2026-01-26'),
  updatedAt: new Date('2026-01-26'),
};

describe('UsersService', () => {
  let service: UsersService;
  let prisma: {
    user: {
      findUnique: jest.Mock;
      update: jest.Mock;
    };
    userProgress: {
      findUnique: jest.Mock;
      upsert: jest.Mock;
    };
    streakRecord: {
      findUnique: jest.Mock;
    };
  };

  beforeEach(async () => {
    prisma = {
      user: {
        findUnique: jest.fn(),
        update: jest.fn(),
      },
      userProgress: {
        findUnique: jest.fn(),
        upsert: jest.fn(),
      },
      streakRecord: {
        findUnique: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  describe('getProfile', () => {
    it('should return user profile with progress and streak', async () => {
      prisma.user.findUnique.mockResolvedValue({
        id: mockUser.id,
        phone: mockUser.phone,
        email: mockUser.email,
        name: mockUser.name,
        profilePicture: mockUser.profilePicture,
        createdAt: mockUser.createdAt,
      });
      prisma.userProgress.findUnique.mockResolvedValue(mockProgress);
      prisma.streakRecord.findUnique.mockResolvedValue(mockStreak);

      const result = await service.getProfile('user-1');

      expect(result).toEqual({
        id: 'user-1',
        phone: '+923001234567',
        email: null,
        name: 'Test User',
        profilePicture: null,
        createdAt: mockUser.createdAt,
        progress: {
          totalWordsLearned: 10,
          currentLessonIndex: 3,
          onboardingCompleted: true,
          lastActivityAt: mockProgress.lastActivityAt,
        },
        streak: {
          currentStreak: 5,
          longestStreak: 7,
          lastActiveDate: mockStreak.lastActiveDate,
        },
      });
    });

    it('should return defaults when no progress or streak exists', async () => {
      prisma.user.findUnique.mockResolvedValue({
        id: mockUser.id,
        phone: mockUser.phone,
        email: null,
        name: null,
        profilePicture: null,
        createdAt: mockUser.createdAt,
      });
      prisma.userProgress.findUnique.mockResolvedValue(null);
      prisma.streakRecord.findUnique.mockResolvedValue(null);

      const result = await service.getProfile('user-1');

      expect(result.progress).toEqual({
        totalWordsLearned: 0,
        currentLessonIndex: 1,
        onboardingCompleted: false,
        lastActivityAt: null,
      });
      expect(result.streak).toEqual({
        currentStreak: 0,
        longestStreak: 0,
        lastActiveDate: null,
      });
    });

    it('should throw NotFoundException if user does not exist', async () => {
      prisma.user.findUnique.mockResolvedValue(null);

      await expect(service.getProfile('nonexistent')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('updateProfile', () => {
    it('should update and return user profile', async () => {
      prisma.user.findUnique.mockResolvedValue(mockUser);
      prisma.user.update.mockResolvedValue({
        id: 'user-1',
        phone: '+923001234567',
        email: null,
        name: 'Updated Name',
        profilePicture: null,
        createdAt: mockUser.createdAt,
      });

      const result = await service.updateProfile('user-1', {
        name: 'Updated Name',
      });

      expect(result.name).toBe('Updated Name');
      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: 'user-1' },
        data: { name: 'Updated Name' },
        select: {
          id: true,
          phone: true,
          email: true,
          name: true,
          profilePicture: true,
          createdAt: true,
        },
      });
    });

    it('should update profile picture', async () => {
      prisma.user.findUnique.mockResolvedValue(mockUser);
      prisma.user.update.mockResolvedValue({
        ...mockUser,
        profilePicture: 'https://example.com/photo.jpg',
      });

      const result = await service.updateProfile('user-1', {
        profilePicture: 'https://example.com/photo.jpg',
      });

      expect(result.profilePicture).toBe('https://example.com/photo.jpg');
    });

    it('should throw NotFoundException if user does not exist', async () => {
      prisma.user.findUnique.mockResolvedValue(null);

      await expect(
        service.updateProfile('nonexistent', { name: 'Test' }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('completeOnboarding', () => {
    it('should create progress and mark onboarding complete', async () => {
      prisma.user.findUnique.mockResolvedValue(mockUser);
      prisma.userProgress.upsert.mockResolvedValue({
        ...mockProgress,
        onboardingCompleted: true,
      });

      const result = await service.completeOnboarding('user-1');

      expect(result).toEqual({
        message: 'Onboarding completed',
        onboardingCompleted: true,
      });
      expect(prisma.userProgress.upsert).toHaveBeenCalledWith({
        where: { userId: 'user-1' },
        update: { onboardingCompleted: true },
        create: { userId: 'user-1', onboardingCompleted: true },
      });
    });

    it('should be idempotent when called multiple times', async () => {
      prisma.user.findUnique.mockResolvedValue(mockUser);
      prisma.userProgress.upsert.mockResolvedValue({
        ...mockProgress,
        onboardingCompleted: true,
      });

      const result1 = await service.completeOnboarding('user-1');
      const result2 = await service.completeOnboarding('user-1');

      expect(result1.onboardingCompleted).toBe(true);
      expect(result2.onboardingCompleted).toBe(true);
    });

    it('should throw NotFoundException if user does not exist', async () => {
      prisma.user.findUnique.mockResolvedValue(null);

      await expect(service.completeOnboarding('nonexistent')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
