import { create } from 'zustand';
import {
  checkEntitlement,
  restorePurchases,
  getRevenueCatUserId,
  getPlatform,
} from '../services/purchases';
import { subscriptionsApi } from '../api/subscriptions';

interface PremiumState {
  isPremium: boolean;
  isLoading: boolean;

  setPremium: (value: boolean) => void;
  setLoading: (value: boolean) => void;
  checkPremiumStatus: () => Promise<void>;
  restore: () => Promise<boolean>;
  syncPurchaseToBackend: (productId: string, expiresAt?: string) => Promise<void>;
}

export const usePremiumStore = create<PremiumState>((set, get) => ({
  isPremium: false,
  isLoading: false,

  setPremium: (value) => set({ isPremium: value }),
  setLoading: (value) => set({ isLoading: value }),

  checkPremiumStatus: async () => {
    try {
      const hasEntitlement = await checkEntitlement();
      set({ isPremium: hasEntitlement });
    } catch {
      // Fall back to backend status
      try {
        const status = await subscriptionsApi.getStatus();
        set({ isPremium: status.isPremium });
      } catch {
        // Silent fail
      }
    }
  },

  restore: async () => {
    set({ isLoading: true });
    try {
      const restored = await restorePurchases();
      set({ isPremium: restored });

      if (restored) {
        // Sync to backend
        await get().syncPurchaseToBackend('restored');
      }

      return restored;
    } finally {
      set({ isLoading: false });
    }
  },

  syncPurchaseToBackend: async (productId: string, expiresAt?: string) => {
    try {
      const rcUserId = await getRevenueCatUserId();
      if (!rcUserId) return;

      await subscriptionsApi.verify({
        revenuecatCustomerId: rcUserId,
        platform: getPlatform(),
        productId,
        expiresAt,
      });
    } catch {
      // Silent fail — webhook will catch it
    }
  },
}));
