import { api } from './client';

interface ReviewRound {
  arabic: string;
  transliteration: string;
  options: string[];
  correctIndex: number;
}

interface ReviewResponse {
  rounds: ReviewRound[];
  totalLearned: number;
}

interface ReviewCompleteResponse {
  currentStreak: number;
  longestStreak: number;
}

export const wordsApi = {
  getReview: async () => {
    const { data } = await api.get<ReviewResponse>('/words/review');
    return data;
  },

  completeReview: async () => {
    const { data } = await api.post<ReviewCompleteResponse>('/words/review/complete');
    return data;
  },
};
