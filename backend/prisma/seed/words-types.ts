import { IntroductionStyle } from '@prisma/client';

export interface WordSeedData {
  orderIndex: number;
  arabic: string;
  transliteration: string;
  meaning: string;
  frequency: number;
  audioUrl: string;
  lessonOrderIndex: number;
  introduction: {
    style: IntroductionStyle;
    headline: string;
    body: string;
    ayahText?: string;
    ayahRef?: string;
    factStat?: string;
    quickCheckQuestion?: string;
    quickCheckOptions?: string[];
    quickCheckAnswer?: number;
  };
}
