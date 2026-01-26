import { ActivityType, Prisma } from '@prisma/client';

export interface ActivitySeedData {
  lessonOrderIndex: number;
  orderIndex: number;
  type: ActivityType;
  payload: Prisma.InputJsonValue;
}

// Activities reference words by orderIndex — the seed script will resolve to actual word IDs
export const ACTIVITIES: ActivitySeedData[] = [
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
];
