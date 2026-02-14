import { ActivityType, Prisma } from '@prisma/client';

export interface ActivitySeedData {
  lessonOrderIndex: number;
  orderIndex: number;
  type: ActivityType;
  payload: Prisma.InputJsonValue;
}

export const ACTIVITIES_L31_L60: ActivitySeedData[] = [
  // ── Lesson 31: MATCH + SPOT_IN_QURAN ──
  {
    lessonOrderIndex: 31,
    orderIndex: 1,
    type: ActivityType.MATCH,
    payload: {
      pairs: [
        { wordOrderIndex: 151, arabic: 'كَانَ', meaning: 'to be/was' },
        { wordOrderIndex: 152, arabic: 'لَيْسَ', meaning: 'is not' },
        { wordOrderIndex: 153, arabic: 'فَعَلَ', meaning: 'to do' },
        { wordOrderIndex: 154, arabic: 'وَجَدَ', meaning: 'to find' },
        { wordOrderIndex: 150, arabic: 'أَهْل', meaning: 'Family, People of' },
      ],
    },
  },
  {
    lessonOrderIndex: 31,
    orderIndex: 2,
    type: ActivityType.SPOT_IN_QURAN,
    payload: {
      wordOrderIndex: 152,
    },
  },

  // ── Lesson 32: QUICK_FIRE + FILL_MEANING ──
  {
    lessonOrderIndex: 32,
    orderIndex: 1,
    type: ActivityType.QUICK_FIRE,
    payload: {
      rounds: [
        { wordOrderIndex: 156, arabic: 'إِنْسَان', options: ['Human', 'Face'], correctIndex: 0 },
        { wordOrderIndex: 158, arabic: 'يَد', options: ['Eye', 'Hand'], correctIndex: 1 },
        { wordOrderIndex: 160, arabic: 'خَلْق', options: ['Creation', 'Human'], correctIndex: 0 },
        { wordOrderIndex: 155, arabic: 'سَأَلَ', options: ['to find', 'to ask'], correctIndex: 1 },
      ],
    },
  },
  {
    lessonOrderIndex: 32,
    orderIndex: 2,
    type: ActivityType.FILL_MEANING,
    payload: {
      wordOrderIndex: 159,
      arabic: 'عَيْن',
      prompt: '___ means "Eye, Spring"',
      options: ['وَجْه', 'عَيْن', 'يَد', 'خَلْق'],
      correctIndex: 1,
    },
  },

  // ── Lesson 33: MATCH + QUICK_FIRE ──
  {
    lessonOrderIndex: 33,
    orderIndex: 1,
    type: ActivityType.MATCH,
    payload: {
      pairs: [
        { wordOrderIndex: 161, arabic: 'مَلَك', meaning: 'Angel' },
        { wordOrderIndex: 162, arabic: 'شَيْطَان', meaning: 'Satan' },
        { wordOrderIndex: 163, arabic: 'جَهَنَّم', meaning: 'Hellfire' },
        { wordOrderIndex: 164, arabic: 'خَالِد', meaning: 'Abiding forever' },
        { wordOrderIndex: 156, arabic: 'إِنْسَان', meaning: 'Human' },
      ],
    },
  },
  {
    lessonOrderIndex: 33,
    orderIndex: 2,
    type: ActivityType.QUICK_FIRE,
    payload: {
      rounds: [
        { wordOrderIndex: 165, arabic: 'أَصْحَاب', options: ['Companions', 'Angels'], correctIndex: 0 },
        { wordOrderIndex: 162, arabic: 'شَيْطَان', options: ['Hellfire', 'Satan'], correctIndex: 1 },
        { wordOrderIndex: 161, arabic: 'مَلَك', options: ['Angel', 'Abiding'], correctIndex: 0 },
      ],
    },
  },

  // ── Lesson 34: FILL_MEANING + SPOT_IN_QURAN ──
  {
    lessonOrderIndex: 34,
    orderIndex: 1,
    type: ActivityType.FILL_MEANING,
    payload: {
      wordOrderIndex: 170,
      arabic: 'زَوْج',
      prompt: 'In the Qur\'an, زَوْج usually means ___',
      options: ['Child', 'Brother', 'Spouse/Pair', 'Son'],
      correctIndex: 2,
    },
  },
  {
    lessonOrderIndex: 34,
    orderIndex: 2,
    type: ActivityType.SPOT_IN_QURAN,
    payload: {
      wordOrderIndex: 168,
    },
  },

  // ── Lesson 35: MATCH + FILL_MEANING ──
  {
    lessonOrderIndex: 35,
    orderIndex: 1,
    type: ActivityType.MATCH,
    payload: {
      pairs: [
        { wordOrderIndex: 171, arabic: 'مَال', meaning: 'Wealth' },
        { wordOrderIndex: 172, arabic: 'عَمَل', meaning: 'Deed, Work' },
        { wordOrderIndex: 174, arabic: 'مَتَاع', meaning: 'Provision' },
        { wordOrderIndex: 175, arabic: 'كَثِير', meaning: 'Much, Many' },
        { wordOrderIndex: 166, arabic: 'وَلَد', meaning: 'Child' },
      ],
    },
  },
  {
    lessonOrderIndex: 35,
    orderIndex: 2,
    type: ActivityType.FILL_MEANING,
    payload: {
      wordOrderIndex: 173,
      arabic: 'كَسَبَ',
      prompt: 'كَسَبَ means ___',
      options: ['Wealth', 'Much', 'to earn', 'Provision'],
      correctIndex: 2,
    },
  },

  // ── Lesson 36: QUICK_FIRE + SPOT_IN_QURAN ──
  {
    lessonOrderIndex: 36,
    orderIndex: 1,
    type: ActivityType.QUICK_FIRE,
    payload: {
      rounds: [
        { wordOrderIndex: 176, arabic: 'ثُمَّ', options: ['Then', 'Or'], correctIndex: 0 },
        { wordOrderIndex: 178, arabic: 'حَتَّى', options: ['Perhaps', 'Until'], correctIndex: 1 },
        { wordOrderIndex: 180, arabic: 'لَكِنْ', options: ['But', 'Then'], correctIndex: 0 },
        { wordOrderIndex: 177, arabic: 'أَوْ', options: ['Until', 'Or'], correctIndex: 1 },
        { wordOrderIndex: 179, arabic: 'لَعَلَّ', options: ['Perhaps', 'But'], correctIndex: 0 },
      ],
    },
  },
  {
    lessonOrderIndex: 36,
    orderIndex: 2,
    type: ActivityType.SPOT_IN_QURAN,
    payload: {
      wordOrderIndex: 178,
    },
  },

  // ── Lesson 37: MATCH + SPOT_IN_QURAN ──
  {
    lessonOrderIndex: 37,
    orderIndex: 1,
    type: ActivityType.MATCH,
    payload: {
      pairs: [
        { wordOrderIndex: 181, arabic: 'قَبْلَ', meaning: 'Before' },
        { wordOrderIndex: 182, arabic: 'بَعْدَ', meaning: 'After' },
        { wordOrderIndex: 183, arabic: 'عِنْدَ', meaning: 'At, Near' },
        { wordOrderIndex: 184, arabic: 'بَيْنَ', meaning: 'Between' },
        { wordOrderIndex: 176, arabic: 'ثُمَّ', meaning: 'Then' },
      ],
    },
  },
  {
    lessonOrderIndex: 37,
    orderIndex: 2,
    type: ActivityType.SPOT_IN_QURAN,
    payload: {
      wordOrderIndex: 182,
    },
  },

  // ── Lesson 38: QUICK_FIRE + FILL_MEANING ──
  {
    lessonOrderIndex: 38,
    orderIndex: 1,
    type: ActivityType.QUICK_FIRE,
    payload: {
      rounds: [
        { wordOrderIndex: 186, arabic: 'بَعْض', options: ['Some/Part', 'Those'], correctIndex: 0 },
        { wordOrderIndex: 188, arabic: 'إِذَا', options: ['O (vocative)', 'When/If'], correctIndex: 1 },
        { wordOrderIndex: 190, arabic: 'أَحَد', options: ['One/Anyone', 'Some'], correctIndex: 0 },
        { wordOrderIndex: 184, arabic: 'بَيْنَ', options: ['With', 'Between'], correctIndex: 1 },
      ],
    },
  },
  {
    lessonOrderIndex: 38,
    orderIndex: 2,
    type: ActivityType.FILL_MEANING,
    payload: {
      wordOrderIndex: 189,
      arabic: 'أَيُّهَا',
      prompt: 'In "Ya ayyuhal-ladhina amanu," أَيُّهَا means ___',
      options: ['Those', 'O (vocative)', 'When', 'One'],
      correctIndex: 1,
    },
  },

  // ── Lesson 39: MATCH + QUICK_FIRE ──
  {
    lessonOrderIndex: 39,
    orderIndex: 1,
    type: ActivityType.MATCH,
    payload: {
      pairs: [
        { wordOrderIndex: 191, arabic: 'إِلَه', meaning: 'God, Deity' },
        { wordOrderIndex: 192, arabic: 'غَيْر', meaning: 'Other, Besides' },
        { wordOrderIndex: 193, arabic: 'آخِر', meaning: 'Last, Other' },
        { wordOrderIndex: 194, arabic: 'قَلِيل', meaning: 'Few, Little' },
        { wordOrderIndex: 187, arabic: 'أُولَئِكَ', meaning: 'Those' },
      ],
    },
  },
  {
    lessonOrderIndex: 39,
    orderIndex: 2,
    type: ActivityType.QUICK_FIRE,
    payload: {
      rounds: [
        { wordOrderIndex: 195, arabic: 'جَمِيع', options: ['All/Together', 'Few'], correctIndex: 0 },
        { wordOrderIndex: 193, arabic: 'آخِر', options: ['Other', 'Last/Other'], correctIndex: 1 },
        { wordOrderIndex: 191, arabic: 'إِلَه', options: ['God/Deity', 'Besides'], correctIndex: 0 },
      ],
    },
  },

  // ── Lesson 40: FILL_MEANING + SPOT_IN_QURAN ──
  {
    lessonOrderIndex: 40,
    orderIndex: 1,
    type: ActivityType.FILL_MEANING,
    payload: {
      wordOrderIndex: 198,
      arabic: 'عَدُوّ',
      prompt: 'عَدُوّ means ___',
      options: ['Trial', 'Guardian', 'Victory', 'Enemy'],
      correctIndex: 3,
    },
  },
  {
    lessonOrderIndex: 40,
    orderIndex: 2,
    type: ActivityType.SPOT_IN_QURAN,
    payload: {
      wordOrderIndex: 198,
    },
  },

  // ── Lesson 41: MATCH + FILL_MEANING ──
  {
    lessonOrderIndex: 41,
    orderIndex: 1,
    type: ActivityType.MATCH,
    payload: {
      pairs: [
        { wordOrderIndex: 201, arabic: 'أَوْحَى', meaning: 'to reveal' },
        { wordOrderIndex: 203, arabic: 'أَهْلَكَ', meaning: 'to destroy' },
        { wordOrderIndex: 204, arabic: 'أَحْيَا', meaning: 'to give life' },
        { wordOrderIndex: 205, arabic: 'أَمَرَ', meaning: 'to command' },
        { wordOrderIndex: 196, arabic: 'نَصَرَ', meaning: 'to help' },
      ],
    },
  },
  {
    lessonOrderIndex: 41,
    orderIndex: 2,
    type: ActivityType.FILL_MEANING,
    payload: {
      wordOrderIndex: 202,
      arabic: 'أَخْرَجَ',
      prompt: '___ means "to bring forth"',
      options: ['أَوْحَى', 'أَخْرَجَ', 'أَهْلَكَ', 'أَمَرَ'],
      correctIndex: 1,
    },
  },

  // ── Lesson 42: QUICK_FIRE + SPOT_IN_QURAN ──
  {
    lessonOrderIndex: 42,
    orderIndex: 1,
    type: ActivityType.QUICK_FIRE,
    payload: {
      rounds: [
        { wordOrderIndex: 206, arabic: 'مَاتَ', options: ['to die', 'to raise'], correctIndex: 0 },
        { wordOrderIndex: 208, arabic: 'حَيّ', options: ['Term', 'Living'], correctIndex: 1 },
        { wordOrderIndex: 210, arabic: 'سَاعَة', options: ['Hour of Judgment', 'Living'], correctIndex: 0 },
        { wordOrderIndex: 209, arabic: 'أَجَل', options: ['to die', 'Term'], correctIndex: 1 },
        { wordOrderIndex: 201, arabic: 'أَوْحَى', options: ['to reveal', 'to destroy'], correctIndex: 0 },
      ],
    },
  },
  {
    lessonOrderIndex: 42,
    orderIndex: 2,
    type: ActivityType.SPOT_IN_QURAN,
    payload: {
      wordOrderIndex: 207,
    },
  },

  // ── Lesson 43: MATCH + SPOT_IN_QURAN ──
  {
    lessonOrderIndex: 43,
    orderIndex: 1,
    type: ActivityType.MATCH,
    payload: {
      pairs: [
        { wordOrderIndex: 211, arabic: 'قَضَى', meaning: 'to decree' },
        { wordOrderIndex: 212, arabic: 'حَكَمَ', meaning: 'to judge' },
        { wordOrderIndex: 214, arabic: 'شَهِدَ', meaning: 'to testify' },
        { wordOrderIndex: 215, arabic: 'عَاقِبَة', meaning: 'Consequence' },
        { wordOrderIndex: 206, arabic: 'مَاتَ', meaning: 'to die' },
      ],
    },
  },
  {
    lessonOrderIndex: 43,
    orderIndex: 2,
    type: ActivityType.SPOT_IN_QURAN,
    payload: {
      wordOrderIndex: 213,
    },
  },

  // ── Lesson 44: QUICK_FIRE + FILL_MEANING ──
  {
    lessonOrderIndex: 44,
    orderIndex: 1,
    type: ActivityType.QUICK_FIRE,
    payload: {
      rounds: [
        { wordOrderIndex: 216, arabic: 'كَتَبَ', options: ['to write', 'to teach'], correctIndex: 0 },
        { wordOrderIndex: 218, arabic: 'تَلَا', options: ['to look', 'to recite'], correctIndex: 1 },
        { wordOrderIndex: 220, arabic: 'ضَرَبَ', options: ['to strike', 'to write'], correctIndex: 0 },
        { wordOrderIndex: 211, arabic: 'قَضَى', options: ['to judge', 'to decree'], correctIndex: 1 },
      ],
    },
  },
  {
    lessonOrderIndex: 44,
    orderIndex: 2,
    type: ActivityType.FILL_MEANING,
    payload: {
      wordOrderIndex: 217,
      arabic: 'عَلَّمَ',
      prompt: 'In Surah Ar-Rahman, عَلَّمَ الْقُرْآنَ means ___',
      options: ['He recited the Qur\'an', 'He taught the Qur\'an', 'He wrote the Qur\'an', 'He struck the Qur\'an'],
      correctIndex: 1,
    },
  },

  // ── Lesson 45: MATCH + QUICK_FIRE ──
  {
    lessonOrderIndex: 45,
    orderIndex: 1,
    type: ActivityType.MATCH,
    payload: {
      pairs: [
        { wordOrderIndex: 221, arabic: 'قَتَلَ', meaning: 'to kill' },
        { wordOrderIndex: 222, arabic: 'قَاتَلَ', meaning: 'to fight' },
        { wordOrderIndex: 223, arabic: 'صَبَرَ', meaning: 'to be patient' },
        { wordOrderIndex: 225, arabic: 'سَجَدَ', meaning: 'to prostrate' },
        { wordOrderIndex: 216, arabic: 'كَتَبَ', meaning: 'to write' },
      ],
    },
  },
  {
    lessonOrderIndex: 45,
    orderIndex: 2,
    type: ActivityType.QUICK_FIRE,
    payload: {
      rounds: [
        { wordOrderIndex: 224, arabic: 'شَكَرَ', options: ['to be grateful', 'to fight'], correctIndex: 0 },
        { wordOrderIndex: 222, arabic: 'قَاتَلَ', options: ['to kill', 'to fight'], correctIndex: 1 },
        { wordOrderIndex: 225, arabic: 'سَجَدَ', options: ['to prostrate', 'to be patient'], correctIndex: 0 },
      ],
    },
  },

  // ── Lesson 46: FILL_MEANING + SPOT_IN_QURAN ──
  {
    lessonOrderIndex: 46,
    orderIndex: 1,
    type: ActivityType.FILL_MEANING,
    payload: {
      wordOrderIndex: 226,
      arabic: 'سُبْحَان',
      prompt: 'When you say "Subhana Rabbiyal A\'la," سُبْحَان means ___',
      options: ['Praise', 'Peace', 'Glory be', 'Repentance'],
      correctIndex: 2,
    },
  },
  {
    lessonOrderIndex: 46,
    orderIndex: 2,
    type: ActivityType.SPOT_IN_QURAN,
    payload: {
      wordOrderIndex: 229,
    },
  },

  // ── Lesson 47: MATCH + FILL_MEANING ──
  {
    lessonOrderIndex: 47,
    orderIndex: 1,
    type: ActivityType.MATCH,
    payload: {
      pairs: [
        { wordOrderIndex: 231, arabic: 'عَزِيز', meaning: 'Mighty' },
        { wordOrderIndex: 232, arabic: 'كَرِيم', meaning: 'Noble' },
        { wordOrderIndex: 233, arabic: 'قَدِير', meaning: 'Capable' },
        { wordOrderIndex: 235, arabic: 'شَدِيد', meaning: 'Severe' },
        { wordOrderIndex: 228, arabic: 'سَلَام', meaning: 'Peace' },
      ],
    },
  },
  {
    lessonOrderIndex: 47,
    orderIndex: 2,
    type: ActivityType.FILL_MEANING,
    payload: {
      wordOrderIndex: 234,
      arabic: 'أَلِيم',
      prompt: 'In "عَذَابٌ أَلِيمٌ," أَلِيم means ___',
      options: ['Severe', 'Noble', 'Mighty', 'Painful'],
      correctIndex: 3,
    },
  },

  // ── Lesson 48: QUICK_FIRE + SPOT_IN_QURAN ──
  {
    lessonOrderIndex: 48,
    orderIndex: 1,
    type: ActivityType.QUICK_FIRE,
    payload: {
      rounds: [
        { wordOrderIndex: 236, arabic: 'أُمَّة', options: ['Community', 'Worlds'], correctIndex: 0 },
        { wordOrderIndex: 238, arabic: 'ذُرِّيَّة', options: ['Clear', 'Offspring'], correctIndex: 1 },
        { wordOrderIndex: 240, arabic: 'قُرْآن', options: ['Quran', 'Community'], correctIndex: 0 },
        { wordOrderIndex: 239, arabic: 'مُبِين', options: ['Offspring', 'Clear'], correctIndex: 1 },
        { wordOrderIndex: 237, arabic: 'عَالَمِين', options: ['Worlds', 'Quran'], correctIndex: 0 },
      ],
    },
  },
  {
    lessonOrderIndex: 48,
    orderIndex: 2,
    type: ActivityType.SPOT_IN_QURAN,
    payload: {
      wordOrderIndex: 238,
    },
  },

  // ── Lesson 49: MATCH + SPOT_IN_QURAN ──
  {
    lessonOrderIndex: 49,
    orderIndex: 1,
    type: ActivityType.MATCH,
    payload: {
      pairs: [
        { wordOrderIndex: 241, arabic: 'ضَلَّ', meaning: 'to go astray' },
        { wordOrderIndex: 242, arabic: 'ضَلَال', meaning: 'Misguidance' },
        { wordOrderIndex: 243, arabic: 'أَشْرَكَ', meaning: 'to associate partners' },
        { wordOrderIndex: 245, arabic: 'إِثْم', meaning: 'Sin' },
        { wordOrderIndex: 240, arabic: 'قُرْآن', meaning: 'Quran' },
      ],
    },
  },
  {
    lessonOrderIndex: 49,
    orderIndex: 2,
    type: ActivityType.SPOT_IN_QURAN,
    payload: {
      wordOrderIndex: 243,
    },
  },

  // ── Lesson 50: QUICK_FIRE + FILL_MEANING ──
  {
    lessonOrderIndex: 50,
    orderIndex: 1,
    type: ActivityType.QUICK_FIRE,
    payload: {
      rounds: [
        { wordOrderIndex: 246, arabic: 'غَيْب', options: ['Unseen', 'Sin'], correctIndex: 0 },
        { wordOrderIndex: 248, arabic: 'سُوء', options: ['Supplication', 'Evil'], correctIndex: 1 },
        { wordOrderIndex: 250, arabic: 'دُعَاء', options: ['Supplication', 'Injustice'], correctIndex: 0 },
        { wordOrderIndex: 243, arabic: 'أَشْرَكَ', options: ['Sin', 'to associate partners'], correctIndex: 1 },
      ],
    },
  },
  {
    lessonOrderIndex: 50,
    orderIndex: 2,
    type: ActivityType.FILL_MEANING,
    payload: {
      wordOrderIndex: 249,
      arabic: 'ظُلْم',
      prompt: '___ means "Injustice, Oppression"',
      options: ['سُوء', 'غَيْب', 'ظُلْم', 'ذَنْب'],
      correctIndex: 2,
    },
  },

  // ── Lesson 51: MATCH + SPOT_IN_QURAN ──
  {
    lessonOrderIndex: 51,
    orderIndex: 1,
    type: ActivityType.MATCH,
    payload: {
      pairs: [
        { wordOrderIndex: 251, arabic: 'خَشِيَ', meaning: 'to fear' },
        { wordOrderIndex: 253, arabic: 'بَلَغَ', meaning: 'to reach' },
        { wordOrderIndex: 254, arabic: 'حَرَّمَ', meaning: 'to forbid' },
        { wordOrderIndex: 255, arabic: 'تَوَلَّى', meaning: 'to turn away' },
        { wordOrderIndex: 248, arabic: 'سُوء', meaning: 'Evil' },
      ],
    },
  },
  {
    lessonOrderIndex: 51,
    orderIndex: 2,
    type: ActivityType.SPOT_IN_QURAN,
    payload: {
      wordOrderIndex: 252,
    },
  },

  // ── Lesson 52: FILL_MEANING + SPOT_IN_QURAN ──
  {
    lessonOrderIndex: 52,
    orderIndex: 1,
    type: ActivityType.FILL_MEANING,
    payload: {
      wordOrderIndex: 256,
      arabic: 'أَقَامَ',
      prompt: 'In "أَقِيمُوا الصَّلَاةَ," أَقَامَ means ___',
      options: ['to forget', 'to establish', 'to return', 'to increase'],
      correctIndex: 1,
    },
  },
  {
    lessonOrderIndex: 52,
    orderIndex: 2,
    type: ActivityType.SPOT_IN_QURAN,
    payload: {
      wordOrderIndex: 259,
    },
  },

  // ── Lesson 53: MATCH + FILL_MEANING ──
  {
    lessonOrderIndex: 53,
    orderIndex: 1,
    type: ActivityType.MATCH,
    payload: {
      pairs: [
        { wordOrderIndex: 261, arabic: 'بَحْر', meaning: 'Sea' },
        { wordOrderIndex: 262, arabic: 'نَهْر', meaning: 'River' },
        { wordOrderIndex: 264, arabic: 'جَبَل', meaning: 'Mountain' },
        { wordOrderIndex: 265, arabic: 'شَجَرَة', meaning: 'Tree' },
        { wordOrderIndex: 257, arabic: 'رَدَّ', meaning: 'to return' },
      ],
    },
  },
  {
    lessonOrderIndex: 53,
    orderIndex: 2,
    type: ActivityType.FILL_MEANING,
    payload: {
      wordOrderIndex: 263,
      arabic: 'رِيح',
      prompt: 'In the Qur\'an, رِيح (singular) often refers to ___',
      options: ['a gentle breeze', 'a destructive wind', 'a river', 'a mountain'],
      correctIndex: 1,
    },
  },

  // ── Lesson 54: QUICK_FIRE + SPOT_IN_QURAN ──
  {
    lessonOrderIndex: 54,
    orderIndex: 1,
    type: ActivityType.QUICK_FIRE,
    payload: {
      rounds: [
        { wordOrderIndex: 266, arabic: 'مِسْكِين', options: ['Poor', 'Rich'], correctIndex: 0 },
        { wordOrderIndex: 268, arabic: 'غَنِيّ', options: ['Man', 'Rich'], correctIndex: 1 },
        { wordOrderIndex: 270, arabic: 'قَرْيَة', options: ['Town', 'Poor'], correctIndex: 0 },
        { wordOrderIndex: 269, arabic: 'رَجُل', options: ['Transgressor', 'Man'], correctIndex: 1 },
        { wordOrderIndex: 261, arabic: 'بَحْر', options: ['Sea', 'River'], correctIndex: 0 },
      ],
    },
  },
  {
    lessonOrderIndex: 54,
    orderIndex: 2,
    type: ActivityType.SPOT_IN_QURAN,
    payload: {
      wordOrderIndex: 267,
    },
  },

  // ── Lesson 55: MATCH + SPOT_IN_QURAN ──
  {
    lessonOrderIndex: 55,
    orderIndex: 1,
    type: ActivityType.MATCH,
    payload: {
      pairs: [
        { wordOrderIndex: 271, arabic: 'عَذَّبَ', meaning: 'to punish' },
        { wordOrderIndex: 272, arabic: 'سَبَّحَ', meaning: 'to glorify' },
        { wordOrderIndex: 273, arabic: 'أَكَلَ', meaning: 'to eat' },
        { wordOrderIndex: 275, arabic: 'صَالِحَات', meaning: 'Righteous deeds' },
        { wordOrderIndex: 267, arabic: 'فَاسِق', meaning: 'Transgressor' },
      ],
    },
  },
  {
    lessonOrderIndex: 55,
    orderIndex: 2,
    type: ActivityType.SPOT_IN_QURAN,
    payload: {
      wordOrderIndex: 274,
    },
  },

  // ── Lesson 56: QUICK_FIRE + FILL_MEANING ──
  {
    lessonOrderIndex: 56,
    orderIndex: 1,
    type: ActivityType.QUICK_FIRE,
    payload: {
      rounds: [
        { wordOrderIndex: 276, arabic: 'فَوْقَ', options: ['Above', 'Under'], correctIndex: 0 },
        { wordOrderIndex: 278, arabic: 'دُونَ', options: ['First', 'Below/Besides'], correctIndex: 1 },
        { wordOrderIndex: 280, arabic: 'مَصِير', options: ['Destination', 'Above'], correctIndex: 0 },
        { wordOrderIndex: 272, arabic: 'سَبَّحَ', options: ['to punish', 'to glorify'], correctIndex: 1 },
      ],
    },
  },
  {
    lessonOrderIndex: 56,
    orderIndex: 2,
    type: ActivityType.FILL_MEANING,
    payload: {
      wordOrderIndex: 277,
      arabic: 'تَحْت',
      prompt: 'In "تَجْرِي مِن تَحْتِهَا الْأَنْهَارُ," تَحْت means ___',
      options: ['Above', 'Under/Beneath', 'First', 'Besides'],
      correctIndex: 1,
    },
  },

  // ── Lesson 57: MATCH + QUICK_FIRE ──
  {
    lessonOrderIndex: 57,
    orderIndex: 1,
    type: ActivityType.MATCH,
    payload: {
      pairs: [
        { wordOrderIndex: 281, arabic: 'نَذِير', meaning: 'Warner' },
        { wordOrderIndex: 282, arabic: 'خَوْف', meaning: 'Fear' },
        { wordOrderIndex: 283, arabic: 'كَذِب', meaning: 'Lie' },
        { wordOrderIndex: 284, arabic: 'بَاطِل', meaning: 'Falsehood' },
        { wordOrderIndex: 278, arabic: 'دُونَ', meaning: 'Below, Besides' },
      ],
    },
  },
  {
    lessonOrderIndex: 57,
    orderIndex: 2,
    type: ActivityType.QUICK_FIRE,
    payload: {
      rounds: [
        { wordOrderIndex: 285, arabic: 'حَسَنَة', options: ['Good Deed', 'Lie'], correctIndex: 0 },
        { wordOrderIndex: 283, arabic: 'كَذِب', options: ['Fear', 'Lie'], correctIndex: 1 },
        { wordOrderIndex: 281, arabic: 'نَذِير', options: ['Warner', 'Falsehood'], correctIndex: 0 },
      ],
    },
  },

  // ── Lesson 58: FILL_MEANING + SPOT_IN_QURAN ──
  {
    lessonOrderIndex: 58,
    orderIndex: 1,
    type: ActivityType.FILL_MEANING,
    payload: {
      wordOrderIndex: 286,
      arabic: 'إِنْ',
      prompt: 'إِنْ (without shaddah) means ___',
      options: ['Indeed', 'If', 'That', 'Or'],
      correctIndex: 1,
    },
  },
  {
    lessonOrderIndex: 58,
    orderIndex: 2,
    type: ActivityType.SPOT_IN_QURAN,
    payload: {
      wordOrderIndex: 288,
    },
  },

  // ── Lesson 59: MATCH + FILL_MEANING ──
  {
    lessonOrderIndex: 59,
    orderIndex: 1,
    type: ActivityType.MATCH,
    payload: {
      pairs: [
        { wordOrderIndex: 291, arabic: 'الرَّحْمَن', meaning: 'Most Merciful' },
        { wordOrderIndex: 292, arabic: 'حَرَام', meaning: 'Forbidden' },
        { wordOrderIndex: 293, arabic: 'طَعَام', meaning: 'Food' },
        { wordOrderIndex: 295, arabic: 'وَاحِد', meaning: 'One' },
        { wordOrderIndex: 288, arabic: 'أَنَّ', meaning: 'That (emphatic)' },
      ],
    },
  },
  {
    lessonOrderIndex: 59,
    orderIndex: 2,
    type: ActivityType.FILL_MEANING,
    payload: {
      wordOrderIndex: 294,
      arabic: 'نَبَأ',
      prompt: 'Surah An-Naba\' is named after this word. نَبَأ means ___',
      options: ['Food', 'One', 'News/Tidings', 'Forbidden'],
      correctIndex: 2,
    },
  },

  // ── Lesson 60: QUICK_FIRE + SPOT_IN_QURAN ──
  {
    lessonOrderIndex: 60,
    orderIndex: 1,
    type: ActivityType.QUICK_FIRE,
    payload: {
      rounds: [
        { wordOrderIndex: 296, arabic: 'بَنُون', options: ['Sons', 'Tongue'], correctIndex: 0 },
        { wordOrderIndex: 298, arabic: 'بَيِّنَة', options: ['Men', 'Clear Evidence'], correctIndex: 1 },
        { wordOrderIndex: 300, arabic: 'عَالِم', options: ['Scholar', 'Sons'], correctIndex: 0 },
        { wordOrderIndex: 297, arabic: 'لِسَان', options: ['Clear Evidence', 'Tongue'], correctIndex: 1 },
        { wordOrderIndex: 299, arabic: 'رِجَال', options: ['Men', 'Scholar'], correctIndex: 0 },
      ],
    },
  },
  {
    lessonOrderIndex: 60,
    orderIndex: 2,
    type: ActivityType.SPOT_IN_QURAN,
    payload: {
      wordOrderIndex: 298,
    },
  },
];
