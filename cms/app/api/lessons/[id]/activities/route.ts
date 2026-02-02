import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const activities = await prisma.lessonActivity.findMany({
    where: { lessonId: id },
    orderBy: { orderIndex: 'asc' },
  });
  return NextResponse.json(activities);
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await request.json();
  const activity = await prisma.lessonActivity.create({
    data: {
      lessonId: id,
      orderIndex: body.orderIndex,
      type: body.type,
      payload: body.payload,
    },
  });
  return NextResponse.json(activity);
}
