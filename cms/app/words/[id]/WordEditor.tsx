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
import { Save, Plus, Trash2 } from 'lucide-react';

type Word = {
  id: string;
  orderIndex: number;
  arabic: string;
  transliteration: string;
  meaning: string;
  frequency: number;
  audioUrl: string;
  lesson: { id: string; orderIndex: number; title: string };
  introduction: {
    style: string;
    headline: string;
    body: string;
    ayahText: string | null;
    ayahRef: string | null;
    factStat: string | null;
    quickCheckQuestion: string | null;
    quickCheckOptions: string[];
    quickCheckAnswer: number | null;
  } | null;
  ayahHighlights: Array<{
    id: string;
    surahName: string;
    surahNum: number;
    ayahNum: number;
    arabicText: string;
    translation: string;
    highlightStartIndex: number;
    highlightEndIndex: number;
  }>;
};

const STYLES = [
  { value: 'COGNATE', label: 'Cognate' },
  { value: 'QURAN_CONTEXT', label: 'Quran Context' },
  { value: 'FUN_FACT', label: 'Fun Fact' },
  { value: 'QUICK_CHECK', label: 'Quick Check' },
  { value: 'LIFE_CONNECTION', label: 'Life Connection' },
];

export default function WordEditor({ word }: { word: Word }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [style, setStyle] = useState(word.introduction?.style || 'COGNATE');
  const [options, setOptions] = useState<string[]>(
    word.introduction?.quickCheckOptions || ['', '', '', '']
  );
  const [highlights, setHighlights] = useState(word.ayahHighlights);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    const form = new FormData(e.currentTarget);

    const data: Record<string, unknown> = {
      arabic: form.get('arabic'),
      transliteration: form.get('transliteration'),
      meaning: form.get('meaning'),
      frequency: Number(form.get('frequency')),
      audioUrl: form.get('audioUrl'),
      orderIndex: Number(form.get('orderIndex')),
      introduction: {
        style,
        headline: form.get('intro_headline'),
        body: form.get('intro_body'),
        ...(style === 'QURAN_CONTEXT' && {
          ayahText: form.get('intro_ayahText'),
          ayahRef: form.get('intro_ayahRef'),
        }),
        ...(style === 'FUN_FACT' && {
          factStat: form.get('intro_factStat'),
        }),
        ...(style === 'QUICK_CHECK' && {
          quickCheckQuestion: form.get('intro_question'),
          quickCheckOptions: options,
          quickCheckAnswer: Number(form.get('intro_answer')),
        }),
      },
      ayahHighlights: highlights,
    };

    const res = await fetch(`/api/words/${word.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      toast.success('Word saved');
      router.refresh();
    } else {
      toast.error('Failed to save word');
    }
    setSaving(false);
  }

  function addHighlight() {
    setHighlights([
      ...highlights,
      { id: '', surahName: '', surahNum: 0, ayahNum: 0, arabicText: '', translation: '', highlightStartIndex: 0, highlightEndIndex: 0 },
    ]);
  }

  function removeHighlight(idx: number) {
    setHighlights(highlights.filter((_, i) => i !== idx));
  }

  function updateHighlight(idx: number, field: string, value: string | number) {
    setHighlights(highlights.map((h, i) => (i === idx ? { ...h, [field]: value } : h)));
  }

  return (
    <>
      <PageHeader
        title={`${word.arabic} — ${word.transliteration}`}
        breadcrumbs={[
          { label: 'Lessons', href: '/lessons' },
          { label: `Lesson ${word.lesson.orderIndex}`, href: `/lessons/${word.lesson.id}` },
          { label: word.meaning },
        ]}
      />

      <form onSubmit={handleSubmit} className="space-y-6 max-w-5xl">
        {/* Core fields */}
        <Card className="p-6">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Core Details</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 md:col-span-2">
                <Input label="Order Index" name="orderIndex" type="number" defaultValue={word.orderIndex} required />
              </div>
              <div className="col-span-12 md:col-span-3">
                <Input label="Frequency" name="frequency" type="number" defaultValue={word.frequency} required />
              </div>
              <div className="col-span-12 md:col-span-7">
                 <Input label="Audio URL" name="audioUrl" defaultValue={word.audioUrl} />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Arabic" name="arabic" defaultValue={word.arabic} dir="rtl" required className="text-xl" />
              <Input label="Transliteration" name="transliteration" defaultValue={word.transliteration} required />
            </div>
            
            <Input label="Meaning" name="meaning" defaultValue={word.meaning} required />
          </div>
        </Card>

        {/* Introduction */}
        <Card className="p-6">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Introduction</h2>
          <div className="space-y-3">
            <Select
              label="Style"
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              options={STYLES}
            />
            <Input
              label="Headline"
              name="intro_headline"
              defaultValue={word.introduction?.headline || ''}
              placeholder="Unique headline for this word"
            />
            <Textarea
              label="Body"
              name="intro_body"
              rows={4}
              defaultValue={word.introduction?.body || ''}
            />

            {style === 'QURAN_CONTEXT' && (
              <>
                <Textarea
                  label="Ayah Text (Arabic)"
                  name="intro_ayahText"
                  rows={2}
                  defaultValue={word.introduction?.ayahText || ''}
                  dir="rtl"
                />
                <Input
                  label="Ayah Reference"
                  name="intro_ayahRef"
                  defaultValue={word.introduction?.ayahRef || ''}
                  placeholder="e.g., Al-Fatiha 1:1"
                />
              </>
            )}

            {style === 'FUN_FACT' && (
              <Input
                label="Fact/Stat"
                name="intro_factStat"
                defaultValue={word.introduction?.factStat || ''}
                placeholder="e.g., appears 780+ times"
              />
            )}

            {style === 'QUICK_CHECK' && (
              <>
                <Input
                  label="Question"
                  name="intro_question"
                  defaultValue={word.introduction?.quickCheckQuestion || ''}
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Options</label>
                  <div className="space-y-2">
                    {options.map((opt, i) => (
                      <Input
                        key={i}
                        value={opt}
                        onChange={(e) => {
                          const next = [...options];
                          next[i] = e.target.value;
                          setOptions(next);
                        }}
                        placeholder={`Option ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>
                <Input
                  label="Correct Answer (0-based index)"
                  name="intro_answer"
                  type="number"
                  defaultValue={word.introduction?.quickCheckAnswer ?? 0}
                />
              </>
            )}
          </div>
        </Card>

        {/* Ayah Highlights */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Ayah Highlights</h2>
            <Button type="button" variant="ghost" size="sm" onClick={addHighlight} icon={<Plus className="h-3 w-3" />}>
              Add Highlight
            </Button>
          </div>
          <div className="space-y-3">
            {highlights.map((h, idx) => (
              <div key={idx} className="bg-gray-50 p-4 rounded-lg space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium text-gray-500">Highlight {idx + 1}</span>
                  <Button type="button" variant="ghost" size="sm" onClick={() => removeHighlight(idx)} icon={<Trash2 className="h-3 w-3" />} className="text-red-500 hover:text-red-600 hover:bg-red-50">
                    Remove
                  </Button>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <Input label="Surah Name" value={h.surahName} onChange={(e) => updateHighlight(idx, 'surahName', e.target.value)} />
                  <Input label="Surah #" type="number" value={h.surahNum} onChange={(e) => updateHighlight(idx, 'surahNum', Number(e.target.value))} />
                  <Input label="Ayah #" type="number" value={h.ayahNum} onChange={(e) => updateHighlight(idx, 'ayahNum', Number(e.target.value))} />
                </div>
                <Textarea label="Arabic Text" value={h.arabicText} onChange={(e) => updateHighlight(idx, 'arabicText', e.target.value)} rows={2} dir="rtl" />
                <Textarea label="Translation" value={h.translation} onChange={(e) => updateHighlight(idx, 'translation', e.target.value)} rows={2} />
                <div className="grid grid-cols-2 gap-2">
                  <Input label="Start Index" type="number" value={h.highlightStartIndex} onChange={(e) => updateHighlight(idx, 'highlightStartIndex', Number(e.target.value))} />
                  <Input label="End Index" type="number" value={h.highlightEndIndex} onChange={(e) => updateHighlight(idx, 'highlightEndIndex', Number(e.target.value))} />
                </div>
              </div>
            ))}
            {highlights.length === 0 && (
              <p className="text-sm text-gray-400 text-center py-4">No highlights yet.</p>
            )}
          </div>
        </Card>

        <Button type="submit" loading={saving} icon={<Save className="h-4 w-4" />}>
          Save Word
        </Button>
      </form>
    </>
  );
}
