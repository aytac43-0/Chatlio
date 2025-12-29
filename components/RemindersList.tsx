"use client";

import React from 'react';
import { toggleReminderDone, deleteReminder } from '../app/reminders/actions';
import { useRouter } from 'next/navigation';
import { useToast, useConfirm } from './Providers';
import { formatDateIso, isOverdue } from '../lib/date';

export default function RemindersList({ reminders }: { reminders: any[] }) {
  const router = useRouter();
  const { toast } = useToast();
  const { confirm } = useConfirm();

  return (
    <div className="space-y-3">
      {reminders.map((r) => (
        <div key={r.id} className={`p-3 rounded shadow bg-white dark:bg-gray-900 flex items-start justify-between ${!r.done && isOverdue(r.due_at) ? 'border-l-4 border-red-600' : ''}`}>
          <div>
            <div className="font-medium">{r.note}</div>
            <div className="text-sm text-gray-500">{r.customer_name ?? '—'} • {r.due_at ? formatDateIso(r.due_at) : 'No due date'}</div>
          </div>
          <div className="flex flex-col gap-2">
            <button className="text-sm" onClick={async () => { try { const fd = new FormData(); fd.append('id', r.id); await toggleReminderDone(fd); toast('success', 'Reminder updated'); router.refresh(); } catch (err:any) { toast('error', err?.message || 'Failed'); } }}> {r.done ? 'Mark undone' : 'Mark done'} </button>
            <button className="text-sm text-red-600" onClick={async () => { const ok = await confirm('Delete reminder?'); if (!ok) return; try { const fd = new FormData(); fd.append('id', r.id); await deleteReminder(fd); toast('success','Reminder deleted'); router.refresh(); } catch(err:any){ toast('error', err?.message || 'Failed'); } }}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
