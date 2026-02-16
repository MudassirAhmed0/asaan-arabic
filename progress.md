# Progress Tracker

Last updated: 2026-02-15

---

## Feature 0: Foundation Setup
**Status: DONE**

### Backend
- [x] Extend Prisma schema with all new models (20+ models, enums, relations)
- [x] Run migration (`20260126211650_add_content_progress_library_models`)
- [x] Create seed script infrastructure (`prisma/seed/`)
- [x] Seed 60 lessons + 300 words + introductions + 180 activities + 60 mid-messages + 60 celebrations + 90 challenges
- [x] Fix Prisma v7 PrismaClient: `@prisma/adapter-pg` driver adapter required (no `url` in schema)
- [x] Backend deployed to Railway

### Frontend
- [x] Initialize Expo project (`mobile/`) — Expo SDK 54, TypeScript, blank template
- [x] Install core dependencies (expo-router, zustand, @tanstack/react-query, axios, expo-secure-store, expo-av, expo-haptics, etc.)
- [x] Set up Expo Router navigation skeleton — (auth), (onboarding), (tabs) with Learn/Words/Challenge/Library
- [x] Build design system (theme constants, Text, Button, Card components) — deep teal primary, gold accent, cream background
- [x] Set up Zustand stores (auth, progress)
- [x] Set up API client (Axios + JWT interceptor + refresh token rotation)
- [x] Set up TanStack Query provider (in root layout)
- [x] Auth screens: welcome, phone-login, otp-verify (placeholder logic)
- [x] Onboarding screens: intro, motivation, how-it-works
- [x] Tab placeholder screens: Learn, My Words, Challenge, Library
- [x] Shared TypeScript types (`src/types/index.ts`)

---

## Feature 1: User Profile & Onboarding
**Status: DONE**

### Backend
- [x] `GET /users/me` — returns profile + progress (words, lesson index, streak) with defaults for new users
- [x] `PATCH /users/me` — update name/profilePicture with class-validator (URL validation, max length)
- [x] `POST /users/me/onboarding` — mark complete (idempotent via upsert)
- [x] Edge cases: NotFoundException for deleted users, unknown fields rejected, invalid URLs rejected
- [x] Unit tests (9 tests — service layer with mocked Prisma)
- [x] Controller tests (8 tests — HTTP layer with mocked guard and validation pipe)

### Frontend
- [x] Auth flow screens (welcome, phone-login, otp-verify) with real API calls
- [x] Onboarding screens (intro, motivation, how-it-works) with API integration
- [x] API modules: `src/api/auth.ts`, `src/api/users.ts`
- [x] Auth store: session loading, token storage, profile fetching, onboarding state
- [x] Auth redirect: new user → onboarding → tabs; returning user → tabs directly
- [x] Error handling: AxiosError parsing, server error messages displayed, fallback messages
- [x] Loading states on all buttons, resend OTP functionality

---

## Feature 2: Lesson List & Lesson Flow (CORE)
**Status: DONE**
**Commit:** `8b5a334` on `main`

### Backend
- [x] `GET /lessons` — list with status (completed/locked/current flags)
- [x] `GET /lessons/:id` — full content (words, introductions, activities, ayahHighlights)
- [x] `POST /lessons/:id/start` — creates LessonAttempt
- [x] `POST /lessons/:id/complete` — transaction: mark attempt, upsert WordProgress, advance lesson index, update streak
- [x] `GET /streaks/me` — current streak data
- [x] Streak `recordActivity()` logic (first/same-day/consecutive/gap handling)
- [x] Dev login endpoint (`POST /auth/dev-login`) for testing
- [x] JWT expiry bug fix (config string→number conversion)
- [ ] Unit tests
- [ ] E2E tests

### Frontend
- [x] Lesson list screen (FlatList of LessonCards with completed/current/locked states)
- [x] Lesson flow — LessonEntryCard (full-screen start)
- [x] Lesson flow — WordIntro x5 (all 5 styles: COGNATE, QURAN_CONTEXT, FUN_FACT, QUICK_CHECK, LIFE_CONNECTION)
- [x] Lesson flow — MidLessonEncouragement
- [x] Lesson flow — Activities (Match, SpotInQuran, QuickFire, FillMeaning)
- [x] Lesson flow — LessonComplete (animated word counter + celebration stat)
- [x] Audio playback (expo-av AudioButton)
- [x] Progress bar with back navigation (word steps + mid-message)
- [x] Exit confirmation dialog
- [x] Word counter bug fix (pre-completion snapshot to avoid double-counting)
- [x] Error handling + loading states
- [x] Activity text feedback ("Correct!" / "Not quite!" on all activities)

