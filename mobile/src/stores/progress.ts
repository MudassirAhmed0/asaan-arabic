import { create } from 'zustand';

interface ProgressState {
  totalWordsLearned: number;
  currentLessonIndex: number;
  currentStreak: number;
  longestStreak: number;
  lastActivityAt: string | null;
  onboardingCompleted: boolean;

  setProgress: (data: Partial<ProgressState>) => void;
  incrementWords: (count: number) => void;
  advanceLesson: () => void;
}

export const useProgressStore = create<ProgressState>((set) => ({
  totalWordsLearned: 0,
  currentLessonIndex: 1,
  currentStreak: 0,
  longestStreak: 0,
  lastActivityAt: null,
  onboardingCompleted: false,

  setProgress: (data) => set(data),

  incrementWords: (count) =>
    set((state) => ({ totalWordsLearned: state.totalWordsLearned + count })),

  advanceLesson: () =>
    set((state) => ({ currentLessonIndex: state.currentLessonIndex + 1 })),
}));
