import { ChallengeType, Prisma } from '@prisma/client';

export interface ChallengeSeedData {
  dayOffset: number; // days from seed date
  type: ChallengeType;
  payload: Prisma.InputJsonValue;
}

// Pre-generate 90 days of challenges, rotating through types
export const CHALLENGES: ChallengeSeedData[] = [
  // ===== DAY 0-29: EARLY CHALLENGES (L1-20 words) =====

  // Day 0 — WORD_OF_THE_DAY
  {
    dayOffset: 0,
    type: ChallengeType.WORD_OF_THE_DAY,
    payload: {
      wordArabic: 'رَبّ',
      wordTransliteration: 'Rabb',
      wordMeaning: 'Lord, Sustainer',
      fact: 'The word "Rabb" appears 975 times in the Qur\'an. It doesn\'t just mean "Lord" — it means the one who nurtures, sustains, and brings something to completion. Every time you say "Alhamdulillahi Rabbil Aalameen," you\'re acknowledging this.',
      frequency: 975,
    },
  },

  // Day 1 — MEMORY_TEST
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

  // Day 2 — FUN_FACT
  {
    dayOffset: 2,
    type: ChallengeType.FUN_FACT,
    payload: {
      headline: 'Did you know?',
      fact: 'Arabic has a root system — most words come from 3-letter roots. The root ر-ح-م (R-H-M) gives us Rahmah (mercy), Rahman (Most Merciful), Raheem (Most Compassionate), and even "rahm" (womb). Mercy is literally connected to the womb in Arabic!',
    },
  },

  // Day 3 — QUICK_QUIZ
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

  // Day 4 — WORD_OF_THE_DAY
  {
    dayOffset: 4,
    type: ChallengeType.WORD_OF_THE_DAY,
    payload: {
      wordArabic: 'كِتَاب',
      wordTransliteration: 'Kitab',
      wordMeaning: 'Book',
      fact: 'When Allah refers to the Qur\'an, He calls it "Al-Kitab" (The Book). The word appears 260 times. In Urdu, we use "kitab" every day — it\'s one of the clearest Arabic-Urdu cognates. The root ك-ت-ب also gives us "kataba" (to write) and "maktub" (written/destined).',
      frequency: 260,
    },
  },

  // Day 5 — MEMORY_TEST
  {
    dayOffset: 5,
    type: ChallengeType.MEMORY_TEST,
    payload: {
      wordArabic: 'صَبْر',
      wordTransliteration: 'Sabr',
      question: 'What does صَبْر (Sabr) mean?',
      options: ['Speed', 'Mercy', 'Patience', 'Light'],
      correctIndex: 2,
    },
  },

  // Day 6 — FUN_FACT
  {
    dayOffset: 6,
    type: ChallengeType.FUN_FACT,
    payload: {
      headline: 'Arabic in your Urdu',
      fact: 'About 40% of Urdu vocabulary comes from Arabic! Words like ilm, sabr, haqq, kitab, hayat, noor — you\'ve been speaking Arabic your whole life without realizing it. That\'s your biggest advantage in learning Qur\'anic Arabic.',
    },
  },

  // Day 7 — QUICK_QUIZ
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

  // Day 8 — WORD_OF_THE_DAY
  {
    dayOffset: 8,
    type: ChallengeType.WORD_OF_THE_DAY,
    payload: {
      wordArabic: 'آيَة',
      wordTransliteration: 'Ayah',
      wordMeaning: 'Sign, Verse',
      fact: 'An "ayah" literally means a "sign" — something that points to Allah\'s existence and power. Every verse of the Qur\'an is called an ayah because each one is a sign from the Creator. The word appears 382 times — the Qur\'an is full of signs for those who reflect.',
      frequency: 382,
    },
  },

  // Day 9 — MEMORY_TEST
  {
    dayOffset: 9,
    type: ChallengeType.MEMORY_TEST,
    payload: {
      wordArabic: 'نُور',
      wordTransliteration: 'Noor',
      question: 'What does نُور (Noor) mean?',
      options: ['Soul', 'Light', 'Life', 'Earth'],
      correctIndex: 1,
    },
  },

  // Day 10 — FUN_FACT
  {
    dayOffset: 10,
    type: ChallengeType.FUN_FACT,
    payload: {
      headline: 'The Qur\'an\'s vocabulary',
      fact: 'The entire Qur\'an contains about 77,430 words, but only about 1,800 unique root words. And just 300 unique words make up roughly 70% of the Qur\'an! You\'re learning the most impactful words first.',
    },
  },

  // Day 11 — QUICK_QUIZ
  {
    dayOffset: 11,
    type: ChallengeType.QUICK_QUIZ,
    payload: {
      question: 'Which word means "Messenger"?',
      options: ['حَقّ', 'رَسُول', 'كِتَاب', 'آيَة'],
      correctIndex: 1,
      correctMeaning: 'Rasool — Messenger',
    },
  },

  // Day 12 — WORD_OF_THE_DAY
  {
    dayOffset: 12,
    type: ChallengeType.WORD_OF_THE_DAY,
    payload: {
      wordArabic: 'جَنَّة',
      wordTransliteration: 'Jannah',
      wordMeaning: 'Paradise, Garden',
      fact: 'Jannah literally means "garden" — a place hidden behind lush greenery. The root ج-ن-ن means "to cover/hide," which is also where "jinn" (hidden beings) comes from. The Qur\'an describes Jannah with rivers flowing beneath, fruits, and eternal shade. It appears 147 times.',
      frequency: 147,
    },
  },

  // Day 13 — MEMORY_TEST
  {
    dayOffset: 13,
    type: ChallengeType.MEMORY_TEST,
    payload: {
      wordArabic: 'عَذَاب',
      wordTransliteration: 'Adhab',
      question: 'What does عَذَاب (Adhab) mean?',
      options: ['Forgiveness', 'Reward', 'Punishment', 'Paradise'],
      correctIndex: 2,
    },
  },

  // Day 14 — FUN_FACT
  {
    dayOffset: 14,
    type: ChallengeType.FUN_FACT,
    payload: {
      headline: 'Pairs in the Qur\'an',
      fact: 'The Qur\'an teaches in pairs: Jannah (Paradise) & Nar (Fire), Iman (Belief) & Kufr (Disbelief), Sabr (Patience) & Shukr (Gratitude), Hayat (Life) & Mawt (Death). Recognizing these pairs helps you see the Qur\'an\'s beautiful structure.',
    },
  },

  // Day 15 — QUICK_QUIZ
  {
    dayOffset: 15,
    type: ChallengeType.QUICK_QUIZ,
    payload: {
      question: 'Which word means "to believe"?',
      options: ['كَفَرَ', 'عَبَدَ', 'آمَنَ', 'خَلَقَ'],
      correctIndex: 2,
      correctMeaning: 'Aamana — to believe',
    },
  },

  // Day 16 — WORD_OF_THE_DAY
  {
    dayOffset: 16,
    type: ChallengeType.WORD_OF_THE_DAY,
    payload: {
      wordArabic: 'قَالَ',
      wordTransliteration: 'Qala',
      wordMeaning: 'to say',
      fact: '"Qala" (he said) is the most frequent verb in the Qur\'an — appearing 1,618 times! That\'s because the Qur\'an is full of dialogue: Allah speaks to prophets, prophets speak to their people, and people respond. When you see قَالَ, a conversation is starting.',
      frequency: 1618,
    },
  },

  // Day 17 — MEMORY_TEST
  {
    dayOffset: 17,
    type: ChallengeType.MEMORY_TEST,
    payload: {
      wordArabic: 'صَلَاة',
      wordTransliteration: 'Salah',
      question: 'What does صَلَاة (Salah) mean?',
      options: ['Charity', 'Fasting', 'Prayer', 'Pilgrimage'],
      correctIndex: 2,
    },
  },

  // Day 18 — FUN_FACT
  {
    dayOffset: 18,
    type: ChallengeType.FUN_FACT,
    payload: {
      headline: 'Al-Fatiha decoded',
      fact: 'Al-Fatiha contains several words you\'re learning: Rabb (Lord), Rahman & Raheem (from the Rahmah root), Yawm (Day), the Huda root in "Ihdina" (guide us), and Sirat (Path). You\'re already understanding the prayer you recite at least 17 times daily!',
    },
  },

  // Day 19 — QUICK_QUIZ
  {
    dayOffset: 19,
    type: ChallengeType.QUICK_QUIZ,
    payload: {
      question: 'Which word means "Provision/Sustenance"?',
      options: ['شُكْر', 'حِكْمَة', 'رِزْق', 'نِعْمَة'],
      correctIndex: 2,
      correctMeaning: 'Rizq — Provision',
    },
  },

  // Day 20 — WORD_OF_THE_DAY
  {
    dayOffset: 20,
    type: ChallengeType.WORD_OF_THE_DAY,
    payload: {
      wordArabic: 'صِرَاط',
      wordTransliteration: 'Sirat',
      wordMeaning: 'Straight Path',
      fact: 'You say "Ihdinas-sirat-al-mustaqeem" in every rak\'ah of every prayer. If you pray 5 daily prayers, you say this word at least 17 times a day — that\'s over 6,200 times a year! The word itself appears 45 times in the Qur\'an.',
      frequency: 45,
    },
  },

  // Day 21 — MEMORY_TEST
  {
    dayOffset: 21,
    type: ChallengeType.MEMORY_TEST,
    payload: {
      wordArabic: 'مَوْت',
      wordTransliteration: 'Mawt',
      question: 'What does مَوْت (Mawt) mean?',
      options: ['Path', 'Life', 'Death', 'Day'],
      correctIndex: 2,
    },
  },

  // Day 22 — FUN_FACT
  {
    dayOffset: 22,
    type: ChallengeType.FUN_FACT,
    payload: {
      headline: 'Root connections',
      fact: 'عَلِمَ (to know) → عِلْم (knowledge) → عَالِم (scholar) → مَعْلُوم (known) → عَلِيم (All-Knowing). One 3-letter root ع-ل-م generates an entire family of words. This is the beauty of Arabic — learn one root and you unlock many words!',
    },
  },

  // Day 23 — QUICK_QUIZ
  {
    dayOffset: 23,
    type: ChallengeType.QUICK_QUIZ,
    payload: {
      question: 'Which word means "Self/Soul"?',
      options: ['نُور', 'حَيَاة', 'نَفْس', 'سَمَاء'],
      correctIndex: 2,
      correctMeaning: 'Nafs — Self, Soul',
    },
  },

  // Day 24 — WORD_OF_THE_DAY
  {
    dayOffset: 24,
    type: ChallengeType.WORD_OF_THE_DAY,
    payload: {
      wordArabic: 'دَعَا',
      wordTransliteration: 'Da\'a',
      wordMeaning: 'to call, to pray',
      fact: 'Da\'a is the root of "Dua" — your personal conversation with Allah. The Prophet ﷺ said dua is the essence of worship. The word appears 170 times in the Qur\'an. Every time you raise your hands after salah, you\'re performing da\'a.',
      frequency: 170,
    },
  },

  // Day 25 — MEMORY_TEST
  {
    dayOffset: 25,
    type: ChallengeType.MEMORY_TEST,
    payload: {
      wordArabic: 'قَوْم',
      wordTransliteration: 'Qawm',
      question: 'What does قَوْم (Qawm) mean?',
      options: ['Prophet', 'Servant', 'People/Nation', 'Mankind'],
      correctIndex: 2,
    },
  },

  // Day 26 — FUN_FACT
  {
    dayOffset: 26,
    type: ChallengeType.FUN_FACT,
    payload: {
      headline: 'Your progress matters',
      fact: 'With just 50 Qur\'anic words, you can recognize something on almost every page of the Qur\'an. These 50 words collectively appear over 10,000 times across its 6,236 verses. You\'re not just memorizing vocabulary — you\'re unlocking the Qur\'an word by word.',
    },
  },

  // Day 27 — QUICK_QUIZ
  {
    dayOffset: 27,
    type: ChallengeType.QUICK_QUIZ,
    payload: {
      question: 'Which word means "to create"?',
      options: ['عَلِمَ', 'هَدَى', 'خَلَقَ', 'سَمِعَ'],
      correctIndex: 2,
      correctMeaning: 'Khalaqa — to create',
    },
  },

  // Day 28 — WORD_OF_THE_DAY
  {
    dayOffset: 28,
    type: ChallengeType.WORD_OF_THE_DAY,
    payload: {
      wordArabic: 'مَغْفِرَة',
      wordTransliteration: 'Maghfirah',
      wordMeaning: 'Forgiveness',
      fact: 'The root غ-ف-ر gives us Maghfirah (forgiveness), Ghafara (to forgive), and Ghafoor (Most Forgiving). Al-Ghafoor appears 91 times in the Qur\'an — Allah mentions His forgiveness far more often than His punishment.',
      frequency: 127,
    },
  },

  // Day 29 — MEMORY_TEST
  {
    dayOffset: 29,
    type: ChallengeType.MEMORY_TEST,
    payload: {
      wordArabic: 'شُكْر',
      wordTransliteration: 'Shukr',
      question: 'What does شُكْر (Shukr) mean?',
      options: ['Patience', 'Prayer', 'Gratitude', 'Mercy'],
      correctIndex: 2,
    },
  },

  // ===== DAY 30-59: MIDDLE CHALLENGES (L11-40 words) =====

  // Day 30 — FUN_FACT
  {
    dayOffset: 30,
    type: ChallengeType.FUN_FACT,
    payload: {
      headline: 'Dunya vs Akhirah',
      fact: 'The word "Dunya" (worldly life) and "Akhirah" (hereafter) each appear exactly 115 times in the Qur\'an. This perfect balance is one of the Qur\'an\'s numerical wonders — the world and the hereafter given equal mention.',
    },
  },

  // Day 31 — QUICK_QUIZ
  {
    dayOffset: 31,
    type: ChallengeType.QUICK_QUIZ,
    payload: {
      question: 'Which word means "Heart"?',
      options: ['رُوح', 'قَلْب', 'صَدْر', 'عَقْل'],
      correctIndex: 1,
      correctMeaning: 'Qalb — Heart',
    },
  },

  // Day 32 — WORD_OF_THE_DAY
  {
    dayOffset: 32,
    type: ChallengeType.WORD_OF_THE_DAY,
    payload: {
      wordArabic: 'دُنْيَا',
      wordTransliteration: 'Dunya',
      wordMeaning: 'Worldly Life',
      fact: '"Dunya" comes from a root meaning "low" or "near." The worldly life is called Dunya because it is the lower, nearer life compared to the Akhirah. In Urdu, we use "duniya" the same way — another Arabic gift to our language.',
      frequency: 115,
    },
  },

  // Day 33 — MEMORY_TEST
  {
    dayOffset: 33,
    type: ChallengeType.MEMORY_TEST,
    payload: {
      wordArabic: 'قِيَامَة',
      wordTransliteration: 'Qiyamah',
      question: 'What does قِيَامَة (Qiyamah) mean?',
      options: ['Reckoning', 'Resurrection', 'Reward', 'Paradise'],
      correctIndex: 1,
    },
  },

  // Day 34 — FUN_FACT
  {
    dayOffset: 34,
    type: ChallengeType.FUN_FACT,
    payload: {
      headline: 'The heart in Arabic',
      fact: 'The word "Qalb" (قَلْب) means "heart" but its root ق-ل-ب means "to turn/flip." The heart is called Qalb because it is constantly turning between states — a beautiful reminder of why we pray "Ya Muqallib al-Quloob" (O Turner of Hearts).',
    },
  },

  // Day 35 — QUICK_QUIZ
  {
    dayOffset: 35,
    type: ChallengeType.QUICK_QUIZ,
    payload: {
      question: 'Which word means "Good"?',
      options: ['شَرّ', 'خَيْر', 'عَظِيم', 'كَبِير'],
      correctIndex: 1,
      correctMeaning: 'Khayr — Good',
    },
  },

  // Day 36 — WORD_OF_THE_DAY
  {
    dayOffset: 36,
    type: ChallengeType.WORD_OF_THE_DAY,
    payload: {
      wordArabic: 'رُوح',
      wordTransliteration: 'Ruh',
      wordMeaning: 'Spirit, Soul',
      fact: 'Ruh means "spirit" or "soul." Jibreel (Gabriel) is called "Ruh al-Qudus" (the Holy Spirit) because he carries divine revelation. The word also appears when Allah breathed His Ruh into Adam — the moment humanity was given life.',
      frequency: 57,
    },
  },

  // Day 37 — MEMORY_TEST
  {
    dayOffset: 37,
    type: ChallengeType.MEMORY_TEST,
    payload: {
      wordArabic: 'خَيْر',
      wordTransliteration: 'Khayr',
      question: 'What does خَيْر (Khayr) mean?',
      options: ['Evil', 'Great', 'Good', 'Big'],
      correctIndex: 2,
    },
  },

  // Day 38 — FUN_FACT
  {
    dayOffset: 38,
    type: ChallengeType.FUN_FACT,
    payload: {
      headline: 'Night and day in the Qur\'an',
      fact: 'Allah frequently mentions the alternation of Layl (night) and Nahar (day) as a sign of His power. This pair appears together over 20 times. In Pakistan, "layl-o-nahar" is a common Urdu expression meaning "day and night" — straight from the Qur\'an.',
    },
  },

  // Day 39 — QUICK_QUIZ
  {
    dayOffset: 39,
    type: ChallengeType.QUICK_QUIZ,
    payload: {
      question: 'Which word means "to come"?',
      options: ['دَخَلَ', 'خَرَجَ', 'جَاءَ', 'رَجَعَ'],
      correctIndex: 2,
      correctMeaning: 'Ja\'a — to come',
    },
  },

  // Day 40 — WORD_OF_THE_DAY
  {
    dayOffset: 40,
    type: ChallengeType.WORD_OF_THE_DAY,
    payload: {
      wordArabic: 'شَمْس',
      wordTransliteration: 'Shams',
      wordMeaning: 'Sun',
      fact: 'Surah Ash-Shams (The Sun) opens with "Wash-shamsi wa duhaha" — By the sun and its brightness. Allah swears by the sun, which appears 33 times in the Qur\'an. In Urdu poetry, "shams" is used as a name meaning "radiant."',
      frequency: 33,
    },
  },

  // Day 41 — MEMORY_TEST
  {
    dayOffset: 41,
    type: ChallengeType.MEMORY_TEST,
    payload: {
      wordArabic: 'لَيْل',
      wordTransliteration: 'Layl',
      question: 'What does لَيْل (Layl) mean?',
      options: ['Day', 'Water', 'Night', 'Moon'],
      correctIndex: 2,
    },
  },

  // Day 42 — FUN_FACT
  {
    dayOffset: 42,
    type: ChallengeType.FUN_FACT,
    payload: {
      headline: 'Allah\'s name in the Qur\'an',
      fact: 'The word "Allah" (اللَّه) appears 2,699 times in the Qur\'an — more than any other word. That\'s roughly once every 2.3 verses. No matter where you open the Qur\'an, you\'re never far from His name.',
    },
  },

  // Day 43 — QUICK_QUIZ
  {
    dayOffset: 43,
    type: ChallengeType.QUICK_QUIZ,
    payload: {
      question: 'Which word means "Religion/Way of Life"?',
      options: ['إيمَان', 'دِين', 'مُسْلِم', 'كَافِر'],
      correctIndex: 1,
      correctMeaning: 'Deen — Religion, Way of Life',
    },
  },

  // Day 44 — WORD_OF_THE_DAY
  {
    dayOffset: 44,
    type: ChallengeType.WORD_OF_THE_DAY,
    payload: {
      wordArabic: 'مَلِك',
      wordTransliteration: 'Malik',
      wordMeaning: 'King, Sovereign',
      fact: 'In Al-Fatiha, we say "Maliki Yawm-id-Deen" — King/Master of the Day of Judgment. The root م-ل-ك gives us Malik (king), Mulk (dominion), and Malak (angel). You say this every single rak\'ah!',
      frequency: 49,
    },
  },

  // Day 45 — MEMORY_TEST
  {
    dayOffset: 45,
    type: ChallengeType.MEMORY_TEST,
    payload: {
      wordArabic: 'أَرَادَ',
      wordTransliteration: 'Arada',
      question: 'What does أَرَادَ (Arada) mean?',
      options: ['to love', 'to want/intend', 'to fear', 'to be pleased'],
      correctIndex: 1,
    },
  },

  // Day 46 — FUN_FACT
  {
    dayOffset: 46,
    type: ChallengeType.FUN_FACT,
    payload: {
      headline: 'The word "Muslim" decoded',
      fact: 'The word "Muslim" (مُسْلِم) means "one who submits." It comes from the root س-ل-م which also gives us Salam (peace) and Islam (submission). A Muslim is literally "one who has found peace through submission to Allah."',
    },
  },

  // Day 47 — QUICK_QUIZ
  {
    dayOffset: 47,
    type: ChallengeType.QUICK_QUIZ,
    payload: {
      question: 'Which word means "Power/Strength"?',
      options: ['سُلْطَان', 'مُلْك', 'قُوَّة', 'عَرْش'],
      correctIndex: 2,
      correctMeaning: 'Quwwah — Power, Strength',
    },
  },

  // Day 48 — WORD_OF_THE_DAY
  {
    dayOffset: 48,
    type: ChallengeType.WORD_OF_THE_DAY,
    payload: {
      wordArabic: 'فَضْل',
      wordTransliteration: 'Fadl',
      wordMeaning: 'Grace, Bounty',
      fact: 'Fadl means Allah\'s grace that goes beyond what is deserved. When the Qur\'an says "Dhaalika fadlullahi yu\'tihi man yashaa" — that is Allah\'s grace, He gives it to whom He wills. In Urdu, "fazl" is a common name meaning "grace."',
      frequency: 80,
    },
  },

  // Day 49 — MEMORY_TEST
  {
    dayOffset: 49,
    type: ChallengeType.MEMORY_TEST,
    payload: {
      wordArabic: 'رَأَى',
      wordTransliteration: 'Ra\'a',
      question: 'What does رَأَى (Ra\'a) mean?',
      options: ['to send', 'to take', 'to make', 'to see'],
      correctIndex: 3,
    },
  },

  // Day 50 — FUN_FACT
  {
    dayOffset: 50,
    type: ChallengeType.FUN_FACT,
    payload: {
      headline: 'From Rasool to Arsala',
      fact: 'رَسُول (Rasool, Messenger) and أَرْسَلَ (Arsala, to send) share the same root ر-س-ل. A Rasool is literally "one who is sent." When Allah says "Arsalna" — "We sent" — He\'s describing the very act of making someone a Rasool.',
    },
  },

  // Day 51 — QUICK_QUIZ
  {
    dayOffset: 51,
    type: ChallengeType.QUICK_QUIZ,
    payload: {
      question: 'Which word means "Hereafter"?',
      options: ['دُنْيَا', 'آخِرَة', 'قِيَامَة', 'حِسَاب'],
      correctIndex: 1,
      correctMeaning: 'Akhirah — Hereafter',
    },
  },

  // Day 52 — WORD_OF_THE_DAY
  {
    dayOffset: 52,
    type: ChallengeType.WORD_OF_THE_DAY,
    payload: {
      wordArabic: 'عَهْد',
      wordTransliteration: 'Ahd',
      wordMeaning: 'Covenant, Promise',
      fact: 'When Allah says "Wa awfu bi ahdi" (fulfill My covenant), He\'s using "Ahd" — a solemn promise between Allah and humanity. In Urdu, "ahd" (عہد) means both promise and era. The concept of covenant runs deep in Qur\'anic theology.',
      frequency: 29,
    },
  },

  // Day 53 — MEMORY_TEST
  {
    dayOffset: 53,
    type: ChallengeType.MEMORY_TEST,
    payload: {
      wordArabic: 'وَعَدَ',
      wordTransliteration: 'Wa\'ada',
      question: 'What does وَعَدَ (Wa\'ada) mean?',
      options: ['to warn', 'to give glad tidings', 'to promise', 'to judge'],
      correctIndex: 2,
    },
  },

  // Day 54 — FUN_FACT
  {
    dayOffset: 54,
    type: ChallengeType.FUN_FACT,
    payload: {
      headline: 'Broken plurals',
      fact: 'Arabic doesn\'t just add "-s" for plural. It changes the word\'s shape entirely: Kitab→Kutub (books), Rasool→Rusul (messengers), Qalb→Quloob (hearts). These "broken plurals" are one of Arabic\'s unique features — and once you spot the patterns, they become predictable.',
    },
  },

  // Day 55 — QUICK_QUIZ
  {
    dayOffset: 55,
    type: ChallengeType.QUICK_QUIZ,
    payload: {
      question: 'Which word means "Witness/Martyr"?',
      options: ['حُكْم', 'مَثَل', 'شَهِيد', 'أَهْل'],
      correctIndex: 2,
      correctMeaning: 'Shahid — Witness, Martyr',
    },
  },

  // Day 56 — WORD_OF_THE_DAY
  {
    dayOffset: 56,
    type: ChallengeType.WORD_OF_THE_DAY,
    payload: {
      wordArabic: 'كَانَ',
      wordTransliteration: 'Kana',
      wordMeaning: 'to be, was',
      fact: '"Kana" is the second most frequent verb in the Qur\'an at 1,358 occurrences. "Wa kana Allahu Ghafooran Raheema" — And Allah IS (and has always been) Forgiving, Merciful. When used for Allah, "kana" doesn\'t mean "was" in the past — it means eternally.',
      frequency: 1358,
    },
  },

  // Day 57 — MEMORY_TEST
  {
    dayOffset: 57,
    type: ChallengeType.MEMORY_TEST,
    payload: {
      wordArabic: 'شَيْء',
      wordTransliteration: 'Shay\'',
      question: 'What does شَيْء (Shay\') mean?',
      options: ['Place', 'Thing', 'House', 'Name'],
      correctIndex: 1,
    },
  },

  // Day 58 — FUN_FACT
  {
    dayOffset: 58,
    type: ChallengeType.FUN_FACT,
    payload: {
      headline: 'Masjid means place of sujood',
      fact: 'مَسْجِد (Masjid) comes from the root س-ج-د (to prostrate). It literally means "place of prostration." Similarly, مَكْتَب (Maktab/office) comes from كَتَبَ (to write) — the "place of writing." The مَفْعِل pattern turns verbs into places!',
    },
  },

  // Day 59 — QUICK_QUIZ
  {
    dayOffset: 59,
    type: ChallengeType.QUICK_QUIZ,
    payload: {
      question: 'Which word means "Wealth/Property"?',
      options: ['عَمَل', 'كَسَبَ', 'مَال', 'مَتَاع'],
      correctIndex: 2,
      correctMeaning: 'Mal — Wealth, Property',
    },
  },

  // ===== DAY 60-89: LATER CHALLENGES (L21-60 words) =====

  // Day 60 — WORD_OF_THE_DAY
  {
    dayOffset: 60,
    type: ChallengeType.WORD_OF_THE_DAY,
    payload: {
      wordArabic: 'مِن',
      wordTransliteration: 'Min',
      wordMeaning: 'from, of',
      fact: '"Min" is the most frequent word in the Qur\'an after "Allah" — appearing 3,226 times. It means "from," "of," or "among" depending on context. You literally cannot read a single page of the Qur\'an without encountering it multiple times.',
      frequency: 3226,
    },
  },

  // Day 61 — MEMORY_TEST
  {
    dayOffset: 61,
    type: ChallengeType.MEMORY_TEST,
    payload: {
      wordArabic: 'إِنَّ',
      wordTransliteration: 'Inna',
      question: 'What does إِنَّ (Inna) mean?',
      options: ['If', 'Indeed/Verily', 'Not', 'Every'],
      correctIndex: 1,
    },
  },

  // Day 62 — FUN_FACT
  {
    dayOffset: 62,
    type: ChallengeType.FUN_FACT,
    payload: {
      headline: 'Three types of "not" in Arabic',
      fact: 'Arabic has three distinct ways to say "not": لَمْ (lam) negates the past — "did not," لَا (la) negates the present — "does not," and لَنْ (lan) negates the future — "will never." Each one changes the verb differently. English just has one word: "not."',
    },
  },

  // Day 63 — QUICK_QUIZ
  {
    dayOffset: 63,
    type: ChallengeType.QUICK_QUIZ,
    payload: {
      question: 'Which word means "Every/All"?',
      options: ['إِلَّا', 'كُلّ', 'قَدْ', 'إِنَّ'],
      correctIndex: 1,
      correctMeaning: 'Kull — Every, All',
    },
  },

  // Day 64 — WORD_OF_THE_DAY
  {
    dayOffset: 64,
    type: ChallengeType.WORD_OF_THE_DAY,
    payload: {
      wordArabic: 'الَّذِي',
      wordTransliteration: 'Alladhi',
      wordMeaning: 'who, which, that',
      fact: '"Alladhi" (who/which/that) appears 1,442 times. Its plural "Alladhina" is in one of the most repeated Qur\'anic phrases: "Alladhina Aamanu" — those who believe. Once you recognize this word, you\'ll see it everywhere in the Qur\'an.',
      frequency: 1442,
    },
  },

  // Day 65 — MEMORY_TEST
  {
    dayOffset: 65,
    type: ChallengeType.MEMORY_TEST,
    payload: {
      wordArabic: 'ذَلِكَ',
      wordTransliteration: 'Dhalika',
      question: 'What does ذَلِكَ (Dhalika) mean?',
      options: ['this', 'who', 'that', 'what'],
      correctIndex: 2,
    },
  },

  // Day 66 — FUN_FACT
  {
    dayOffset: 66,
    type: ChallengeType.FUN_FACT,
    payload: {
      headline: 'Deconstructing the Shahada',
      fact: 'لَا إِلَهَ إِلَّا اللَّه — There is no god except Allah. If you\'ve been learning with us, you already know every word: لَا (no/not), إِلَه (god/deity), إِلَّا (except), اللَّه (Allah). Four words, the most powerful sentence in Islam.',
    },
  },

  // Day 67 — QUICK_QUIZ
  {
    dayOffset: 67,
    type: ChallengeType.QUICK_QUIZ,
    payload: {
      question: 'Which word means "to repent"?',
      options: ['أَطَاعَ', 'عَصَى', 'تَابَ', 'كَذَّبَ'],
      correctIndex: 2,
      correctMeaning: 'Taba — to repent',
    },
  },

  // Day 68 — WORD_OF_THE_DAY
  {
    dayOffset: 68,
    type: ChallengeType.WORD_OF_THE_DAY,
    payload: {
      wordArabic: 'إِلَه',
      wordTransliteration: 'Ilah',
      wordMeaning: 'God, Deity',
      fact: '"Ilah" means any deity or object of worship. "Allah" is actually a contraction of "Al-Ilah" — THE God, the one true deity. The word appears 147 times. The Shahada\'s power comes from first negating all ilahs, then affirming only Allah.',
      frequency: 147,
    },
  },

  // Day 69 — MEMORY_TEST
  {
    dayOffset: 69,
    type: ChallengeType.MEMORY_TEST,
    payload: {
      wordArabic: 'مَلَك',
      wordTransliteration: 'Malak',
      question: 'What does مَلَك (Malak) mean?',
      options: ['King', 'Devil', 'Angel', 'Companion'],
      correctIndex: 2,
    },
  },

  // Day 70 — FUN_FACT
  {
    dayOffset: 70,
    type: ChallengeType.FUN_FACT,
    payload: {
      headline: 'Angels vs Kings in Arabic',
      fact: 'مَلَك (Malak) means "angel" and مَلِك (Malik) means "king" — they look almost identical in Arabic script! The difference is a tiny vowel mark. Angels are from the root م-ل-ك related to "message/sending," while kings are from م-ل-ك related to "possession/authority."',
    },
  },

  // Day 71 — QUICK_QUIZ
  {
    dayOffset: 71,
    type: ChallengeType.QUICK_QUIZ,
    payload: {
      question: 'Which word means "Abiding forever"?',
      options: ['أَصْحَاب', 'شَيْطَان', 'جَهَنَّم', 'خَالِد'],
      correctIndex: 3,
      correctMeaning: 'Khalid — Abiding forever',
    },
  },

  // Day 72 — WORD_OF_THE_DAY
  {
    dayOffset: 72,
    type: ChallengeType.WORD_OF_THE_DAY,
    payload: {
      wordArabic: 'سَلَام',
      wordTransliteration: 'Salam',
      wordMeaning: 'Peace',
      fact: 'Salam (peace) comes from the same root as Islam and Muslim: س-ل-م. You end every prayer with "Assalamu alaykum wa rahmatullah." The greeting of the people of Jannah will also be "Salam" — peace. It appears 41 times in the Qur\'an.',
      frequency: 41,
    },
  },

  // Day 73 — MEMORY_TEST
  {
    dayOffset: 73,
    type: ChallengeType.MEMORY_TEST,
    payload: {
      wordArabic: 'تَقْوَى',
      wordTransliteration: 'Taqwa',
      question: 'What does تَقْوَى (Taqwa) mean?',
      options: ['Repentance', 'Praise', 'Peace', 'God-consciousness'],
      correctIndex: 3,
    },
  },

  // Day 74 — FUN_FACT
  {
    dayOffset: 74,
    type: ChallengeType.FUN_FACT,
    payload: {
      headline: 'The Qur\'an\'s name for itself',
      fact: 'قُرْآن (Qur\'an) comes from the root ق-ر-أ meaning "to read/recite." The Qur\'an literally means "The Recitation." The very first revelation was "Iqra!" (Read!). The Book\'s name tells you what to do with it — recite it, again and again.',
    },
  },

  // Day 75 — QUICK_QUIZ
  {
    dayOffset: 75,
    type: ChallengeType.QUICK_QUIZ,
    payload: {
      question: 'Which word means "Community/Nation"?',
      options: ['عَالَمِين', 'ذُرِّيَّة', 'أُمَّة', 'قَرْيَة'],
      correctIndex: 2,
      correctMeaning: 'Ummah — Community, Nation',
    },
  },

  // Day 76 — WORD_OF_THE_DAY
  {
    dayOffset: 76,
    type: ChallengeType.WORD_OF_THE_DAY,
    payload: {
      wordArabic: 'عَلَّمَ',
      wordTransliteration: 'Allama',
      wordMeaning: 'to teach',
      fact: 'عَلَّمَ (to teach) is the intensive form of عَلِمَ (to know). "Allama al-insana ma lam ya\'lam" — He taught man what he did not know (96:5). From the same root ع-ل-م: Ilm (knowledge, L1), Alima (to know, L4), Aleem (All-Knowing), and Aalim (scholar).',
      frequency: 41,
    },
  },

  // Day 77 — MEMORY_TEST
  {
    dayOffset: 77,
    type: ChallengeType.MEMORY_TEST,
    payload: {
      wordArabic: 'كَتَبَ',
      wordTransliteration: 'Kataba',
      question: 'What does كَتَبَ (Kataba) mean?',
      options: ['to read', 'to teach', 'to write/prescribe', 'to recite'],
      correctIndex: 2,
    },
  },

  // Day 78 — FUN_FACT
  {
    dayOffset: 78,
    type: ChallengeType.FUN_FACT,
    payload: {
      headline: 'Worship words in your salah',
      fact: 'In every prayer you say: سُبْحَانَ رَبِّيَ الْعَظِيم (Glory be to my Lord, the Great) and سُبْحَانَ رَبِّيَ الْأَعْلَى (Glory be to my Lord, the Most High). You already know Subhan, Rabb, and Azeem — you\'re understanding your own salah!',
    },
  },

  // Day 79 — QUICK_QUIZ
  {
    dayOffset: 79,
    type: ChallengeType.QUICK_QUIZ,
    payload: {
      question: 'Which word means "to be patient"?',
      options: ['شَكَرَ', 'صَبَرَ', 'سَجَدَ', 'قَتَلَ'],
      correctIndex: 1,
      correctMeaning: 'Sabara — to be patient',
    },
  },

  // Day 80 — WORD_OF_THE_DAY
  {
    dayOffset: 80,
    type: ChallengeType.WORD_OF_THE_DAY,
    payload: {
      wordArabic: 'غَيْب',
      wordTransliteration: 'Ghayb',
      wordMeaning: 'Unseen',
      fact: 'The very beginning of Surah Al-Baqarah describes believers as "Alladhina yu\'minuna bil-ghayb" — those who believe in the unseen. Ghayb encompasses everything beyond human perception: Allah, angels, the hereafter, destiny. It appears 49 times.',
      frequency: 49,
    },
  },

  // Day 81 — MEMORY_TEST
  {
    dayOffset: 81,
    type: ChallengeType.MEMORY_TEST,
    payload: {
      wordArabic: 'ظُلْم',
      wordTransliteration: 'Zulm',
      question: 'What does ظُلْم (Zulm) mean?',
      options: ['Guidance', 'Injustice/Oppression', 'Darkness', 'Fear'],
      correctIndex: 1,
    },
  },

  // Day 82 — FUN_FACT
  {
    dayOffset: 82,
    type: ChallengeType.FUN_FACT,
    payload: {
      headline: 'Nature as evidence',
      fact: 'The Qur\'an uses nature as proof of Allah\'s existence: بَحْر (sea, 41x), نَهْر (river, 54x), جَبَل (mountain, 39x), شَجَرَة (tree, 26x), رِيح (wind, 29x). When Allah says "Do they not look at...?" He\'s pointing to nature as His signature.',
    },
  },

  // Day 83 — QUICK_QUIZ
  {
    dayOffset: 83,
    type: ChallengeType.QUICK_QUIZ,
    payload: {
      question: 'Which word means "to establish"?',
      options: ['رَدَّ', 'زَادَ', 'أَقَامَ', 'نَسِيَ'],
      correctIndex: 2,
      correctMeaning: 'Aqama — to establish',
    },
  },

  // Day 84 — WORD_OF_THE_DAY
  {
    dayOffset: 84,
    type: ChallengeType.WORD_OF_THE_DAY,
    payload: {
      wordArabic: 'الرَّحْمَن',
      wordTransliteration: 'Ar-Rahman',
      wordMeaning: 'The Most Merciful',
      fact: 'Ar-Rahman uses the فَعْلَان pattern which indicates overwhelming intensity. While Raheem (from L29) means "constantly merciful," Rahman means "overflowing with mercy right now." One root ر-ح-م gave you Rahmah (L1), Raheem (L29), and now Rahman — the complete mercy family.',
      frequency: 45,
    },
  },

  // Day 85 — MEMORY_TEST
  {
    dayOffset: 85,
    type: ChallengeType.MEMORY_TEST,
    payload: {
      wordArabic: 'بَيِّنَة',
      wordTransliteration: 'Bayyinah',
      question: 'What does بَيِّنَة (Bayyinah) mean?',
      options: ['Tongue', 'Clear Evidence', 'Offspring', 'Scholar'],
      correctIndex: 1,
    },
  },

  // Day 86 — FUN_FACT
  {
    dayOffset: 86,
    type: ChallengeType.FUN_FACT,
    payload: {
      headline: 'Full circle: Ilm to Aalim',
      fact: 'Your first word was عِلْم (Ilm, knowledge). The final word in the curriculum is عَالِم (Aalim, scholar). Both share the root ع-ل-م. In between, you learned عَلِمَ (to know), عَلِيم (All-Knowing), and عَلَّمَ (to teach). One root, five words, spanning your entire journey.',
    },
  },

  // Day 87 — QUICK_QUIZ
  {
    dayOffset: 87,
    type: ChallengeType.QUICK_QUIZ,
    payload: {
      question: 'Which word means "Tongue/Language"?',
      options: ['بَنُون', 'لِسَان', 'رِجَال', 'عَالِم'],
      correctIndex: 1,
      correctMeaning: 'Lisan — Tongue, Language',
    },
  },

  // Day 88 — WORD_OF_THE_DAY
  {
    dayOffset: 88,
    type: ChallengeType.WORD_OF_THE_DAY,
    payload: {
      wordArabic: 'عَالِم',
      wordTransliteration: 'Aalim',
      wordMeaning: 'Scholar, Knower',
      fact: 'Aalim means "one who knows" — a scholar. It\'s the فَاعِل (doer) pattern from the root ع-ل-م. This is word #300 in your curriculum, and it circles back to word #1 (Ilm). The Qur\'an started you with knowledge and ends by calling you a knower. Appears 140 times.',
      frequency: 140,
    },
  },

  // Day 89 — MEMORY_TEST
  {
    dayOffset: 89,
    type: ChallengeType.MEMORY_TEST,
    payload: {
      wordArabic: 'وَاحِد',
      wordTransliteration: 'Wahid',
      question: 'What does وَاحِد (Wahid) mean?',
      options: ['First', 'Many', 'One/Single', 'Last'],
      correctIndex: 2,
    },
  },
];
