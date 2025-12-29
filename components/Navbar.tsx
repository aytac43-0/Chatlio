"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import ThemeToggle from './ThemeToggle';
import { supabase } from '../lib/supabaseClient';
import { useRouter } from 'next/navigation';

type Props = {
  user: any | null;
};

export default function Navbar({ user }: Props) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push('/login');
  }

  return (
    <nav className="w-full border-b bg-white dark:bg-black">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/">
            <a className="flex items-center gap-2">
              <Image src="/logo.svg" alt="Chatlio" width={36} height={36} />
              <span className="font-bold text-lg text-darkText">Chatlio</span>
            </a>
          </Link>
          <div className="hidden md:flex gap-3 ml-6">
            <Link href="/dashboard"><a className="text-sm">Dashboard</a></Link>
            <Link href="/contacts"><a className="text-sm">Contacts</a></Link>
            <Link href="/pipeline"><a className="text-sm">Deals</a></Link>
            <Link href="/reminders"><a className="text-sm">Reminders</a></Link>
            <Link href="/settings"><a className="text-sm">Settings</a></Link>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <div className="relative">
            {user ? (
              <div className="flex items-center gap-2">
                <button className="w-9 h-9 rounded-full bg-gray-200" aria-label="User menu" onClick={() => setOpen(!open)} />
                {open && (
                  <div className="absolute right-0 mt-2 bg-white border rounded shadow p-2">
                    <button className="block w-full text-left px-2 py-1" onClick={() => router.push('/settings')}>Settings</button>
                    <button className="block w-full text-left px-2 py-1" onClick={handleLogout}>Logout</button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login"><a className="text-sm">Login</a></Link>
                <Link href="/register"><a className="text-sm">Register</a></Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
