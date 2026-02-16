# Architecture — Qur'anic Arabic Learning App

## Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| Frontend | React Native + Expo (TypeScript) | Cross-platform, OTA updates, one codebase |
| Backend | NestJS (TypeScript) | Structured, scalable, full ownership |
| Database | PostgreSQL + Prisma ORM | Reliable, free, type-safe queries |
| Auth | JWT (access + refresh tokens) + Google OAuth | Built into NestJS, stateless |
| Push | Firebase Cloud Messaging (FCM) | Free, both platforms |
| Payments | RevenueCat | In-app subscriptions (iOS + Android) |
| Cache | AsyncStorage + react-query-persist-client | Offline-first query persistence |

---

## Project Structure

```
to-be-decided/
├── claude.md              # Project status + decisions
├── goals.md               # Product vision + persona
├── planning.md            # Product plan + lesson design
├── words.md               # Content: 300 words, 60 lessons
├── architecture.md        # THIS FILE: technical reference
├── progress.md            # Feature tracker: DONE / IN PROGRESS / NEXT
├── backend/               # NestJS API
│   ├── src/
│   │   ├── app.module.ts
│   │   ├── main.ts
│   │   ├── auth/          # Google OAuth + JWT (access + refresh)
│   │   ├── users/         # User profile + progress
│   │   ├── prisma/        # Database service (Prisma v7 + PrismaPg adapter)
│   │   ├── lessons/       # Lesson content + completion + premium gating
│   │   ├── words/         # Word bank + practice quiz
│   │   ├── streaks/       # Streak tracking
│   │   ├── challenges/    # Daily challenge
│   │   ├── reviews/       # Weekly review
│   │   ├── subscriptions/ # RevenueCat integration + premium status
│   │   ├── library/       # Surahs, Salah, Duas (deferred)
│   │   ├── notifications/ # FCM push + 3 cron jobs
│   │   └── firebase/      # Firebase Admin SDK
│   ├── prisma/
│   │   ├── schema.prisma
│   │   ├── migrations/
│   │   └── seed/          # Seed data (12 files, ~9,300 lines)
│   └── test/
├── mobile/                # Expo React Native app
│   ├── app/               # Expo Router (file-based routing)
│   │   ├── _layout.tsx
│   │   ├── (auth)/
│   │   ├── (onboarding)/
│   │   ├── lesson/[id].tsx
│   │   ├── paywall.tsx
│   │   └── (tabs)/
│   │       ├── learn/
│   │       ├── words/
│   │       ├── practice/
│   │       └── library/   # Hidden — "Coming Soon"
│   └── src/
│       ├── api/           # Axios client + API modules
│       ├── hooks/         # Custom React hooks
│       ├── stores/        # Zustand stores (auth, lesson, premium)
│       ├── services/      # RevenueCat purchases service
│       ├── components/    # UI components
│       ├── constants/     # Theme, milestones
│       ├── types/         # TypeScript types
│       ├── utils/         # Helpers
│       └── assets/        # Fonts, images
├── cms/                   # Content Management System
├── web/                   # Landing page (Vercel)
└── content/               # Instagram campaign assets
```

---

## Database Schema

### Existing Models (DONE)

**User** (`users`)
- `id` UUID PK
- `phone` VARCHAR(15) UNIQUE NULL
- `phoneVerified` BOOLEAN DEFAULT false
- `googleId` VARCHAR(255) UNIQUE NULL
- `email` VARCHAR(255) NULL
- `name` VARCHAR(255) NULL
- `profilePicture` VARCHAR(500) NULL
- `createdAt` TIMESTAMP
- `updatedAt` TIMESTAMP

**OtpCode** (`otp_codes`)
- `id` UUID PK
- `phone` VARCHAR(15) INDEXED
- `code` VARCHAR(4)
- `expiresAt` TIMESTAMP
- `used` BOOLEAN DEFAULT false
- `createdAt` TIMESTAMP

