import { NextRequest, NextResponse } from 'next/server';

const COOKIE_NAME = 'admin_session';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/login' || pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }

  const cookie = request.cookies.get(COOKIE_NAME);

  if (!cookie) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Cookie existence check only — signature validation happens in API routes
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
