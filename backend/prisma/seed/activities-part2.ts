import { ActivityType, Prisma } from '@prisma/client';

export interface ActivitySeedData {
  lessonOrderIndex: number;
  orderIndex: number;
  type: ActivityType;
  payload: Prisma.InputJsonValue;
}

export const ACTIVITIES_L31_L60: ActivitySeedData[] = [
  // ── Lesson 31 ──
  {
    lessonOrderIndex: 31,
    orderIndex: 1,
    type: ActivityType.MATCH,
    payload: {
      pairs: [
        { wordOrderIndex: 151, arabic: 'كَانَ', meaning: 'to be, was' },
        { wordOrderIndex: 152, arabic: 'لَيْسَ', meaning: 'is not' },
        { wordOrderIndex: 153, arabic: 'فَعَلَ', meaning: 'to do' },
        { wordOrderIndex: 154, arabic: 'وَجَدَ', meaning: 'to find' },
        { wordOrderIndex: 155, arabic: 'سَأَلَ', meaning: 'to ask' },
      ],
    },
  },
  {
    lessonOrderIndex: 31,
    orderIndex: 2,
    type: ActivityType.QUICK_FIRE,
    payload: {
      rounds: [
        { wordOrderIndex: 151, arabic: 'كَانَ', options: ['to be/was', 'to do'], correctIndex: 0 },
        { wordOrderIndex: 153, arabic: 'فَعَلَ', options: ['to find', 'to do'], correctIndex: 1 },
        { wordOrderIndex: 155, arabic: 'سَأَلَ', options: ['to ask', 'is not'], correctIndex: 0 },
        { wordOrderIndex: 152, arabic: 'لَيْسَ', options: ['to be', 'is not'], correctIndex: 1 },
        { wordOrderIndex: 154, arabic: 'وَجَدَ', options: ['to find', 'to ask'], correctIndex: 0 },
      ],
    },
  },
  {
    lessonOrderIndex: 31,
    orderIndex: 3,
    type: ActivityType.FILL_MEANING,
    payload: {
      wordOrderIndex: 153,
      arabic: 'فَعَلَ',
      prompt: 'فَعَلَ means ___',
      options: ['to find', 'to do', 'is not', 'to ask'],
      correctIndex: 1,
    },
  },

  // ── Lesson 32 ──
  {
    lessonOrderIndex: 32,
    orderIndex: 1,
    type: ActivityType.MATCH,
    payload: {
      pairs: [
        { wordOrderIndex: 156, arabic: 'إِنْسَان', meaning: 'Human' },
        { wordOrderIndex: 157, arabic: 'وَجْه', meaning: 'Face' },
        { wordOrderIndex: 158, arabic: 'يَد', meaning: 'Hand' },
        { wordOrderIndex: 159, arabic: 'عَيْن', meaning: 'Eye, Spring' },
        { wordOrderIndex: 160, arabic: 'خَلْق', meaning: 'Creation' },
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
      prompt: 'عَيْن means ___',
      options: ['Face', 'Hand', 'Eye/Spring', 'Creation'],
      correctIndex: 2,
    },
  },
  {
    lessonOrderIndex: 32,
    orderIndex: 3,
    type: ActivityType.QUICK_FIRE,
    payload: {
      rounds: [
        { wordOrderIndex: 156, arabic: 'إِنْسَان', options: ['Human', 'Face'], correctIndex: 0 },
        { wordOrderIndex: 158, arabic: 'يَد', options: ['Creation', 'Hand'], correctIndex: 1 },
        { wordOrderIndex: 160, arabic: 'خَلْق', options: ['Creation', 'Eye'], correctIndex: 0 },
        { wordOrderIndex: 157, arabic: 'وَجْه', options: ['Human', 'Face'], correctIndex: 1 },
        { wordOrderIndex: 159, arabic: 'عَيْن', options: ['Eye/Spring', 'Hand'], correctIndex: 0 },
      ],
    },
  },

  // ── Lesson 33 ──
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
        { wordOrderIndex: 165, arabic: 'أَصْحَاب', meaning: 'Companions' },
      ],
    },
  },
  {
    lessonOrderIndex: 33,
    orderIndex: 2,
    type: ActivityType.QUICK_FIRE,
    payload: {
      rounds: [
        { wordOrderIndex: 161, arabic: 'مَلَك', options: ['Angel', 'Satan'], correctIndex: 0 },
        { wordOrderIndex: 163, arabic: 'جَهَنَّم', options: ['Companions', 'Hellfire'], correctIndex: 1 },
        { wordOrderIndex: 165, arabic: 'أَصْحَاب', options: ['Companions', 'Abiding'], correctIndex: 0 },
        { wordOrderIndex: 162, arabic: 'شَيْطَان', options: ['Angel', 'Satan'], correctIndex: 1 },
        { wordOrderIndex: 164, arabic: 'خَالِد', options: ['Abiding forever', 'Hellfire'], correctIndex: 0 },
      ],
    },
  },
  {
    lessonOrderIndex: 33,
    orderIndex: 3,
    type: ActivityType.FILL_MEANING,
    payload: {
      wordOrderIndex: 162,
      arabic: 'شَيْطَان',
      prompt: 'شَيْطَان means ___',
      options: ['Angel', 'Companions', 'Satan', 'Hellfire'],
      correctIndex: 2,
    },
  },

  // ── Lesson 34 ──
  {
    lessonOrderIndex: 34,
    orderIndex: 1,
    type: ActivityType.MATCH,
    payload: {
      pairs: [
        { wordOrderIndex: 166, arabic: 'وَلَد', meaning: 'Child' },
        { wordOrderIndex: 167, arabic: 'ابْن', meaning: 'Son' },
        { wordOrderIndex: 168, arabic: 'أَخ', meaning: 'Brother' },
        { wordOrderIndex: 169, arabic: 'نِسَاء', meaning: 'Women' },
        { wordOrderIndex: 170, arabic: 'زَوْج', meaning: 'Spouse, Pair' },
      ],
    },
  },
  {
    lessonOrderIndex: 34,
    orderIndex: 2,
    type: ActivityType.FILL_MEANING,
    payload: {
      wordOrderIndex: 170,
      arabic: 'زَوْج',
      prompt: 'زَوْج means ___',
      options: ['Child', 'Spouse/Pair', 'Brother', 'Son'],
      correctIndex: 1,
    },
  },
  {
    lessonOrderIndex: 34,
    orderIndex: 3,
    type: ActivityType.QUICK_FIRE,
    payload: {
      rounds: [
        { wordOrderIndex: 166, arabic: 'وَلَد', options: ['Child', 'Son'], correctIndex: 0 },
        { wordOrderIndex: 168, arabic: 'أَخ', options: ['Women', 'Brother'], correctIndex: 1 },
        { wordOrderIndex: 169, arabic: 'نِسَاء', options: ['Women', 'Spouse'], correctIndex: 0 },
        { wordOrderIndex: 167, arabic: 'ابْن', options: ['Brother', 'Son'], correctIndex: 1 },
        { wordOrderIndex: 170, arabic: 'زَوْج', options: ['Spouse/Pair', 'Child'], correctIndex: 0 },
      ],
    },
  },

  // ── Lesson 35 ──
  {
    lessonOrderIndex: 35,
    orderIndex: 1,
    type: ActivityType.MATCH,
    payload: {
      pairs: [
        { wordOrderIndex: 171, arabic: 'مَال', meaning: 'Wealth' },
        { wordOrderIndex: 172, arabic: 'عَمَل', meaning: 'Deed, Work' },
        { wordOrderIndex: 173, arabic: 'كَسَبَ', meaning: 'to earn' },
        { wordOrderIndex: 174, arabic: 'مَتَاع', meaning: 'Provision' },
        { wordOrderIndex: 175, arabic: 'كَثِير', meaning: 'Much, Many' },
      ],
    },
  },
  {
    lessonOrderIndex: 35,
    orderIndex: 2,
    type: ActivityType.QUICK_FIRE,
    payload: {
      rounds: [
        { wordOrderIndex: 171, arabic: 'مَال', options: ['Wealth', 'Deed'], correctIndex: 0 },
        { wordOrderIndex: 173, arabic: 'كَسَبَ', options: ['Provision', 'to earn'], correctIndex: 1 },
        { wordOrderIndex: 175, arabic: 'كَثِير', options: ['Much/Many', 'Wealth'], correctIndex: 0 },
        { wordOrderIndex: 172, arabic: 'عَمَل', options: ['to earn', 'Deed/Work'], correctIndex: 1 },
        { wordOrderIndex: 174, arabic: 'مَتَاع', options: ['Provision', 'Much'], correctIndex: 0 },
      ],
    },
  },
  {
    lessonOrderIndex: 35,
    orderIndex: 3,
    type: ActivityType.FILL_MEANING,
    payload: {
      wordOrderIndex: 173,
      arabic: 'كَسَبَ',
      prompt: 'كَسَبَ means ___',
      options: ['Wealth', 'Much', 'to earn', 'Provision'],
      correctIndex: 2,
    },
  },

  // ── Lesson 36 ──
  {
    lessonOrderIndex: 36,
    orderIndex: 1,
    type: ActivityType.MATCH,
    payload: {
      pairs: [
        { wordOrderIndex: 176, arabic: 'ثُمَّ', meaning: 'Then' },
        { wordOrderIndex: 177, arabic: 'أَوْ', meaning: 'Or' },
        { wordOrderIndex: 178, arabic: 'حَتَّى', meaning: 'Until' },
        { wordOrderIndex: 179, arabic: 'لَعَلَّ', meaning: 'Perhaps' },
        { wordOrderIndex: 180, arabic: 'لَكِنْ', meaning: 'But, However' },
      ],
    },
  },
  {
    lessonOrderIndex: 36,
    orderIndex: 2,
    type: ActivityType.FILL_MEANING,
    payload: {
      wordOrderIndex: 176,
      arabic: 'ثُمَّ',
      prompt: 'ثُمَّ means ___',
      options: ['Or', 'Then', 'Until', 'But'],
      correctIndex: 1,
    },
  },
  {
    lessonOrderIndex: 36,
    orderIndex: 3,
    type: ActivityType.QUICK_FIRE,
    payload: {
      rounds: [
        { wordOrderIndex: 177, arabic: 'أَوْ', options: ['Or', 'Then'], correctIndex: 0 },
        { wordOrderIndex: 179, arabic: 'لَعَلَّ', options: ['Until', 'Perhaps'], correctIndex: 1 },
        { wordOrderIndex: 180, arabic: 'لَكِنْ', options: ['But', 'Or'], correctIndex: 0 },
        { wordOrderIndex: 178, arabic: 'حَتَّى', options: ['Perhaps', 'Until'], correctIndex: 1 },
        { wordOrderIndex: 176, arabic: 'ثُمَّ', options: ['Then', 'But'], correctIndex: 0 },
      ],
    },
  },

  // ── Lesson 37 ──
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
        { wordOrderIndex: 185, arabic: 'مَعَ', meaning: 'With' },
      ],
    },
  },
  {
    lessonOrderIndex: 37,
    orderIndex: 2,
    type: ActivityType.QUICK_FIRE,
    payload: {
      rounds: [
        { wordOrderIndex: 181, arabic: 'قَبْلَ', options: ['Before', 'After'], correctIndex: 0 },
        { wordOrderIndex: 183, arabic: 'عِنْدَ', options: ['Between', 'At/Near'], correctIndex: 1 },
        { wordOrderIndex: 185, arabic: 'مَعَ', options: ['With', 'Before'], correctIndex: 0 },
        { wordOrderIndex: 182, arabic: 'بَعْدَ', options: ['With', 'After'], correctIndex: 1 },
        { wordOrderIndex: 184, arabic: 'بَيْنَ', options: ['Between', 'At'], correctIndex: 0 },
      ],
    },
  },
  {
    lessonOrderIndex: 37,
    orderIndex: 3,
    type: ActivityType.FILL_MEANING,
    payload: {
      wordOrderIndex: 184,
      arabic: 'بَيْنَ',
      prompt: 'بَيْنَ means ___',
      options: ['After', 'With', 'Before', 'Between'],
      correctIndex: 3,
    },
  },

  // ── Lesson 38 ──
  {
    lessonOrderIndex: 38,
    orderIndex: 1,
    type: ActivityType.MATCH,
    payload: {
      pairs: [
        { wordOrderIndex: 186, arabic: 'بَعْض', meaning: 'Some, Part' },
        { wordOrderIndex: 187, arabic: 'أُولَئِكَ', meaning: 'Those' },
        { wordOrderIndex: 188, arabic: 'إِذَا', meaning: 'When, If' },
        { wordOrderIndex: 189, arabic: 'أَيُّهَا', meaning: 'O (vocative)' },
        { wordOrderIndex: 190, arabic: 'أَحَد', meaning: 'One, Anyone' },
      ],
    },
  },
  {
    lessonOrderIndex: 38,
    orderIndex: 2,
    type: ActivityType.FILL_MEANING,
    payload: {
      wordOrderIndex: 188,
      arabic: 'إِذَا',
      prompt: 'إِذَا means ___',
      options: ['When/If', 'Those', 'Some', 'One'],
      correctIndex: 0,
    },
  },
  {
    lessonOrderIndex: 38,
    orderIndex: 3,
    type: ActivityType.QUICK_FIRE,
    payload: {
      rounds: [
        { wordOrderIndex: 186, arabic: 'بَعْض', options: ['Some/Part', 'Those'], correctIndex: 0 },
        { wordOrderIndex: 190, arabic: 'أَحَد', options: ['O (vocative)', 'One/Anyone'], correctIndex: 1 },
        { wordOrderIndex: 187, arabic: 'أُولَئِكَ', options: ['Those', 'When'], correctIndex: 0 },
        { wordOrderIndex: 189, arabic: 'أَيُّهَا', options: ['Some', 'O (vocative)'], correctIndex: 1 },
        { wordOrderIndex: 188, arabic: 'إِذَا', options: ['When/If', 'One'], correctIndex: 0 },
      ],
    },
  },

  // ── Lesson 39 ──
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
        { wordOrderIndex: 195, arabic: 'جَمِيع', meaning: 'All, Together' },
      ],
    },
  },
  {
    lessonOrderIndex: 39,
    orderIndex: 2,
    type: ActivityType.QUICK_FIRE,
    payload: {
      rounds: [
        { wordOrderIndex: 191, arabic: 'إِلَه', options: ['God/Deity', 'Other'], correctIndex: 0 },
        { wordOrderIndex: 193, arabic: 'آخِر', options: ['Few', 'Last/Other'], correctIndex: 1 },
        { wordOrderIndex: 195, arabic: 'جَمِيع', options: ['All', 'God'], correctIndex: 0 },
        { wordOrderIndex: 192, arabic: 'غَيْر', options: ['Few', 'Other/Besides'], correctIndex: 1 },
        { wordOrderIndex: 194, arabic: 'قَلِيل', options: ['Few/Little', 'All'], correctIndex: 0 },
      ],
    },
  },
  {
    lessonOrderIndex: 39,
    orderIndex: 3,
    type: ActivityType.FILL_MEANING,
    payload: {
      wordOrderIndex: 191,
      arabic: 'إِلَه',
      prompt: 'إِلَه means ___',
      options: ['Other', 'Few', 'God/Deity', 'All'],
      correctIndex: 2,
    },
  },

  // ── Lesson 40 ──
  {
    lessonOrderIndex: 40,
    orderIndex: 1,
    type: ActivityType.MATCH,
    payload: {
      pairs: [
        { wordOrderIndex: 196, arabic: 'نَصَرَ', meaning: 'to help, give victory' },
        { wordOrderIndex: 197, arabic: 'فِتْنَة', meaning: 'Trial' },
        { wordOrderIndex: 198, arabic: 'عَدُوّ', meaning: 'Enemy' },
        { wordOrderIndex: 199, arabic: 'نَصْر', meaning: 'Help, Victory' },
        { wordOrderIndex: 200, arabic: 'وَلِيّ', meaning: 'Guardian' },
      ],
    },
  },
  {
    lessonOrderIndex: 40,
    orderIndex: 2,
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
    orderIndex: 3,
    type: ActivityType.QUICK_FIRE,
    payload: {
      rounds: [
        { wordOrderIndex: 196, arabic: 'نَصَرَ', options: ['to help', 'Trial'], correctIndex: 0 },
        { wordOrderIndex: 199, arabic: 'نَصْر', options: ['Enemy', 'Victory'], correctIndex: 1 },
        { wordOrderIndex: 197, arabic: 'فِتْنَة', options: ['Trial', 'Guardian'], correctIndex: 0 },
        { wordOrderIndex: 200, arabic: 'وَلِيّ', options: ['to help', 'Guardian'], correctIndex: 1 },
        { wordOrderIndex: 198, arabic: 'عَدُوّ', options: ['Enemy', 'Victory'], correctIndex: 0 },
      ],
    },
  },

  // ── Lesson 41 ──
  {
    lessonOrderIndex: 41,
    orderIndex: 1,
    type: ActivityType.MATCH,
    payload: {
      pairs: [
        { wordOrderIndex: 201, arabic: 'أَوْحَى', meaning: 'to reveal' },
        { wordOrderIndex: 202, arabic: 'أَخْرَجَ', meaning: 'to bring forth' },
        { wordOrderIndex: 203, arabic: 'أَهْلَكَ', meaning: 'to destroy' },
        { wordOrderIndex: 204, arabic: 'أَحْيَا', meaning: 'to give life' },
        { wordOrderIndex: 205, arabic: 'أَمَرَ', meaning: 'to command' },
      ],
    },
  },
  {
    lessonOrderIndex: 41,
    orderIndex: 2,
    type: ActivityType.QUICK_FIRE,
    payload: {
      rounds: [
        { wordOrderIndex: 201, arabic: 'أَوْحَى', options: ['to reveal', 'to destroy'], correctIndex: 0 },
        { wordOrderIndex: 203, arabic: 'أَهْلَكَ', options: ['to give life', 'to destroy'], correctIndex: 1 },
        { wordOrderIndex: 205, arabic: 'أَمَرَ', options: ['to command', 'to reveal'], correctIndex: 0 },
        { wordOrderIndex: 202, arabic: 'أَخْرَجَ', options: ['to command', 'to bring forth'], correctIndex: 1 },
        { wordOrderIndex: 204, arabic: 'أَحْيَا', options: ['to give life', 'to bring forth'], correctIndex: 0 },
      ],
    },
  },
  {
    lessonOrderIndex: 41,
    orderIndex: 3,
    type: ActivityType.FILL_MEANING,
    payload: {
      wordOrderIndex: 205,
      arabic: 'أَمَرَ',
      prompt: 'أَمَرَ means ___',
      options: ['to reveal', 'to command', 'to destroy', 'to bring forth'],
      correctIndex: 1,
    },
  },

  // ── Lesson 42 ──
  {
    lessonOrderIndex: 42,
    orderIndex: 1,
    type: ActivityType.MATCH,
    payload: {
      pairs: [
        { wordOrderIndex: 206, arabic: 'مَاتَ', meaning: 'to die' },
        { wordOrderIndex: 207, arabic: 'بَعَثَ', meaning: 'to raise' },
        { wordOrderIndex: 208, arabic: 'حَيّ', meaning: 'Living' },
        { wordOrderIndex: 209, arabic: 'أَجَل', meaning: 'Term' },
        { wordOrderIndex: 210, arabic: 'سَاعَة', meaning: 'Hour of Judgment' },
      ],
    },
  },
  {
    lessonOrderIndex: 42,
    orderIndex: 2,
    type: ActivityType.FILL_MEANING,
    payload: {
      wordOrderIndex: 207,
      arabic: 'بَعَثَ',
      prompt: 'بَعَثَ means ___',
      options: ['to die', 'Living', 'to raise', 'Term'],
      correctIndex: 2,
    },
  },
  {
    lessonOrderIndex: 42,
    orderIndex: 3,
    type: ActivityType.QUICK_FIRE,
    payload: {
      rounds: [
        { wordOrderIndex: 206, arabic: 'مَاتَ', options: ['to die', 'to raise'], correctIndex: 0 },
        { wordOrderIndex: 208, arabic: 'حَيّ', options: ['Term', 'Living'], correctIndex: 1 },
        { wordOrderIndex: 210, arabic: 'سَاعَة', options: ['Hour of Judgment', 'to die'], correctIndex: 0 },
        { wordOrderIndex: 209, arabic: 'أَجَل', options: ['Living', 'Term'], correctIndex: 1 },
        { wordOrderIndex: 207, arabic: 'بَعَثَ', options: ['to raise', 'Hour'], correctIndex: 0 },
      ],
    },
  },

  // ── Lesson 43 ──
  {
    lessonOrderIndex: 43,
    orderIndex: 1,
    type: ActivityType.MATCH,
    payload: {
      pairs: [
        { wordOrderIndex: 211, arabic: 'قَضَى', meaning: 'to decree' },
        { wordOrderIndex: 212, arabic: 'حَكَمَ', meaning: 'to judge' },
        { wordOrderIndex: 213, arabic: 'ظَنَّ', meaning: 'to think' },
        { wordOrderIndex: 214, arabic: 'شَهِدَ', meaning: 'to testify' },
        { wordOrderIndex: 215, arabic: 'عَاقِبَة', meaning: 'Consequence' },
      ],
    },
  },
  {
    lessonOrderIndex: 43,
    orderIndex: 2,
    type: ActivityType.QUICK_FIRE,
    payload: {
      rounds: [
        { wordOrderIndex: 211, arabic: 'قَضَى', options: ['to decree', 'to judge'], correctIndex: 0 },
        { wordOrderIndex: 213, arabic: 'ظَنَّ', options: ['to testify', 'to think'], correctIndex: 1 },
        { wordOrderIndex: 215, arabic: 'عَاقِبَة', options: ['Consequence', 'to decree'], correctIndex: 0 },
        { wordOrderIndex: 212, arabic: 'حَكَمَ', options: ['to think', 'to judge'], correctIndex: 1 },
        { wordOrderIndex: 214, arabic: 'شَهِدَ', options: ['to testify', 'Consequence'], correctIndex: 0 },
      ],
    },
  },
  {
    lessonOrderIndex: 43,
    orderIndex: 3,
    type: ActivityType.FILL_MEANING,
    payload: {
      wordOrderIndex: 214,
      arabic: 'شَهِدَ',
      prompt: 'شَهِدَ means ___',
      options: ['to decree', 'Consequence', 'to judge', 'to testify'],
      correctIndex: 3,
    },
  },

  // ── Lesson 44 ──
  {
    lessonOrderIndex: 44,
    orderIndex: 1,
    type: ActivityType.MATCH,
    payload: {
      pairs: [
        { wordOrderIndex: 216, arabic: 'كَتَبَ', meaning: 'to write' },
        { wordOrderIndex: 217, arabic: 'عَلَّمَ', meaning: 'to teach' },
        { wordOrderIndex: 218, arabic: 'تَلَا', meaning: 'to recite' },
        { wordOrderIndex: 219, arabic: 'نَظَرَ', meaning: 'to look' },
        { wordOrderIndex: 220, arabic: 'ضَرَبَ', meaning: 'to strike' },
      ],
    },
  },
  {
    lessonOrderIndex: 44,
    orderIndex: 2,
    type: ActivityType.FILL_MEANING,
    payload: {
      wordOrderIndex: 216,
      arabic: 'كَتَبَ',
      prompt: 'كَتَبَ means ___',
      options: ['to write', 'to teach', 'to recite', 'to look'],
      correctIndex: 0,
    },
  },
  {
    lessonOrderIndex: 44,
    orderIndex: 3,
    type: ActivityType.QUICK_FIRE,
    payload: {
      rounds: [
        { wordOrderIndex: 217, arabic: 'عَلَّمَ', options: ['to teach', 'to write'], correctIndex: 0 },
        { wordOrderIndex: 219, arabic: 'نَظَرَ', options: ['to strike', 'to look'], correctIndex: 1 },
        { wordOrderIndex: 218, arabic: 'تَلَا', options: ['to recite', 'to teach'], correctIndex: 0 },
        { wordOrderIndex: 220, arabic: 'ضَرَبَ', options: ['to look', 'to strike'], correctIndex: 1 },
        { wordOrderIndex: 216, arabic: 'كَتَبَ', options: ['to write', 'to recite'], correctIndex: 0 },
      ],
    },
  },

  // ── Lesson 45 ──
  {
    lessonOrderIndex: 45,
    orderIndex: 1,
    type: ActivityType.MATCH,
    payload: {
      pairs: [
        { wordOrderIndex: 221, arabic: 'قَتَلَ', meaning: 'to kill' },
        { wordOrderIndex: 222, arabic: 'قَاتَلَ', meaning: 'to fight' },
        { wordOrderIndex: 223, arabic: 'صَبَرَ', meaning: 'to be patient' },
        { wordOrderIndex: 224, arabic: 'شَكَرَ', meaning: 'to be grateful' },
        { wordOrderIndex: 225, arabic: 'سَجَدَ', meaning: 'to prostrate' },
      ],
    },
  },
  {
    lessonOrderIndex: 45,
    orderIndex: 2,
    type: ActivityType.QUICK_FIRE,
    payload: {
      rounds: [
        { wordOrderIndex: 221, arabic: 'قَتَلَ', options: ['to kill', 'to fight'], correctIndex: 0 },
        { wordOrderIndex: 223, arabic: 'صَبَرَ', options: ['to prostrate', 'to be patient'], correctIndex: 1 },
        { wordOrderIndex: 225, arabic: 'سَجَدَ', options: ['to prostrate', 'to kill'], correctIndex: 0 },
        { wordOrderIndex: 222, arabic: 'قَاتَلَ', options: ['to be grateful', 'to fight'], correctIndex: 1 },
        { wordOrderIndex: 224, arabic: 'شَكَرَ', options: ['to be grateful', 'to be patient'], correctIndex: 0 },
      ],
    },
  },
  {
    lessonOrderIndex: 45,
    orderIndex: 3,
    type: ActivityType.FILL_MEANING,
    payload: {
      wordOrderIndex: 223,
      arabic: 'صَبَرَ',
      prompt: 'صَبَرَ means ___',
      options: ['to fight', 'to be patient', 'to kill', 'to prostrate'],
      correctIndex: 1,
    },
  },

  // ── Lesson 46 ──
  {
    lessonOrderIndex: 46,
    orderIndex: 1,
    type: ActivityType.MATCH,
    payload: {
      pairs: [
        { wordOrderIndex: 226, arabic: 'سُبْحَان', meaning: 'Glory be' },
        { wordOrderIndex: 227, arabic: 'حَمْد', meaning: 'Praise' },
        { wordOrderIndex: 228, arabic: 'سَلَام', meaning: 'Peace' },
        { wordOrderIndex: 229, arabic: 'تَقْوَى', meaning: 'God-consciousness' },
        { wordOrderIndex: 230, arabic: 'تَوْبَة', meaning: 'Repentance' },
      ],
    },
  },
  {
    lessonOrderIndex: 46,
    orderIndex: 2,
    type: ActivityType.FILL_MEANING,
    payload: {
      wordOrderIndex: 229,
      arabic: 'تَقْوَى',
      prompt: 'تَقْوَى means ___',
      options: ['Praise', 'Peace', 'God-consciousness', 'Glory be'],
      correctIndex: 2,
    },
  },
  {
    lessonOrderIndex: 46,
    orderIndex: 3,
    type: ActivityType.QUICK_FIRE,
    payload: {
      rounds: [
        { wordOrderIndex: 226, arabic: 'سُبْحَان', options: ['Glory be', 'Praise'], correctIndex: 0 },
        { wordOrderIndex: 228, arabic: 'سَلَام', options: ['Repentance', 'Peace'], correctIndex: 1 },
        { wordOrderIndex: 230, arabic: 'تَوْبَة', options: ['Repentance', 'Glory'], correctIndex: 0 },
        { wordOrderIndex: 227, arabic: 'حَمْد', options: ['Peace', 'Praise'], correctIndex: 1 },
        { wordOrderIndex: 229, arabic: 'تَقْوَى', options: ['God-consciousness', 'Repentance'], correctIndex: 0 },
      ],
    },
  },

  // ── Lesson 47 ──
  {
    lessonOrderIndex: 47,
    orderIndex: 1,
    type: ActivityType.MATCH,
    payload: {
      pairs: [
        { wordOrderIndex: 231, arabic: 'عَزِيز', meaning: 'Mighty' },
        { wordOrderIndex: 232, arabic: 'كَرِيم', meaning: 'Noble' },
        { wordOrderIndex: 233, arabic: 'قَدِير', meaning: 'Capable' },
        { wordOrderIndex: 234, arabic: 'أَلِيم', meaning: 'Painful' },
        { wordOrderIndex: 235, arabic: 'شَدِيد', meaning: 'Severe' },
      ],
    },
  },
  {
    lessonOrderIndex: 47,
    orderIndex: 2,
    type: ActivityType.QUICK_FIRE,
    payload: {
      rounds: [
        { wordOrderIndex: 231, arabic: 'عَزِيز', options: ['Mighty', 'Noble'], correctIndex: 0 },
        { wordOrderIndex: 233, arabic: 'قَدِير', options: ['Painful', 'Capable'], correctIndex: 1 },
        { wordOrderIndex: 235, arabic: 'شَدِيد', options: ['Severe', 'Mighty'], correctIndex: 0 },
        { wordOrderIndex: 232, arabic: 'كَرِيم', options: ['Capable', 'Noble'], correctIndex: 1 },
        { wordOrderIndex: 234, arabic: 'أَلِيم', options: ['Painful', 'Severe'], correctIndex: 0 },
      ],
    },
  },
  {
    lessonOrderIndex: 47,
    orderIndex: 3,
    type: ActivityType.FILL_MEANING,
    payload: {
      wordOrderIndex: 232,
      arabic: 'كَرِيم',
      prompt: 'كَرِيم means ___',
      options: ['Mighty', 'Severe', 'Painful', 'Noble'],
      correctIndex: 3,
    },
  },

  // ── Lesson 48 ──
  {
    lessonOrderIndex: 48,
    orderIndex: 1,
    type: ActivityType.MATCH,
    payload: {
      pairs: [
        { wordOrderIndex: 236, arabic: 'أُمَّة', meaning: 'Community' },
        { wordOrderIndex: 237, arabic: 'عَالَمِين', meaning: 'Worlds' },
        { wordOrderIndex: 238, arabic: 'ذُرِّيَّة', meaning: 'Offspring' },
        { wordOrderIndex: 239, arabic: 'مُبِين', meaning: 'Clear' },
        { wordOrderIndex: 240, arabic: 'قُرْآن', meaning: 'Quran' },
      ],
    },
  },
  {
    lessonOrderIndex: 48,
    orderIndex: 2,
    type: ActivityType.FILL_MEANING,
    payload: {
      wordOrderIndex: 236,
      arabic: 'أُمَّة',
      prompt: 'أُمَّة means ___',
      options: ['Community', 'Worlds', 'Offspring', 'Clear'],
      correctIndex: 0,
    },
  },
  {
    lessonOrderIndex: 48,
    orderIndex: 3,
    type: ActivityType.QUICK_FIRE,
    payload: {
      rounds: [
        { wordOrderIndex: 237, arabic: 'عَالَمِين', options: ['Worlds', 'Community'], correctIndex: 0 },
        { wordOrderIndex: 239, arabic: 'مُبِين', options: ['Offspring', 'Clear'], correctIndex: 1 },
        { wordOrderIndex: 240, arabic: 'قُرْآن', options: ['Quran', 'Worlds'], correctIndex: 0 },
        { wordOrderIndex: 238, arabic: 'ذُرِّيَّة', options: ['Clear', 'Offspring'], correctIndex: 1 },
        { wordOrderIndex: 236, arabic: 'أُمَّة', options: ['Community', 'Quran'], correctIndex: 0 },
      ],
    },
  },

  // ── Lesson 49 ──
  {
    lessonOrderIndex: 49,
    orderIndex: 1,
    type: ActivityType.MATCH,
    payload: {
      pairs: [
        { wordOrderIndex: 241, arabic: 'ضَلَّ', meaning: 'to go astray' },
        { wordOrderIndex: 242, arabic: 'ضَلَال', meaning: 'Misguidance' },
        { wordOrderIndex: 243, arabic: 'أَشْرَكَ', meaning: 'to associate partners' },
        { wordOrderIndex: 244, arabic: 'كُفْر', meaning: 'Disbelief' },
        { wordOrderIndex: 245, arabic: 'إِثْم', meaning: 'Sin' },
      ],
    },
  },
  {
    lessonOrderIndex: 49,
    orderIndex: 2,
    type: ActivityType.QUICK_FIRE,
    payload: {
      rounds: [
        { wordOrderIndex: 241, arabic: 'ضَلَّ', options: ['to go astray', 'Sin'], correctIndex: 0 },
        { wordOrderIndex: 243, arabic: 'أَشْرَكَ', options: ['Disbelief', 'to associate partners'], correctIndex: 1 },
        { wordOrderIndex: 245, arabic: 'إِثْم', options: ['Sin', 'Misguidance'], correctIndex: 0 },
        { wordOrderIndex: 242, arabic: 'ضَلَال', options: ['to go astray', 'Misguidance'], correctIndex: 1 },
        { wordOrderIndex: 244, arabic: 'كُفْر', options: ['Disbelief', 'to associate partners'], correctIndex: 0 },
      ],
    },
  },
  {
    lessonOrderIndex: 49,
    orderIndex: 3,
    type: ActivityType.FILL_MEANING,
    payload: {
      wordOrderIndex: 243,
      arabic: 'أَشْرَكَ',
      prompt: 'أَشْرَكَ means ___',
      options: ['Misguidance', 'Sin', 'to associate partners', 'Disbelief'],
      correctIndex: 2,
    },
  },

  // ── Lesson 50 ──
  {
    lessonOrderIndex: 50,
    orderIndex: 1,
    type: ActivityType.MATCH,
    payload: {
      pairs: [
        { wordOrderIndex: 246, arabic: 'غَيْب', meaning: 'Unseen' },
        { wordOrderIndex: 247, arabic: 'ذَنْب', meaning: 'Sin, Fault' },
        { wordOrderIndex: 248, arabic: 'سُوء', meaning: 'Evil' },
        { wordOrderIndex: 249, arabic: 'ظُلْم', meaning: 'Injustice' },
        { wordOrderIndex: 250, arabic: 'دُعَاء', meaning: 'Supplication' },
      ],
    },
  },
  {
    lessonOrderIndex: 50,
    orderIndex: 2,
    type: ActivityType.FILL_MEANING,
    payload: {
      wordOrderIndex: 246,
      arabic: 'غَيْب',
      prompt: 'غَيْب means ___',
      options: ['Injustice', 'Unseen', 'Sin', 'Evil'],
      correctIndex: 1,
    },
  },
  {
    lessonOrderIndex: 50,
    orderIndex: 3,
    type: ActivityType.QUICK_FIRE,
    payload: {
      rounds: [
        { wordOrderIndex: 248, arabic: 'سُوء', options: ['Evil', 'Unseen'], correctIndex: 0 },
        { wordOrderIndex: 250, arabic: 'دُعَاء', options: ['Injustice', 'Supplication'], correctIndex: 1 },
        { wordOrderIndex: 247, arabic: 'ذَنْب', options: ['Sin/Fault', 'Evil'], correctIndex: 0 },
        { wordOrderIndex: 249, arabic: 'ظُلْم', options: ['Supplication', 'Injustice'], correctIndex: 1 },
        { wordOrderIndex: 246, arabic: 'غَيْب', options: ['Unseen', 'Sin'], correctIndex: 0 },
      ],
    },
  },

  // ── Lesson 51 ──
  {
    lessonOrderIndex: 51,
    orderIndex: 1,
    type: ActivityType.MATCH,
    payload: {
      pairs: [
        { wordOrderIndex: 251, arabic: 'خَشِيَ', meaning: 'to fear' },
        { wordOrderIndex: 252, arabic: 'تَرَكَ', meaning: 'to leave' },
        { wordOrderIndex: 253, arabic: 'بَلَغَ', meaning: 'to reach' },
        { wordOrderIndex: 254, arabic: 'حَرَّمَ', meaning: 'to forbid' },
        { wordOrderIndex: 255, arabic: 'تَوَلَّى', meaning: 'to turn away' },
      ],
    },
  },
  {
    lessonOrderIndex: 51,
    orderIndex: 2,
    type: ActivityType.QUICK_FIRE,
    payload: {
      rounds: [
        { wordOrderIndex: 251, arabic: 'خَشِيَ', options: ['to fear', 'to leave'], correctIndex: 0 },
        { wordOrderIndex: 253, arabic: 'بَلَغَ', options: ['to forbid', 'to reach'], correctIndex: 1 },
        { wordOrderIndex: 255, arabic: 'تَوَلَّى', options: ['to turn away', 'to fear'], correctIndex: 0 },
        { wordOrderIndex: 252, arabic: 'تَرَكَ', options: ['to reach', 'to leave'], correctIndex: 1 },
        { wordOrderIndex: 254, arabic: 'حَرَّمَ', options: ['to forbid', 'to turn away'], correctIndex: 0 },
      ],
    },
  },
  {
    lessonOrderIndex: 51,
    orderIndex: 3,
    type: ActivityType.FILL_MEANING,
    payload: {
      wordOrderIndex: 255,
      arabic: 'تَوَلَّى',
      prompt: 'تَوَلَّى means ___',
      options: ['to fear', 'to reach', 'to leave', 'to turn away'],
      correctIndex: 3,
    },
  },

  // ── Lesson 52 ──
  {
    lessonOrderIndex: 52,
    orderIndex: 1,
    type: ActivityType.MATCH,
    payload: {
      pairs: [
        { wordOrderIndex: 256, arabic: 'أَقَامَ', meaning: 'to establish' },
        { wordOrderIndex: 257, arabic: 'رَدَّ', meaning: 'to return' },
        { wordOrderIndex: 258, arabic: 'زَادَ', meaning: 'to increase' },
        { wordOrderIndex: 259, arabic: 'نَسِيَ', meaning: 'to forget' },
        { wordOrderIndex: 260, arabic: 'عَقَلَ', meaning: 'to reason' },
      ],
    },
  },
  {
    lessonOrderIndex: 52,
    orderIndex: 2,
    type: ActivityType.FILL_MEANING,
    payload: {
      wordOrderIndex: 258,
      arabic: 'زَادَ',
      prompt: 'زَادَ means ___',
      options: ['to establish', 'to increase', 'to forget', 'to return'],
      correctIndex: 1,
    },
  },
  {
    lessonOrderIndex: 52,
    orderIndex: 3,
    type: ActivityType.QUICK_FIRE,
    payload: {
      rounds: [
        { wordOrderIndex: 256, arabic: 'أَقَامَ', options: ['to establish', 'to return'], correctIndex: 0 },
        { wordOrderIndex: 259, arabic: 'نَسِيَ', options: ['to reason', 'to forget'], correctIndex: 1 },
        { wordOrderIndex: 257, arabic: 'رَدَّ', options: ['to return', 'to increase'], correctIndex: 0 },
        { wordOrderIndex: 260, arabic: 'عَقَلَ', options: ['to forget', 'to reason'], correctIndex: 1 },
        { wordOrderIndex: 258, arabic: 'زَادَ', options: ['to increase', 'to establish'], correctIndex: 0 },
      ],
    },
  },

  // ── Lesson 53 ──
  {
    lessonOrderIndex: 53,
    orderIndex: 1,
    type: ActivityType.MATCH,
    payload: {
      pairs: [
        { wordOrderIndex: 261, arabic: 'بَحْر', meaning: 'Sea' },
        { wordOrderIndex: 262, arabic: 'نَهْر', meaning: 'River' },
        { wordOrderIndex: 263, arabic: 'رِيح', meaning: 'Wind' },
        { wordOrderIndex: 264, arabic: 'جَبَل', meaning: 'Mountain' },
        { wordOrderIndex: 265, arabic: 'شَجَرَة', meaning: 'Tree' },
      ],
    },
  },
  {
    lessonOrderIndex: 53,
    orderIndex: 2,
    type: ActivityType.QUICK_FIRE,
    payload: {
      rounds: [
        { wordOrderIndex: 261, arabic: 'بَحْر', options: ['Sea', 'River'], correctIndex: 0 },
        { wordOrderIndex: 263, arabic: 'رِيح', options: ['Mountain', 'Wind'], correctIndex: 1 },
        { wordOrderIndex: 265, arabic: 'شَجَرَة', options: ['Tree', 'Sea'], correctIndex: 0 },
        { wordOrderIndex: 262, arabic: 'نَهْر', options: ['Wind', 'River'], correctIndex: 1 },
        { wordOrderIndex: 264, arabic: 'جَبَل', options: ['Mountain', 'Tree'], correctIndex: 0 },
      ],
    },
  },
  {
    lessonOrderIndex: 53,
    orderIndex: 3,
    type: ActivityType.FILL_MEANING,
    payload: {
      wordOrderIndex: 263,
      arabic: 'رِيح',
      prompt: 'رِيح means ___',
      options: ['River', 'Mountain', 'Wind', 'Sea'],
      correctIndex: 2,
    },
  },

  // ── Lesson 54 ──
  {
    lessonOrderIndex: 54,
    orderIndex: 1,
    type: ActivityType.MATCH,
    payload: {
      pairs: [
        { wordOrderIndex: 266, arabic: 'مِسْكِين', meaning: 'Poor' },
        { wordOrderIndex: 267, arabic: 'فَاسِق', meaning: 'Transgressor' },
        { wordOrderIndex: 268, arabic: 'غَنِيّ', meaning: 'Rich' },
        { wordOrderIndex: 269, arabic: 'رَجُل', meaning: 'Man' },
        { wordOrderIndex: 270, arabic: 'قَرْيَة', meaning: 'Town' },
      ],
    },
  },
  {
    lessonOrderIndex: 54,
    orderIndex: 2,
    type: ActivityType.FILL_MEANING,
    payload: {
      wordOrderIndex: 267,
      arabic: 'فَاسِق',
      prompt: 'فَاسِق means ___',
      options: ['Poor', 'Rich', 'Man', 'Transgressor'],
      correctIndex: 3,
    },
  },
  {
    lessonOrderIndex: 54,
    orderIndex: 3,
    type: ActivityType.QUICK_FIRE,
    payload: {
      rounds: [
        { wordOrderIndex: 266, arabic: 'مِسْكِين', options: ['Poor', 'Rich'], correctIndex: 0 },
        { wordOrderIndex: 268, arabic: 'غَنِيّ', options: ['Man', 'Rich'], correctIndex: 1 },
        { wordOrderIndex: 270, arabic: 'قَرْيَة', options: ['Town', 'Poor'], correctIndex: 0 },
        { wordOrderIndex: 269, arabic: 'رَجُل', options: ['Transgressor', 'Man'], correctIndex: 1 },
        { wordOrderIndex: 267, arabic: 'فَاسِق', options: ['Transgressor', 'Town'], correctIndex: 0 },
      ],
    },
  },

  // ── Lesson 55 ──
  {
    lessonOrderIndex: 55,
    orderIndex: 1,
    type: ActivityType.MATCH,
    payload: {
      pairs: [
        { wordOrderIndex: 271, arabic: 'عَذَّبَ', meaning: 'to punish' },
        { wordOrderIndex: 272, arabic: 'سَبَّحَ', meaning: 'to glorify' },
        { wordOrderIndex: 273, arabic: 'أَكَلَ', meaning: 'to eat' },
        { wordOrderIndex: 274, arabic: 'مُتَّقِين', meaning: 'God-fearing ones' },
        { wordOrderIndex: 275, arabic: 'صَالِحَات', meaning: 'Righteous deeds' },
      ],
    },
  },
  {
    lessonOrderIndex: 55,
    orderIndex: 2,
    type: ActivityType.QUICK_FIRE,
    payload: {
      rounds: [
        { wordOrderIndex: 271, arabic: 'عَذَّبَ', options: ['to punish', 'to glorify'], correctIndex: 0 },
        { wordOrderIndex: 273, arabic: 'أَكَلَ', options: ['Righteous deeds', 'to eat'], correctIndex: 1 },
        { wordOrderIndex: 275, arabic: 'صَالِحَات', options: ['Righteous deeds', 'to punish'], correctIndex: 0 },
        { wordOrderIndex: 272, arabic: 'سَبَّحَ', options: ['to eat', 'to glorify'], correctIndex: 1 },
        { wordOrderIndex: 274, arabic: 'مُتَّقِين', options: ['God-fearing ones', 'to glorify'], correctIndex: 0 },
      ],
    },
  },
  {
    lessonOrderIndex: 55,
    orderIndex: 3,
    type: ActivityType.FILL_MEANING,
    payload: {
      wordOrderIndex: 274,
      arabic: 'مُتَّقِين',
      prompt: 'مُتَّقِين means ___',
      options: ['to punish', 'God-fearing ones', 'to eat', 'Righteous deeds'],
      correctIndex: 1,
    },
  },

  // ── Lesson 56 ──
  {
    lessonOrderIndex: 56,
    orderIndex: 1,
    type: ActivityType.MATCH,
    payload: {
      pairs: [
        { wordOrderIndex: 276, arabic: 'فَوْقَ', meaning: 'Above' },
        { wordOrderIndex: 277, arabic: 'تَحْت', meaning: 'Under' },
        { wordOrderIndex: 278, arabic: 'دُونَ', meaning: 'Below, Besides' },
        { wordOrderIndex: 279, arabic: 'أَوَّل', meaning: 'First' },
        { wordOrderIndex: 280, arabic: 'مَصِير', meaning: 'Destination' },
      ],
    },
  },
  {
    lessonOrderIndex: 56,
    orderIndex: 2,
    type: ActivityType.FILL_MEANING,
    payload: {
      wordOrderIndex: 278,
      arabic: 'دُونَ',
      prompt: 'دُونَ means ___',
      options: ['Above', 'First', 'Below/Besides', 'Under'],
      correctIndex: 2,
    },
  },
  {
    lessonOrderIndex: 56,
    orderIndex: 3,
    type: ActivityType.QUICK_FIRE,
    payload: {
      rounds: [
        { wordOrderIndex: 276, arabic: 'فَوْقَ', options: ['Above', 'Under'], correctIndex: 0 },
        { wordOrderIndex: 278, arabic: 'دُونَ', options: ['First', 'Below/Besides'], correctIndex: 1 },
        { wordOrderIndex: 280, arabic: 'مَصِير', options: ['Destination', 'Above'], correctIndex: 0 },
        { wordOrderIndex: 277, arabic: 'تَحْت', options: ['First', 'Under'], correctIndex: 1 },
        { wordOrderIndex: 279, arabic: 'أَوَّل', options: ['First', 'Destination'], correctIndex: 0 },
      ],
    },
  },

  // ── Lesson 57 ──
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
        { wordOrderIndex: 285, arabic: 'حَسَنَة', meaning: 'Good Deed' },
      ],
    },
  },
  {
    lessonOrderIndex: 57,
    orderIndex: 2,
    type: ActivityType.QUICK_FIRE,
    payload: {
      rounds: [
        { wordOrderIndex: 281, arabic: 'نَذِير', options: ['Warner', 'Fear'], correctIndex: 0 },
        { wordOrderIndex: 283, arabic: 'كَذِب', options: ['Good Deed', 'Lie'], correctIndex: 1 },
        { wordOrderIndex: 285, arabic: 'حَسَنَة', options: ['Good Deed', 'Falsehood'], correctIndex: 0 },
        { wordOrderIndex: 282, arabic: 'خَوْف', options: ['Lie', 'Fear'], correctIndex: 1 },
        { wordOrderIndex: 284, arabic: 'بَاطِل', options: ['Falsehood', 'Warner'], correctIndex: 0 },
      ],
    },
  },
  {
    lessonOrderIndex: 57,
    orderIndex: 3,
    type: ActivityType.FILL_MEANING,
    payload: {
      wordOrderIndex: 285,
      arabic: 'حَسَنَة',
      prompt: 'حَسَنَة means ___',
      options: ['Fear', 'Lie', 'Warner', 'Good Deed'],
      correctIndex: 3,
    },
  },

  // ── Lesson 58 ──
  {
    lessonOrderIndex: 58,
    orderIndex: 1,
    type: ActivityType.MATCH,
    payload: {
      pairs: [
        { wordOrderIndex: 286, arabic: 'إِنْ', meaning: 'If' },
        { wordOrderIndex: 287, arabic: 'أَنْ', meaning: 'That' },
        { wordOrderIndex: 288, arabic: 'أَنَّ', meaning: 'That (emphatic)' },
        { wordOrderIndex: 289, arabic: 'أَمْ', meaning: 'Or (in questions)' },
        { wordOrderIndex: 290, arabic: 'لَمَّا', meaning: 'When, Since' },
      ],
    },
  },
  {
    lessonOrderIndex: 58,
    orderIndex: 2,
    type: ActivityType.FILL_MEANING,
    payload: {
      wordOrderIndex: 290,
      arabic: 'لَمَّا',
      prompt: 'لَمَّا means ___',
      options: ['When/Since', 'If', 'That', 'Or'],
      correctIndex: 0,
    },
  },
  {
    lessonOrderIndex: 58,
    orderIndex: 3,
    type: ActivityType.QUICK_FIRE,
    payload: {
      rounds: [
        { wordOrderIndex: 286, arabic: 'إِنْ', options: ['If', 'That'], correctIndex: 0 },
        { wordOrderIndex: 288, arabic: 'أَنَّ', options: ['Or', 'That (emphatic)'], correctIndex: 1 },
        { wordOrderIndex: 289, arabic: 'أَمْ', options: ['Or (in questions)', 'If'], correctIndex: 0 },
        { wordOrderIndex: 287, arabic: 'أَنْ', options: ['When', 'That'], correctIndex: 1 },
        { wordOrderIndex: 290, arabic: 'لَمَّا', options: ['When/Since', 'Or'], correctIndex: 0 },
      ],
    },
  },

  // ── Lesson 59 ──
  {
    lessonOrderIndex: 59,
    orderIndex: 1,
    type: ActivityType.MATCH,
    payload: {
      pairs: [
        { wordOrderIndex: 291, arabic: 'الرَّحْمَن', meaning: 'Most Merciful' },
        { wordOrderIndex: 292, arabic: 'حَرَام', meaning: 'Forbidden' },
        { wordOrderIndex: 293, arabic: 'طَعَام', meaning: 'Food' },
        { wordOrderIndex: 294, arabic: 'نَبَأ', meaning: 'News' },
        { wordOrderIndex: 295, arabic: 'وَاحِد', meaning: 'One' },
      ],
    },
  },
  {
    lessonOrderIndex: 59,
    orderIndex: 2,
    type: ActivityType.QUICK_FIRE,
    payload: {
      rounds: [
        { wordOrderIndex: 291, arabic: 'الرَّحْمَن', options: ['Most Merciful', 'Forbidden'], correctIndex: 0 },
        { wordOrderIndex: 293, arabic: 'طَعَام', options: ['News', 'Food'], correctIndex: 1 },
        { wordOrderIndex: 295, arabic: 'وَاحِد', options: ['One', 'Most Merciful'], correctIndex: 0 },
        { wordOrderIndex: 292, arabic: 'حَرَام', options: ['Food', 'Forbidden'], correctIndex: 1 },
        { wordOrderIndex: 294, arabic: 'نَبَأ', options: ['News', 'One'], correctIndex: 0 },
      ],
    },
  },
  {
    lessonOrderIndex: 59,
    orderIndex: 3,
    type: ActivityType.FILL_MEANING,
    payload: {
      wordOrderIndex: 292,
      arabic: 'حَرَام',
      prompt: 'حَرَام means ___',
      options: ['Food', 'Forbidden', 'News', 'One'],
      correctIndex: 1,
    },
  },

  // ── Lesson 60 ──
  {
    lessonOrderIndex: 60,
    orderIndex: 1,
    type: ActivityType.MATCH,
    payload: {
      pairs: [
        { wordOrderIndex: 296, arabic: 'بَنُون', meaning: 'Sons' },
        { wordOrderIndex: 297, arabic: 'لِسَان', meaning: 'Tongue' },
        { wordOrderIndex: 298, arabic: 'بَيِّنَة', meaning: 'Clear Evidence' },
        { wordOrderIndex: 299, arabic: 'رِجَال', meaning: 'Men' },
        { wordOrderIndex: 300, arabic: 'عَالِم', meaning: 'Scholar' },
      ],
    },
  },
  {
    lessonOrderIndex: 60,
    orderIndex: 2,
    type: ActivityType.FILL_MEANING,
    payload: {
      wordOrderIndex: 300,
      arabic: 'عَالِم',
      prompt: 'عَالِم means ___',
      options: ['Men', 'Tongue', 'Scholar', 'Sons'],
      correctIndex: 2,
    },
  },
  {
    lessonOrderIndex: 60,
    orderIndex: 3,
    type: ActivityType.QUICK_FIRE,
    payload: {
      rounds: [
        { wordOrderIndex: 296, arabic: 'بَنُون', options: ['Sons', 'Tongue'], correctIndex: 0 },
        { wordOrderIndex: 298, arabic: 'بَيِّنَة', options: ['Men', 'Clear Evidence'], correctIndex: 1 },
        { wordOrderIndex: 299, arabic: 'رِجَال', options: ['Men', 'Scholar'], correctIndex: 0 },
        { wordOrderIndex: 297, arabic: 'لِسَان', options: ['Sons', 'Tongue'], correctIndex: 1 },
        { wordOrderIndex: 300, arabic: 'عَالِم', options: ['Scholar', 'Clear Evidence'], correctIndex: 0 },
      ],
    },
  },
];
