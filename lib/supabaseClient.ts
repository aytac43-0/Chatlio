import { createClient } from '@supabase/supabase-js';

// Browser Supabase client. Uses public anon key only (never use service_role in browser).
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

// Note: we intentionally do not throw during module import so the app can build.
// Missing env vars will cause runtime failures which are easier to diagnose in local/dev.
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    detectSessionInUrl: true
  }
});
