import { api } from './client';

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  isNewUser: boolean;
}

export const authApi = {
  sendOtp: async (phone: string) => {
    const { data } = await api.post<{ message: string }>('/auth/otp/send', { phone });
    return data;
  },

  verifyOtp: async (phone: string, code: string) => {
    const { data } = await api.post<AuthResponse>('/auth/otp/verify', { phone, code });
    return data;
  },

  googleAuth: async (idToken: string) => {
    const { data } = await api.post<AuthResponse>('/auth/google', { idToken });
    return data;
  },

  refresh: async (refreshToken: string) => {
    const { data } = await api.post<{ accessToken: string; refreshToken: string }>(
      '/auth/refresh',
      { refreshToken },
    );
    return data;
  },

  logout: async (refreshToken: string) => {
    const { data } = await api.post<{ message: string }>('/auth/logout', { refreshToken });
    return data;
  },

  devLogin: async () => {
    const { data } = await api.post<AuthResponse>('/auth/dev-login');
    return data;
  },
};
