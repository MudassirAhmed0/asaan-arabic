# Frontend Audit — Mobile App Code Review

**Date:** 2026-02-15
**Target:** /mobile/ codebase (React Native + Expo)
**Method:** Code-level review — reading every component, tracing flows, checking edge cases
**Status:** COMPLETE — 17 issues across 10 phases

---

## Issues Found

### Phase 1: Navigation & Auth Flow

| # | Severity | Issue | Detail |
|---|----------|-------|--------|
| 1 | Medium | Returning users see onboarding again after sign-in | `welcome.tsx:21` destructures `onboardingCompleted` before `fetchProfile()` runs. Stale closure — `onboardingCompleted` is still `false` when the redirect check on line 57 runs (`if (result.isNewUser \|\| !onboardingCompleted)`). A returning user who signs in again will be routed to onboarding even if they've already completed it. |
| 2 | Medium | Concurrent 401s can trigger double token refresh | `client.ts:33` — `_retry` flag only prevents per-request infinite loops. Two simultaneous 401 responses will both attempt refresh. If backend uses single-use refresh tokens, the second refresh invalidates the first's new token. |
| 3 | Medium | Premium hardcoded to `true` for all users | `auth.ts:120` — `usePremiumStore.getState().setPremium(true)` bypasses RevenueCat entirely. `initRevenueCat` is commented out with TODO. All premium gates are non-functional. Intentional for beta, but means premium gating cannot be tested. |
| 4 | Low | `clearSession()` doesn't delete tokens from SecureStore | `auth.ts:128-130` — sets state to null but tokens remain in SecureStore. The response interceptor does delete them on refresh failure, but `clearSession` alone leaves stale tokens. `logout()` properly deletes them. |
| 5 | Low | Tab file named `challenge/` but displays as "Practice" | `(tabs)/challenge/index.tsx` renders the Practice screen. File name is outdated from when this tab was "Daily Challenge." Confusing for devs. **FIXED (renamed to practice/)** |

### Phase 2: Learn Screen & Lesson Cards

| # | Severity | Issue | Detail |
|---|----------|-------|--------|
| 6 | Low | No pull-to-refresh on Learn screen | `learn/index.tsx` FlatList has no `refreshControl` or `onRefresh`. Words screen (`words/index.tsx:214`) has it. If lessons fail to load or data goes stale, user has no way to manually refresh without killing the app. |

### Phase 3: Lesson Flow

| # | Severity | Issue | Detail |
|---|----------|-------|--------|
| 7 | High | SPOT_IN_QURAN activities silently skipped for all 300 words | `lesson/[id].tsx:387` — if a word has no `ayahHighlights`, the activity calls `onComplete(true)` and returns `null`. Backend audit confirmed 0 ayah highlights exist in production for all 300 words. Every SPOT_IN_QURAN activity is auto-completed with a passing score. Users never see this activity type. **PARTIALLY FIXED (167/300 words now have highlights)** |
| 8 | Medium | `canGoBack()` shows back button on insight step but `prevStep()` ignores it | `lesson.ts:143` — `canGoBack()` returns `true` for `insight` type. But `prevStep()` at line 96 only allows back from `word` (wordIndex > 0) or `mid-message`. Back button renders on insight screen but tapping it does nothing. |
| 9 | Medium | `handleMatchComplete` always scores correct regardless of result | `lesson/[id].tsx:182` — `_allCorrect` parameter is ignored, `addScore(true)` is always called. Match activity contributes a perfect score to every lesson even if user gets pairs wrong. |
| 10 | Low | Lesson completion API error silently swallowed | `lesson/[id].tsx:108` — `.catch(() => {})` on `completeLesson()`. Comment says "progress syncs on next app open" — acceptable, but if the sync also fails, the completed lesson isn't recorded and the user might repeat it. **FIXED (error handling improved)** |

### Phase 4: Practice Screen

