# Copy Decisions

Last updated: 2026-01-27

## Tone Direction

**Warm coaching** — not clinical/educational, not overly casual.

- Like a supportive friend who respects the user's spiritual motivation
- Benefit-first language ("Understand 70% of the Quran" not "Cover 70%")
- Identity language ("words I know" not "words learned")
- Game framing for activities ("Play quick games" not "Practice & reinforce")
- Respectful of Quranic context — no "Let's do this" or overly hype language
- Conversational but not American-casual — fits Pakistani English speakers
- Direct instructions over abstract commands ("Check your messages" not "Verify your number")

## Changes Made

### Welcome Screen (`mobile/app/(auth)/welcome.tsx`)
| Element | Before | After | Why |
|---|---|---|---|
| Headline | "Understand the Quran, word by word" | "Finally understand what you hear in the Quran" | Taps into pain point of hearing without understanding. "Word by word" sounds tedious. |
| Subtitle | "Learn the most frequent Quranic words. 5 words a day. 5 minutes a lesson." | "5 words a day. 5 minutes a lesson. Start recognizing words on every page." | Benefit-forward. Removed "most frequent" — users don't care about frequency stats on a welcome screen. |
| Buttons | "Continue with Phone" / "Continue with Google" | **Kept as-is** | Universal pattern. Don't break familiar auth UX. |

### Intro Screen (`mobile/app/(onboarding)/intro.tsx`)
| Element | Before | After | Why |
|---|---|---|---|
| Headline | Kept as-is | — | "You already know more Arabic than you think" is warm and accurate. |
| Body | "As a Pakistani, about 40% of your Urdu vocabulary comes from Arabic. Let's build on that." | "Your Urdu vocabulary is already 40% Arabic. You're not starting from zero." | "As a Pakistani" is clinical. "You're not starting from zero" uses Endowed Progress Effect. |

### Motivation Screen (`mobile/app/(onboarding)/motivation.tsx`)
| Element | Before | After | Why |
|---|---|---|---|
| Headline | "Just 300 words cover 70% of the Quran" | "300 words. 70% of the Quran." | Punchier. Two short facts. |
| Body | "We start with the 50 most frequent words. 5 words per lesson. 5 minutes per day. By the end, you'll recognize something on almost every page." | "5 words a day. 5 minutes a lesson. You'll start recognizing words on every page of the Quran." | Too many numbers (50, 5, 5). "We start with" is system-centric. Focus on today. |

### How It Works (`mobile/app/(onboarding)/how-it-works.tsx`)
| Element | Before | After | Why |
|---|---|---|---|
| Step 2 title | "Practice & reinforce" | "Play quick games" | "Reinforce" sounds like homework. "Play" reduces anxiety. |
| Step 3 title | "Track your progress" | "See your growth" | Warmer. Growth > progress tracking. |
| CTA button | "Start Learning" | "Start my first lesson" | Personal ownership ("my") + concrete step ("first lesson"). |

### Phone Login (`mobile/app/(auth)/phone-login.tsx`)
| Element | Before | After | Why |
|---|---|---|---|
| Description | "We'll send you a verification code" | "We'll send you a quick code" | Less formal. "Verification" is legalistic. |

### OTP Verify (`mobile/app/(auth)/otp-verify.tsx`)
| Element | Before | After | Why |
|---|---|---|---|
| Headline | "Verify your number" | "Check your messages" | Direct instruction. "Verify" is abstract. "Messages" fits Pakistani SMS/WhatsApp context. |
| Description | "Enter the 4-digit code sent to..." | "Enter the code we just sent to..." | "We just sent" is more human than "sent to". |

### Learn Screen (`mobile/app/(tabs)/learn/index.tsx`)
| Element | Before | After | Why |
|---|---|---|---|
| Subtitle | "Your Quranic vocabulary journey" | "Your Quranic vocabulary" | "Journey" is a cliche. Keep it clean. |
| Stat label | "words learned" | "words I know" | Identity > activity. "I know" is a badge. |

### Challenge Screen (`mobile/app/(tabs)/challenge/index.tsx`)
| Element | Before | After | Why |
|---|---|---|---|
| Header | "Daily Challenge" | "Daily Win" | "Win" is positive framing vs "Challenge" which is pressure. |
| Subtitle | "A quick daily exercise to keep your streak" | "2 minutes to keep your momentum" | "Exercise" sounds like work. "Momentum" is energizing. |

### Words Screen (`mobile/app/(tabs)/words/index.tsx`)
| Element | Before | After | Why |
|---|---|---|---|
| Stat label | "Quranic words learned" | "Quranic words I know" | Matches Learn screen pattern. |
| Empty state | "Complete your first lesson to start building your word bank" | "Your first 5 words are one lesson away" | Forward-looking, specific, less instructional. |

### Library Screen (`mobile/app/(tabs)/library/index.tsx`)
| Element | Before | After | Why |
|---|---|---|---|
| Subtitle | "Your Quranic reference" | "Explore and understand" | Benefit-driven. |
| Surahs desc | "Browse all 114 surahs with translations" | "Read any surah with word-by-word meaning" | Benefit ("understand") vs feature ("browse"). |
| Salah desc | "Step-by-step prayer with Arabic and meaning" | "Understand every word of your daily prayers" | User-centric benefit. |
| Duas desc | "Common duas with transliteration and translation" | "Daily duas with meaning you'll actually remember" | Outcome-focused. |

### Lesson Entry (`mobile/src/components/lesson/LessonEntryCard.tsx`)
| Element | Before | After | Why |
|---|---|---|---|
| Button | "Start Lesson" | **Kept as-is** | Clear and functional. "Let's do this" is too casual for a Quran learning app. |

