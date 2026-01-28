import { api } from './client';
import type {
  LearnedWordsResponse,
  WordDetailResponse,
  WordProgress,
  WordStatus,
} from '../types';

interface PracticeRound {
  wordId: string;
  arabic: string;
  transliteration: string;
  meaning: string;
  options: string[];
  correctIndex: number;
}

interface PracticeResponse {
  rounds: PracticeRound[];
  totalLearned: number;
  revisionCount: number;
}

interface QuizResultsResponse {
  currentStreak: number;
  longestStreak: number;
}

export type { PracticeRound, PracticeResponse };

export const wordsApi = {
  getLearnedWords: async (params?: { search?: string; status?: WordStatus }) => {
    const { data } = await api.get<LearnedWordsResponse>('/words', { params });
    return data;
  },

  getWordDetail: async (wordId: string) => {
    const { data } = await api.get<WordDetailResponse>(`/words/${wordId}`);
    return data;
  },

  updateWordStatus: async (wordId: string, status: WordStatus) => {
    const { data } = await api.patch<WordProgress>(`/words/${wordId}/status`, { status });
    return data;
  },

  getPractice: async (count?: number, status?: WordStatus) => {
    const params: Record<string, string> = {};
    if (count) params.count = String(count);
    if (status) params.status = status;
    const { data } = await api.get<PracticeResponse>('/words/practice', { params });
    return data;
  },

  submitQuizResults: async (results: { wordId: string; correct: boolean }[]) => {
    const { data } = await api.post<QuizResultsResponse>('/words/quiz-results', { results });
    return data;
  },
};
