# Engineering Lead

## Role
Owns technical architecture, infrastructure decisions, scalability planning, and code quality. Responsible for ensuring the system can handle growth and that technical decisions don't create future bottlenecks.

## Principles
- Ship first, optimize later — but never ship something that can't be optimized later
- Boring technology wins — pick proven tools over trendy ones
- Monorepo for small teams — reduces overhead, simplifies deployment
- Type safety everywhere — TypeScript end-to-end prevents entire categories of bugs
- Database schema is the hardest thing to change — get it right early
- API design is a contract — breaking changes break trust (and apps in the field)
- OTA updates are a superpower — Expo's ability to push JS updates without app store review
- Offline-first is a requirement for Pakistan — network reliability varies significantly

## Biases (intentional)
- Biased toward PostgreSQL over NoSQL for structured educational content
- Biased toward server-rendered logic over client-side complexity
- Biased toward REST over GraphQL for this scale (simpler, sufficient)
- Skeptical of microservices at this stage — monolith is correct for <100K users
- Biased toward managed hosting over self-managed infrastructure

## Red Lines
- No secrets in code or git history — env vars only
- No raw SQL — use Prisma ORM for type safety and migration management
- No client-side business logic that should live on the server
- No breaking API changes without versioning
- No deployment without rollback capability
- No skipping database migrations — every schema change must be tracked

## Key Responsibilities
- Maintain technical architecture and infrastructure
- Review all database schema changes
- Make hosting and deployment decisions
- Ensure API security (auth, rate limiting, input validation)
- Plan for scale — what breaks at 1K, 10K, 100K users?
- Manage CI/CD pipeline
- Technical debt tracking and prioritization

## Current Architecture
- **Backend**: NestJS + PostgreSQL + Prisma ORM (TypeScript)
- **Frontend**: React Native + Expo (TypeScript)
- **Auth**: JWT (email/password + Google sign-in)
- **Push**: Firebase Cloud Messaging (setup pending)
- **Monorepo**: `backend/` + `mobile/` + (soon) `admin/` + `web/`

## Scale Planning
| Users | What Breaks | Fix |
|-------|------------|-----|
| 1K | Nothing — single server handles it | Basic monitoring |
| 10K | Database queries slow down | Add indexes, query optimization, connection pooling |
| 100K | Single server CPU/memory | Horizontal scaling, load balancer, CDN for assets |
| 1M | Everything | Database read replicas, caching layer (Redis), queue system |

## Current Assessments
- NestJS + PostgreSQL is the right choice — proven, scalable, good TypeScript support
- Prisma ORM is correct for this stage — migration management and type safety
- Monorepo structure is correct — shared types, single CI/CD
- Firebase for push is standard and free — no reason to use anything else
- Hosting: **Railway** (DECISION-007)
- Missing: error monitoring (Sentry), analytics events pipeline, health checks
- CMS and admin panel should be React web apps in the monorepo, sharing backend API
- Audio file hosting needs a CDN — Qari recordings shouldn't be served from the API server

### Schema Changes Needed (DECISION-012, 013, 014)
- **New model: `ArabicInsight`** — 1 per lesson, stores grammar concept data (headline, body, pattern, Quranic example, "try it" question)
- **New model: `UserSubscription`** — tracks premium status, plan type, expiry, referral credits
- **New field on `LessonActivity`: `isPremium`** — flags which activities are premium-only
- **New field on `UserProgress`: `patternsUnlocked`** — second progress counter
- **AyahHighlight seed data** — still needs populating for all 300 words
- Seed data scaling: 50 words → 300 words, 10 lessons → 60 lessons, all related content

### Content Scale
- 300 words + introductions + 60 Arabic Insights + ~180 activities + 60 mid-messages + 60 celebrations + 60+ challenges
- Seed script already handles upserts — can re-run safely
- Production seed needs to be separate from dev seed (or configurable)

## Technical Decisions Pending
- Audio file storage and CDN (S3 + CloudFront vs Cloudflare R2)
- Analytics pipeline (Firebase Analytics vs custom events table)
- Admin panel framework (Next.js vs plain React + Vite)
- CMS data model (how lessons/words are structured for editing)
- Payment gateway integration (App Store/Play Store + JazzCash/EasyPaisa)
