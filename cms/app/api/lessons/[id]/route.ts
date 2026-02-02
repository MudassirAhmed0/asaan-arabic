import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const lesson = await prisma.lesson.findUnique({
    where: { id },
    include: {
      words: { orderBy: { orderIndex: 'asc' }, include: { introduction: true } },
      activities: { orderBy: { orderIndex: 'asc' } },
      midLessonMessage: true,
      celebrationStat: true,
    },
  });
  if (!lesson) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(lesson);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await request.json();
  const lesson = await prisma.lesson.update({
    where: { id },
    data: {
      title: body.title,
      subtitle: body.subtitle,
      orderIndex: body.orderIndex,
      wordCount: body.wordCount,
      isPublished: body.isPublished,
    },
  });
  return NextResponse.json(lesson);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  await prisma.lesson.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