### Lesson Complete (`mobile/src/components/lesson/LessonComplete.tsx`)
| Element | Before | After | Why |
|---|---|---|---|
| Header | "+5 words!" | "5 New Words Unlocked!" | "Unlocked" implies value/reward. |
| Stat label | "words learned" | "Total Vocabulary" | More dignified. |
| Stat card | ayahCoverage + redundant "These X words appear across thousands of ayahs" | ayahCoverage only | Was saying the same thing twice. Removed duplicate. |

### Word Introduction Quick Check (`mobile/src/components/lesson/WordIntroduction.tsx`)
| Element | Before | After | Why |
|---|---|---|---|
| Wrong answer | `It means "X"` | `Not quite! It means "X"` | "Not quite" suggests closeness, reduces sting. |

### Activity Feedback (all activity components)
| Element | Before | After | Why |
|---|---|---|---|
| FillMeaning | No text feedback | "Correct!" / `Not quite! It means "X"` | Supportive text feedback was completely missing. |
| QuickFire | No text feedback | "Correct!" / "Not quite!" | Same. |
| SpotInQuran | No text feedback | "Found it!" / "Not that one — try again!" | Same. |
| Match | Visual only (red/green) | **Kept as-is** | Two-column layout makes text feedback cluttered. Visual + haptic is sufficient. |

## Seed Data Changes

### Word Introduction Headlines
All generic/repetitive headlines replaced with unique, word-specific ones. See `backend/prisma/seed/words.ts`.

Rule: **No two words should share the same headline.** Each headline should reference something specific about that word — its connection to Urdu, its frequency, a surah it appears in, a prayer it's part of, etc.

### Mid-Lesson Messages
Formulaic bodies that listed all 5 transliterations were rewritten to be more natural and varied. See `backend/prisma/seed/mid-messages.ts`.

### Content Review Changes (from Gemini Content Analysis)

#### 1. "Namaz" vs "Salah" Fix (Lesson 8 — Salah word intro)
| Element | Before | After | Why |
|---|---|---|---|
| urduCognateNote | "Namaz" is Persian — "Salah" is the Arabic/Qur'anic term | You know this as "Namaz" — the Qur'an calls it "Salah" | "Persian" frames Namaz as foreign/lesser. Pakistani users have deep spiritual connection to "Namaz". Bridge, don't correct. |
| body | In Pakistan, we often say "namaz" (from Persian), but the Qur'anic word is Salah. | You know this as namaz. In the Qur'an, Allah uses the beautiful word Salah. | Removed adversative "but". "Beautiful" adds reverence without invalidating Namaz. |

#### 2. Lesson 10 Word Reorder (Peak-End Rule)
| Element | Before | After | Why |
|---|---|---|---|
| Word order | Sabeel(46), Sirat(47), Yawm(48), Amr(49), Mawt(50) | Mawt(46), Sirat(47), Yawm(48), Amr(49), Sabeel(50) | Peak-End Rule: completing 50 words should end on a forward-looking note. "Path/Way" > "Death" for a milestone moment. |
| Mawt body | "the final word of your first 50" | "The Qur'an reminds us: every soul will taste death." | No longer the final word. Added Qur'anic resonance. |
| Sabeel body | (no milestone marker) | "your 50th word! ... your path to understanding continues." | New milestone marker + forward momentum. |
| Mid-message | Listed all transliterations in order | "From death to the path forward..." | Rewritten to reflect new narrative arc. |
| Lesson subtitle | "Path, day, command, and the ultimate destination" | "Life, death, and the path forward" | Reflects new ending. |

#### 3. Kafara Root Meaning (Lesson 6)
| Element | Before | After | Why |
|---|---|---|---|
| urduCognateNote | "Kufr" (disbelief) in Urdu comes from this root | "Kufr" in Urdu comes from this root — literally "covering" the truth | Root meaning is genuinely interesting and makes the word less charged. |
| body | means "to disbelieve" or "to deny." | literally means "to cover" — as in covering the truth. The Qur'an uses it for denial or disbelief... | Leads with etymology over label. Less charged for Pakistani context where "kafir" is a loaded term. |

#### 4. Lesson Title Improvements
| Lesson | Before | After | Why |
|---|---|---|---|
| 2 | The Foundations | The Source | Generic → evocative. Words are Allah, Kitab, Ayah, Rasool, Haqq — the divine source. |
| 7 | People | The People of the Qur'an | Too simple → specific. Invites curiosity. |
| 8 | Spiritual Life | Your Daily Worship | Generic → personal. Connects to daily practice (Salah, Shukr). |

#### Verb Definitions (No Change)
Gemini flagged that "Alima" = "to know" is technically "He knew" (past tense). We keep the simplified infinitive form for Day 1. Correct pedagogical choice — reduces cognitive load. Will revisit if confusion reported in later lessons.

### Decisions NOT Made (Rejected from Gemini Review)
| Suggestion | Why Rejected |
|---|---|
| Intro headline → "You already know 40% of this language" | Factually wrong. Users don't know 40% of Arabic. 40% of Urdu comes from Arabic — not the same claim. |
| Auth buttons → "Use my Phone Number" | Breaks universal "Continue with X" auth pattern. Users scan for familiar patterns. |
| Phone login → "What's your number?" | Too casual for Pakistani context. Sounds like someone asking for your number socially. |
| Learn header → "My Path" | Tab is labeled "Learn". Header saying "My Path" creates cognitive dissonance. Clarity > cleverness. |
| Lesson Entry → "Let's do this" | Too casual for a Quran app. Spiritual motivation deserves respectful tone. |
| Motivation headline → "Understand 70% of the Quran with just 300 words" | Less punchy than "300 words. 70% of the Quran." Original structure is more memorable as a headline. |
