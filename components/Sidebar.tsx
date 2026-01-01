"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

function Icon({ children }: { children: React.ReactNode }) {
  return <span className="w-5 h-5 inline-flex items-center justify-center">{children}</span>;
}

export default function Sidebar() {
  return (
    <aside className="w-72 bg-white/5 backdrop-blur border-r border-white/5 p-4 hidden md:block">
      <div className="space-y-6">
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-500 rounded flex items-center justify-center text-white font-bold">C</div>
          <div>
            <div className="text-lg font-semibold">Chatlio</div>
            <div className="text-xs text-gray-400">Premium</div>
          </div>
        </div>

        <nav className="flex flex-col space-y-1">
          <SidebarLink href="/dashboard" label="Dashboard">
            <Icon><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5"><path d="M3 13h8V3H3v10zM13 21h8V11h-8v10zM13 3v8h8V3h-8zM3 21h8v-8H3v8z"/></svg></Icon>
          </SidebarLink>

          <SidebarLink href="/business/create" label="Business (Create)">
            <Icon><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5"><path d="M12 2l7 4v6c0 5-3 9-7 10-4-1-7-5-7-10V6l7-4z"/></svg></Icon>
          </SidebarLink>

          <SidebarLink href="/whatsapp" label="WhatsApp">
            <Icon><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5"><path d="M21 12a9 9 0 1 0-2.6 6.1L22 22l-3.9-1.6A9 9 0 0 0 21 12z"/></svg></Icon>
          </SidebarLink>

          <SidebarLink href="https://n8n.io" label="Automation">
            <Icon><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a7 7 0 0 0 0-6"/></svg></Icon>
          </SidebarLink>

          <SidebarLink href="/settings" label="Settings">
            <Icon><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5"><path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/><path d="M19.4 15a1.6 1.6 0 0 0 .3-1l-.2-1 1-1-1-1 .2-1a1.6 1.6 0 0 0-.3-1l-1-1-1 1a7 7 0 0 1-2 0l-1-1-1 1-1 1-1-1-1 1-.2 1 1 1-.2 1a1.6 1.6 0 0 0 .3 1l1 1 1-1a7 7 0 0 1 2 0l1 1 1-1 1 1z"/></svg></Icon>
          </SidebarLink>
        </nav>
      </div>
    </aside>
  );
}

function SidebarLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="group">
      <motion.div
        initial={{ opacity: 0.9 }}
        whileHover={{ x: 6 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className="flex items-center gap-3 px-3 py-2 rounded hover:bg-white/3 text-gray-200"
      >
        {children}
        <span className="text-sm">{label}</span>
      </motion.div>
    </Link>
  );
}
