import { cookies } from 'next/headers';
import { createServerSupabase } from './supabaseServer';

/**
 * Server-only auth helpers. Use from Server Components only.
 */
export async function getCurrentSession() {
  try {
    const serverSupabase = createServerSupabase(cookies());
    const { data } = await serverSupabase.auth.getSession();
    return data.session ?? null;
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
