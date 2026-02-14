# Decision Log

All major decisions are recorded here with full context: who proposed, who weighed in, what the tensions were, and the CEO's final call.

## Format

```
### [DECISION-XXX] Title
**Date:** YYYY-MM-DD
**Raised by:** [Role]
**Consulted:** [Roles involved]
**Decision:** [What was decided]
**Rationale:** [Why — including dissenting views]
**CEO Verdict:** Approved / Rejected / Modified
**Status:** Active / Superseded by DECISION-XXX
```

---

## Decisions

### [DECISION-001] App Name & Tagline
**Date:** 2026-02-01
**Raised by:** Growth Lead, Copywriter
**Consulted:** Full team
**Decision:** App name is **Asaan Arabic**. Tagline is **"Samajh ke Parho"** (Read with Understanding).
**Rationale:** Urdu name signals Pakistan-first positioning. "Asaan" (easy) sets the right expectation. Tagline connects to the core value proposition — understanding, not just reading.
**CEO Verdict:** Approved
**Status:** Active

### [DECISION-002] Commit Current Working Changes
**Date:** 2026-02-01
**Raised by:** Product Strategist, Engineering Lead
**Consulted:** CEO
**Decision:** All uncommitted changes (Feature 4 + Feature 8 partial) are tested and ready to commit.
**Rationale:** CEO confirmed manual testing is done.
**CEO Verdict:** Approved
**Status:** Active

### [DECISION-003] Push Notifications Timing
**Date:** 2026-02-01
**Raised by:** Behavioral Psychologist
**Consulted:** Engineering Lead, Product Strategist
**Decision:** Firebase + push notifications will be implemented just before or after beta launch. Not blocking beta.
**Rationale:** Beta launch speed is priority. Push notifications are critical for retention at scale but not for initial beta testing phase.
**CEO Verdict:** Approved — launch beta without push, add immediately after
**Status:** Active

### [DECISION-004] Content Expansion After Beta
**Date:** 2026-02-01
**Raised by:** Curriculum Designer, Islamic Content Director
**Consulted:** Product Strategist
**Decision:** Launch beta with 10 lessons (50 words). Expand to 30 lessons after beta feedback.
**Rationale:** 10 lessons is enough to validate the learning experience. Content expansion happens in parallel with beta testing.
**CEO Verdict:** Approved
**Status:** Active

### [DECISION-005] Analytics Infrastructure
**Date:** 2026-02-01
**Raised by:** Data Analyst
**Consulted:** Engineering Lead
**Decision:** Plan and build analytics infrastructure now. Details to be planned by team.
**Rationale:** CEO agrees we can't launch blind. Analytics is a priority alongside other work.
**CEO Verdict:** Approved — plan it out
**Status:** Active

### [DECISION-006] Beta Launch Without Qari Audio
**Date:** 2026-02-01
**Raised by:** Islamic Content Director
**Consulted:** CEO
**Decision:** Beta launches without professional Qari audio. Audio will be added soon after.
**Rationale:** Audio recording is in progress. Beta is for testing flows and UX, not final content quality.
**CEO Verdict:** Approved
**Status:** Active

### [DECISION-007] Hosting Provider — Railway
**Date:** 2026-02-01
**Raised by:** Engineering Lead
**Consulted:** CEO
**Decision:** **Railway** is the hosting provider for backend deployment.
**Rationale:** Fast setup, auto-scaling, good PostgreSQL support, reasonable pricing. CEO made the call.
**CEO Verdict:** Approved
**Status:** Active

### [DECISION-008] Pre-Ramadan Campaign Start Date
**Date:** 2026-02-01
**Raised by:** Growth Lead
**Consulted:** CEO
**Decision:** Campaign content starts **Monday, February 9th, 2026**. This week is for building.
**Rationale:** CEO wants to focus on development this week. Campaign starts next Monday with a full week of preparation done.
**CEO Verdict:** Approved
**Status:** Active

