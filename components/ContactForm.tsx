"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createContact } from '../app/contacts/actions';
import { useToast } from './Providers';
import Button from './Button';
import Input from './Input';

type Props = {
  onClose?: () => void;
};

export default function ContactForm({ onClose }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!name.trim()) return setError('Name is required');
    if (email && !/\S+@\S+\.\S+/.test(email)) return setError('Invalid email address');

    setLoading(true);
    try {
      const fd = new FormData();
      fd.append('name', name.trim());
      if (email.trim()) fd.append('email', email.trim());
      if (phone.trim()) fd.append('phone', phone.trim());
      if (notes.trim()) fd.append('notes', notes.trim());

      await createContact(fd);
      // Refresh server-rendered data
      router.refresh();
      toast('success', 'Contact added');
      setName('');
      setEmail('');
      setPhone('');
      setNotes('');
      if (onClose) onClose();
    } catch (err: any) {
      const msg = err?.message || 'Failed to create contact';
      setError(msg);
      toast('error', msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <Input label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input label="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full px-3 py-2 rounded-md border border-gray-200" />
      </div>
      {error && <p className="text-red-600">{error}</p>}
      <div className="flex gap-2">
        <Button type="submit" disabled={loading}>{loading ? 'Adding...' : 'Add contact'}</Button>
        <Button type="button" variant="ghost" onClick={() => onClose && onClose()}>Cancel</Button>
      </div>
    </form>
  );
}
