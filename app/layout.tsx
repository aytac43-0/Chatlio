import './globals.css';
import { cookies } from 'next/headers';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Providers from './providers';
import { createClient } from '../utils/supabase/server';
import { getCurrentUser } from '../lib/auth.server';

export const metadata = {
  title: 'Chatlio',
  description: 'WhatsApp-focused Micro-CRM for sellers',
  icons: {
    icon: [{ url: '/favicon.png', size: '32x32' }],
    apple: '/favicon.png'
  }
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const serverSupabase = createClient(cookieStore);
  let user = null;

  try {
    user = await getCurrentUser();
    // Refresh session if needed
    await serverSupabase.auth.getSession();
  } catch (e) {
    // ignore
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased text-foreground">
        <Providers>
          <div className="relative flex min-h-screen flex-col">
            <Navbar initialUser={user} />
            <div className="flex flex-1">
              {/* Sidebar is self-managed but we render it here. 
                  It returns null if no session on client, effectively hidden.
                  But for server rendering layout shift prevention, we might want to condition it here too if possible,
                  but user prop is reliable enough for the padding logic.
              */}
              <Sidebar />

              <main className={`flex-1 ${user ? 'md:pl-64' : ''}`}>
                <div className="container py-6">
                  {children}
                </div>
              </main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
