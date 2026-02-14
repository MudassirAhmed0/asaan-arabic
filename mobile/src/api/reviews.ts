import { api } from './client';

export interface ReviewRound {
  wordId: string;
  arabic: string;
  transliteration: string;
  meaning: string;
  options: string[];
  correctIndex: number;
}

export interface WeeklyReviewStatus {
  available: boolean;
  completed: boolean;
  isPremiumLocked: boolean;
  score?: number;
  totalWords?: number;
  completedAt?: string;
  weekNumber: number;
  year: number;
  rounds: ReviewRound[];
}

export interface SubmitReviewResponse {
  score: number;
  totalWords: number;
  wrongWords: { id: string; arabic: string; meaning: string }[];
  currentStreak: number;
  longestStreak: number;
}

export interface ReviewHistoryItem {
  weekNumber: number;
  year: number;
  score: number;
  totalWords: number;
  completedAt: string;
}

export const reviewsApi = {
  getCurrent: async () => {
    const { data } = await api.get<WeeklyReviewStatus>('/reviews/current');
    return data;
  },

  submit: async (results: { wordId: string; correct: boolean }[]) => {
    const { data } = await api.post<SubmitReviewResponse>('/reviews/submit', {
      results,
    });
    return data;
  },

  getHistory: async () => {
    const { data } = await api.get<ReviewHistoryItem[]>('/reviews/history');
    return data;
  },
};
