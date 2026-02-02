import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await request.json();
  const step = await prisma.salahStep.update({
    where: { id },
    data: {
      orderIndex: body.orderIndex,
      name: body.name,
      arabicText: body.arabicText,
      transliteration: body.transliteration,
      translation: body.translation,
      note: body.note || null,
    },
  });
  return NextResponse.json(step);
}
