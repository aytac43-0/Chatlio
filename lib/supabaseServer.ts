import { createClient } from '../utils/supabase/server';

export function createServerSupabase(cookies: any) {
  return createClient(cookies);
}

export default createServerSupabase;
