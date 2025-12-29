"use client";

import React, { useState } from 'react';
import { changePassword } from '../app/settings/actions';
import { useToast } from './Providers';
import Button from './Button';
import Input from './Input';
import { useRouter } from 'next/navigation';

export default function SecurityForm() {
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append('current', current);
      fd.append('next', next);
      await changePassword(fd);
      toast('success', 'Password changed');
      router.refresh();
    } catch (err: any) {
      toast('error', err?.message || 'Failed to change password');
    } finally { setLoading(false); }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <Input label="Current password" type="password" value={current} onChange={(e) => setCurrent(e.target.value)} />
      <Input label="New password" type="password" value={next} onChange={(e) => setNext(e.target.value)} />
      <div className="flex gap-2">
        <Button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Change password'}</Button>
      </div>
    </form>
  );
}
