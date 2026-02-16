# Planning Notes

## Core Product Insight
~300 unique words make up roughly 70% of the Qur'an. This means progress can be fast and tangible. A user who learns 5 words per day for 30 days knows 150 words — that's already meaningful Qur'anic comprehension. This is the foundation of the entire product.

---

## App Structure (Three Surfaces + Daily Challenge)

### 1. Learn (Daily Lessons)
- Each lesson teaches 5 high-frequency Qur'anic words + 1 Arabic Insight (grammar nugget)
- Lessons include tips, activities, and context
- Activities are varied to prevent monotony:
  - Some linked to Qur'an ayahs ("You just learned 'raheem' — here's where it appears")
  - Some linked to hadith
  - Some are simple Arabic practice/quizzes
- Easy, beginner-friendly — no prior Arabic knowledge needed
- 60 lessons total (5 words each = 300 words = ~70% of Quran)

### 2. My Words (Word Bank)
- This is the user's real progress home
- Shows total word count: "You know 150 words"
- Browse all learned words
- Self-test / quiz on any words
- Mark words as "needs revision" — lightweight spaced repetition
- User controls their own review
- Words are the unit of progress, not lessons
- Word count is designed to be screenshot-worthy (social currency)

### 3. Library (Reference)
- Surah translations (full text with meaning)
- Salah translation (what you say in each part of prayer)
- Common duas with meaning
- This is browse-anytime content, NOT the learning path
- Future potential: highlight words the user has already learned

### 4. Daily Challenge (Retention Hook)
- Separate from lessons — this is a 1-minute engagement loop
- Push notification pulls the user in daily even when they skip lessons
- Types of challenges:
  - Memory test: "Do you remember what 'sabr' means?" (from their learned words)
  - Fun Arabic fact: "Did you know Arabic has 100+ words for camel?"
  - Quick quiz: "Which of these words means 'mercy'?"
  - Fact of the day: "The word 'kitab' appears 230 times in the Qur'an"
- Competitive element: show the user where they stand (score, streak, ranking)
- People love winning, love seeing their rank, love comparing with friends
- This is the "even on a lazy day I'll open the app" feature

**Two daily hooks:**
1. Lesson (5-10 min) — builds word bank, the learning engine
2. Challenge (1 min) — tests memory, fun facts, keeps the app alive in their routine

Even if someone skips the lesson, the challenge keeps them coming back. Once they're in for the challenge, many will do the lesson too.

---

## Lesson Design (Screen-by-Screen)

### Lesson Structure Overview
Each lesson: 5 words + 1 Arabic Insight (grammar), 5-10 minutes, ~12 screens. Four phases: Introduce → Insight → Reinforce → Celebrate.

### Screen 1 — Lesson Card (Entry)
- Lesson number
- "5 new words"
- Teaser subtitle hinting at what's coming (e.g., "Today: Mercy, Patience, and words you already know")
- [Start] button
- Short. No overwhelm.

### Screens 2-6 — Word Introductions (one per word)
**Critical rule: No two words are introduced the same way.** Rotate between these styles:

1. **"You already know this"** — For Urdu cognates. Show the word, meaning, and point out they already use it. Confidence booster.
2. **"See it in the Qur'an"** — Show an ayah with the word highlighted. Ask user to guess meaning first, then reveal. Discovery moment.
3. **"Fun fact"** — Introduce with a surprising stat or fact about the word. ("'Ilm' appears 780+ times. No other book emphasizes knowledge this much.")
4. **"Quick check"** — Show word + meaning, then immediately test with a simple tap question. Active learning.
5. **"Connect to your life"** — Link the word to something they already say in prayer or daily life. ("You say this in every salah.")

Each word screen includes:
- Arabic word (large, beautiful typography)
- Transliteration
- English meaning
- Audio pronunciation
- The unique presentation element (fact, ayah, cognate note, etc.)