No new issues — file naming already captured in #5. Practice mode correctly gates at 25 words (backend-enforced). Three modes (Quick, Revision, Practice All) work as designed.

### Phase 5: Words Screen

No issues found. Pull-to-refresh present. Empty state copy matches copy-decisions.md ("Your first 5 words are one lesson away"). Search and filter chips work correctly.

### Phase 6: Profile Screen

| # | Severity | Issue | Detail |
|---|----------|-------|--------|
| 11 | High | `totalLessons` hardcoded to 10 — should be 60 | `profile/index.tsx:144` — `const totalLessons = 10`. Progress bar shows `lessonsCompleted / 10`. A user who has completed 6 lessons sees "60% complete" when they should see "10% complete". Completely misleading after DECISION-015 expanded to 60 lessons. |

### Phase 7: Weekly Review Screen

No issues found. Premium gating works correctly (first review free, subsequent locked). Share card on completion. Phase machine (loading → locked/quiz → done) handles all states.

### Phase 8: Premium Gating Consistency

| # | Severity | Issue | Detail |
|---|----------|-------|--------|
| 12 | Medium | PremiumPaywall.tsx component is unused — paywall uses RevenueCat native UI | `PremiumPaywall.tsx` (144 lines) with value props and pricing was built but `paywall.tsx` uses `RevenueCatUI.presentPaywall()` instead. Two paywall implementations exist — the custom one is dead code. **SKIPPED (decided not to fix — premium gating bypassed for launch)** |
| 13 | Low | No cross-check between premium store and backend `isPremiumUser` | Frontend `usePremiumStore.isPremium` is set independently from backend's `isPremiumUser` field on profile. If they disagree (e.g., subscription expired server-side), frontend won't know until next `checkPremiumStatus()` call. Not urgent since #3 makes everything premium anyway. **SKIPPED (deferred — premium bypassed for launch)** |

### Phase 9: Share System

| # | Severity | Issue | Detail |
|---|----------|-------|--------|
| 14 | Low | Share cards only integrated in LessonComplete | `ShareCard.tsx` supports 4 variants (lesson, practice, review, words) but only the `lesson` variant is wired up in `LessonComplete.tsx`. Practice completion, weekly review completion, and word milestones don't have share buttons. Missed engagement opportunities. **SKIPPED (deferred to post-launch)** |

### Phase 10: Copy & Error Handling

| # | Severity | Issue | Detail |
|---|----------|-------|--------|
| 15 | Low | LessonComplete header doesn't match copy-decisions.md | `LessonComplete.tsx:79` says "MashaAllah! {n} new words" but copy-decisions.md says "5 New Words Unlocked!" — undocumented deviation. "MashaAllah" is arguably better for the audience but should be recorded in copy-decisions.md. **SKIPPED (MashaAllah copy kept intentionally)** |
| 16 | Low | Inconsistent "Not quite" punctuation across activities | `ActivityQuickFire` shows `It means "X"` without "Not quite!" prefix. `DailyChallengeCard` shows `Not quite` without `!`. `ActivityFillMeaning` and `WordIntroduction` both show `Not quite!` with `!`. Minor tone inconsistency. |
| 17 | Low | ActivitySpotInQuran feedback missing exclamation | `ActivitySpotInQuran.tsx:94` says "Not that one — try again" but copy-decisions.md says "Not that one — try again!" — one character off. |

---

## What Passed

### Navigation & Auth (Phase 1)
- Root redirect handles all 3 states correctly (unauth → auth, auth + no onboarding → onboarding, auth + onboarded → tabs)
- Splash screen stays visible until session loads — no flash of wrong content
- Query cache persistence configured correctly (AsyncStorage, 24h TTL)
- Notification listeners set up on mount
- Dev login button only shows in `__DEV__` mode — not exposed in production
- Google auth error handling covers all status codes (cancelled, no play services, generic)
- Onboarding gracefully handles API failure — navigates even if backend call fails
- Copy matches copy-decisions.md (intro, motivation, how-it-works all correct)
- Session expiry callback properly bridges interceptor ↔ auth store
- Logout fully cleans up (tokens, notifications, RevenueCat, state)

