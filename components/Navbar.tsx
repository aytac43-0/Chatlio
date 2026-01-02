"use client";
import Link from 'next/link';
import { useState } from 'react';
import ThemeToggle from './ThemeToggle';
import { useRouter } from 'next/navigation';
import { useSession } from '../lib/session';
import { createBrowserClient } from '@supabase/ssr';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const session = useSession();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push('/login');
  }

  const user = session?.user ?? null;

  return (
    <nav className="w-full border-b bg-white dark:bg-background-dark">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-end">
        <div className="flex items-center gap-3">
          {user ? (
            <div className="relative">
              <button className="w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-700" aria-label="User menu" onClick={() => setOpen(!open)} />
              {open && (
                <div className="absolute right-0 mt-2 bg-white dark:bg-gray-800 border rounded shadow p-2">
                  <div className="px-2 py-1"><ThemeToggle /></div>
                  <button className="block w-full text-left px-2 py-1 hover:bg-gray-50 dark:hover:bg-gray-700" onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login"><span className="text-sm px-3 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800">Login</span></Link>
              <Link href="/register"><span className="text-sm px-3 py-1 rounded bg-primary text-white hover:opacity-90">Register</span></Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
