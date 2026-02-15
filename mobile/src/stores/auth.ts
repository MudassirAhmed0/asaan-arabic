import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';
import { usersApi } from '../api/users';
import { useProgressStore } from './progress';
import { usePreferencesStore } from './preferences';
import { registerForPushNotifications, unregisterPushNotifications } from '../services/notifications';
import { initRevenueCat, resetRevenueCat } from '../services/purchases';
import { usePremiumStore } from './premium';
import { setOnSessionExpired } from '../api/client';

interface User {
  id: string;
  phone?: string | null;
  email?: string | null;
  name?: string | null;
  profilePicture?: string | null;
  createdAt?: string | null;
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
  clearSession: () => void;
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
      // Register callback so interceptor can signal session expiry
      setOnSessionExpired(() => {
        useAuthStore.getState().clearSession();
      });

      const token = await SecureStore.getItemAsync('accessToken');
      if (!token) {
        set({ isAuthenticated: false, isLoading: false });
        return;
      }

      // Restore onboarding status from local storage immediately
      const savedOnboarding = await SecureStore.getItemAsync('onboardingCompleted');
      set({ isAuthenticated: true, onboardingCompleted: savedOnboarding === 'true' });

      // Try to fetch profile to get onboarding status
      try {
        await get().fetchProfile();
      } catch {
        // Token might be expired — the interceptor will try to refresh
        // If refresh also fails, interceptor clears tokens + calls clearSession
        // Double-check: if tokens were cleared, update auth state
        const remainingToken = await SecureStore.getItemAsync('accessToken');
        if (!remainingToken) {
          set({ isAuthenticated: false, user: null, onboardingCompleted: false });
        }
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
        createdAt: profile.createdAt,
      },
      onboardingCompleted: profile.progress.onboardingCompleted,
    });
    // Persist onboarding status locally so it survives app restarts
    if (profile.progress.onboardingCompleted) {
      SecureStore.setItemAsync('onboardingCompleted', 'true');
    }
    useProgressStore.getState().setProgress({
      totalWordsLearned: profile.progress.totalWordsLearned,
      currentLessonIndex: profile.progress.currentLessonIndex,
      currentStreak: profile.streak.currentStreak,
      longestStreak: profile.streak.longestStreak,
      lastActivityAt: profile.progress.lastActivityAt,
      onboardingCompleted: profile.progress.onboardingCompleted,
    });
    usePreferencesStore.getState().setPreferences({
      soundEnabled: profile.soundEnabled,
      hapticsEnabled: profile.hapticsEnabled,
    });

    // Register for push notifications after profile load
    registerForPushNotifications();

    // TODO: Re-enable RevenueCat after payment setup
    // initRevenueCat(profile.id).then(() => {
    //   usePremiumStore.getState().checkPremiumStatus();
    // });
    usePremiumStore.getState().setPremium(true);
  },

  setOnboardingCompleted: (value) => {
    set({ onboardingCompleted: value });
    SecureStore.setItemAsync('onboardingCompleted', value ? 'true' : 'false');
  },

  clearSession: () => {
    set({ user: null, isAuthenticated: false, onboardingCompleted: false });
  },

  logout: async () => {
    await unregisterPushNotifications();
    resetRevenueCat();
    usePremiumStore.getState().setPremium(false);
    await SecureStore.deleteItemAsync('accessToken');
    await SecureStore.deleteItemAsync('refreshToken');
    await SecureStore.deleteItemAsync('onboardingCompleted');
    set({ user: null, isAuthenticated: false, onboardingCompleted: false });
  },
}));
