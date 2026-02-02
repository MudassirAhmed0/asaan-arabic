import AdminShell from '@/components/AdminShell';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import PublishToggle from './PublishToggle';
import PageHeader from '@/components/ui/PageHeader';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import EmptyState from '@/components/ui/EmptyState';
import { Plus, BookOpen, Pencil, ArrowRight } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function LessonsPage() {
  const lessons = await prisma.lesson.findMany({
    orderBy: { orderIndex: 'asc' },
    include: { _count: { select: { words: true, activities: true } } },
  });

  return (
    <AdminShell>
      <PageHeader
        title="Lessons"
        breadcrumbs={[{ label: 'Dashboard', href: '/' }, { label: 'Lessons' }]}
        actions={
          <Link href="/lessons/new">
            <Button icon={<Plus className="h-4 w-4" />}>New Lesson</Button>
          </Link>
        }
      />

      <Card className="overflow-hidden">
        {lessons.length === 0 ? (
          <div className="p-8">
            <EmptyState
              icon={<BookOpen className="h-12 w-12" />}
              title="No lessons yet"
              description="Create your first lesson to get started."
              action={
                <Link href="/lessons/new">
                  <Button size="sm" icon={<Plus className="h-4 w-4" />}>New Lesson</Button>
                </Link>
              }
            />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="px-6 py-4 font-semibold text-gray-500 uppercase tracking-wider text-xs w-16">#</th>
                  <th className="px-6 py-4 font-semibold text-gray-500 uppercase tracking-wider text-xs">Lesson</th>
                  <th className="px-6 py-4 font-semibold text-gray-500 uppercase tracking-wider text-xs">Progress</th>
                  <th className="px-6 py-4 font-semibold text-gray-500 uppercase tracking-wider text-xs">Activities</th>
                  <th className="px-6 py-4 font-semibold text-gray-500 uppercase tracking-wider text-xs">Status</th>
                  <th className="px-6 py-4 w-20"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {lessons.map((lesson) => {
                  const wordProgress = lesson.wordCount > 0 ? lesson._count.words / lesson.wordCount : 0;
                  return (
                    <tr key={lesson.id} className="group hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 text-gray-400 font-mono text-xs">{lesson.orderIndex}</td>
                      <td className="px-6 py-4">
                        <Link href={`/lessons/${lesson.id}`} className="block group-hover:translate-x-1 transition-transform duration-200">
                          <p className="font-semibold text-gray-900 group-hover:text-teal-600 transition-colors">{lesson.title}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{lesson.subtitle}</p>
                        </Link>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden w-24">
                            <div
                              className={`h-full rounded-full transition-all duration-500 ${wordProgress >= 1 ? 'bg-emerald-500' : 'bg-amber-500'}`}
                              style={{ width: `${Math.min(wordProgress * 100, 100)}%` }}
                            />
                          </div>
                          <span className="text-xs font-medium text-gray-500 tabular-nums">{lesson._count.words}/{lesson.wordCount}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant={lesson._count.activities > 0 ? 'teal' : 'gray'}>
                          {lesson._count.activities} Items
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <PublishToggle lessonId={lesson.id} published={lesson.isPublished} />
                      </td>
                      <td className="px-6 py-4">
                        <Link
                          href={`/lessons/${lesson.id}`}
                          className="p-2 rounded-lg text-gray-400 hover:text-teal-600 hover:bg-teal-50 transition-all inline-flex opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 duration-200"
                        >
                          <ArrowRight className="h-4 w-4" />
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
