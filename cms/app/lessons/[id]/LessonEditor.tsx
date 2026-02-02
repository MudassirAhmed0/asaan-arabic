'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import PageHeader from '@/components/ui/PageHeader';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import EmptyState from '@/components/ui/EmptyState';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import Checkbox from '@/components/ui/Checkbox';
import { Save, Plus, Pencil, Trash2, Eye, FileText, BookOpen, Puzzle, Sparkles, ListOrdered, Type, AlignLeft, Hash } from 'lucide-react';

type Lesson = {
  id: string;
  orderIndex: number;
  title: string;
  subtitle: string;
  wordCount: number;
  isPublished: boolean;
  words: Array<{
    id: string;
    orderIndex: number;
    arabic: string;
    transliteration: string;
    meaning: string;
    frequency: number;
    audioUrl: string;
    introduction: { style: string; headline: string } | null;
  }>;
  activities: Array<{
    id: string;
    orderIndex: number;
    type: string;
    payload: unknown;
  }>;
  midLessonMessage: { id: string; headline: string; body: string } | null;
  celebrationStat: { id: string; ayahCoverage: string; cumulativeWords: number } | null;
};

const tabs = [
  { key: 'Details', icon: FileText },
  { key: 'Words', icon: BookOpen },
  { key: 'Activities', icon: Puzzle },
  { key: 'Extras', icon: Sparkles },
] as const;

type TabKey = (typeof tabs)[number]['key'];

