import './globals.css';
import Navbar from '../components/Navbar';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import Providers from './providers';

export const metadata = {
  title: 'Chatlio',
  description: 'WhatsApp-focused Micro-CRM for sellers'
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Create Supabase server client to optionally read session in server-rendered layout
  const cookieStore = cookies();
  const serverSupabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          try { cookieStore.set({ name, value, ...options }); } catch (e) {}
        },
        remove(name: string, options: any) {
          try { cookieStore.set({ name, value: '', ...options }); } catch (e) {}
        }
      }
    }
  );
  try {
    await serverSupabase.auth.getSession();
  } catch (e) {
    // swallow errors — layout should render regardless
  }

  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground antialiased">
        <Providers>
          <Navbar />
        </Providers>
        <main className="max-w-6xl mx-auto px-4 py-6">{children}</main>
      </body>
    </html>
  );
}
