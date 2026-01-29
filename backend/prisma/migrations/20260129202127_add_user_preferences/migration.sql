-- CreateEnum
CREATE TYPE "UrduPreference" AS ENUM ('FULL', 'PARTIAL', 'NONE');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "haptics_enabled" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "sound_enabled" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "urdu_preference" "UrduPreference" NOT NULL DEFAULT 'FULL';
