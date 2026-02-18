# Backend Audit — Production API Testing

**Date:** 2026-02-15
**Target:** https://asaan-arabic-production.up.railway.app
**Status:** COMPLETE

---

## Issues Found

### Phase 1: Foundation

| # | Severity | Issue | Detail |
|---|----------|-------|--------|
| 1 | Medium | No health endpoint | `/` returns 404. Railway, uptime monitors, and load balancers need a `/health` route returning 200. **FIXED** |
| 2 | High | Rate limiting not enforced | `ThrottlerModule` configured (30 req/60s) but `ThrottlerGuard` never applied as `APP_GUARD`. 35 rapid requests all went through — no 429. API is open to spam/abuse. |
| 3 | High | Webhook DTO has no validators | `RevenueCatWebhookDto` fields have zero class-validator decorators. `forbidNonWhitelisted` rejects all webhook calls. Webhook is non-functional. **FIXED** |
| 4 | Medium | Webhook auth is bypassable | Secret check does `if (webhookSecret && ...)` — if env var not set, webhook is completely open to anyone. Should throw if secret is missing. **FIXED** |

### Phase 2: Core Learning Loop

| # | Severity | Issue | Detail |
|---|----------|-------|--------|
| 5 | High | longestStreak never updates on reset path | `streaks.service.ts:70-77` — when streak resets (gap > 1 day or first activity), sets `currentStreak: 1` but doesn't set `longestStreak: 1`. Also, the gap/no-lastActive path doesn't call `Math.max()`. Root cause confirmed in code. |
| 6 | High | Lesson can be completed multiple times | Same lesson can be completed repeatedly — both with the same attemptId AND different stale attemptIds. Words get re-counted, progress can be corrupted. No idempotency check. |
| 7 | High | Multiple lesson attempts created without cleanup | Calling `/start` multiple times creates duplicate attempts. Stale attempts are never cleaned up or invalidated. All can be used to `/complete`. |
| 8 | Medium | No `isPremiumLocked` field in lesson list | Frontend expects `isPremiumLocked` boolean but API only returns `isPremiumUser` and `premiumTier`. Frontend must derive lock state itself. |
| 9 | Medium | Zero ayah highlights for all words | All 300 words across all 60 lessons have 0 ayah highlights. The `ayahHighlights` table exists but has no seeded data. Words lack Quranic context examples. Islamic Content Director: "Words without Quranic context defeats the purpose." **PARTIALLY FIXED (167/300 words now have highlights)** |
| 10 | Low | Lesson content response nests metadata | Lesson title/subtitle/wordCount are nested under `lesson` key, not top-level. Not a bug but worth noting for frontend consistency. |

### Phase 3: Word Bank & Practice

| # | Severity | Issue | Detail |
|---|----------|-------|--------|
| 11 | Low | Backend processes single-char search | Frontend enforces min 2 chars, but backend accepts 1-char search queries. Mismatch — `?search=R` returns 6 results. Not harmful but inconsistent. **FIXED** |
| 12 | Medium | Quiz auto-flags words as NEEDS_REVISION | Incorrect quiz answers automatically change word status to NEEDS_REVISION. This may surprise users who haven't manually flagged words. Behavioral Psychologist: "Making users feel punished for wrong answers violates our red line." |

### Phase 4: Engagement Features

| # | Severity | Issue | Detail |
|---|----------|-------|--------|
| 13 | High | Challenge double-submit returns 201 (not blocked) | Submitting the same challenge twice returns 201 both times. DB has only 1 row (upsert), so no data corruption, but API should return 400 "already submitted" on second attempt. Misleading to frontend. |

### Phase 5: Notifications & Tokens

| # | Severity | Issue | Detail |
|---|----------|-------|--------|
| 14 | High | Notification week calc differs from review service | `notifications.service.ts` uses naive week calc: `Math.ceil((dayOfYear + startOfYear.getDay() + 1) / 7)`. `reviews.service.ts` uses proper ISO week with UTC adjustment. For Feb 15 2026: notifications says week 8, reviews says week 7. The "review missed" notification checks the wrong week. |
| 15 | Medium | Streak-at-risk notification sends individually | Each token gets its own FCM call in a loop. For 1000 users = 1000 API calls. Should batch tokens with same streak count. Not a bug now but will timeout at scale. |

### Phase 6: Data Integrity

| # | Severity | Issue | Detail |
|---|----------|-------|--------|
| 16 | Medium | "Quick check!" headline used for 8 words | Introduction headline "Quick check!" is repeated for: صَبْر, حَقّ, حَيَاة, سَمِعَ, مَغْفِرَة, نَبِيّ, حِكْمَة, ظَلَمَ. Decision was "every word introduction headline must be unique." |

### Phase 7: Security & Edge Cases

| # | Severity | Issue | Detail |
|---|----------|-------|--------|
| 17 | Medium | XSS stored in user name | `PATCH /users/me` with `{"name": "<script>alert(1)</script>"}` stores the script tag verbatim. No input sanitization. Low risk in mobile app (React Native doesn't execute HTML), but dangerous if admin panel or web renders user names. |

### Phase 8: Performance

No issues. All endpoints respond in 480-800ms (acceptable for Railway cold/warm starts over network). No N+1 detected.

---

## Summary

| Severity | Count |
|----------|-------|
| High | 7 |
| Medium | 7 |
| Low | 3 |
| **Total** | **17** |

### Must-fix before launch (High):
1. **#2** Rate limiting not enforced
2. **#5** longestStreak bug
3. **#6** Lesson double-complete
4. **#7** Duplicate lesson attempts
5. **#13** Challenge double-submit
6. **#14** Week number mismatch in notifications

### Should-fix before launch (Medium):
7. ~~**#3/#4** Webhook broken~~ — **FIXED** (DTO validation + auth hardening)
8. **#9** ~~Zero~~ ayah highlights — **PARTIALLY FIXED** (167/300 words have highlights)
9. **#12** Quiz auto-flagging NEEDS_REVISION
10. ~~**#16** Duplicate "Quick check!" headlines~~ — **FIXED**
11. ~~**#17** XSS in user name~~ — **FIXED**

### Can defer (Low):
12. ~~**#1** Health endpoint~~ — **FIXED**
13. **#8** isPremiumLocked field
14. **#10** Response nesting
15. ~~**#11** Single-char search~~ — **FIXED**

---

## What Passed

- 60 lessons, 300 words, 120 activities, 60 insights, 60 mid-messages, 60 celebration stats — all present
- 102 daily challenges covering Feb 2 - May 14 (full Ramadan covered)
- Auth flow: Google OAuth validation, JWT lifecycle, dev login blocked in prod
- All endpoints protected with JWT guard
- Input validation: forbidNonWhitelisted, UUID validation, score bounds, platform enum
- Premium bypass working (isPremium always true)
- Practice quiz generation valid (4 unique options, correct indices)
- Weekly review: generates rounds, blocks double-submit, tracks history
- FCM token management: upsert, deactivation, cleanup
- Notification targeting logic correct for all 3 types
- All notification copy templates render correctly
