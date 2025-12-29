"use client";

import React, { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { deleteContact } from '../app/contacts/actions';
import { useToast, useConfirm } from './Providers';

type Contact = {
  id: string;
  name: string;
  email?: string | null;
  phone?: string | null;
  created_at?: string | null;
};

export default function ContactList({ contacts }: { contacts: Contact[] }) {
  const router = useRouter();
  const { toast } = useToast();
  const { confirm } = useConfirm();

  return (
    <div className="space-y-4">
      {contacts.map((c) => (
        <div key={c.id} className="p-4 bg-white dark:bg-gray-900 rounded shadow flex items-center justify-between">
          <div>
            <div className="font-medium">{c.name}</div>
            <div className="text-sm text-gray-500">{c.email ?? '—'} • {c.phone ?? '—'}</div>
            <div className="text-xs text-gray-400">{c.created_at ? new Date(c.created_at).toLocaleString() : ''}</div>
          </div>
          <div className="flex items-center gap-2">
            <div>
              <button
                className="text-sm text-red-600"
                onClick={async () => {
                  const ok = await confirm(`Delete contact "${c.name}"? This cannot be undone.`);
                  if (!ok) return;
                  try {
                    const fd = new FormData();
                    fd.append('id', c.id);
                    await deleteContact(fd);
                    toast('success', 'Contact deleted');
                    router.refresh();
                  } catch (err: any) {
                    const msg = err?.message || 'Failed to delete contact';
                    toast('error', msg);
                  }
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
