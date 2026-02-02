import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await request.json();
  const stat = await prisma.celebrationStat.upsert({
    where: { lessonId: id },
    update: {
      ayahCoverage: body.ayahCoverage,
      cumulativeWords: body.cumulativeWords,
    },
    create: {
      lessonId: id,
      ayahCoverage: body.ayahCoverage,
      cumulativeWords: body.cumulativeWords,
    },
  });
  return NextResponse.json(stat);
}
