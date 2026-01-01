import { cookies } from 'next/headers';
import { createServerSupabase } from '../../lib/supabaseServer';
import RemindersList from '../../components/RemindersList';
import ReminderForm from '../../components/ReminderForm';
import React from 'react';

export default async function RemindersPage() {
  const supabase = createServerSupabase(cookies());

  const remindersQ = supabase
    .from('reminders')
    .select('id, customer_id, note, due_at, done, created_at')
    .order('due_at', { ascending: true });

  const customersQ = supabase.from('customers').select('id, name');

  const [remRes, custRes] = await Promise.all([remindersQ, customersQ]);

  const remindersData = remRes.data ?? [];
  const customers = custRes.data ?? [];

  const customerMap = new Map<string, string>();
  for (const c of customers as any[]) customerMap.set(c.id, c.name);

  const reminders = (remindersData as any[]).map((r) => ({
    ...r,
    customer_name: r.customer_id ? customerMap.get(r.customer_id) ?? null : null
  }));

  const contacts = (customers as any[]).map((c) => ({ id: c.id, name: c.name }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Reminders</h1>
      </div>

      <div className="p-4 bg-white dark:bg-gray-900 rounded shadow">
        <div className="mb-4">
          <ReminderForm contacts={contacts} />
        </div>
        <RemindersList reminders={reminders} />
      </div>
    </div>
  );
}

