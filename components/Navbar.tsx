"use client";
import Link from 'next/link';
import Image from 'next/image';
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
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/">
            <div className="flex items-center gap-2">
              <Image src="/logo.svg" alt="Chatlio" width={36} height={36} />
              <span className="font-bold text-lg text-foreground">Chatlio</span>
            </div>
          </Link>
          <div className="hidden md:flex gap-6 ml-6 items-center">
            <Link href="/dashboard"><span className="text-sm hover:text-primary">Dashboard</span></Link>
            <Link href="/contacts"><span className="text-sm hover:text-primary">Contacts</span></Link>
            <Link href="/pipeline"><span className="text-sm hover:text-primary">Deals</span></Link>
            <Link href="/reminders"><span className="text-sm hover:text-primary">Reminders</span></Link>
            <Link href="/settings"><span className="text-sm hover:text-primary">Settings</span></Link>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <div className="relative">
            {user ? (
              <div className="flex items-center gap-2">
                <button className="w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-700" aria-label="User menu" onClick={() => setOpen(!open)} />
                {open && (
                  <div className="absolute right-0 mt-2 bg-white dark:bg-gray-800 border rounded shadow p-2">
                    <button className="block w-full text-left px-2 py-1 hover:bg-gray-50 dark:hover:bg-gray-700" onClick={() => router.push('/settings')}>Settings</button>
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
      </div>
    </nav>
  );
}
