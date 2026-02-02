import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const word = await prisma.word.findUnique({
    where: { id },
    include: {
      introduction: true,
      ayahHighlights: true,
      lesson: { select: { id: true, orderIndex: true, title: true } },
    },
  });
  if (!word) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(word);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await request.json();

  const result = await prisma.$transaction(async (tx) => {
    const word = await tx.word.update({
      where: { id },
      data: {
        arabic: body.arabic,
        transliteration: body.transliteration,
        meaning: body.meaning,
        frequency: body.frequency,
        audioUrl: body.audioUrl,
        orderIndex: body.orderIndex,
      },
    });

    if (body.introduction) {
      await tx.wordIntroduction.upsert({
        where: { wordId: id },
        update: {
          style: body.introduction.style,
          headline: body.introduction.headline,
          body: body.introduction.body,
          ayahText: body.introduction.ayahText || null,
          ayahRef: body.introduction.ayahRef || null,
          factStat: body.introduction.factStat || null,
          quickCheckQuestion: body.introduction.quickCheckQuestion || null,
          quickCheckOptions: body.introduction.quickCheckOptions || [],
          quickCheckAnswer: body.introduction.quickCheckAnswer ?? null,
        },
        create: {
          wordId: id,
          style: body.introduction.style,
          headline: body.introduction.headline,
          body: body.introduction.body,
          ayahText: body.introduction.ayahText || null,
          ayahRef: body.introduction.ayahRef || null,
          factStat: body.introduction.factStat || null,
          quickCheckQuestion: body.introduction.quickCheckQuestion || null,
          quickCheckOptions: body.introduction.quickCheckOptions || [],
          quickCheckAnswer: body.introduction.quickCheckAnswer ?? null,
        },
      });
    }

    if (body.ayahHighlights) {
      await tx.ayahHighlight.deleteMany({ where: { wordId: id } });
      if (body.ayahHighlights.length > 0) {
        await tx.ayahHighlight.createMany({
          data: body.ayahHighlights.map((h: {
            surahName: string;
            surahNum: number;
            ayahNum: number;
            arabicText: string;
            translation: string;
            highlightStartIndex: number;
            highlightEndIndex: number;
          }) => ({
            wordId: id,
            surahName: h.surahName,
            surahNum: h.surahNum,
            ayahNum: h.ayahNum,
            arabicText: h.arabicText,
            translation: h.translation,
            highlightStartIndex: h.highlightStartIndex,
            highlightEndIndex: h.highlightEndIndex,
          })),
        });
      }
    }

    return word;
  });

  return NextResponse.json(result);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  await prisma.word.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
