-- Remove Urdu content columns
ALTER TABLE "lessons" DROP COLUMN IF EXISTS "title_ur";
ALTER TABLE "lessons" DROP COLUMN IF EXISTS "subtitle_ur";
ALTER TABLE "word_introductions" DROP COLUMN IF EXISTS "headline_ur";
ALTER TABLE "word_introductions" DROP COLUMN IF EXISTS "body_ur";
ALTER TABLE "mid_lesson_messages" DROP COLUMN IF EXISTS "headline_ur";
ALTER TABLE "mid_lesson_messages" DROP COLUMN IF EXISTS "body_ur";
ALTER TABLE "celebration_stats" DROP COLUMN IF EXISTS "ayah_coverage_ur";