### Screen 7 — Arabic Insight (PREMIUM — DECISION-012)
- **NEW SCREEN TYPE** — teaches ONE micro-grammar concept tied to the 5 words just learned
- Format: Headline → Pattern explanation → Qur'anic example → "Try it" moment
- Lessons 1-3: NOT PRESENT (trust phase)
- Lessons 4-7: Fully unlocked with gold "Premium — free for you!" badge (taste phase)
- Lesson 8+: Headline visible, content blurred behind frosted glass, lock icon (lock phase)
- Examples:
  - Lesson 4: "The fa'ala pattern — every past tense verb follows this shape"
  - Lesson 5: "Jannah & Nar — the Qur'an always teaches in pairs"
  - Lesson 6: "آمَنَ → إيمان → مُؤْمِن — one root, three words"
  - Lesson 7: "When you see -ين at the end, it means 'those who'"

### Screen 8 — Mid-Lesson Encouragement
- "5 words down."
- Reframe: "You already knew most of these from Urdu. Qur'anic Arabic is closer to you than you think."
- Transitions into reinforcement activities.

### Screens 9-11 — Reinforcement Activities (3 rounds: 2 free + 1 premium)
**Free activity types:**
- **Match:** Arabic word → tap correct English meaning (all 5 words)
- **Quick-fire:** Flash Arabic → pick from 2 choices. Speed round.
- **Fill the meaning:** "رَبّ means ___" with options

**Premium activity types (locked for free users after Lesson 7):**
- **Pattern Match:** Tests grammar concept from Arabic Insight — "رَبُّهُمْ means 'their Lord.' What does رَبُّنَا mean?"
- **Spot it in Qur'an:** Show an ayah, user taps the word they recognize
- **Decode the Ayah** (post-launch): Break down a real ayah using learned words + grammar patterns

- Tone is "let's make these stick" — not "test time"

### Screen 12 — Lesson Complete
- "+5 words" with animation/emphasis
- Updated total word count: "You now know X words"
- Qur'anic coverage stat: "These words appear in X,000+ ayahs"
- [Continue to Word Bank] button
- [Share Progress] button → generates Instagram-ready shareable card

### The Shareable Card
- Clean, beautiful design
- "I just learned X Qur'anic words"
- Qur'anic coverage stat
- App name + subtle branding
- Optimized for Instagram story dimensions

### Lesson Design Principles
1. **No two words introduced the same way** — vary styles to prevent monotony
2. **Urdu cognates are confidence boosters** — point them out, especially in early lessons
3. **Connect to Qur'an early and often** — real ayahs, not just flashcards
4. **Activities reinforce, not test** — supportive tone, not exam tone
5. **End with a number** — word count + Qur'anic coverage stat. Always.
6. **5-10 minutes max** — if over 10 min, the lesson is too long
7. **Lesson 1 is special** — pick words with Urdu cognates so user immediately feels "I know more Arabic than I thought"

### Word List
Full word list lives in **words.md** (separate file).
- 300 words across 60 lessons (DECISION-015)
- Sourced from corpus.quran.com by frequency
- ~40/50 first words are Urdu cognates; cognate density decreases in later lessons
- Thematically grouped, nouns first, verbs from Lesson 4
- All 300 words complete — seed data generated in 12 files (~9,300 lines)

---

## Technical Stack

### Frontend
- **React Native + Expo** — One codebase, both Android + iOS
- Expo OTA updates — push new lessons during Ramadan without app store review
- Expo push notifications built-in
- TypeScript for type safety and Claude-assisted development speed

### Backend
- **NestJS** — Structured, scalable Node.js/TypeScript API framework
- **PostgreSQL** — Database (reliable, free, scales well)
- Full ownership — no vendor lock-in, predictable costs at scale
- JWT-based auth (email/password to start, Google sign-in later)

### Infrastructure
- **Hosting:** Railway (backend), Vercel (website)
- **Push notifications:** Firebase Cloud Messaging (FCM) — free, both platforms, code complete
- **OTA Updates:** expo-updates configured with channels (preview, production)
- **Content delivery:** Lessons as JSON data, fetchable from API for OTA additions

### Why Not Supabase
- Cost scaling is unpredictable for a potentially viral app targeting 230M+ market
- Vendor lock-in on auth, database logic, push notifications
- Migrating later is painful — better to own the stack from day one
- With Claude as dev partner, NestJS setup speed is comparable

---

## Ramadan Launch Scope (Full Feature Set)

