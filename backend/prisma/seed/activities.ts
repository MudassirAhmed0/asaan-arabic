import { ActivityType, Prisma } from '@prisma/client';
import { ACTIVITIES_L1_L30 } from './activities-part1';
import { ACTIVITIES_L31_L60 } from './activities-part2';

export interface ActivitySeedData {
  lessonOrderIndex: number;
  orderIndex: number;
  type: ActivityType;
  payload: Prisma.InputJsonValue;
}

export const ACTIVITIES: ActivitySeedData[] = [
  ...ACTIVITIES_L1_L30,
  ...ACTIVITIES_L31_L60,
];
