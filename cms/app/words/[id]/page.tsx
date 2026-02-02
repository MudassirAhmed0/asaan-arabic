import AdminShell from '@/components/AdminShell';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import WordEditor from './WordEditor';

export const dynamic = 'force-dynamic';

export default async function WordEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const word = await prisma.word.findUnique({
    where: { id },
    include: {
      introduction: true,
      ayahHighlights: true,
      lesson: { select: { id: true, orderIndex: true, title: true } },
    },
  });

  if (!word) notFound();

  return (
    <AdminShell>
      <WordEditor word={JSON.parse(JSON.stringify(word))} />
    </AdminShell>
  );
}
