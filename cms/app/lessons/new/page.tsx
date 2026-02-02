'use client';

import AdminShell from '@/components/AdminShell';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import PageHeader from '@/components/ui/PageHeader';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Checkbox from '@/components/ui/Checkbox';
import { Plus, ListOrdered, Type, AlignLeft, Hash } from 'lucide-react';

export default function NewLessonPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    const form = new FormData(e.currentTarget);
    const data = {
      title: form.get('title'),
      subtitle: form.get('subtitle'),
      orderIndex: Number(form.get('orderIndex')),
      wordCount: Number(form.get('wordCount')),
      isPublished: form.get('isPublished') === 'on',
    };

    const res = await fetch('/api/lessons', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      const lesson = await res.json();
      toast.success('Lesson created');
      router.push(`/lessons/${lesson.id}`);
    } else {
      toast.error('Failed to create lesson');
      setSaving(false);
    }
  }

  return (
    <AdminShell>
      <PageHeader
        title="New Lesson"
        breadcrumbs={[
          { label: 'Lessons', href: '/lessons' },
          { label: 'New' },
        ]}
      />
      <div className="max-w-5xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Card className="p-6 lg:p-8">
            <h2 className="text-lg font-bold text-gray-900 mb-1">General Details</h2>
            <p className="text-sm text-gray-500 mb-6">Target words and basic lesson information.</p>
            
            <div className="space-y-6 max-w-5xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input 
                  label="Order Index" 
                  name="orderIndex" 
                  type="number" 
                  required 
                  leftIcon={<ListOrdered className="h-4 w-4" />}
                />
                <Input
                  label="Title"
                  name="title"
                  required
                  placeholder="e.g., Words You Already Know"
                  leftIcon={<Type className="h-4 w-4" />}
                />
              </div>
              
              <Input
                label="Subtitle"
                name="subtitle"
                required
                placeholder="e.g., Today: Mercy, Patience, and words from your duas"
                leftIcon={<AlignLeft className="h-4 w-4" />}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input 
                  label="Target Word Count" 
                  name="wordCount" 
                  type="number" 
                  defaultValue={5} 
                  required 
                  leftIcon={<Hash className="h-4 w-4" />}
                />
                
                <div className="flex items-center h-full pt-6">
                  <Checkbox name="isPublished" label="Publish immediately" />
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex justify-end">
              <Button type="submit" loading={saving} icon={<Plus className="h-4 w-4" />}>
                Create Lesson
              </Button>
            </div>
          </Card>
        </form>
      </div>
    </AdminShell>
  );
}
