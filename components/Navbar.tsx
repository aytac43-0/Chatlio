"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { useSession } from '../lib/session';
import ThemeToggle from './ThemeToggle';
import { User, LogOut } from 'lucide-react';

export default function Navbar({ initialUser }: { initialUser?: any }) {
  const session = useSession();
  const user = session?.user ?? initialUser ?? null;

  const [open, setOpen] = useState(false);
  const router = useRouter();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-6 justify-between">
        {/* LEFT: Branding */}
        {/* LEFT: Branding */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl hover:opacity-80 transition-opacity">
          <img src="/favicon.png" alt="Chatlio Logo" className="w-8 h-8 object-contain" />
          <span className="text-white">Chatlio</span>
        </Link>

        {/* RIGHT: Actions */}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <ThemeToggle />
              <div className="relative">
                <button
                  onClick={() => setOpen(!open)}
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-muted-foreground hover:text-primary transition-colors ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <User className="h-5 w-5" />
                </button>

                {open && (
                  <div className="absolute right-0 top-full mt-2 w-48 rounded-md border bg-popover p-1 shadow-md animate-in fade-in zoom-in-95 duration-200">
                    <div className="px-2 py-1.5 text-sm font-semibold text-foreground">
                      Profile
                    </div>
                    <div className="h-px bg-muted my-1" />
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center px-2 py-1.5 text-sm rounded-sm hover:bg-accent hover:text-accent-foreground transition-colors text-destructive"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <ThemeToggle />
              <Link href="/login" className="text-sm font-medium hover:text-primary transition-colors">
                Login
              </Link>
              <Link
                href="/register"
                className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
