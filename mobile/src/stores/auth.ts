import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';
import { usersApi } from '../api/users';
import { useProgressStore } from './progress';

interface User {
  id: string;
  phone?: string | null;
  email?: string | null;
  name?: string | null;
  profilePicture?: string | null;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  onboardingCompleted: boolean;

  setUser: (user: User) => void;
  setTokens: (accessToken: string, refreshToken: string) => Promise<void>;
  loadSession: () => Promise<void>;
  fetchProfile: () => Promise<void>;
  setOnboardingCompleted: (value: boolean) => void;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  onboardingCompleted: false,

  setUser: (user) => set({ user, isAuthenticated: true }),

  setTokens: async (accessToken, refreshToken) => {
    await SecureStore.setItemAsync('accessToken', accessToken);
    await SecureStore.setItemAsync('refreshToken', refreshToken);
    set({ isAuthenticated: true });
  },

  loadSession: async () => {
    try {
      const token = await SecureStore.getItemAsync('accessToken');
      if (!token) {
        set({ isAuthenticated: false, isLoading: false });
        return;
      }

      set({ isAuthenticated: true });

      // Try to fetch profile to get onboarding status
      try {
        await get().fetchProfile();
      } catch {
        // Token might be expired — the interceptor will try to refresh
        // If refresh also fails, tokens are cleared and user redirects to auth
      }
    } finally {
      set({ isLoading: false });
    }
  },

  fetchProfile: async () => {
    const profile = await usersApi.getProfile();
    set({
      user: {
        id: profile.id,
        phone: profile.phone,
        email: profile.email,
        name: profile.name,
        profilePicture: profile.profilePicture,
      },
      onboardingCompleted: profile.progress.onboardingCompleted,
    });
    useProgressStore.getState().setProgress({
      totalWordsLearned: profile.progress.totalWordsLearned,
      currentLessonIndex: profile.progress.currentLessonIndex,
      currentStreak: profile.streak.currentStreak,
      longestStreak: profile.streak.longestStreak,
      lastActivityAt: profile.progress.lastActivityAt,
      onboardingCompleted: profile.progress.onboardingCompleted,
    });
  },

  setOnboardingCompleted: (value) => set({ onboardingCompleted: value }),

  logout: async () => {
    await SecureStore.deleteItemAsync('accessToken');
    await SecureStore.deleteItemAsync('refreshToken');
    set({ user: null, isAuthenticated: false, onboardingCompleted: false });
  },
}));
