/**
 * Generate AyahHighlight seed data — curated approach.
 * For each word, we specify MULTIPLE candidate ayahs.
 * The script fetches each, strips diacritics, handles ال prefixes,
 * and finds exact consonant matches.
 *
 * Usage: node prisma/seed/generate-ayah-highlights.mjs
 */

// Strip ALL diacritics including shadda, tanwin, vowels, Uthmani marks
function strip(text) {
  return text
    .replace(/\u0670/g, 'ا')                                    // superscript alif → alif (BEFORE stripping harakat)
    .replace(/[\u064B-\u0652\u0640]/g, '')                       // harakat, tatweel
    .replace(/[\u06D6-\u06DC\u06DF-\u06E4\u06E7-\u06E8\u06EA-\u06ED]/g, '') // Quranic marks
    .replace(/[ۥۦۭۧۨ]/g, '')                                    // small marks
    .replace(/ٱ/g, 'ا')                                          // alif wasla → alif
    .replace(/ٰ/g, 'ا')                                          // dagger alif → alif
    .replace(/[أإآ]/g, 'ا');                                      // hamza on alif → bare alif
}

// Common prefixes in Quranic Arabic that can attach to words
const PREFIXES = ['', 'ال', 'و', 'ف', 'ب', 'ل', 'لل', 'وال', 'فال', 'بال', 'كال'];

function matchWord(ayahWord, target) {
  const strippedAyah = strip(ayahWord);
  const strippedTarget = strip(target);

  // Try matching with optional tanwin alif suffix (ً + ا at end)
  const candidates = [strippedAyah];
  if (strippedAyah.endsWith('ا')) {
    candidates.push(strippedAyah.slice(0, -1)); // remove tanwin alif
  }

  for (const candidate of candidates) {
    // Exact match
    if (candidate === strippedTarget) return true;

    // Match after removing a known prefix from the ayah word
    for (const prefix of PREFIXES) {
      if (prefix && candidate.startsWith(prefix)) {
        const remainder = candidate.slice(prefix.length);
        if (remainder === strippedTarget) return true;
      }
    }
  }

  return false;
}

const SURAH_NAMES = [
  '', 'Al-Fatiha', 'Al-Baqarah', 'Aal-Imran', 'An-Nisa', "Al-Ma'idah",
  "Al-An'am", "Al-A'raf", 'Al-Anfal', 'At-Tawbah', 'Yunus',
  'Hud', 'Yusuf', "Ar-Ra'd", 'Ibrahim', 'Al-Hijr',
  'An-Nahl', 'Al-Isra', 'Al-Kahf', 'Maryam', 'Ta-Ha',
  'Al-Anbiya', 'Al-Hajj', "Al-Mu'minun", 'An-Nur', 'Al-Furqan',
  "Ash-Shu'ara", 'An-Naml', 'Al-Qasas', 'Al-Ankabut', 'Ar-Rum',
  'Luqman', 'As-Sajdah', 'Al-Ahzab', 'Saba', 'Fatir',
  'Ya-Sin', 'As-Saffat', 'Sad', 'Az-Zumar', 'Ghafir',
  'Fussilat', 'Ash-Shura', 'Az-Zukhruf', 'Ad-Dukhan', 'Al-Jathiyah',
  'Al-Ahqaf', 'Muhammad', 'Al-Fath', 'Al-Hujurat', 'Qaf',
  'Adh-Dhariyat', 'At-Tur', 'An-Najm', 'Al-Qamar', 'Ar-Rahman',
  "Al-Waqi'ah", 'Al-Hadid', 'Al-Mujadilah', 'Al-Hashr', 'Al-Mumtahanah',
  'As-Saff', "Al-Jumu'ah", 'Al-Munafiqun', 'At-Taghabun', 'At-Talaq',
  'At-Tahrim', 'Al-Mulk', 'Al-Qalam', 'Al-Haqqah', "Al-Ma'arij",
  'Nuh', 'Al-Jinn', 'Al-Muzzammil', 'Al-Muddaththir', 'Al-Qiyamah',
  'Al-Insan', 'Al-Mursalat', "An-Naba'", "An-Nazi'at", 'Abasa',
  'At-Takwir', 'Al-Infitar', 'Al-Mutaffifin', 'Al-Inshiqaq', 'Al-Buruj',
  'At-Tariq', "Al-A'la", 'Al-Ghashiyah', 'Al-Fajr', 'Al-Balad',
  'Ash-Shams', 'Al-Layl', 'Ad-Duha', 'Ash-Sharh', 'At-Tin',
  'Al-Alaq', 'Al-Qadr', 'Al-Bayyinah', 'Az-Zalzalah', 'Al-Adiyat',
  "Al-Qari'ah", 'At-Takathur', 'Al-Asr', 'Al-Humazah', 'Al-Fil',
  'Quraysh', "Al-Ma'un", 'Al-Kawthar', 'Al-Kafirun', 'An-Nasr',
  'Al-Masad', 'Al-Ikhlas', 'Al-Falaq', 'An-Nas',
];

