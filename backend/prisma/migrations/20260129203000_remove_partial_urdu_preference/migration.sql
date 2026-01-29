-- Convert any PARTIAL values to FULL before removing the enum value
UPDATE "users" SET "urdu_preference" = 'FULL' WHERE "urdu_preference" = 'PARTIAL';

-- Remove PARTIAL from UrduPreference enum
ALTER TYPE "UrduPreference" RENAME TO "UrduPreference_old";
CREATE TYPE "UrduPreference" AS ENUM ('FULL', 'NONE');
ALTER TABLE "users" ALTER COLUMN "urdu_preference" DROP DEFAULT;
ALTER TABLE "users" ALTER COLUMN "urdu_preference" TYPE "UrduPreference" USING ("urdu_preference"::text::"UrduPreference");
ALTER TABLE "users" ALTER COLUMN "urdu_preference" SET DEFAULT 'FULL';
DROP TYPE "UrduPreference_old";
