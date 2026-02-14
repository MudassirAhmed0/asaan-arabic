import { InsightType } from '@prisma/client';
import { InsightSeedData } from './insights-types';

export const INSIGHTS_L1_L20: InsightSeedData[] = [
  // ── Lesson 1: "Words You Already Know" ── ROOT_PATTERN
  {
    lessonOrderIndex: 1,
    type: InsightType.ROOT_PATTERN,
    title: 'Your first Arabic root: ر-ح-م',
    body: 'You just learned رَحْمَة (Rahmah/Mercy). In Arabic, most words grow from a 3-letter root. The root ر-ح-م (R-H-M) gives us Rahman, Raheem, and Rahmah — all connected to mercy. When you spot a root, you can guess the meaning of new words instantly.',
    examples: [
      {
        arabic: 'رَحْمَة',
        transliteration: 'Rahmah',
        meaning: 'Mercy',
        note: 'The noun form — what you learned in this lesson',
      },
      {
        arabic: 'رَحْمَٰن',
        transliteration: 'Rahman',
        meaning: 'The Most Merciful',
        note: 'Intensive form — overwhelming, universal mercy',
      },
      {
        arabic: 'رَحِيم',
        transliteration: 'Raheem',
        meaning: 'The Especially Merciful',
        note: 'Continuous form — personal, ongoing mercy',
      },
    ],
  },

  // ── Lesson 2: "The Foundations" ── CULTURAL_NOTE
  {
    lessonOrderIndex: 2,
    type: InsightType.CULTURAL_NOTE,
    title: 'Why the Qur\'an calls itself "Al-Kitab"',
    body: 'You learned كِتَاب (Kitab/Book) in this lesson. The Qur\'an often refers to itself as "Al-Kitab" — The Book. But it also calls the Torah and the Injeel (Gospel) by the same word. People who received earlier scriptures are called "Ahl al-Kitab" — People of the Book.',
    examples: [
      {
        arabic: 'ذَٰلِكَ الْكِتَابُ لَا رَيْبَ فِيهِ',
        transliteration: 'Dhalikal-kitabu la rayba feeh',
        meaning: 'This is the Book in which there is no doubt',
        note: 'The very beginning of Surah Al-Baqarah',
      },
      {
        arabic: 'أَهْلَ الْكِتَابِ',
        transliteration: 'Ahlal-Kitab',
        meaning: 'People of the Book',
        note: 'Jews and Christians who received earlier scriptures',
      },
      {
        arabic: 'آيَاتُ الْكِتَابِ',
        transliteration: 'Ayat-ul-Kitab',
        meaning: 'Signs/Verses of the Book',
        note: 'Both your lesson words — آيَة and كِتَاب — in one phrase',
      },
    ],
  },

  // ── Lesson 3: "Your World" ── GRAMMAR_TIP
  {
    lessonOrderIndex: 3,
    type: InsightType.GRAMMAR_TIP,
    title: 'How Arabic pairs opposites together',
    body: 'You learned أَرْض (Ard/Earth) and سَمَاء (Sama/Sky) in this lesson. Arabic loves to pair opposites to describe completeness. "The heavens and the earth" means all of creation. You\'ll see this pattern everywhere in the Qur\'an.',
    examples: [
      {
        arabic: 'السَّمَاوَاتِ وَالْأَرْضِ',
        transliteration: 'As-samawati wal-ard',
        meaning: 'The heavens and the earth',
        note: 'This pair means "all of creation"',
      },
      {
        arabic: 'الْحَيَاةَ وَالْمَوْتَ',
        transliteration: 'Al-hayata wal-mawt',
        meaning: 'Life and death',
        note: 'حَيَاة (Hayat) from this lesson paired with its opposite',
      },
      {
        arabic: 'النُّورَ وَالظُّلُمَاتِ',
        transliteration: 'An-noora waz-zulumat',
        meaning: 'Light and darkness',
        note: 'نُور (Noor) from this lesson paired with its opposite',
      },
    ],
  },

  // ── Lesson 4: "Actions That Matter" ── GRAMMAR_TIP
  {
    lessonOrderIndex: 4,
    type: InsightType.GRAMMAR_TIP,
    title: 'Nouns become verbs: عِلْم → عَلِمَ',
    body: 'In Lesson 1 you learned عِلْم (Ilm/knowledge). Now you\'ve met عَلِمَ (Alima/to know) — the verb form. Arabic builds both nouns and verbs from the same 3-letter root. Once you know the noun, you can often guess the verb, and vice versa.',
    examples: [
      {
        arabic: 'عِلْم → عَلِمَ',
        transliteration: 'Ilm → Alima',
        meaning: 'Knowledge → to know',
        note: 'Root: ع-ل-م (Ain-Lam-Mim)',
      },
      {
        arabic: 'هُدَى → هَدَى',
        transliteration: 'Huda → Hada',
        meaning: 'Guidance → to guide',
        note: 'Root: ه-د-ي — you learned both across Lessons 1 and 4',
      },
      {
        arabic: 'خَلْق → خَلَقَ',
        transliteration: 'Khalq → Khalaqa',
        meaning: 'Creation → to create',
        note: 'Root: خ-ل-ق — خَلَقَ is from this lesson',
      },
    ],
  },

  // ── Lesson 5: "Rewards and Consequences" ── WORD_FAMILY
  {
    lessonOrderIndex: 5,
    type: InsightType.WORD_FAMILY,
    title: 'The غ-ف-ر family: covering and forgiving',
    body: 'You learned مَغْفِرَة (Maghfirah/Forgiveness) in this lesson. The root غ-ف-ر literally means "to cover." Allah\'s forgiveness covers your sins. This root gives us some of the most beautiful names and words in the Qur\'an.',
    examples: [
      {
        arabic: 'مَغْفِرَة',
        transliteration: 'Maghfirah',
        meaning: 'Forgiveness',
        note: 'The noun — what you learned in this lesson',
      },
      {
        arabic: 'غَفُور',
        transliteration: 'Ghafoor',
        meaning: 'Most Forgiving',
        note: 'One of Allah\'s most frequently mentioned names',
      },
      {
        arabic: 'اسْتَغْفَرَ',
        transliteration: 'Istaghfara',
        meaning: 'To seek forgiveness',
        note: 'The root of "Astaghfirullah" — you say this daily',
      },
    ],
  },

  // ── Lesson 6: "Faith and Belief" ── ROOT_PATTERN
  {
    lessonOrderIndex: 6,
    type: InsightType.ROOT_PATTERN,
    title: 'The أ-م-ن root: faith, trust, and safety',
    body: 'This lesson is a masterclass in Arabic roots. آمَنَ (to believe), إيمَان (faith), and مُؤْمِن (believer) — all come from the root أ-م-ن. This root connects belief with security and trust. A مُؤْمِن isn\'t just someone who believes — they\'re someone who finds safety in their faith.',
    examples: [
      {
        arabic: 'آمَنَ',
        transliteration: 'Aamana',
        meaning: 'To believe',
        note: 'The verb — the action of believing',
      },
      {
        arabic: 'إيمَان',
        transliteration: 'Iman',
        meaning: 'Faith',
        note: 'The noun — the state of believing',
      },
      {
        arabic: 'مُؤْمِن',
        transliteration: 'Mu\'min',
        meaning: 'Believer',
        note: 'The person — one who believes. Also one of Allah\'s names.',
      },
    ],
  },

  // ── Lesson 7: "People of the Qur'an" ── CULTURAL_NOTE
  {
    lessonOrderIndex: 7,
    type: InsightType.CULTURAL_NOTE,
    title: 'Why the Qur\'an calls prophets servants, not kings',
    body: 'You learned عَبْد (Abd/Servant) in this lesson. In the Qur\'an, the highest title for a human being isn\'t "king" or "master" — it\'s "servant of Allah." Prophet Muhammad ﷺ is honored as "Abduhu" (His servant). The word عَبْد connects to عَبَدَ (to worship) from Lesson 6.',
    examples: [
      {
        arabic: 'سُبْحَانَ الَّذِي أَسْرَىٰ بِعَبْدِهِ',
        transliteration: 'Subhanal-ladhi asra bi-abdihi',
        meaning: 'Glory to the One who took His servant by night',
        note: 'Allah honors the Prophet ﷺ by calling him "His servant"',
      },
      {
        arabic: 'عَبْدُ اللَّهِ',
        transliteration: 'Abdullah',
        meaning: 'Servant of Allah',
        note: 'The most beloved name to Allah — combining عَبْد + اللَّه',
      },
      {
        arabic: 'يَا قَوْمِ اعْبُدُوا اللَّهَ',
        transliteration: 'Ya qawmi-\'budu-llah',
        meaning: 'O my people, worship Allah',
        note: 'Two lesson words together — قَوْم and عَبَدَ',
      },
    ],
  },

  // ── Lesson 8: "Your Daily Worship" ── PATTERN_RECOGNITION
  {
    lessonOrderIndex: 8,
    type: InsightType.PATTERN_RECOGNITION,
    title: 'Spot the pattern: words ending in ـة',
    body: 'Notice how many words in this lesson end with ة (ta marbuta)? صَلَاة (Salah), نِعْمَة (Ni\'mah), حِكْمَة (Hikmah). In Arabic, this ending often marks a noun — especially abstract concepts. When you see ـة at the end of a word, you\'re likely looking at a "thing" rather than an action.',
    examples: [
      {
        arabic: 'صَلَاة',
        transliteration: 'Salah',
        meaning: 'Prayer',
        note: 'Abstract concept — the act of praying',
      },
      {
        arabic: 'حِكْمَة',
        transliteration: 'Hikmah',
        meaning: 'Wisdom',
        note: 'Abstract quality — ends in ـة',
      },
      {
        arabic: 'نِعْمَة',
        transliteration: 'Ni\'mah',
        meaning: 'Blessing',
        note: 'Also رَحْمَة (Lesson 1) and مَغْفِرَة (Lesson 5) follow this pattern',
      },
    ],
  },

  // ── Lesson 9: "Powerful Verbs" ── GRAMMAR_TIP
  {
    lessonOrderIndex: 9,
    type: InsightType.GRAMMAR_TIP,
    title: 'Past tense in Arabic: just 3 letters',
    body: 'Every verb in this lesson — قَالَ (he said), دَعَا (he called), غَفَرَ (he forgave), ذَكَرَ (he remembered) — is in the past tense. In Arabic, the simplest form of a verb is the past tense "he did" form. It\'s usually just 3 letters. This is the base from which all other forms are built.',
    examples: [
      {
        arabic: 'قَالَ',
        transliteration: 'Qala',
        meaning: 'He said',
        note: 'The most frequent verb in the Qur\'an — 1,618 times',
      },
      {
        arabic: 'غَفَرَ',
        transliteration: 'Ghafara',
        meaning: 'He forgave',
        note: 'Same root as مَغْفِرَة (forgiveness) from Lesson 5',
      },
      {
        arabic: 'ذَكَرَ',
        transliteration: 'Dhakara',
        meaning: 'He remembered',
        note: 'Root of "dhikr" (remembrance of Allah)',
      },
    ],
  },

  // ── Lesson 10: "The Journey" ── WORD_FAMILY
  {
    lessonOrderIndex: 10,
    type: InsightType.WORD_FAMILY,
    title: 'Two words for "path" — and they\'re different',
    body: 'You learned both سَبِيل (Sabeel) and صِرَاط (Sirat) in this lesson. Both mean "path," but the Qur\'an uses them differently. صِرَاط is the straight, clear highway — used in Al-Fatiha. سَبِيل is a broader way or cause — used in "fi sabeel illah" (in the path of Allah).',
    examples: [
      {
        arabic: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ',
        transliteration: 'Ihdinas-siratal-mustaqeem',
        meaning: 'Guide us to the straight path',
        note: 'صِرَاط — the direct, clear highway of truth',
      },
      {
        arabic: 'فِي سَبِيلِ اللَّهِ',
        transliteration: 'Fi sabeel illah',
        meaning: 'In the path of Allah',
        note: 'سَبِيل — a broader way, cause, or pursuit',
      },
      {
        arabic: 'يَوْمَ الْحِسَابِ',
        transliteration: 'Yawmal-hisab',
        meaning: 'Day of Reckoning',
        note: 'يَوْم from this lesson — the day every path leads to',
      },
    ],
  },

  // ── Lesson 11: "What Comes Next" ── PATTERN_RECOGNITION
  {
    lessonOrderIndex: 11,
    type: InsightType.PATTERN_RECOGNITION,
    title: 'Spot the pattern: Qur\'anic pairs that balance each other',
    body: 'This lesson is full of Qur\'anic pairs. دُنْيَا (this world) and آخِرَة (the next). The Qur\'an mentions both exactly 115 times each. When the Qur\'an warns about the dunya, it always points toward the akhirah. These words are designed to be understood together.',
    examples: [
      {
        arabic: 'الدُّنْيَا وَالْآخِرَة',
        transliteration: 'Ad-dunya wal-akhirah',
        meaning: 'This world and the Hereafter',
        note: 'Both appear exactly 115 times — a perfect Qur\'anic balance',
      },
      {
        arabic: 'يَوْمَ الْقِيَامَةِ',
        transliteration: 'Yawmal-Qiyamah',
        meaning: 'Day of Resurrection',
        note: 'قِيَامَة from this lesson combined with يَوْم from Lesson 10',
      },
      {
        arabic: 'سَرِيعُ الْحِسَابِ',
        transliteration: 'Saree\'ul-hisab',
        meaning: 'Swift in reckoning',
        note: 'حِسَاب from this lesson — Allah\'s accounting is instant',
      },
    ],
  },

  // ── Lesson 12: "Heart and Mind" ── CULTURAL_NOTE
  {
    lessonOrderIndex: 12,
    type: InsightType.CULTURAL_NOTE,
    title: 'In the Qur\'an, your heart thinks — not just feels',
    body: 'You learned قَلْب (Qalb/Heart) and عَقْل (Aql/Reason) in this lesson. In modern culture, the heart feels and the brain thinks. But in the Qur\'an, the قَلْب is where understanding, faith, and decision-making happen. A "sealed heart" means someone who can\'t understand truth — not just someone who\'s cold.',
    examples: [
      {
        arabic: 'خَتَمَ اللَّهُ عَلَىٰ قُلُوبِهِمْ',
        transliteration: 'Khatam-Allahu ala quloobihim',
        meaning: 'Allah has sealed their hearts',
        note: 'Sealed hearts = inability to understand, not just feel',
      },
      {
        arabic: 'أَفَلَا تَعْقِلُونَ',
        transliteration: 'Afala ta\'qiloon',
        meaning: 'Will you not use your reason?',
        note: 'عَقْل in action — the Qur\'an demands you think',
      },
      {
        arabic: 'إِنَّ فِي ذَٰلِكَ لَذِكْرَىٰ لِمَن كَانَ لَهُ قَلْبٌ',
        transliteration: 'Inna fi dhalika la-dhikra liman kana lahu qalb',
        meaning: 'In that is a reminder for whoever has a heart',
        note: 'Having a "heart" means having understanding',
      },
    ],
  },

  // ── Lesson 13: "Coming and Going" ── GRAMMAR_TIP
  {
    lessonOrderIndex: 13,
    type: InsightType.GRAMMAR_TIP,
    title: 'Opposite verbs come in pairs',
    body: 'This lesson taught you دَخَلَ (to enter) and خَرَجَ (to go out), جَاءَ (to come) and رَجَعَ (to return). Arabic verbs often come in natural pairs. When you learn one, look for its opposite — you\'ll double your vocabulary instantly.',
    examples: [
      {
        arabic: 'دَخَلَ ↔ خَرَجَ',
        transliteration: 'Dakhala ↔ Kharaja',
        meaning: 'To enter ↔ To go out',
        note: 'Enter Jannah, exit darkness — the Qur\'an uses both',
      },
      {
        arabic: 'جَاءَ ↔ رَجَعَ',
        transliteration: 'Ja\'a ↔ Raja\'a',
        meaning: 'To come ↔ To return',
        note: '"Inna lillahi wa inna ilayhi raji\'oon" uses رَجَعَ',
      },
      {
        arabic: 'ادْخُلُوا الْجَنَّةَ',
        transliteration: 'Udkhulul-Jannah',
        meaning: 'Enter Paradise',
        note: 'دَخَلَ combined with جَنَّة from Lesson 5',
      },
    ],
  },

  // ── Lesson 14: "Good and Evil" ── PATTERN_RECOGNITION
  {
    lessonOrderIndex: 14,
    type: InsightType.PATTERN_RECOGNITION,
    title: 'Spot the pattern: adjectives that describe people',
    body: 'This lesson is full of adjectives: صَالِح (righteous), عَظِيم (great), كَبِير (big). In Arabic, these adjectives can describe things or people. When the Qur\'an says "amilus-salihaat" (do righteous deeds), صَالِح becomes an adjective for actions. When it says "Allahu Akbar," كَبِير becomes a description of Allah.',
    examples: [
      {
        arabic: 'خَيْرٌ وَشَرٌّ',
        transliteration: 'Khayrun wa sharr',
        meaning: 'Good and evil',
        note: 'The ultimate Qur\'anic pair — every atom\'s weight will be seen',
      },
      {
        arabic: 'عَمِلُوا الصَّالِحَاتِ',
        transliteration: 'Amilus-salihat',
        meaning: 'Did righteous deeds',
        note: 'صَالِح as an adjective for deeds — paired with عَمِلَ from Lesson 4',
      },
      {
        arabic: 'اللَّهُ أَكْبَرُ',
        transliteration: 'Allahu Akbar',
        meaning: 'Allah is the Greatest',
        note: 'أَكْبَر is the comparative form of كَبِير',
      },
    ],
  },

  // ── Lesson 15: "Day and Night" ── ROOT_PATTERN
  {
    lessonOrderIndex: 15,
    type: InsightType.ROOT_PATTERN,
    title: 'The ش-م-س and ق-م-ر roots: sun and moon families',
    body: 'You learned شَمْس (Shams/Sun) and قَمَر (Qamar/Moon) in this lesson. In Arabic grammar, these two words are so fundamental that the letters of the alphabet are classified as either "shamsi" (sun letters) or "qamari" (moon letters) based on how they interact with "Al" (the).',
    examples: [
      {
        arabic: 'وَالشَّمْسِ وَضُحَاهَا',
        transliteration: 'Wash-shamsi wa duhaha',
        meaning: 'By the sun and its brightness',
        note: 'Allah swears by the شَمْس in Surah Ash-Shams',
      },
      {
        arabic: 'اقْتَرَبَتِ السَّاعَةُ وَانشَقَّ الْقَمَرُ',
        transliteration: 'Iqtarabatis-sa\'atu wanshaqq-al-qamar',
        meaning: 'The Hour has drawn near and the moon has split',
        note: 'Opening of Surah Al-Qamar',
      },
      {
        arabic: 'وَاللَّيْلِ إِذَا يَغْشَىٰ',
        transliteration: 'Wal-layli idha yaghsha',
        meaning: 'By the night when it covers',
        note: 'لَيْل from this lesson — Allah swears by the night too',
      },
    ],
  },

  // ── Lesson 16: "Seeing and Sending" ── WORD_FAMILY
  {
    lessonOrderIndex: 16,
    type: InsightType.WORD_FAMILY,
    title: 'The ر-س-ل family: sending and messengers',
    body: 'You learned أَرْسَلَ (Arsala/to send) in this lesson. Remember رَسُول (Rasool/Messenger) from Lesson 2? They share the root ر-س-ل. Allah أَرْسَلَ (sent) His رَسُول (messenger) with a رِسَالَة (message). One root, an entire story of revelation.',
    examples: [
      {
        arabic: 'أَرْسَلَ',
        transliteration: 'Arsala',
        meaning: 'To send',
        note: 'The verb — the act of sending',
      },
      {
        arabic: 'رَسُول',
        transliteration: 'Rasool',
        meaning: 'Messenger',
        note: 'The person sent — from Lesson 2',
      },
      {
        arabic: 'رِسَالَة',
        transliteration: 'Risalah',
        meaning: 'Message',
        note: 'What the messenger carries — same root ر-س-ل',
      },
    ],
  },

  // ── Lesson 17: "Religion and Identity" ── PATTERN_RECOGNITION
  {
    lessonOrderIndex: 17,
    type: InsightType.PATTERN_RECOGNITION,
    title: 'Spot the pattern: words that describe people\'s identities',
    body: 'This lesson is full of identity words: مُسْلِم (one who submits), كَافِر (one who covers/disbelieves), مُنَافِق (one who is two-faced). Notice how Arabic creates "person" words from verbs. Each identity is defined by an action — you are what you do.',
    examples: [
      {
        arabic: 'مُسْلِم ← أَسْلَمَ',
        transliteration: 'Muslim ← Aslama',
        meaning: 'One who submits ← to submit',
        note: 'Your identity comes from the verb "to submit to Allah"',
      },
      {
        arabic: 'كَافِر ← كَفَرَ',
        transliteration: 'Kafir ← Kafara',
        meaning: 'Disbeliever ← to disbelieve',
        note: 'كَفَرَ from Lesson 6 becomes the person كَافِر',
      },
      {
        arabic: 'مُنَافِق ← نَافَقَ',
        transliteration: 'Munafiq ← Nafaqa',
        meaning: 'Hypocrite ← to act hypocritically',
        note: 'The root ن-ف-ق also relates to a tunnel with two exits',
      },
    ],
  },

  // ── Lesson 18: "Giving and Spending" ── CULTURAL_NOTE
  {
    lessonOrderIndex: 18,
    type: InsightType.CULTURAL_NOTE,
    title: 'Why the Qur\'an talks so much about spending',
    body: 'You learned آتَى (to give), أَنْفَقَ (to spend), and زَكَاة (purifying charity) in this lesson. The Qur\'an pairs صَلَاة (prayer) with زَكَاة (charity) dozens of times — worship isn\'t complete without generosity. Your connection to Allah and your connection to people are inseparable.',
    examples: [
      {
        arabic: 'وَأَقِيمُوا الصَّلَاةَ وَآتُوا الزَّكَاةَ',
        transliteration: 'Wa aqimus-salata wa atuz-zakah',
        meaning: 'Establish prayer and give zakah',
        note: 'The Qur\'an\'s most repeated command pair',
      },
      {
        arabic: 'وَأَنفِقُوا فِي سَبِيلِ اللَّهِ',
        transliteration: 'Wa anfiqu fi sabeel illah',
        meaning: 'And spend in the path of Allah',
        note: 'أَنْفَقَ from this lesson + سَبِيل from Lesson 10',
      },
      {
        arabic: 'ذُو الْفَضْلِ الْعَظِيمِ',
        transliteration: 'Dhul-fadlil-azeem',
        meaning: 'Possessor of great bounty',
        note: 'فَضْل from this lesson — Allah\'s giving has no limit',
      },
    ],
  },

  // ── Lesson 19: "Power and Authority" ── ROOT_PATTERN
  {
    lessonOrderIndex: 19,
    type: InsightType.ROOT_PATTERN,
    title: 'The م-ل-ك root: kings, kingdoms, and ownership',
    body: 'You learned مَلِك (Malik/King) and مُلْك (Mulk/Dominion) in this lesson — both from the root م-ل-ك. This root gives us an entire world of power and ownership. You say "Maliki Yawm id-Deen" in every prayer — now you know exactly which root you\'re using.',
    examples: [
      {
        arabic: 'مَلِك',
        transliteration: 'Malik',
        meaning: 'King, Sovereign',
        note: 'The person who rules — one of Allah\'s names',
      },
      {
        arabic: 'مُلْك',
        transliteration: 'Mulk',
        meaning: 'Dominion, Kingdom',
        note: 'The realm that is ruled — Surah Al-Mulk',
      },
      {
        arabic: 'مَالِك',
        transliteration: 'Maalik',
        meaning: 'Owner, Master',
        note: '"Maliki Yawm id-Deen" — Owner of the Day of Judgment',
      },
    ],
  },

  // ── Lesson 20: "Desire and Will" ── WORD_FAMILY
  {
    lessonOrderIndex: 20,
    type: InsightType.WORD_FAMILY,
    title: 'The emotions that move us: will, love, fear, and pleasure',
    body: 'This lesson brought together the deepest human emotions: شَاءَ (to will), أَحَبَّ (to love), خَافَ (to fear), رَضِيَ (to be pleased). The Qur\'an doesn\'t just command — it speaks to your heart. Allah wills, loves, and is pleased. These aren\'t just verbs — they\'re how Allah relates to you.',
    examples: [
      {
        arabic: 'إِن شَاءَ اللَّهُ',
        transliteration: 'In sha\' Allah',
        meaning: 'If Allah wills',
        note: 'You say this daily — شَاءَ is the verb at its heart',
      },
      {
        arabic: 'يُحِبُّهُمْ وَيُحِبُّونَهُ',
        transliteration: 'Yuhibbuhum wa yuhibbunahu',
        meaning: 'He loves them and they love Him',
        note: 'أَحَبَّ — a mutual love between Allah and His believers',
      },
      {
        arabic: 'رَّضِيَ اللَّهُ عَنْهُمْ وَرَضُوا عَنْهُ',
        transliteration: 'Radiy-Allahu anhum wa radu anhu',
        meaning: 'Allah is pleased with them and they are pleased with Him',
        note: 'رَضِيَ — your 100th word, the ultimate destination',
      },
    ],
  },
];
