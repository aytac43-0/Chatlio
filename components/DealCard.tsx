"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { updateDealStatus, deleteDeal } from '../app/pipeline/actions';
import { useToast, useConfirm } from './Providers';

type Deal = {
  id: string;
  title: string;
  amount?: number | null;
  status: string;
  customer_name?: string | null;
};

export default function DealCard({ deal }: { deal: Deal }) {
  const router = useRouter();
  const { toast } = useToast();
  const { confirm } = useConfirm();

  return (
    <div className="p-3 bg-white dark:bg-gray-900 rounded shadow mb-3">
      <div className="font-medium">{deal.title}</div>
      <div className="text-sm text-gray-500">{deal.customer_name ?? 'No contact'}</div>
      <div className="text-sm mt-2">{deal.amount != null ? `€${deal.amount}` : ''}</div>

      <div className="mt-3 flex gap-2">
        <div>
          <button
            className="text-sm text-gray-600"
            onClick={async () => {
              try {
                const fd = new FormData();
                fd.append('id', deal.id);
                fd.append('direction', 'backward');
                await updateDealStatus(fd);
                toast('success', 'Deal moved');
                router.refresh();
              } catch (err: any) {
                toast('error', err?.message || 'Failed to move deal');
              }
            }}
          >
            ◀
          </button>

          <button
            className="text-sm text-gray-600 ml-2"
            onClick={async () => {
              try {
                const fd = new FormData();
                fd.append('id', deal.id);
                fd.append('direction', 'forward');
                await updateDealStatus(fd);
                toast('success', 'Deal moved');
                router.refresh();
              } catch (err: any) {
                toast('error', err?.message || 'Failed to move deal');
              }
            }}
          >
            ▶
          </button>

          <button
            className="text-sm text-red-600 ml-2"
            onClick={async () => {
              const ok = await confirm('Delete this deal?');
              if (!ok) return;
              try {
                const fd = new FormData();
                fd.append('id', deal.id);
                await deleteDeal(fd);
                toast('success', 'Deal deleted');
                router.refresh();
              } catch (err: any) {
                toast('error', err?.message || 'Failed to delete deal');
              }
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
