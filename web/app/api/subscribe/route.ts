import { Redis } from '@upstash/redis';
import { NextResponse } from 'next/server';

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const trimmed = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    // Check if already subscribed
    const exists = await redis.sismember('subscribers', trimmed);
    if (exists) {
      return NextResponse.json({ message: 'Already subscribed' });
    }

    // Add to set + store timestamp
    await redis.sadd('subscribers', trimmed);
    await redis.hset(`subscriber:${trimmed}`, {
      email: trimmed,
      subscribedAt: new Date().toISOString(),
    });

    // Get total count
    const count = await redis.scard('subscribers');

    return NextResponse.json({ message: 'Subscribed', count });
  } catch {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const count = await redis.scard('subscribers');
    return NextResponse.json({ count });
  } catch {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
