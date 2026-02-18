# Project Status — Asaan Arabic | "Samajh ke Parho"

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
- Ramadan launch target: launch before Ramadan (late Feb / early March 2026)
- Technical stack: React Native + Expo (frontend), NestJS + PostgreSQL (backend)
- App name: **Asaan Arabic** — Tagline: **"Samajh ke Parho"**
- Hosting: **Railway** (backend), **Vercel** (website)
- Phase: **Features 0-10 built, audit fixes applied, production build done, Google Play closed testing submitted**
- **300-word seed data COMPLETE** — 12 seed files, ~9,300 lines (60 lessons, 300 words, 180 activities, 90 challenges, 60 mid-messages, 60 celebrations)
- **60 Arabic Insights seeded** — 1 per lesson (ROOT_PATTERN, GRAMMAR_TIP, CULTURAL_NOTE, PATTERN_RECOGNITION, WORD_FAMILY)
- **Premium/Freemium system BUILT** — RevenueCat SDK installed but UI removed (paywall stubbed), premium gating bypassed for launch, subscriptions backend ready
- Backend deployed to Railway (auto-deploys from `main`)
- Preview APK built and distributed (EAS Build)
- OTA updates configured and tested (first update pushed Feb 14)
- Auth persistence bugs fixed (session expiry + onboarding state)
- Splash screen redesigned (768x768 square, needs new APK for Android 12+)
- Push notifications: code 100% complete on both ends, pending Firebase env vars on Railway
- CMS built (`/cms`), Website live (`/web` on Vercel)
- Delete Account feature built (backend + mobile) — Play Store requirement
- Pre-Ramadan Instagram campaign: 22 posts done (Feb 2-12), 28 ready, campaign live

## What To Do Next
1. **Set Firebase env vars on Railway** — `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY` → test push notifications
2. **Add remaining AyahHighlights** — 167/300 done, remaining 133 words still need highlights
3. **Apple App Store submission** — developer account + store listing
4. **Google Play: promote from closed testing** — monitor feedback, then open/production
5. Feature 6 (Library) deferred to post-launch
6. See `progress.md` for full checklist

## Where We Want to Go
- Launch full-featured app (300 words, 60 lessons, freemium model) before Ramadan
- Founder-led Instagram campaign drives initial users
- Users learn Qur'anic words + grammar patterns daily through Ramadan
- Free users share word counts, premium users unlock grammar insights and practice
- Validate retention + premium conversion during Ramadan
- After Ramadan: optimize conversion, add Decode the Ayah, expand content

## Current Plan
1. **DONE** — Define product direction, user persona, core concept
2. **DONE** — Define app structure (Learn, My Words, Practice, Daily Challenge)
3. **DONE** — Define distribution strategy (founder-led content, Instagram, pre-Ramadan campaign)
4. **DONE** — Define retention plan (word counter, daily challenge, milestones, pattern counter)
5. **DONE** — Design what a single lesson actually looks like (screen-by-screen, including Arabic Insight)
6. **DONE** — Source Qur'anic word list → words.md (300 words complete)
7. **DONE** — Technical decisions: React Native + Expo, NestJS + PostgreSQL, FCM, JWT auth
8. **DONE** — Freemium model designed (DECISION-013, 014): words free forever, grammar/practice premium, taste-then-lock
9. **DONE** — Build 300-word seed data (60 lessons, 300 words, 180 activities, 90 challenges, all content)
10. **DONE** — Deploy backend to Railway, configure EAS builds + OTA updates
11. **DONE** — Fix beta bugs (auth persistence, splash screen, session expiry)
12. **DONE** — Build push notification system (backend + mobile, pending Firebase config)
13. **DONE** — Build premium system (RevenueCat, subscriptions, Arabic Insights, gating on Practice + Review)
14. **DONE** — Run production seed + migration against Railway DB
15. **DONE** — Production backend audit (17 issues found in 8 phases — `backend/AUDIT.md`)
16. **IN PROGRESS** — Frontend testing (functional, UI, retention)
17. **IN PROGRESS** — Firebase setup + test push notifications
18. **DONE** — Fix audit issues (backend + mobile)
19. **DONE** — Build production .aab + submit Google Play closed testing
20. **DONE** — Delete Account feature (Play Store requirement)
21. **IN PROGRESS** — Apple App Store submission
22. Mudassir pre-Ramadan campaign LIVE (started Feb 2, 22 posts done, 28 ready)
23. Launch on both Android + iOS

## Decisions Made

