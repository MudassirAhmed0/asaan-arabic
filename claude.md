# Project Status — Arabic Learning App for Pakistan

## Development Workflow
Each feature follows this cycle:
1. **Build** — Implement backend + frontend for the feature
2. **Manual Test** — Mudassir tests the feature end-to-end, reports issues
3. **Revise** — Fix bugs and address feedback from testing
4. **Commit** — Once stable, commit the feature
5. **Move on** — Start the next feature

No feature moves forward until the previous one is tested and committed.

## Where We Are Right Now
- Product direction defined and aligned
- Three core files established: goals.md, planning.md, claude.md
- Ramadan launch target identified: launch 5-10 days before Ramadan (~10-15 day build window)
- Technical stack decided: React Native + Expo (frontend), NestJS + PostgreSQL (backend)
- No name yet. No design yet.
- Phase: **Feature 2 built (Lesson List & Lesson Flow) → testing + copy polish**

## Where We Want to Go
- Launch full-featured app (Module 1 partial content, all engagement features) before Ramadan
- Founder-led Instagram campaign drives initial users
- Users learn Qur'anic words daily through Ramadan
- Validate retention + product-market fit during Ramadan
- After Ramadan: complete Module 1, build Module 2, introduce premium

## Current Plan
1. **DONE** — Define product direction, user persona, core concept
2. **DONE** — Define app structure (Learn, My Words, Library, Daily Challenge)
3. **DONE** — Define distribution strategy (founder-led content, Instagram, pre-Ramadan campaign)
4. **DONE** — Define retention plan (word counter, daily challenge, milestones)
5. **DONE** — Design what a single lesson actually looks like (screen-by-screen)
6. **DONE** — Source Qur'anic word list → words.md (50 words, 10 lessons, from corpus.quran.com)
7. **DONE** — Technical decisions: React Native + Expo, NestJS + PostgreSQL, FCM, JWT auth
8. **NEXT** — Build (full feature set, not cut-down MVP)
9. Mudassir starts pre-Ramadan content campaign
10. Launch on both Android + iOS

## Decisions Made

| Decision | Why |
|---|---|
| Qur'anic Arabic only, not MSA | User's motivation is understanding Qur'an and prayers, not conversation |
| English app flow, Urdu as learning aid | Digitally active Pakistanis prefer English interfaces. Urdu helps with Arabic cognates. |
| Word-centric learning, not surah-centric | Learning 5 words/day builds real vocabulary. Surah translations are reference, not learning. |
| Three surfaces + daily challenge | Learn (lessons), My Words (word bank), Library (reference), Daily Challenge (retention hook). Each has a clear job. |
| Module 1 free, Module 2 premium | Free module drives word-of-mouth. Premium unlocks depth after trust is built. |
| No ads, ever | Religious content + ads = broken trust. No-ads is a differentiator. |
| Pakistan-first | Don't dilute focus. Diaspora is a bonus, not the target. |
| Founder-led content as primary distribution | People follow people, not apps. Mudassir's authentic content > paid marketing. |
| Instagram as primary sharing platform | This is where the target audience actually shares and discovers. Not WhatsApp. |
| Word count as social currency | Designed to be screenshotted, shared on Instagram, flexed in gatherings. |
| Daily challenge as second retention hook | 1-minute engagement keeps users opening the app even on lazy days. Competitive element. |
| Ramadan launch target | Biggest motivation window of the year. Scarcity + aspiration campaign angle. |
| MVP with 7-10 lessons at launch | Ship fast, add lessons during Ramadan. Users do 1/day so we stay ahead. |
| Lesson flow: Introduce → Reinforce → Celebrate | 3-phase structure. ~11 screens per lesson. 5-10 min. |
| No two words introduced the same way | Rotate between 5 styles: cognate, Qur'an context, fun fact, quick check, life connection. Prevents monotony. |
| Lesson 1 uses mostly Urdu cognates | First impression must be "I already know more Arabic than I thought." Confidence hook. |
| Activities reinforce, not test | Supportive tone. "Let's make these stick" not "quiz time." |
| Every lesson ends with word count + Qur'anic stat | The payoff screen. "These 5 words appear in 2,800+ ayahs." Makes small progress feel significant. |
| 50 launch words in words.md | Frequency-based from corpus.quran.com. ~40/50 Urdu cognates. Thematically grouped into 10 lessons. |
| Word list is a separate file (words.md) | Content asset, not planning notes. Will grow to 150+ words. Easier to reference and update. |
| React Native + Expo for frontend | Cross-platform (Android + iOS), OTA updates for pushing lessons during Ramadan, TypeScript + Claude = fast dev. |
| NestJS + PostgreSQL for backend | Full ownership, no vendor lock-in, predictable costs at scale. Supabase rejected — cost scaling unpredictable, not production-grade for scalable apps. |
| Firebase Cloud Messaging for push | Free, works on both platforms, industry standard. |
| JWT auth (email/password first) | Simple, built into NestJS. Google sign-in added later. |
| Build ALL engagement features, not cut-down MVP | Mudassir + Claude = 10x dev speed. No reason to defer streaks, library, weekly review, etc. Only defer business decisions (premium, leaderboards). |
| Both Android + iOS at launch | Expo makes this one codebase. No reason to limit to one platform. |
| Professional Qari audio, recorded in parallel with dev | Ship with real Qari pronunciation from day one. No AI TTS. No temporary audio. |
| Warm coaching tone, not clinical/educational | Copy should feel like a supportive friend, not a textbook. "Play quick games" not "Practice & reinforce". "words I know" not "words learned". Respectful but not casual — no "Let's do this" for a Quran app. |
| Every word introduction headline must be unique | No two words should have the same headline ("You already know this!" was repeated 7 times). Each headline should be specific to that word. |
| Copy decisions documented in copy-decisions.md | All copy changes, rationale, and before/after tracked in a dedicated file. |

## Open Questions / Unknowns
- App name?
- Hosting choice: Railway vs Render vs AWS?
- Onboarding flow design

## Action Items for Mudassir
- Ready to start building
- Schedule Qari recording session for 50 words (parallel with dev)
- Start planning pre-Ramadan content
- Think about app name
- Choose hosting