**RefreshToken** (`refresh_tokens`)
- `id` UUID PK
- `userId` UUID FK→User
- `tokenHash` VARCHAR(255)
- `expiresAt` TIMESTAMP
- `revoked` BOOLEAN DEFAULT false
- `createdAt` TIMESTAMP

### Content Models (seeded)

**Lesson** (`lessons`)
- `id` UUID PK
- `orderIndex` INT UNIQUE (1-60)
- `title` VARCHAR(255)
- `subtitle` VARCHAR(500)
- `wordCount` INT
- `isPublished` BOOLEAN DEFAULT false
- `createdAt` TIMESTAMP

**Word** (`words`)
- `id` UUID PK
- `orderIndex` INT UNIQUE (1-300)
- `arabic` VARCHAR(100)
- `transliteration` VARCHAR(100)
- `meaning` VARCHAR(255)
- `frequency` INT
- `isUrduCognate` BOOLEAN
- `urduCognateNote` VARCHAR(500) NULL
- `audioUrl` VARCHAR(500)
- `lessonId` UUID FK→Lesson
- `createdAt` TIMESTAMP

**WordIntroduction** (`word_introductions`)
- `id` UUID PK
- `wordId` UUID FK→Word UNIQUE
- `style` ENUM(COGNATE, QURAN_CONTEXT, FUN_FACT, QUICK_CHECK, LIFE_CONNECTION)
- `headline` VARCHAR(500)
- `body` TEXT
- `ayahText` TEXT NULL
- `ayahRef` VARCHAR(50) NULL
- `factStat` VARCHAR(500) NULL
- `quickCheckQuestion` VARCHAR(500) NULL
- `quickCheckOptions` TEXT[] NULL
- `quickCheckAnswer` INT NULL

**LessonActivity** (`lesson_activities`)
- `id` UUID PK
- `lessonId` UUID FK→Lesson
- `orderIndex` INT
- `type` ENUM(MATCH, SPOT_IN_QURAN, QUICK_FIRE, FILL_MEANING)
- `payload` JSON
- UNIQUE(lessonId, orderIndex)

**MidLessonMessage** (`mid_lesson_messages`)
- `id` UUID PK
- `lessonId` UUID FK→Lesson UNIQUE
- `headline` VARCHAR(255)
- `body` TEXT

**CelebrationStat** (`celebration_stats`)
- `id` UUID PK
- `lessonId` UUID FK→Lesson UNIQUE
- `ayahCoverage` VARCHAR(255)
- `cumulativeWords` INT

**ArabicInsight** (`arabic_insights`)
- `id` UUID PK
- `lessonId` UUID FK→Lesson UNIQUE
- `type` ENUM(ROOT_PATTERN, GRAMMAR_TIP, CULTURAL_NOTE, PATTERN_RECOGNITION, WORD_FAMILY)
- `title` VARCHAR(255)
- `body` TEXT
- `examples` JSON — [{ arabic, transliteration, meaning, note? }]

**AyahHighlight** (`ayah_highlights`)
- `id` UUID PK
- `wordId` UUID FK→Word UNIQUE
- `surahName` VARCHAR(100)
- `surahNum` INT
- `ayahNum` INT
- `arabicText` TEXT
- `highlightStartIndex` INT
- `highlightEndIndex` INT

### Library Models (seeded)

**Surah** (`surahs`)
- `id` UUID PK
- `number` INT UNIQUE
- `nameArabic` VARCHAR(100)
- `nameEnglish` VARCHAR(100)
- `nameTransliteration` VARCHAR(100)
- `totalAyahs` INT
- `revelationType` VARCHAR(20)

**SurahAyah** (`surah_ayahs`)
- `id` UUID PK
- `surahId` UUID FK→Surah
- `ayahNumber` INT
- `arabicText` TEXT
- `translation` TEXT
- UNIQUE(surahId, ayahNumber)

**SalahStep** (`salah_steps`)
- `id` UUID PK
- `orderIndex` INT UNIQUE
- `name` VARCHAR(255)
- `arabicText` TEXT
- `transliteration` TEXT
- `translation` TEXT
- `note` TEXT NULL

