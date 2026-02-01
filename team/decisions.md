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
