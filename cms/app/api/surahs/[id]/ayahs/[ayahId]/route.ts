import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string; ayahId: string }> },
) {
  const { ayahId } = await params;
  const body = await request.json();
  const ayah = await prisma.surahAyah.update({
    where: { id: ayahId },
    data: {
      arabicText: body.arabicText,
      translation: body.translation,
    },
  });
  return NextResponse.json(ayah);
}
