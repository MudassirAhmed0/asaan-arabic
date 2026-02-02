import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await request.json();
  const surah = await prisma.surah.update({
    where: { id },
    data: {
      nameArabic: body.nameArabic,
      nameEnglish: body.nameEnglish,
      nameTransliteration: body.nameTransliteration,
      totalAyahs: body.totalAyahs,
      revelationType: body.revelationType,
    },
  });
  return NextResponse.json(surah);
}
