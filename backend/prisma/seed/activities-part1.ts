import { ActivityType, Prisma } from '@prisma/client';

export interface ActivitySeedData {
  lessonOrderIndex: number;
  orderIndex: number;
  type: ActivityType;
  payload: Prisma.InputJsonValue;
}

// Activities reference words by orderIndex — the seed script will resolve to actual word IDs
export const ACTIVITIES_L1_L30: ActivitySeedData[] = [
  // ── Lesson 1 ──
  {
    lessonOrderIndex: 1,
    orderIndex: 1,
    type: ActivityType.MATCH,
    payload: {
      pairs: [
        { wordOrderIndex: 1, arabic: 'رَبّ', meaning: 'Lord, Sustainer' },
        { wordOrderIndex: 2, arabic: 'رَحْمَة', meaning: 'Mercy' },
        { wordOrderIndex: 3, arabic: 'عِلْم', meaning: 'Knowledge' },
        { wordOrderIndex: 4, arabic: 'صَبْر', meaning: 'Patience' },
        { wordOrderIndex: 5, arabic: 'هُدَى', meaning: 'Guidance' },
      ],
    },
  },
  {
    lessonOrderIndex: 1,
    orderIndex: 2,
    type: ActivityType.QUICK_FIRE,
    payload: {
      rounds: [
        { wordOrderIndex: 1, arabic: 'رَبّ', options: ['Lord', 'Mercy'], correctIndex: 0 },
        { wordOrderIndex: 3, arabic: 'عِلْم', options: ['Patience', 'Knowledge'], correctIndex: 1 },
        { wordOrderIndex: 5, arabic: 'هُدَى', options: ['Guidance', 'Lord'], correctIndex: 0 },
        { wordOrderIndex: 2, arabic: 'رَحْمَة', options: ['Knowledge', 'Mercy'], correctIndex: 1 },
        { wordOrderIndex: 4, arabic: 'صَبْر', options: ['Patience', 'Guidance'], correctIndex: 0 },
      ],
    },
  },
  {
    lessonOrderIndex: 1,
    orderIndex: 3,
    type: ActivityType.FILL_MEANING,
    payload: {
      wordOrderIndex: 2,
      arabic: 'رَحْمَة',
      prompt: 'رَحْمَة means ___',
      options: ['Mercy', 'Patience', 'Knowledge', 'Guidance'],
      correctIndex: 0,
    },
  },

  // ── Lesson 2 ──
  {
    lessonOrderIndex: 2,
    orderIndex: 1,
    type: ActivityType.MATCH,
    payload: {
      pairs: [
        { wordOrderIndex: 6, arabic: 'اللَّه', meaning: 'God' },
        { wordOrderIndex: 7, arabic: 'كِتَاب', meaning: 'Book' },
        { wordOrderIndex: 8, arabic: 'آيَة', meaning: 'Sign, Verse' },
        { wordOrderIndex: 9, arabic: 'رَسُول', meaning: 'Messenger' },
        { wordOrderIndex: 10, arabic: 'حَقّ', meaning: 'Truth' },
      ],
    },
  },
  {
    lessonOrderIndex: 2,
    orderIndex: 2,
    type: ActivityType.FILL_MEANING,
    payload: {
      wordOrderIndex: 7,
      arabic: 'كِتَاب',
      prompt: 'كِتَاب means ___',
      options: ['Book', 'Verse', 'Truth', 'Messenger'],
      correctIndex: 0,
    },
  },
  {
    lessonOrderIndex: 2,
    orderIndex: 3,
    type: ActivityType.QUICK_FIRE,
    payload: {
      rounds: [
        { wordOrderIndex: 8, arabic: 'آيَة', options: ['Sign/Verse', 'Book'], correctIndex: 0 },
        { wordOrderIndex: 9, arabic: 'رَسُول', options: ['Truth', 'Messenger'], correctIndex: 1 },
        { wordOrderIndex: 10, arabic: 'حَقّ', options: ['Truth', 'God'], correctIndex: 0 },
        { wordOrderIndex: 6, arabic: 'اللَّه', options: ['Book', 'God'], correctIndex: 1 },
        { wordOrderIndex: 7, arabic: 'كِتَاب', options: ['Book', 'Sign'], correctIndex: 0 },
      ],
    },
  },

  // ── Lesson 3 ──
  {
    lessonOrderIndex: 3,
    orderIndex: 1,
    type: ActivityType.MATCH,
    payload: {
      pairs: [
        { wordOrderIndex: 11, arabic: 'أَرْض', meaning: 'Earth' },
        { wordOrderIndex: 12, arabic: 'سَمَاء', meaning: 'Sky, Heaven' },
        { wordOrderIndex: 13, arabic: 'نَفْس', meaning: 'Self, Soul' },
        { wordOrderIndex: 14, arabic: 'نُور', meaning: 'Light' },
        { wordOrderIndex: 15, arabic: 'حَيَاة', meaning: 'Life' },
      ],
    },
  },
  {
    lessonOrderIndex: 3,
    orderIndex: 2,
    type: ActivityType.QUICK_FIRE,
    payload: {
      rounds: [
        { wordOrderIndex: 14, arabic: 'نُور', options: ['Light', 'Life'], correctIndex: 0 },
        { wordOrderIndex: 11, arabic: 'أَرْض', options: ['Sky', 'Earth'], correctIndex: 1 },
        { wordOrderIndex: 13, arabic: 'نَفْس', options: ['Soul', 'Light'], correctIndex: 0 },
        { wordOrderIndex: 15, arabic: 'حَيَاة', options: ['Earth', 'Life'], correctIndex: 1 },
        { wordOrderIndex: 12, arabic: 'سَمَاء', options: ['Sky', 'Soul'], correctIndex: 0 },
      ],
    },
  },
  {
    lessonOrderIndex: 3,
    orderIndex: 3,
    type: ActivityType.FILL_MEANING,
    payload: {
      wordOrderIndex: 14,
      arabic: 'نُور',
      prompt: 'نُور means ___',
      options: ['Light', 'Earth', 'Life', 'Soul'],
      correctIndex: 0,
    },
  },

  // ── Lesson 4 ──
  {
    lessonOrderIndex: 4,
    orderIndex: 1,
    type: ActivityType.MATCH,
    payload: {
      pairs: [
        { wordOrderIndex: 16, arabic: 'عَلِمَ', meaning: 'to know' },
        { wordOrderIndex: 17, arabic: 'عَمِلَ', meaning: 'to do, to work' },
        { wordOrderIndex: 18, arabic: 'خَلَقَ', meaning: 'to create' },
        { wordOrderIndex: 19, arabic: 'هَدَى', meaning: 'to guide' },
        { wordOrderIndex: 20, arabic: 'سَمِعَ', meaning: 'to hear' },
      ],
    },
  },
  {
    lessonOrderIndex: 4,
    orderIndex: 2,
    type: ActivityType.FILL_MEANING,
    payload: {
      wordOrderIndex: 18,
      arabic: 'خَلَقَ',
      prompt: 'خَلَقَ means ___',
      options: ['to create', 'to know', 'to hear', 'to guide'],
      correctIndex: 0,
    },
  },
  {
    lessonOrderIndex: 4,
    orderIndex: 3,
    type: ActivityType.QUICK_FIRE,
    payload: {
      rounds: [
        { wordOrderIndex: 16, arabic: 'عَلِمَ', options: ['to know', 'to do'], correctIndex: 0 },
        { wordOrderIndex: 19, arabic: 'هَدَى', options: ['to create', 'to guide'], correctIndex: 1 },
        { wordOrderIndex: 20, arabic: 'سَمِعَ', options: ['to hear', 'to know'], correctIndex: 0 },
        { wordOrderIndex: 17, arabic: 'عَمِلَ', options: ['to guide', 'to do'], correctIndex: 1 },
        { wordOrderIndex: 18, arabic: 'خَلَقَ', options: ['to create', 'to hear'], correctIndex: 0 },
      ],
    },
  },

  // ── Lesson 5 ──
  {
    lessonOrderIndex: 5,
    orderIndex: 1,
    type: ActivityType.MATCH,
    payload: {
      pairs: [
        { wordOrderIndex: 21, arabic: 'جَنَّة', meaning: 'Paradise' },
        { wordOrderIndex: 22, arabic: 'نَار', meaning: 'Fire, Hell' },
        { wordOrderIndex: 23, arabic: 'عَذَاب', meaning: 'Punishment' },
        { wordOrderIndex: 24, arabic: 'أَجْر', meaning: 'Reward' },
        { wordOrderIndex: 25, arabic: 'مَغْفِرَة', meaning: 'Forgiveness' },
      ],
    },
  },
  {
    lessonOrderIndex: 5,
    orderIndex: 2,
    type: ActivityType.QUICK_FIRE,
    payload: {
      rounds: [
        { wordOrderIndex: 21, arabic: 'جَنَّة', options: ['Paradise', 'Fire'], correctIndex: 0 },
        { wordOrderIndex: 23, arabic: 'عَذَاب', options: ['Reward', 'Punishment'], correctIndex: 1 },
        { wordOrderIndex: 25, arabic: 'مَغْفِرَة', options: ['Forgiveness', 'Paradise'], correctIndex: 0 },
        { wordOrderIndex: 22, arabic: 'نَار', options: ['Punishment', 'Fire'], correctIndex: 1 },
        { wordOrderIndex: 24, arabic: 'أَجْر', options: ['Reward', 'Forgiveness'], correctIndex: 0 },
      ],
    },
  },
  {
    lessonOrderIndex: 5,
    orderIndex: 3,
    type: ActivityType.FILL_MEANING,
    payload: {
      wordOrderIndex: 25,
      arabic: 'مَغْفِرَة',
      prompt: 'مَغْفِرَة means ___',
      options: ['Forgiveness', 'Paradise', 'Punishment', 'Reward'],
      correctIndex: 0,
    },
  },

  // ── Lesson 6 ──
  {
    lessonOrderIndex: 6,
    orderIndex: 1,
    type: ActivityType.MATCH,
    payload: {
      pairs: [
        { wordOrderIndex: 26, arabic: 'آمَنَ', meaning: 'to believe' },
        { wordOrderIndex: 27, arabic: 'كَفَرَ', meaning: 'to disbelieve' },
        { wordOrderIndex: 28, arabic: 'مُؤْمِن', meaning: 'Believer' },
        { wordOrderIndex: 29, arabic: 'عَبَدَ', meaning: 'to worship' },
        { wordOrderIndex: 30, arabic: 'اتَّقَى', meaning: 'to fear Allah' },
      ],
    },
  },
  {
    lessonOrderIndex: 6,
    orderIndex: 2,
    type: ActivityType.FILL_MEANING,
    payload: {
      wordOrderIndex: 26,
      arabic: 'آمَنَ',
      prompt: 'آمَنَ means ___',
      options: ['to believe', 'to disbelieve', 'to worship', 'to fear'],
      correctIndex: 0,
    },
  },
  {
    lessonOrderIndex: 6,
    orderIndex: 3,
    type: ActivityType.QUICK_FIRE,
    payload: {
      rounds: [
        { wordOrderIndex: 26, arabic: 'آمَنَ', options: ['to believe', 'to worship'], correctIndex: 0 },
        { wordOrderIndex: 27, arabic: 'كَفَرَ', options: ['to fear', 'to disbelieve'], correctIndex: 1 },
        { wordOrderIndex: 28, arabic: 'مُؤْمِن', options: ['Believer', 'to disbelieve'], correctIndex: 0 },
        { wordOrderIndex: 29, arabic: 'عَبَدَ', options: ['to believe', 'to worship'], correctIndex: 1 },
        { wordOrderIndex: 30, arabic: 'اتَّقَى', options: ['to fear Allah', 'Believer'], correctIndex: 0 },
      ],
    },
  },

  // ── Lesson 7 ──
  {
    lessonOrderIndex: 7,
    orderIndex: 1,
    type: ActivityType.MATCH,
    payload: {
      pairs: [
        { wordOrderIndex: 31, arabic: 'قَوْم', meaning: 'People, Nation' },
        { wordOrderIndex: 32, arabic: 'نَاس', meaning: 'Mankind' },
        { wordOrderIndex: 33, arabic: 'عَبْد', meaning: 'Servant' },
        { wordOrderIndex: 34, arabic: 'ظَالِم', meaning: 'Oppressor' },
        { wordOrderIndex: 35, arabic: 'نَبِيّ', meaning: 'Prophet' },
      ],
    },
  },
  {
    lessonOrderIndex: 7,
    orderIndex: 2,
    type: ActivityType.QUICK_FIRE,
    payload: {
      rounds: [
        { wordOrderIndex: 31, arabic: 'قَوْم', options: ['People', 'Servant'], correctIndex: 0 },
        { wordOrderIndex: 33, arabic: 'عَبْد', options: ['Prophet', 'Servant'], correctIndex: 1 },
        { wordOrderIndex: 35, arabic: 'نَبِيّ', options: ['Prophet', 'Oppressor'], correctIndex: 0 },
        { wordOrderIndex: 32, arabic: 'نَاس', options: ['People', 'Mankind'], correctIndex: 1 },
        { wordOrderIndex: 34, arabic: 'ظَالِم', options: ['Oppressor', 'Nation'], correctIndex: 0 },
      ],
    },
  },
  {
    lessonOrderIndex: 7,
    orderIndex: 3,
    type: ActivityType.FILL_MEANING,
    payload: {
      wordOrderIndex: 33,
      arabic: 'عَبْد',
      prompt: 'عَبْد means ___',
      options: ['Servant', 'Prophet', 'Oppressor', 'Mankind'],
      correctIndex: 0,
    },
  },

  // ── Lesson 8 ──
  {
    lessonOrderIndex: 8,
    orderIndex: 1,
    type: ActivityType.MATCH,
    payload: {
      pairs: [
        { wordOrderIndex: 36, arabic: 'صَلَاة', meaning: 'Prayer' },
        { wordOrderIndex: 37, arabic: 'شُكْر', meaning: 'Gratitude' },
        { wordOrderIndex: 38, arabic: 'رِزْق', meaning: 'Provision' },
        { wordOrderIndex: 39, arabic: 'نِعْمَة', meaning: 'Blessing' },
        { wordOrderIndex: 40, arabic: 'حِكْمَة', meaning: 'Wisdom' },
      ],
    },
  },
  {
    lessonOrderIndex: 8,
    orderIndex: 2,
    type: ActivityType.FILL_MEANING,
    payload: {
      wordOrderIndex: 36,
      arabic: 'صَلَاة',
      prompt: 'صَلَاة means ___',
      options: ['Prayer', 'Gratitude', 'Wisdom', 'Blessing'],
      correctIndex: 0,
    },
  },
  {
    lessonOrderIndex: 8,
    orderIndex: 3,
    type: ActivityType.QUICK_FIRE,
    payload: {
      rounds: [
        { wordOrderIndex: 37, arabic: 'شُكْر', options: ['Gratitude', 'Prayer'], correctIndex: 0 },
        { wordOrderIndex: 38, arabic: 'رِزْق', options: ['Wisdom', 'Provision'], correctIndex: 1 },
        { wordOrderIndex: 40, arabic: 'حِكْمَة', options: ['Wisdom', 'Blessing'], correctIndex: 0 },
        { wordOrderIndex: 39, arabic: 'نِعْمَة', options: ['Provision', 'Blessing'], correctIndex: 1 },
        { wordOrderIndex: 36, arabic: 'صَلَاة', options: ['Prayer', 'Gratitude'], correctIndex: 0 },
      ],
    },
  },

  // ── Lesson 9 ──
  {
    lessonOrderIndex: 9,
    orderIndex: 1,
    type: ActivityType.MATCH,
    payload: {
      pairs: [
        { wordOrderIndex: 41, arabic: 'قَالَ', meaning: 'to say' },
        { wordOrderIndex: 42, arabic: 'دَعَا', meaning: 'to call, to pray' },
        { wordOrderIndex: 43, arabic: 'غَفَرَ', meaning: 'to forgive' },
        { wordOrderIndex: 44, arabic: 'ذَكَرَ', meaning: 'to remember' },
        { wordOrderIndex: 45, arabic: 'ظَلَمَ', meaning: 'to oppress' },
      ],
    },
  },
  {
    lessonOrderIndex: 9,
    orderIndex: 2,
    type: ActivityType.QUICK_FIRE,
    payload: {
      rounds: [
        { wordOrderIndex: 41, arabic: 'قَالَ', options: ['to say', 'to call'], correctIndex: 0 },
        { wordOrderIndex: 43, arabic: 'غَفَرَ', options: ['to oppress', 'to forgive'], correctIndex: 1 },
        { wordOrderIndex: 42, arabic: 'دَعَا', options: ['to call/pray', 'to say'], correctIndex: 0 },
        { wordOrderIndex: 45, arabic: 'ظَلَمَ', options: ['to remember', 'to oppress'], correctIndex: 1 },
        { wordOrderIndex: 44, arabic: 'ذَكَرَ', options: ['to remember', 'to forgive'], correctIndex: 0 },
      ],
    },
  },
  {
    lessonOrderIndex: 9,
    orderIndex: 3,
    type: ActivityType.FILL_MEANING,
    payload: {
      wordOrderIndex: 43,
      arabic: 'غَفَرَ',
      prompt: 'غَفَرَ means ___',
      options: ['to forgive', 'to say', 'to oppress', 'to remember'],
      correctIndex: 0,
    },
  },

  // ── Lesson 10 ──
  {
    lessonOrderIndex: 10,
    orderIndex: 1,
    type: ActivityType.MATCH,
    payload: {
      pairs: [
        { wordOrderIndex: 46, arabic: 'سَبِيل', meaning: 'Path, Way' },
        { wordOrderIndex: 47, arabic: 'صِرَاط', meaning: 'Straight Path' },
        { wordOrderIndex: 48, arabic: 'يَوْم', meaning: 'Day' },
        { wordOrderIndex: 49, arabic: 'أَمْر', meaning: 'Command, Matter' },
        { wordOrderIndex: 50, arabic: 'مَوْت', meaning: 'Death' },
      ],
    },
  },
  {
    lessonOrderIndex: 10,
    orderIndex: 2,
    type: ActivityType.FILL_MEANING,
    payload: {
      wordOrderIndex: 47,
      arabic: 'صِرَاط',
      prompt: 'صِرَاط means ___',
      options: ['Straight Path', 'Way', 'Day', 'Death'],
      correctIndex: 0,
    },
  },
  {
    lessonOrderIndex: 10,
    orderIndex: 3,
    type: ActivityType.QUICK_FIRE,
    payload: {
      rounds: [
        { wordOrderIndex: 48, arabic: 'يَوْم', options: ['Day', 'Path'], correctIndex: 0 },
        { wordOrderIndex: 50, arabic: 'مَوْت', options: ['Command', 'Death'], correctIndex: 1 },
        { wordOrderIndex: 46, arabic: 'سَبِيل', options: ['Path', 'Day'], correctIndex: 0 },
        { wordOrderIndex: 49, arabic: 'أَمْر', options: ['Death', 'Command'], correctIndex: 1 },
        { wordOrderIndex: 47, arabic: 'صِرَاط', options: ['Straight Path', 'Way'], correctIndex: 0 },
      ],
    },
  },

  // ── Lesson 11 ──
  {
    lessonOrderIndex: 11,
    orderIndex: 1,
    type: ActivityType.MATCH,
    payload: {
      pairs: [
        { wordOrderIndex: 51, arabic: 'دُنْيَا', meaning: 'Worldly Life' },
        { wordOrderIndex: 52, arabic: 'آخِرَة', meaning: 'Hereafter' },
        { wordOrderIndex: 53, arabic: 'قِيَامَة', meaning: 'Resurrection' },
        { wordOrderIndex: 54, arabic: 'حِسَاب', meaning: 'Reckoning' },
        { wordOrderIndex: 55, arabic: 'جَزَاء', meaning: 'Recompense' },
      ],
    },
  },
  {
    lessonOrderIndex: 11,
    orderIndex: 2,
    type: ActivityType.QUICK_FIRE,
    payload: {
      rounds: [
        { wordOrderIndex: 51, arabic: 'دُنْيَا', options: ['Worldly Life', 'Hereafter'], correctIndex: 0 },
        { wordOrderIndex: 53, arabic: 'قِيَامَة', options: ['Reckoning', 'Resurrection'], correctIndex: 1 },
        { wordOrderIndex: 55, arabic: 'جَزَاء', options: ['Recompense', 'Worldly Life'], correctIndex: 0 },
        { wordOrderIndex: 52, arabic: 'آخِرَة', options: ['Resurrection', 'Hereafter'], correctIndex: 1 },
        { wordOrderIndex: 54, arabic: 'حِسَاب', options: ['Reckoning', 'Recompense'], correctIndex: 0 },
      ],
    },
  },
  {
    lessonOrderIndex: 11,
    orderIndex: 3,
    type: ActivityType.FILL_MEANING,
    payload: {
      wordOrderIndex: 53,
      arabic: 'قِيَامَة',
      prompt: 'قِيَامَة means ___',
      options: ['Resurrection', 'Hereafter', 'Reckoning', 'Death'],
      correctIndex: 0,
    },
  },

  // ── Lesson 12 ──
  {
    lessonOrderIndex: 12,
    orderIndex: 1,
    type: ActivityType.MATCH,
    payload: {
      pairs: [
        { wordOrderIndex: 56, arabic: 'قَلْب', meaning: 'Heart' },
        { wordOrderIndex: 57, arabic: 'رُوح', meaning: 'Spirit, Soul' },
        { wordOrderIndex: 58, arabic: 'بَصَر', meaning: 'Sight, Vision' },
        { wordOrderIndex: 59, arabic: 'عَقْل', meaning: 'Reason, Intellect' },
        { wordOrderIndex: 60, arabic: 'صَدْر', meaning: 'Chest, Breast' },
      ],
    },
  },
  {
    lessonOrderIndex: 12,
    orderIndex: 2,
    type: ActivityType.FILL_MEANING,
    payload: {
      wordOrderIndex: 58,
      arabic: 'بَصَر',
      prompt: 'بَصَر means ___',
      options: ['Sight', 'Heart', 'Spirit', 'Chest'],
      correctIndex: 0,
    },
  },
  {
    lessonOrderIndex: 12,
    orderIndex: 3,
    type: ActivityType.QUICK_FIRE,
    payload: {
      rounds: [
        { wordOrderIndex: 56, arabic: 'قَلْب', options: ['Heart', 'Spirit'], correctIndex: 0 },
        { wordOrderIndex: 57, arabic: 'رُوح', options: ['Chest', 'Spirit'], correctIndex: 1 },
        { wordOrderIndex: 59, arabic: 'عَقْل', options: ['Reason', 'Sight'], correctIndex: 0 },
        { wordOrderIndex: 60, arabic: 'صَدْر', options: ['Heart', 'Chest'], correctIndex: 1 },
        { wordOrderIndex: 58, arabic: 'بَصَر', options: ['Sight', 'Reason'], correctIndex: 0 },
      ],
    },
  },

  // ── Lesson 13 ──
  {
    lessonOrderIndex: 13,
    orderIndex: 1,
    type: ActivityType.MATCH,
    payload: {
      pairs: [
        { wordOrderIndex: 61, arabic: 'جَاءَ', meaning: 'to come' },
        { wordOrderIndex: 62, arabic: 'دَخَلَ', meaning: 'to enter' },
        { wordOrderIndex: 63, arabic: 'خَرَجَ', meaning: 'to go out' },
        { wordOrderIndex: 64, arabic: 'رَجَعَ', meaning: 'to return' },
        { wordOrderIndex: 65, arabic: 'اتَّبَعَ', meaning: 'to follow' },
      ],
    },
  },
  {
    lessonOrderIndex: 13,
    orderIndex: 2,
    type: ActivityType.QUICK_FIRE,
    payload: {
      rounds: [
        { wordOrderIndex: 61, arabic: 'جَاءَ', options: ['to come', 'to enter'], correctIndex: 0 },
        { wordOrderIndex: 63, arabic: 'خَرَجَ', options: ['to return', 'to go out'], correctIndex: 1 },
        { wordOrderIndex: 65, arabic: 'اتَّبَعَ', options: ['to follow', 'to come'], correctIndex: 0 },
        { wordOrderIndex: 62, arabic: 'دَخَلَ', options: ['to go out', 'to enter'], correctIndex: 1 },
        { wordOrderIndex: 64, arabic: 'رَجَعَ', options: ['to return', 'to follow'], correctIndex: 0 },
      ],
    },
  },
  {
    lessonOrderIndex: 13,
    orderIndex: 3,
    type: ActivityType.FILL_MEANING,
    payload: {
      wordOrderIndex: 65,
      arabic: 'اتَّبَعَ',
      prompt: 'اتَّبَعَ means ___',
      options: ['to follow', 'to come', 'to go out', 'to enter'],
      correctIndex: 0,
    },
  },

  // ── Lesson 14 ──
  {
    lessonOrderIndex: 14,
    orderIndex: 1,
    type: ActivityType.MATCH,
    payload: {
      pairs: [
        { wordOrderIndex: 66, arabic: 'خَيْر', meaning: 'Good' },
        { wordOrderIndex: 67, arabic: 'شَرّ', meaning: 'Evil' },
        { wordOrderIndex: 68, arabic: 'صَالِح', meaning: 'Righteous' },
        { wordOrderIndex: 69, arabic: 'عَظِيم', meaning: 'Great, Mighty' },
        { wordOrderIndex: 70, arabic: 'كَبِير', meaning: 'Great, Big' },
      ],
    },
  },
  {
    lessonOrderIndex: 14,
    orderIndex: 2,
    type: ActivityType.FILL_MEANING,
    payload: {
      wordOrderIndex: 69,
      arabic: 'عَظِيم',
      prompt: 'عَظِيم means ___',
      options: ['Great, Mighty', 'Good', 'Evil', 'Righteous'],
      correctIndex: 0,
    },
  },
  {
    lessonOrderIndex: 14,
    orderIndex: 3,
    type: ActivityType.QUICK_FIRE,
    payload: {
      rounds: [
        { wordOrderIndex: 66, arabic: 'خَيْر', options: ['Good', 'Evil'], correctIndex: 0 },
        { wordOrderIndex: 67, arabic: 'شَرّ', options: ['Righteous', 'Evil'], correctIndex: 1 },
        { wordOrderIndex: 68, arabic: 'صَالِح', options: ['Righteous', 'Great'], correctIndex: 0 },
        { wordOrderIndex: 70, arabic: 'كَبِير', options: ['Good', 'Big'], correctIndex: 1 },
        { wordOrderIndex: 69, arabic: 'عَظِيم', options: ['Mighty', 'Evil'], correctIndex: 0 },
      ],
    },
  },

  // ── Lesson 15 ──
  {
    lessonOrderIndex: 15,
    orderIndex: 1,
    type: ActivityType.MATCH,
    payload: {
      pairs: [
        { wordOrderIndex: 71, arabic: 'لَيْل', meaning: 'Night' },
        { wordOrderIndex: 72, arabic: 'نَهَار', meaning: 'Daytime' },
        { wordOrderIndex: 73, arabic: 'شَمْس', meaning: 'Sun' },
        { wordOrderIndex: 74, arabic: 'قَمَر', meaning: 'Moon' },
        { wordOrderIndex: 75, arabic: 'مَاء', meaning: 'Water' },
      ],
    },
  },
  {
    lessonOrderIndex: 15,
    orderIndex: 2,
    type: ActivityType.QUICK_FIRE,
    payload: {
      rounds: [
        { wordOrderIndex: 71, arabic: 'لَيْل', options: ['Night', 'Daytime'], correctIndex: 0 },
        { wordOrderIndex: 73, arabic: 'شَمْس', options: ['Moon', 'Sun'], correctIndex: 1 },
        { wordOrderIndex: 75, arabic: 'مَاء', options: ['Water', 'Night'], correctIndex: 0 },
        { wordOrderIndex: 72, arabic: 'نَهَار', options: ['Sun', 'Daytime'], correctIndex: 1 },
        { wordOrderIndex: 74, arabic: 'قَمَر', options: ['Moon', 'Water'], correctIndex: 0 },
      ],
    },
  },
  {
    lessonOrderIndex: 15,
    orderIndex: 3,
    type: ActivityType.FILL_MEANING,
    payload: {
      wordOrderIndex: 73,
      arabic: 'شَمْس',
      prompt: 'شَمْس means ___',
      options: ['Sun', 'Moon', 'Night', 'Water'],
      correctIndex: 0,
    },
  },

  // ── Lesson 16 ──
  {
    lessonOrderIndex: 16,
    orderIndex: 1,
    type: ActivityType.MATCH,
    payload: {
      pairs: [
        { wordOrderIndex: 76, arabic: 'رَأَى', meaning: 'to see' },
        { wordOrderIndex: 77, arabic: 'أَنْزَلَ', meaning: 'to send down' },
        { wordOrderIndex: 78, arabic: 'أَرْسَلَ', meaning: 'to send' },
        { wordOrderIndex: 79, arabic: 'أَخَذَ', meaning: 'to take' },
        { wordOrderIndex: 80, arabic: 'جَعَلَ', meaning: 'to make, set' },
      ],
    },
  },
  {
    lessonOrderIndex: 16,
    orderIndex: 2,
    type: ActivityType.FILL_MEANING,
    payload: {
      wordOrderIndex: 80,
      arabic: 'جَعَلَ',
      prompt: 'جَعَلَ means ___',
      options: ['to make', 'to see', 'to send', 'to take'],
      correctIndex: 0,
    },
  },
  {
    lessonOrderIndex: 16,
    orderIndex: 3,
    type: ActivityType.QUICK_FIRE,
    payload: {
      rounds: [
        { wordOrderIndex: 76, arabic: 'رَأَى', options: ['to see', 'to send'], correctIndex: 0 },
        { wordOrderIndex: 77, arabic: 'أَنْزَلَ', options: ['to take', 'to send down'], correctIndex: 1 },
        { wordOrderIndex: 78, arabic: 'أَرْسَلَ', options: ['to send', 'to make'], correctIndex: 0 },
        { wordOrderIndex: 79, arabic: 'أَخَذَ', options: ['to see', 'to take'], correctIndex: 1 },
        { wordOrderIndex: 80, arabic: 'جَعَلَ', options: ['to make', 'to send down'], correctIndex: 0 },
      ],
    },
  },

  // ── Lesson 17 ──
  {
    lessonOrderIndex: 17,
    orderIndex: 1,
    type: ActivityType.MATCH,
    payload: {
      pairs: [
        { wordOrderIndex: 81, arabic: 'دِين', meaning: 'Religion' },
        { wordOrderIndex: 82, arabic: 'كَافِر', meaning: 'Disbeliever' },
        { wordOrderIndex: 83, arabic: 'مُسْلِم', meaning: 'One who submits' },
        { wordOrderIndex: 84, arabic: 'مُنَافِق', meaning: 'Hypocrite' },
        { wordOrderIndex: 85, arabic: 'اتَّقَى', meaning: 'to be God-conscious' },
      ],
    },
  },
  {
    lessonOrderIndex: 17,
    orderIndex: 2,
    type: ActivityType.QUICK_FIRE,
    payload: {
      rounds: [
        { wordOrderIndex: 81, arabic: 'دِين', options: ['Religion', 'Hypocrite'], correctIndex: 0 },
        { wordOrderIndex: 82, arabic: 'كَافِر', options: ['One who submits', 'Disbeliever'], correctIndex: 1 },
        { wordOrderIndex: 84, arabic: 'مُنَافِق', options: ['Hypocrite', 'Religion'], correctIndex: 0 },
        { wordOrderIndex: 85, arabic: 'اتَّقَى', options: ['Disbeliever', 'God-conscious'], correctIndex: 1 },
        { wordOrderIndex: 83, arabic: 'مُسْلِم', options: ['One who submits', 'Hypocrite'], correctIndex: 0 },
      ],
    },
  },
  {
    lessonOrderIndex: 17,
    orderIndex: 3,
    type: ActivityType.FILL_MEANING,
    payload: {
      wordOrderIndex: 84,
      arabic: 'مُنَافِق',
      prompt: 'مُنَافِق means ___',
      options: ['Hypocrite', 'Disbeliever', 'Religion', 'One who submits'],
      correctIndex: 0,
    },
  },

  // ── Lesson 18 ──
  {
    lessonOrderIndex: 18,
    orderIndex: 1,
    type: ActivityType.MATCH,
    payload: {
      pairs: [
        { wordOrderIndex: 86, arabic: 'آتَى', meaning: 'to give' },
        { wordOrderIndex: 87, arabic: 'أَنْفَقَ', meaning: 'to spend in charity' },
        { wordOrderIndex: 88, arabic: 'فَضْل', meaning: 'Grace, Bounty' },
        { wordOrderIndex: 89, arabic: 'رَزَقَ', meaning: 'to provide' },
        { wordOrderIndex: 90, arabic: 'زَكَاة', meaning: 'Purifying Charity' },
      ],
    },
  },
  {
    lessonOrderIndex: 18,
    orderIndex: 2,
    type: ActivityType.FILL_MEANING,
    payload: {
      wordOrderIndex: 88,
      arabic: 'فَضْل',
      prompt: 'فَضْل means ___',
      options: ['Grace, Bounty', 'to give', 'Charity', 'to provide'],
      correctIndex: 0,
    },
  },
  {
    lessonOrderIndex: 18,
    orderIndex: 3,
    type: ActivityType.QUICK_FIRE,
    payload: {
      rounds: [
        { wordOrderIndex: 86, arabic: 'آتَى', options: ['to give', 'to spend'], correctIndex: 0 },
        { wordOrderIndex: 87, arabic: 'أَنْفَقَ', options: ['to provide', 'to spend'], correctIndex: 1 },
        { wordOrderIndex: 89, arabic: 'رَزَقَ', options: ['to provide', 'to give'], correctIndex: 0 },
        { wordOrderIndex: 90, arabic: 'زَكَاة', options: ['Grace', 'Charity'], correctIndex: 1 },
        { wordOrderIndex: 88, arabic: 'فَضْل', options: ['Bounty', 'to spend'], correctIndex: 0 },
      ],
    },
  },

  // ── Lesson 19 ──
  {
    lessonOrderIndex: 19,
    orderIndex: 1,
    type: ActivityType.MATCH,
    payload: {
      pairs: [
        { wordOrderIndex: 91, arabic: 'مَلِك', meaning: 'King' },
        { wordOrderIndex: 92, arabic: 'مُلْك', meaning: 'Dominion' },
        { wordOrderIndex: 93, arabic: 'قُوَّة', meaning: 'Power, Strength' },
        { wordOrderIndex: 94, arabic: 'سُلْطَان', meaning: 'Authority' },
        { wordOrderIndex: 95, arabic: 'عَرْش', meaning: 'Throne' },
      ],
    },
  },
  {
    lessonOrderIndex: 19,
    orderIndex: 2,
    type: ActivityType.QUICK_FIRE,
    payload: {
      rounds: [
        { wordOrderIndex: 91, arabic: 'مَلِك', options: ['King', 'Dominion'], correctIndex: 0 },
        { wordOrderIndex: 93, arabic: 'قُوَّة', options: ['Authority', 'Power'], correctIndex: 1 },
        { wordOrderIndex: 95, arabic: 'عَرْش', options: ['Throne', 'King'], correctIndex: 0 },
        { wordOrderIndex: 92, arabic: 'مُلْك', options: ['Power', 'Dominion'], correctIndex: 1 },
        { wordOrderIndex: 94, arabic: 'سُلْطَان', options: ['Authority', 'Throne'], correctIndex: 0 },
      ],
    },
  },
  {
    lessonOrderIndex: 19,
    orderIndex: 3,
    type: ActivityType.FILL_MEANING,
    payload: {
      wordOrderIndex: 93,
      arabic: 'قُوَّة',
      prompt: 'قُوَّة means ___',
      options: ['Power, Strength', 'King', 'Throne', 'Dominion'],
      correctIndex: 0,
    },
  },

  // ── Lesson 20 ──
  {
    lessonOrderIndex: 20,
    orderIndex: 1,
    type: ActivityType.MATCH,
    payload: {
      pairs: [
        { wordOrderIndex: 96, arabic: 'شَاءَ', meaning: 'to will' },
        { wordOrderIndex: 97, arabic: 'أَرَادَ', meaning: 'to want' },
        { wordOrderIndex: 98, arabic: 'أَحَبَّ', meaning: 'to love' },
        { wordOrderIndex: 99, arabic: 'خَافَ', meaning: 'to fear' },
        { wordOrderIndex: 100, arabic: 'رَضِيَ', meaning: 'to be pleased' },
      ],
    },
  },
  {
    lessonOrderIndex: 20,
    orderIndex: 2,
    type: ActivityType.FILL_MEANING,
    payload: {
      wordOrderIndex: 98,
      arabic: 'أَحَبَّ',
      prompt: 'أَحَبَّ means ___',
      options: ['to love', 'to will', 'to fear', 'to want'],
      correctIndex: 0,
    },
  },
  {
    lessonOrderIndex: 20,
    orderIndex: 3,
    type: ActivityType.QUICK_FIRE,
    payload: {
      rounds: [
        { wordOrderIndex: 96, arabic: 'شَاءَ', options: ['to will', 'to want'], correctIndex: 0 },
        { wordOrderIndex: 97, arabic: 'أَرَادَ', options: ['to fear', 'to want'], correctIndex: 1 },
        { wordOrderIndex: 99, arabic: 'خَافَ', options: ['to fear', 'to love'], correctIndex: 0 },
        { wordOrderIndex: 100, arabic: 'رَضِيَ', options: ['to will', 'to be pleased'], correctIndex: 1 },
        { wordOrderIndex: 98, arabic: 'أَحَبَّ', options: ['to love', 'to be pleased'], correctIndex: 0 },
      ],
    },
  },

  // ── Lesson 21 ──
  {
    lessonOrderIndex: 21,
    orderIndex: 1,
    type: ActivityType.MATCH,
    payload: {
      pairs: [
        { wordOrderIndex: 101, arabic: 'مِن', meaning: 'from, of' },
        { wordOrderIndex: 102, arabic: 'فِي', meaning: 'in, within' },
        { wordOrderIndex: 103, arabic: 'عَلَى', meaning: 'upon, on' },
        { wordOrderIndex: 104, arabic: 'إِلَى', meaning: 'to, toward' },
        { wordOrderIndex: 105, arabic: 'عَن', meaning: 'from, about' },
      ],
    },
  },
  {
    lessonOrderIndex: 21,
    orderIndex: 2,
    type: ActivityType.QUICK_FIRE,
    payload: {
      rounds: [
        { wordOrderIndex: 101, arabic: 'مِن', options: ['from', 'in'], correctIndex: 0 },
        { wordOrderIndex: 103, arabic: 'عَلَى', options: ['toward', 'upon'], correctIndex: 1 },
        { wordOrderIndex: 105, arabic: 'عَن', options: ['about', 'from/of'], correctIndex: 0 },
        { wordOrderIndex: 102, arabic: 'فِي', options: ['upon', 'in'], correctIndex: 1 },
        { wordOrderIndex: 104, arabic: 'إِلَى', options: ['toward', 'about'], correctIndex: 0 },
      ],
    },
  },
  {
    lessonOrderIndex: 21,
    orderIndex: 3,
    type: ActivityType.FILL_MEANING,
    payload: {
      wordOrderIndex: 103,
      arabic: 'عَلَى',
      prompt: 'عَلَى means ___',
      options: ['upon, on', 'from, of', 'in, within', 'to, toward'],
      correctIndex: 0,
    },
  },

  // ── Lesson 22 ──
  {
    lessonOrderIndex: 22,
    orderIndex: 1,
    type: ActivityType.MATCH,
    payload: {
      pairs: [
        { wordOrderIndex: 106, arabic: 'إِنَّ', meaning: 'Indeed' },
        { wordOrderIndex: 107, arabic: 'لَا', meaning: 'No, Not' },
        { wordOrderIndex: 108, arabic: 'كُلّ', meaning: 'Every, All' },
        { wordOrderIndex: 109, arabic: 'إِلَّا', meaning: 'Except' },
        { wordOrderIndex: 110, arabic: 'قَدْ', meaning: 'Certainly' },
      ],
    },
  },
  {
    lessonOrderIndex: 22,
    orderIndex: 2,
    type: ActivityType.FILL_MEANING,
    payload: {
      wordOrderIndex: 109,
      arabic: 'إِلَّا',
      prompt: 'إِلَّا means ___',
      options: ['Except', 'Indeed', 'Not', 'Every'],
      correctIndex: 0,
    },
  },
  {
    lessonOrderIndex: 22,
    orderIndex: 3,
    type: ActivityType.QUICK_FIRE,
    payload: {
      rounds: [
        { wordOrderIndex: 106, arabic: 'إِنَّ', options: ['Indeed', 'Not'], correctIndex: 0 },
        { wordOrderIndex: 107, arabic: 'لَا', options: ['Every', 'Not'], correctIndex: 1 },
        { wordOrderIndex: 108, arabic: 'كُلّ', options: ['Every', 'Except'], correctIndex: 0 },
        { wordOrderIndex: 110, arabic: 'قَدْ', options: ['Indeed', 'Certainly'], correctIndex: 1 },
        { wordOrderIndex: 109, arabic: 'إِلَّا', options: ['Except', 'All'], correctIndex: 0 },
      ],
    },
  },

  // ── Lesson 23 ──
  {
    lessonOrderIndex: 23,
    orderIndex: 1,
    type: ActivityType.MATCH,
    payload: {
      pairs: [
        { wordOrderIndex: 111, arabic: 'الَّذِي', meaning: 'who, which' },
        { wordOrderIndex: 112, arabic: 'هَذَا', meaning: 'this' },
        { wordOrderIndex: 113, arabic: 'ذَلِكَ', meaning: 'that' },
        { wordOrderIndex: 114, arabic: 'مَنْ', meaning: 'who, whoever' },
        { wordOrderIndex: 115, arabic: 'مَا', meaning: 'what, that which' },
      ],
    },
  },
  {
    lessonOrderIndex: 23,
    orderIndex: 2,
    type: ActivityType.QUICK_FIRE,
    payload: {
      rounds: [
        { wordOrderIndex: 111, arabic: 'الَّذِي', options: ['who/which', 'this'], correctIndex: 0 },
        { wordOrderIndex: 113, arabic: 'ذَلِكَ', options: ['who', 'that'], correctIndex: 1 },
        { wordOrderIndex: 115, arabic: 'مَا', options: ['what', 'this'], correctIndex: 0 },
        { wordOrderIndex: 112, arabic: 'هَذَا', options: ['that', 'this'], correctIndex: 1 },
        { wordOrderIndex: 114, arabic: 'مَنْ', options: ['whoever', 'what'], correctIndex: 0 },
      ],
    },
  },
  {
    lessonOrderIndex: 23,
    orderIndex: 3,
    type: ActivityType.FILL_MEANING,
    payload: {
      wordOrderIndex: 113,
      arabic: 'ذَلِكَ',
      prompt: 'ذَلِكَ means ___',
      options: ['that', 'this', 'who', 'what'],
      correctIndex: 0,
    },
  },

  // ── Lesson 24 ──
  {
    lessonOrderIndex: 24,
    orderIndex: 1,
    type: ActivityType.MATCH,
    payload: {
      pairs: [
        { wordOrderIndex: 116, arabic: 'لَمْ', meaning: 'did not' },
        { wordOrderIndex: 117, arabic: 'لَنْ', meaning: 'will never' },
        { wordOrderIndex: 118, arabic: 'بَلْ', meaning: 'rather, but' },
        { wordOrderIndex: 119, arabic: 'هَلْ', meaning: 'is? did?' },
        { wordOrderIndex: 120, arabic: 'لَوْ', meaning: 'if (hypothetical)' },
      ],
    },
  },
  {
    lessonOrderIndex: 24,
    orderIndex: 2,
    type: ActivityType.FILL_MEANING,
    payload: {
      wordOrderIndex: 119,
      arabic: 'هَلْ',
      prompt: 'هَلْ means ___',
      options: ['is? did?', 'did not', 'will never', 'rather'],
      correctIndex: 0,
    },
  },
  {
    lessonOrderIndex: 24,
    orderIndex: 3,
    type: ActivityType.QUICK_FIRE,
    payload: {
      rounds: [
        { wordOrderIndex: 116, arabic: 'لَمْ', options: ['did not', 'will never'], correctIndex: 0 },
        { wordOrderIndex: 117, arabic: 'لَنْ', options: ['rather', 'will never'], correctIndex: 1 },
        { wordOrderIndex: 118, arabic: 'بَلْ', options: ['rather', 'did not'], correctIndex: 0 },
        { wordOrderIndex: 120, arabic: 'لَوْ', options: ['is?', 'if'], correctIndex: 1 },
        { wordOrderIndex: 119, arabic: 'هَلْ', options: ['is?/did?', 'will never'], correctIndex: 0 },
      ],
    },
  },

  // ── Lesson 25 ──
  {
    lessonOrderIndex: 25,
    orderIndex: 1,
    type: ActivityType.MATCH,
    payload: {
      pairs: [
        { wordOrderIndex: 121, arabic: 'شَيْء', meaning: 'Thing' },
        { wordOrderIndex: 122, arabic: 'مَكَان', meaning: 'Place' },
        { wordOrderIndex: 123, arabic: 'بَيْت', meaning: 'House' },
        { wordOrderIndex: 124, arabic: 'مَسْجِد', meaning: 'Mosque' },
        { wordOrderIndex: 125, arabic: 'دَار', meaning: 'Abode, Dwelling' },
      ],
    },
  },
  {
    lessonOrderIndex: 25,
    orderIndex: 2,
    type: ActivityType.QUICK_FIRE,
    payload: {
      rounds: [
        { wordOrderIndex: 121, arabic: 'شَيْء', options: ['Thing', 'Place'], correctIndex: 0 },
        { wordOrderIndex: 123, arabic: 'بَيْت', options: ['Mosque', 'House'], correctIndex: 1 },
        { wordOrderIndex: 125, arabic: 'دَار', options: ['Abode', 'Thing'], correctIndex: 0 },
        { wordOrderIndex: 122, arabic: 'مَكَان', options: ['House', 'Place'], correctIndex: 1 },
        { wordOrderIndex: 124, arabic: 'مَسْجِد', options: ['Mosque', 'Abode'], correctIndex: 0 },
      ],
    },
  },
  {
    lessonOrderIndex: 25,
    orderIndex: 3,
    type: ActivityType.FILL_MEANING,
    payload: {
      wordOrderIndex: 124,
      arabic: 'مَسْجِد',
      prompt: 'مَسْجِد means ___',
      options: ['Mosque', 'House', 'Place', 'Abode'],
      correctIndex: 0,
    },
  },

  // ── Lesson 26 ──
  {
    lessonOrderIndex: 26,
    orderIndex: 1,
    type: ActivityType.MATCH,
    payload: {
      pairs: [
        { wordOrderIndex: 126, arabic: 'كَلِمَة', meaning: 'Word' },
        { wordOrderIndex: 127, arabic: 'قَوْل', meaning: 'Saying' },
        { wordOrderIndex: 128, arabic: 'حَدِيث', meaning: 'Speech, Narration' },
        { wordOrderIndex: 129, arabic: 'ذِكْر', meaning: 'Remembrance' },
        { wordOrderIndex: 130, arabic: 'اسْم', meaning: 'Name' },
      ],
    },
  },
  {
    lessonOrderIndex: 26,
    orderIndex: 2,
    type: ActivityType.FILL_MEANING,
    payload: {
      wordOrderIndex: 129,
      arabic: 'ذِكْر',
      prompt: 'ذِكْر means ___',
      options: ['Remembrance', 'Word', 'Saying', 'Name'],
      correctIndex: 0,
    },
  },
  {
    lessonOrderIndex: 26,
    orderIndex: 3,
    type: ActivityType.QUICK_FIRE,
    payload: {
      rounds: [
        { wordOrderIndex: 126, arabic: 'كَلِمَة', options: ['Word', 'Saying'], correctIndex: 0 },
        { wordOrderIndex: 127, arabic: 'قَوْل', options: ['Remembrance', 'Saying'], correctIndex: 1 },
        { wordOrderIndex: 128, arabic: 'حَدِيث', options: ['Speech', 'Name'], correctIndex: 0 },
        { wordOrderIndex: 130, arabic: 'اسْم', options: ['Word', 'Name'], correctIndex: 1 },
        { wordOrderIndex: 129, arabic: 'ذِكْر', options: ['Remembrance', 'Speech'], correctIndex: 0 },
      ],
    },
  },

  // ── Lesson 27 ──
  {
    lessonOrderIndex: 27,
    orderIndex: 1,
    type: ActivityType.MATCH,
    payload: {
      pairs: [
        { wordOrderIndex: 131, arabic: 'أَطَاعَ', meaning: 'to obey' },
        { wordOrderIndex: 132, arabic: 'عَصَى', meaning: 'to disobey' },
        { wordOrderIndex: 133, arabic: 'كَذَّبَ', meaning: 'to deny' },
        { wordOrderIndex: 134, arabic: 'تَابَ', meaning: 'to repent' },
        { wordOrderIndex: 135, arabic: 'نَجَّى', meaning: 'to save' },
      ],
    },
  },
  {
    lessonOrderIndex: 27,
    orderIndex: 2,
    type: ActivityType.QUICK_FIRE,
    payload: {
      rounds: [
        { wordOrderIndex: 131, arabic: 'أَطَاعَ', options: ['to obey', 'to disobey'], correctIndex: 0 },
        { wordOrderIndex: 133, arabic: 'كَذَّبَ', options: ['to repent', 'to deny'], correctIndex: 1 },
        { wordOrderIndex: 135, arabic: 'نَجَّى', options: ['to save', 'to obey'], correctIndex: 0 },
        { wordOrderIndex: 132, arabic: 'عَصَى', options: ['to deny', 'to disobey'], correctIndex: 1 },
        { wordOrderIndex: 134, arabic: 'تَابَ', options: ['to repent', 'to save'], correctIndex: 0 },
      ],
    },
  },
  {
    lessonOrderIndex: 27,
    orderIndex: 3,
    type: ActivityType.FILL_MEANING,
    payload: {
      wordOrderIndex: 134,
      arabic: 'تَابَ',
      prompt: 'تَابَ means ___',
      options: ['to repent', 'to obey', 'to deny', 'to save'],
      correctIndex: 0,
    },
  },

  // ── Lesson 28 ──
  {
    lessonOrderIndex: 28,
    orderIndex: 1,
    type: ActivityType.MATCH,
    payload: {
      pairs: [
        { wordOrderIndex: 136, arabic: 'وَعَدَ', meaning: 'to promise' },
        { wordOrderIndex: 137, arabic: 'وَعْد', meaning: 'Promise' },
        { wordOrderIndex: 138, arabic: 'أَنْذَرَ', meaning: 'to warn' },
        { wordOrderIndex: 139, arabic: 'بَشَّرَ', meaning: 'to give glad tidings' },
        { wordOrderIndex: 140, arabic: 'سَوْفَ', meaning: 'shall, will' },
      ],
    },
  },
  {
    lessonOrderIndex: 28,
    orderIndex: 2,
    type: ActivityType.FILL_MEANING,
    payload: {
      wordOrderIndex: 139,
      arabic: 'بَشَّرَ',
      prompt: 'بَشَّرَ means ___',
      options: ['to give glad tidings', 'to promise', 'to warn', 'shall'],
      correctIndex: 0,
    },
  },
  {
    lessonOrderIndex: 28,
    orderIndex: 3,
    type: ActivityType.QUICK_FIRE,
    payload: {
      rounds: [
        { wordOrderIndex: 136, arabic: 'وَعَدَ', options: ['to promise', 'to warn'], correctIndex: 0 },
        { wordOrderIndex: 137, arabic: 'وَعْد', options: ['shall', 'Promise'], correctIndex: 1 },
        { wordOrderIndex: 138, arabic: 'أَنْذَرَ', options: ['to warn', 'to promise'], correctIndex: 0 },
        { wordOrderIndex: 140, arabic: 'سَوْفَ', options: ['glad tidings', 'shall'], correctIndex: 1 },
        { wordOrderIndex: 139, arabic: 'بَشَّرَ', options: ['glad tidings', 'Promise'], correctIndex: 0 },
      ],
    },
  },

  // ── Lesson 29 ──
  {
    lessonOrderIndex: 29,
    orderIndex: 1,
    type: ActivityType.MATCH,
    payload: {
      pairs: [
        { wordOrderIndex: 141, arabic: 'عَلِيم', meaning: 'All-Knowing' },
        { wordOrderIndex: 142, arabic: 'رَحِيم', meaning: 'Most Merciful' },
        { wordOrderIndex: 143, arabic: 'غَفُور', meaning: 'Most Forgiving' },
        { wordOrderIndex: 144, arabic: 'سَمِيع', meaning: 'All-Hearing' },
        { wordOrderIndex: 145, arabic: 'حَكِيم', meaning: 'All-Wise' },
      ],
    },
  },
  {
    lessonOrderIndex: 29,
    orderIndex: 2,
    type: ActivityType.QUICK_FIRE,
    payload: {
      rounds: [
        { wordOrderIndex: 141, arabic: 'عَلِيم', options: ['All-Knowing', 'All-Wise'], correctIndex: 0 },
        { wordOrderIndex: 142, arabic: 'رَحِيم', options: ['Most Forgiving', 'Most Merciful'], correctIndex: 1 },
        { wordOrderIndex: 144, arabic: 'سَمِيع', options: ['All-Hearing', 'All-Knowing'], correctIndex: 0 },
        { wordOrderIndex: 143, arabic: 'غَفُور', options: ['Most Merciful', 'Most Forgiving'], correctIndex: 1 },
        { wordOrderIndex: 145, arabic: 'حَكِيم', options: ['All-Wise', 'All-Hearing'], correctIndex: 0 },
      ],
    },
  },
  {
    lessonOrderIndex: 29,
    orderIndex: 3,
    type: ActivityType.FILL_MEANING,
    payload: {
      wordOrderIndex: 143,
      arabic: 'غَفُور',
      prompt: 'غَفُور means ___',
      options: ['Most Forgiving', 'All-Knowing', 'Most Merciful', 'All-Hearing'],
      correctIndex: 0,
    },
  },

  // ── Lesson 30 ──
  {
    lessonOrderIndex: 30,
    orderIndex: 1,
    type: ActivityType.MATCH,
    payload: {
      pairs: [
        { wordOrderIndex: 146, arabic: 'عَهْد', meaning: 'Covenant' },
        { wordOrderIndex: 147, arabic: 'شَهِيد', meaning: 'Witness, Martyr' },
        { wordOrderIndex: 148, arabic: 'حُكْم', meaning: 'Judgment' },
        { wordOrderIndex: 149, arabic: 'مَثَل', meaning: 'Parable' },
        { wordOrderIndex: 150, arabic: 'أَهْل', meaning: 'Family, People of' },
      ],
    },
  },
  {
    lessonOrderIndex: 30,
    orderIndex: 2,
    type: ActivityType.FILL_MEANING,
    payload: {
      wordOrderIndex: 147,
      arabic: 'شَهِيد',
      prompt: 'شَهِيد means ___',
      options: ['Witness, Martyr', 'Covenant', 'Judgment', 'Family'],
      correctIndex: 0,
    },
  },
  {
    lessonOrderIndex: 30,
    orderIndex: 3,
    type: ActivityType.QUICK_FIRE,
    payload: {
      rounds: [
        { wordOrderIndex: 146, arabic: 'عَهْد', options: ['Covenant', 'Judgment'], correctIndex: 0 },
        { wordOrderIndex: 148, arabic: 'حُكْم', options: ['Parable', 'Judgment'], correctIndex: 1 },
        { wordOrderIndex: 150, arabic: 'أَهْل', options: ['Family', 'Covenant'], correctIndex: 0 },
        { wordOrderIndex: 149, arabic: 'مَثَل', options: ['Witness', 'Parable'], correctIndex: 1 },
        { wordOrderIndex: 147, arabic: 'شَهِيد', options: ['Witness', 'Family'], correctIndex: 0 },
      ],
    },
  },
];
