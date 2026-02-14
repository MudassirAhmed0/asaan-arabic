import { api } from './client';

export const subscriptionsApi = {
  getStatus: async () => {
    const { data } = await api.get('/subscriptions/status');
    return data as {
      isPremium: boolean;
      subscription: {
        status: string;
        productId: string;
        platform: string;
        expiresAt: string | null;
      } | null;
    };
  },

  verify: async (params: {
    revenuecatCustomerId: string;
    platform: 'IOS' | 'ANDROID';
    productId: string;
    expiresAt?: string;
  }) => {
    const { data } = await api.post('/subscriptions/verify', params);
    return data as { success: boolean };
  },
};
