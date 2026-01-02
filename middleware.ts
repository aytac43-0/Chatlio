import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Public and protected routes
const PUBLIC_PATHS = ['/', '/login', '/register'];
const PROTECTED_PATHS = ['/dashboard', '/messages', '/orders', '/automations', '/settings'];

export async function middleware(req: NextRequest) {
  // Skip internals and assets
  const { pathname } = req.nextUrl;
  if (pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname.includes('.')) {
    return NextResponse.next();
  }

  // Simple cookie-based check for Supabase session presence to avoid importing auth-helpers in middleware
  const cookie = req.cookies.get('sb-access-token')?.value || req.cookies.get('supabase-auth-token')?.value || req.cookies.get('sb:token')?.value;
  const hasSession = Boolean(cookie);

  // Redirect authenticated users away from auth pages
  if (hasSession && (pathname === '/login' || pathname === '/register')) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // Redirect unauthenticated users to login when accessing protected routes
  const isProtected = PROTECTED_PATHS.some((p) => pathname === p || pathname.startsWith(p + '/'));
  if (!hasSession && isProtected) {
    const loginUrl = new URL('/login', req.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/messages/:path*', '/orders/:path*', '/automations/:path*', '/settings/:path*', '/login', '/register']
};
