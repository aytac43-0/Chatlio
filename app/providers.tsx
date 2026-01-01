"use client";

import React from 'react';
import { Providers as UIProviders } from '../components/Providers';
import { ThemeProvider } from '../lib/theme';
import { SessionProvider } from '../lib/session';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider>
        <UIProviders>{children}</UIProviders>
      </ThemeProvider>
    </SessionProvider>
  );
}
