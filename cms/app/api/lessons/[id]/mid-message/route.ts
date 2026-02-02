import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await request.json();
  const msg = await prisma.midLessonMessage.upsert({
    where: { lessonId: id },
    update: { headline: body.headline, body: body.body },
    create: { lessonId: id, headline: body.headline, body: body.body },
  });
  return NextResponse.json(msg);
}
