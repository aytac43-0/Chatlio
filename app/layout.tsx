import './globals.css';
import Navbar from '../components/Navbar';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Providers from './providers';

export const metadata = {
  title: 'Chatlio',
  description: 'WhatsApp-focused Micro-CRM for sellers'
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Create a Supabase server client and get current session so the client
  // SessionContextProvider can hydrate without a flash.
  const serverSupabase = createServerComponentClient({ cookies });
  const {
    data: { session }
  } = await serverSupabase.auth.getSession();

  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground antialiased">
        <Providers session={session}>
          <Navbar />
        </Providers>
        <main className="max-w-6xl mx-auto px-4 py-6">{children}</main>
      </body>
    </html>
  );
}