export default function LessonEditor({ lesson }: { lesson: Lesson }) {
  const [tab, setTab] = useState<TabKey>('Details');

  return (
    <>
      <PageHeader
        title={`Lesson ${lesson.orderIndex}: ${lesson.title}`}
        breadcrumbs={[
          { label: 'Lessons', href: '/lessons' },
          { label: lesson.title },
        ]}
        actions={
          <Button href={`/lessons/${lesson.id}/preview`} variant="secondary" size="sm" icon={<Eye className="h-4 w-4" />}>
            Preview Lesson
          </Button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8">
        <div className="space-y-1">
          <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Lesson Steps</h3>
          {tabs.map((t) => {
            const Icon = t.icon;
            const isActive = tab === t.key;
            return (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-lg transition-all ${
                  isActive
                    ? 'bg-teal-50 text-teal-700 ring-1 ring-teal-200'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`h-4 w-4 ${isActive ? 'text-teal-600' : 'text-gray-400'}`} />
                  {t.key}
                </div>
                {t.key === 'Words' && (
                  <Badge variant={lesson.words.length >= lesson.wordCount ? 'green' : 'gray'}>
                    {lesson.words.length}/{lesson.wordCount}
                  </Badge>
                )}
                {t.key === 'Activities' && lesson.activities.length > 0 && (
                  <Badge variant="teal">
                    {lesson.activities.length}
                  </Badge>
                )}
              </button>
            );
          })}
        </div>

        <div className="min-w-0">
          {tab === 'Details' && <DetailsTab lesson={lesson} />}
          {tab === 'Words' && <WordsTab lesson={lesson} />}
          {tab === 'Activities' && <ActivitiesTab lesson={lesson} />}
          {tab === 'Extras' && <ExtrasTab lesson={lesson} />}
        </div>
      </div>
    </>
  );
}

function DetailsTab({ lesson }: { lesson: Lesson }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    const form = new FormData(e.currentTarget);
    const res = await fetch(`/api/lessons/${lesson.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: form.get('title'),
        subtitle: form.get('subtitle'),
        orderIndex: Number(form.get('orderIndex')),
        wordCount: Number(form.get('wordCount')),
        isPublished: form.get('isPublished') === 'on',
      }),
    });
    if (res.ok) {
      toast.success('Details saved');
      router.refresh();
    } else {
      toast.error('Failed to save');
    }
    setSaving(false);
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-1">General Details</h2>
        <p className="text-sm text-gray-500 mb-6">Target words and basic lesson information.</p>
        <div className="bg-white rounded-xl border border-gray-200 p-6 lg:p-8">
      <form onSubmit={handleSubmit} className="space-y-6 max-w-5xl">
        <div className="grid grid-cols-2 gap-4">
          <Input 
            label="Order Index" 
            name="orderIndex" 
            type="number" 
            defaultValue={lesson.orderIndex} 
            required 
            leftIcon={<ListOrdered className="h-4 w-4" />}
          />
          <Input 
            label="Title" 
            name="title" 
            defaultValue={lesson.title} 
            required 
            leftIcon={<Type className="h-4 w-4" />}
          />
        </div>
        
        <Input 
          label="Subtitle" 
          name="subtitle" 
          defaultValue={lesson.subtitle} 
          required 
          leftIcon={<AlignLeft className="h-4 w-4" />}
        />
        
        <div className="grid grid-cols-2 gap-4">
          <Input 
            label="Target Word Count" 
            name="wordCount" 
            type="number" 
            defaultValue={lesson.wordCount} 
            required 
            leftIcon={<Hash className="h-4 w-4" />}
          />
          <div className="flex items-center h-full pt-6">
            <Checkbox name="isPublished" id="pub" defaultChecked={lesson.isPublished} label="Published to App" />
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100 flex justify-end">
          <Button type="submit" loading={saving} icon={<Save className="h-4 w-4" />}>
            Save Changes
          </Button>
        </div>
      </form>
        </div>
      </div>
    </div>
  );
}

function WordsTab({ lesson }: { lesson: Lesson }) {
  const router = useRouter();

  async function addWord() {
    const maxOrder = lesson.words.reduce((max, w) => Math.max(max, w.orderIndex), 0);
    const res = await fetch('/api/words', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lessonId: lesson.id, orderIndex: maxOrder + 1, arabic: '', transliteration: '', meaning: '', frequency: 0, audioUrl: '' }),
    });
    if (res.ok) {
      const word = await res.json();
      toast.success('Word created');
      router.push(`/words/${word.id}`);
    } else {
      toast.error('Failed to create word');
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Vocabulary</h2>
          <p className="text-sm text-gray-500">Manage the words taught in this lesson.</p>
        </div>
        {lesson.words.length > 0 && (
          <Button size="sm" onClick={addWord} icon={<Plus className="h-4 w-4" />}>
            Add New Word
          </Button>
        )}
      </div>

      <Card className="overflow-hidden">
        {lesson.words.length === 0 ? (
          <div className="p-12">
            <EmptyState
              icon={<BookOpen className="h-12 w-12 text-teal-200" />}
              title="No words yet"
              description="Start building your lesson by adding vocabulary words."
              action={<Button onClick={addWord} icon={<Plus className="h-4 w-4" />}>Add First Word</Button>}
            />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="px-6 py-4 font-semibold text-gray-500 uppercase tracking-wider text-xs w-16">#</th>
                  <th className="px-6 py-4 font-semibold text-gray-500 uppercase tracking-wider text-xs">Arabic</th>
                  <th className="px-6 py-4 font-semibold text-gray-500 uppercase tracking-wider text-xs">Details</th>
                  <th className="px-6 py-4 font-semibold text-gray-500 uppercase tracking-wider text-xs w-32">Intro Style</th>
                  <th className="px-6 py-4 w-20"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {lesson.words.map((word) => (
                  <tr key={word.id} className="group hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 text-gray-400 font-mono text-xs">{word.orderIndex}</td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-2xl text-gray-900 leading-none" dir="rtl">{word.arabic || '—'}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-900">{word.meaning || 'No meaning set'}</span>
                        <span className="text-xs text-gray-500 font-mono mt-0.5">{word.transliteration || 'No transliteration'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={word.introduction ? 'teal' : 'gray'}>
                        {word.introduction?.style || 'None'}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link href={`/words/${word.id}`}>
                        <Button variant="ghost" size="sm" icon={<Pencil className="h-3 w-3" />}>Edit</Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}

function ActivitiesTab({ lesson }: { lesson: Lesson }) {
  const router = useRouter();
  const [adding, setAdding] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  async function addActivity(type: string) {
    setAdding(true);
    const maxOrder = lesson.activities.reduce((max, a) => Math.max(max, a.orderIndex), 0);
    const res = await fetch(`/api/lessons/${lesson.id}/activities`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        orderIndex: maxOrder + 1,
        type: type,
        payload: type === 'MATCH'
          ? { pairs: lesson.words.map((w) => ({ wordOrderIndex: w.orderIndex, arabic: w.arabic, meaning: w.meaning })) }
          : type === 'QUICK_FIRE'
          ? { rounds: lesson.words.map((w) => ({ wordOrderIndex: w.orderIndex, arabic: w.arabic, options: [w.meaning, '...'], correctIndex: 0 })) }
          : type === 'FILL_MEANING' && lesson.words[0]
          ? { wordOrderIndex: lesson.words[0].orderIndex, arabic: lesson.words[0].arabic, prompt: `${lesson.words[0].arabic} means ___`, options: [lesson.words[0].meaning, '', '', ''], correctIndex: 0 }
          : type === 'SPOT_IN_QURAN' && lesson.words[0]
          ? { wordOrderIndex: lesson.words[0].orderIndex }
          : {},
      }),
    });
    if (res.ok) {
      const newActivity = await res.json();
      toast.success('Activity added');
      router.push(`/lessons/${lesson.id}/activities/${newActivity.id}`);
    } else {
      toast.error('Failed to add activity');
    }
    setAdding(false);
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    await fetch(`/api/lessons/${lesson.id}/activities/${deleteTarget}`, { method: 'DELETE' });
    toast.success('Activity deleted');
    router.refresh();
    setDeleteTarget(null);
    setDeleting(false);
  }

  const activityTypes = [
    { value: 'MATCH', label: 'Match Pairs', icon: Puzzle, desc: 'Connect arabic words to meanings' },
    { value: 'QUICK_FIRE', label: 'Quick Fire', icon: Sparkles, desc: 'Fast paced multiple choice' },
    { value: 'FILL_MEANING', label: 'Fill Meaning', icon: FileText, desc: 'Complete the sentence' },
    { value: 'SPOT_IN_QURAN', label: 'Spot in Quran', icon: BookOpen, desc: 'Find word in full ayah' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-1">Learning Activities</h2>
        <p className="text-sm text-gray-500 mb-6">Interactive challenges to reinforce the lesson.</p>

        {lesson.activities.length === 0 ? (
          <Card className="p-8 border-dashed bg-gray-50/50">
            <EmptyState
              icon={<Puzzle className="h-10 w-10 text-gray-400" />}
              title="No activities yet"
              description="Choose an activity type below to add to this lesson."
            />
          </Card>
        ) : (
          <div className="space-y-4">
            {lesson.activities.map((act) => {
              const typeInfo = activityTypes.find(t => t.value === act.type);
              const Icon = typeInfo?.icon || Puzzle;
              return (
                <Card key={act.id} className="p-5 flex items-center justify-between group hover:border-teal-200 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600 ring-1 ring-teal-100">
                      <span className="font-mono font-bold text-sm">{act.orderIndex}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-gray-900">{typeInfo?.label || act.type}</h4>
                        <Badge variant="gray" className="text-[10px] tracking-wide">
                          {act.type}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">Configured with default payload</p>
                    </div>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link href={`/lessons/${lesson.id}/activities/${act.id}`}>
                      <Button variant="secondary" size="sm" icon={<Pencil className="h-3 w-3" />}>Edit</Button>
                    </Link>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setDeleteTarget(act.id)} 
                      icon={<Trash2 className="h-3 w-3" />} 
                      className="text-red-500 hover:text-red-600 hover:bg-red-50"
                    />
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      <div className="pt-8 border-t border-gray-100">
        <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Plus className="h-4 w-4 text-teal-500" />
          Add New Activity
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {activityTypes.map((type) => {
            const Icon = type.icon;
            return (
              <button
                key={type.value}
                onClick={() => addActivity(type.value)}
                disabled={adding}
                className="flex items-start gap-4 p-4 rounded-xl border border-gray-200 bg-white hover:border-teal-300 hover:ring-2 hover:ring-teal-500/10 hover:shadow-md transition-all text-left group cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
              >
                <div className="p-3 rounded-lg bg-gray-50 text-gray-500 group-hover:bg-teal-50 group-hover:text-teal-600 transition-colors">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 group-hover:text-teal-700 transition-colors">{type.label}</h4>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">{type.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete Activity"
        message="This will permanently remove this activity from the lesson."
        confirmLabel="Delete"
        variant="danger"
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}

function ExtrasTab({ lesson }: { lesson: Lesson }) {
  const router = useRouter();
  const [saving, setSaving] = useState('');

  async function saveMidMessage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving('mid');
    const form = new FormData(e.currentTarget);
    const res = await fetch(`/api/lessons/${lesson.id}/mid-message`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ headline: form.get('headline'), body: form.get('body') }),
    });
    if (res.ok) toast.success('Mid-lesson message saved');
    else toast.error('Failed to save');
    router.refresh();
    setSaving('');
  }

  async function saveCelebration(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving('cel');
    const form = new FormData(e.currentTarget);
    const res = await fetch(`/api/lessons/${lesson.id}/celebration`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ayahCoverage: form.get('ayahCoverage'), cumulativeWords: Number(form.get('cumulativeWords')) }),
    });
    if (res.ok) toast.success('Celebration stat saved');
    else toast.error('Failed to save');
    router.refresh();
    setSaving('');
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-1">Lesson Enhancements</h2>
        <p className="text-sm text-gray-500 mb-6">Encourage users with messages and stats.</p>
        
        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-lg bg-yellow-50 text-yellow-600">
                <FileText className="h-4 w-4" />
              </div>
              <h3 className="font-semibold text-gray-900">Mid-Lesson Message</h3>
            </div>
            <form onSubmit={saveMidMessage} className="space-y-4">
              <Input label="Headline" name="headline" defaultValue={lesson.midLessonMessage?.headline || ''} placeholder="e.g., 5 words down!" required />
              <Textarea label="Body" name="body" rows={3} defaultValue={lesson.midLessonMessage?.body || ''} placeholder="Encouraging message..." required />
              <div className="flex justify-end pt-2">
                <Button type="submit" loading={saving === 'mid'} size="sm" icon={<Save className="h-4 w-4" />}>
                  Save Message
                </Button>
              </div>
            </form>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-lg bg-pink-50 text-pink-600">
                <Sparkles className="h-4 w-4" />
              </div>
              <h3 className="font-semibold text-gray-900">Celebration Screen</h3>
            </div>
            <form onSubmit={saveCelebration} className="space-y-4">
              <Input label="Ayah Coverage" name="ayahCoverage" defaultValue={lesson.celebrationStat?.ayahCoverage || ''} placeholder="e.g., These 5 words appear in 1,940+ ayahs" required />
              <Input label="Cumulative Words" name="cumulativeWords" type="number" defaultValue={lesson.celebrationStat?.cumulativeWords || 0} required />
              <div className="flex justify-end pt-2">
                <Button type="submit" loading={saving === 'cel'} size="sm" icon={<Save className="h-4 w-4" />}>
                  Save Celebration
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
