"use server";

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

const STATUSES = ['new', 'contacted', 'offer_sent', 'won', 'lost'] as const;
type Status = (typeof STATUSES)[number];

function isStatus(s: string): s is Status {
  return (STATUSES as readonly string[]).includes(s);
}

export async function createDeal(formData: FormData) {
  const title = (formData.get('title') as string | null)?.trim() ?? '';
  const customer_id = (formData.get('customer_id') as string | null) ?? '';
  const amountRaw = (formData.get('amount') as string | null) ?? '';
  const amount = amountRaw === '' ? null : Number(amountRaw);

  if (!title) throw new Error('Title is required');
  if (!customer_id) throw new Error('Contact is required');
  if (amount !== null && Number.isNaN(amount)) throw new Error('Amount must be a number');

  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (e) {}
        },
        remove(name: string, options: any) {
          try {
            cookieStore.set({ name, value: '', ...options });
          } catch (e) {}
        }
      }
    }
  );

  const {
    data: { session }
  } = await supabase.auth.getSession();
  if (!session?.user) throw new Error('Not authenticated');

  const payload = {
    owner_id: session.user.id,
    customer_id,
    title,
    amount,
    status: 'new'
  } as any;

  const { error } = await supabase.from('sales_pipeline').insert(payload);
  if (error) {
    console.error('createDeal error', error);
    throw new Error('Failed to create deal. Please try again.');
  }

  revalidatePath('/pipeline');
}

export async function updateDealStatus(formData: FormData) {
  const id = (formData.get('id') as string | null) ?? '';
  const direction = (formData.get('direction') as string | null) ?? '';
  if (!id) throw new Error('Missing deal id');
  if (!['forward', 'backward'].includes(direction)) throw new Error('Invalid direction');

  const cookieStore2 = cookies();
  const supabase2 = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore2.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          try {
            cookieStore2.set({ name, value, ...options });
          } catch (e) {}
        },
        remove(name: string, options: any) {
          try {
            cookieStore2.set({ name, value: '', ...options });
          } catch (e) {}
        }
      }
    }
  );
  const { data } = await supabase2.from('sales_pipeline').select('status').eq('id', id).limit(1).single();
  if (!data) throw new Error('Deal not found');
  const current = data.status as string;
  if (!isStatus(current)) throw new Error('Invalid current status');

  const idx = STATUSES.indexOf(current as Status);
  let newIdx = idx;
  if (direction === 'forward') newIdx = Math.min(STATUSES.length - 1, idx + 1);
  else newIdx = Math.max(0, idx - 1);

  const newStatus = STATUSES[newIdx];

  // Enforce terminal rule: if current is 'lost' and direction forward, disallow
  if (current === 'lost' && direction === 'forward') throw new Error('Cannot move forward from lost');

  // No-op if no change
  if (newStatus === current) return;

  const { error } = await supabase2.from('sales_pipeline').update({ status: newStatus, updated_at: new Date() }).eq('id', id);
  if (error) {
    console.error('updateDealStatus error', error);
    throw new Error('Failed to update deal status. Please try again.');
  }

  revalidatePath('/pipeline');
}

export async function deleteDeal(formData: FormData) {
  const id = (formData.get('id') as string | null) ?? '';
  if (!id) throw new Error('Missing deal id');

  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          try { cookieStore.set({ name, value, ...options }); } catch (e) {}
        },
        remove(name: string, options: any) {
          try { cookieStore.set({ name, value: '', ...options }); } catch (e) {}
        }
      }
    }
  );
  const { error } = await supabase.from('sales_pipeline').delete().eq('id', id);
  if (error) {
    console.error('deleteDeal error', error);
    throw new Error('Failed to delete deal. Please try again.');
  }

  revalidatePath('/pipeline');
}
