import { ChallengeType, Prisma } from '@prisma/client';

export interface ChallengeSeedData {
  dayOffset: number; // days from seed date
  type: ChallengeType;
  payload: Prisma.InputJsonValue;
}

// Pre-generate 30 days of challenges, rotating through types
export const CHALLENGES: ChallengeSeedData[] = [
  {
    dayOffset: 0,
    type: ChallengeType.WORD_OF_THE_DAY,
    payload: {
      wordArabic: 'رَبّ',
      wordTransliteration: 'Rabb',
      wordMeaning: 'Lord, Sustainer',
      fact: 'The word "Rabb" appears 975 times in the Qur\'an. It doesn\'t just mean "Lord" — it means the one who nurtures, sustains, and brings something to completion.',
      frequency: 975,
    },
  },
  {
    dayOffset: 1,
    type: ChallengeType.MEMORY_TEST,
    payload: {
      wordArabic: 'رَحْمَة',
      wordTransliteration: 'Rahmah',
      question: 'Do you remember what رَحْمَة (Rahmah) means?',
      options: ['Mercy', 'Knowledge', 'Patience', 'Truth'],
      correctIndex: 0,
    },
  },
  {
    dayOffset: 2,
    type: ChallengeType.FUN_FACT,
    payload: {
      headline: 'Did you know?',
      fact: 'Arabic has a root system — most words come from 3-letter roots. The root ر-ح-م (R-H-M) gives us Rahmah (mercy), Rahman (Most Merciful), Raheem (Most Compassionate), and even "rahm" (womb). Mercy is literally connected to the womb in Arabic!',
    },
  },
  {
    dayOffset: 3,
    type: ChallengeType.QUICK_QUIZ,
    payload: {
      question: 'Which of these words means "Knowledge"?',
      options: ['صَبْر', 'عِلْم', 'هُدَى', 'رَبّ'],
      correctIndex: 1,
      correctMeaning: 'Ilm — Knowledge',
    },
  },
  {
    dayOffset: 4,
    type: ChallengeType.WORD_OF_THE_DAY,
    payload: {
      wordArabic: 'كِتَاب',
      wordTransliteration: 'Kitab',
      wordMeaning: 'Book',
      fact: 'When Allah refers to the Qur\'an, He calls it "Al-Kitab" (The Book). The word appears 260 times. But "kitab" doesn\'t just mean a physical book — it can also mean a decree or something written/ordained.',
      frequency: 260,
    },
  },
  {
    dayOffset: 5,
    type: ChallengeType.MEMORY_TEST,
    payload: {
      wordArabic: 'صَبْر',
      wordTransliteration: 'Sabr',
      question: 'What does صَبْر (Sabr) mean?',
      options: ['Patience', 'Speed', 'Mercy', 'Light'],
      correctIndex: 0,
    },
  },
  {
    dayOffset: 6,
    type: ChallengeType.FUN_FACT,
    payload: {
      headline: 'Arabic vs Urdu',
      fact: 'About 40% of Urdu vocabulary comes from Arabic! That means as a Pakistani, you already have a massive head start in learning Qur\'anic Arabic. Words like ilm, sabr, haqq, kitab — you\'ve been speaking Arabic without knowing it.',
    },
  },
  {
    dayOffset: 7,
    type: ChallengeType.QUICK_QUIZ,
    payload: {
      question: 'Which word means "Guidance"?',
      options: ['رَبّ', 'نُور', 'هُدَى', 'صَبْر'],
      correctIndex: 2,
      correctMeaning: 'Huda — Guidance',
    },
  },
  {
    dayOffset: 8,
    type: ChallengeType.WORD_OF_THE_DAY,
    payload: {
      wordArabic: 'آيَة',
      wordTransliteration: 'Ayah',
      wordMeaning: 'Sign, Verse',
      fact: 'An "ayah" literally means a "sign" — something that points to Allah\'s existence and power. Every verse of the Qur\'an is called an ayah because each one is a sign from the Creator.',
      frequency: 382,
    },
  },
  {
    dayOffset: 9,
    type: ChallengeType.MEMORY_TEST,
    payload: {
      wordArabic: 'نُور',
      wordTransliteration: 'Noor',
      question: 'What does نُور (Noor) mean?',
      options: ['Light', 'Life', 'Soul', 'Earth'],
      correctIndex: 0,
    },
  },
  {
    dayOffset: 10,
    type: ChallengeType.QUICK_QUIZ,
    payload: {
      question: 'Which word means "Messenger"?',
      options: ['حَقّ', 'رَسُول', 'كِتَاب', 'آيَة'],
      correctIndex: 1,
      correctMeaning: 'Rasool — Messenger',
    },
  },
  {
    dayOffset: 11,
    type: ChallengeType.FUN_FACT,
    payload: {
      headline: 'The Qur\'an\'s vocabulary',
      fact: 'The entire Qur\'an contains about 77,430 words, but only about 1,800 unique root words. And just 300 unique words make up roughly 70% of the Qur\'an! You\'re learning the most impactful words first.',
    },
  },
  {
    dayOffset: 12,
    type: ChallengeType.WORD_OF_THE_DAY,
    payload: {
      wordArabic: 'جَنَّة',
      wordTransliteration: 'Jannah',
      wordMeaning: 'Paradise, Garden',
      fact: 'Jannah literally means "garden" — a place hidden behind lush greenery. The Qur\'an describes it with rivers flowing beneath, fruits, and shade. The word appears 147 times.',
      frequency: 147,
    },
  },
  {
    dayOffset: 13,
    type: ChallengeType.MEMORY_TEST,
    payload: {
      wordArabic: 'عَذَاب',
      wordTransliteration: 'Adhab',
      question: 'What does عَذَاب (Adhab) mean?',
      options: ['Punishment', 'Reward', 'Forgiveness', 'Paradise'],
      correctIndex: 0,
    },
  },
  {
    dayOffset: 14,
    type: ChallengeType.QUICK_QUIZ,
    payload: {
      question: 'Which word means "to believe"?',
      options: ['كَفَرَ', 'عَبَدَ', 'آمَنَ', 'خَلَقَ'],
      correctIndex: 2,
      correctMeaning: 'Aamana — to believe',
    },
  },
  {
    dayOffset: 15,
    type: ChallengeType.FUN_FACT,
    payload: {
      headline: 'Pairs in the Qur\'an',
      fact: 'The Qur\'an loves pairs: Jannah (Paradise) & Nar (Fire), Iman (Belief) & Kufr (Disbelief), Sabr (Patience) & Shukr (Gratitude). Understanding these pairs helps you see the Qur\'an\'s structure.',
    },
  },
  {
    dayOffset: 16,
    type: ChallengeType.WORD_OF_THE_DAY,
    payload: {
      wordArabic: 'قَالَ',
      wordTransliteration: 'Qala',
      wordMeaning: 'to say',
      fact: '"Qala" (he said) is the most frequent verb in the Qur\'an — appearing 1,618 times! That\'s because the Qur\'an is full of dialogue between Allah and His creation.',
      frequency: 1618,
    },
  },
  {
    dayOffset: 17,
    type: ChallengeType.MEMORY_TEST,
    payload: {
      wordArabic: 'صَلَاة',
      wordTransliteration: 'Salah',
      question: 'What does صَلَاة (Salah) mean?',
      options: ['Prayer', 'Fasting', 'Charity', 'Pilgrimage'],
      correctIndex: 0,
    },
  },
  {
    dayOffset: 18,
    type: ChallengeType.QUICK_QUIZ,
    payload: {
      question: 'Which word means "Provision/Sustenance"?',
      options: ['شُكْر', 'حِكْمَة', 'رِزْق', 'نِعْمَة'],
      correctIndex: 2,
      correctMeaning: 'Rizq — Provision',
    },
  },
  {
    dayOffset: 19,
    type: ChallengeType.FUN_FACT,
    payload: {
      headline: 'Al-Fatiha decoded',
      fact: 'Al-Fatiha contains several words you now know: Rabb (Lord), Rahmah root (Rahman, Raheem), Yawm (Day), Huda root (Ihdina — guide us), Sirat (Path). You\'re already understanding the prayer you recite most!',
    },
  },
  {
    dayOffset: 20,
    type: ChallengeType.WORD_OF_THE_DAY,
    payload: {
      wordArabic: 'صِرَاط',
      wordTransliteration: 'Sirat',
      wordMeaning: 'Straight Path',
      fact: 'You say "Ihdinas-sirat-al-mustaqeem" in every rak\'ah. If you pray 5 daily prayers, you say this word at least 17 times a day — that\'s over 6,200 times a year!',
      frequency: 45,
    },
  },
  {
    dayOffset: 21,
    type: ChallengeType.MEMORY_TEST,
    payload: {
      wordArabic: 'مَوْت',
      wordTransliteration: 'Mawt',
      question: 'What does مَوْت (Mawt) mean?',
      options: ['Death', 'Life', 'Day', 'Path'],
      correctIndex: 0,
    },
  },
  {
    dayOffset: 22,
    type: ChallengeType.QUICK_QUIZ,
    payload: {
      question: 'Which word means "Self/Soul"?',
      options: ['نُور', 'حَيَاة', 'نَفْس', 'سَمَاء'],
      correctIndex: 2,
      correctMeaning: 'Nafs — Self, Soul',
    },
  },
  {
    dayOffset: 23,
    type: ChallengeType.FUN_FACT,
    payload: {
      headline: 'Root connections',
      fact: 'عَلِمَ (to know) → عِلْم (knowledge) → عَالِم (scholar) → مَعْلُوم (known). One root, many words. This is the beauty of Arabic — learn one root and you unlock a whole family of words!',
    },
  },
  {
    dayOffset: 24,
    type: ChallengeType.WORD_OF_THE_DAY,
    payload: {
      wordArabic: 'دَعَا',
      wordTransliteration: 'Da\'a',
      wordMeaning: 'to call, to pray',
      fact: 'Da\'a is the root of "Dua" — your personal conversation with Allah. The Prophet ﷺ said: "Dua is the essence of worship." Every time you raise your hands in dua, you\'re performing da\'a.',
      frequency: 170,
    },
  },
  {
    dayOffset: 25,
    type: ChallengeType.MEMORY_TEST,
    payload: {
      wordArabic: 'قَوْم',
      wordTransliteration: 'Qawm',
      question: 'What does قَوْم (Qawm) mean?',
      options: ['People/Nation', 'Prophet', 'Servant', 'Mankind'],
      correctIndex: 0,
    },
  },
  {
    dayOffset: 26,
    type: ChallengeType.QUICK_QUIZ,
    payload: {
      question: 'Which word means "to create"?',
      options: ['عَلِمَ', 'هَدَى', 'خَلَقَ', 'سَمِعَ'],
      correctIndex: 2,
      correctMeaning: 'Khalaqa — to create',
    },
  },
  {
    dayOffset: 27,
    type: ChallengeType.FUN_FACT,
    payload: {
      headline: 'Your progress matters',
      fact: 'With just 50 words, you can recognize something on almost every page of the Qur\'an. These 50 words collectively appear over 10,000 times. You\'re not just learning Arabic — you\'re unlocking the Qur\'an.',
    },
  },
  {
    dayOffset: 28,
    type: ChallengeType.WORD_OF_THE_DAY,
    payload: {
      wordArabic: 'مَغْفِرَة',
      wordTransliteration: 'Maghfirah',
      wordMeaning: 'Forgiveness',
      fact: 'Al-Ghafoor (The Most Forgiving) appears 91 times in the Qur\'an — more than almost any other divine name. Allah mentions His forgiveness more often than His punishment.',
      frequency: 127,
    },
  },
  {
    dayOffset: 29,
    type: ChallengeType.MEMORY_TEST,
    payload: {
      wordArabic: 'شُكْر',
      wordTransliteration: 'Shukr',
      question: 'What does شُكْر (Shukr) mean?',
      options: ['Gratitude', 'Patience', 'Prayer', 'Mercy'],
      correctIndex: 0,
    },
  },
];
