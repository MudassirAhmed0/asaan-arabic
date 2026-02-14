import { ActivityType, Prisma } from '@prisma/client';

export interface ActivitySeedData {
  lessonOrderIndex: number;
  orderIndex: number;
  type: ActivityType;
  payload: Prisma.InputJsonValue;
}

// Activities reference words by orderIndex — the seed script will resolve to actual word IDs
// Pattern rotation (6 combos, repeating every 6 lessons):
//   L1,L7,L13,L19,L25:  MATCH + SPOT_IN_QURAN
//   L2,L8,L14,L20,L26:  QUICK_FIRE + FILL_MEANING
//   L3,L9,L15,L21,L27:  MATCH + QUICK_FIRE
//   L4,L10,L16,L22,L28: FILL_MEANING + SPOT_IN_QURAN
//   L5,L11,L17,L23,L29: MATCH + FILL_MEANING
//   L6,L12,L18,L24,L30: QUICK_FIRE + SPOT_IN_QURAN
export const ACTIVITIES_L1_L30: ActivitySeedData[] = [
  // ── Lesson 1: MATCH + SPOT_IN_QURAN ──
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
    type: ActivityType.SPOT_IN_QURAN,
    payload: { wordOrderIndex: 2 },
  },

  // ── Lesson 2: QUICK_FIRE + FILL_MEANING ──
  {
    lessonOrderIndex: 2,
    orderIndex: 1,
    type: ActivityType.QUICK_FIRE,
    payload: {
      rounds: [
        { wordOrderIndex: 8, arabic: 'آيَة', options: ['Sign/Verse', 'Book'], correctIndex: 0 },
        { wordOrderIndex: 9, arabic: 'رَسُول', options: ['Truth', 'Messenger'], correctIndex: 1 },
        { wordOrderIndex: 6, arabic: 'اللَّه', options: ['God', 'Book'], correctIndex: 0 },
        { wordOrderIndex: 10, arabic: 'حَقّ', options: ['Messenger', 'Truth'], correctIndex: 1 },
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

  // ── Lesson 3: MATCH + QUICK_FIRE ──
  {
    lessonOrderIndex: 3,
    orderIndex: 1,
    type: ActivityType.MATCH,
    payload: {
      pairs: [
        { wordOrderIndex: 11, arabic: 'أَرْض', meaning: 'Earth' },
        { wordOrderIndex: 12, arabic: 'سَمَاء', meaning: 'Sky, Heaven' },
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
        { wordOrderIndex: 13, arabic: 'نَفْس', options: ['Soul', 'Light'], correctIndex: 0 },
        { wordOrderIndex: 15, arabic: 'حَيَاة', options: ['Earth', 'Life'], correctIndex: 1 },
        { wordOrderIndex: 12, arabic: 'سَمَاء', options: ['Sky', 'Soul'], correctIndex: 0 },
      ],
    },
  },

  // ── Lesson 4: FILL_MEANING + SPOT_IN_QURAN ──
  {
    lessonOrderIndex: 4,
    orderIndex: 1,
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
    orderIndex: 2,
    type: ActivityType.SPOT_IN_QURAN,
    payload: { wordOrderIndex: 17 },
  },

  // ── Lesson 5: MATCH + FILL_MEANING ──
  {
    lessonOrderIndex: 5,
    orderIndex: 1,
    type: ActivityType.MATCH,
    payload: {
      pairs: [
        { wordOrderIndex: 21, arabic: 'جَنَّة', meaning: 'Paradise' },
        { wordOrderIndex: 22, arabic: 'نَار', meaning: 'Fire, Hell' },
        { wordOrderIndex: 23, arabic: 'أَجْر', meaning: 'Reward' },
        { wordOrderIndex: 24, arabic: 'عَذَاب', meaning: 'Punishment' },
        { wordOrderIndex: 25, arabic: 'مَغْفِرَة', meaning: 'Forgiveness' },
      ],
    },
  },
  {
    lessonOrderIndex: 5,
    orderIndex: 2,
    type: ActivityType.FILL_MEANING,
    payload: {
      wordOrderIndex: 25,
      arabic: 'مَغْفِرَة',
      prompt: 'مَغْفِرَة means ___',
      options: ['Forgiveness', 'Paradise', 'Punishment', 'Reward'],
      correctIndex: 0,
    },
  },

  // ── Lesson 6: QUICK_FIRE + SPOT_IN_QURAN ──
  {
    lessonOrderIndex: 6,
    orderIndex: 1,
    type: ActivityType.QUICK_FIRE,
    payload: {
      rounds: [
        { wordOrderIndex: 26, arabic: 'آمَنَ', options: ['to believe', 'to worship'], correctIndex: 0 },
        { wordOrderIndex: 27, arabic: 'إيمَان', options: ['Disbelief', 'Faith'], correctIndex: 1 },
        { wordOrderIndex: 28, arabic: 'مُؤْمِن', options: ['Believer', 'to cover'], correctIndex: 0 },
        { wordOrderIndex: 30, arabic: 'عَبَدَ', options: ['to believe', 'to worship'], correctIndex: 1 },
        { wordOrderIndex: 29, arabic: 'كَفَرَ', options: ['to disbelieve', 'Faith'], correctIndex: 0 },
      ],
    },
  },
  {
    lessonOrderIndex: 6,
    orderIndex: 2,
    type: ActivityType.SPOT_IN_QURAN,
    payload: { wordOrderIndex: 29 },
  },

  // ── Lesson 7: MATCH + SPOT_IN_QURAN ──
  {
    lessonOrderIndex: 7,
    orderIndex: 1,
    type: ActivityType.MATCH,
    payload: {
      pairs: [
        { wordOrderIndex: 31, arabic: 'قَوْم', meaning: 'People, Nation' },
        { wordOrderIndex: 32, arabic: 'نَاس', meaning: 'Mankind' },
        { wordOrderIndex: 33, arabic: 'عَبْد', meaning: 'Servant' },
        { wordOrderIndex: 35, arabic: 'نَبِيّ', meaning: 'Prophet' },
      ],
    },
  },
  {
    lessonOrderIndex: 7,
    orderIndex: 2,
    type: ActivityType.SPOT_IN_QURAN,
    payload: { wordOrderIndex: 33 },
  },

  // ── Lesson 8: QUICK_FIRE + FILL_MEANING ──
  {
    lessonOrderIndex: 8,
    orderIndex: 1,
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
  {
    lessonOrderIndex: 8,
    orderIndex: 2,
    type: ActivityType.FILL_MEANING,
    payload: {
      wordOrderIndex: 36,
      arabic: 'صَلَاة',
      prompt: '___ means "Prayer"',
      options: ['صَلَاة', 'شُكْر', 'رِزْق', 'حِكْمَة'],
      correctIndex: 0,
    },
  },

  // ── Lesson 9: MATCH + QUICK_FIRE ──
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
        { wordOrderIndex: 43, arabic: 'غَفَرَ', options: ['to forgive', 'to oppress'], correctIndex: 0 },
        { wordOrderIndex: 41, arabic: 'قَالَ', options: ['to remember', 'to say'], correctIndex: 1 },
        { wordOrderIndex: 45, arabic: 'ظَلَمَ', options: ['to oppress', 'to call'], correctIndex: 0 },
      ],
    },
  },

  // ── Lesson 10: FILL_MEANING + SPOT_IN_QURAN ──
  {
    lessonOrderIndex: 10,
    orderIndex: 1,
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
    orderIndex: 2,
    type: ActivityType.SPOT_IN_QURAN,
    payload: { wordOrderIndex: 48 },
  },

  // ── Lesson 11: MATCH + FILL_MEANING ──
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
        // Review word from L10
        { wordOrderIndex: 50, arabic: 'مَوْت', meaning: 'Death' },
      ],
    },
  },
  {
    lessonOrderIndex: 11,
    orderIndex: 2,
    type: ActivityType.FILL_MEANING,
    payload: {
      wordOrderIndex: 55,
      arabic: 'جَزَاء',
      prompt: 'جَزَاء means ___',
      options: ['Recompense', 'Hereafter', 'Reckoning', 'Death'],
      correctIndex: 0,
    },
  },

  // ── Lesson 12: QUICK_FIRE + SPOT_IN_QURAN ──
  {
    lessonOrderIndex: 12,
    orderIndex: 1,
    type: ActivityType.QUICK_FIRE,
    payload: {
      rounds: [
        { wordOrderIndex: 56, arabic: 'قَلْب', options: ['Heart', 'Spirit'], correctIndex: 0 },
        { wordOrderIndex: 57, arabic: 'رُوح', options: ['Chest', 'Spirit'], correctIndex: 1 },
        { wordOrderIndex: 59, arabic: 'عَقْل', options: ['Reason', 'Sight'], correctIndex: 0 },
        { wordOrderIndex: 60, arabic: 'صَدْر', options: ['Heart', 'Chest'], correctIndex: 1 },
      ],
    },
  },
  {
    lessonOrderIndex: 12,
    orderIndex: 2,
    type: ActivityType.SPOT_IN_QURAN,
    payload: { wordOrderIndex: 58 },
  },

  // ── Lesson 13: MATCH + SPOT_IN_QURAN ──
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
        // Review word from L12
        { wordOrderIndex: 56, arabic: 'قَلْب', meaning: 'Heart' },
      ],
    },
  },
  {
    lessonOrderIndex: 13,
    orderIndex: 2,
    type: ActivityType.SPOT_IN_QURAN,
    payload: { wordOrderIndex: 63 },
  },

  // ── Lesson 14: QUICK_FIRE + FILL_MEANING ──
  {
    lessonOrderIndex: 14,
    orderIndex: 1,
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
  {
    lessonOrderIndex: 14,
    orderIndex: 2,
    type: ActivityType.FILL_MEANING,
    payload: {
      wordOrderIndex: 69,
      arabic: 'عَظِيم',
      prompt: '___ means "Great, Mighty"',
      options: ['عَظِيم', 'خَيْر', 'شَرّ', 'كَبِير'],
      correctIndex: 0,
    },
  },

  // ── Lesson 15: MATCH + QUICK_FIRE ──
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
        { wordOrderIndex: 73, arabic: 'شَمْس', options: ['Sun', 'Moon'], correctIndex: 0 },
        { wordOrderIndex: 75, arabic: 'مَاء', options: ['Night', 'Water'], correctIndex: 1 },
        { wordOrderIndex: 71, arabic: 'لَيْل', options: ['Night', 'Daytime'], correctIndex: 0 },
        // Review round from L13
        { wordOrderIndex: 61, arabic: 'جَاءَ', options: ['to come', 'to enter'], correctIndex: 0 },
        { wordOrderIndex: 74, arabic: 'قَمَر', options: ['Sun', 'Moon'], correctIndex: 1 },
      ],
    },
  },

  // ── Lesson 16: FILL_MEANING + SPOT_IN_QURAN ──
  {
    lessonOrderIndex: 16,
    orderIndex: 1,
    type: ActivityType.FILL_MEANING,
    payload: {
      wordOrderIndex: 77,
      arabic: 'أَنْزَلَ',
      prompt: 'In "Inna anzalnahu fi laylatil-Qadr," أَنْزَلَ means ___',
      options: ['to send down', 'to see', 'to send', 'to take'],
      correctIndex: 0,
    },
  },
  {
    lessonOrderIndex: 16,
    orderIndex: 2,
    type: ActivityType.SPOT_IN_QURAN,
    payload: { wordOrderIndex: 77 },
  },

  // ── Lesson 17: MATCH + FILL_MEANING ──
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
      ],
    },
  },
  {
    lessonOrderIndex: 17,
    orderIndex: 2,
    type: ActivityType.FILL_MEANING,
    payload: {
      wordOrderIndex: 85,
      arabic: 'اتَّقَى',
      prompt: 'In "ittaqullah," اتَّقَى means ___',
      options: ['to be God-conscious', 'to submit', 'to disbelieve', 'to be hypocritical'],
      correctIndex: 0,
    },
  },

  // ── Lesson 18: QUICK_FIRE + SPOT_IN_QURAN ──
  {
    lessonOrderIndex: 18,
    orderIndex: 1,
    type: ActivityType.QUICK_FIRE,
    payload: {
      rounds: [
        { wordOrderIndex: 86, arabic: 'آتَى', options: ['to give', 'to spend'], correctIndex: 0 },
        { wordOrderIndex: 87, arabic: 'أَنْفَقَ', options: ['to provide', 'to spend'], correctIndex: 1 },
        { wordOrderIndex: 89, arabic: 'رَزَقَ', options: ['to provide', 'to give'], correctIndex: 0 },
        { wordOrderIndex: 90, arabic: 'زَكَاة', options: ['Grace', 'Charity'], correctIndex: 1 },
        // Review round from L16
        { wordOrderIndex: 77, arabic: 'أَنْزَلَ', options: ['to send down', 'to give'], correctIndex: 0 },
      ],
    },
  },
  {
    lessonOrderIndex: 18,
    orderIndex: 2,
    type: ActivityType.SPOT_IN_QURAN,
    payload: { wordOrderIndex: 87 },
  },

  // ── Lesson 19: MATCH + SPOT_IN_QURAN ──
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
    type: ActivityType.SPOT_IN_QURAN,
    payload: { wordOrderIndex: 94 },
  },

  // ── Lesson 20: QUICK_FIRE + FILL_MEANING ──
  {
    lessonOrderIndex: 20,
    orderIndex: 1,
    type: ActivityType.QUICK_FIRE,
    payload: {
      rounds: [
        { wordOrderIndex: 96, arabic: 'شَاءَ', options: ['to will', 'to want'], correctIndex: 0 },
        { wordOrderIndex: 99, arabic: 'خَافَ', options: ['to love', 'to fear'], correctIndex: 1 },
        { wordOrderIndex: 100, arabic: 'رَضِيَ', options: ['to be pleased', 'to will'], correctIndex: 0 },
        // Review round from L18
        { wordOrderIndex: 88, arabic: 'فَضْل', options: ['Charity', 'Grace/Bounty'], correctIndex: 1 },
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
      prompt: '___ means "to love"',
      options: ['أَحَبَّ', 'شَاءَ', 'خَافَ', 'رَضِيَ'],
      correctIndex: 0,
    },
  },

  // ── Lesson 21: MATCH + QUICK_FIRE ──
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
        { wordOrderIndex: 103, arabic: 'عَلَى', options: ['upon', 'in'], correctIndex: 0 },
        { wordOrderIndex: 102, arabic: 'فِي', options: ['toward', 'in'], correctIndex: 1 },
        { wordOrderIndex: 105, arabic: 'عَن', options: ['about', 'upon'], correctIndex: 0 },
        // Review round from L19
        { wordOrderIndex: 91, arabic: 'مَلِك', options: ['King', 'Throne'], correctIndex: 0 },
      ],
    },
  },

  // ── Lesson 22: FILL_MEANING + SPOT_IN_QURAN ──
  {
    lessonOrderIndex: 22,
    orderIndex: 1,
    type: ActivityType.FILL_MEANING,
    payload: {
      wordOrderIndex: 109,
      arabic: 'إِلَّا',
      prompt: 'In "La ilaha illa Allah," إِلَّا means ___',
      options: ['Except', 'Indeed', 'Not', 'Certainly'],
      correctIndex: 0,
    },
  },
  {
    lessonOrderIndex: 22,
    orderIndex: 2,
    type: ActivityType.SPOT_IN_QURAN,
    payload: { wordOrderIndex: 108 },
  },

  // ── Lesson 23: MATCH + FILL_MEANING ──
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
        // Review word from L22
        { wordOrderIndex: 106, arabic: 'إِنَّ', meaning: 'Indeed' },
      ],
    },
  },
  {
    lessonOrderIndex: 23,
    orderIndex: 2,
    type: ActivityType.FILL_MEANING,
    payload: {
      wordOrderIndex: 115,
      arabic: 'مَا',
      prompt: 'مَا means ___',
      options: ['what, that which', 'who, whoever', 'this', 'that'],
      correctIndex: 0,
    },
  },

  // ── Lesson 24: QUICK_FIRE + SPOT_IN_QURAN ──
  {
    lessonOrderIndex: 24,
    orderIndex: 1,
    type: ActivityType.QUICK_FIRE,
    payload: {
      rounds: [
        { wordOrderIndex: 116, arabic: 'لَمْ', options: ['did not', 'will never'], correctIndex: 0 },
        { wordOrderIndex: 118, arabic: 'بَلْ', options: ['is?', 'rather'], correctIndex: 1 },
        { wordOrderIndex: 119, arabic: 'هَلْ', options: ['is?/did?', 'did not'], correctIndex: 0 },
        { wordOrderIndex: 120, arabic: 'لَوْ', options: ['rather', 'if'], correctIndex: 1 },
        // Review round from L21
        { wordOrderIndex: 104, arabic: 'إِلَى', options: ['toward', 'about'], correctIndex: 0 },
      ],
    },
  },
  {
    lessonOrderIndex: 24,
    orderIndex: 2,
    type: ActivityType.SPOT_IN_QURAN,
    payload: { wordOrderIndex: 117 },
  },

  // ── Lesson 25: MATCH + SPOT_IN_QURAN ──
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
        // Review word from L24
        { wordOrderIndex: 116, arabic: 'لَمْ', meaning: 'did not' },
      ],
    },
  },
  {
    lessonOrderIndex: 25,
    orderIndex: 2,
    type: ActivityType.SPOT_IN_QURAN,
    payload: { wordOrderIndex: 123 },
  },

  // ── Lesson 26: QUICK_FIRE + FILL_MEANING ──
  {
    lessonOrderIndex: 26,
    orderIndex: 1,
    type: ActivityType.QUICK_FIRE,
    payload: {
      rounds: [
        { wordOrderIndex: 126, arabic: 'كَلِمَة', options: ['Word', 'Saying'], correctIndex: 0 },
        { wordOrderIndex: 127, arabic: 'قَوْل', options: ['Remembrance', 'Saying'], correctIndex: 1 },
        { wordOrderIndex: 128, arabic: 'حَدِيث', options: ['Speech', 'Name'], correctIndex: 0 },
        // Review round from L24
        { wordOrderIndex: 119, arabic: 'هَلْ', options: ['if', 'is?/did?'], correctIndex: 1 },
        { wordOrderIndex: 130, arabic: 'اسْم', options: ['Name', 'Word'], correctIndex: 0 },
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

  // ── Lesson 27: MATCH + QUICK_FIRE ──
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
        // Review round from L25
        { wordOrderIndex: 124, arabic: 'مَسْجِد', options: ['House', 'Mosque'], correctIndex: 1 },
      ],
    },
  },

  // ── Lesson 28: FILL_MEANING + SPOT_IN_QURAN ──
  {
    lessonOrderIndex: 28,
    orderIndex: 1,
    type: ActivityType.FILL_MEANING,
    payload: {
      wordOrderIndex: 139,
      arabic: 'بَشَّرَ',
      prompt: 'In "bashiran wa nadhira," بَشَّرَ means ___',
      options: ['to give glad tidings', 'to promise', 'to warn', 'shall'],
      correctIndex: 0,
    },
  },
  {
    lessonOrderIndex: 28,
    orderIndex: 2,
    type: ActivityType.SPOT_IN_QURAN,
    payload: { wordOrderIndex: 138 },
  },

  // ── Lesson 29: MATCH + FILL_MEANING ──
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
        // Review word from L28
        { wordOrderIndex: 136, arabic: 'وَعَدَ', meaning: 'to promise' },
      ],
    },
  },
  {
    lessonOrderIndex: 29,
    orderIndex: 2,
    type: ActivityType.FILL_MEANING,
    payload: {
      wordOrderIndex: 145,
      arabic: 'حَكِيم',
      prompt: 'In "Aziz ul-Hakim," حَكِيم means ___',
      options: ['All-Wise', 'All-Knowing', 'Most Merciful', 'All-Hearing'],
      correctIndex: 0,
    },
  },

  // ── Lesson 30: QUICK_FIRE + SPOT_IN_QURAN ──
  {
    lessonOrderIndex: 30,
    orderIndex: 1,
    type: ActivityType.QUICK_FIRE,
    payload: {
      rounds: [
        { wordOrderIndex: 146, arabic: 'عَهْد', options: ['Covenant', 'Judgment'], correctIndex: 0 },
        { wordOrderIndex: 147, arabic: 'شَهِيد', options: ['Parable', 'Witness'], correctIndex: 1 },
        { wordOrderIndex: 149, arabic: 'مَثَل', options: ['Parable', 'Covenant'], correctIndex: 0 },
        { wordOrderIndex: 150, arabic: 'أَهْل', options: ['Witness', 'Family'], correctIndex: 1 },
        // Review round from L27
        { wordOrderIndex: 134, arabic: 'تَابَ', options: ['to repent', 'to deny'], correctIndex: 0 },
      ],
    },
  },
  {
    lessonOrderIndex: 30,
    orderIndex: 2,
    type: ActivityType.SPOT_IN_QURAN,
    payload: { wordOrderIndex: 148 },
  },
];
