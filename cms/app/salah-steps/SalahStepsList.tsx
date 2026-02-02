'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import PageHeader from '@/components/ui/PageHeader';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import EmptyState from '@/components/ui/EmptyState';
import { Landmark, Pencil, X } from 'lucide-react';

type SalahStep = {
  id: string;
  orderIndex: number;
  name: string;
  arabicText: string;
  transliteration: string;
  translation: string;
  note: string | null;
};

export default function SalahStepsList({ steps }: { steps: SalahStep[] }) {
  const router = useRouter();
  const [editingId, setEditingId] = useState<string | null>(null);

  async function saveStep(step: SalahStep) {
    const res = await fetch(`/api/salah-steps/${step.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(step),
    });
    if (res.ok) {
      toast.success('Step saved');
      router.refresh();
      setEditingId(null);
    } else {
      toast.error('Failed to save step');
    }
  }

  return (
    <>
      <PageHeader title="Salah Steps" />

      {steps.length === 0 ? (
        <Card>
          <EmptyState
            icon={<Landmark className="h-12 w-12" />}
            title="No salah steps"
            description="Salah steps are seeded from the backend."
          />
        </Card>
      ) : (
        <div className="space-y-3">
          {steps.map((step) => (
            <Card key={step.id} className="p-5">
              {editingId === step.id ? (
                <StepEditForm step={step} onSave={saveStep} onCancel={() => setEditingId(null)} />
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-gray-100 text-xs font-mono text-gray-500">
                        {step.orderIndex}
                      </span>
                      <span className="font-medium text-sm text-gray-900">{step.name}</span>
                    </div>
                    <Button variant="ghost" size="sm" icon={<Pencil className="h-3 w-3" />} onClick={() => setEditingId(step.id)}>
                      Edit
                    </Button>
                  </div>
                  <p className="text-xl leading-relaxed mb-2" dir="rtl">{step.arabicText}</p>
                  <p className="text-sm text-gray-500 mb-1">{step.transliteration}</p>
                  <p className="text-sm text-gray-700">{step.translation}</p>
                  {step.note && <p className="text-xs text-gray-400 mt-2 italic">{step.note}</p>}
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </>
  );
}

function StepEditForm({
  step,
  onSave,
  onCancel,
}: {
  step: SalahStep;
  onSave: (s: SalahStep) => void;
  onCancel: () => void;
}) {
  const [data, setData] = useState(step);
  const [saving, setSaving] = useState(false);
  const set = (field: keyof SalahStep, value: string | number) => setData({ ...data, [field]: value });

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-medium text-gray-500">Editing Step</span>
        <button onClick={onCancel} className="text-gray-400 hover:text-gray-600 transition-colors">
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Input label="Order" type="number" value={data.orderIndex} onChange={(e) => set('orderIndex', Number(e.target.value))} />
        <Input label="Name" value={data.name} onChange={(e) => set('name', e.target.value)} />
      </div>
      <Textarea label="Arabic" value={data.arabicText} onChange={(e) => set('arabicText', e.target.value)} dir="rtl" rows={2} />
      <Textarea label="Transliteration" value={data.transliteration} onChange={(e) => set('transliteration', e.target.value)} rows={2} />
      <Textarea label="Translation" value={data.translation} onChange={(e) => set('translation', e.target.value)} rows={2} />
      <Input label="Note (optional)" value={data.note || ''} onChange={(e) => set('note', e.target.value)} />
      <div className="flex gap-2 pt-1">
        <Button size="sm" loading={saving} onClick={async () => { setSaving(true); await onSave(data); setSaving(false); }}>
          Save
        </Button>
        <Button variant="secondary" size="sm" onClick={onCancel}>Cancel</Button>
      </div>
    </div>
  );
}
