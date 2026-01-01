import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

export function createServerSupabase(cookies: any) {
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, { auth: { persistSession: false } });

  // Try common cookie names used by Supabase to hydrate server client
  const possibleNames = ['sb:token', 'supabase-auth-token', 'supabase-session', 'sb-access-token'];
  for (const name of possibleNames) {
    try {
      const cookie = cookies.get?.(name)?.value ?? cookies.get?.(name);
      if (!cookie) continue;
      // Supabase stores JSON in some cookie formats
      let token = cookie;
      try {
        const parsed = JSON.parse(cookie);
        token = parsed?.access_token ?? parsed?.token ?? parsed;
      } catch (e) {
        // not JSON, use raw
      }
      if (typeof token === 'string' && token.length > 0) {
        supabase.auth.setAuth(token);
        break;
      }
    } catch (e) {
      continue;
    }
  }

  return supabase;
}
