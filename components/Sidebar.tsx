"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import { useSession } from '../lib/session';
import { createBrowserClient } from '@supabase/ssr';
import {
  Home,
  Briefcase,
  MessageSquare,
  Zap,
  Settings as SettingsIcon,
  LogOut,
  LogIn,
  UserPlus,
  PlusCircle
} from 'lucide-react';

function Icon({ children }: { children: React.ReactNode }) {
  return <span className="w-5 h-5 inline-flex items-center justify-center">{children}</span>;
}

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const session = useSession();
  const user = session?.user ?? null;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push('/login');
  }

  return (
    <>
      <aside className="w-72 p-4 hidden md:block" aria-label="Sidebar">
        <div className="space-y-6">
        <nav className="flex flex-col space-y-1">
          {user ? (
            <>
              <SidebarLink href="/dashboard" label="Dashboard" active={pathname === '/dashboard'}>
                <Icon><Home className="w-5 h-5" /></Icon>
              </SidebarLink>

              <SidebarLink href="/messages" label="Messages" active={pathname?.startsWith('/messages')}>
                <Icon><MessageSquare className="w-5 h-5" /></Icon>
              </SidebarLink>

              <SidebarLink href="/orders" label="Orders" active={pathname?.startsWith('/orders')}>
                <Icon><Briefcase className="w-5 h-5" /></Icon>
              </SidebarLink>

              <SidebarLink href="/automations" label="Automations" active={pathname?.startsWith('/automations')}>
                <Icon><Zap className="w-5 h-5" /></Icon>
              </SidebarLink>

              <SidebarLink href="/settings" label="Settings" active={pathname?.startsWith('/settings')}>
                <Icon><SettingsIcon className="w-5 h-5" /></Icon>
              </SidebarLink>

              <div className="px-3 py-2">
                <button onClick={handleLogout} className="flex items-center gap-3 text-sm text-gray-300 hover:text-primary">
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </>
          ) : null}
        </nav>
        </div>
      </aside>

      {/* Mobile drawer button + drawer */}
      <div className="md:hidden">
        <button aria-label="Open menu" onClick={() => setMobileOpen(true)} className="fixed top-4 left-4 z-40 p-2 bg-white dark:bg-gray-800 rounded shadow">☰</button>
        {mobileOpen && (
          <div className="fixed inset-0 z-50 flex">
            <div className="w-64 p-4 bg-white dark:bg-gray-900 border-r">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-500 rounded flex items-center justify-center text-white font-bold">C</div>
                  <div>
                    <div className="text-lg font-semibold text-foreground">Chatlio</div>
                    <div className="text-xs text-muted-foreground">Premium</div>
                  </div>
                </div>
                <button onClick={() => setMobileOpen(false)} className="px-2">✕</button>
              </div>
              <nav className="flex flex-col space-y-1">
                <SidebarLink href="/dashboard" label="Dashboard" active={pathname === '/dashboard'}>
                  <Icon><Home className="w-5 h-5" /></Icon>
                </SidebarLink>
                <SidebarLink href="/messages" label="Messages" active={pathname?.startsWith('/messages')}>
                  <Icon><MessageSquare className="w-5 h-5" /></Icon>
                </SidebarLink>
                <SidebarLink href="/orders" label="Orders" active={pathname?.startsWith('/orders')}>
                  <Icon><Briefcase className="w-5 h-5" /></Icon>
                </SidebarLink>
                <SidebarLink href="/automations" label="Automations" active={pathname?.startsWith('/automations')}>
                  <Icon><Zap className="w-5 h-5" /></Icon>
                </SidebarLink>
                <SidebarLink href="/settings" label="Settings" active={pathname?.startsWith('/settings')}>
                  <Icon><SettingsIcon className="w-5 h-5" /></Icon>
                </SidebarLink>
                <div className="px-3 py-2">
                  <button onClick={handleLogout} className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300 hover:text-primary">
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </nav>
            </div>
            <div className="flex-1" onClick={() => setMobileOpen(false)} />
          </div>
        )}
      </div>
    </>
  );
}

function SidebarLink({ href, label, children, active, external }: { href: string; label: string; children: React.ReactNode; active?: boolean; external?: boolean }) {
  const base = 'flex items-center gap-3 px-3 py-2 rounded text-gray-200';
  const activeClasses = active ? 'bg-white/5 text-primary' : 'hover:bg-white/3 hover:text-primary';

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={`group ${base} ${activeClasses}`}>
        {children}
        <span className="text-sm">{label}</span>
      </a>
    );
  }

  return (
    <Link href={href} className={`group ${base} ${activeClasses}`}>
      <motion.div
        initial={{ opacity: 0.95 }}
        whileHover={{ x: 6 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className="flex items-center gap-3 w-full"
      >
        {children}
        <span className="text-sm">{label}</span>
      </motion.div>
    </Link>
  );
}