### [DECISION-009] Build Everything — No Scope Cuts
**Date:** 2026-02-01
**Raised by:** Product Strategist (raised concern), CEO (overruled)
**Consulted:** Full team
**Decision:** **Build CMS, admin panel, website, AND finish app features — all in parallel.** No scope cuts. The team is capable of handling it all.
**Rationale:** CEO's position: "We have a great team, we can do everything now. We don't need to think of scope, we need to get everything done." Product Strategist's scope concern is noted but overruled.
**CEO Verdict:** Approved — full steam on all fronts
**Status:** Active

### [DECISION-010] Streak Freeze / Grace Period
**Date:** 2026-02-01
**Raised by:** Behavioral Psychologist
**Consulted:** CEO
**Decision:** Design and implement streak freeze/grace period mechanics. Plan to be presented by Psychologist.
**Rationale:** CEO wants to see the plan. Streak anxiety is a real churn risk.
**CEO Verdict:** Plan approved. **Not a priority for now** — implement after beta launch.
**Status:** Approved, deferred

### [DECISION-011] Monetization Model Change — Free Words Forever
**Date:** 2026-02-01
**Raised by:** CEO
**Consulted:** Monetization Strategist, Product Strategist, Behavioral Psychologist
**Decision:** All word/vocabulary learning content is **free forever** — no module gating, no paywall on lessons. Premium will be a separate **advanced/fun learning mode** (longer lessons 10-20 min, deeper content, video/reels, fun activities, beyond just words). Premium launches later when audience is established and CEO decides the timing.
**Rationale:** Free vocabulary removes recommendation friction. Premium becomes a "want" not a "need." Monetize depth and entertainment, not basic learning. Spotify model — free is genuinely great, premium is for people who want more.
**Supersedes:** Previous Module 1 free / Module 2 premium split
**CEO Verdict:** Approved
**Status:** Superseded by DECISION-013

---

### [DECISION-012] Grammar Integration — "Arabic Insights" in Lessons
**Date:** 2026-02-14
**Raised by:** CEO
**Consulted:** Full team (Curriculum Designer, Behavioral Psychologist, Islamic Content Director, Product Strategist, UX Designer)
**Decision:** Every lesson now includes **words + 1 grammar concept ("Arabic Insight")**. Words alone don't create Quranic comprehension — users need grammar patterns to parse sentences. The Arabic Insight is a new screen type in the lesson flow, positioned after word introductions, before activities.
**Rationale:**
- Competitive research confirmed: every successful competitor (Al Midrar, Bayyinah, Understand Quran Academy, Kalaam) teaches grammar alongside vocabulary
- 300 words without grammar = vocabulary recognition, not comprehension
- The "Arabic Insight" approach is vocabulary-driven learning with grammar woven naturally — not a grammar course
- Curriculum Designer: grammar concepts sequenced across 60 lessons (possessives, verb patterns, plurals, prepositions, etc.)
- Islamic Content Director: all grammar examples must use Quranic text, simplification OK but distortion not
**Key grammar concepts across 60 lessons:** Root system, past tense verb pattern, "al-" definite article, possessive endings, common prepositions, present tense, plural patterns, Quranic phrase units, noun of doer pattern, negation
**CEO Verdict:** Approved
**Status:** Active

---

### [DECISION-013] Freemium Model — Words Free Forever, Premium Unlocks Depth
**Date:** 2026-02-14
**Raised by:** CEO
**Consulted:** Full team
**Decision:** No time limits. Words are **free forever** — all 300 words across all 60 lessons, always accessible. Premium unlocks the **depth layer**: Arabic Insights (grammar), Practice mode, Weekly Review, advanced activities.

**Free forever (no time limit):**
- All word introductions in every lesson (word count always grows)
- Word bank (browse all learned words)
- Basic lesson activities (Match + Fill Meaning)
- Daily Challenge
- Mid-lesson encouragement + lesson completion celebration
- Share cards + word count (always working)

