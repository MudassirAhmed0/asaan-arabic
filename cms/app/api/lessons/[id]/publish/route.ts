import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await request.json();

  // Validate before publishing
  if (body.isPublished) {
    const lesson = await prisma.lesson.findUnique({
      where: { id },
      include: {
        _count: { select: { words: true, activities: true } },
        midLessonMessage: true,
        celebrationStat: true,
      },
    });

    if (!lesson) {
      return NextResponse.json({ error: 'Lesson not found' }, { status: 404 });
    }

    const issues: string[] = [];
    if (lesson._count.words < lesson.wordCount) {
      issues.push(`Needs ${lesson.wordCount} words, has ${lesson._count.words}`);
    }
    if (lesson._count.activities === 0) {
      issues.push('No activities created');
    }
    if (!lesson.midLessonMessage) {
      issues.push('Missing mid-lesson message');
    }
    if (!lesson.celebrationStat) {
      issues.push('Missing celebration stat');
    }

    if (issues.length > 0) {
      return NextResponse.json(
        { error: 'Cannot publish incomplete lesson', issues },
        { status: 400 },
      );
    }
  }

  const lesson = await prisma.lesson.update({
    where: { id },
    data: { isPublished: body.isPublished },
  });
  return NextResponse.json(lesson);
}
