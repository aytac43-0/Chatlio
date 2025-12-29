import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

// Paths
const PUBLIC_PATHS = ['/', '/privacy-policy', '/terms-of-service', '/cookie-policy'];
const AUTH_PATHS = ['/login', '/register', '/reset-password'];
const PROTECTED_PATHS = ['/dashboard', '/contacts', '/pipeline', '/reminders', '/settings'];

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // Create Supabase client tied to this request/response
  const supabase = createMiddlewareClient({ req, res });
  const { data } = await supabase.auth.getSession();
  const session = data.session;

  const { pathname } = req.nextUrl;

  // Allow public paths always
  if (PUBLIC_PATHS.includes(pathname)) return res;

  // If user is authenticated and trying to access auth routes, redirect to /dashboard
  if (session && AUTH_PATHS.includes(pathname)) {
    const redirectUrl = new URL('/dashboard', req.url);
    return NextResponse.redirect(redirectUrl);
  }

  // If user not authenticated and trying to access protected routes, redirect to /login
  const isProtected = PROTECTED_PATHS.some((p) => pathname === p || pathname.startsWith(p + '/'));
  if (!session && isProtected) {
    const loginUrl = new URL('/login', req.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return res;
}

export const config = {
  matcher: [
    '/dashboard',
    '/contacts/:path*',
    '/pipeline',
    '/reminders',
    '/settings',
    '/login',
    '/register',
    '/reset-password'
  ]
};
