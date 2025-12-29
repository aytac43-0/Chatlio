import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

/**
 * Server-only auth helpers. Use from Server Components only.
 */
export async function getCurrentSession() {
  try {
    const serverSupabase = createServerComponentClient({ cookies });
    const {
      data: { session }
    } = await serverSupabase.auth.getSession();
    return session ?? null;
  } catch (err) {
    console.error('getCurrentSession error', err);
    return null;
  }
}

export async function getCurrentUser() {
  const session = await getCurrentSession();
  return session?.user ?? null;
}

export async function requireAuth() {
  const user = await getCurrentUser();
  return user ?? null;
}

export default {
  getCurrentSession,
  getCurrentUser,
  requireAuth
};