// Each word with multiple candidate ayahs to try (in preference order)
const WORDS = [
  // ── NOUNS (base form — case endings OK, ال prefix OK) ──
  { orderIndex: 48, arabic: 'يوم', candidates: [[1,4], [82,19], [56,56], [70,8]] },
  { orderIndex: 108, arabic: 'كل', candidates: [[21,35], [3,185], [36,12], [54,49]] },
  { orderIndex: 33, arabic: 'عبد', candidates: [[2,23], [19,30], [17,1], [53,10]] },
  { orderIndex: 123, arabic: 'بيت', candidates: [[2,125], [3,96], [2,158], [29,41]] },
  { orderIndex: 94, arabic: 'سلطان', candidates: [[3,151], [7,71], [11,96], [14,10], [40,35]] },
  { orderIndex: 148, arabic: 'حكم', candidates: [[6,57], [13,41], [5,43], [12,40], [21,79]] },
  { orderIndex: 198, arabic: 'عدو', candidates: [[2,36], [2,168], [2,208], [7,22], [20,39]] },
  { orderIndex: 229, arabic: 'تقوى', candidates: [[2,197], [5,2], [48,26], [9,109], [22,32]] },
  { orderIndex: 267, arabic: 'فاسق', candidates: [[49,6], [32,18]] },
  { orderIndex: 298, arabic: 'بينة', candidates: [[98,1], [98,4], [6,57], [8,42], [11,17]] },
  { orderIndex: 238, arabic: 'ذرية', candidates: [[3,34], [3,36], [2,124], [6,84], [19,58]] },
  { orderIndex: 2, arabic: 'رحمة', candidates: [[3,107], [2,218], [11,73], [19,2], [6,12]] },
  { orderIndex: 58, arabic: 'بصر', candidates: [[67,4], [67,3], [6,103], [75,7], [50,22]] },
  { orderIndex: 274, arabic: 'متقين', candidates: [[2,2], [3,76], [3,133], [51,15], [77,41]] },

  // ── PARTICLES (exact form, very common) ──
  { orderIndex: 178, arabic: 'حتى', candidates: [[2,55], [2,102], [2,214], [12,35]] },
  { orderIndex: 182, arabic: 'بعد', candidates: [[2,27], [2,52], [5,3], [7,129]] },
  { orderIndex: 152, arabic: 'ليس', candidates: [[2,177], [3,128], [42,11], [2,198]] },
  { orderIndex: 117, arabic: 'لن', candidates: [[2,55], [3,92], [7,143], [19,26]] },
  { orderIndex: 288, arabic: 'ان', candidates: [[2,26], [3,62], [3,59], [8,32], [10,36]] },

  // ── VERBS (exact 3rd person singular past — STRICT) ──
  { orderIndex: 77, arabic: 'انزل', candidates: [[2,174], [2,185], [3,3], [4,136], [5,48]] },
  { orderIndex: 252, arabic: 'ترك', candidates: [[2,180], [4,7], [4,11], [4,12]] },
  { orderIndex: 207, arabic: 'بعث', candidates: [[62,2], [3,164], [2,129], [16,36]] },
];

// Skipped words (exact taught form doesn't appear as standalone in Quran):
// 17 (عَمِلَ) — always عَمِلُوا in Quran
// 29 (عَبَدَ) — always نَعْبُدُ / تَعْبُدُوا / اعْبُدُوا
// 63 (خَرَجَ) — always خَرَجُوا / بِخَارِجِينَ (conjugated/suffixed)
// 87 (أَنْفَقَ) — always أَنفَقُوا
// 138 (أَنْذَرَ) — always أَنذَرْتَهُمْ / أُنذِرُوا
// 213 (ظَنَّ) — always ظَنُّوا
// 243 (أَشْرَكَ) — always أَشْرَكُوا
// 259 (نَسِيَ) — always نَسُوا / نَسِيتُمْ
// 168 (أَخ) — always أَخَاهُ / أَخِيهِ (suffixed)

