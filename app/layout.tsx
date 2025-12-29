import './globals.css';
import Navbar from '../components/Navbar';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Providers from '../components/Providers';

export const metadata = {
  title: 'Chatlio',
  description: 'WhatsApp-focused Micro-CRM for sellers'
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Create a Supabase server client and get current user to avoid client-side flicker.
  const serverSupabase = createServerComponentClient({ cookies });
  const {
    data: { user }
  } = await serverSupabase.auth.getUser();

  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground antialiased">
        {/* Providers is a client component that provides toast/confirm hooks */}
        <Providers>
          <Navbar user={user ?? null} />
        </Providers>
        <main className="max-w-6xl mx-auto px-4 py-6">{children}</main>
      </body>
    </html>
  );
}
