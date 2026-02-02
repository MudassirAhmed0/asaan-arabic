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
import { HandHeart, Pencil, X } from 'lucide-react';

type Dua = {
  id: string;
  orderIndex: number;
  title: string;
  occasion: string;
  arabicText: string;
  transliteration: string;
  translation: string;
  source: string | null;
};

export default function DuasList({ duas }: { duas: Dua[] }) {
  const router = useRouter();
  const [editingId, setEditingId] = useState<string | null>(null);

  async function saveDua(dua: Dua) {
    const res = await fetch(`/api/duas/${dua.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dua),
    });
    if (res.ok) {
      toast.success('Dua saved');
      router.refresh();
      setEditingId(null);
    } else {
      toast.error('Failed to save dua');
    }
  }

  return (
    <>
      <PageHeader title="Duas" />

      {duas.length === 0 ? (
        <Card>
          <EmptyState
            icon={<HandHeart className="h-12 w-12" />}
            title="No duas"
            description="Duas are seeded from the backend."
          />
        </Card>
      ) : (
        <div className="space-y-3">
          {duas.map((dua) => (
            <Card key={dua.id} className="p-5">
              {editingId === dua.id ? (
                <DuaEditForm dua={dua} onSave={saveDua} onCancel={() => setEditingId(null)} />
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="font-medium text-sm text-gray-900">{dua.title}</span>
                      <span className="text-xs text-gray-400 ml-2">{dua.occasion}</span>
                    </div>
                    <Button variant="ghost" size="sm" icon={<Pencil className="h-3 w-3" />} onClick={() => setEditingId(dua.id)}>
                      Edit
                    </Button>
                  </div>
                  <p className="text-xl leading-relaxed mb-2" dir="rtl">{dua.arabicText}</p>
                  <p className="text-sm text-gray-500 mb-1">{dua.transliteration}</p>
                  <p className="text-sm text-gray-700">{dua.translation}</p>
                  {dua.source && <p className="text-xs text-gray-400 mt-2">Source: {dua.source}</p>}
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </>
  );
}

function DuaEditForm({
  dua,
  onSave,
  onCancel,
}: {
  dua: Dua;
  onSave: (d: Dua) => void;
  onCancel: () => void;
}) {
  const [data, setData] = useState(dua);
  const [saving, setSaving] = useState(false);
  const set = (field: keyof Dua, value: string | number) => setData({ ...data, [field]: value });

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-medium text-gray-500">Editing Dua</span>
        <button onClick={onCancel} className="text-gray-400 hover:text-gray-600 transition-colors">
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Input label="Title" value={data.title} onChange={(e) => set('title', e.target.value)} />
        <Input label="Occasion" value={data.occasion} onChange={(e) => set('occasion', e.target.value)} />
      </div>
      <Textarea label="Arabic" value={data.arabicText} onChange={(e) => set('arabicText', e.target.value)} dir="rtl" rows={2} />
      <Textarea label="Transliteration" value={data.transliteration} onChange={(e) => set('transliteration', e.target.value)} rows={2} />
      <Textarea label="Translation" value={data.translation} onChange={(e) => set('translation', e.target.value)} rows={2} />
      <Input label="Source (optional)" value={data.source || ''} onChange={(e) => set('source', e.target.value)} />
      <div className="flex gap-2 pt-1">
        <Button size="sm" loading={saving} onClick={async () => { setSaving(true); await onSave(data); setSaving(false); }}>
          Save
        </Button>
        <Button variant="secondary" size="sm" onClick={onCancel}>Cancel</Button>
      </div>
    </div>
  );
}
