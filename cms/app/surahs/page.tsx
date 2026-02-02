import AdminShell from '@/components/AdminShell';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import PageHeader from '@/components/ui/PageHeader';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import EmptyState from '@/components/ui/EmptyState';
import { BookOpenText, Eye } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function SurahsPage() {
  const surahs = await prisma.surah.findMany({
    orderBy: { number: 'asc' },
    include: { _count: { select: { ayahs: true } } },
  });

  return (
    <AdminShell>
      <PageHeader title="Surahs" />

      <Card>
        {surahs.length === 0 ? (
          <EmptyState
            icon={<BookOpenText className="h-12 w-12" />}
            title="No surahs in database"
            description="Surahs are seeded from the backend. Run the seed script to populate."
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">#</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Arabic</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">English</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Transliteration</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">Ayahs</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24 hidden md:table-cell">Type</th>
                  <th className="px-4 py-3 w-16"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {surahs.map((s) => {
                  const progress = s._count.ayahs / s.totalAyahs;
                  return (
                    <tr key={s.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-4 py-4 text-gray-400 font-mono text-xs">{s.number}</td>
                      <td className="px-4 py-4 text-lg" dir="rtl">{s.nameArabic}</td>
                      <td className="px-4 py-4 font-medium">{s.nameEnglish}</td>
                      <td className="px-4 py-4 text-gray-500 hidden sm:table-cell">{s.nameTransliteration}</td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden max-w-12">
                            <div
                              className={`h-full rounded-full ${progress >= 1 ? 'bg-green-500' : 'bg-amber-500'}`}
                              style={{ width: `${Math.min(progress * 100, 100)}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-500">{s._count.ayahs}/{s.totalAyahs}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 hidden md:table-cell">
                        <Badge variant={s.revelationType === 'Meccan' ? 'amber' : 'blue'}>
                          {s.revelationType}
                        </Badge>
                      </td>
                      <td className="px-4 py-4">
                        <Link
                          href={`/surahs/${s.id}`}
                          className="inline-flex items-center gap-1 text-teal-600 hover:text-teal-500 text-xs font-medium transition-colors"
                        >
                          <Eye className="h-3 w-3" />
                          View
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </AdminShell>
  );
}
