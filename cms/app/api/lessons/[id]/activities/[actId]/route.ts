import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string; actId: string }> },
) {
  const { actId } = await params;
  const body = await request.json();
  const activity = await prisma.lessonActivity.update({
    where: { id: actId },
    data: {
      orderIndex: body.orderIndex,
      type: body.type,
      payload: body.payload,
    },
  });
  return NextResponse.json(activity);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string; actId: string }> },
) {
  const { actId } = await params;
  await prisma.lessonActivity.delete({ where: { id: actId } });
  return NextResponse.json({ ok: true });
}
