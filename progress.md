# Progress Tracker

Last updated: 2026-01-27

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
**Status: NOT STARTED**

### Backend
- [ ] `GET /lessons` — list with status
- [ ] `GET /lessons/:id` — full content
- [ ] `POST /lessons/:id/start`
- [ ] `POST /lessons/:id/complete` — progress update
- [ ] `GET /streaks/me`
- [ ] Streak `checkIn()` logic
- [ ] Edge cases + error handling
- [ ] Unit tests
- [ ] E2E tests

### Frontend
- [ ] Lesson list screen
- [ ] Lesson flow — LessonCard entry
- [ ] Lesson flow — WordIntro x5 (5 styles)
- [ ] Lesson flow — MidLessonEncouragement
- [ ] Lesson flow — Activities (Match, SpotInQuran, QuickFire, FillMeaning)
- [ ] Lesson flow — LessonComplete (animated count + stats)
- [ ] Audio playback
- [ ] Error handling + loading states

---

## Feature 3: My Words (Word Bank)
**Status: NOT STARTED**

### Backend
- [ ] `GET /words` — learned words
- [ ] `GET /words/:id` — detail
- [ ] `PATCH /words/:id/status` — revision toggle
- [ ] `POST /words/review` — record result
- [ ] `GET /words/self-test` — generate quiz
- [ ] Edge cases + error handling
- [ ] Unit tests
- [ ] E2E tests

### Frontend
- [ ] WordCountBanner
- [ ] Word list with search/filter
- [ ] Status toggle (needs revision)
- [ ] Self-test quiz
- [ ] Empty state, error handling

---

## Feature 4: Daily Challenge
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

## Feature 5: Library
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

## Feature 6: Weekly Review
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

## Feature 7: Push Notifications
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

## Feature 8: Share Cards
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

## Feature 9: Polish & QA
**Status: NOT STARTED**

- [ ] Haptic feedback
- [ ] Smooth animations
- [ ] Loading skeletons everywhere
- [ ] Offline mode
- [ ] App icon + splash screen
- [ ] Performance audit
- [ ] Full E2E walkthrough

---

## Feature 10: Deploy & Launch
**Status: NOT STARTED**

- [ ] Deploy backend
- [ ] Production seed
- [ ] EAS Build config
- [ ] App Store submissions
- [ ] Sentry crash reporting
- [ ] Analytics
