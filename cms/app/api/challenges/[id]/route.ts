import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const challenge = await prisma.dailyChallenge.findUnique({ where: { id } });
  if (!challenge) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(challenge);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await request.json();
  const challenge = await prisma.dailyChallenge.update({
    where: { id },
    data: {
      date: new Date(body.date),
      type: body.type,
      payload: body.payload,
    },
  });
  return NextResponse.json(challenge);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  await prisma.dailyChallenge.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
