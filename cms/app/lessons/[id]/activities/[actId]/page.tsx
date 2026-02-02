'use client';

import AdminShell from '@/components/AdminShell';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import toast from 'react-hot-toast';
import PageHeader from '@/components/ui/PageHeader';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import OptionCard from '@/components/ui/OptionCard';
import { SkeletonCard } from '@/components/ui/Skeleton';
import { Save, Plus, Trash2 } from 'lucide-react';

type MatchPair = { wordOrderIndex: number; arabic: string; meaning: string };
type QuickFireRound = { wordOrderIndex: number; arabic: string; options: string[]; correctIndex: number };
type FillMeaningPayload = { wordOrderIndex: number; arabic: string; prompt: string; options: string[]; correctIndex: number };

export default function ActivityEditorPage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activity, setActivity] = useState<{ id: string; orderIndex: number; type: string; payload: Record<string, unknown> } | null>(null);
  const [lessonWords, setLessonWords] = useState<Array<{ orderIndex: number; arabic: string; meaning: string; transliteration: string }>>([]);

  useEffect(() => {
    fetch(`/api/lessons/${params.id}`).then((r) => r.json()).then((lesson) => {
      setLessonWords(lesson.words || []);
      const act = lesson.activities?.find((a: { id: string }) => a.id === params.actId);
      if (act) setActivity(act);
      setLoading(false);
    });
  }, [params.id, params.actId]);

  async function save(payload: unknown) {
    if (!activity) return;
    setSaving(true);
    const res = await fetch(`/api/lessons/${params.id}/activities/${activity.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderIndex: activity.orderIndex, type: activity.type, payload }),
    });
    if (res.ok) {
      toast.success('Activity saved');
      router.push(`/lessons/${params.id}`);
    } else {
      toast.error('Failed to save');
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <AdminShell>
        <PageHeader title="Edit Activity" breadcrumbs={[{ label: 'Lessons', href: '/lessons' }, { label: 'Activity' }]} />
        <div className="max-w-2xl space-y-4"><SkeletonCard /><SkeletonCard /></div>
      </AdminShell>
    );
  }

  if (!activity) {
    return (
      <AdminShell>
        <PageHeader title="Activity Not Found" breadcrumbs={[{ label: 'Lessons', href: '/lessons' }]} />
        <Card className="p-8 text-center">
          <p className="text-gray-500">This activity could not be found.</p>
        </Card>
      </AdminShell>
    );
  }

  return (
    <AdminShell>
      <PageHeader
        title="Edit Activity"
        breadcrumbs={[
          { label: 'Lessons', href: '/lessons' },
          { label: 'Lesson', href: `/lessons/${params.id}` },
          { label: 'Activity' },
        ]}
      />
      <div className="max-w-2xl">
        <div className="flex items-center gap-3 mb-6">
          <Badge variant="teal">{activity.type.replace(/_/g, ' ')}</Badge>
          <span className="text-sm text-gray-400">Order: {activity.orderIndex}</span>
        </div>

        {activity.type === 'MATCH' && <MatchEditor payload={activity.payload} words={lessonWords} onSave={save} saving={saving} />}
        {activity.type === 'QUICK_FIRE' && <QuickFireEditor payload={activity.payload} words={lessonWords} onSave={save} saving={saving} />}
        {activity.type === 'FILL_MEANING' && <FillMeaningEditor payload={activity.payload} words={lessonWords} onSave={save} saving={saving} />}
        {activity.type === 'SPOT_IN_QURAN' && <SpotInQuranEditor payload={activity.payload} words={lessonWords} onSave={save} saving={saving} />}
      </div>
    </AdminShell>
  );
}

function MatchEditor({ payload, words, onSave, saving }: { payload: Record<string, unknown>; words: Array<{ orderIndex: number; arabic: string; meaning: string }>; onSave: (p: unknown) => void; saving: boolean }) {
  const initial = (payload.pairs as MatchPair[]) || words.map((w) => ({ wordOrderIndex: w.orderIndex, arabic: w.arabic, meaning: w.meaning }));
  const [pairs, setPairs] = useState<MatchPair[]>(initial);

  function update(idx: number, field: keyof MatchPair, value: string | number) {
    setPairs(pairs.map((p, i) => (i === idx ? { ...p, [field]: value } : p)));
  }

  return (
    <Card className="p-6">
      <p className="text-sm text-gray-500 mb-4">Match pairs — users tap Arabic to match with meaning.</p>
      <div className="space-y-3">
        {pairs.map((pair, idx) => (
          <div key={idx} className="flex gap-2 items-center bg-gray-50 p-3 rounded-xl">
            <span className="text-xs text-gray-400 font-mono w-6 shrink-0">{idx + 1}</span>
            <Input value={pair.arabic} onChange={(e) => update(idx, 'arabic', e.target.value)} dir="rtl" placeholder="Arabic" className="flex-1" />
            <Input value={pair.meaning} onChange={(e) => update(idx, 'meaning', e.target.value)} placeholder="Meaning" className="flex-1" />
            <button type="button" onClick={() => setPairs(pairs.filter((_, i) => i !== idx))} className="p-1.5 text-gray-400 hover:text-red-500 transition-colors shrink-0">
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between mt-4">
        <Button variant="ghost" size="sm" onClick={() => setPairs([...pairs, { wordOrderIndex: 0, arabic: '', meaning: '' }])} icon={<Plus className="h-3 w-3" />}>
          Add Pair
        </Button>
        <Button onClick={() => onSave({ pairs })} loading={saving} icon={<Save className="h-4 w-4" />}>
          Save Activity
        </Button>
      </div>
    </Card>
  );
}

function QuickFireEditor({ payload, words, onSave, saving }: { payload: Record<string, unknown>; words: Array<{ orderIndex: number; arabic: string; meaning: string }>; onSave: (p: unknown) => void; saving: boolean }) {
  const initial = (payload.rounds as QuickFireRound[]) || words.map((w) => ({ wordOrderIndex: w.orderIndex, arabic: w.arabic, options: [w.meaning, ''], correctIndex: 0 }));
  const [rounds, setRounds] = useState<QuickFireRound[]>(initial);

  function updateRound(idx: number, field: string, value: unknown) {
    setRounds(rounds.map((r, i) => (i === idx ? { ...r, [field]: value } : r)));
  }

  function updateOption(roundIdx: number, optIdx: number, value: string) {
    const newRounds = [...rounds];
    const opts = [...newRounds[roundIdx].options];
    opts[optIdx] = value;
    newRounds[roundIdx] = { ...newRounds[roundIdx], options: opts };
    setRounds(newRounds);
  }

  return (
    <Card className="p-6">
      <p className="text-sm text-gray-500 mb-4">Quick Fire — Arabic word shown, user picks correct meaning.</p>
      <div className="space-y-4">
        {rounds.map((round, idx) => (
          <div key={idx} className="bg-gray-50 p-4 rounded-xl space-y-3">
            <div className="flex gap-2 items-center">
              <span className="text-xs text-gray-400 font-mono w-6 shrink-0">{idx + 1}</span>
              <Input value={round.arabic} onChange={(e) => updateRound(idx, 'arabic', e.target.value)} dir="rtl" placeholder="Arabic" />
            </div>
            <div className="pl-8 space-y-2">
              {round.options.map((opt, oi) => (
                <OptionCard
                  key={oi}
                  index={oi}
                  value={opt}
                  selected={round.correctIndex === oi}
                  onChange={(v) => updateOption(idx, oi, v)}
                  onSelect={() => updateRound(idx, 'correctIndex', oi)}
                />
              ))}
              <Button variant="ghost" size="sm" onClick={() => updateRound(idx, 'options', [...round.options, ''])} icon={<Plus className="h-3 w-3" />}>
                Option
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between mt-4">
        <Button variant="ghost" size="sm" onClick={() => setRounds([...rounds, { wordOrderIndex: 0, arabic: '', options: ['', ''], correctIndex: 0 }])} icon={<Plus className="h-3 w-3" />}>
          Add Round
        </Button>
        <Button onClick={() => onSave({ rounds })} loading={saving} icon={<Save className="h-4 w-4" />}>
          Save Activity
        </Button>
      </div>
    </Card>
  );
}

function FillMeaningEditor({ payload, words, onSave, saving }: { payload: Record<string, unknown>; words: Array<{ orderIndex: number; arabic: string; meaning: string }>; onSave: (p: unknown) => void; saving: boolean }) {
  const initial: FillMeaningPayload = (payload as unknown as FillMeaningPayload) || {
    wordOrderIndex: words[0]?.orderIndex || 0, arabic: words[0]?.arabic || '', prompt: `${words[0]?.arabic || ''} means ___`, options: [words[0]?.meaning || '', '', '', ''], correctIndex: 0,
  };
  const [data, setData] = useState(initial);

  function updateOption(idx: number, value: string) {
    const opts = [...data.options]; opts[idx] = value; setData({ ...data, options: opts });
  }

  return (
    <Card className="p-6">
      <p className="text-sm text-gray-500 mb-4">Fill Meaning — user picks the correct meaning for a word.</p>
      <div className="space-y-4">
        <Select
          label="Word"
          value={String(data.wordOrderIndex)}
          onChange={(e) => {
            const w = words.find((w) => w.orderIndex === Number(e.target.value));
            if (w) setData({ ...data, wordOrderIndex: w.orderIndex, arabic: w.arabic, prompt: `${w.arabic} means ___`, options: [w.meaning, data.options[1] || '', data.options[2] || '', data.options[3] || ''], correctIndex: 0 });
          }}
          options={words.map((w) => ({ value: String(w.orderIndex), label: `${w.arabic} — ${w.meaning}` }))}
        />
        <Input label="Prompt" value={data.prompt} onChange={(e) => setData({ ...data, prompt: e.target.value })} />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Options (select correct answer)</label>
          <div className="space-y-2">
            {data.options.map((opt, idx) => (
              <OptionCard
                key={idx}
                index={idx}
                value={opt}
                selected={data.correctIndex === idx}
                onChange={(v) => updateOption(idx, v)}
                onSelect={() => setData({ ...data, correctIndex: idx })}
              />
            ))}
          </div>
        </div>
        <div className="flex justify-end">
          <Button onClick={() => onSave(data)} loading={saving} icon={<Save className="h-4 w-4" />}>Save Activity</Button>
        </div>
      </div>
    </Card>
  );
}

function SpotInQuranEditor({ payload, words, onSave, saving }: { payload: Record<string, unknown>; words: Array<{ orderIndex: number; arabic: string; meaning: string }>; onSave: (p: unknown) => void; saving: boolean }) {
  const [wordOrderIndex, setWordOrderIndex] = useState<number>((payload.wordOrderIndex as number) || words[0]?.orderIndex || 0);

  return (
    <Card className="p-6">
      <p className="text-sm text-gray-500 mb-4">Spot in Quran — user taps the word they recognize in an ayah. The word must have Ayah Highlights configured.</p>
      <div className="space-y-4">
        <Select
          label="Word to spot"
          value={String(wordOrderIndex)}
          onChange={(e) => setWordOrderIndex(Number(e.target.value))}
          options={words.map((w) => ({ value: String(w.orderIndex), label: `${w.arabic} — ${w.meaning}` }))}
        />
        <div className="flex justify-end">
          <Button onClick={() => onSave({ wordOrderIndex })} loading={saving} icon={<Save className="h-4 w-4" />}>Save Activity</Button>
        </div>
      </div>
    </Card>
  );
}
