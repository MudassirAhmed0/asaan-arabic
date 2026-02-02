import AdminShell from '@/components/AdminShell';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import LessonEditor from './LessonEditor';

export const dynamic = 'force-dynamic';

export default async function LessonEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const lesson = await prisma.lesson.findUnique({
    where: { id },
    include: {
      words: {
        orderBy: { orderIndex: 'asc' },
        include: { introduction: true },
      },
      activities: { orderBy: { orderIndex: 'asc' } },
      midLessonMessage: true,
      celebrationStat: true,
    },
  });

  if (!lesson) notFound();

  return (
    <AdminShell>
      <LessonEditor lesson={JSON.parse(JSON.stringify(lesson))} />
    </AdminShell>
  );
}
