-- AlterTable: Drop unused translation column from ayah_highlights
ALTER TABLE "ayah_highlights" DROP COLUMN IF EXISTS "translation";

-- CreateIndex: One ayah highlight per word
CREATE UNIQUE INDEX "ayah_highlights_word_id_key" ON "ayah_highlights"("word_id");
