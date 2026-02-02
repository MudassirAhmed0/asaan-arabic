'use client';

import AdminShell from '@/components/AdminShell';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import toast from 'react-hot-toast';
import PageHeader from '@/components/ui/PageHeader';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import { SkeletonCard } from '@/components/ui/Skeleton';
import { Save, Trash2, Layers, Check } from 'lucide-react';

type ChallengeData = {
  date: string;
  type: string;
  payload: Record<string, unknown>;
};

export default function EditChallengePage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [data, setData] = useState<ChallengeData>({ date: '', type: 'QUICK_QUIZ', payload: {} });

  useEffect(() => {
    fetch(`/api/challenges/${params.id}`)
      .then((r) => r.json())
      .then((c) => {
        setData({
          date: new Date(c.date).toISOString().split('T')[0],
          type: c.type,
          payload: c.payload || {},
        });
        setLoading(false);
      });
  }, [params.id]);

  async function handleSave() {
    setSaving(true);
    const res = await fetch(`/api/challenges/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      toast.success('Challenge saved');
      router.push('/challenges');
    } else {
      toast.error('Failed to save');
      setSaving(false);
    }
  }

  async function handleDelete() {
    setDeleting(true);
    await fetch(`/api/challenges/${params.id}`, { method: 'DELETE' });
    toast.success('Challenge deleted');
    router.push('/challenges');
  }

  if (loading) {
    return (
      <AdminShell>
        <PageHeader title="Edit Challenge" breadcrumbs={[{ label: 'Challenges', href: '/challenges' }, { label: 'Edit' }]} />
        <div className="max-w-5xl space-y-4">
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </AdminShell>
    );
  }

  return (
    <AdminShell>
      <PageHeader
        title="Edit Challenge"
        breadcrumbs={[
          { label: 'Challenges', href: '/challenges' },
          { label: 'Edit' },
        ]}
      />

      <div className="max-w-5xl">
        <Card className="p-6 lg:p-8">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Date"
                type="date"
                value={data.date}
                onChange={(e) => setData({ ...data, date: e.target.value })}
              />
              <Select
                label="Type"
                value={data.type}
                onChange={(e) => setData({ ...data, type: e.target.value, payload: {} })}
                options={[
                  { value: 'QUICK_QUIZ', label: 'Quick Quiz' },
                  { value: 'MEMORY_TEST', label: 'Memory Test' },
                  { value: 'FUN_FACT', label: 'Fun Fact' },
                  { value: 'WORD_OF_THE_DAY', label: 'Word of the Day' },
                ]}
                leftIcon={<Layers className="h-4 w-4" />}
              />
            </div>

            <div className="border-t border-gray-100 pt-6">
              <ChallengePayloadEditor type={data.type} payload={data.payload} onChange={(p) => setData({ ...data, payload: p })} />
            </div>

            <div className="flex pt-4 border-t border-gray-100 justify-between items-center">
              <Button 
                variant="ghost" 
                onClick={() => setShowDelete(true)} 
                className="text-red-500 hover:bg-red-50 hover:text-red-600"
                icon={<Trash2 className="h-4 w-4" />}
              >
                Delete
              </Button>
              <Button onClick={handleSave} loading={saving} icon={<Save className="h-4 w-4" />}>
                Save Changes
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <ConfirmDialog
        open={showDelete}
        title="Delete Challenge"
        message="This will permanently delete this challenge. This action cannot be undone."
        confirmLabel="Delete"
        variant="danger"
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setShowDelete(false)}
      />
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
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
          <span className="w-1 h-4 bg-teal-500 rounded-full"></span>
          Word of the Day
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Arabic" value={(payload.wordArabic as string) || ''} onChange={(e) => onChange({ ...payload, wordArabic: e.target.value })} dir="rtl" className="text-xl" />
          <Input label="Transliteration" value={(payload.wordTransliteration as string) || ''} onChange={(e) => onChange({ ...payload, wordTransliteration: e.target.value })} />
        </div>
        <Input label="Meaning" value={(payload.wordMeaning as string) || ''} onChange={(e) => onChange({ ...payload, wordMeaning: e.target.value })} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             <div className="md:col-span-2">
                 <Input label="Fact" value={(payload.fact as string) || ''} onChange={(e) => onChange({ ...payload, fact: e.target.value })} />
             </div>
             <Input label="Frequency" value={String(payload.frequency || '')} onChange={(e) => onChange({ ...payload, frequency: Number(e.target.value) })} type="number" />
        </div>
      </div>
    );
  }

  if (type === 'MEMORY_TEST') {
     const options = (payload.options as string[]) || ['', '', '', ''];
    return (
      <div className="space-y-4">
         <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
          <span className="w-1 h-4 bg-teal-500 rounded-full"></span>
          Memory Test
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <Input label="Arabic" value={(payload.wordArabic as string) || ''} onChange={(e) => onChange({ ...payload, wordArabic: e.target.value })} dir="rtl" className="text-xl" />
           <Input label="Transliteration" value={(payload.wordTransliteration as string) || ''} onChange={(e) => onChange({ ...payload, wordTransliteration: e.target.value })} />
        </div>
        <Input label="Question" value={(payload.question as string) || ''} onChange={(e) => onChange({ ...payload, question: e.target.value })} />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Options (Select the correct answer)</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {options.map((opt: string, i: number) => {
             const isSelected = (payload.correctIndex as number) === i;
             return (
              <div 
                key={i} 
                onClick={() => onChange({ ...payload, correctIndex: i })}
                className={`relative flex items-center gap-3 p-3 border rounded-xl transition-all cursor-pointer group ${
                  isSelected 
                  ? 'border-teal-500 bg-teal-50/50 ring-1 ring-teal-500 shadow-[0_2px_8px_rgba(20,184,166,0.15)]' 
                  : 'border-gray-200 bg-white hover:border-teal-300 hover:shadow-md'
                }`}
              >
                <div className={`
                  flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold transition-colors
                  ${isSelected ? 'bg-teal-500 text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-teal-100 group-hover:text-teal-600'}
                `}>
                  {String.fromCharCode(65 + i)}
                </div>
                
                <input 
                  value={opt} 
                  onChange={(e) => { const o = [...options]; o[i] = e.target.value; onChange({ ...payload, options: o }); }} 
                  className="flex-1 bg-transparent border-none text-sm focus:ring-0 p-0 placeholder:text-gray-400 font-medium text-gray-900" 
                  placeholder={`Option ${i + 1}`} 
                />
                
                {isSelected && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-teal-600 animate-in fade-in zoom-in spin-in-12 duration-300">
                    <Check className="h-4 w-4" strokeWidth={3} />
                  </div>
                )}
                
                {/* Hidden radio for semantic correctness */}
                <input 
                   type="radio" 
                   name="correct" 
                   checked={isSelected} 
                   onChange={() => {}} 
                   className="hidden" 
                />
              </div>
            );
          })}
          </div>
        </div>
      </div>
    );
  }

  if (type === 'FUN_FACT') {
    return (
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
          <span className="w-1 h-4 bg-teal-500 rounded-full"></span>
          Fun Fact
        </h3>
        <Input label="Headline" value={(payload.headline as string) || ''} onChange={(e) => onChange({ ...payload, headline: e.target.value })} />
        <Textarea label="Fact Body" value={(payload.fact as string) || ''} onChange={(e) => onChange({ ...payload, fact: e.target.value })} rows={4} />
      </div>
    );
  }

  if (type === 'QUICK_QUIZ') {
    const options = (payload.options as string[]) || ['', '', '', ''];
    return (
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
          <span className="w-1 h-4 bg-teal-500 rounded-full"></span>
          Quick Quiz
        </h3>
        <Input label="Question" value={(payload.question as string) || ''} onChange={(e) => onChange({ ...payload, question: e.target.value })} />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Options (Select the correct answer)</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {options.map((opt: string, i: number) => {
             const isSelected = (payload.correctIndex as number) === i;
             return (
              <div 
                key={i} 
                onClick={() => onChange({ ...payload, correctIndex: i })}
                className={`relative flex items-center gap-3 p-3 border rounded-xl transition-all cursor-pointer group ${
                  isSelected 
                  ? 'border-teal-500 bg-teal-50/50 ring-1 ring-teal-500 shadow-[0_2px_8px_rgba(20,184,166,0.15)]' 
                  : 'border-gray-200 bg-white hover:border-teal-300 hover:shadow-md'
                }`}
              >
                <div className={`
                  flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold transition-colors
                  ${isSelected ? 'bg-teal-500 text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-teal-100 group-hover:text-teal-600'}
                `}>
                  {String.fromCharCode(65 + i)}
                </div>
                
                <input 
                  value={opt} 
                  onChange={(e) => { const o = [...options]; o[i] = e.target.value; onChange({ ...payload, options: o }); }} 
                  className="flex-1 bg-transparent border-none text-sm focus:ring-0 p-0 placeholder:text-gray-400 font-medium text-gray-900" 
                  placeholder={`Option ${i + 1}`} 
                />
                
                {isSelected && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-teal-600 animate-in fade-in zoom-in spin-in-12 duration-300">
                    <Check className="h-4 w-4" strokeWidth={3} />
                  </div>
                )}
                
                {/* Hidden radio for semantic correctness */}
                <input 
                   type="radio" 
                   name="correct" 
                   checked={isSelected} 
                   onChange={() => {}} 
                   className="hidden" 
                />
              </div>
            );
          })}
          </div>
        </div>
        <Input label="Correct Meaning (Verification)" value={(payload.correctMeaning as string) || ''} onChange={(e) => onChange({ ...payload, correctMeaning: e.target.value })} />
      </div>
    );
  }

  return null;
}
