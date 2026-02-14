import { InsightType } from '@prisma/client';
import { InsightSeedData } from './insights-types';

export const INSIGHTS_L21_L40: InsightSeedData[] = [
  // ── Lesson 21: From, In, On ── GRAMMAR_TIP
  {
    lessonOrderIndex: 21,
    type: InsightType.GRAMMAR_TIP,
    title: 'Five Tiny Words That Build Every Sentence',
    body: 'Arabic prepositions are short — often just two or three letters — but they carry enormous weight. مِن (from), فِي (in), عَلَى (upon), إِلَى (to), and عَن (about) connect nouns to verbs and give sentences direction and meaning. Master these five and you unlock the skeleton of almost every Qur\'anic ayah.',
    examples: [
      {
        arabic: 'مِنَ السَّمَاءِ',
        transliteration: 'Minas-samaa\'i',
        meaning: 'From the sky',
        note: 'مِن shows origin — where something comes from',
      },
      {
        arabic: 'فِي الْأَرْضِ',
        transliteration: 'Fil-ardi',
        meaning: 'In the earth',
        note: 'فِي shows location — where something is',
      },
      {
        arabic: 'عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
        transliteration: 'Ala kulli shay\'in qadir',
        meaning: 'Over everything, capable',
        note: 'عَلَى shows what something is upon or over',
      },
    ],
  },

  // ── Lesson 22: The Connecting Words ── GRAMMAR_TIP
  {
    lessonOrderIndex: 22,
    type: InsightType.GRAMMAR_TIP,
    title: 'The Glue That Holds Qur\'anic Sentences Together',
    body: 'Particles like إِنَّ (indeed), لَا (not), كُلّ (every), إِلَّا (except), and قَدْ (certainly) don\'t have physical meanings — you can\'t see or touch them. But they shape how the Qur\'an delivers its message: emphasizing, negating, universalizing, and making exceptions. They are the invisible architecture of Arabic.',
    examples: [
      {
        arabic: 'إِنَّ اللَّهَ غَفُورٌ رَحِيمٌ',
        transliteration: 'Innallaha Ghafoorun Rahim',
        meaning: 'Indeed, Allah is Forgiving, Merciful',
        note: 'إِنَّ adds emphasis — "truly, certainly"',
      },
      {
        arabic: 'كُلُّ نَفْسٍ ذَائِقَةُ الْمَوْتِ',
        transliteration: 'Kullu nafsin dha\'iqatul-mawt',
        meaning: 'Every soul shall taste death',
        note: 'كُلّ makes it universal — no exceptions',
      },
      {
        arabic: 'لَا إِلَهَ إِلَّا اللَّهُ',
        transliteration: 'La ilaha illallah',
        meaning: 'There is no god except Allah',
        note: 'لَا negates, إِلَّا creates the exception',
      },
    ],
  },

  // ── Lesson 23: Who, Which, This, That ── GRAMMAR_TIP
  {
    lessonOrderIndex: 23,
    type: InsightType.GRAMMAR_TIP,
    title: 'Pointing and Connecting in Arabic',
    body: 'Arabic has two sets of pointer words: demonstratives (هَذَا for "this" and ذَلِكَ for "that") and relatives (الَّذِي for "who/which" and مَنْ for "whoever"). Demonstratives point to things, while relatives connect descriptions to people or things. Together, they let the Qur\'an build rich, layered sentences.',
    examples: [
      {
        arabic: 'ذَلِكَ الْكِتَابُ لَا رَيْبَ فِيهِ',
        transliteration: 'Dhalikal-kitabu la rayba fih',
        meaning: 'That is the Book in which there is no doubt',
        note: 'ذَلِكَ points to the Qur\'an with reverence',
      },
      {
        arabic: 'الَّذِينَ يُؤْمِنُونَ بِالْغَيْبِ',
        transliteration: 'Alladhina yu\'minuna bil-ghayb',
        meaning: 'Those who believe in the unseen',
        note: 'الَّذِينَ connects "those" to the description',
      },
      {
        arabic: 'مَنْ يَعْمَلْ سُوءًا يُجْزَ بِهِ',
        transliteration: 'Man ya\'mal su\'an yujza bih',
        meaning: 'Whoever does evil will be recompensed for it',
        note: 'مَنْ sets a universal condition — whoever',
      },
    ],
  },

  // ── Lesson 24: Saying No ── GRAMMAR_TIP
  {
    lessonOrderIndex: 24,
    type: InsightType.GRAMMAR_TIP,
    title: 'Arabic Has a Different "Not" for Every Situation',
    body: 'English has one word for "not," but Arabic is far more precise. لَمْ negates the past ("did not"), لَا negates the present ("does not"), and لَنْ negates the future ("will never"). Even بَلْ (rather) and هَلْ (is it?) shift the direction of a sentence. When you hear negation in the Qur\'an, listen carefully — the specific word tells you exactly what is being denied, and when.',
    examples: [
      {
        arabic: 'لَمْ يَلِدْ وَلَمْ يُولَدْ',
        transliteration: 'Lam yalid wa lam yulad',
        meaning: 'He did not beget, nor was He begotten',
        note: 'لَمْ negates the past — it never happened',
      },
      {
        arabic: 'لَنْ تَنَالُوا الْبِرَّ',
        transliteration: 'Lan tanalul-birra',
        meaning: 'You will never attain goodness',
        note: 'لَنْ negates the future — emphatically',
      },
      {
        arabic: 'بَلْ هُوَ قُرْآنٌ مَجِيدٌ',
        transliteration: 'Bal huwa Qur\'anun majeed',
        meaning: 'Rather, it is a glorious Qur\'an',
        note: 'بَلْ corrects — "No! Rather, the truth is..."',
      },
    ],
  },

  // ── Lesson 25: Things and Places ── CULTURAL_NOTE
  {
    lessonOrderIndex: 25,
    type: InsightType.CULTURAL_NOTE,
    title: 'Every Place in Islam Has a Meaning Behind Its Name',
    body: 'Arabic doesn\'t just name places randomly — each word carries its purpose. مَسْجِد (mosque) literally means "place of prostration," from the verb سَجَدَ. بَيْت (house) is the word used for the Ka\'bah — "Bayt Allah." Even دَار (abode) appears in "Dar us-Salaam," the name for Paradise. When you learn these words, you discover that Islamic architecture and geography carry spiritual meaning in their very names.',
    examples: [
      {
        arabic: 'مَسْجِد',
        transliteration: 'Masjid',
        meaning: 'Mosque — place of prostration',
        note: 'From سَجَدَ (to prostrate) + the مَفْعِل place pattern',
      },
      {
        arabic: 'بَيْتُ اللَّهِ',
        transliteration: 'Baytullah',
        meaning: 'House of Allah (the Ka\'bah)',
        note: 'بَيْت means house — the Ka\'bah is the first بَيْت built for worship',
      },
      {
        arabic: 'دَارُ السَّلَامِ',
        transliteration: 'Dar us-Salaam',
        meaning: 'The Abode of Peace (Paradise)',
        note: 'دَار means dwelling — Paradise is the eternal dwelling of peace',
      },
    ],
  },

  // ── Lesson 26: Words and Speech ── ROOT_PATTERN
  {
    lessonOrderIndex: 26,
    type: InsightType.ROOT_PATTERN,
    title: 'Three Roots, Three Kinds of Speech',
    body: 'This lesson\'s words come from three different roots, each describing a different kind of speech. ك-ل-م gives us كَلِمَة (word) — the building block of language. ق-و-ل gives us قَوْل (saying) — speech as action. ذ-ك-ر gives us ذِكْر (remembrance) — speech directed at Allah. Arabic distinguishes not just what you say, but the nature and purpose of your words.',
    examples: [
      {
        arabic: 'كَلِمَاتُ اللَّهِ',
        transliteration: 'Kalimaatullah',
        meaning: 'The Words of Allah',
        note: 'Root ك-ل-م — كَلِمَة is a single word, كَلِمَات is the plural',
      },
      {
        arabic: 'قَالَ رَبُّكُمْ',
        transliteration: 'Qaala Rabbukum',
        meaning: 'Your Lord said',
        note: 'Root ق-و-ل — قَوْل is the saying, قَالَ is the verb "he said"',
      },
      {
        arabic: 'أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ',
        transliteration: 'Ala bi-dhikrillahi tatma\'innul-qulub',
        meaning: 'Verily, in the remembrance of Allah do hearts find rest',
        note: 'Root ذ-ك-ر — ذِكْر is remembrance directed toward Allah',
      },
    ],
  },

  // ── Lesson 27: Obedience and Rebellion ── WORD_FAMILY
  {
    lessonOrderIndex: 27,
    type: InsightType.WORD_FAMILY,
    title: 'The Spectrum from Obedience to Rebellion — and Back',
    body: 'This lesson\'s five words form a moral spectrum. أَطَاعَ (to obey) is on one end, عَصَى (to disobey) and كَذَّبَ (to deny) are on the other. But the Qur\'an never leaves you stuck — تَابَ (to repent) is always the bridge back, and نَجَّى (to save) is what Allah does when you cross that bridge. The journey from rebellion to salvation is built into these words.',
    examples: [
      {
        arabic: 'أَطِيعُوا اللَّهَ وَأَطِيعُوا الرَّسُولَ',
        transliteration: 'Ati\'ullaha wa ati\'ur-Rasula',
        meaning: 'Obey Allah and obey the Messenger',
        note: 'أَطَاعَ — obedience is the starting point',
      },
      {
        arabic: 'تَابُوا وَأَصْلَحُوا',
        transliteration: 'Tabu wa aslahu',
        meaning: 'They repented and reformed',
        note: 'تَابَ — repentance is always the way back',
      },
      {
        arabic: 'فَأَنْجَيْنَاهُ وَأَهْلَهُ',
        transliteration: 'Fa-anjaynahu wa ahlahu',
        meaning: 'So We saved him and his family',
        note: 'نَجَّى — Allah saves those who return to Him',
      },
    ],
  },

  // ── Lesson 28: Promises and Warnings ── PATTERN_RECOGNITION
  {
    lessonOrderIndex: 28,
    type: InsightType.PATTERN_RECOGNITION,
    title: 'Warning and Good News Always Come as a Pair',
    body: 'Notice a beautiful pattern in the Qur\'an: أَنْذَرَ (to warn) and بَشَّرَ (to give glad tidings) almost always appear together. Every prophet was both a نَذِير (warner) and a بَشِير (bearer of good news). Even وَعْد (promise) and سَوْفَ (shall/will) carry both hope and caution. The Qur\'an never delivers fear without hope, or hope without accountability.',
    examples: [
      {
        arabic: 'بَشِيرًا وَنَذِيرًا',
        transliteration: 'Bashiran wa nadhira',
        meaning: 'A bearer of good news and a warner',
        note: 'بَشَّرَ and أَنْذَرَ appear side by side — always balanced',
      },
      {
        arabic: 'وَعَدَ اللَّهُ الَّذِينَ آمَنُوا',
        transliteration: 'Wa\'adallahul-ladhina amanu',
        meaning: 'Allah has promised those who believe',
        note: 'وَعَدَ — Allah\'s promises are always followed by something beautiful',
      },
      {
        arabic: 'سَوْفَ تَعْلَمُونَ',
        transliteration: 'Sawfa ta\'lamun',
        meaning: 'You shall come to know',
        note: 'سَوْفَ — the future tense carries certainty and weight',
      },
    ],
  },

  // ── Lesson 29: Allah's Beautiful Names ── ROOT_PATTERN
  {
    lessonOrderIndex: 29,
    type: InsightType.ROOT_PATTERN,
    title: 'The فَعِيل Pattern: How Allah\'s Names Are Built',
    body: 'Most of Allah\'s Names in this lesson follow the فَعِيل (fa\'eel) pattern, which means "one who does something intensely and constantly." عَلِيم (All-Knowing), رَحِيم (Most Merciful), غَفُور (Most Forgiving), سَمِيع (All-Hearing), حَكِيم (All-Wise) — the pattern itself tells you these aren\'t one-time qualities. They are permanent, infinite, and ever-active attributes of Allah.',
    examples: [
      {
        arabic: 'عَلِيمٌ حَكِيمٌ',
        transliteration: 'Aleemun Hakeem',
        meaning: 'All-Knowing, All-Wise',
        note: 'Both follow فَعِيل — from عِلْم (knowledge) and حِكْمَة (wisdom)',
      },
      {
        arabic: 'غَفُورٌ رَحِيمٌ',
        transliteration: 'Ghafoorun Rahim',
        meaning: 'Most Forgiving, Most Merciful',
        note: 'The most frequent divine name pair in the Qur\'an — 72 times',
      },
      {
        arabic: 'إِنَّ اللَّهَ سَمِيعٌ بَصِيرٌ',
        transliteration: 'Innallaha Sami\'un Basir',
        meaning: 'Indeed, Allah is All-Hearing, All-Seeing',
        note: 'سَمِيع follows فَعِيل — He hears everything, always',
      },
    ],
  },

  // ── Lesson 30: Covenants and Testimony ── CULTURAL_NOTE
  {
    lessonOrderIndex: 30,
    type: InsightType.CULTURAL_NOTE,
    title: 'The Qur\'an\'s Courtroom: Covenants, Witnesses, and Judgment',
    body: 'This lesson\'s vocabulary reads like a divine courtroom. عَهْد (covenant) is the agreement between Allah and humanity. شَهِيد (witness) is the one who testifies to truth. حُكْم (judgment) is the final ruling. Even مَثَل (parable) serves as evidence — stories presented so we can learn. The Qur\'an frames our relationship with Allah through accountability, testimony, and justice.',
    examples: [
      {
        arabic: 'وَأَوْفُوا بِعَهْدِي أُوفِ بِعَهْدِكُمْ',
        transliteration: 'Wa awfu bi-ahdi ufi bi-ahdikum',
        meaning: 'Fulfill My covenant, I will fulfill yours',
        note: 'عَهْد — a two-way covenant between Allah and believers',
      },
      {
        arabic: 'وَكَفَى بِاللَّهِ شَهِيدًا',
        transliteration: 'Wa kafa billahi shahida',
        meaning: 'And Allah is sufficient as a Witness',
        note: 'شَهِيد — Allah Himself is the ultimate witness',
      },
      {
        arabic: 'إِنِ الْحُكْمُ إِلَّا لِلَّهِ',
        transliteration: 'Inil-hukmu illa lillah',
        meaning: 'Judgment belongs to none but Allah',
        note: 'حُكْم — the final ruling is always with Allah',
      },
    ],
  },

  // ── Lesson 31: The Essential Verb ── GRAMMAR_TIP
  {
    lessonOrderIndex: 31,
    type: InsightType.GRAMMAR_TIP,
    title: 'كَانَ With Allah Means "Always Has Been and Still Is"',
    body: 'Here\'s a grammar secret that changes how you read the Qur\'an: when كَانَ (was/to be) is used with Allah, it does NOT mean "was" in the past tense. "Kana Allahu Ghafuran Rahima" doesn\'t mean Allah WAS forgiving — it means He has always been and continues to be forgiving. Similarly, لَيْسَ (is not) makes permanent negations, and وَجَدَ (to find) describes Allah discovering us in our moments of need.',
    examples: [
      {
        arabic: 'وَكَانَ اللَّهُ غَفُورًا رَحِيمًا',
        transliteration: 'Wa kanallahu Ghafuran Rahima',
        meaning: 'And Allah is [ever] Forgiving, Merciful',
        note: 'كَانَ with Allah = eternal attribute, not past tense',
      },
      {
        arabic: 'لَيْسَ كَمِثْلِهِ شَيْءٌ',
        transliteration: 'Laysa kamithlihi shay\'',
        meaning: 'There is nothing like Him',
        note: 'لَيْسَ negates existence — nothing resembles Allah, ever',
      },
      {
        arabic: 'وَوَجَدَكَ ضَالًّا فَهَدَى',
        transliteration: 'Wa wajadaka dallan fahada',
        meaning: 'And He found you lost, then guided you',
        note: 'وَجَدَ — Allah finds us when we need Him most',
      },
    ],
  },

  // ── Lesson 32: The Human Being ── CULTURAL_NOTE
  {
    lessonOrderIndex: 32,
    type: InsightType.CULTURAL_NOTE,
    title: 'The Human Body in the Qur\'an Is Always Symbolic',
    body: 'When the Qur\'an mentions body parts, it\'s rarely just physical. وَجْه (face) represents one\'s essence and direction — "the Face of Allah" means His presence. يَد (hand) symbolizes power and action. عَيْن (eye) means both the organ of sight and a flowing spring. Even إِنْسَان (human) carries the root meaning of "forgetfulness" — reminding us why we need the Qur\'an.',
    examples: [
      {
        arabic: 'فَثَمَّ وَجْهُ اللَّهِ',
        transliteration: 'Fa-thamma wajhullah',
        meaning: 'There is the Face of Allah',
        note: 'وَجْه — not a physical face, but Allah\'s presence and essence',
      },
      {
        arabic: 'يَدُ اللَّهِ فَوْقَ أَيْدِيهِمْ',
        transliteration: 'Yadullahi fawqa aydihim',
        meaning: 'The Hand of Allah is above their hands',
        note: 'يَد — symbolizes Allah\'s power and authority',
      },
      {
        arabic: 'إِنَّ الْإِنْسَانَ خُلِقَ هَلُوعًا',
        transliteration: 'Innal-insana khuliqa halu\'a',
        meaning: 'Indeed, the human was created anxious',
        note: 'إِنْسَان — the Qur\'an is honest about human nature',
      },
    ],
  },

  // ── Lesson 33: Angels and Devils ── CULTURAL_NOTE
  {
    lessonOrderIndex: 33,
    type: InsightType.CULTURAL_NOTE,
    title: 'The Unseen Battle Happening Around You',
    body: 'The Qur\'an presents a cosmic picture: مَلَك (angels) are devoted servants of Allah who never disobey, while شَيْطَان (Satan) is the declared enemy who whispers and deceives. جَهَنَّم (Hellfire) is the consequence, and خَالِد (abiding forever) is the duration. Knowing these words helps you see the Qur\'an\'s framework — a battle between good and evil, with أَصْحَاب (companions) of either Paradise or the Fire.',
    examples: [
      {
        arabic: 'وَالْمَلَائِكَةُ يُسَبِّحُونَ بِحَمْدِ رَبِّهِمْ',
        transliteration: 'Wal-mala\'ikatu yusabbihuna bi-hamdi Rabbihim',
        meaning: 'The angels glorify the praises of their Lord',
        note: 'مَلَك — angels are in constant worship',
      },
      {
        arabic: 'إِنَّ الشَّيْطَانَ لَكُمْ عَدُوٌّ',
        transliteration: 'Innash-Shaytana lakum aduww',
        meaning: 'Indeed, Satan is an enemy to you',
        note: 'شَيْطَان — the Qur\'an names the enemy clearly',
      },
      {
        arabic: 'أَصْحَابُ الْجَنَّةِ هُمْ فِيهَا خَالِدُونَ',
        transliteration: 'Ashabul-jannati hum fiha khalidun',
        meaning: 'The companions of Paradise will abide therein forever',
        note: 'أَصْحَاب + خَالِد — forever in Paradise',
      },
    ],
  },

  // ── Lesson 34: Family ── WORD_FAMILY
  {
    lessonOrderIndex: 34,
    type: InsightType.WORD_FAMILY,
    title: 'How the Qur\'an Builds a Complete Family Portrait',
    body: 'This lesson\'s words assemble an entire family tree. وَلَد (child/offspring) is the general term, ابْن (son) specifies a male child, أَخ (brother) extends to brotherhood in faith, نِسَاء (women) has an entire surah named after it, and زَوْج (spouse/pair) reminds us that companionship is built into creation itself. Together, these five words appear in nearly every Qur\'anic discussion about family, inheritance, and social bonds.',
    examples: [
      {
        arabic: 'الْمَالُ وَالْبَنُونَ زِينَةُ الْحَيَاةِ الدُّنْيَا',
        transliteration: 'Al-malu wal-banuna zinatul-hayatid-dunya',
        meaning: 'Wealth and children are the adornment of worldly life',
        note: 'بَنُون (plural of ابْن) — children paired with wealth as life\'s beauty',
      },
      {
        arabic: 'إِنَّمَا الْمُؤْمِنُونَ إِخْوَةٌ',
        transliteration: 'Innamal-mu\'minuna ikhwah',
        meaning: 'The believers are but brothers',
        note: 'أَخ — brotherhood extends beyond blood to faith',
      },
      {
        arabic: 'وَمِنْ كُلِّ شَيْءٍ خَلَقْنَا زَوْجَيْنِ',
        transliteration: 'Wa min kulli shay\'in khalaqna zawjayn',
        meaning: 'And of everything We created two mates (pairs)',
        note: 'زَوْج — pairing is a universal law of creation',
      },
    ],
  },

  // ── Lesson 35: Wealth and Deeds ── PATTERN_RECOGNITION
  {
    lessonOrderIndex: 35,
    type: InsightType.PATTERN_RECOGNITION,
    title: 'The Qur\'an Always Mentions Wealth Right Before Deeds',
    body: 'Notice the pattern: almost every time the Qur\'an mentions مَال (wealth), it follows up with عَمَل (deeds) or كَسَبَ (what you earned). Wealth is presented as a test — مَتَاع (temporary provision) of this world. The Qur\'an consistently redirects your attention from what you have to what you do. كَثِير (much) of this world\'s riches mean nothing without righteous deeds.',
    examples: [
      {
        arabic: 'لَنْ تُغْنِيَ عَنْهُمْ أَمْوَالُهُمْ',
        transliteration: 'Lan tughniya anhum amwaluhum',
        meaning: 'Their wealth will never avail them',
        note: 'مَال — wealth alone won\'t save you',
      },
      {
        arabic: 'لَهَا مَا كَسَبَتْ وَعَلَيْهَا مَا اكْتَسَبَتْ',
        transliteration: 'Laha ma kasabat wa alayha mak-tasabat',
        meaning: 'It shall have what it earned, and against it what it earned',
        note: 'كَسَبَ — you earn both good and bad',
      },
      {
        arabic: 'مَتَاعُ الْحَيَاةِ الدُّنْيَا قَلِيلٌ',
        transliteration: 'Mata\'ul-hayatid-dunya qalil',
        meaning: 'The enjoyment of worldly life is little',
        note: 'مَتَاع — the dunya is just temporary provision',
      },
    ],
  },

  // ── Lesson 36: Then, Or, Until ── GRAMMAR_TIP
  {
    lessonOrderIndex: 36,
    type: InsightType.GRAMMAR_TIP,
    title: 'Arabic Connectors Tell You What\'s Coming Next',
    body: 'These small words direct the flow of the Qur\'an like traffic signals. ثُمَّ (then) tells you a sequence is unfolding with a gap in time. أَوْ (or) presents a choice. حَتَّى (until) sets a condition or deadline. لَعَلَّ (perhaps/so that) reveals the purpose behind a command. لَكِنْ (but/however) signals a contrast. Once you recognize these, you can anticipate the structure of what\'s coming next in any ayah.',
    examples: [
      {
        arabic: 'ثُمَّ خَلَقْنَا النُّطْفَةَ عَلَقَةً',
        transliteration: 'Thumma khalaqnan-nutfata alaqah',
        meaning: 'Then We made the drop into a clinging clot',
        note: 'ثُمَّ — signals the next stage in a sequence',
      },
      {
        arabic: 'حَتَّى يَتَبَيَّنَ لَكُمُ الْخَيْطُ الْأَبْيَضُ',
        transliteration: 'Hatta yatabayyana lakumul-khaytul-abyad',
        meaning: 'Until the white thread of dawn becomes distinct',
        note: 'حَتَّى — marks the endpoint or condition',
      },
      {
        arabic: 'لَعَلَّكُمْ تَتَّقُونَ',
        transliteration: 'La\'allakum tattaqun',
        meaning: 'So that you may become God-conscious',
        note: 'لَعَلَّ — reveals the purpose: "this is WHY"',
      },
    ],
  },

  // ── Lesson 37: Before, After, Between ── GRAMMAR_TIP
  {
    lessonOrderIndex: 37,
    type: InsightType.GRAMMAR_TIP,
    title: 'Arabic Maps Time and Space with the Same Words',
    body: 'Something beautiful about Arabic: قَبْلَ (before), بَعْدَ (after), بَيْنَ (between), عِنْدَ (at/near), and مَعَ (with) work for both time and place. قَبْلَ can mean "before" in time or "in front of" in space. بَيْنَ can mean "between two moments" or "between two people." This dual nature makes these words incredibly versatile — and incredibly common in the Qur\'an.',
    examples: [
      {
        arabic: 'مِنْ قَبْلُ وَمِنْ بَعْدُ',
        transliteration: 'Min qablu wa min ba\'du',
        meaning: 'Before and after',
        note: 'قَبْلَ and بَعْدَ — the Qur\'an frames events in time',
      },
      {
        arabic: 'لَهُ مَا بَيْنَ أَيْدِينَا وَمَا خَلْفَنَا',
        transliteration: 'Lahu ma bayna aydina wa ma khalfana',
        meaning: 'To Him belongs what is before us and behind us',
        note: 'بَيْنَ — between, in both time and space',
      },
      {
        arabic: 'إِنَّ اللَّهَ مَعَ الصَّابِرِينَ',
        transliteration: 'Innallaha ma\'as-sabirin',
        meaning: 'Indeed, Allah is with the patient',
        note: 'مَعَ — the most comforting word: you are never alone',
      },
    ],
  },

  // ── Lesson 38: O You Who Believe ── PATTERN_RECOGNITION
  {
    lessonOrderIndex: 38,
    type: InsightType.PATTERN_RECOGNITION,
    title: 'The Qur\'an\'s Most Famous Formula: يَا أَيُّهَا الَّذِينَ آمَنُوا',
    body: 'The phrase "Ya ayyuhal-ladhina amanu" (O you who believe) appears 89 times in the Qur\'an, and every single time it is followed by a command or instruction. أَيُّهَا (O!) grabs your attention, الَّذِينَ (those who) identifies you, and آمَنُوا (believe) confirms you\'re being addressed. When إِذَا (when) or أُولَئِكَ (those) follow, pay extra attention — a specific situation or group is about to be described.',
    examples: [
      {
        arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا اتَّقُوا اللَّهَ',
        transliteration: 'Ya ayyuhal-ladhina amanut-taqullah',
        meaning: 'O you who believe, be conscious of Allah',
        note: 'أَيُّهَا — the vocative call, always followed by a command',
      },
      {
        arabic: 'إِذَا جَاءَ نَصْرُ اللَّهِ وَالْفَتْحُ',
        transliteration: 'Idha jaa\'a nasrullahi wal-fath',
        meaning: 'When the help of Allah and the conquest comes',
        note: 'إِذَا — "when" sets the dramatic scene for what follows',
      },
      {
        arabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ',
        transliteration: 'Qul huwa Allahu Ahad',
        meaning: 'Say: He is Allah, the One',
        note: 'أَحَد — absolute oneness, the core of Islamic belief',
      },
    ],
  },

  // ── Lesson 39: There Is No God But Allah ── ROOT_PATTERN
  {
    lessonOrderIndex: 39,
    type: InsightType.ROOT_PATTERN,
    title: 'Deconstructing the Shahada — You Know Every Word Now',
    body: 'The Shahada "La ilaha illallah" uses words you have already learned: لَا (not, from Lesson 22), إِلَه (god, this lesson), إِلَّا (except, from Lesson 22), and اللَّه. This lesson\'s remaining words — غَيْر (other), آخِر (last), قَلِيل (few), and جَمِيع (all) — reinforce the Shahada\'s message: there is no غَيْر (other) deity, the آخِرَة (hereafter) is what matters, the dunya is قَلِيل (little), and جَمِيعًا (all together) we will return to Him.',
    examples: [
      {
        arabic: 'لَا إِلَهَ إِلَّا هُوَ',
        transliteration: 'La ilaha illa Huwa',
        meaning: 'There is no god except Him',
        note: 'إِلَه — the core concept: no deity deserves worship except Allah',
      },
      {
        arabic: 'وَمَا الْحَيَاةُ الدُّنْيَا إِلَّا مَتَاعٌ قَلِيلٌ',
        transliteration: 'Wa mal-hayatud-dunya illa mata\'un qalil',
        meaning: 'And the life of this world is nothing but a little enjoyment',
        note: 'قَلِيل — this world is small compared to what comes after',
      },
      {
        arabic: 'وَإِلَيْهِ تُرْجَعُونَ جَمِيعًا',
        transliteration: 'Wa ilayhi turja\'una jami\'a',
        meaning: 'And to Him you will all be returned together',
        note: 'جَمِيع — the return to Allah is universal, no exceptions',
      },
    ],
  },

  // ── Lesson 40: Victory and Struggle ── WORD_FAMILY
  {
    lessonOrderIndex: 40,
    type: InsightType.WORD_FAMILY,
    title: 'Victory Isn\'t Just Winning — It\'s the Whole Journey',
    body: 'This lesson\'s words tell a complete story. فِتْنَة (trial) is the test that refines you. عَدُوّ (enemy) is what you face — both external and internal. نَصَرَ (to help) is what Allah provides, and نَصْر (victory) is the outcome. وَلِيّ (guardian/protector) is who Allah is to you throughout the struggle. The Qur\'an teaches that victory isn\'t instant — it comes through patience, struggle, and trust in your وَلِيّ.',
    examples: [
      {
        arabic: 'إِنْ يَنْصُرْكُمُ اللَّهُ فَلَا غَالِبَ لَكُمْ',
        transliteration: 'In yansurkumullahu fala ghaliba lakum',
        meaning: 'If Allah helps you, none can overcome you',
        note: 'نَصَرَ — when Allah\'s help comes, victory is certain',
      },
      {
        arabic: 'وَعَسَى أَنْ تَكْرَهُوا شَيْئًا وَهُوَ خَيْرٌ لَكُمْ',
        transliteration: 'Wa \'asa an takrahu shay\'an wa huwa khayrun lakum',
        meaning: 'Perhaps you dislike something and it is good for you',
        note: 'فِتْنَة — trials often contain hidden blessings',
      },
      {
        arabic: 'اللَّهُ وَلِيُّ الَّذِينَ آمَنُوا',
        transliteration: 'Allahu waliyyul-ladhina amanu',
        meaning: 'Allah is the Guardian of those who believe',
        note: 'وَلِيّ — your Protector through every struggle',
      },
    ],
  },
];