async function fetchAyah(surah, ayah) {
  const res = await fetch(`https://api.alquran.cloud/v1/ayah/${surah}:${ayah}/quran-uthmani`);
  const data = await res.json();
  if (data.code !== 200) throw new Error(`Failed to fetch ${surah}:${ayah}`);
  return data.data.text;
}

function findInAyah(ayahText, arabicTarget) {
  const words = ayahText.split(' ');
  for (let i = 0; i < words.length; i++) {
    if (matchWord(words[i], arabicTarget)) {
      let pos = 0;
      for (let j = 0; j < i; j++) pos += words[j].length + 1;
      return { start: pos, end: pos + words[i].length, matched: words[i] };
    }
  }
  return null;
}

async function main() {
  console.log('Generating ayah highlights (curated + verified)...\n');
  const results = [];
  const failed = [];

  for (const word of WORDS) {
    let found = false;
    for (const [surah, ayah] of word.candidates) {
      try {
        const text = await fetchAyah(surah, ayah);
        const hit = findInAyah(text, word.arabic);
        if (hit) {
          results.push({
            wordOrderIndex: word.orderIndex,
            surahName: SURAH_NAMES[surah],
            surahNum: surah,
            ayahNum: ayah,
            arabicText: text,
            highlightStartIndex: hit.start,
            highlightEndIndex: hit.end,
          });
          console.log(`✓ #${word.orderIndex} (${word.arabic}): ${surah}:${ayah} — "${hit.matched}"`);
          found = true;
          break;
        }
      } catch (e) { /* try next */ }
      await new Promise(r => setTimeout(r, 80));
    }
    if (!found) {
      failed.push(word);
      console.log(`✗ #${word.orderIndex} (${word.arabic}): no match in any candidate`);
    }
  }

  console.log(`\n${results.length} found, ${failed.length} failed\n`);

  // Write TS
  let ts = `// Auto-generated ayah highlights for SPOT_IN_QURAN activities\n`;
  ts += `// Source: api.alquran.cloud (Uthmani script)\n`;
  ts += `// Generated: ${new Date().toISOString().split('T')[0]}\n`;
  ts += `// Only includes words where the EXACT taught form appears.\n\n`;
  ts += `export interface AyahHighlightSeed {\n`;
  ts += `  wordOrderIndex: number;\n`;
  ts += `  surahName: string;\n`;
  ts += `  surahNum: number;\n`;
  ts += `  ayahNum: number;\n`;
  ts += `  arabicText: string;\n`;
  ts += `  highlightStartIndex: number;\n`;
  ts += `  highlightEndIndex: number;\n`;
  ts += `}\n\n`;
  ts += `export const AYAH_HIGHLIGHTS: AyahHighlightSeed[] = [\n`;

  for (const r of results) {
    ts += `  {\n`;
    ts += `    wordOrderIndex: ${r.wordOrderIndex},\n`;
    ts += `    surahName: '${r.surahName.replace(/'/g, "\\'")}',\n`;
    ts += `    surahNum: ${r.surahNum},\n`;
    ts += `    ayahNum: ${r.ayahNum},\n`;
    ts += `    arabicText: '${r.arabicText.replace(/'/g, "\\'")}',\n`;
    ts += `    highlightStartIndex: ${r.highlightStartIndex},\n`;
    ts += `    highlightEndIndex: ${r.highlightEndIndex},\n`;
    ts += `  },\n`;
  }

  ts += `];\n`;
  ts += `\n// Skipped (9 words — exact form doesn't appear standalone):\n`;
  ts += `// 17 (Amila), 29 (Abada), 63 (Kharaja), 87 (Anfaqa), 138 (Andhara),\n`;
  ts += `// 213 (Zanna), 243 (Ashraka), 259 (Nasiya), 168 (Akh)\n`;

  if (failed.length > 0) {
    ts += `\n// Failed to match (need manual review):\n`;
    for (const f of failed) {
      ts += `// orderIndex ${f.orderIndex} (${f.arabic})\n`;
    }
  }

  const fs = await import('fs');
  fs.writeFileSync(new URL('./ayah-highlights.ts', import.meta.url).pathname, ts);
  console.log('Written to ayah-highlights.ts');
}

main().catch(console.error);
