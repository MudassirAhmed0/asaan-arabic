import { api } from './client';

export interface TodayChallengeResponse {
  challenge: {
    id: string;
    date: string;
    type: 'MEMORY_TEST' | 'FUN_FACT' | 'QUICK_QUIZ' | 'WORD_OF_THE_DAY';
    payload: Record<string, any>;
  } | null;
  attempt: {
    answered: boolean;
    correct: boolean | null;
    answeredAt: string | null;
  } | null;
}

export interface AttemptResponse {
  correct: boolean | null;
  currentStreak: number;
  longestStreak: number;
}

export interface ChallengeHistoryItem {
  id: string;
  date: string;
  type: string;
  answered: boolean;
  correct: boolean | null;
}

export const challengesApi = {
  getTodayChallenge: async () => {
    const { data } = await api.get<TodayChallengeResponse>('/challenges/today');
    return data;
  },

  submitAttempt: async (challengeId: string, answer?: number) => {
    const { data } = await api.post<AttemptResponse>(
      `/challenges/${challengeId}/attempt`,
      { answer },
    );
    return data;
  },

  getHistory: async () => {
    const { data } = await api.get<ChallengeHistoryItem[]>('/challenges/history');
    return data;
  },
};
