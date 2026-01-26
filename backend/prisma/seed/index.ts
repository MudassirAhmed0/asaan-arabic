import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { LESSONS } from './lessons';
import { WORDS } from './words';
import { ACTIVITIES } from './activities';
import { MID_MESSAGES } from './mid-messages';
import { CELEBRATIONS } from './celebrations';
import { CHALLENGES } from './challenges';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Starting seed...\n');

  // ── 1. Seed Lessons ──
  console.log('📚 Seeding lessons...');
  const lessonMap = new Map<number, string>(); // orderIndex → id

  for (const lesson of LESSONS) {
    const created = await prisma.lesson.upsert({
      where: { orderIndex: lesson.orderIndex },
      update: {
        title: lesson.title,
        subtitle: lesson.subtitle,
        wordCount: lesson.wordCount,
        isPublished: lesson.isPublished,
      },
      create: lesson,
    });
    lessonMap.set(lesson.orderIndex, created.id);
  }
  console.log(`  ✓ ${LESSONS.length} lessons seeded\n`);

  // ── 2. Seed Words + Introductions ──
  console.log('📝 Seeding words and introductions...');
  const wordMap = new Map<number, string>(); // orderIndex → id

  for (const wordData of WORDS) {
    const lessonId = lessonMap.get(wordData.lessonOrderIndex);
    if (!lessonId) {
      throw new Error(`Lesson ${wordData.lessonOrderIndex} not found for word ${wordData.orderIndex}`);
    }

    const word = await prisma.word.upsert({
      where: { orderIndex: wordData.orderIndex },
      update: {
        arabic: wordData.arabic,
        transliteration: wordData.transliteration,
        meaning: wordData.meaning,
        frequency: wordData.frequency,
        isUrduCognate: wordData.isUrduCognate,
        urduCognateNote: wordData.urduCognateNote,
        audioUrl: wordData.audioUrl,
        lessonId,
      },
      create: {
        orderIndex: wordData.orderIndex,
        arabic: wordData.arabic,
        transliteration: wordData.transliteration,
        meaning: wordData.meaning,
        frequency: wordData.frequency,
        isUrduCognate: wordData.isUrduCognate,
        urduCognateNote: wordData.urduCognateNote,
        audioUrl: wordData.audioUrl,
        lessonId,
      },
    });
    wordMap.set(wordData.orderIndex, word.id);

    // Upsert introduction
    const intro = wordData.introduction;
    await prisma.wordIntroduction.upsert({
      where: { wordId: word.id },
      update: {
        style: intro.style,
        headline: intro.headline,
        body: intro.body,
        ayahText: intro.ayahText ?? null,
        ayahRef: intro.ayahRef ?? null,
        factStat: intro.factStat ?? null,
        quickCheckQuestion: intro.quickCheckQuestion ?? null,
        quickCheckOptions: intro.quickCheckOptions ?? [],
        quickCheckAnswer: intro.quickCheckAnswer ?? null,
      },
      create: {
        wordId: word.id,
        style: intro.style,
        headline: intro.headline,
        body: intro.body,
        ayahText: intro.ayahText ?? null,
        ayahRef: intro.ayahRef ?? null,
        factStat: intro.factStat ?? null,
        quickCheckQuestion: intro.quickCheckQuestion ?? null,
        quickCheckOptions: intro.quickCheckOptions ?? [],
        quickCheckAnswer: intro.quickCheckAnswer ?? null,
      },
    });
  }
  console.log(`  ✓ ${WORDS.length} words + introductions seeded\n`);

  // ── 3. Seed Activities ──
  console.log('🎯 Seeding lesson activities...');
  for (const activity of ACTIVITIES) {
    const lessonId = lessonMap.get(activity.lessonOrderIndex);
    if (!lessonId) {
      throw new Error(`Lesson ${activity.lessonOrderIndex} not found for activity`);
    }

    await prisma.lessonActivity.upsert({
      where: {
        lessonId_orderIndex: {
          lessonId,
          orderIndex: activity.orderIndex,
        },
      },
      update: {
        type: activity.type,
        payload: activity.payload,
      },
      create: {
        lessonId,
        orderIndex: activity.orderIndex,
        type: activity.type,
        payload: activity.payload,
      },
    });
  }
  console.log(`  ✓ ${ACTIVITIES.length} activities seeded\n`);

  // ── 4. Seed Mid-Lesson Messages ──
  console.log('💬 Seeding mid-lesson messages...');
  for (const msg of MID_MESSAGES) {
    const lessonId = lessonMap.get(msg.lessonOrderIndex);
    if (!lessonId) {
      throw new Error(`Lesson ${msg.lessonOrderIndex} not found for mid-message`);
    }

    await prisma.midLessonMessage.upsert({
      where: { lessonId },
      update: {
        headline: msg.headline,
        body: msg.body,
      },
      create: {
        lessonId,
        headline: msg.headline,
        body: msg.body,
      },
    });
  }
  console.log(`  ✓ ${MID_MESSAGES.length} mid-lesson messages seeded\n`);

  // ── 5. Seed Celebration Stats ──
  console.log('🎉 Seeding celebration stats...');
  for (const cel of CELEBRATIONS) {
    const lessonId = lessonMap.get(cel.lessonOrderIndex);
    if (!lessonId) {
      throw new Error(`Lesson ${cel.lessonOrderIndex} not found for celebration`);
    }

    await prisma.celebrationStat.upsert({
      where: { lessonId },
      update: {
        ayahCoverage: cel.ayahCoverage,
        cumulativeWords: cel.cumulativeWords,
      },
      create: {
        lessonId,
        ayahCoverage: cel.ayahCoverage,
        cumulativeWords: cel.cumulativeWords,
      },
    });
  }
  console.log(`  ✓ ${CELEBRATIONS.length} celebration stats seeded\n`);

  // ── 6. Seed Daily Challenges ──
  console.log('⚡ Seeding daily challenges...');
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (const challenge of CHALLENGES) {
    const challengeDate = new Date(today);
    challengeDate.setDate(challengeDate.getDate() + challenge.dayOffset);

    await prisma.dailyChallenge.upsert({
      where: { date: challengeDate },
      update: {
        type: challenge.type,
        payload: challenge.payload,
      },
      create: {
        date: challengeDate,
        type: challenge.type,
        payload: challenge.payload,
      },
    });
  }
  console.log(`  ✓ ${CHALLENGES.length} daily challenges seeded\n`);

  console.log('✅ Seed complete!');
  console.log(`  ${LESSONS.length} lessons`);
  console.log(`  ${WORDS.length} words with introductions`);
  console.log(`  ${ACTIVITIES.length} activities`);
  console.log(`  ${MID_MESSAGES.length} mid-lesson messages`);
  console.log(`  ${CELEBRATIONS.length} celebration stats`);
  console.log(`  ${CHALLENGES.length} daily challenges`);
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
