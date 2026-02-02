import { NextRequest, NextResponse } from 'next/server';
import { verifyPassword, createSession, destroySession } from '@/lib/admin-auth';

export async function POST(request: NextRequest) {
  const contentType = request.headers.get('content-type') || '';

  // Handle logout via form POST with _method=DELETE
  if (contentType.includes('form')) {
    const formData = await request.formData();
    if (formData.get('_method') === 'DELETE') {
      await destroySession();
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  const body = await request.json();
  const { password } = body;

  if (!password || !verifyPassword(password)) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  }

  await createSession();
  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  await destroySession();
  return NextResponse.json({ ok: true });
}
