"use server";

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

export async function createReminder(formData: FormData) {
  const customer_id = (formData.get('customer_id') as string | null) ?? '';
  const note = (formData.get('note') as string | null)?.trim() ?? '';
  const due_at = (formData.get('due_at') as string | null) ?? null;

  if (!customer_id) throw new Error('Contact is required');
  if (!note) throw new Error('Note is required');

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
  const {
    data: { session }
  } = await supabase.auth.getSession();
  if (!session?.user) throw new Error('Not authenticated');

  const payload = { owner_id: session.user.id, customer_id, note, due_at } as any;
  const { error } = await supabase.from('reminders').insert(payload);
  if (error) {
    console.error('createReminder error', error);
    throw new Error('Failed to create reminder');
  }

  revalidatePath('/reminders');
}

export async function toggleReminderDone(formData: FormData) {
  const id = (formData.get('id') as string | null) ?? '';
  if (!id) throw new Error('Missing reminder id');

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
          try { cookieStore2.set({ name, value, ...options }); } catch (e) {}
        },
        remove(name: string, options: any) {
          try { cookieStore2.set({ name, value: '', ...options }); } catch (e) {}
        }
      }
    }
  );
  // fetch current
  const { data } = await supabase2.from('reminders').select('done').eq('id', id).limit(1).single();
  if (!data) throw new Error('Reminder not found');
  const newDone = !data.done;
  const { error } = await supabase2.from('reminders').update({ done: newDone }).eq('id', id);
  if (error) {
    console.error('toggleReminderDone error', error);
    throw new Error('Failed to update reminder');
  }

  revalidatePath('/reminders');
}

export async function deleteReminder(formData: FormData) {
  const id = (formData.get('id') as string | null) ?? '';
  if (!id) throw new Error('Missing reminder id');

  const cookieStore3 = cookies();
  const supabase3 = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore3.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          try { cookieStore3.set({ name, value, ...options }); } catch (e) {}
        },
        remove(name: string, options: any) {
          try { cookieStore3.set({ name, value: '', ...options }); } catch (e) {}
        }
      }
    }
  );
  const { error } = await supabase3.from('reminders').delete().eq('id', id);
  if (error) {
    console.error('deleteReminder error', error);
    throw new Error('Failed to delete reminder');
  }

  revalidatePath('/reminders');
}