### The Reality
- Launch before Ramadan (target: late Feb / early March 2026)
- With Mudassir + Claude as dev team, build speed is 10x traditional
- No artificial feature cuts — build the full engaging experience
- **300 words across 60 lessons** — seed data COMPLETE, ready for production seeding
- Beta APK live with preview channel, OTA updates active

### Launch Features: Build ALL of This
- **Learn tab**: All 60 lessons ready at launch (300 words + 60 Arabic Insights)
- **My Words tab**: Word bank with count, browse, "needs revision" marking
- **Practice tab**: Quiz/review on learned words (PREMIUM)
- **Daily Challenge**: Memory tests, fun facts, quick quizzes + push notifications
- **Word count display**: Prominent, beautiful, screenshot-worthy
- **Pattern count display**: Second progress metric (PREMIUM)
- **Shareable progress card**: Instagram story optimized
- **Streak system**: Islamic framing ("Day 12 of your journey to understand Allah's words")
- **Weekly review quiz**: End-of-week reinforcement (PREMIUM)
- **Onboarding flow**: Simple, fast, gets user into Lesson 1 quickly
- **Freemium system**: Taste then lock (DECISION-014)
- **Premium purchase flow**: Monthly/Annual/Lifetime pricing

### Deferred (Post-Launch)
- Library tab (Surah translations, Salah meanings, common duas — needs Quranic text verification)
- Decode the Ayah activity type (needs new frontend component)
- Build the Phrase activity type (needs new frontend component)
- Leaderboard / social features (need user base first)
- Family plans
- JazzCash/EasyPaisa integration (App Store/Play Store payments first)

---

## Content Scope — 300 Words, 60 Lessons (DECISION-015)
- 60 lessons total, 5 words per lesson, 1 Arabic Insight per lesson
- 300 words = ~70% of the Qur'an — the core product claim
- Words chosen by frequency from corpus.quran.com (most common first)
- Grammar concepts escalate alongside vocabulary complexity
- Users do ~1 lesson/day = ~2 months of content

## Freemium Model (DECISION-013)

### Free Forever (no time limit)
- All 300 words across all 60 lessons (word count always grows)
- All word introductions (5 styles per lesson)
- Word bank (browse all learned words)
- Basic activities per lesson (Match + Fill Meaning)
- Daily Challenge
- Share cards + word count
- Mid-lesson encouragement + lesson completion

### Premium (Asaan Arabic Premium)
- Arabic Insights (grammar nuggets) — blurred in lesson flow for free users
- Practice mode (quiz/review on learned words)
- Weekly Review
- Advanced activities (Pattern Match, Decode the Ayah)
- Pattern count as second progress metric

### Premium Introduction (DECISION-014)
- Lessons 1-3: No premium features (trust phase)
- Lessons 4-7: Premium features FREE with gold "Premium — free for you!" badge (taste phase)
- Lesson 8+: Premium features BLURRED/LOCKED (lock phase)
- Practice mode: free until 25 words, then locks
- Weekly Review: first one free, then locks
- Lesson-based gating, NOT day-based

### Pricing
| Plan | Price |
|---|---|
| Monthly | PKR 799 |
| Annual | PKR 4,999 (save 48%) |
| Lifetime | PKR 7,999 |

### Referral Program
- Refer friend who downloads → +7 days premium free
- Friend completes Lesson 1 → +7 more days
- Share progress card → +1 day

---

## Retention Plan

### The Word Counter (Core Mechanic)
- Always visible, always growing
- "You know 47 words" → "You know 150 words"
- Tangible, permanent, personal
- Designed to be screenshotted and shared
- Can tie to Qur'anic comprehension: "These words appear in 40% of the Qur'an"

### Daily Challenge (Second Hook)
- 1-minute engagement, separate from lessons
- Memory tests, fun facts, quick quizzes
- Push notification driven
- Competitive: where do you stand? What's your score?
- Keeps users opening the app even on days they skip lessons
- Low friction, high retention

### Milestone Moments (Shareable)
- "You've learned 50 words!" — beautiful shareable card
- Designed for Instagram stories
- This is how users organically spread the app

### Daily Streak (Islamic Framing)
- Framed as spiritual commitment, not gamification
- "Day 12 of your journey to understand Allah's words"
- Gentle nudges, not guilt-based

### Weekly Review
- End-of-week quiz
- Feeds into "needs revision" marking

---

