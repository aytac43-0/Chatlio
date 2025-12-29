import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import StatCard from '../../components/StatCard';

/**
 * Dashboard server page.
 * - Fetches KPI counts server-side using a Supabase server client tied to the request cookies.
 * - Respects RLS (uses anon client + auth cookie) — no service role key.
 * - Uses Promise.all for parallel queries and gracefully handles errors.
 */
export default async function Dashboard() {
  const supabase = createServerComponentClient({ cookies });

  // Prepare time boundary for pending reminders (due_at >= now)
  const nowIso = new Date().toISOString();

  // Parallel requests for counts. Use `select(..., { count: 'exact' })` to get counts.
  const customersPromise = supabase.from('customers').select('id', { count: 'exact' });
  const activeDealsPromise = supabase
    .from('sales_pipeline')
    .select('id', { count: 'exact' })
    .in('status', ['new', 'contacted', 'offer_sent']);
  const wonDealsPromise = supabase.from('sales_pipeline').select('id', { count: 'exact' }).eq('status', 'won');
  const pendingRemindersPromise = supabase
    .from('reminders')
    .select('id', { count: 'exact' })
    .eq('done', false)
    .gte('due_at', nowIso);

  // Execute in parallel
  const [customersRes, activeDealsRes, wonDealsRes, remindersRes] = await Promise.all([
    customersPromise,
    activeDealsPromise,
    wonDealsPromise,
    pendingRemindersPromise
  ]);

  // Helper to safely extract count from Supabase response
  function extractCount(res: any) {
    if (!res) return 0;
    if (res.count !== null && typeof res.count === 'number') return res.count;
    // Fallback to data length
    if (Array.isArray(res.data)) return res.data.length;
    return 0;
  }

  const totalContacts = extractCount(customersRes);
  const activeDeals = extractCount(activeDealsRes);
  const wonDeals = extractCount(wonDealsRes);
  const pendingFollowUps = extractCount(remindersRes);

  const allZero = totalContacts === 0 && activeDeals === 0 && wonDeals === 0 && pendingFollowUps === 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>

      {allZero ? (
        <div className="p-6 bg-white dark:bg-gray-900 rounded shadow">
          <p className="text-lg">Your workspace is empty. Start by adding your first contact.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total contacts" value={totalContacts} icon="👥" />
          <StatCard title="Active deals" value={activeDeals} icon="💼" highlight="primary" />
          <StatCard title="Won deals" value={wonDeals} icon="🏆" highlight="success" />
          <StatCard title="Pending follow-ups" value={pendingFollowUps} icon="⏰" />
        </div>
      )}
    </div>
  );
}
