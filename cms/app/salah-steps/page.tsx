import AdminShell from '@/components/AdminShell';
import { prisma } from '@/lib/prisma';
import SalahStepsList from './SalahStepsList';

export const dynamic = 'force-dynamic';

export default async function SalahStepsPage() {
  const steps = await prisma.salahStep.findMany({
    orderBy: { orderIndex: 'asc' },
  });

  return (
    <AdminShell>
      <SalahStepsList steps={JSON.parse(JSON.stringify(steps))} />
    </AdminShell>
  );
}
