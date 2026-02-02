import AdminShell from '@/components/AdminShell';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import SurahEditor from './SurahEditor';

export const dynamic = 'force-dynamic';

export default async function SurahDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const surah = await prisma.surah.findUnique({
    where: { id },
    include: {
      ayahs: { orderBy: { ayahNumber: 'asc' } },
    },
  });

  if (!surah) notFound();

  return (
    <AdminShell>
      <SurahEditor surah={JSON.parse(JSON.stringify(surah))} />
    </AdminShell>
  );
}