### Copy Polish
- [x] All frontend static copy updated (onboarding, auth, tabs, lesson components)
- [x] LessonComplete redundant stat removed, copy improved
- [x] All 50 word introduction headlines made unique (no more generic repeating headlines)
- [x] Mid-lesson message bodies improved (less formulaic)
- [x] Namaz/Salah intro rewritten — bridges terms instead of correcting ("You know this as namaz")
- [x] Kafara intro leads with root meaning "to cover" (less charged for Pakistani context)
- [x] Lesson 10 reordered — Mawt first, Sabeel last (ends on "Path" not "Death" — Peak-End Rule)
- [x] Lesson titles improved: "The Source", "The People of the Qur'an", "Your Daily Worship"
- [x] Copy decisions documented in `copy-decisions.md`
- [x] CLAUDE.md updated with tone decisions

### Audit Issues Found
- [ ] **#5** longestStreak never updates on reset path (streaks.service.ts:70-77)
- [ ] **#6** Lesson can be completed multiple times (no idempotency check)
- [ ] **#7** Multiple lesson attempts created without cleanup (stale attempts never invalidated)

### Still Needed
- [ ] Unit tests (backend)
- [ ] E2E tests (backend)

---

## Feature 3: Streak Display, Daily Review & Visual UX Polish
**Status: DONE**
**Commit:** `6ec633a` on `main`

- [x] Streak badge + contextual greeting (welcome back + word count)
- [x] Daily word review tab with QuickFire activity
- [x] Visual improvements: Ionicons throughout, improved contrast, button sizing
- [x] Backend: Words controller + service for learned words
- [x] Visual share card for Instagram Stories (9:16 ratio, deep teal + gold) — commit `607e1c4`
- [x] Fixed word counter to use server response as source of truth

---

## Feature 4: My Words (Word Bank) + Smart Practice
**Status: DONE — tested in production audit**

### Backend
- [x] `GET /words` — learned words with search + status filter
- [x] `GET /words/:id` — word detail with introduction, ayah highlights, progress
- [x] `PATCH /words/:id/status` — toggle between LEARNED/NEEDS_REVISION
- [x] `GET /words/practice` — configurable quiz (count param, status filter, revision words prioritized)
- [x] `POST /words/quiz-results` — record results, auto-flag wrong words, auto-clear on 3 correct, update streak
- [x] DTO validation (UpdateWordStatusDto, QuizResultsDto)
- [x] Route ordering (static before parameterized)
- [ ] Unit tests
- [ ] E2E tests

### Frontend — My Words tab
- [x] Word count banner (large teal number, screenshot-worthy)
- [x] Word list with search (debounced, by meaning/transliteration)
- [x] Filter chips (All / Needs Revision)
- [x] WordListItem — visible status button with label ("Known" / "Revise"), amber "Needs revision" badge
- [x] Status toggle with haptic feedback
- [x] Word detail screen (`/word/[id]`) — full word info, introduction, ayah examples, stats
- [x] Empty states (no words, no revision words, no search results)
- [x] Pull-to-refresh on word list
- [x] "Practice" button navigates to Practice tab

### Frontend — Practice tab (replaced old Review + Self-test)
- [x] Merged Review tab + Self-test into unified "Practice" tab
- [x] Word count picker (5 / 10 / 20 / All) with disabled state for unavailable counts
- [x] Filter chips (All Words / Revision) with counts
- [x] Smart revision: wrong answers auto-flagged, 3 correct answers auto-clears
- [x] Per-word result tracking (timesCorrect, timesIncorrect updated)
- [x] Wrong words summary on completion ("Words to revisit" with auto-flag notice)
- [x] Share card on completion (Instagram Stories, score + vocabulary count)
- [x] Streak updates after practice
- [x] Deleted redundant self-test screen
- [x] Tab renamed "Practice" with flash icon

### Audit Issues Found
- [ ] **#11** Backend accepts single-char search (frontend enforces min 2, backend doesn't)
- [ ] **#12** Quiz auto-flags words as NEEDS_REVISION — conflicts with Behavioral Psychologist red line