**Premium:**
- Arabic Insights (grammar nuggets) — visible but blurred in lesson flow for free users
- Practice mode (quiz/review from word bank)
- Weekly Review
- Advanced activities (Pattern Match, Decode the Ayah)
- Pattern count ("12 Arabic patterns unlocked") as second progress metric

**Pricing (Pakistan-optimized):**
- Monthly: PKR 799
- Annual: PKR 4,999 (save 48%)
- Lifetime: PKR 7,999 (expected top seller in Pakistan)

**Referral:** Non-payers earn 7 days premium free per friend who downloads.

**Rationale:**
- Free users never stop being useful — word count sharing, referrals, community
- No Ramadan backlash — "Quranic words are free, always"
- Premium sells itself through visible locked value in every single lesson
- The product creates its own conversion pressure: more words learned = more need for practice mode
- Religiously defensible: "Quran's words are free. Our teaching methodology is the product."
**Supersedes:** DECISION-011, previous 30-day trial model
**CEO Verdict:** Approved
**Status:** Active

---

### [DECISION-014] Premium Introduction Timing — Taste Then Lock
**Date:** 2026-02-14
**Raised by:** CEO
**Consulted:** Full team (Behavioral Psychologist, Monetization Strategist, Curriculum Designer, UX Designer)
**Decision:** Premium features are introduced gradually using lesson-based gating (not day-based):

| Phase | Lessons | Premium Features |
|---|---|---|
| **Trust Phase** | 1-3 | No premium features. Pure vocabulary. Build habit + confidence. |
| **Taste Phase** | 4-7 | Premium features UNLOCKED with gold "Premium — free for you!" badge. 4 free Arabic Insights, first Pattern Match, first Weekly Review. |
| **Lock Phase** | 8+ | Premium features BLURRED/LOCKED. Headline visible through frosted glass overlay. Lock icon + "Unlock with Premium" button. |

**Additional surfaces:**
- Practice mode: free until 25 words learned (Lesson 5), then locks
- Weekly Review: first one free (with badge), all subsequent locked
- Advanced activities: first appearance free in Lessons 4-5, locked after Lesson 7

**Free preview counter:** "Free preview 2 of 4" shown during Taste Phase.

**Badge design:**
- During Taste Phase: gold badge "Premium — free for you!" on Arabic Insight cards
- During Lock Phase: frosted glass overlay, headline visible, content blurred, lock icon, "Unlock with Premium" button

**Rationale:**
- Lessons 1-3 pure free builds trust before showing premium
- Taste phase creates experienced value — users KNOW what premium feels like
- Lock phase creates gentle FOMO — every lesson shows what they're missing
- Lesson-based (not day-based) ensures fast users convert fastest (they're most engaged)
- The 4 free Arabic Insights must be the BEST ones (root system, Quranic pairs, verb patterns, plural patterns)
- No additional free trial after lock — the taste phase IS the trial
**CEO Verdict:** Approved
**Status:** Active

---

### [DECISION-015] Content Scope — 300 Words Production-Ready
**Date:** 2026-02-14
**Raised by:** CEO
**Consulted:** Curriculum Designer, Islamic Content Director
**Decision:** Build production-ready content for **300 words across 60 lessons** today. This includes:
- 300 words with introductions (each unique headline + body)
- 60 Arabic Insights (grammar nuggets, 1 per lesson)
- ~180 activities (3 per lesson: 2 free + 1 premium)
- 60 mid-lesson messages
- 60 celebration stats
- 60+ daily challenges
- AyahHighlights for every word
- Existing 50 words are fair game for revision
**Rationale:** "300 words = ~70% of Quran" is the core product claim. Ship the full word set at launch. Users do ~1 lesson/day, so 60 lessons = 2 months of content — well beyond initial retention window.
**CEO Verdict:** Approved
**Status:** Active
