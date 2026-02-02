import AdminShell from '@/components/AdminShell';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import PageHeader from '@/components/ui/PageHeader';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import EmptyState from '@/components/ui/EmptyState';
import { Plus, Swords, Pencil } from 'lucide-react';

export const dynamic = 'force-dynamic';

const typeBadgeVariant: Record<string, 'teal' | 'purple' | 'amber' | 'blue'> = {
  QUICK_QUIZ: 'teal',
  MEMORY_TEST: 'purple',
  FUN_FACT: 'amber',
  WORD_OF_THE_DAY: 'blue',
};

export default async function ChallengesPage() {
  const challenges = await prisma.dailyChallenge.findMany({
    orderBy: { date: 'desc' },
  });

  return (
    <AdminShell>
      <PageHeader
        title="Daily Challenges"
        actions={
          <Link href="/challenges/new">
            <Button icon={<Plus className="h-4 w-4" />}>New Challenge</Button>
          </Link>
        }
      />

      <Card>
        {challenges.length === 0 ? (
          <EmptyState
            icon={<Swords className="h-12 w-12" />}
            title="No challenges yet"
            description="Create daily challenges to keep users engaged."
            action={
              <Link href="/challenges/new">
                <Button size="sm" icon={<Plus className="h-4 w-4" />}>New Challenge</Button>
              </Link>
            }
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-4 py-3 w-20"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {challenges.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-4 font-medium">
                      {new Date(c.date).toLocaleDateString('en-PK', {
                        weekday: 'short',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </td>
                    <td className="px-4 py-4">
                      <Badge variant={typeBadgeVariant[c.type] || 'gray'}>
                        {c.type.replace(/_/g, ' ')}
                      </Badge>
                    </td>
                    <td className="px-4 py-4">
                      <Link
                        href={`/challenges/${c.id}`}
                        className="inline-flex items-center gap-1 text-teal-600 hover:text-teal-500 text-xs font-medium transition-colors"
                      >
                        <Pencil className="h-3 w-3" />
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </AdminShell>
  );
}
