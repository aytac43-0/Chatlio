import './globals.css';
import Sidebar from '../components/Sidebar';
import { cookies } from 'next/headers';
import Providers from './providers';
import { createClient } from '../utils/supabase/server';

export const metadata = {
  title: 'Chatlio',
  description: 'WhatsApp-focused Micro-CRM for sellers'
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Create Supabase server client to optionally read session in server-rendered layout
  const cookieStore = cookies();
  const serverSupabase = createClient(cookieStore);
  try {
    await serverSupabase.auth.getSession();
  } catch (e) {
    // swallow errors — layout should render regardless
  }

  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground antialiased">
        <Providers>
          <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 max-w-6xl mx-auto px-4 py-6">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
