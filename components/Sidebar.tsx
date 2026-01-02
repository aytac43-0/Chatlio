"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from '../lib/session';
import {
  LayoutDashboard,
  MessageSquare,
  ShoppingBag,
  Workflow,
  Settings
} from 'lucide-react';
import { cn } from '@/lib/utils'; // Assuming standard cn utility is available or I will create it.

// Simple utility if we don't assume the project has 'cn' yet, but usually it does with Tailwind.
// I will check utils/index.ts or similar, but for safety I can define a simple helper inside or rely on clsx.
// Actually I'll use template literals to be safe and simple.

const links = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/messages', label: 'Messages', icon: MessageSquare },
  { href: '/orders', label: 'Orders', icon: ShoppingBag },
  { href: '/automations', label: 'Automations', icon: Workflow },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar() {
  const session = useSession();
  const pathname = usePathname();

  // STRICT RULE: Visible ONLY when logged in.
  if (!session?.user) {
    return null;
  }

  return (
    <aside className="fixed left-0 top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-64 border-r bg-background md:block">
      <div className="h-full px-3 py-4 overflow-y-auto">
        <ul className="space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href || pathname?.startsWith(link.href + '/');

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`
                    flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors
                    ${isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                    }
                  `}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
