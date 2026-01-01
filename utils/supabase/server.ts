import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';

export function createClient(cookieStore?: any) {
  const store = cookieStore ?? cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          try {
            const v = store.get?.(name)?.value ?? store.get?.(name);
            return v;
          } catch (e) {
            return undefined;
          }
        },
        set(name: string, value: string, options: any) {
          try {
            store.set?.({ name, value, ...options });
          } catch (e) {
            // ignore
          }
        },
        remove(name: string, options: any) {
          try {
            // next/headers cookies does not have a dedicated remove API; set empty
            store.set?.({ name, value: '', ...options });
          } catch (e) {
            // ignore
          }
        }
      }
    }
  );
}

export default createClient;
