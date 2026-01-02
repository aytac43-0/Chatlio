"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';

type SessionState = {
  session: any | null;
  user: any | null;
};

const SessionContext = createContext<SessionState>({ session: null, user: null });

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<SessionState>({ session: null, user: null });

  useEffect(() => {
    let mounted = true;

    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
    );

    async function init() {
      try {
        const { data } = await supabase.auth.getSession();
        if (!mounted) return;
        setState({ session: data.session ?? null, user: data.session?.user ?? null });
      } catch (e) {
        // ignore
      }

      const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
        setState({ session: session ?? null, user: session?.user ?? null });
      });

      return () => {
        mounted = false;
        sub.subscription?.unsubscribe?.();
      };
    }

    const cleanup = init();
    return () => {
      cleanup && (cleanup as any)();
      mounted = false;
    };
  }, []);

  return <SessionContext.Provider value={state}>{children}</SessionContext.Provider>;
}

export function useSession() {
  return useContext(SessionContext);
}

export function useUser() {
  const s = useContext(SessionContext);
  return s?.user ?? null;
}
