"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from './Button';
import Input from './Input';
import { createDeal } from '../app/pipeline/actions';
import { useToast } from './Providers';

type Contact = { id: string; name: string };

export default function DealForm({ contacts, onClose }: { contacts: Contact[]; onClose?: ()=>void }) {
  const [title, setTitle] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!title.trim()) return setError('Title is required');
    if (!customerId) return setError('Contact is required');

    setLoading(true);
    try {
      const fd = new FormData();
      fd.append('title', title.trim());
      fd.append('customer_id', customerId);
      if (amount.trim()) fd.append('amount', amount.trim());
      await createDeal(fd);
      router.refresh();
      setTitle('');
      setCustomerId('');
      setAmount('');
      if (onClose) onClose();
      toast('success', 'Deal created');
    } catch (err: any) {
      const msg = err?.message || 'Failed to create deal';
      setError(msg);
      toast('error', msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <Input label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
        <select value={customerId} onChange={(e) => setCustomerId(e.target.value)} className="w-full px-3 py-2 rounded-md border">
          <option value="">Select contact</option>
          {contacts.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>
      <Input label="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
      {error && <p className="text-red-600">{error}</p>}
      <div className="flex gap-2">
        <Button type="submit" disabled={loading}>{loading ? 'Creating...' : 'Create deal'}</Button>
        <Button type="button" variant="ghost" onClick={() => onClose && onClose()}>Cancel</Button>
      </div>
    </form>
  );
}
