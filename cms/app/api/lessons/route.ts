import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const lessons = await prisma.lesson.findMany({
    orderBy: { orderIndex: 'asc' },
    include: { _count: { select: { words: true, activities: true } } },
  });
  return NextResponse.json(lessons);
}

export async function POST(request: Request) {
  const body = await request.json();
  const lesson = await prisma.lesson.create({
    data: {
      title: body.title,
      subtitle: body.subtitle,
      orderIndex: body.orderIndex,
      wordCount: body.wordCount,
      isPublished: body.isPublished ?? false,
    },
  });
  return NextResponse.json(lesson);
}