**Dua** (`duas`)
- `id` UUID PK
- `orderIndex` INT UNIQUE
- `title` VARCHAR(255)
- `occasion` VARCHAR(255)
- `arabicText` TEXT
- `transliteration` TEXT
- `translation` TEXT
- `source` VARCHAR(255) NULL

### User Progress Models

**UserProgress** (`user_progress`)
- `id` UUID PK
- `userId` UUID FK→User UNIQUE
- `totalWordsLearned` INT DEFAULT 0
- `currentLessonIndex` INT DEFAULT 1
- `onboardingCompleted` BOOLEAN DEFAULT false
- `lastActivityAt` TIMESTAMP NULL
- `updatedAt` TIMESTAMP

**LessonAttempt** (`lesson_attempts`)
- `id` UUID PK
- `userId` UUID FK→User
- `lessonId` UUID FK→Lesson
- `completed` BOOLEAN DEFAULT false
- `score` INT NULL
- `startedAt` TIMESTAMP
- `completedAt` TIMESTAMP NULL
- INDEX(userId), INDEX(userId, lessonId)

**WordProgress** (`word_progress`)
- `id` UUID PK
- `userId` UUID FK→User
- `wordId` UUID FK→Word
- `status` ENUM(LEARNED, NEEDS_REVISION, MASTERED) DEFAULT LEARNED
- `timesCorrect` INT DEFAULT 0
- `timesIncorrect` INT DEFAULT 0
- `lastReviewedAt` TIMESTAMP NULL
- `learnedAt` TIMESTAMP
- UNIQUE(userId, wordId), INDEX(userId)

**StreakRecord** (`streak_records`)
- `id` UUID PK
- `userId` UUID FK→User UNIQUE
- `currentStreak` INT DEFAULT 0
- `longestStreak` INT DEFAULT 0
- `lastActiveDate` DATE NULL
- `updatedAt` TIMESTAMP

### Daily Challenge Models

**DailyChallenge** (`daily_challenges`)
- `id` UUID PK
- `date` DATE UNIQUE
- `type` ENUM(MEMORY_TEST, FUN_FACT, QUICK_QUIZ, WORD_OF_THE_DAY)
- `payload` JSON
- `createdAt` TIMESTAMP

**ChallengeAttempt** (`challenge_attempts`)
- `id` UUID PK
- `userId` UUID FK→User
- `challengeId` UUID FK→DailyChallenge
- `answered` BOOLEAN DEFAULT false
- `correct` BOOLEAN NULL
- `answeredAt` TIMESTAMP NULL
- `createdAt` TIMESTAMP
- UNIQUE(userId, challengeId)

**WeeklyReview** (`weekly_reviews`)
- `id` UUID PK
- `userId` UUID FK→User
- `weekNumber` INT
- `year` INT
- `score` INT
- `totalWords` INT
- `completedAt` TIMESTAMP
- UNIQUE(userId, weekNumber, year)

### Push Notification Model

**FcmToken** (`fcm_tokens`)
- `id` UUID PK
- `userId` UUID FK→User
- `token` VARCHAR(500) UNIQUE
- `platform` VARCHAR(10)
- `active` BOOLEAN DEFAULT true
- `createdAt` TIMESTAMP
- `updatedAt` TIMESTAMP
- INDEX(userId)

### Subscription Model

**UserSubscription** (`user_subscriptions`)
- `id` UUID PK
- `userId` UUID FK→User UNIQUE
- `revenuecatId` VARCHAR(255) UNIQUE
- `status` ENUM(ACTIVE, EXPIRED, CANCELLED, BILLING_RETRY)
- `platform` ENUM(IOS, ANDROID)
- `productId` VARCHAR(255)
- `purchasedAt` TIMESTAMP
- `expiresAt` TIMESTAMP NULL
- `createdAt` TIMESTAMP
- `updatedAt` TIMESTAMP

---

## API Endpoints

