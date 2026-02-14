-- CreateEnum
CREATE TYPE "InsightType" AS ENUM ('ROOT_PATTERN', 'GRAMMAR_TIP', 'CULTURAL_NOTE', 'PATTERN_RECOGNITION', 'WORD_FAMILY');

-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('ACTIVE', 'EXPIRED', 'CANCELLED', 'BILLING_RETRY');

-- CreateEnum
CREATE TYPE "SubscriptionPlatform" AS ENUM ('IOS', 'ANDROID');

-- CreateTable
CREATE TABLE "arabic_insights" (
    "id" UUID NOT NULL,
    "type" "InsightType" NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "body" TEXT NOT NULL,
    "examples" JSONB NOT NULL,
    "lesson_id" UUID NOT NULL,

    CONSTRAINT "arabic_insights_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_subscriptions" (
    "id" UUID NOT NULL,
    "revenuecat_id" VARCHAR(255) NOT NULL,
    "status" "SubscriptionStatus" NOT NULL DEFAULT 'ACTIVE',
    "platform" "SubscriptionPlatform" NOT NULL,
    "product_id" VARCHAR(255) NOT NULL,
    "purchased_at" TIMESTAMP(3) NOT NULL,
    "expires_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" UUID NOT NULL,

    CONSTRAINT "user_subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "arabic_insights_lesson_id_key" ON "arabic_insights"("lesson_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_subscriptions_revenuecat_id_key" ON "user_subscriptions"("revenuecat_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_subscriptions_user_id_key" ON "user_subscriptions"("user_id");

-- AddForeignKey
ALTER TABLE "arabic_insights" ADD CONSTRAINT "arabic_insights_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "lessons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_subscriptions" ADD CONSTRAINT "user_subscriptions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
