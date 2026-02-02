'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Badge from '@/components/ui/Badge';

export default function PublishToggle({
  lessonId,
  published,
}: {
  lessonId: string;
  published: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function toggle() {
    setLoading(true);
    const res = await fetch(`/api/lessons/${lessonId}/publish`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isPublished: !published }),
    });

    if (!res.ok) {
      const data = await res.json();
      if (data.issues) {
        toast.error(
          `Cannot publish:\n${data.issues.join('\n')}`,
          { duration: 5000 }
        );
      } else {
        toast.error('Failed to update status');
      }
    } else {
      toast.success(published ? 'Lesson unpublished' : 'Lesson published');
    }

    router.refresh();
    setLoading(false);
  }

  return (
    <button onClick={toggle} disabled={loading} className="transition-opacity disabled:opacity-50">
      <Badge variant={published ? 'green' : 'gray'}>
        {loading ? '...' : published ? 'Published' : 'Draft'}
      </Badge>
    </button>
  );
}
