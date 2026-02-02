'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import PageHeader from '@/components/ui/PageHeader';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { Save, Pencil, X } from 'lucide-react';

type Surah = {
  id: string;
  number: number;
  nameArabic: string;
  nameEnglish: string;
  nameTransliteration: string;
  totalAyahs: number;
  revelationType: string;
  ayahs: Array<{
    id: string;
    ayahNumber: number;
    arabicText: string;
    translation: string;
  }>;
};

export default function SurahEditor({ surah }: { surah: Surah }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [editingAyah, setEditingAyah] = useState<string | null>(null);

  async function saveSurah(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    const form = new FormData(e.currentTarget);
    const res = await fetch(`/api/surahs/${surah.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nameArabic: form.get('nameArabic'),
        nameEnglish: form.get('nameEnglish'),
        nameTransliteration: form.get('nameTransliteration'),
        totalAyahs: Number(form.get('totalAyahs')),
        revelationType: form.get('revelationType'),
      }),
    });
    if (res.ok) toast.success('Surah details saved');
    else toast.error('Failed to save');
    router.refresh();
    setSaving(false);
  }

  async function saveAyah(ayahId: string, arabicText: string, translation: string) {
    const res = await fetch(`/api/surahs/${surah.id}/ayahs/${ayahId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ arabicText, translation }),
    });
    if (res.ok) toast.success('Ayah saved');
    else toast.error('Failed to save');
    router.refresh();
    setEditingAyah(null);
  }

  return (
    <>
      <PageHeader
        title={`Surah ${surah.number}: ${surah.nameEnglish}`}
        breadcrumbs={[
          { label: 'Surahs', href: '/surahs' },
          { label: surah.nameEnglish },
        ]}
      />

      <div className="max-w-4xl space-y-6">
        {/* Surah details form */}
        <Card className="p-6 max-w-lg">
          <form onSubmit={saveSurah} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <Input label="Arabic Name" name="nameArabic" defaultValue={surah.nameArabic} dir="rtl" />
              <Input label="English Name" name="nameEnglish" defaultValue={surah.nameEnglish} />
              <Input label="Transliteration" name="nameTransliteration" defaultValue={surah.nameTransliteration} />
              <Input label="Total Ayahs" name="totalAyahs" type="number" defaultValue={surah.totalAyahs} />
              <Select
                label="Revelation Type"
                name="revelationType"
                defaultValue={surah.revelationType}
                options={[
                  { value: 'Meccan', label: 'Meccan' },
                  { value: 'Medinan', label: 'Medinan' },
                ]}
              />
            </div>
            <Button type="submit" loading={saving} size="sm" icon={<Save className="h-4 w-4" />}>
              Save Details
            </Button>
          </form>
        </Card>

        {/* Ayahs */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-sm font-semibold text-gray-900">Ayahs</h2>
            <Badge variant={surah.ayahs.length >= surah.totalAyahs ? 'green' : 'gray'}>
              {surah.ayahs.length}/{surah.totalAyahs}
            </Badge>
          </div>
          <div className="space-y-2">
            {surah.ayahs.map((ayah) => (
              <Card key={ayah.id} className="p-4">
                {editingAyah === ayah.id ? (
                  <AyahEditForm ayah={ayah} onSave={saveAyah} onCancel={() => setEditingAyah(null)} />
                ) : (
                  <div className="flex gap-4">
                    <span className="text-xs text-gray-400 font-mono w-8 shrink-0 pt-1">{ayah.ayahNumber}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-lg leading-relaxed" dir="rtl">{ayah.arabicText}</p>
                      <p className="text-sm text-gray-600 mt-1">{ayah.translation}</p>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => setEditingAyah(ayah.id)} icon={<Pencil className="h-3 w-3" />}>
                      Edit
                    </Button>
                  </div>
                )}
              </Card>
            ))}
            {surah.ayahs.length === 0 && (
              <Card className="p-8 text-center">
                <p className="text-gray-400 text-sm">No ayahs loaded for this surah.</p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function AyahEditForm({
  ayah,
  onSave,
  onCancel,
}: {
  ayah: { id: string; ayahNumber: number; arabicText: string; translation: string };
  onSave: (id: string, arabic: string, translation: string) => void;
  onCancel: () => void;
}) {
  const [arabic, setArabic] = useState(ayah.arabicText);
  const [translation, setTranslation] = useState(ayah.translation);
  const [saving, setSaving] = useState(false);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-gray-500">Ayah {ayah.ayahNumber}</span>
        <button onClick={onCancel} className="text-gray-400 hover:text-gray-600 transition-colors">
          <X className="h-4 w-4" />
        </button>
      </div>
      <Textarea value={arabic} onChange={(e) => setArabic(e.target.value)} dir="rtl" rows={2} label="Arabic Text" />
      <Textarea value={translation} onChange={(e) => setTranslation(e.target.value)} rows={2} label="Translation" />
      <div className="flex gap-2">
        <Button size="sm" loading={saving} onClick={async () => { setSaving(true); await onSave(ayah.id, arabic, translation); setSaving(false); }} icon={<Save className="h-3 w-3" />}>
          Save
        </Button>
        <Button variant="secondary" size="sm" onClick={onCancel}>Cancel</Button>
      </div>
    </div>
  );
}
