import { createBrowserClient } from '@supabase/ssr';

// Browser Supabase client using @supabase/ssr helper which wraps the official client.
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

// Note: do not throw during module import so app can build. Missing env vars cause runtime failures.
export const supabase = createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;
