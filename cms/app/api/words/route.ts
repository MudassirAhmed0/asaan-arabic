import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  const body = await request.json();
  const word = await prisma.word.create({
    data: {
      lessonId: body.lessonId,
      orderIndex: body.orderIndex,
      arabic: body.arabic || '',
      transliteration: body.transliteration || '',
      meaning: body.meaning || '',
      frequency: body.frequency || 0,
      audioUrl: body.audioUrl || '',
    },
  });
  return NextResponse.json(word);
}
