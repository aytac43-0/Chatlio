import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PROTECTED_PATHS = ['/dashboard', '/messages', '/orders', '/automations', '/settings'];
const AUTH_PATHS = ['/login', '/register'];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1. Check for session cookie
  // Supabase auth helpers usually set 'sb-{project-ref}-auth-token'
  // But strictly looking for ANY indication of session is safer for the "first load" requirement.
  // We can look for several possible cookie names used by Supabase implementations or our specific one.
  // The safest bet without exact project ref is checking for standard ones.
  // However, since we are doing a RESET, let's assume we use the standard `sb-access-token` or similar if configured manually,
  // OR rely on the fact that `createClient` manages this.
  // BUT middleware needs to be fast and not always instantiate a full client if we can avoid it.
  // Let's check for the presence of the cookie identifying the session.

  // Checking all likely candidates to be safe.
  const hasSession =
    req.cookies.has('sb-access-token') ||
    req.cookies.has('supabase-auth-token') ||
    [...req.cookies.getAll()].some(c => c.name.startsWith('sb-') && c.name.endsWith('-auth-token'));

  // 2. Strict Redirect Rules

  // Rule: Logged in -> /login or /register -> Redirect to /dashboard
  if (hasSession && (AUTH_PATHS.some(p => pathname.startsWith(p)) || pathname === '/')) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // Rule: Not logged in -> /dashboard, /messages etc -> Redirect to /login
  if (!hasSession && PROTECTED_PATHS.some(p => pathname.startsWith(p))) {
    const loginUrl = new URL('/login', req.url);
    // loginUrl.searchParams.set('from', pathname); // Optional: keep return url
    return NextResponse.redirect(loginUrl);
  }

  // Allow all others
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
