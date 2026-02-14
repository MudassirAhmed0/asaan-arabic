import { InsightType } from '@prisma/client';

export interface InsightSeedData {
  lessonOrderIndex: number;
  type: InsightType;
  title: string;
  body: string;
  examples: Array<{
    arabic: string;
    transliteration: string;
    meaning: string;
    note?: string;
  }>;
}