### Still Needed
- [ ] Unit tests (backend)
- [ ] E2E tests (backend)

---

## Feature 5: Daily Challenge
**Status: DONE**
**Commit:** `6d9e461` on `main`

### Backend
- [x] `GET /challenges/today`
- [x] `POST /challenges/today/answer`
- [x] `GET /challenges/history`
- [x] Seed 102 challenges (quiz + fact types, Feb 2 - May 14, covers full Ramadan)
- [x] Edge cases + error handling (already answered, no challenge today)
- [ ] Unit tests
- [ ] E2E tests

### Audit Issues Found
- [ ] **#13** Challenge double-submit returns 201 instead of 400 (DB upserts so no data corruption, but misleading API response)

### Frontend
- [x] Compact banner on Learn tab (tappable, opens modal)
- [x] Modal with full challenge content (quiz options with green/red feedback, facts with "Got it")
- [x] Already-answered state (done banner)
- [x] Error handling + loading states

---

## Feature 6: Library
**Status: DEFERRED — post-launch**

Decided to skip Library for launch. Quranic text accuracy is critical and needs proper verification. Library tab shows "Coming Soon" placeholder with 3 greyed-out cards (Surahs, Salah Guide, Duas). DB models exist but are unused. Will revisit after user feedback.

---

## Feature 7: Weekly Review
**Status: DONE**
**Commit:** `f51d336` on `main`

### Backend
- [x] `GET /reviews/current` — returns quiz rounds (max 20, revision-priority) or completed status
- [x] `POST /reviews/submit` — saves review, flags wrong words as NEEDS_REVISION, auto-clears on 3 correct, updates streak
- [x] `GET /reviews/history` — last 10 reviews
- [x] ISO week calculation, requires 5+ learned words
- [ ] Unit tests
- [ ] E2E tests

### Frontend
- [x] WeeklyReviewBanner on Learn tab (only shown when actionable — hidden when locked/completed)
- [x] Full-screen quiz screen reusing ActivityQuickFire
- [x] Results screen with score, wrong words list, share card
- [x] Streak updates on completion

### UX Polish (applied across all flows)
- [x] Library tab hidden (href: null, Coming Soon placeholder)
- [x] Warm copy: "MashaAllah! 5 new words", "words I know"
- [x] Removed jargon: "auto-flagged for revision" → "These will show up more often in practice"
- [x] Share icon on lesson complete button
- [x] Flame icon on streak badge
- [x] Dynamic quiz titles per context (lesson, practice, review, challenge)

---

## Feature 8: Push Notifications
**Status: CODE COMPLETE — pending Firebase config on Railway**
**Commit:** `9ea40b8` on `main`

### Backend
- [x] FirebaseModule (Admin SDK, initializes from env vars)
- [x] FirebaseService (`sendToTokens()` multicast with auto-deactivation of invalid tokens)
- [x] `POST /notifications/register` — register FCM token
- [x] `DELETE /notifications/unregister` — deactivate token
- [x] `POST /notifications/test` — manual test endpoint (temporary)
- [x] Cron: streak-at-risk (14:00 UTC / 7:00 PM PKT) — users with streak who haven't been active today
- [x] Cron: weekly-review-missed (Saturdays 14:00 UTC) — users who haven't done their weekly review
- [x] Cron: win-back (10:00 UTC / 3:00 PM PKT) — users inactive for 7+ days
- [ ] Unit tests

### Frontend
- [x] Request permissions (`getDevicePushTokenAsync`)
- [x] Register FCM token (auto-registers after `fetchProfile`)
- [x] Unregister token on logout
- [ ] Foreground notification handling
- [ ] Deep link on tap

### Audit Issues Found
- [ ] **#14** Week number calculation in notifications service differs from reviews service (naive vs ISO week). Streak-at-risk notification checks wrong week.
- [ ] **#15** Streak-at-risk notification sends individually per token. Should batch for scalability.

### Pending
- [ ] **Mudassir: Set Firebase env vars on Railway** (`FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`)
- [ ] Test end-to-end push notification

---

## Feature 9: 300-Word Content Build (DECISION-015)
**Status: SEED DATA DONE**
**Commit:** `9ea40b8` on `main`

