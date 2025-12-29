"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createReminder } from '../app/reminders/actions';
import { useToast } from './Providers';

export default function ReminderForm({ contacts, onClose }: { contacts: { id: string; name: string }[]; onClose?: ()=>void }) {
  const [customerId, setCustomerId] = useState('');
  const [note, setNote] = useState('');
  const [dueAt, setDueAt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!customerId) return setError('Contact is required');
    if (!note.trim()) return setError('Note is required');

    setLoading(true);
    try {
      const fd = new FormData();
      fd.append('customer_id', customerId);
      fd.append('note', note.trim());
      if (dueAt) fd.append('due_at', dueAt);
      await createReminder(fd);
      router.refresh();
      toast('success', 'Reminder created');
      if (onClose) onClose();
    } catch (err: any) {
      const msg = err?.message || 'Failed to create reminder';
      setError(msg);
      toast('error', msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
        <select value={customerId} onChange={(e) => setCustomerId(e.target.value)} className="w-full px-3 py-2 rounded-md border">
          <option value="">Select contact</option>
          {contacts.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Note</label>
        <textarea value={note} onChange={(e) => setNote(e.target.value)} className="w-full px-3 py-2 rounded-md border" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Due date</label>
        <input type="datetime-local" value={dueAt} onChange={(e) => setDueAt(e.target.value)} className="w-full px-3 py-2 rounded-md border" />
      </div>
      {error && <p className="text-red-600">{error}</p>}
      <div className="flex gap-2">
        <button className="px-3 py-2 bg-primary text-white rounded" type="submit" disabled={loading}>{loading ? 'Creating...' : 'Create'}</button>
        <button type="button" className="px-3 py-2 border rounded" onClick={() => onClose && onClose()}>Cancel</button>
      </div>
    </form>
  );
}
