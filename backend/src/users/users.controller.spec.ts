import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

const mockUser = {
  id: 'user-1',
  phone: '+923001234567',
  email: null,
  name: 'Test User',
  profilePicture: null,
  createdAt: new Date('2026-01-01'),
};

const mockProfile = {
  ...mockUser,
  progress: {
    totalWordsLearned: 10,
    currentLessonIndex: 3,
    onboardingCompleted: true,
    lastActivityAt: new Date('2026-01-26'),
  },
  streak: {
    currentStreak: 5,
    longestStreak: 7,
    lastActiveDate: new Date('2026-01-26'),
  },
};

describe('UsersController (e2e)', () => {
  let app: INestApplication;
  let usersService: {
    getProfile: jest.Mock;
    updateProfile: jest.Mock;
    completeOnboarding: jest.Mock;
  };

  beforeEach(async () => {
    usersService = {
      getProfile: jest.fn(),
      updateProfile: jest.fn(),
      completeOnboarding: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: usersService }],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({
        canActivate: (context: any) => {
          const req = context.switchToHttp().getRequest();
          req.user = mockUser;
          return true;
        },
      })
      .compile();

    app = module.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('GET /users/me', () => {
    it('should return the user profile', async () => {
      usersService.getProfile.mockResolvedValue(mockProfile);

      const res = await request(app.getHttpServer())
        .get('/users/me')
        .expect(200);

      expect(res.body).toHaveProperty('id', 'user-1');
      expect(res.body).toHaveProperty('progress');
      expect(res.body.progress.totalWordsLearned).toBe(10);
      expect(res.body).toHaveProperty('streak');
      expect(res.body.streak.currentStreak).toBe(5);
      expect(usersService.getProfile).toHaveBeenCalledWith('user-1');
    });
  });

  describe('PATCH /users/me', () => {
    it('should update name', async () => {
      usersService.updateProfile.mockResolvedValue({
        ...mockUser,
        name: 'New Name',
      });

      const res = await request(app.getHttpServer())
        .patch('/users/me')
        .send({ name: 'New Name' })
        .expect(200);

      expect(res.body.name).toBe('New Name');
      expect(usersService.updateProfile).toHaveBeenCalledWith('user-1', {
        name: 'New Name',
      });
    });

    it('should update profile picture', async () => {
      usersService.updateProfile.mockResolvedValue({
        ...mockUser,
        profilePicture: 'https://example.com/photo.jpg',
      });

      const res = await request(app.getHttpServer())
        .patch('/users/me')
        .send({ profilePicture: 'https://example.com/photo.jpg' })
        .expect(200);

      expect(res.body.profilePicture).toBe('https://example.com/photo.jpg');
    });

    it('should reject invalid profile picture URL', async () => {
      await request(app.getHttpServer())
        .patch('/users/me')
        .send({ profilePicture: 'not-a-url' })
        .expect(400);
    });

    it('should reject unknown fields', async () => {
      await request(app.getHttpServer())
        .patch('/users/me')
        .send({ name: 'Test', hackField: 'malicious' })
        .expect(400);
    });

    it('should reject name exceeding 255 chars', async () => {
      await request(app.getHttpServer())
        .patch('/users/me')
        .send({ name: 'a'.repeat(256) })
        .expect(400);
    });
  });

  describe('POST /users/me/onboarding', () => {
    it('should complete onboarding', async () => {
      usersService.completeOnboarding.mockResolvedValue({
        message: 'Onboarding completed',
        onboardingCompleted: true,
      });

      const res = await request(app.getHttpServer())
        .post('/users/me/onboarding')
        .expect(200);

      expect(res.body.message).toBe('Onboarding completed');
      expect(res.body.onboardingCompleted).toBe(true);
      expect(usersService.completeOnboarding).toHaveBeenCalledWith('user-1');
    });

    it('should be idempotent', async () => {
      usersService.completeOnboarding.mockResolvedValue({
        message: 'Onboarding completed',
        onboardingCompleted: true,
      });

      await request(app.getHttpServer())
        .post('/users/me/onboarding')
        .expect(200);

      await request(app.getHttpServer())
        .post('/users/me/onboarding')
        .expect(200);

      expect(usersService.completeOnboarding).toHaveBeenCalledTimes(2);
    });
  });
});
