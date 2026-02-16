// ── Lesson & Content Types ──

export interface Lesson {
  id: string;
  orderIndex: number;
  title: string;
  subtitle: string;
  wordCount: number;
  isPublished: boolean;
}

export interface Word {
  id: string;
  orderIndex: number;
  arabic: string;
  transliteration: string;
  meaning: string;
  frequency: number;
  audioUrl: string;
  lessonId: string;
  introduction?: WordIntroduction;
}

export type IntroductionStyle =
  | 'COGNATE'
  | 'QURAN_CONTEXT'
  | 'FUN_FACT'
  | 'QUICK_CHECK'
  | 'LIFE_CONNECTION';

export interface WordIntroduction {
  id: string;
  style: IntroductionStyle;
  headline: string;
  body: string;
  ayahText?: string;
  ayahRef?: string;
  factStat?: string;
  quickCheckQuestion?: string;
  quickCheckOptions?: string[];
  quickCheckAnswer?: number;
}

export type ActivityType = 'MATCH' | 'SPOT_IN_QURAN' | 'QUICK_FIRE' | 'FILL_MEANING';

export interface LessonActivity {
  id: string;
  orderIndex: number;
  type: ActivityType;
  payload: Record<string, unknown>;
}

export interface MidLessonMessage {
  headline: string;
  body: string;
}

export interface CelebrationStat {
  ayahCoverage: string;
  cumulativeWords: number;
}

// ── Arabic Insight ──

export type InsightType =
  | 'ROOT_PATTERN'
  | 'GRAMMAR_TIP'
  | 'CULTURAL_NOTE'
  | 'PATTERN_RECOGNITION'
  | 'WORD_FAMILY';

export interface InsightExample {
  arabic: string;
  transliteration: string;
  meaning: string;
  note?: string;
}

export interface ArabicInsight {
  id: string;
  type: InsightType;
  title: string;
  body: string;
  examples: InsightExample[];
}

// ── Full lesson content (from GET /lessons/:id) ──

export interface LessonContent {
  lesson: Lesson;
  words: Word[];
  activities: LessonActivity[];
  midLessonMessage: MidLessonMessage;
  arabicInsight: ArabicInsight | null;
  celebrationStat: CelebrationStat;
  premiumTier: 'free' | 'taste' | 'premium';
  isPremiumUser: boolean;
}

// ── User Progress ──

export interface UserProgressSummary {
  totalWordsLearned: number;
  currentLessonIndex: number;
  currentStreak: number;
  onboardingCompleted: boolean;
}

export type WordStatus = 'LEARNED' | 'NEEDS_REVISION' | 'MASTERED';

export interface WordProgress {
  id: string;
  wordId: string;
  status: WordStatus;
  timesCorrect: number;
  timesIncorrect: number;
  word: Word;
}

// ── Daily Challenge ──

export type ChallengeType = 'MEMORY_TEST' | 'FUN_FACT' | 'QUICK_QUIZ' | 'WORD_OF_THE_DAY';

export interface DailyChallenge {
  id: string;
  date: string;
  type: ChallengeType;
  payload: Record<string, unknown>;
  answered?: boolean;
  correct?: boolean;
}

// ── Ayah Highlight ──

export interface AyahHighlight {
  id: string;
  surahName: string;
  surahNum: number;
  ayahNum: number;
  arabicText: string;
  highlightStartIndex: number;
  highlightEndIndex: number;
}

// ── Word with highlights (from lesson content) ──

export interface WordWithDetails extends Word {
  ayahHighlights: AyahHighlight[];
}

// ── Lesson list item with user status ──

export interface LessonListItem extends Lesson {
  isCompleted: boolean;
  isLocked: boolean;
  premiumTier: 'free' | 'taste' | 'premium';
  isPremiumUser: boolean;
}

// ── Full lesson content response ──

export interface LessonContentResponse {
  lesson: Lesson;
  words: WordWithDetails[];
  activities: LessonActivity[];
  midLessonMessage: MidLessonMessage;
  arabicInsight: ArabicInsight | null;
  celebrationStat: CelebrationStat;
  premiumTier: 'free' | 'taste' | 'premium';
  isPremiumUser: boolean;
}

// ── Lesson start response ──

export interface LessonStartResponse {
  attemptId: string;
}

// ── Lesson complete response ──

export interface LessonCompleteResponse {
  totalWordsLearned: number;
  currentLessonIndex: number;
  wordsInLesson: number;
  currentStreak: number;
  longestStreak: number;
}

// ── Learned Words Response ──

export interface LearnedWordItem {
  id: string;
  wordId: string;
  status: WordStatus;
  timesCorrect: number;
  timesIncorrect: number;
  learnedAt: string;
  word: Word & {
    introduction?: { headline: string; style: IntroductionStyle };
  };
}

export interface LearnedWordsResponse {
  words: LearnedWordItem[];
  totalCount: number;
}

export interface WordDetailResponse {
  id: string;
  arabic: string;
  transliteration: string;
  meaning: string;
  frequency: number;
  audioUrl: string;
  lessonId: string;
  introduction: WordIntroduction | null;
  ayahHighlights: AyahHighlight[];
  lesson: { title: string; orderIndex: number };
  progress: {
    status: WordStatus;
    timesCorrect: number;
    timesIncorrect: number;
    lastReviewedAt: string | null;
    learnedAt: string;
  } | null;
}


// ── Streak ──

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string | null;
}
