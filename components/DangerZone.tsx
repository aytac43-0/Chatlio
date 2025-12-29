"use client";

import React from 'react';
import { deleteAccount } from '../app/settings/actions';
import { useToast, useConfirm } from './Providers';
import { useRouter } from 'next/navigation';
import Button from './Button';

export default function DangerZone() {
  const { toast } = useToast();
  const { confirm } = useConfirm();
  const router = useRouter();

  async function handleDelete() {
    const ok = await confirm('Delete your account and all data? This cannot be undone.');
    if (!ok) return;
    try {
      const fd = new FormData();
      await deleteAccount(fd);
      toast('success', 'Account data deleted. You are signed out.');
      router.push('/');
    } catch (err:any) {
      toast('error', err?.message || 'Failed to delete account');
    }
  }

  return (
    <div className="p-4 border-t">
      <h3 className="font-semibold text-lg">Danger Zone</h3>
      <p className="text-sm text-gray-600">Deleting will remove your profile and app data. The authentication record may still exist; contact support to remove it fully.</p>
      <div className="mt-3">
        <Button variant="danger" onClick={handleDelete}>Delete account</Button>
      </div>
    </div>
  );
}
