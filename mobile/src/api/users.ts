import { api } from './client';
import type { UserProgressSummary } from '../types';

interface UserProfile {
  id: string;
  phone: string | null;
  email: string | null;
  name: string | null;
  profilePicture: string | null;
  createdAt: string;
  progress: {
    totalWordsLearned: number;
    currentLessonIndex: number;
    onboardingCompleted: boolean;
    lastActivityAt: string | null;
  };
  streak: {
    currentStreak: number;
    longestStreak: number;
    lastActiveDate: string | null;
  };
}

export const usersApi = {
  getProfile: async () => {
    const { data } = await api.get<UserProfile>('/users/me');
    return data;
  },

  updateProfile: async (update: { name?: string; profilePicture?: string }) => {
    const { data } = await api.patch<UserProfile>('/users/me', update);
    return data;
  },

  completeOnboarding: async () => {
    const { data } = await api.post<{ message: string; onboardingCompleted: boolean }>(
      '/users/me/onboarding',
    );
    return data;
  },
};
