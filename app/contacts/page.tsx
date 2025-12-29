import React, { useState } from 'react';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import ContactList from '../../components/ContactList';
import ContactForm from '../../components/ContactForm';

type Contact = {
  id: string;
  name: string;
  email?: string | null;
  phone?: string | null;
  notes?: string | null;
  created_at?: string | null;
};

export default async function ContactsPage() {
  const supabase = createServerComponentClient({ cookies });

  const { data, error } = await supabase
    .from('customers')
    .select('id, name, email, phone, notes, created_at')
    .order('created_at', { ascending: false });

  const contacts: Contact[] = (data ?? []).map((c: any) => ({
    id: c.id,
    name: c.name,
    email: c.email,
    phone: c.phone,
    notes: c.notes,
    created_at: c.created_at ? new Date(c.created_at).toISOString() : null
  }));

  const [showForm, setShowForm] = useState(false as boolean);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Contacts</h1>
        <button
          className="px-3 py-2 bg-primary text-white rounded"
          onClick={() => setShowForm((s) => !s)}
        >
          Add Contact
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded">Failed to load contacts. Please refresh.</div>
      )}

      {contacts.length === 0 ? (
        <div className="p-6 bg-white dark:bg-gray-900 rounded shadow">
          <p className="text-lg">You don’t have any contacts yet.</p>
          <div className="mt-4">
            <ContactForm onClose={() => { /* nothing - client will refresh */ }} />
          </div>
        </div>
      ) : (
        <div>
          <ContactList contacts={contacts} />
        </div>
      )}
    </div>
  );
}
