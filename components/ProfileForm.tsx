"use client";

import React, { useState } from 'react';
import { updateProfile } from '../app/settings/actions';
import { useToast, useConfirm } from './Providers';
import Button from './Button';
import Input from './Input';
import { useRouter } from 'next/navigation';

export default function ProfileForm({ profile }: { profile: any }) {
  const [fullName, setFullName] = useState(profile?.full_name ?? '');
  const [username, setUsername] = useState(profile?.username ?? '');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append('full_name', fullName);
      fd.append('username', username);
      await updateProfile(fd);
      toast('success', 'Profile updated');
      router.refresh();
    } catch (err: any) {
      toast('error', err?.message || 'Failed to update profile');
    } finally { setLoading(false); }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <Input label="Full name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
      <Input label="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
      <div className="flex gap-2">
        <Button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save'}</Button>
      </div>
    </form>
  );
}
