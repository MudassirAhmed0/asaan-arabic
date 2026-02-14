import { InsightType } from '@prisma/client';
import { InsightSeedData } from './insights-types';

export const INSIGHTS_L41_L60: InsightSeedData[] = [
  // ── Lesson 41: "Divine Actions" ── WORD_FAMILY
  {
    lessonOrderIndex: 41,
    type: InsightType.WORD_FAMILY,
    title: 'Five Divine Verbs, One Sovereign Power',
    body: 'This lesson is packed with verbs that only Allah truly performs at the ultimate level. He reveals (أَوْحَى), brings forth (أَخْرَجَ), destroys (أَهْلَكَ), gives life (أَحْيَا), and commands (أَمَرَ). Together they paint a portrait of total divine authority over creation.',
    examples: [
      {
        arabic: 'أَوْحَيْنَا إِلَيْكَ',
        transliteration: 'Awhayna ilayk',
        meaning: 'We revealed to you',
        note: 'The "we" is the royal plural — Allah speaking of Himself with majesty',
      },
      {
        arabic: 'يُحْيِي وَيُمِيتُ',
        transliteration: 'Yuhyi wa yumit',
        meaning: 'He gives life and causes death',
        note: 'أَحْيَا and أَمَاتَ are paired throughout the Qur\'an as opposites only Allah controls',
      },
      {
        arabic: 'وَأَمَرَ رَبُّكَ',
        transliteration: 'Wa amara Rabbuk',
        meaning: 'And your Lord has commanded',
        note: 'From the same root as "amr" (command) that you know from Urdu',
      },
    ],
  },

  // ── Lesson 42: "Life and Death" ── ROOT_PATTERN
  {
    lessonOrderIndex: 42,
    type: InsightType.ROOT_PATTERN,
    title: 'م-و-ت: The Root That Connects Death to the Hour',
    body: 'The root م-و-ت (m-w-t) threads through multiple words in this lesson. مَاتَ (to die) gives us مَوْت (death) and مَيِّت (dead). Combined with سَاعَة (The Hour) and أَجَل (appointed time), this lesson maps out the entire Qur\'anic timeline from individual death to collective resurrection.',
    examples: [
      {
        arabic: 'كُلُّ نَفْسٍ ذَائِقَةُ الْمَوْتِ',
        transliteration: 'Kullu nafsin dha\'iqatul-mawt',
        meaning: 'Every soul shall taste death',
        note: 'الْمَوْتِ comes from the same root as مَاتَ',
      },
      {
        arabic: 'ثُمَّ يَبْعَثُكُمْ',
        transliteration: 'Thumma yab\'athukum',
        meaning: 'Then He will resurrect you',
        note: 'بَعَثَ bridges the gap between death and the afterlife',
      },
      {
        arabic: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ',
        transliteration: 'Allahu la ilaha illa Huwal-Hayyul-Qayyum',
        meaning: 'Allah, there is no god but He, the Ever-Living, the Self-Sustaining',
        note: 'حَيّ stands in contrast to مَاتَ — Allah alone is beyond death',
      },
    ],
  },

  // ── Lesson 43: "Judgment and Decree" ── PATTERN_RECOGNITION
  {
    lessonOrderIndex: 43,
    type: InsightType.PATTERN_RECOGNITION,
    title: 'The Qur\'an Has Three Different Words for Judging',
    body: 'Notice how this lesson gives you three overlapping but distinct words: قَضَى (to decree, with finality), حَكَمَ (to judge, with wisdom), and شَهِدَ (to testify, with witness). Arabic is remarkably precise about different kinds of judgment. When you spot these words in the Qur\'an, pay attention to which kind of judging is happening.',
    examples: [
      {
        arabic: 'وَقَضَىٰ رَبُّكَ أَلَّا تَعْبُدُوا إِلَّا إِيَّاهُ',
        transliteration: 'Wa qada Rabbuka alla ta\'budu illa iyyah',
        meaning: 'And your Lord has decreed that you worship none but Him',
        note: 'قَضَى here means a final, irrevocable decree',
      },
      {
        arabic: 'إِنَّ رَبَّكَ يَحْكُمُ بَيْنَهُمْ',
        transliteration: 'Inna Rabbaka yahkumu baynahum',
        meaning: 'Indeed your Lord will judge between them',
        note: 'حَكَمَ here means deliberate, wise judgment',
      },
      {
        arabic: 'شَهِدَ اللَّهُ أَنَّهُ لَا إِلَٰهَ إِلَّا هُوَ',
        transliteration: 'Shahidallahu annahu la ilaha illa Hu',
        meaning: 'Allah bears witness that there is no god but He',
        note: 'شَهِدَ is bearing witness — the root of your Shahada',
      },
    ],
  },

  // ── Lesson 44: "Teaching and Writing" ── ROOT_PATTERN
  {
    lessonOrderIndex: 44,
    type: InsightType.ROOT_PATTERN,
    title: 'ع-ل-م Returns: From Knowing to Teaching',
    body: 'You met عِلْم (knowledge) in Lesson 1, عَلِمَ (to know) in Lesson 4, and عَلِيم (All-Knowing) in Lesson 29. Now عَلَّمَ (to teach) completes the family. The doubled middle letter (shaddah) transforms "to know" into "to cause someone to know." This pattern, called Form II, shows up across Arabic and always intensifies the meaning.',
    examples: [
      {
        arabic: 'عَلَّمَ الْقُرْآنَ',
        transliteration: 'Allamal-Qur\'an',
        meaning: 'He taught the Qur\'an',
        note: 'The very first attribute Allah mentions in Surah Ar-Rahman',
      },
      {
        arabic: 'عَلَّمَ الْإِنسَانَ مَا لَمْ يَعْلَمْ',
        transliteration: 'Allamal-insana ma lam ya\'lam',
        meaning: 'He taught man what he did not know',
        note: 'عَلَّمَ (taught) and يَعْلَمْ (know) — same root, different forms',
      },
      {
        arabic: 'عَلَّمَ بِالْقَلَمِ',
        transliteration: 'Allama bil-qalam',
        meaning: 'He taught by the pen',
        note: 'Teaching and writing (كَتَبَ) linked together in the very first revelation',
      },
    ],
  },

  // ── Lesson 45: "Struggle and Patience" ── CULTURAL_NOTE
  {
    lessonOrderIndex: 45,
    type: InsightType.CULTURAL_NOTE,
    title: 'Sabr and Shukr: The Two Responses to Everything',
    body: 'In Pakistani and Muslim culture, صَبَرَ (patience) and شَكَرَ (gratitude) are not just virtues — they are the complete framework for responding to life. When hardship comes, you practice sabr. When blessings come, you practice shukr. The Qur\'an pairs them together as the mark of true faith.',
    examples: [
      {
        arabic: 'إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّكُلِّ صَبَّارٍ شَكُورٍ',
        transliteration: 'Inna fi dhalika la-ayatil-likulli sabbarin shakur',
        meaning: 'Indeed in that are signs for every patient and grateful person',
        note: 'صَبَّارٍ (intensely patient) and شَكُورٍ (deeply grateful) — both intensive forms',
      },
      {
        arabic: 'وَاصْبِرُوا إِنَّ اللَّهَ مَعَ الصَّابِرِينَ',
        transliteration: 'Wasbiru innallaha ma\'as-sabirin',
        meaning: 'And be patient; indeed Allah is with the patient',
      },
      {
        arabic: 'وَاسْجُدْ وَاقْتَرِبْ',
        transliteration: 'Wasjud waqtarib',
        meaning: 'Prostrate and draw near',
        note: 'سَجَدَ (prostration) is the ultimate act of patience and surrender before Allah',
      },
    ],
  },

  // ── Lesson 46: "Praise and Peace" ── CULTURAL_NOTE
  {
    lessonOrderIndex: 46,
    type: InsightType.CULTURAL_NOTE,
    title: 'SubhanAllah, Alhamdulillah, Salam — Words You Already Live',
    body: 'These are not just Qur\'anic vocabulary — they are the fabric of daily Muslim life. You say سُبْحَان in every sujood, حَمْد in every Fatiha, and سَلَام in every greeting. This lesson proves that you have been speaking Qur\'anic Arabic your entire life without realizing it.',
    examples: [
      {
        arabic: 'سُبْحَانَ رَبِّيَ الْأَعْلَى',
        transliteration: 'Subhana Rabbiyal-A\'la',
        meaning: 'Glory be to my Lord, the Most High',
        note: 'You say this in every sujood of every prayer',
      },
      {
        arabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
        transliteration: 'Alhamdulillahi Rabbil-Alamin',
        meaning: 'All praise is for Allah, Lord of all worlds',
        note: 'The very first ayah of Al-Fatiha — حَمْد opens the Qur\'an',
      },
      {
        arabic: 'سَلَامٌ قَوْلًا مِّن رَّبٍّ رَّحِيمٍ',
        transliteration: 'Salamun qawlan mir-Rabbir-Rahim',
        meaning: 'Peace — a word from a Merciful Lord',
        note: 'The greeting of the people of Jannah, spoken by Allah Himself',
      },
    ],
  },

  // ── Lesson 47: "More Divine Attributes" ── PATTERN_RECOGNITION
  {
    lessonOrderIndex: 47,
    type: InsightType.PATTERN_RECOGNITION,
    title: 'The فَعِيل Pattern: How Arabic Builds Attributes',
    body: 'Notice something? عَزِيز, كَرِيم, قَدِير, أَلِيم, شَدِيد all follow the same فَعِيل (fa\'il) pattern. This is one of the most common adjective forms in Arabic. Once you recognize this pattern, you can spot attributes everywhere in the Qur\'an — even ones you have not studied yet.',
    examples: [
      {
        arabic: 'إِنَّ اللَّهَ عَزِيزٌ حَكِيمٌ',
        transliteration: 'Innallaha Azizun Hakim',
        meaning: 'Indeed Allah is Mighty, Wise',
        note: 'Both عَزِيز and حَكِيم follow the فَعِيل pattern',
      },
      {
        arabic: 'إِنَّ اللَّهَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ',
        transliteration: 'Innallaha ala kulli shay\'in Qadir',
        meaning: 'Indeed Allah is capable of all things',
        note: 'قَدِير — same pattern, meaning All-Powerful',
      },
      {
        arabic: 'ذُو الْعَرْشِ الْكَرِيمُ',
        transliteration: 'Dhul-Arshil-Karim',
        meaning: 'Owner of the Noble Throne',
        note: 'كَرِيم — the same فَعِيل pattern meaning Noble/Generous',
      },
    ],
  },

  // ── Lesson 48: "Communities and Peoples" ── WORD_FAMILY
  {
    lessonOrderIndex: 48,
    type: InsightType.WORD_FAMILY,
    title: 'From One Ummah to All the Worlds',
    body: 'This lesson moves from the specific to the universal. أُمَّة (one community) expands to عَالَمِين (all worlds). ذُرِّيَّة (offspring) reminds you that communities are built generation by generation. And قُرْآن (the Recitation) is what holds the Muslim أُمَّة together across all عَالَمِين.',
    examples: [
      {
        arabic: 'كُنتُمْ خَيْرَ أُمَّةٍ أُخْرِجَتْ لِلنَّاسِ',
        transliteration: 'Kuntum khayra ummatin ukhrijat lin-nas',
        meaning: 'You are the best community brought forth for mankind',
        note: 'أُمَّة — the Muslim community\'s Qur\'anic identity',
      },
      {
        arabic: 'رَبِّ الْعَالَمِينَ',
        transliteration: 'Rabbil-Alamin',
        meaning: 'Lord of all worlds',
        note: 'عَالَمِين — from the root ع-ل-م, same as عِلْم (knowledge)',
      },
      {
        arabic: 'رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا',
        transliteration: 'Rabbana hab lana min azwajina wa dhurriyyatina',
        meaning: 'Our Lord, grant us from our spouses and offspring',
        note: 'The dua of the believers, asking for righteous ذُرِّيَّة',
      },
    ],
  },

  // ── Lesson 49: "Going Astray" ── ROOT_PATTERN
  {
    lessonOrderIndex: 49,
    type: InsightType.ROOT_PATTERN,
    title: 'ض-ل-ل: The Root You Say in Every Prayer',
    body: 'The root ض-ل-ل (d-l-l) gives us both ضَلَّ (to go astray) and ضَلَال (misguidance). Every time you recite Al-Fatiha and say "ghayril-maghdubi alayhim wa lad-DALLIN," you are asking Allah to keep you away from this root. Paired with أَشْرَكَ (shirk) and كُفْر (disbelief), this lesson maps the Qur\'an\'s vocabulary of spiritual danger.',
    examples: [
      {
        arabic: 'غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ',
        transliteration: 'Ghayril-maghdubi alayhim wa lad-dallin',
        meaning: 'Not those who earned anger, nor those who went astray',
        note: 'الضَّالِّينَ — you have been saying this root since childhood',
      },
      {
        arabic: 'إِنَّ الشِّرْكَ لَظُلْمٌ عَظِيمٌ',
        transliteration: 'Innash-shirka la-zulmun adhim',
        meaning: 'Indeed shirk is a tremendous injustice',
        note: 'أَشْرَكَ (to associate partners) is the gravest form of going astray',
      },
      {
        arabic: 'وَمَن يَكْفُرْ بَعْدَ ذَٰلِكَ فَأُولَٰئِكَ هُمُ الْفَاسِقُونَ',
        transliteration: 'Wa man yakfur ba\'da dhalika fa-ula\'ika humul-fasiqun',
        meaning: 'And whoever disbelieves after that — they are the transgressors',
        note: 'كُفْر — covering the truth, the verb form of disbelief',
      },
    ],
  },

  // ── Lesson 50: "The Unseen" ── CULTURAL_NOTE
  {
    lessonOrderIndex: 50,
    type: InsightType.CULTURAL_NOTE,
    title: 'Believing in the Ghayb: The First Test of Faith',
    body: 'In Surah Al-Baqarah, the very first quality Allah lists for the righteous is that they believe in الغَيْب (the Unseen). This lesson brings together the hidden and the heavy: غَيْب (unseen), ذَنْب (sin), سُوء (evil), ظُلْم (oppression), and دُعَاء (supplication). The connection? Dua is your bridge to the unseen — when the weight of sin and injustice feels too heavy, you call upon the One you cannot see.',
    examples: [
      {
        arabic: 'الَّذِينَ يُؤْمِنُونَ بِالْغَيْبِ',
        transliteration: 'Alladhina yu\'minuna bil-ghayb',
        meaning: 'Those who believe in the Unseen',
        note: 'The very first description of the righteous in Surah Al-Baqarah',
      },
      {
        arabic: 'رَبِّ اغْفِرْ لِي ذَنْبِي',
        transliteration: 'Rabbighfir li dhanbi',
        meaning: 'My Lord, forgive my sin',
        note: 'The prophets\' own way of seeking forgiveness for ذَنْب',
      },
      {
        arabic: 'ادْعُونِي أَسْتَجِبْ لَكُمْ',
        transliteration: 'Ud\'uni astajib lakum',
        meaning: 'Call upon Me, I will respond to you',
        note: 'دُعَاء — Allah\'s personal invitation to every human being',
      },
    ],
  },

  // ── Lesson 51: "More Actions" ── GRAMMAR_TIP
  {
    lessonOrderIndex: 51,
    type: InsightType.GRAMMAR_TIP,
    title: 'How Arabic Verb Forms Change Meaning Completely',
    body: 'This lesson shows how Arabic transforms verbs through its form system. حَرَّمَ (to forbid) is Form II — the doubled middle letter makes it intensive. تَوَلَّى (to turn away) is Form V — adding "ta" at the front makes an action reflexive. These form patterns are consistent across thousands of Arabic verbs, so once you learn the pattern, you unlock the logic of the entire language.',
    examples: [
      {
        arabic: 'حَرَّمَ عَلَيْكُمُ الْمَيْتَةَ',
        transliteration: 'Harrama alaykumul-maytah',
        meaning: 'He has forbidden for you dead animals',
        note: 'حَرَّمَ — Form II (doubled middle letter) makes it causative: "to make something haram"',
      },
      {
        arabic: 'فَلَمَّا تَوَلَّىٰ عَنْهُمْ',
        transliteration: 'Falamma tawalla anhum',
        meaning: 'So when he turned away from them',
        note: 'تَوَلَّى — Form V adds a reflexive meaning: "to turn oneself away"',
      },
      {
        arabic: 'إِنَّمَا يَخْشَى اللَّهَ مِنْ عِبَادِهِ الْعُلَمَاءُ',
        transliteration: 'Innama yakhshallaha min ibadihi-l\'ulama\'',
        meaning: 'Only those who have knowledge truly fear Allah',
        note: 'خَشِيَ — a Form I verb where the fear comes from knowing Allah\'s greatness',
      },
    ],
  },

  // ── Lesson 52: "Establishing and Increasing" ── PATTERN_RECOGNITION
  {
    lessonOrderIndex: 52,
    type: InsightType.PATTERN_RECOGNITION,
    title: 'أَقَامَ vs عَقَلَ: Actions That Define a Believer',
    body: 'This lesson contrasts establishing prayer (أَقَامَ) with using reason (عَقَلَ), and increasing (زَادَ) with forgetting (نَسِيَ). The Qur\'an uses these as a litmus test: those who establish prayer and use their reason increase in faith. Those who forget and neglect decrease. Notice how the words naturally pair into opposites.',
    examples: [
      {
        arabic: 'وَأَقِيمُوا الصَّلَاةَ',
        transliteration: 'Wa aqimus-salah',
        meaning: 'And establish prayer',
        note: 'أَقَامَ — one of the most repeated commands in the entire Qur\'an',
      },
      {
        arabic: 'أَفَلَا تَعْقِلُونَ',
        transliteration: 'Afala ta\'qilun',
        meaning: 'Will you not reason?',
        note: 'عَقَلَ — the Qur\'an demands that you think, not just follow blindly',
      },
      {
        arabic: 'فَزَادَهُمُ اللَّهُ مَرَضًا',
        transliteration: 'Fa-zadahumullahu marada',
        meaning: 'So Allah increased them in disease',
        note: 'زَادَ works both ways — increase in guidance or increase in misguidance',
      },
    ],
  },

  // ── Lesson 53: "Nature" ── CULTURAL_NOTE
  {
    lessonOrderIndex: 53,
    type: InsightType.CULTURAL_NOTE,
    title: 'The Qur\'an as a Nature Documentary',
    body: 'Allah points to بَحْر (sea), نَهْر (river), رِيح (wind), جَبَل (mountain), and شَجَرَة (tree) as signs of His power. For someone living in Pakistan, surrounded by the Indus River, the Karakoram mountains, and the monsoon winds, these are not abstract concepts — they are your everyday landscape. The Qur\'an asks you to look at what is already around you and see Allah in it.',
    examples: [
      {
        arabic: 'وَالْبَحْرِ الْمَسْجُورِ',
        transliteration: 'Wal-bahril-masjur',
        meaning: 'And by the sea, filled with fire',
        note: 'Allah swears by the بَحْر — modern science has found volcanic vents on the ocean floor',
      },
      {
        arabic: 'وَالْجِبَالَ أَوْتَادًا',
        transliteration: 'Wal-jibala awtada',
        meaning: 'And the mountains as pegs',
        note: 'جَبَل — the Qur\'an described mountains as stabilizing pegs 1400 years before geology confirmed it',
      },
      {
        arabic: 'وَأَرْسَلْنَا الرِّيَاحَ لَوَاقِحَ',
        transliteration: 'Wa arsalnar-riyaha lawaqih',
        meaning: 'And We sent the winds as pollinators',
        note: 'رِيح (wind) — the Qur\'an knew winds pollinate plants centuries before botany did',
      },
    ],
  },

  // ── Lesson 54: "People Types" ── PATTERN_RECOGNITION
  {
    lessonOrderIndex: 54,
    type: InsightType.PATTERN_RECOGNITION,
    title: 'How the Qur\'an Categorizes People',
    body: 'The Qur\'an does not describe people vaguely. It uses precise categories: مِسْكِين (the destitute), غَنِيّ (the self-sufficient), فَاسِق (the transgressor), and رَجُل (the individual who stands up). Notice how these are moral and spiritual categories, not just economic ones. Even غَنِيّ (rich) is primarily an attribute of Allah — true richness is independence from creation.',
    examples: [
      {
        arabic: 'وَيُطْعِمُونَ الطَّعَامَ عَلَىٰ حُبِّهِ مِسْكِينًا',
        transliteration: 'Wa yut\'imunat-ta\'ama ala hubbihi miskinan',
        meaning: 'And they feed food, despite love for it, to the needy',
        note: 'مِسْكِين — feeding the poor is not charity alone, it is proof of faith',
      },
      {
        arabic: 'وَاللَّهُ الْغَنِيُّ وَأَنتُمُ الْفُقَرَاءُ',
        transliteration: 'Wallahul-Ghaniyyu wa antumul-fuqara\'',
        meaning: 'And Allah is the Self-Sufficient and you are the needy',
        note: 'غَنِيّ vs فُقَرَاء — the Qur\'an flips our idea of who is truly rich',
      },
      {
        arabic: 'وَجَاءَ رَجُلٌ مِّنْ أَقْصَى الْمَدِينَةِ يَسْعَىٰ',
        transliteration: 'Wa ja\'a rajulun min aqsal-madinati yas\'a',
        meaning: 'And a man came running from the farthest end of the city',
        note: 'رَجُل — the Qur\'an honors anonymous individuals who stood for truth',
      },
    ],
  },

  // ── Lesson 55: "Punishment and Glorification" ── WORD_FAMILY
  {
    lessonOrderIndex: 55,
    type: InsightType.WORD_FAMILY,
    title: 'Two Families: عَذَاب and تَسْبِيح Side by Side',
    body: 'This lesson places punishment and glorification in the same breath. عَذَّبَ (to punish) connects back to عَذَاب from Lesson 5. سَبَّحَ (to glorify) is the root of your daily "SubhanAllah." And مُتَّقِين (the God-fearing) are the ones who escape the first and embody the second. The choice between these two word families is the choice the Qur\'an asks you to make.',
    examples: [
      {
        arabic: 'يُسَبِّحُ لِلَّهِ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ',
        transliteration: 'Yusabbihu lillahi ma fis-samawati wa ma fil-ard',
        meaning: 'Everything in the heavens and earth glorifies Allah',
        note: 'سَبَّحَ — even creation that cannot speak still glorifies',
      },
      {
        arabic: 'فَأَذَاقَهُمُ اللَّهُ الْعَذَابَ',
        transliteration: 'Fa-adhaqahumullahul-adhab',
        meaning: 'So Allah made them taste the punishment',
        note: 'عَذَّبَ — the verb form of عَذَاب you learned in Lesson 5',
      },
      {
        arabic: 'إِنَّ الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ',
        transliteration: 'Innal-ladhina amanu wa amilus-salihat',
        meaning: 'Indeed those who believed and did righteous deeds',
        note: 'صَالِحَات — the most repeated formula for salvation in the Qur\'an',
      },
    ],
  },

  // ── Lesson 56: "Position and Direction" ── GRAMMAR_TIP
  {
    lessonOrderIndex: 56,
    type: InsightType.GRAMMAR_TIP,
    title: 'Prepositions of Place: Tiny Words That Unlock Meaning',
    body: 'Arabic spatial words like فَوْقَ (above), تَحْت (beneath), and دُونَ (besides) are technically called "dhuruf" (circumstantial nouns). They always appear in a construct with what follows them. Once you learn فَوْقَ, تَحْت, and دُونَ, you can parse some of the most common Qur\'anic phrases — especially descriptions of Jannah.',
    examples: [
      {
        arabic: 'تَجْرِي مِن تَحْتِهَا الْأَنْهَارُ',
        transliteration: 'Tajri min tahtihal-anhar',
        meaning: 'Beneath which rivers flow',
        note: 'تَحْت — this phrase describing Jannah appears over 30 times in the Qur\'an',
      },
      {
        arabic: 'مِن دُونِ اللَّهِ',
        transliteration: 'Min dunillah',
        meaning: 'Besides Allah / other than Allah',
        note: 'دُونَ — the most common phrase warning against worshipping false gods',
      },
      {
        arabic: 'هُوَ الْأَوَّلُ وَالْآخِرُ',
        transliteration: 'Huwal-Awwalu wal-Akhir',
        meaning: 'He is the First and the Last',
        note: 'أَوَّل — when paired with الْآخِر, it describes Allah\'s eternal nature',
      },
    ],
  },

  // ── Lesson 57: "Warnings and Truth" ── ROOT_PATTERN
  {
    lessonOrderIndex: 57,
    type: InsightType.ROOT_PATTERN,
    title: 'ك-ذ-ب: The Root of Every Prophet\'s Rejection',
    body: 'The root ك-ذ-ب (k-dh-b) gives us كَذِب (lie/falsehood) and كَذَّبَ (to deny, to call a liar). Every single prophet in the Qur\'an was كُذِّبَ (called a liar) by their people. This root appears alongside بَاطِل (falsehood) and contrasts with حَسَنَة (good deed) — the Qur\'an consistently places truth-tellers against deniers.',
    examples: [
      {
        arabic: 'كَذَّبَتْ قَبْلَهُمْ قَوْمُ نُوحٍ',
        transliteration: 'Kadhdhabat qablahum qawmu Nuh',
        meaning: 'The people of Nuh denied before them',
        note: 'كَذَّبَ — Form II makes it intensive: not just lying, but actively denying truth',
      },
      {
        arabic: 'جَاءَ الْحَقُّ وَزَهَقَ الْبَاطِلُ',
        transliteration: 'Ja\'al-haqqu wa zahaqal-batil',
        meaning: 'Truth has come and falsehood has vanished',
        note: 'بَاطِل — the opposite of حَقّ (Truth) from Lesson 2',
      },
      {
        arabic: 'لَا خَوْفٌ عَلَيْهِمْ وَلَا هُمْ يَحْزَنُونَ',
        transliteration: 'La khawfun alayhim wa la hum yahzanun',
        meaning: 'No fear upon them, nor shall they grieve',
        note: 'خَوْف — this promise appears 13 times, always for those who stand with truth',
      },
    ],
  },

  // ── Lesson 58: "More Particles" ── GRAMMAR_TIP
  {
    lessonOrderIndex: 58,
    type: InsightType.GRAMMAR_TIP,
    title: 'Arabic Particles: Small Words, Massive Impact',
    body: 'إِنْ (if) and إِنَّ (indeed) differ by just a shaddah, but one introduces doubt and the other introduces certainty. أَنْ (that) and أَنَّ (that, emphatic) differ the same way. These tiny particles are the skeleton of Arabic grammar — they tell you whether a statement is conditional, certain, questioning, or connecting. Master them and the Qur\'an\'s logic opens up.',
    examples: [
      {
        arabic: 'إِنْ كُنتُمْ مُّؤْمِنِينَ',
        transliteration: 'In kuntum mu\'minin',
        meaning: 'If you are believers',
        note: 'إِنْ — introduces a condition: "IF this, THEN that"',
      },
      {
        arabic: 'أَمْ حَسِبْتُمْ أَن تَدْخُلُوا الْجَنَّةَ',
        transliteration: 'Am hasibtum an tadkhulul-Jannah',
        meaning: 'Or did you think you would enter Paradise?',
        note: 'أَمْ — "or" in a rhetorical question that makes you stop and think',
      },
      {
        arabic: 'فَلَمَّا جَاءَهُمُ الْحَقُّ',
        transliteration: 'Falamma ja\'ahumul-haqq',
        meaning: 'But when the truth came to them',
        note: 'لَمَّا — marks the turning point in a story: "when this happened..."',
      },
    ],
  },

  // ── Lesson 59: "The Most Merciful" ── ROOT_PATTERN
  {
    lessonOrderIndex: 59,
    type: InsightType.ROOT_PATTERN,
    title: 'ر-ح-م: The Root That Opens Every Surah',
    body: 'The root ر-ح-م (r-h-m) is the most beloved root in the Qur\'an. You met رَحْمَة (mercy) in Lesson 1 and رَحِيم (Most Merciful) in Lesson 29. Now الرَّحْمَن completes the picture. Ar-Rahman is mercy so vast it covers all creation. Every surah but one begins with "Bismillah ir-Rahman ir-Raheem" — this root literally frames the entire Qur\'an.',
    examples: [
      {
        arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
        transliteration: 'Bismillahir-Rahmanir-Rahim',
        meaning: 'In the name of Allah, the Most Merciful, the Especially Merciful',
        note: 'Both الرَّحْمَن and الرَّحِيم from the same root ر-ح-م — mercy doubled',
      },
      {
        arabic: 'الرَّحْمَٰنُ عَلَّمَ الْقُرْآنَ',
        transliteration: 'Ar-Rahmanu allamal-Qur\'an',
        meaning: 'The Most Merciful taught the Qur\'an',
        note: 'Teaching the Qur\'an is itself an act of الرَّحْمَن\'s mercy',
      },
      {
        arabic: 'قُلْ يَا عِبَادِيَ الَّذِينَ أَسْرَفُوا لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ',
        transliteration: 'Qul ya ibadiyalladhina asrafu la taqnatu mir-rahmatillah',
        meaning: 'Say: O My servants who have transgressed, do not despair of Allah\'s mercy',
        note: 'رَحْمَة — even for those who have sinned, the door of mercy stays open',
      },
    ],
  },

  // ── Lesson 60: "Your Journey Complete" ── CULTURAL_NOTE
  {
    lessonOrderIndex: 60,
    type: InsightType.CULTURAL_NOTE,
    title: 'From عِلْم to عَالِم: 300 Words Later, You Have Come Full Circle',
    body: 'Your very first word in Lesson 1 was عِلْم (knowledge). Your 300th word is عَالِم (scholar/knower). Same root: ع-ل-م. In between, you learned عَلِمَ (to know), عَلِيم (All-Knowing), and عَلَّمَ (to teach). This is not a coincidence — it is the entire arc of learning. You began as someone seeking knowledge. You now carry 300 Qur\'anic words inside you. The Qur\'an says: "Are those who know equal to those who do not know?" You are no longer the same person who started Lesson 1.',
    examples: [
      {
        arabic: 'عِلْم → عَلِمَ → عَلِيم → عَلَّمَ → عَالِم',
        transliteration: 'Ilm → Alima → Alim → Allama → Aalim',
        meaning: 'Knowledge → To know → All-Knowing → To teach → Scholar',
        note: 'Five words from one root, spanning Lessons 1, 4, 29, 44, and 60',
      },
      {
        arabic: 'هَلْ يَسْتَوِي الَّذِينَ يَعْلَمُونَ وَالَّذِينَ لَا يَعْلَمُونَ',
        transliteration: 'Hal yastawilladhina ya\'lamuna walladhina la ya\'lamun',
        meaning: 'Are those who know equal to those who do not know?',
        note: 'The Qur\'an\'s own answer to why this journey matters',
      },
      {
        arabic: 'اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ',
        transliteration: 'Iqra\' bismi Rabbikal-ladhi khalaq',
        meaning: 'Read in the name of your Lord who created',
        note: 'The first revelation — your journey with the Qur\'an is just beginning',
      },
    ],
  },
];
