import { api } from './client';

interface UserProfile {
  id: string;
  phone: string | null;
  email: string | null;
  name: string | null;
  profilePicture: string | null;
  createdAt: string;
  soundEnabled: boolean;
  hapticsEnabled: boolean;
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

interface UpdateProfilePayload {
  name?: string;
  profilePicture?: string;
  soundEnabled?: boolean;
  hapticsEnabled?: boolean;
}

export const usersApi = {
  getProfile: async () => {
    const { data } = await api.get<UserProfile>('/users/me');
    return data;
  },

  updateProfile: async (update: UpdateProfilePayload) => {
    const { data } = await api.patch<UserProfile>('/users/me', update);
    return data;
  },

  resetProgress: async () => {
    const { data } = await api.post<{ message: string }>('/users/me/reset-progress');
    return data;
  },

  completeOnboarding: async () => {
    const { data } = await api.post<{ message: string; onboardingCompleted: boolean }>(
      '/users/me/onboarding',
    );
    return data;
  },
};
