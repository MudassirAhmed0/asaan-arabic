import { create } from 'zustand';

export type LessonStep =
  | { type: 'entry' }
  | { type: 'word'; wordIndex: number }
  | { type: 'insight' }
  | { type: 'mid-message' }
  | { type: 'activity'; activityIndex: number }
  | { type: 'complete' };

interface LessonFlowState {
  lessonId: string | null;
  attemptId: string | null;
  steps: LessonStep[];
  currentStepIndex: number;
  score: number;
  totalQuestions: number;

  initFlow: (params: {
    lessonId: string;
    attemptId: string;
    wordCount: number;
    activityCount: number;
    hasInsight: boolean;
  }) => void;
  nextStep: () => void;
  prevStep: () => void;
  addScore: (correct: boolean) => void;
  reset: () => void;

  // Derived
  currentStep: () => LessonStep | null;
  progress: () => number;
  isLastStep: () => boolean;
  canGoBack: () => boolean;
}

function buildSteps(
  wordCount: number,
  activityCount: number,
  hasInsight: boolean,
): LessonStep[] {
  const steps: LessonStep[] = [{ type: 'entry' }];

  for (let i = 0; i < wordCount; i++) {
    steps.push({ type: 'word', wordIndex: i });
  }

  if (hasInsight) {
    steps.push({ type: 'insight' });
  }

  steps.push({ type: 'mid-message' });

  for (let i = 0; i < activityCount; i++) {
    steps.push({ type: 'activity', activityIndex: i });
  }

  steps.push({ type: 'complete' });

  return steps;
}

export const useLessonFlowStore = create<LessonFlowState>((set, get) => ({
  lessonId: null,
  attemptId: null,
  steps: [],
  currentStepIndex: 0,
  score: 0,
  totalQuestions: 0,

  initFlow: ({ lessonId, attemptId, wordCount, activityCount, hasInsight }) => {
    set({
      lessonId,
      attemptId,
      steps: buildSteps(wordCount, activityCount, hasInsight),
      currentStepIndex: 0,
      score: 0,
      totalQuestions: 0,
    });
  },

  nextStep: () => {
    const { currentStepIndex, steps } = get();
    if (currentStepIndex < steps.length - 1) {
      set({ currentStepIndex: currentStepIndex + 1 });
    }
  },

  prevStep: () => {
    const { currentStepIndex, steps } = get();
    // Only allow going back from word (not first) or mid-message steps
    const current = steps[currentStepIndex];
    if (!current) return;
    const canBack =
      (current.type === 'word' && current.wordIndex > 0) ||
      current.type === 'mid-message';
    if (canBack && currentStepIndex > 0) {
      set({ currentStepIndex: currentStepIndex - 1 });
    }
  },

  addScore: (correct) => {
    set((s) => ({
      score: correct ? s.score + 1 : s.score,
      totalQuestions: s.totalQuestions + 1,
    }));
  },

  reset: () => {
    set({
      lessonId: null,
      attemptId: null,
      steps: [],
      currentStepIndex: 0,
      score: 0,
      totalQuestions: 0,
    });
  },

  currentStep: () => {
    const { steps, currentStepIndex } = get();
    return steps[currentStepIndex] ?? null;
  },

  progress: () => {
    const { currentStepIndex, steps } = get();
    if (steps.length <= 1) return 0;
    return currentStepIndex / (steps.length - 1);
  },

  isLastStep: () => {
    const { currentStepIndex, steps } = get();
    return currentStepIndex === steps.length - 1;
  },

  canGoBack: () => {
    const { currentStepIndex, steps } = get();
    const current = steps[currentStepIndex];
    if (!current) return false;
    return (
      (current.type === 'word' && current.wordIndex > 0) ||
      current.type === 'insight' ||
      current.type === 'mid-message'
    );
  },
}));
