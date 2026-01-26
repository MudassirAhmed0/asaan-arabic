# Planning Notes

## Core Product Insight
~300 unique words make up roughly 70% of the Qur'an. This means progress can be fast and tangible. A user who learns 5 words per day for 30 days knows 150 words — that's already meaningful Qur'anic comprehension. This is the foundation of the entire product.

---

## App Structure (Three Surfaces + Daily Challenge)

### 1. Learn (Daily Lessons)
- Each lesson teaches ~5 high-frequency Qur'anic words
- Lessons include tips, activities, and context
- Activities are varied to prevent monotony:
  - Some linked to Qur'an ayahs ("You just learned 'raheem' — here's where it appears")
  - Some linked to hadith
  - Some are simple Arabic practice/quizzes
- Easy, beginner-friendly — no prior Arabic knowledge needed
- 30-day structure for full Module 1

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
Each lesson: ~5 words, 5-10 minutes, 11 screens roughly. Three phases: Introduce → Reinforce → Celebrate.

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

### Screen 7 — Mid-Lesson Encouragement
- "5 words down."
- Reframe: "You already knew most of these from Urdu. Qur'anic Arabic is closer to you than you think."
- Transitions into reinforcement activities.

### Screens 8-10 — Reinforcement Activities (2-3 rounds)
**Activity types (mix and rotate across lessons):**
- **Match:** Arabic word → tap correct English meaning (all 5 words)
- **Spot it in Qur'an:** Show an ayah, user taps the word they recognize
- **Quick-fire:** Flash Arabic → pick from 2 choices. Speed round.
- **Fill the meaning:** "رَبّ means ___" with options
- Tone is "let's make these stick" — not "test time"

### Screen 11 — Lesson Complete
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
- 50 words across 10 lessons ready for MVP launch
- Sourced from corpus.quran.com
- ~40/50 are Urdu cognates
- Thematically grouped, nouns first, verbs from Lesson 4
- Lessons 11-30 (remaining 100 words) still TODO

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
- **Hosting:** Railway or Render (fast setup) or AWS for full control
- **Push notifications:** Firebase Cloud Messaging (FCM) — free, both platforms
- **Content delivery:** Lessons as JSON data, fetchable from API for OTA additions

### Why Not Supabase
- Cost scaling is unpredictable for a potentially viral app targeting 230M+ market
- Vendor lock-in on auth, database logic, push notifications
- Migrating later is painful — better to own the stack from day one
- With Claude as dev partner, NestJS setup speed is comparable

---

## Ramadan Launch Scope (Full Feature Set)

### The Reality
- ~20 days to Ramadan
- Launch 5-10 days before Ramadan
- With Mudassir + Claude as dev team, build speed is 10x traditional
- No artificial feature cuts — build the full engaging experience

### Launch Features: Build ALL of This
- **Learn tab**: First 10 lessons ready at launch (50 words)
  - Remaining lessons added via OTA during Ramadan
- **My Words tab**: Word bank with count, browse, self-test, "needs revision" marking
- **Daily Challenge**: Memory tests, fun facts, quick quizzes + push notifications
- **Word count display**: Prominent, beautiful, screenshot-worthy
- **Shareable progress card**: Instagram story optimized
- **Streak system**: Islamic framing ("Day 12 of your journey to understand Allah's words")
- **Library tab**: Surah translations, Salah meanings, common duas
- **Weekly review quiz**: End-of-week reinforcement
- **Onboarding flow**: Simple, fast, gets user into Lesson 1 quickly

### Deferred (Business Decisions, Not Dev Speed)
- Module 2 content (doesn't exist yet)
- Premium / payments (need users first)
- Leaderboard / social features (need user base first)
- Family plans, lifetime access

### Content Strategy During Ramadan
- Launch with 10 lessons (50 words)
- Add 2-3 lessons per week via OTA updates during Ramadan
- Users do ~1 lesson per day, so we stay ahead of them
- Adjust based on early user feedback

---

## Module 1 (Free) — "Understand Your First 150 Words"
- 30 days total, ~5 words per lesson
- Words chosen by frequency in the Qur'an (most common first)
- By Day 30: user has a word bank of ~150 words
- Library tab available for reference browsing
- This module must be genuinely excellent — it IS the marketing

## Module 2 (Premium) — "Go Deeper"
- Continues vocabulary beyond 150 words (toward 500, then 1000)
- Introduces basic Qur'anic grammar (sentence patterns)
- Enhanced spaced repetition / smart review
- Surah-by-surah guided reading
- Goal: "Understand 70%+ of the Qur'an's words"

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

## Monetization Plan (Post-Launch)

### Principle
Never paywall basic Qur'anic understanding. Earn trust first. Monetize depth.

### Free (Forever)
- Full Module 1 (30 days, ~150 words)
- Word bank with full functionality
- Library (reference content)
- Basic daily challenge
- Basic review/self-test

### Premium Subscription
- PKR 600-800/month (~$2-3) or PKR 4,000-5,000/year (~$15-18)
- Module 2+ content
- Advanced review system
- Surah-by-surah guided reading
- Offline access
- Family plan option

### Lifetime Access
- PKR 8,000-10,000 (~$30-35) one-time
- Many Pakistani users prefer this over subscriptions

### Ramadan Pricing
- Discounted annual plan during Ramadan

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
- Professional Qari recordings for all 50 launch words (standalone base-form pronunciation)
- Recorded in parallel with development — ready before production
- No AI TTS — Qur'anic Arabic requires tajweed, audience will notice, trust-killer
- QuranWBW.com open-source word-by-word audio available as supplementary resource for ayah-context audio
- Mudassir has access to Qaris in Pakistan

## Open Questions
- App name?
- Ayah examples for each of the 50 launch words
- Fun facts / context tips for each word introduction screen
- What's the right mix of challenge types? (Memory vs facts vs quiz)
- Hosting choice: Railway vs Render vs AWS?
