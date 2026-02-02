'use client';

import AdminShell from '@/components/AdminShell';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import PageHeader from '@/components/ui/PageHeader';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import OptionCard from '@/components/ui/OptionCard';
import { Plus } from 'lucide-react';

export default function NewChallengePage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [date, setDate] = useState('');
  const [type, setType] = useState('QUICK_QUIZ');
  const [payload, setPayload] = useState<Record<string, unknown>>({});

  async function handleSubmit() {
    setSaving(true);
    const res = await fetch('/api/challenges', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date, type, payload }),
    });

    if (res.ok) {
      toast.success('Challenge created');
      router.push('/challenges');
    } else {
      toast.error('Failed to create challenge');
      setSaving(false);
    }
  }

  return (
    <AdminShell>
      <PageHeader
        title="New Challenge"
        breadcrumbs={[
          { label: 'Challenges', href: '/challenges' },
          { label: 'New' },
        ]}
      />
      <Card className="p-6 max-w-lg">
        <div className="space-y-4">
          <Input
            label="Date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <Select
            label="Type"
            value={type}
            onChange={(e) => { setType(e.target.value); setPayload({}); }}
            options={[
              { value: 'QUICK_QUIZ', label: 'Quick Quiz' },
              { value: 'MEMORY_TEST', label: 'Memory Test' },
              { value: 'FUN_FACT', label: 'Fun Fact' },
              { value: 'WORD_OF_THE_DAY', label: 'Word of the Day' },
            ]}
          />

          <div className="border-t pt-4">
            <ChallengePayloadEditor type={type} payload={payload} onChange={setPayload} />
          </div>

          <Button
            onClick={handleSubmit}
            disabled={!date}
            loading={saving}
            icon={<Plus className="h-4 w-4" />}
          >
            Create Challenge
          </Button>
        </div>
      </Card>
    </AdminShell>
  );
}

function ChallengePayloadEditor({
  type,
  payload,
  onChange,
}: {
  type: string;
  payload: Record<string, unknown>;
  onChange: (p: Record<string, unknown>) => void;
}) {
  if (type === 'WORD_OF_THE_DAY') {
    return (
      <div className="space-y-3">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Word of the Day</h3>
        <Input label="Arabic" value={(payload.wordArabic as string) || ''} onChange={(e) => onChange({ ...payload, wordArabic: e.target.value })} dir="rtl" />
        <Input label="Transliteration" value={(payload.wordTransliteration as string) || ''} onChange={(e) => onChange({ ...payload, wordTransliteration: e.target.value })} />
        <Input label="Meaning" value={(payload.wordMeaning as string) || ''} onChange={(e) => onChange({ ...payload, wordMeaning: e.target.value })} />
        <Input label="Fact" value={(payload.fact as string) || ''} onChange={(e) => onChange({ ...payload, fact: e.target.value })} />
        <Input label="Frequency" value={String(payload.frequency || '')} onChange={(e) => onChange({ ...payload, frequency: Number(e.target.value) })} type="number" />
      </div>
    );
  }

  if (type === 'MEMORY_TEST') {
    const options = (payload.options as string[]) || ['', '', '', ''];
    return (
      <div className="space-y-3">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Memory Test</h3>
        <Input label="Arabic" value={(payload.wordArabic as string) || ''} onChange={(e) => onChange({ ...payload, wordArabic: e.target.value })} dir="rtl" />
        <Input label="Transliteration" value={(payload.wordTransliteration as string) || ''} onChange={(e) => onChange({ ...payload, wordTransliteration: e.target.value })} />
        <Input label="Question" value={(payload.question as string) || ''} onChange={(e) => onChange({ ...payload, question: e.target.value })} />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Options (select correct)</label>
          <div className="grid grid-cols-1 gap-3">
            {options.map((opt: string, i: number) => (
              <OptionCard
                key={i}
                index={i}
                value={opt}
                selected={(payload.correctIndex as number) === i}
                onChange={(v) => { const o = [...options]; o[i] = v; onChange({ ...payload, options: o }); }}
                onSelect={() => onChange({ ...payload, correctIndex: i })}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (type === 'FUN_FACT') {
    return (
      <div className="space-y-3">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Fun Fact</h3>
        <Input label="Headline" value={(payload.headline as string) || ''} onChange={(e) => onChange({ ...payload, headline: e.target.value })} />
        <Textarea label="Fact" value={(payload.fact as string) || ''} onChange={(e) => onChange({ ...payload, fact: e.target.value })} rows={4} />
      </div>
    );
  }

  if (type === 'QUICK_QUIZ') {
    const options = (payload.options as string[]) || ['', '', '', ''];
    return (
      <div className="space-y-3">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Quick Quiz</h3>
        <Input label="Question" value={(payload.question as string) || ''} onChange={(e) => onChange({ ...payload, question: e.target.value })} />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Options (select correct)</label>
          <div className="grid grid-cols-1 gap-3">
            {options.map((opt: string, i: number) => (
              <OptionCard
                key={i}
                index={i}
                value={opt}
                selected={(payload.correctIndex as number) === i}
                onChange={(v) => { const o = [...options]; o[i] = v; onChange({ ...payload, options: o }); }}
                onSelect={() => onChange({ ...payload, correctIndex: i })}
              />
            ))}
          </div>
        </div>
        <Input label="Correct Meaning" value={(payload.correctMeaning as string) || ''} onChange={(e) => onChange({ ...payload, correctMeaning: e.target.value })} />
      </div>
    );
  }

  return null;
}
