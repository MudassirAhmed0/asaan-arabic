-- CreateEnum
CREATE TYPE "IntroductionStyle" AS ENUM ('COGNATE', 'QURAN_CONTEXT', 'FUN_FACT', 'QUICK_CHECK', 'LIFE_CONNECTION');

-- CreateEnum
CREATE TYPE "ActivityType" AS ENUM ('MATCH', 'SPOT_IN_QURAN', 'QUICK_FIRE', 'FILL_MEANING');

-- CreateEnum
CREATE TYPE "WordStatus" AS ENUM ('LEARNED', 'NEEDS_REVISION', 'MASTERED');

-- CreateEnum
CREATE TYPE "ChallengeType" AS ENUM ('MEMORY_TEST', 'FUN_FACT', 'QUICK_QUIZ', 'WORD_OF_THE_DAY');

-- CreateTable
CREATE TABLE "lessons" (
    "id" UUID NOT NULL,
    "order_index" INTEGER NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "subtitle" VARCHAR(500) NOT NULL,
    "word_count" INTEGER NOT NULL,
    "is_published" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "lessons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "words" (
    "id" UUID NOT NULL,
    "order_index" INTEGER NOT NULL,
    "arabic" VARCHAR(100) NOT NULL,
    "transliteration" VARCHAR(100) NOT NULL,
    "meaning" VARCHAR(255) NOT NULL,
    "frequency" INTEGER NOT NULL,
    "is_urdu_cognate" BOOLEAN NOT NULL,
    "urdu_cognate_note" VARCHAR(500),
    "audio_url" VARCHAR(500) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lesson_id" UUID NOT NULL,

    CONSTRAINT "words_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "word_introductions" (
    "id" UUID NOT NULL,
    "style" "IntroductionStyle" NOT NULL,
    "headline" VARCHAR(500) NOT NULL,
    "body" TEXT NOT NULL,
    "ayah_text" TEXT,
    "ayah_ref" VARCHAR(50),
    "fact_stat" VARCHAR(500),
    "quick_check_question" VARCHAR(500),
    "quick_check_options" TEXT[],
    "quick_check_answer" INTEGER,
    "word_id" UUID NOT NULL,

    CONSTRAINT "word_introductions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lesson_activities" (
    "id" UUID NOT NULL,
    "order_index" INTEGER NOT NULL,
    "type" "ActivityType" NOT NULL,
    "payload" JSONB NOT NULL,
    "lesson_id" UUID NOT NULL,

    CONSTRAINT "lesson_activities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mid_lesson_messages" (
    "id" UUID NOT NULL,
    "headline" VARCHAR(255) NOT NULL,
    "body" TEXT NOT NULL,
    "lesson_id" UUID NOT NULL,

    CONSTRAINT "mid_lesson_messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "celebration_stats" (
    "id" UUID NOT NULL,
    "ayah_coverage" VARCHAR(255) NOT NULL,
    "cumulative_words" INTEGER NOT NULL,
    "lesson_id" UUID NOT NULL,

    CONSTRAINT "celebration_stats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ayah_highlights" (
    "id" UUID NOT NULL,
    "surah_name" VARCHAR(100) NOT NULL,
    "surah_num" INTEGER NOT NULL,
    "ayah_num" INTEGER NOT NULL,
    "arabic_text" TEXT NOT NULL,
    "translation" TEXT NOT NULL,
    "highlight_start_index" INTEGER NOT NULL,
    "highlight_end_index" INTEGER NOT NULL,
    "word_id" UUID NOT NULL,

    CONSTRAINT "ayah_highlights_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "surahs" (
    "id" UUID NOT NULL,
    "number" INTEGER NOT NULL,
    "name_arabic" VARCHAR(100) NOT NULL,
    "name_english" VARCHAR(100) NOT NULL,
    "name_transliteration" VARCHAR(100) NOT NULL,
    "total_ayahs" INTEGER NOT NULL,
    "revelation_type" VARCHAR(20) NOT NULL,

    CONSTRAINT "surahs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "surah_ayahs" (
    "id" UUID NOT NULL,
    "ayah_number" INTEGER NOT NULL,
    "arabic_text" TEXT NOT NULL,
    "translation" TEXT NOT NULL,
    "surah_id" UUID NOT NULL,

    CONSTRAINT "surah_ayahs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "salah_steps" (
    "id" UUID NOT NULL,
    "order_index" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "arabic_text" TEXT NOT NULL,
    "transliteration" TEXT NOT NULL,
    "translation" TEXT NOT NULL,
    "note" TEXT,

    CONSTRAINT "salah_steps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "duas" (
    "id" UUID NOT NULL,
    "order_index" INTEGER NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "occasion" VARCHAR(255) NOT NULL,
    "arabic_text" TEXT NOT NULL,
    "transliteration" TEXT NOT NULL,
    "translation" TEXT NOT NULL,
    "source" VARCHAR(255),

    CONSTRAINT "duas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_progress" (
    "id" UUID NOT NULL,
    "total_words_learned" INTEGER NOT NULL DEFAULT 0,
    "current_lesson_index" INTEGER NOT NULL DEFAULT 1,
    "onboarding_completed" BOOLEAN NOT NULL DEFAULT false,
    "last_activity_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" UUID NOT NULL,

    CONSTRAINT "user_progress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lesson_attempts" (
    "id" UUID NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "score" INTEGER,
    "started_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completed_at" TIMESTAMP(3),
    "user_id" UUID NOT NULL,
    "lesson_id" UUID NOT NULL,

    CONSTRAINT "lesson_attempts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "word_progress" (
    "id" UUID NOT NULL,
    "status" "WordStatus" NOT NULL DEFAULT 'LEARNED',
    "times_correct" INTEGER NOT NULL DEFAULT 0,
    "times_incorrect" INTEGER NOT NULL DEFAULT 0,
    "last_reviewed_at" TIMESTAMP(3),
    "learned_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" UUID NOT NULL,
    "word_id" UUID NOT NULL,

    CONSTRAINT "word_progress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "streak_records" (
    "id" UUID NOT NULL,
    "current_streak" INTEGER NOT NULL DEFAULT 0,
    "longest_streak" INTEGER NOT NULL DEFAULT 0,
    "last_active_date" DATE,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" UUID NOT NULL,

    CONSTRAINT "streak_records_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "daily_challenges" (
    "id" UUID NOT NULL,
    "date" DATE NOT NULL,
    "type" "ChallengeType" NOT NULL,
    "payload" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "daily_challenges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "challenge_attempts" (
    "id" UUID NOT NULL,
    "answered" BOOLEAN NOT NULL DEFAULT false,
    "correct" BOOLEAN,
    "answered_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" UUID NOT NULL,
    "challenge_id" UUID NOT NULL,

    CONSTRAINT "challenge_attempts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "weekly_reviews" (
    "id" UUID NOT NULL,
    "week_number" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,
    "total_words" INTEGER NOT NULL,
    "completed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" UUID NOT NULL,

    CONSTRAINT "weekly_reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fcm_tokens" (
    "id" UUID NOT NULL,
    "token" VARCHAR(500) NOT NULL,
    "platform" VARCHAR(10) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" UUID NOT NULL,

    CONSTRAINT "fcm_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "lessons_order_index_key" ON "lessons"("order_index");

-- CreateIndex
CREATE UNIQUE INDEX "words_order_index_key" ON "words"("order_index");

-- CreateIndex
CREATE INDEX "words_lesson_id_idx" ON "words"("lesson_id");

-- CreateIndex
CREATE UNIQUE INDEX "word_introductions_word_id_key" ON "word_introductions"("word_id");

-- CreateIndex
CREATE UNIQUE INDEX "lesson_activities_lesson_id_order_index_key" ON "lesson_activities"("lesson_id", "order_index");

-- CreateIndex
CREATE UNIQUE INDEX "mid_lesson_messages_lesson_id_key" ON "mid_lesson_messages"("lesson_id");

-- CreateIndex
CREATE UNIQUE INDEX "celebration_stats_lesson_id_key" ON "celebration_stats"("lesson_id");

-- CreateIndex
CREATE UNIQUE INDEX "surahs_number_key" ON "surahs"("number");

-- CreateIndex
CREATE UNIQUE INDEX "surah_ayahs_surah_id_ayah_number_key" ON "surah_ayahs"("surah_id", "ayah_number");

-- CreateIndex
CREATE UNIQUE INDEX "salah_steps_order_index_key" ON "salah_steps"("order_index");

-- CreateIndex
CREATE UNIQUE INDEX "duas_order_index_key" ON "duas"("order_index");

-- CreateIndex
CREATE UNIQUE INDEX "user_progress_user_id_key" ON "user_progress"("user_id");

-- CreateIndex
CREATE INDEX "lesson_attempts_user_id_idx" ON "lesson_attempts"("user_id");

-- CreateIndex
CREATE INDEX "lesson_attempts_user_id_lesson_id_idx" ON "lesson_attempts"("user_id", "lesson_id");

-- CreateIndex
CREATE INDEX "word_progress_user_id_idx" ON "word_progress"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "word_progress_user_id_word_id_key" ON "word_progress"("user_id", "word_id");

-- CreateIndex
CREATE UNIQUE INDEX "streak_records_user_id_key" ON "streak_records"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "daily_challenges_date_key" ON "daily_challenges"("date");

-- CreateIndex
CREATE UNIQUE INDEX "challenge_attempts_user_id_challenge_id_key" ON "challenge_attempts"("user_id", "challenge_id");

-- CreateIndex
CREATE UNIQUE INDEX "weekly_reviews_user_id_week_number_year_key" ON "weekly_reviews"("user_id", "week_number", "year");

-- CreateIndex
CREATE UNIQUE INDEX "fcm_tokens_token_key" ON "fcm_tokens"("token");

-- CreateIndex
CREATE INDEX "fcm_tokens_user_id_idx" ON "fcm_tokens"("user_id");

-- AddForeignKey
ALTER TABLE "words" ADD CONSTRAINT "words_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "lessons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "word_introductions" ADD CONSTRAINT "word_introductions_word_id_fkey" FOREIGN KEY ("word_id") REFERENCES "words"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lesson_activities" ADD CONSTRAINT "lesson_activities_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "lessons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mid_lesson_messages" ADD CONSTRAINT "mid_lesson_messages_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "lessons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "celebration_stats" ADD CONSTRAINT "celebration_stats_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "lessons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ayah_highlights" ADD CONSTRAINT "ayah_highlights_word_id_fkey" FOREIGN KEY ("word_id") REFERENCES "words"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "surah_ayahs" ADD CONSTRAINT "surah_ayahs_surah_id_fkey" FOREIGN KEY ("surah_id") REFERENCES "surahs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_progress" ADD CONSTRAINT "user_progress_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lesson_attempts" ADD CONSTRAINT "lesson_attempts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lesson_attempts" ADD CONSTRAINT "lesson_attempts_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "lessons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "word_progress" ADD CONSTRAINT "word_progress_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "word_progress" ADD CONSTRAINT "word_progress_word_id_fkey" FOREIGN KEY ("word_id") REFERENCES "words"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "streak_records" ADD CONSTRAINT "streak_records_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "challenge_attempts" ADD CONSTRAINT "challenge_attempts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "challenge_attempts" ADD CONSTRAINT "challenge_attempts_challenge_id_fkey" FOREIGN KEY ("challenge_id") REFERENCES "daily_challenges"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "weekly_reviews" ADD CONSTRAINT "weekly_reviews_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fcm_tokens" ADD CONSTRAINT "fcm_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
