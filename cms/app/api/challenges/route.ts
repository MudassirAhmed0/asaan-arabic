import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const challenges = await prisma.dailyChallenge.findMany({
    orderBy: { date: 'asc' },
  });
  return NextResponse.json(challenges);
}

export async function POST(request: Request) {
  const body = await request.json();
  const challenge = await prisma.dailyChallenge.create({
    data: {
      date: new Date(body.date),
      type: body.type,
      payload: body.payload,
    },
  });
  return NextResponse.json(challenge);
}
