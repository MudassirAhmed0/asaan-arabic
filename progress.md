# Progress Tracker

Last updated: 2026-01-29

---

## Feature 0: Foundation Setup
**Status: DONE**

### Backend
- [x] Extend Prisma schema with all new models (20+ models, enums, relations)
- [x] Run migration (`20260126211650_add_content_progress_library_models`)
- [x] Create seed script infrastructure (`prisma/seed/`)
- [x] Seed 10 lessons + 50 words + introductions + 25 activities + 10 mid-messages + 10 celebrations + 30 challenges
- [x] Fix Prisma v7 PrismaClient: `@prisma/adapter-pg` driver adapter required (no `url` in schema)
- [ ] Verify via Prisma Studio

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
**Status: BUILT — awaiting Mudassir's manual testing**

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

### Still Needed
- [ ] **Mudassir manual test** — word bank, practice, revision flow
- [ ] Unit tests (backend)
- [ ] E2E tests (backend)

---

## Feature 5: Daily Challenge
**Status: NOT STARTED**

### Backend
- [ ] `GET /challenges/today`
- [ ] `POST /challenges/today/answer`
- [ ] `GET /challenges/history`
- [ ] Seed/auto-generate challenges
- [ ] Edge cases + error handling
- [ ] Unit tests
- [ ] E2E tests

### Frontend
- [ ] Challenge tab (type-specific rendering)
- [ ] History view
- [ ] Error handling + already-answered state

---

## Feature 6: Library
**Status: NOT STARTED**

### Backend
- [ ] `GET /library/surahs`
- [ ] `GET /library/surahs/:number`
- [ ] `GET /library/salah`
- [ ] `GET /library/duas`
- [ ] Seed library content
- [ ] E2E tests

### Frontend
- [ ] Library home (3 sections)
- [ ] Surah list + detail
- [ ] Salah screen
- [ ] Duas screen
- [ ] Error handling + loading

---

## Feature 7: Weekly Review
**Status: NOT STARTED**

### Backend
- [ ] `GET /reviews/current`
- [ ] `POST /reviews/submit`
- [ ] `GET /reviews/history`
- [ ] Edge cases
- [ ] Unit tests
- [ ] E2E tests

### Frontend
- [ ] Weekly review banner
- [ ] Quiz screen
- [ ] Score display + history
- [ ] Error handling

---

## Feature 8: Push Notifications
**Status: NOT STARTED**

### Backend
- [ ] FirebaseModule (Admin SDK)
- [ ] `POST /notifications/register`
- [ ] `DELETE /notifications/unregister`
- [ ] Cron: daily challenge (9 AM PKT)
- [ ] Cron: streak reminder (8 PM PKT)
- [ ] Cron: weekly review (Fri 6 PM PKT)
- [ ] Unit tests

### Frontend
- [ ] Request permissions
- [ ] Register FCM token
- [ ] Foreground notification handling
- [ ] Deep link on tap
- [ ] Permission denied handling

---

## Feature 9: Share Cards
**Status: NOT STARTED**

### Backend
- [ ] `GET /share/progress-card`
- [ ] `GET /share/milestone-card/:milestone`
- [ ] `GET /share/lesson-card/:lessonId`
- [ ] satori + sharp setup
- [ ] Arabic font embedding

### Frontend
- [ ] Share button on lesson complete
- [ ] Share button on My Words
- [ ] Milestone modal + share
- [ ] expo-sharing integration

---

## Feature 10: Polish & QA
**Status: NOT STARTED**

- [ ] Haptic feedback
- [ ] Smooth animations
- [ ] Loading skeletons everywhere
- [ ] Offline mode
- [ ] App icon + splash screen
- [ ] Performance audit
- [ ] Full E2E walkthrough

---

## Feature 11: Deploy & Launch
**Status: NOT STARTED**

- [ ] Deploy backend
- [ ] Production seed
- [ ] EAS Build config
- [ ] App Store submissions
- [ ] Sentry crash reporting
- [ ] Analytics
