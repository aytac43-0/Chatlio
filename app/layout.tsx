import './globals.css';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { cookies } from 'next/headers';
import Providers from './providers';
import { createClient } from '../utils/supabase/server';
import { getCurrentUser } from '../lib/auth.server';

export const metadata = {
  title: 'Chatlio',
  description: 'WhatsApp-focused Micro-CRM for sellers'
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Create Supabase server client to optionally read session in server-rendered layout
  const cookieStore = cookies();
  const serverSupabase = createClient(cookieStore);
  let user = null;
  try {
    // Prefer using server helper to resolve current user for conditional rendering
    user = await getCurrentUser();
    await serverSupabase.auth.getSession();
  } catch (e) {
    // swallow errors — layout should render regardless
  }

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/svg+xml" href="/logo.svg" />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex flex-1">
              {user ? <Sidebar /> : null}
              <main className="flex-1 max-w-6xl mx-auto px-4 py-6">{children}</main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
