import AdminShell from '@/components/AdminShell';
import { prisma } from '@/lib/prisma';
import DuasList from './DuasList';

export const dynamic = 'force-dynamic';

export default async function DuasPage() {
  const duas = await prisma.dua.findMany({
    orderBy: { orderIndex: 'asc' },
  });

  return (
    <AdminShell>
      <DuasList duas={JSON.parse(JSON.stringify(duas))} />
    </AdminShell>
  );
}
