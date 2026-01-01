import { supabase } from './supabaseClient';
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';

/**
 * Check if a username is available (case-insensitive).
 * Returns true when available, false when taken.
 */
export async function checkUsernameAvailable(username: string): Promise<boolean> {
  const clean = username.trim();
  if (!clean) return false;

  try {
    // Use ILIKE to perform a case-insensitive exact match (no wildcards).
    const { data, error } = await supabase
      .from('profiles')
      .select('id', { count: 'exact' })
      .ilike('username', clean)
      .limit(1);

    if (error) {
      // Log (server-side) and return false to indicate not available for safety.
      console.error('checkUsernameAvailable error:', error);
      throw new Error('Unable to verify username availability. Please try again.');
    }

    return !(data && data.length > 0);
  } catch (err) {
    throw err;
  }
}

type SignUpParams = {
  email: string;
  password: string;
  fullName: string;
  username: string;
};

/**
 * Create a Supabase auth user and corresponding profiles row.
 * - honors RLS (uses anon client)
 * - checks username availability (case-insensitive)
 * - does NOT use service-role key
 *
 * On success returns the auth user object. On failure throws an Error with a user-friendly message.
 */
export async function signUpWithProfile(params: SignUpParams) {
  const { email, password, fullName, username } = params;

  // Basic validation
  if (!email || !password || !username) {
    throw new Error('Missing required signup information.');
  }

  const available = await checkUsernameAvailable(username);
  if (!available) {
    throw new Error('That username is already taken. Please choose another.');
  }

  // Create auth user
  try {
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        // store some basic metadata on the auth user (optional)
        data: { full_name: fullName, username }
      }
    });

    if (signUpError) {
      console.error('supabase.signUp error:', signUpError);
      // Map common errors to friendly messages
      const msg = signUpError.message || 'Unable to create account. Please try again.';
      throw new Error(msg);
    }

    const user = data?.user;
    if (!user || !user.id) {
      throw new Error('Account created but no user id returned. Please contact support.');
    }

    // Insert profile row using the auth user id. Do not bypass RLS.
    const profileRow = {
      id: user.id,
      email,
      full_name: fullName,
      username,
      role: 'user'
    };

    const { error: insertError } = await supabase.from('profiles').insert(profileRow);
    if (insertError) {
      console.error('profiles.insert error:', insertError);
      // At this point the auth user exists. We cannot delete the auth user without a service role key.
      // Provide a helpful error so the user can retry or contact support.
      throw new Error('Account created but failed to create profile. If this persists, contact support.');
    }

    return user;
  } catch (err: any) {
    // Re-throw Error with friendly message
    if (err instanceof Error) throw err;
    throw new Error('Sign up failed. Please try again.');
  }
}

export default {
  checkUsernameAvailable,
  signUpWithProfile
};

/**
 * Server-side helper: get current session (server components)
 * Returns session or null. Safe to call from server components.
 */
export async function getCurrentSession() {
  try {
    const cookieStore = cookies();
    const serverSupabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
          set(name: string, value: string, options: any) {
            try { cookieStore.set({ name, value, ...options }); } catch (e) {}
          },
          remove(name: string, options: any) {
            try { cookieStore.set({ name, value: '', ...options }); } catch (e) {}
          }
        }
      }
    );
    const { data } = await serverSupabase.auth.getSession();
    return data.session ?? null;
  } catch (err) {
    console.error('getCurrentSession error', err);
    return null;
  }
}

/**
 * Server-side helper: get current user or null
 */
export async function getCurrentUser() {
  const session = await getCurrentSession();
  return session?.user ?? null;
}

/**
 * Helper to require auth in server components. Returns user or null (does not throw).
 */
export async function requireAuth() {
  const user = await getCurrentUser();
  return user ?? null;
}