### Content Generation — Seed Files (12 files, ~9,300 lines)
- [x] Lessons 1-60 (300 words) — all words with arabic, transliteration, meaning, rootLetters, frequency, partOfSpeech
- [x] Words L1-L20 (100 words) — `words-l1-l20.ts`
- [x] Words L21-L40 (100 words) — `words-l21-l40.ts`
- [x] Words L41-L60 (100 words) — `words-l41-l60.ts`
- [x] Introductions for all 300 words (5 styles: COGNATE, QURAN_CONTEXT, FUN_FACT, QUICK_CHECK, LIFE_CONNECTION)
- [x] Activities L1-L30 (90 activities) — `activities-l1-l30.ts`
- [x] Activities L31-L60 (90 activities) — `activities-l31-l60.ts`
- [x] Mid-lesson messages for all 60 lessons — `mid-messages.ts`
- [x] Celebrations for all 60 lessons (with ayah coverage stats)
- [x] Daily challenges (90 challenges) — `challenges.ts`
- [x] Lesson metadata (titles, descriptions, difficulty) — `lessons.ts`

### Still Needed
- [ ] AyahHighlights for all 300 words (audit #9 — zero highlights in production)
- [x] Arabic Insights (grammar nuggets, 1 per lesson) — DECISION-012 — 60 insights seeded
- [ ] Verify all ayah texts against mushaf
- [ ] Verify all word frequencies against corpus data
- [x] Run seed against production database — 60 lessons, 300 words, 120 activities, 60 insights, 60 mid-messages, 60 celebrations, 102 challenges (Feb 2 - May 14)
- [ ] Review celebration stat ayah coverage numbers
- [ ] Fix 8 duplicate "Quick check!" headlines (audit #16 — violates DECISION unique headline rule)

---

## Feature 10: Premium / Freemium System (DECISION-013, 014)
**Status: DONE — tested in production audit**
**Commit:** `ef9d4ec` on `main`

### Backend
- [x] `ArabicInsight` model + migration (type, title, body, examples JSON, 1 per lesson)
- [x] `InsightType` enum (ROOT_PATTERN, GRAMMAR_TIP, CULTURAL_NOTE, PATTERN_RECOGNITION, WORD_FAMILY)
- [x] 60 Arabic Insights seeded (insights-part1/2/3.ts)
- [x] `UserSubscription` model + migration (revenuecatId, status, platform, productId, purchasedAt, expiresAt)
- [x] `SubscriptionStatus` enum (ACTIVE, EXPIRED, CANCELLED, BILLING_RETRY)
- [x] `GET /subscriptions/status` — returns isPremium + subscription details
- [x] `POST /subscriptions/verify` — client sends RevenueCat customer ID, backend upserts subscription
- [x] `POST /subscriptions/webhook` — RevenueCat event handling (purchase, renewal, cancel, expire)
- [x] `isPremium()` check in SubscriptionsService
- [x] Lesson list returns `premiumTier` (free/taste/premium) + `isPremiumUser`
- [x] Lesson content returns `premiumTier` + `isPremiumUser` (no 403, all lessons accessible)
- [x] Practice gating: `isPremiumLocked` returned when totalLearned > 25 and not premium
- [x] Weekly Review gating: `isPremiumLocked` returned when completedCount > 0 and not premium
- [ ] Referral tracking endpoints
- [ ] `patternsUnlocked` on `UserProgress`
- [ ] `isPremium` flag on individual `LessonActivity` (advanced activity gating)

### Frontend
- [x] RevenueCat SDK integrated (`react-native-purchases` + `react-native-purchases-ui`)
- [x] RevenueCat service (`services/purchases.ts`) — init, checkEntitlement, restore, reset
- [x] Premium Zustand store (`stores/premium.ts`) — isPremium, checkPremiumStatus, restore, syncPurchaseToBackend
- [x] Subscriptions API client (`api/subscriptions.ts`) — getStatus, verify
- [x] RevenueCat init on login, reset on logout (auth store updated)
- [x] Native paywall via `RevenueCatUI.presentPaywall()` — used from ArabicInsight + Practice + Review
- [x] Paywall route (`app/paywall.tsx`) — modal presentation
- [x] ArabicInsight component — 3 states: absent (1-3), full with gold badge (4-7), blurred with lock overlay + upgrade CTA (8+)
- [x] Lesson flow updated — insight step after words, before mid-message (when tier !== 'free')
- [x] LessonCard — 3-phase badges: none (1-3), "Premium — free for you!" (4-7), "Premium" (8+)
- [x] All lessons tappable — only sequence lock, no premium lock on lessons
- [x] Practice screen — premium gate with curiosity card when locked (shows stats + what they're missing)
- [x] Weekly Review screen — premium gate when locked (shows features + upgrade CTA)
- [x] Weekly Review banner — gold premium badge with lock when locked
- [x] Profile screen — Subscription section with upgrade CTA / active status + restore purchases
- [ ] "Free preview X of 4" counter on taste-phase insights
- [ ] Pattern count display alongside word count
- [ ] Advanced activity types (Pattern Match, Decode the Ayah)
- [ ] Premium conversion bottom sheet (currently uses native RevenueCat paywall)
- [ ] Referral program UI

---

## Feature 11: Share Cards
**Status: PARTIALLY BUILT**

### Built (client-side capture via react-native-view-shot)
- [x] Share card on lesson complete (score + vocabulary count)
- [x] Share card on practice completion (score + vocabulary count)
- [x] Share card on weekly review (score + week number + recall %)
- [x] Instagram Stories deep link + fallback to expo-sharing
- [x] Hidden capture card pattern (off-screen View + captureRef)

### Still Needed
- [ ] Server-side share cards (satori + sharp for richer design)
- [ ] Share button on My Words screen
- [ ] Milestone modal + share
- [ ] Pattern count on share cards

---

## Feature 12: Polish & QA
**Status: IN PROGRESS**

- [x] App icon (adaptive icon for Android, standard icon for iOS)
- [x] Splash screen — 768x768 عین icon, `resizeMode: "contain"`, cream background (needs new APK to take effect on Android 12+)
- [x] Auth persistence — `onboardingCompleted` persisted in SecureStore (pushed via OTA)
- [x] Session expiry handling — interceptor ↔ Zustand bridged via `setOnSessionExpired` callback
- [x] OTA updates configured — `expo-updates` with channels (preview/production), first OTA pushed
- [x] Loading skeletons (lesson list, word list, challenge, practice, weekly review)
- [x] Milestone modals (10/25/50/100/150/200/250/300 word milestones)
- [x] Query cache persistence (AsyncStorage + @tanstack/react-query-persist-client)
- [ ] Haptic feedback (partially implemented in word status toggle)
- [ ] Smooth animations
- [ ] Offline mode
- [ ] Full E2E walkthrough

### Audit Issues Found (Foundation)
- [ ] **#1** No health endpoint (/ returns 404 — Railway, uptime monitors need /health)
- [ ] **#2** Rate limiting not enforced (ThrottlerModule configured but ThrottlerGuard never applied as APP_GUARD)
- [ ] **#3** Webhook DTO has no validators (forbidNonWhitelisted rejects all webhook calls)
- [ ] **#4** Webhook auth bypassable (if env var not set, webhook is open)
- [ ] **#17** XSS stored in user name (no input sanitization on PATCH /users/me)

---

## Feature 13: Deploy & Launch
**Status: IN PROGRESS**

- [x] Backend deployed to Railway (auto-deploys from `main`)
- [x] Railway deployment config (Dockerfile, startup delay for DB readiness)
- [x] EAS Build config (development, preview with APK, production with autoIncrement)
- [x] EAS channels configured (preview, production)
- [x] OTA updates infrastructure (`expo-updates`, `eas update --channel preview`)
- [x] First preview APK built and distributed
- [x] First OTA update pushed (auth persistence fix)
- [x] Production seed complete (60 lessons, 300 words, 120 activities, 60 insights, 102 challenges)
- [x] Production backend audit complete (17 issues found — see `backend/AUDIT.md`)
- [ ] Set Firebase env vars on Railway
- [ ] App Store submissions (Apple + Google)
- [ ] Sentry crash reporting
- [ ] Analytics
- [ ] Payment gateway integration

---

## Feature 14: CMS & Admin Panel
**Status: BUILT**
**Commit:** `d197d0f` on `main`

- [x] Full CMS built in `/cms` — manage lessons, words, challenges, surahs, duas, salah steps
- [x] Shares same Prisma schema and PostgreSQL database as backend
- [x] CRUD operations for all content types
- [ ] Deploy CMS (needs hosting decision)
- [ ] Admin authentication

---

## Feature 15: Website / Landing Page
**Status: BUILT**
**Commit:** on `main`

- [x] Landing page in `/web` — app promotion, email capture
- [x] Vercel Analytics + Speed Insights
- [x] Subscribe event tracking
- [x] Deployed to Vercel
