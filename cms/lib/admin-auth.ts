import { cookies } from 'next/headers';
import crypto from 'crypto';

const COOKIE_NAME = 'admin_session';
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function getSecret(): string {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) throw new Error('ADMIN_SECRET env var is required');
  return secret;
}

function sign(value: string): string {
  const hmac = crypto.createHmac('sha256', getSecret());
  hmac.update(value);
  return `${value}.${hmac.digest('hex')}`;
}

function verify(signed: string): string | null {
  const idx = signed.lastIndexOf('.');
  if (idx === -1) return null;
  const value = signed.slice(0, idx);
  const expected = sign(value);
  if (signed.length !== expected.length) return null;
  const a = Buffer.from(signed);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return null;
  if (!crypto.timingSafeEqual(a, b)) return null;
  return value;
}

export function verifyPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  if (password.length !== expected.length) return false;
  const a = Buffer.from(password);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export async function createSession(): Promise<void> {
  const jar = await cookies();
  const value = sign(Date.now().toString());
  jar.set(COOKIE_NAME, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: MAX_AGE,
    path: '/',
  });
}

export async function validateSession(): Promise<boolean> {
  const jar = await cookies();
  const cookie = jar.get(COOKIE_NAME);
  if (!cookie) return false;
  return verify(cookie.value) !== null;
}

export async function destroySession(): Promise<void> {
  const jar = await cookies();
  jar.delete(COOKIE_NAME);
}
