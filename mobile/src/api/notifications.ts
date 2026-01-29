import { api } from './client';

export const notificationsApi = {
  register: async (token: string, platform: string) => {
    const { data } = await api.post('/notifications/register', { token, platform });
    return data;
  },

  unregister: async (token: string) => {
    await api.delete('/notifications/unregister', { data: { token } });
  },
};
