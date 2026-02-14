import { WordSeedData } from './words-types';
import { WORDS_L1_L20 } from './words-foundation';
import { WORDS_L21_L40 } from './words-intermediate';
import { WORDS_L41_L60 } from './words-advanced';

export type { WordSeedData };

export const WORDS: WordSeedData[] = [
  ...WORDS_L1_L20,
  ...WORDS_L21_L40,
  ...WORDS_L41_L60,
];
