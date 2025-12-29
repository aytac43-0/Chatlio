"use client";

import React, { useState } from 'react';
import ContactList from './ContactList';
import ContactForm from './ContactForm';

type Contact = {
  id: string;
  name: string;
  email?: string | null;
  phone?: string | null;
  notes?: string | null;
  created_at?: string | null;
};

export default function ContactsShell({ contacts }: { contacts: Contact[] }) {
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Contacts</h1>
        <button className="px-3 py-2 bg-primary text-white rounded" onClick={() => setShowForm((s) => !s)}>
          {showForm ? 'Close' : 'Add Contact'}
        </button>
      </div>

      <div className="mt-4">
        {showForm && <ContactForm onClose={() => setShowForm(false)} />}
        <ContactList contacts={contacts} />
      </div>
    </div>
  );
}
