import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // /films → /
  if (pathname === '/films') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // /films/123 → /movie/123
  const filmsMatch = pathname.match(/^\/films\/(\d+)$/);
  if (filmsMatch) {
    return NextResponse.redirect(new URL(`/movie/${filmsMatch[1]}`, request.url));
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
