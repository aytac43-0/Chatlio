import { cookies } from 'next/headers';
import { createServerSupabase } from '../../lib/supabaseServer';
import PipelineBoard from '../../components/PipelineBoard';
import DealForm from '../../components/DealForm';
import React from 'react';

type Deal = {
  id: string;
  title: string;
  amount?: number | null;
  status: string;
  customer_id?: string | null;
  customer_name?: string | null;
};

export default async function PipelinePage() {
  const supabase = createServerSupabase(cookies());

  // Fetch deals and customers in parallel
  const dealsQ = supabase
    .from('sales_pipeline')
    .select('id, title, amount, status, customer_id, updated_at')
    .order('updated_at', { ascending: false });
  const customersQ = supabase.from('customers').select('id, name').order('name', { ascending: true });

  const [dealsRes, customersRes] = await Promise.all([dealsQ, customersQ]);

  const dealsData = dealsRes.data ?? [];
  const customersData = customersRes.data ?? [];

  // Map customer id to name for quick lookup
  const customerMap = new Map<string, string>();
  for (const c of customersData as any[]) customerMap.set(c.id, c.name);

  const deals: Deal[] = (dealsData as any[]).map((d) => ({
    id: d.id,
    title: d.title,
    amount: d.amount,
    status: d.status,
    customer_id: d.customer_id,
    customer_name: d.customer_id ? customerMap.get(d.customer_id) ?? null : null
  }));

  // Group by status
  const grouped: Record<string, Deal[]> = {};
  for (const s of ['new', 'contacted', 'offer_sent', 'won', 'lost']) grouped[s] = [];
  for (const d of deals) grouped[d.status] = grouped[d.status] ?? [], grouped[d.status].push(d);

  const contacts = (customersData as any[]).map((c) => ({ id: c.id, name: c.name }));

  const allEmpty = deals.length === 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Deals Pipeline</h1>
      </div>

      {allEmpty ? (
        <div className="p-6 bg-white dark:bg-gray-900 rounded shadow">
          <p className="text-lg">You don’t have any deals yet.</p>
          <div className="mt-4">
            <DealForm contacts={contacts} />
          </div>
        </div>
      ) : (
        <div>
          <div className="mb-4">
            <DealForm contacts={contacts} />
          </div>
          <PipelineBoard grouped={grouped} />
        </div>
      )}
    </div>
  );
}