### Auth (DONE)
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/auth/otp/send` | No | Send OTP to phone |
| POST | `/auth/otp/verify` | No | Verify OTP, return tokens |
| POST | `/auth/google` | No | Google sign-in |
| POST | `/auth/refresh` | No | Refresh token pair |
| POST | `/auth/logout` | No | Revoke refresh token |
| POST | `/auth/phone/link` | JWT | Send OTP for phone linking |
| POST | `/auth/phone/link/verify` | JWT | Verify phone link OTP |

### Users
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/users/me` | JWT | Profile + progress summary |
| PATCH | `/users/me` | JWT | Update name/picture |
| POST | `/users/me/onboarding` | JWT | Mark onboarding complete |

### Lessons
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/lessons` | JWT | List lessons with completion/lock status |
| GET | `/lessons/:id` | JWT | Full lesson content |
| POST | `/lessons/:id/start` | JWT | Record lesson attempt start |
| POST | `/lessons/:id/complete` | JWT | Complete lesson, update progress |

### Words
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/words` | JWT | Learned words with search + status filter |
| GET | `/words/practice` | JWT | Generate quiz (count, status filter) |
| GET | `/words/:id` | JWT | Single word detail |
| PATCH | `/words/:id/status` | JWT | Toggle LEARNED/NEEDS_REVISION |
| POST | `/words/quiz-results` | JWT | Record quiz results, auto-flag wrong words |

### Streaks
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/streaks/me` | JWT | Current streak data |

### Daily Challenges
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/challenges/today` | JWT | Today's challenge |
| POST | `/challenges/today/answer` | JWT | Submit answer |
| GET | `/challenges/history` | JWT | Last 30 results |

### Weekly Reviews
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/reviews/current` | JWT | This week's review quiz |
| POST | `/reviews/submit` | JWT | Submit review score |
| GET | `/reviews/history` | JWT | Past scores |

### Library
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/library/surahs` | JWT | List 114 surahs |
| GET | `/library/surahs/:number` | JWT | Full surah with ayahs |
| GET | `/library/salah` | JWT | Salah steps |
| GET | `/library/duas` | JWT | Common duas |

### Notifications
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/notifications/register` | JWT | Register FCM token |
| DELETE | `/notifications/unregister` | JWT | Deactivate token |

### Subscriptions
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/subscriptions/status` | JWT | Premium status + subscription details |
| POST | `/subscriptions/verify` | JWT | Verify RevenueCat purchase |
| POST | `/subscriptions/webhook` | Webhook secret | RevenueCat event handler |

### Share
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/share/progress-card` | JWT | Generate progress PNG |
| GET | `/share/milestone-card/:milestone` | JWT | Milestone PNG |
| GET | `/share/lesson-card/:lessonId` | JWT | Lesson completion PNG |

---

## Frontend Architecture

### State Management
- **Zustand**: `authStore` (tokens, user), `lessonStore` (ephemeral flow), `premiumStore` (RevenueCat state)
- **TanStack Query**: Server state (lessons, words, challenges, reviews) + AsyncStorage persistence
- **SecureStore**: JWT tokens (encrypted)
- **AsyncStorage**: Query cache persistence, onboarding flag

### Design System
- Arabic font: Amiri (via expo-font)
- Palette: Deep teal `#0D7377`, gold accent `#D4A843`, cream background `#F5F0EB`, deep `#042f2e`, dark `#1A1A2E`
- Arabic text: RTL, right-aligned, large Amiri font
- Animations: react-native-reanimated
- Haptics: expo-haptics on correct answers
- Audio: expo-av for Qari recordings

### Key Libraries
- expo-router (navigation)
- @tanstack/react-query (server state)
- zustand (client state)
- axios (HTTP client)
- expo-av (audio)
- expo-font (Arabic fonts)
- expo-secure-store (token storage)
- expo-notifications (FCM)
- expo-sharing (share cards)
- expo-file-system (temp files)
- expo-haptics (haptic feedback)
- react-native-reanimated (animations)
- react-native-purchases (RevenueCat)
- @tanstack/react-query-persist-client (query cache persistence)
- react-native-view-shot (share card capture)
