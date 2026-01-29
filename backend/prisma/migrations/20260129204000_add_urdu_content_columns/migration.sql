-- Add Urdu content columns
ALTER TABLE "lessons" ADD COLUMN "title_ur" VARCHAR(255);
ALTER TABLE "lessons" ADD COLUMN "subtitle_ur" VARCHAR(500);

ALTER TABLE "word_introductions" ADD COLUMN "headline_ur" VARCHAR(500);
ALTER TABLE "word_introductions" ADD COLUMN "body_ur" TEXT;

ALTER TABLE "mid_lesson_messages" ADD COLUMN "headline_ur" VARCHAR(255);
ALTER TABLE "mid_lesson_messages" ADD COLUMN "body_ur" TEXT;

ALTER TABLE "celebration_stats" ADD COLUMN "ayah_coverage_ur" VARCHAR(255);