## Distribution & Growth Strategy

### Primary: Founder-Led Content (Mudassir)
- Daily content showing up as someone who understands Arabic
- Emotional, aspirational angle: "When I read this ayah, I knew exactly what to do"
- Show what life looks like when you understand Qur'an
- Platform: Instagram (reels, stories, posts), potentially TikTok
- Authentic, not salesy — people follow people, not apps

### Pre-Ramadan Campaign
- Scarcity angle: "Ramadan is X days away. Imagine understanding Taraweeh this year."
- Missing-out angle: "Don't let another Ramadan pass without understanding what you hear"
- Start campaign 5-10 days before Ramadan
- Build anticipation, collect early signups if possible

### Organic Social Proof
- Word count as social currency on Instagram
- Physical gatherings: "I've hit 100 words" becomes real-life conversation
- Friend groups compete naturally
- Design the progress card to be beautiful and share-worthy

### NOT Primary Channels
- WhatsApp sharing (not how this audience shares apps)
- Paid ads (not for launch — founder content first)
- Mosque/madrasa partnerships (maybe later, not now)

---

## Monetization Plan (DECISION-013)

### Principle
Words are free. Grammar and practice are premium. The Quran's words belong to everyone. Our teaching methodology is the product.

### Pricing
| Plan | Price | Notes |
|---|---|---|
| Monthly | PKR 799/month | Entry point |
| Annual | PKR 4,999/year | Best value badge (save 48%) |
| Lifetime | PKR 7,999 one-time | Expected top seller — Pakistanis prefer one-time payments |

### Referral Program
- Refer friend → +7 days premium free
- Friend completes Lesson 1 → +7 more days
- Share progress card → +1 day

### Payment Gateways
- Google Play / Apple Pay (standard)
- JazzCash / EasyPaisa (essential for Pakistan)
- Lifetime deal will outsell monthly 3:1

### No Ads — Ever
- Religious content + ads = broken trust
- "No ads" is a differentiator

---

## Why This Wins vs Existing Apps

| Existing Problem | Our Answer |
|---|---|
| Duolingo teaches conversational/MSA Arabic | Qur'anic Arabic only |
| Bayyinah is $11/month, lecture-heavy | Interactive, priced for Pakistan |
| Most apps start from alphabet | High-frequency words, payoff from Day 1 |
| No app tracks word-level progress | Word bank + word counter = tangible progress |
| No daily challenge / competitive hook | Daily challenge keeps users coming back |
| No founder-led brand in this space in Pakistan | Mudassir's personal content builds trust |
| Apps feel either too local or too foreign | English flow, Pakistani context |

---

## Key Assumptions to Validate
- 5 words per lesson is the right pace
- Word-frequency order is more motivating than thematic grouping
- Users will screenshot/share their word count on Instagram
- Daily challenge is compelling enough to drive daily opens
- PKR 600-800/month is the right price point
- 10-15 days is enough to build a usable MVP
- We can create lesson content fast enough to stay ahead of users during Ramadan
- Founder-led content will drive enough initial downloads

---

## Audio Strategy
- Professional Qari recordings for all 300 words (standalone base-form pronunciation)
- Recorded in parallel with development — ready before production
- No AI TTS — Qur'anic Arabic requires tajweed, audience will notice, trust-killer
- QuranWBW.com open-source word-by-word audio available as supplementary resource for ayah-context audio
- Mudassir has access to Qaris in Pakistan

## Open Questions (Resolved)
- ~~App name?~~ → **Asaan Arabic** — "Samajh ke Parho"
- ~~Ayah examples for each of the 50 launch words~~ → 22 ayah highlights seeded for L1-L10 SPOT_IN_QURAN words; remaining L11-L60 still needed
- ~~Fun facts / context tips for each word introduction screen~~ → All 300 introductions generated (5 styles)
- ~~What's the right mix of challenge types?~~ → 90 challenges generated (quiz + fact types)
- ~~Hosting choice?~~ → Railway (backend) + Vercel (website)

## Open Questions (Remaining)
- Payment gateway integration (App Store/Play Store + JazzCash/EasyPaisa)
- Audio file hosting/CDN (S3 + CloudFront vs Cloudflare R2)
- Admin panel deployment and auth
- Analytics pipeline design
