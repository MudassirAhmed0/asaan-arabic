import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await request.json();
  const dua = await prisma.dua.update({
    where: { id },
    data: {
      orderIndex: body.orderIndex,
      title: body.title,
      occasion: body.occasion,
      arabicText: body.arabicText,
      transliteration: body.transliteration,
      translation: body.translation,
      source: body.source || null,
    },
  });
  return NextResponse.json(dua);
}
