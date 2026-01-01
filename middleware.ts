import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

// Public and protected routes
const PUBLIC_PATHS = ['/', '/login', '/register'];
const PROTECTED_PATHS = ['/dashboard', '/clients', '/pipelines'];

export async function middleware(req: NextRequest) {
  // Skip next internals and API
  const { pathname } = req.nextUrl;
  if (pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname.includes('.')) {
    return NextResponse.next();
  }

  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const { data } = await supabase.auth.getSession();
  const session = data.session;

  // If user is authenticated and is on auth pages, send to dashboard
  if (session && PUBLIC_PATHS.includes(pathname) && (pathname === '/login' || pathname === '/register')) {
    const url = new URL('/dashboard', req.url);
    return NextResponse.redirect(url);
  }

  // If not authenticated and trying to access protected routes, redirect to login with from
  const isProtected = PROTECTED_PATHS.some((p) => pathname === p || pathname.startsWith(p + '/'));
  if (!session && isProtected) {
    if (pathname !== '/login') {
      const loginUrl = new URL('/login', req.url);
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  return res;
}

export const config = {
  matcher: ['/dashboard/:path*', '/clients/:path*', '/pipelines/:path*', '/login', '/register']
};