| Decision | Why |
|---|---|
| Qur'anic Arabic only, not MSA | User's motivation is understanding Qur'an and prayers, not conversation |
| English app flow, Urdu as learning aid | Digitally active Pakistanis prefer English interfaces. Urdu helps with Arabic cognates. |
| Word-centric learning with grammar woven in | 5 words + 1 Arabic Insight per lesson. Words alone don't create comprehension. |
| Words free forever, grammar/practice premium | Words drive word-of-mouth. Premium unlocks depth (grammar, practice, review). No time limit. (DECISION-013) |
| Taste-then-lock premium introduction | Lessons 1-3 free, 4-7 premium free with badge, 8+ locked. Lesson-based gating. (DECISION-014) |
| 300 words across 60 lessons | Full "70% of Quran" claim. 2 months of content at launch. (DECISION-015) |
| No ads, ever | Religious content + ads = broken trust. No-ads is a differentiator. |
| Pakistan-first | Don't dilute focus. Diaspora is a bonus, not the target. |
| Founder-led content as primary distribution | People follow people, not apps. Mudassir's authentic content > paid marketing. |
| Instagram as primary sharing platform | This is where the target audience actually shares and discovers. Not WhatsApp. |
| Word count + pattern count as social currency | Two shareable metrics. Designed to be screenshotted, shared on Instagram, flexed in gatherings. |
| Daily challenge as retention hook | 1-minute engagement keeps users opening the app even on lazy days. Stays free. |
| Ramadan launch target | Biggest motivation window of the year. Scarcity + aspiration campaign angle. |
| Lesson flow: Introduce → Insight → Reinforce → Celebrate | 4-phase structure. ~12 screens per lesson. 5-10 min. |
| No two words introduced the same way | Rotate between 5 styles: cognate, Qur'an context, fun fact, quick check, life connection. |
| Lesson 1 uses mostly Urdu cognates | First impression must be "I already know more Arabic than I thought." |
| Activities: 2 free + 1 premium per lesson | Match + Fill Meaning free. Pattern Match / Spot in Quran premium. |
| Every lesson ends with word count + Qur'anic stat | The payoff screen. Makes small progress feel significant. |
| React Native + Expo for frontend | Cross-platform, OTA updates, TypeScript + Claude = fast dev. |
| NestJS + PostgreSQL for backend | Full ownership, no vendor lock-in, predictable costs. |
| Firebase Cloud Messaging for push | Free, both platforms, industry standard. |
| Professional Qari audio, recorded in parallel | Ship with real Qari pronunciation. No AI TTS. |
| Warm coaching tone, not clinical/educational | Supportive friend, not textbook. Respectful but not casual. |
| Premium copy: never guilt-based | "Your words are yours forever" not "Don't miss out on Quran learning" |
| Pricing: PKR 799/mo, 4999/yr, 7999 lifetime | Lifetime expected top seller. JazzCash/EasyPaisa essential. |
| Referral program | Refer friend → +7 days premium free. Friend completes Lesson 1 → +7 more. |
| Copy decisions documented in copy-decisions.md | All copy changes, rationale, and before/after tracked. |

## Open Questions / Unknowns
- Payment gateway integration (JazzCash/EasyPaisa for Pakistan — RevenueCat handles App Store/Play Store)
- Analytics pipeline design
- CMS deployment and admin auth
- Streak freeze/grace period mechanics (deferred to post-beta — DECISION-010)

## Virtual Team
A 12-role AI virtual team operates from `/team/`. Each role has its own MD file with principles, biases, and red lines. Run standups, consult specialists, and log decisions. See `/team/README.md` for usage.

## Action Items for Mudassir
- **Set Firebase env vars on Railway** — `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`
- **Set up RevenueCat + pricing** — see checklist below
- **Monitor Google Play closed testing** — check for review feedback, promote when ready
- **Apple App Store submission** — developer account + store listing
- Schedule Qari recording session for **300 words** (parallel with dev)

## RevenueCat + Pricing Setup Checklist

Pricing (DECISION-013): PKR 799/mo, PKR 4,999/yr, PKR 7,999 lifetime.
Our code uses entitlement `AsaanArabic Pro` and API key `test_cJNvcdRYrAUKGiDTLsuvhFiJwZr`.

### Step 1: Google Play Console (Android)
- [ ] Create app listing for Asaan Arabic
- [ ] Go to Monetize → Products → Subscriptions
- [ ] Create subscription: `asaan_arabic_monthly` — PKR 799/month
- [ ] Create subscription: `asaan_arabic_annual` — PKR 4,999/year (badge: "Save 48%")
- [ ] Go to Monetize → Products → In-app products
- [ ] Create one-time product: `asaan_arabic_lifetime` — PKR 7,999 (non-consumable)

### Step 2: RevenueCat Dashboard
- [ ] Create project at app.revenuecat.com
- [ ] Add Android app (paste Google Play package name + service account JSON)
- [ ] Create Entitlement: `AsaanArabic Pro`
- [ ] Add Products: link `asaan_arabic_monthly`, `asaan_arabic_annual`, `asaan_arabic_lifetime` from Play Store
- [ ] Attach all 3 products to the `AsaanArabic Pro` entitlement
- [ ] Create Offering: `default` — add all 3 products as packages (Monthly, Annual, Lifetime)
- [ ] Copy **Public API Key** (Android) — update in `mobile/src/services/purchases.ts` if different from test key
- [ ] Set up Webhook: URL = `https://asaan-arabic-production.up.railway.app/subscriptions/webhook`
- [ ] Set webhook auth header secret → add as `REVENUECAT_WEBHOOK_SECRET` env var on Railway

### Step 3: Apple App Store Connect (iOS — when ready)
- [ ] Create app listing
- [ ] Create auto-renewable subscriptions: monthly + annual (same pricing in PKR or USD equivalent)
- [ ] Create non-consumable IAP: lifetime
- [ ] Add iOS app in RevenueCat, link products
- [ ] Copy **Public API Key** (iOS) — update in `mobile/src/services/purchases.ts`

### Step 4: Verify
- [ ] Build APK with `eas build --profile preview --platform android`
- [ ] Tap "Unlock Premium" anywhere → RevenueCat native paywall shows 3 options
- [ ] Complete sandbox purchase → premium unlocks immediately
- [ ] Kill app, reopen → premium status persists
- [ ] Check Railway logs → webhook received from RevenueCat
