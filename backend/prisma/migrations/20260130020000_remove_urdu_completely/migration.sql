-- Remove Urdu preference from users
ALTER TABLE "users" DROP COLUMN IF EXISTS "urdu_preference";

-- Remove Urdu cognate fields from words
ALTER TABLE "words" DROP COLUMN IF EXISTS "is_urdu_cognate";
ALTER TABLE "words" DROP COLUMN IF EXISTS "urdu_cognate_note";

-- Drop UrduPreference enum
DROP TYPE IF EXISTS "UrduPreference";
