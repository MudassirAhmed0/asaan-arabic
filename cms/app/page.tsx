import AdminShell from '@/components/AdminShell';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import PageHeader from '@/components/ui/PageHeader';
import Button from '@/components/ui/Button';
import { BookOpen, CheckCircle, Type, Swords, Plus, Settings, Sparkles, ArrowRight } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const [lessonCount, publishedCount, wordCount, challengeCount] =
    await Promise.all([
      prisma.lesson.count(),
      prisma.lesson.count({ where: { isPublished: true } }),
      prisma.word.count(),
      prisma.dailyChallenge.count(),
    ]);

  const stats = [
    { label: 'Total Lessons', value: lessonCount, icon: BookOpen, color: 'text-teal-600 bg-teal-50 ring-teal-600/10' },
    { label: 'Published', value: publishedCount, icon: CheckCircle, color: 'text-emerald-600 bg-emerald-50 ring-emerald-600/10' },
    { label: 'Total Words', value: wordCount, icon: Type, color: 'text-amber-600 bg-amber-50 ring-amber-600/10' },
    { label: 'Challenges', value: challengeCount, icon: Swords, color: 'text-purple-600 bg-purple-50 ring-purple-600/10' },
  ];

  return (
    <AdminShell>
      <PageHeader 
        title="Dashboard" 
        actions={
          <div className="flex items-center gap-2 text-sm text-gray-500 bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm">
            <Sparkles className="h-4 w-4 text-amber-500" />
            <span>Welcome back, Admin</span>
          </div>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2 tracking-tight">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-xl ring-1 ring-inset ${stat.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900 font-heading">Quick Actions</h2>
            <Button variant="ghost" size="sm" className="text-xs">View All</Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/lessons/new" className="group">
              <div className="p-4 rounded-xl border border-gray-200 bg-gray-50 hover:bg-white hover:border-teal-200 hover:shadow-md hover:shadow-teal-500/10 transition-all cursor-pointer h-full">
                <div className="p-2 bg-teal-100 w-fit rounded-lg mb-3 group-hover:scale-110 transition-transform duration-300">
                  <Plus className="h-5 w-5 text-teal-700" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">New Lesson</h3>
                <p className="text-xs text-gray-500">Create a new lesson with words and activities.</p>
              </div>
            </Link>
            <Link href="/challenges/new" className="group">
              <div className="p-4 rounded-xl border border-gray-200 bg-gray-50 hover:bg-white hover:border-purple-200 hover:shadow-md hover:shadow-purple-500/10 transition-all cursor-pointer h-full">
                <div className="p-2 bg-purple-100 w-fit rounded-lg mb-3 group-hover:scale-110 transition-transform duration-300">
                  <Swords className="h-5 w-5 text-purple-700" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">New Challenge</h3>
                <p className="text-xs text-gray-500">Create a daily challenge for users.</p>
              </div>
            </Link>
          </div>
        </Card>

        <Card className="p-6 flex flex-col justify-center items-center text-center bg-gradient-to-b from-white to-gray-50">
          <div className="p-4 bg-white rounded-full shadow-sm border border-gray-100 mb-4">
            <Settings className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">System Status</h3>
          <p className="text-sm text-gray-500 max-w-xs mx-auto mb-6">
            All systems are running smoothly. Database connection is active and content is serving correctly.
          </p>
          <Link href="/lessons">
            <Button variant="secondary" className="group">
              Manage Content
              <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors ml-1" />
            </Button>
          </Link>
        </Card>
      </div>
    </AdminShell>
  );
}