### Learn Screen (Phase 2)
- Lesson cards render all 3 states correctly (completed, active, locked)
- Premium badges show correctly for taste tier (gold "Premium" pill) and premium tier (gold lock)
- Skeleton loading while lessons fetch
- Error state with user-facing message
- Daily challenge widget renders 4 challenge types correctly

### Lesson Flow (Phase 3)
- Step machine builds correct flow: entry → words → insight → mid-message → activities → complete
- Word introduction rotates 5 styles as designed (cognate, Qur'an context, fun fact, quick check, life connection)
- Arabic Insight component correctly implements 3 states (taste with gold badge, full content, locked/blurred)
- MilestoneModal triggers at correct thresholds (10/25/50/100/150/200/250/300) with haptics
- Word counter animation works with per-increment haptic feedback
- Celebration stat (ayah coverage) displays correctly

### Words Screen (Phase 5)
- Pull-to-refresh present
- Search works across Arabic, transliteration, and English
- Filter chips (All, Confident, Learning, Needs Revision) work correctly
- Empty state copy matches copy-decisions.md
- Share card capture present (word count variant)

### Profile (Phase 6)
- Avatar letter fallback chain works (name → phone digit → ?)
- Member since date formatted correctly
- Settings toggles (notifications, haptics) persist with Zustand
- Logout confirmation dialog present
- Reset Progress only in `__DEV__` — safe

### Premium Gating (Phase 8)
- Backend tier assignment correct (1-3 free, 4-7 taste, 8+ premium)
- Practice gates at 25 words (backend-enforced)
- Weekly review: first free, subsequent require premium
- RevenueCat integration code is architecturally correct, just disabled
- Paywall purchase flow handles PURCHASED/RESTORED correctly with backend sync

### Error Handling (Phase 10)
- Zero `console.log`/`console.error` left in production code
- All async operations have loading skeletons
- Auth token refresh has cascading fallback (refresh → clear → logout)
- Premium check has cascading fallback (RevenueCat → backend API → default free)
- Share system degrades gracefully (Instagram → system share → silent fail)
- Notification registration silently retries on next app open
- All intentional `.catch(() => {})` patterns are for non-blocking, non-critical operations

### Copy Accuracy (Phase 10)
- WordIntroduction: 100% match with copy-decisions.md
- ActivityFillMeaning: 100% match
- ActivityMatch: visual-only feedback by design — correct
- MidLessonEncouragement: proper pluralization, data-driven from backend
- Onboarding screens (intro, motivation, how-it-works): 100% match
- Welcome screen: 100% match
- Phone login / OTP verify: 100% match
- Learn screen labels: 100% match ("words I know", "Your Quranic vocabulary")

---

## Summary

| Severity | Count | Issues |
|----------|-------|--------|
| High | 2 | #7 (SPOT_IN_QURAN — PARTIALLY FIXED, 167 highlights), #11 (totalLessons — FIXED) |
| Medium | 5 | #1 (FIXED), #2 (FIXED), #3 (intentional for launch), #8 (FIXED), #9 (FIXED), #12 (SKIPPED) |
| Low | 10 | #4 (FIXED), #5 (FIXED), #6 (FIXED), #10 (FIXED), #13-14 (SKIPPED), #15 (SKIPPED), #16-17 (FIXED) |

### Cross-References with Backend Audit
- Frontend #3 (premium hardcoded) ↔ Backend premium gating is correct but unreachable from frontend
- Frontend #7 (SPOT_IN_QURAN dead) ↔ Backend audit #9 (0 ayah highlights in production)
- Frontend #11 (totalLessons=10) ↔ Backend correctly serves 60 lessons — frontend ignores this
- Frontend #13 (no premium cross-check) ↔ Backend subscription webhook correctly updates status

---
