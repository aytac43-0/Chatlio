"use client";

import React from 'react';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { Providers as UIProviders } from '../components/Providers';
import ThemeProvider from '../lib/theme';

export default function Providers({ children, session }: { children: React.ReactNode; session?: any }) {
  const [supabaseClient] = React.useState(() => createBrowserSupabaseClient());

  return (
    <SessionContextProvider supabaseClient={supabaseClient} initialSession={session}>
      <ThemeProvider>
        <UIProviders>{children}</UIProviders>
      </ThemeProvider>
    </SessionContextProvider>
  );
}
