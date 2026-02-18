/**
 * Generate AyahHighlight seed data for ALL 300 words.
 * Uses api.alquran.cloud search endpoint to find matching ayahs automatically.
 * Falls back to scanning short surahs if search fails.
 *
 * Usage: node prisma/seed/generate-all-highlights.mjs
 */

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ── Diacritic stripping ──
function strip(text) {
  return text
    .replace(/\u0670/g, 'ا')
    .replace(/[\u064B-\u0652\u0640]/g, '')
    .replace(/[\u06D6-\u06DC\u06DF-\u06E4\u06E7-\u06E8\u06EA-\u06ED]/g, '')
    .replace(/[ۥۦۭۧۨ]/g, '')
    .replace(/ٱ/g, 'ا')
    .replace(/ٰ/g, 'ا')
    .replace(/[أإآ]/g, 'ا');
}

const PREFIXES = ['', 'ال', 'و', 'ف', 'ب', 'ل', 'لل', 'وال', 'فال', 'بال', 'كال', 'ول', 'فل', 'وب', 'فب'];

function matchWord(ayahWord, target) {
  const strippedAyah = strip(ayahWord);
  const strippedTarget = strip(target);

  const candidates = [strippedAyah];
  if (strippedAyah.endsWith('ا')) {
    candidates.push(strippedAyah.slice(0, -1));
  }
  // Also try removing trailing ة → ت variation
  if (strippedAyah.endsWith('ة')) {
    candidates.push(strippedAyah.slice(0, -1) + 'ت');
  }

  for (const candidate of candidates) {
    if (candidate === strippedTarget) return true;
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

// Words to skip (exact taught form doesn't appear standalone in Quran)
const SKIP_INDICES = new Set([17, 29, 63, 87, 138, 168, 213, 243, 259]);

// Common function words that are too short/ambiguous — skip these too
const SKIP_PARTICLES = new Set([
  101, // من — appears everywhere, too generic
  102, // في — appears everywhere
  103, // على — appears everywhere
  104, // إلى — appears everywhere
  105, // عن — appears everywhere
  106, // إنّ — appears everywhere
  107, // لا — appears everywhere
  109, // إلا — too common
  110, // قد — too common
  111, // الذي — too common
  112, // هذا — too common
  113, // ذلك — too common
  114, // من (interrogative) — same as 101
  115, // ما — too common
  116, // لم — too common
  118, // بل — too short
  119, // هل — too short
  120, // لو — too short
  140, // سوف — particle
  176, // ثم — too short
  177, // أو — too short
  179, // لعل — too common
  180, // لكن — too common
  181, // قبل — too common
  183, // عند — too common
  184, // بين — too common
  185, // مع — too short
  186, // بعض — too common
  187, // أولئك — demonstrative
  188, // إذا — too common
  189, // أيها — vocative particle
  276, // فوق — too common
  277, // تحت — too common
  278, // دون — too common
  286, // إن — too common (same as إنّ)
  287, // أن — too common
  289, // أم — too short
  290, // لما — too common
]);

// All 300 words with their Arabic (stripped of tashkeel for matching)
const ALL_WORDS = [
  { orderIndex: 1, arabic: 'رب' },
  { orderIndex: 2, arabic: 'رحمة' },
  { orderIndex: 3, arabic: 'علم' },
  { orderIndex: 4, arabic: 'صبر' },
  { orderIndex: 5, arabic: 'هدى' },
  { orderIndex: 6, arabic: 'الله' },
  { orderIndex: 7, arabic: 'كتاب' },
  { orderIndex: 8, arabic: 'اية' },
  { orderIndex: 9, arabic: 'رسول' },
  { orderIndex: 10, arabic: 'حق' },
  { orderIndex: 11, arabic: 'ارض' },
  { orderIndex: 12, arabic: 'سماء' },
  { orderIndex: 13, arabic: 'نفس' },
  { orderIndex: 14, arabic: 'نور' },
  { orderIndex: 15, arabic: 'حياة' },
  { orderIndex: 16, arabic: 'علم' },  // verb form — علم same root as 3
  { orderIndex: 18, arabic: 'خلق' },
  { orderIndex: 19, arabic: 'هدى' },
  { orderIndex: 20, arabic: 'سمع' },
  { orderIndex: 21, arabic: 'جنة' },
  { orderIndex: 22, arabic: 'نار' },
  { orderIndex: 23, arabic: 'اجر' },
  { orderIndex: 24, arabic: 'عذاب' },
  { orderIndex: 25, arabic: 'مغفرة' },
  { orderIndex: 26, arabic: 'امن' },
  { orderIndex: 27, arabic: 'ايمان' },
  { orderIndex: 28, arabic: 'مؤمن' },
  { orderIndex: 30, arabic: 'عبد' },   // skip 29
  { orderIndex: 31, arabic: 'قوم' },
  { orderIndex: 32, arabic: 'ناس' },
  { orderIndex: 33, arabic: 'عبد' },
  { orderIndex: 34, arabic: 'ظالم' },
  { orderIndex: 35, arabic: 'نبي' },
  { orderIndex: 36, arabic: 'صلاة' },
  { orderIndex: 37, arabic: 'شكر' },
  { orderIndex: 38, arabic: 'رزق' },
  { orderIndex: 39, arabic: 'نعمة' },
  { orderIndex: 40, arabic: 'حكمة' },
  { orderIndex: 41, arabic: 'قال' },
  { orderIndex: 42, arabic: 'دعا' },
  { orderIndex: 43, arabic: 'غفر' },
  { orderIndex: 44, arabic: 'ذكر' },
  { orderIndex: 45, arabic: 'ظلم' },
  { orderIndex: 46, arabic: 'سبيل' },
  { orderIndex: 47, arabic: 'صراط' },
  { orderIndex: 48, arabic: 'يوم' },
  { orderIndex: 49, arabic: 'امر' },
  { orderIndex: 50, arabic: 'موت' },
  { orderIndex: 51, arabic: 'دنيا' },
  { orderIndex: 52, arabic: 'اخرة' },
  { orderIndex: 53, arabic: 'قيامة' },
  { orderIndex: 54, arabic: 'حساب' },
  { orderIndex: 55, arabic: 'جزاء' },
  { orderIndex: 56, arabic: 'قلب' },
  { orderIndex: 57, arabic: 'روح' },
  { orderIndex: 58, arabic: 'بصر' },
  { orderIndex: 59, arabic: 'عقل' },
  { orderIndex: 60, arabic: 'صدر' },
  { orderIndex: 61, arabic: 'جاء' },
  { orderIndex: 62, arabic: 'دخل' },
  { orderIndex: 64, arabic: 'رجع' },  // skip 63
  { orderIndex: 65, arabic: 'اتبع' },
  { orderIndex: 66, arabic: 'خير' },
  { orderIndex: 67, arabic: 'شر' },
  { orderIndex: 68, arabic: 'صالح' },
  { orderIndex: 69, arabic: 'عظيم' },
  { orderIndex: 70, arabic: 'كبير' },
  { orderIndex: 71, arabic: 'ليل' },
  { orderIndex: 72, arabic: 'نهار' },
  { orderIndex: 73, arabic: 'شمس' },
  { orderIndex: 74, arabic: 'قمر' },
  { orderIndex: 75, arabic: 'ماء' },
  { orderIndex: 76, arabic: 'راى' },
  { orderIndex: 77, arabic: 'انزل' },
  { orderIndex: 78, arabic: 'ارسل' },
  { orderIndex: 79, arabic: 'اخذ' },
  { orderIndex: 80, arabic: 'جعل' },
  { orderIndex: 81, arabic: 'دين' },
  { orderIndex: 82, arabic: 'كافر' },
  { orderIndex: 83, arabic: 'مسلم' },
  { orderIndex: 84, arabic: 'منافق' },
  { orderIndex: 85, arabic: 'اتقى' },
  { orderIndex: 86, arabic: 'اتى' },
  { orderIndex: 88, arabic: 'فضل' },  // skip 87
  { orderIndex: 89, arabic: 'رزق' },
  { orderIndex: 90, arabic: 'زكاة' },
  { orderIndex: 91, arabic: 'ملك' },
  { orderIndex: 92, arabic: 'ملك' },
  { orderIndex: 93, arabic: 'قوة' },
  { orderIndex: 94, arabic: 'سلطان' },
  { orderIndex: 95, arabic: 'عرش' },
  { orderIndex: 96, arabic: 'شاء' },
  { orderIndex: 97, arabic: 'اراد' },
  { orderIndex: 98, arabic: 'احب' },
  { orderIndex: 99, arabic: 'خاف' },
  { orderIndex: 100, arabic: 'رضي' },
  { orderIndex: 108, arabic: 'كل' },
  { orderIndex: 117, arabic: 'لن' },
  { orderIndex: 121, arabic: 'شيء' },
  { orderIndex: 122, arabic: 'مكان' },
  { orderIndex: 123, arabic: 'بيت' },
  { orderIndex: 124, arabic: 'مسجد' },
  { orderIndex: 125, arabic: 'دار' },
  { orderIndex: 126, arabic: 'كلمة' },
  { orderIndex: 127, arabic: 'قول' },
  { orderIndex: 128, arabic: 'حديث' },
  { orderIndex: 129, arabic: 'ذكر' },
  { orderIndex: 130, arabic: 'اسم' },
  { orderIndex: 131, arabic: 'اطاع' },
  { orderIndex: 132, arabic: 'عصى' },
  { orderIndex: 133, arabic: 'كذب' },
  { orderIndex: 134, arabic: 'تاب' },
  { orderIndex: 135, arabic: 'نجى' },
  { orderIndex: 136, arabic: 'وعد' },
  { orderIndex: 137, arabic: 'وعد' },
  { orderIndex: 139, arabic: 'بشر' },  // skip 138
  { orderIndex: 141, arabic: 'عليم' },
  { orderIndex: 142, arabic: 'رحيم' },
  { orderIndex: 143, arabic: 'غفور' },
  { orderIndex: 144, arabic: 'سميع' },
  { orderIndex: 145, arabic: 'حكيم' },
  { orderIndex: 146, arabic: 'عهد' },
  { orderIndex: 147, arabic: 'شهيد' },
  { orderIndex: 148, arabic: 'حكم' },
  { orderIndex: 149, arabic: 'مثل' },
  { orderIndex: 150, arabic: 'اهل' },
  { orderIndex: 151, arabic: 'كان' },
  { orderIndex: 152, arabic: 'ليس' },
  { orderIndex: 153, arabic: 'فعل' },
  { orderIndex: 154, arabic: 'وجد' },
  { orderIndex: 155, arabic: 'سال' },
  { orderIndex: 156, arabic: 'انسان' },
  { orderIndex: 157, arabic: 'وجه' },
  { orderIndex: 158, arabic: 'يد' },
  { orderIndex: 159, arabic: 'عين' },
  { orderIndex: 160, arabic: 'خلق' },
  { orderIndex: 161, arabic: 'ملك' },
  { orderIndex: 162, arabic: 'شيطان' },
  { orderIndex: 163, arabic: 'جهنم' },
  { orderIndex: 164, arabic: 'خالد' },
  { orderIndex: 165, arabic: 'اصحاب' },
  { orderIndex: 166, arabic: 'ولد' },
  { orderIndex: 167, arabic: 'ابن' },
  { orderIndex: 169, arabic: 'نساء' },  // skip 168
  { orderIndex: 170, arabic: 'زوج' },
  { orderIndex: 171, arabic: 'مال' },
  { orderIndex: 172, arabic: 'عمل' },
  { orderIndex: 173, arabic: 'كسب' },
  { orderIndex: 174, arabic: 'متاع' },
  { orderIndex: 175, arabic: 'كثير' },
  { orderIndex: 178, arabic: 'حتى' },
  { orderIndex: 182, arabic: 'بعد' },
  { orderIndex: 190, arabic: 'احد' },
  { orderIndex: 191, arabic: 'اله' },
  { orderIndex: 192, arabic: 'غير' },
  { orderIndex: 193, arabic: 'اخر' },
  { orderIndex: 194, arabic: 'قليل' },
  { orderIndex: 195, arabic: 'جميع' },
  { orderIndex: 196, arabic: 'نصر' },
  { orderIndex: 197, arabic: 'فتنة' },
  { orderIndex: 198, arabic: 'عدو' },
  { orderIndex: 199, arabic: 'نصر' },
  { orderIndex: 200, arabic: 'ولي' },
  { orderIndex: 201, arabic: 'اوحى' },
  { orderIndex: 202, arabic: 'اخرج' },
  { orderIndex: 203, arabic: 'اهلك' },
  { orderIndex: 204, arabic: 'احيا' },
  { orderIndex: 205, arabic: 'امر' },
  { orderIndex: 206, arabic: 'مات' },
  { orderIndex: 207, arabic: 'بعث' },
  { orderIndex: 208, arabic: 'حي' },
  { orderIndex: 209, arabic: 'اجل' },
  { orderIndex: 210, arabic: 'ساعة' },
  { orderIndex: 211, arabic: 'قضى' },
  { orderIndex: 212, arabic: 'حكم' },
  { orderIndex: 214, arabic: 'شهد' },  // skip 213
  { orderIndex: 215, arabic: 'عاقبة' },
  { orderIndex: 216, arabic: 'كتب' },
  { orderIndex: 217, arabic: 'علم' },
  { orderIndex: 218, arabic: 'تلا' },
  { orderIndex: 219, arabic: 'نظر' },
  { orderIndex: 220, arabic: 'ضرب' },
  { orderIndex: 221, arabic: 'قتل' },
  { orderIndex: 222, arabic: 'قاتل' },
  { orderIndex: 223, arabic: 'صبر' },
  { orderIndex: 224, arabic: 'شكر' },
  { orderIndex: 225, arabic: 'سجد' },
  { orderIndex: 226, arabic: 'سبحان' },
  { orderIndex: 227, arabic: 'حمد' },
  { orderIndex: 228, arabic: 'سلام' },
  { orderIndex: 229, arabic: 'تقوى' },
  { orderIndex: 230, arabic: 'توبة' },
  { orderIndex: 231, arabic: 'عزيز' },
  { orderIndex: 232, arabic: 'كريم' },
  { orderIndex: 233, arabic: 'قدير' },
  { orderIndex: 234, arabic: 'اليم' },
  { orderIndex: 235, arabic: 'شديد' },
  { orderIndex: 236, arabic: 'امة' },
  { orderIndex: 237, arabic: 'عالمين' },
  { orderIndex: 238, arabic: 'ذرية' },
  { orderIndex: 239, arabic: 'مبين' },
  { orderIndex: 240, arabic: 'قران' },
  { orderIndex: 241, arabic: 'ضل' },
  { orderIndex: 242, arabic: 'ضلال' },
  { orderIndex: 244, arabic: 'كفر' },  // skip 243
  { orderIndex: 245, arabic: 'اثم' },
  { orderIndex: 246, arabic: 'غيب' },
  { orderIndex: 247, arabic: 'ذنب' },
  { orderIndex: 248, arabic: 'سوء' },
  { orderIndex: 249, arabic: 'ظلم' },
  { orderIndex: 250, arabic: 'دعاء' },
  { orderIndex: 251, arabic: 'خشي' },
  { orderIndex: 252, arabic: 'ترك' },
  { orderIndex: 253, arabic: 'بلغ' },
  { orderIndex: 254, arabic: 'حرم' },
  { orderIndex: 255, arabic: 'تولى' },
  { orderIndex: 256, arabic: 'اقام' },
  { orderIndex: 257, arabic: 'رد' },
  { orderIndex: 258, arabic: 'زاد' },
  { orderIndex: 260, arabic: 'عقل' },  // skip 259
  { orderIndex: 261, arabic: 'بحر' },
  { orderIndex: 262, arabic: 'نهر' },
  { orderIndex: 263, arabic: 'ريح' },
  { orderIndex: 264, arabic: 'جبل' },
  { orderIndex: 265, arabic: 'شجرة' },
  { orderIndex: 266, arabic: 'مسكين' },
  { orderIndex: 267, arabic: 'فاسق' },
  { orderIndex: 268, arabic: 'غني' },
  { orderIndex: 269, arabic: 'رجل' },
  { orderIndex: 270, arabic: 'قرية' },
  { orderIndex: 271, arabic: 'عذب' },
  { orderIndex: 272, arabic: 'سبح' },
  { orderIndex: 273, arabic: 'اكل' },
  { orderIndex: 274, arabic: 'متقين' },
  { orderIndex: 275, arabic: 'صالحات' },
  { orderIndex: 279, arabic: 'اول' },
  { orderIndex: 280, arabic: 'مصير' },
  { orderIndex: 281, arabic: 'نذير' },
  { orderIndex: 282, arabic: 'خوف' },
  { orderIndex: 283, arabic: 'كذب' },
  { orderIndex: 284, arabic: 'باطل' },
  { orderIndex: 285, arabic: 'حسنة' },
  { orderIndex: 288, arabic: 'ان' },
  { orderIndex: 291, arabic: 'الرحمن' },
  { orderIndex: 292, arabic: 'حرام' },
  { orderIndex: 293, arabic: 'طعام' },
  { orderIndex: 294, arabic: 'نبا' },
  { orderIndex: 295, arabic: 'واحد' },
  { orderIndex: 296, arabic: 'بنون' },
  { orderIndex: 297, arabic: 'لسان' },
  { orderIndex: 298, arabic: 'بينة' },
  { orderIndex: 299, arabic: 'رجال' },
  { orderIndex: 300, arabic: 'عالم' },
];

// Curated candidates for words that need hand-picked ayahs
// (Nouns, verbs, adjectives — not particles)
const CURATED = {
  1: [[1,2], [2,131], [3,51], [6,45], [10,10]],           // رب
  3: [[2,32], [96,5], [4,166], [3,66], [12,68]],           // علم (noun)
  4: [[2,45], [2,153], [3,200], [11,11], [16,96]],         // صبر
  5: [[2,2], [2,120], [7,178], [17,94], [6,97]],           // هدى
  6: [[2,255], [3,18], [112,1], [59,23]],                  // الله
  7: [[2,2], [3,3], [5,48], [6,155], [11,1]],              // كتاب
  8: [[2,39], [2,252], [3,4], [6,4], [45,6]],              // آية
  9: [[3,144], [33,40], [7,158], [48,29], [2,252]],        // رسول
  10: [[2,26], [3,60], [10,35], [17,81], [22,62]],         // حق
  11: [[2,164], [3,83], [7,10], [15,19], [20,53]],         // أرض
  12: [[2,29], [2,164], [7,54], [41,12], [51,47]],         // سماء
  13: [[2,48], [2,233], [3,30], [6,93], [21,35]],          // نفس
  14: [[2,257], [5,15], [24,35], [57,12], [66,8]],         // نور
  15: [[2,85], [2,86], [3,14], [6,32], [10,24]],           // حياة
  16: [[2,77], [3,29], [96,5], [2,30]],                    // علم (verb)
  18: [[6,1], [7,54], [23,14], [36,81], [96,2]],           // خلق
  19: [[1,6], [2,143], [6,84], [7,43], [10,9]],            // هدى
  20: [[2,181], [4,58], [8,61], [21,4], [26,72]],          // سمع
  21: [[2,35], [2,82], [3,15], [9,72], [18,31]],           // جنة
  22: [[2,39], [2,201], [3,10], [3,131], [7,12]],          // نار
  23: [[2,62], [4,74], [11,11], [16,97], [29,58]],         // أجر
  24: [[2,7], [2,85], [2,174], [3,21], [4,56]],            // عذاب
  25: [[2,175], [3,136], [5,9], [11,11], [39,53]],         // مغفرة
  26: [[2,3], [2,62], [2,285], [3,179], [4,136]],          // آمن
  27: [[2,108], [3,167], [8,2], [49,14], [58,22]],         // إيمان
  28: [[2,8], [2,223], [3,28], [4,92], [9,71]],            // مؤمن
  31: [[2,54], [7,59], [7,65], [7,73], [11,27]],           // قوم
  32: [[2,8], [3,138], [4,1], [10,57], [114,1]],           // ناس
  34: [[2,35], [6,21], [11,18], [21,29], [39,32]],         // ظالم
  35: [[2,61], [3,39], [19,30], [33,40], [4,163]],         // نبي
  36: [[2,3], [2,43], [2,110], [2,238], [4,103]],          // صلاة
  37: [[14,7], [2,152], [27,19], [31,12], [34,13]],        // شكر
  38: [[2,3], [2,212], [3,27], [3,37], [13,26]],           // رزق
  39: [[2,231], [3,103], [5,20], [14,34], [16,18]],        // نعمة
  40: [[2,269], [3,48], [16,125], [31,12], [17,39]],       // حكمة
  41: [[2,30], [2,33], [3,26], [7,12], [12,4]],            // قال
  42: [[2,186], [3,38], [14,40], [40,60], [46,5]],         // دعا
  43: [[2,58], [3,31], [4,48], [39,53], [71,28]],          // غفر
  44: [[2,152], [3,41], [18,24], [33,41], [76,25]],        // ذكر
  45: [[2,57], [3,117], [7,23], [7,103], [11,101]],        // ظلم
  46: [[2,154], [3,99], [3,169], [4,76], [6,116]],         // سبيل
  47: [[1,6], [1,7], [2,142], [2,213], [3,51]],            // صراط
  49: [[2,210], [3,128], [3,154], [7,54], [18,44]],        // أمر
  50: [[2,19], [2,56], [2,180], [3,145], [3,185]],         // موت
  51: [[2,85], [2,200], [2,204], [3,14], [3,185]],         // دنيا
  52: [[2,4], [2,86], [2,130], [3,22], [4,77]],            // آخرة
  53: [[2,85], [2,113], [3,77], [4,87], [7,32]],           // قيامة
  54: [[2,202], [3,19], [3,199], [13,18], [14,41]],        // حساب
  55: [[2,85], [5,29], [6,138], [18,106], [78,36]],        // جزاء
  56: [[2,7], [2,74], [2,204], [3,8], [22,46]],            // قلب
  57: [[4,171], [15,29], [17,85], [26,193], [32,9]],       // روح
  59: [[2,75], [10,100], [59,14], [67,10]],                // عقل — verb form
  60: [[3,154], [6,125], [11,5], [15,97], [39,22]],        // صدر
  61: [[2,87], [4,170], [6,5], [7,63], [12,19]],           // جاء
  62: [[2,111], [3,97], [4,124], [5,5], [110,2]],          // دخل
  64: [[2,28], [2,285], [21,93], [30,25], [36,83]],        // رجع
  65: [[2,38], [2,145], [3,31], [6,153], [7,3]],           // اتّبع
  66: [[2,54], [2,180], [2,184], [2,197], [4,128]],        // خير
  67: [[2,216], [99,8], [113,2]],                          // شر
  68: [[2,62], [4,124], [7,56], [11,46], [18,110]],        // صالح
  69: [[2,7], [2,105], [3,4], [9,101], [56,76]],           // عظيم
  70: [[2,217], [2,219], [4,31], [17,31], [29,13]],        // كبير
  71: [[2,164], [3,27], [6,76], [10,6], [17,78]],          // ليل
  72: [[2,164], [3,27], [10,6], [13,3], [17,12]],          // نهار
  73: [[2,258], [6,78], [7,54], [10,5], [91,1]],           // شمس
  74: [[6,77], [7,54], [10,5], [36,39], [54,1]],           // قمر
  75: [[2,22], [2,60], [2,164], [7,50], [14,32]],          // ماء
  76: [[53,13], [53,18], [6,76], [6,77], [81,23]],         // رأى
  78: [[2,151], [3,164], [4,64], [7,158], [14,4]],         // أرسل
  79: [[2,63], [2,65], [2,83], [7,73], [12,70]],           // أخذ
  80: [[2,22], [2,30], [3,126], [6,1], [6,97]],            // جعل
  81: [[1,4], [2,193], [2,256], [3,19], [9,33]],           // دين
  82: [[2,19], [2,191], [3,10], [3,116], [8,36]],          // كافر
  83: [[2,128], [3,67], [6,163], [10,90], [22,78]],        // مسلم
  84: [[4,88], [4,138], [4,145], [9,67], [63,1]],          // منافق
  85: [[2,189], [2,194], [3,76], [3,102], [5,35]],         // اتّقى
  86: [[2,43], [2,83], [2,177], [4,2], [4,4]],             // آتى
  88: [[2,64], [2,198], [3,73], [3,174], [4,32]],          // فضل
  89: [[2,3], [2,22], [2,172], [3,27], [8,26]],            // رزق (verb)
  90: [[2,43], [2,110], [2,177], [2,277], [9,5]],          // زكاة
  91: [[1,4], [3,26], [22,56], [40,16], [67,1]],           // ملك (noun: king)
  92: [[2,107], [2,247], [3,26], [3,189], [5,17]],         // ملك (noun: dominion)
  93: [[2,165], [11,52], [18,39], [27,33], [40,26]],       // قوة
  95: [[2,255], [7,54], [9,129], [10,3], [20,5]],          // عرش
  96: [[2,20], [2,253], [3,26], [5,1], [6,128]],           // شاء
  97: [[2,26], [6,125], [9,15], [11,34], [36,82]],         // أراد
  98: [[2,165], [2,177], [2,222], [3,31], [3,76]],         // أحبّ
  99: [[2,38], [3,175], [4,77], [9,13], [20,77]],          // خاف
  100: [[2,120], [5,3], [5,119], [9,100], [98,8]],         // رضي
  121: [[2,20], [2,148], [2,259], [3,165], [18,45]],       // شيء
  122: [[2,125], [7,143], [14,14], [18,17], [37,84]],      // مكان
  124: [[2,114], [2,144], [2,149], [9,17], [9,107]],       // مسجد
  125: [[3,195], [6,127], [10,25], [14,28], [28,78]],      // دار
  126: [[2,37], [2,124], [3,64], [7,137], [18,109]],       // كلمة
  127: [[2,59], [2,235], [4,9], [6,115], [18,109]],        // قول
  128: [[4,42], [4,87], [7,185], [18,6], [20,9]],          // حديث
  129: [[2,200], [7,205], [15,9], [18,24], [38,1]],        // ذكر (noun)
  130: [[2,31], [5,4], [6,118], [22,28], [87,1]],          // اسم
  131: [[3,32], [4,59], [8,46], [24,54], [47,33]],         // أطاع
  132: [[2,36], [7,163], [20,93], [20,121], [79,21]],      // عصى
  133: [[3,137], [5,10], [6,21], [6,57], [7,64]],          // كذّب
  134: [[2,37], [4,17], [5,39], [9,104], [9,118]],         // تاب
  135: [[6,63], [10,103], [21,76], [26,65], [37,134]],     // نجّى
  136: [[2,268], [3,9], [4,95], [4,122], [9,111]],         // وعد
  137: [[2,80], [3,9], [4,95], [14,22], [17,108]],         // وعد (noun)
  139: [[2,25], [3,21], [4,138], [9,3], [61,13]],          // بشّر
  141: [[2,32], [2,181], [2,224], [2,227], [6,13]],        // عليم
  142: [[1,1], [2,143], [2,163], [2,218], [6,54]],         // رحيم
  143: [[2,173], [2,182], [2,218], [4,152], [15,49]],      // غفور
  144: [[2,127], [2,137], [2,181], [2,224], [2,256]],      // سميع
  145: [[2,32], [2,129], [2,209], [2,220], [6,18]],        // حكيم
  146: [[2,27], [2,40], [2,124], [2,177], [3,76]],         // عهد
  147: [[2,23], [4,79], [4,166], [17,96], [22,17]],        // شهيد
  149: [[2,17], [2,26], [2,171], [14,18], [16,74]],        // مثل
  150: [[2,105], [3,64], [3,75], [5,59], [33,33]],         // أهل
  151: [[2,10], [3,79], [4,24], [19,35], [33,9]],          // كان
  153: [[2,71], [3,135], [5,79], [7,155], [18,79]],        // فعل
  154: [[4,100], [18,69], [27,19], [28,15], [65,3]],       // وجد
  155: [[2,108], [2,211], [5,4], [17,34]],                 // سأل
  156: [[4,28], [10,12], [17,11], [21,37], [36,77]],       // إنسان
  157: [[2,112], [2,115], [2,144], [3,20], [6,52]],        // وجه
  158: [[2,195], [2,237], [3,26], [5,64], [36,83]],        // يد
  159: [[2,7], [5,45], [7,47], [15,88], [54,14]],          // عين
  160: [[6,1], [16,3], [21,16], [23,14], [54,49]],         // خلق (noun)
  161: [[2,30], [2,31], [2,34], [2,161], [3,18]],          // ملك (angel variant)
  162: [[2,36], [2,168], [2,208], [3,36], [4,38]],         // شيطان
  163: [[3,12], [4,55], [4,93], [4,121], [9,35]],          // جهنم
  164: [[2,39], [2,81], [2,217], [3,15], [3,88]],          // خالد
  165: [[2,39], [2,81], [2,119], [3,116], [7,42]],         // أصحاب
  166: [[2,116], [2,233], [4,11], [19,88], [21,26]],       // ولد
  167: [[2,87], [2,215], [4,36], [5,72], [19,34]],         // ابن
  169: [[2,187], [2,222], [2,226], [4,4], [4,24]],         // نساء
  170: [[2,25], [2,230], [2,232], [3,15], [4,1]],          // زوج
  171: [[2,155], [2,188], [3,10], [3,186], [4,5]],         // مال
  172: [[2,62], [2,82], [2,277], [4,124], [5,9]],          // عمل
  173: [[2,79], [2,81], [2,134], [2,281], [3,25]],         // كسب
  174: [[2,36], [2,241], [3,14], [3,185], [4,77]],         // متاع
  175: [[2,109], [2,219], [3,110], [4,12], [5,77]],        // كثير
  190: [[2,96], [2,163], [5,73], [112,1], [3,64]],         // أحد
  191: [[2,133], [2,163], [3,62], [4,171], [6,46]],        // إله
  192: [[1,7], [2,173], [3,7], [5,3], [10,15]],            // غير
  193: [[2,8], [3,77], [4,18], [17,10], [39,45]],          // آخر
  194: [[2,88], [2,174], [3,77], [4,46], [9,38]],          // قليل
  195: [[2,29], [2,148], [2,228], [3,103], [4,71]],        // جميع
  196: [[2,250], [3,13], [3,126], [8,10], [30,47]],        // نصر (verb)
  197: [[2,102], [2,191], [2,193], [2,217], [8,28]],       // فتنة
  199: [[2,250], [3,126], [3,160], [8,10], [22,40]],       // نصر (noun)
  200: [[2,107], [2,257], [3,68], [4,45], [5,55]],         // ولي
  201: [[4,163], [6,19], [12,109], [16,123], [21,25]],     // أوحى
  202: [[2,22], [2,257], [3,27], [7,57], [14,1]],          // أخرج
  203: [[6,6], [17,17], [19,98], [21,6], [28,58]],         // أهلك
  204: [[2,28], [2,56], [2,73], [2,260], [3,49]],          // أحيا
  205: [[3,104], [4,58], [7,12], [7,29], [16,90]],         // أمر (verb)
  206: [[2,161], [3,145], [3,185], [21,35], [39,30]],      // مات
  208: [[2,255], [3,2], [6,95], [20,111], [40,65]],        // حي
  209: [[3,145], [6,2], [6,60], [7,34], [10,49]],          // أجل
  210: [[6,31], [7,187], [12,107], [15,85], [18,21]],      // ساعة
  211: [[2,117], [2,200], [6,58], [10,93], [12,41]],       // قضى
  212: [[5,43], [5,44], [6,57], [21,78], [27,78]],         // حكم (verb)
  214: [[3,18], [3,81], [4,166], [5,117], [12,26]],        // شهد
  215: [[3,137], [6,11], [6,135], [7,84], [7,128]],        // عاقبة
  216: [[2,183], [2,216], [2,246], [3,154], [4,24]],        // كتب
  217: [[2,31], [2,151], [2,239], [3,48], [55,4]],         // علّم
  218: [[2,44], [2,129], [3,164], [10,61], [65,11]],       // تلا
  219: [[2,50], [6,46], [7,185], [50,6], [88,17]],         // نظر
  220: [[2,26], [2,61], [2,73], [14,24], [16,74]],         // ضرب
  221: [[2,61], [2,72], [2,87], [3,21], [5,27]],           // قتل
  222: [[2,190], [2,191], [2,244], [3,13], [4,76]],        // قاتل
  223: [[2,45], [2,153], [2,155], [3,200], [16,126]],      // صبر (verb)
  224: [[2,152], [14,7], [31,12], [34,13], [27,40]],       // شكر (verb)
  225: [[7,11], [13,15], [15,29], [16,49], [22,18]],       // سجد
  226: [[17,1], [17,93], [21,22], [23,91], [36,36]],       // سبحان
  227: [[1,2], [2,30], [14,1], [17,111], [35,34]],         // حمد
  228: [[6,54], [10,10], [11,69], [14,23], [36,58]],       // سلام
  230: [[2,37], [2,160], [4,17], [5,39], [9,104]],         // توبة
  231: [[2,129], [2,220], [2,240], [3,6], [3,18]],         // عزيز
  232: [[27,40], [44,49], [56,77], [69,40], [82,6]],       // كريم
  233: [[2,20], [2,109], [2,148], [2,259], [3,26]],        // قدير
  234: [[2,10], [2,104], [2,174], [3,21], [3,77]],         // أليم
  235: [[2,165], [2,196], [2,211], [3,11], [5,2]],         // شديد
  236: [[2,128], [2,143], [3,104], [3,110], [7,34]],       // أمّة
  237: [[1,2], [2,131], [3,97], [5,28], [6,71]],           // عالمين
  239: [[2,168], [3,164], [4,119], [5,15], [12,1]],        // مبين
  240: [[2,185], [10,61], [12,2], [15,1], [17,82]],        // قرآن
  241: [[2,108], [4,116], [4,136], [6,56], [7,149]],       // ضلّ
  242: [[2,16], [2,175], [3,164], [4,116], [7,30]],        // ضلال
  244: [[2,108], [2,217], [3,90], [4,137], [9,23]],        // كفر (noun)
  245: [[2,85], [2,188], [2,206], [4,20], [4,48]],         // إثم
  246: [[2,3], [2,33], [5,94], [6,59], [18,26]],           // غيب
  247: [[3,11], [3,16], [3,31], [4,64], [71,4]],           // ذنب
  248: [[2,49], [3,30], [4,17], [4,110], [6,157]],         // سوء
  249: [[2,35], [2,258], [3,57], [4,75], [21,47]],         // ظلم (noun)
  250: [[2,186], [3,38], [13,14], [14,40], [40,50]],       // دعاء
  251: [[2,150], [4,77], [5,3], [9,18], [21,28]],          // خشي
  253: [[2,196], [5,6], [6,19], [12,22], [18,82]],         // بلغ
  254: [[2,173], [3,50], [5,3], [6,119], [6,151]],         // حرّم
  255: [[2,205], [3,63], [4,115], [9,76], [47,25]],        // تولّى
  256: [[2,3], [2,43], [2,177], [2,277], [22,41]],         // أقام
  257: [[2,109], [5,108], [10,46], [13,33], [40,43]],      // ردّ
  258: [[2,10], [9,37], [17,60], [18,109], [71,21]],       // زاد
  260: [[2,75], [10,100], [29,43], [36,68], [67,10]],      // عقل (verb form appears in Quran)
  261: [[2,50], [5,96], [6,63], [7,136], [16,14]],         // بحر
  262: [[2,74], [47,12], [54,54], [55,46]],                // نهر
  263: [[2,164], [3,117], [7,57], [14,18], [30,46]],       // ريح
  264: [[7,143], [14,46], [18,47], [20,105], [27,61]],     // جبل
  265: [[2,35], [7,19], [7,22], [14,24], [20,120]],        // شجرة
  266: [[2,83], [4,36], [4,8], [9,60], [68,24]],           // مسكين
  268: [[2,263], [2,267], [3,97], [4,131], [14,8]],        // غني
  269: [[2,282], [7,48], [7,63], [18,37], [36,20]],        // رجل
  270: [[2,58], [6,123], [7,4], [7,94], [18,77]],          // قرية
  271: [[2,49], [3,21], [6,124], [14,6], [22,25]],         // عذّب
  272: [[17,44], [21,79], [24,41], [33,42], [57,1]],       // سبّح
  273: [[2,35], [2,60], [2,168], [6,141], [7,19]],         // أكل
  275: [[2,25], [2,82], [2,277], [4,57], [4,124]],         // صالحات
  279: [[9,13], [6,163], [9,100], [17,7], [57,3]],         // أول
  280: [[2,126], [3,28], [3,162], [5,18], [24,42]],        // مصير
  281: [[5,19], [7,63], [11,12], [11,25], [17,105]],       // نذير
  282: [[2,38], [2,62], [2,112], [2,262], [10,62]],        // خوف
  283: [[3,61], [3,94], [6,21], [7,37], [11,18]],          // كذب (noun)
  284: [[2,42], [2,188], [3,71], [8,8], [17,81]],          // باطل
  285: [[2,201], [3,120], [4,40], [4,78], [6,160]],        // حسنة
  291: [[1,1], [1,3], [2,163], [19,45], [55,1]],           // الرحمن
  292: [[2,217], [5,1], [5,2], [5,96], [5,97]],            // حرام
  293: [[2,184], [5,89], [5,95], [69,37], [76,8]],         // طعام
  294: [[6,34], [9,70], [26,6], [27,22], [38,67]],         // نبأ
  295: [[2,133], [2,163], [4,171], [5,73], [12,39]],       // واحد
  296: [[3,10], [3,116], [8,28], [26,88], [68,14]],        // بنون
  297: [[3,78], [14,4], [16,103], [19,50], [26,195]],      // لسان
  299: [[2,282], [3,14], [7,63], [24,31], [33,23]],        // رجال
  300: [[6,73], [9,94], [9,105], [34,3], [64,18]],         // عالم
};

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
  console.log('Generating ayah highlights for all words...\n');
  const results = [];
  const failed = [];
  const skipped = [];

  // Filter words that have curated candidates and aren't skipped
  const wordsToProcess = ALL_WORDS.filter(w => {
    if (SKIP_INDICES.has(w.orderIndex)) { skipped.push(w); return false; }
    if (SKIP_PARTICLES.has(w.orderIndex)) { skipped.push(w); return false; }
    if (!CURATED[w.orderIndex]) { skipped.push(w); return false; }
    return true;
  });

  console.log(`Processing ${wordsToProcess.length} words (${skipped.length} skipped)\n`);

  for (const word of wordsToProcess) {
    const candidates = CURATED[word.orderIndex];
    let found = false;

    for (const [surah, ayah] of candidates) {
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
      await new Promise(r => setTimeout(r, 60));
    }
    if (!found) {
      failed.push(word);
      console.log(`✗ #${word.orderIndex} (${word.arabic}): no match`);
    }
  }

  console.log(`\n${results.length} found, ${failed.length} failed, ${skipped.length} skipped\n`);

  // Sort by orderIndex
  results.sort((a, b) => a.wordOrderIndex - b.wordOrderIndex);

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

  // Document skipped words
  const skippedVerb = SKIP_INDICES;
  const skippedParticle = SKIP_PARTICLES;
  ts += `\n// Skipped — verb forms not standalone (${[...skippedVerb].length} words):\n`;
  ts += `// ${[...skippedVerb].join(', ')}\n`;
  ts += `\n// Skipped — common particles/prepositions (${[...skippedParticle].length} words):\n`;
  ts += `// ${[...skippedParticle].join(', ')}\n`;

  if (failed.length > 0) {
    ts += `\n// Failed to match (need manual review):\n`;
    for (const f of failed) {
      ts += `// orderIndex ${f.orderIndex} (${f.arabic})\n`;
    }
  }

  writeFileSync(join(__dirname, 'ayah-highlights.ts'), ts);
  console.log('Written to ayah-highlights.ts');
}

main().catch(console.error);
