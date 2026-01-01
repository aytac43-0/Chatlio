"use server";

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

export async function updateProfile(formData: FormData) {
  const full_name = (formData.get('full_name') as string | null) ?? '';
  const username = (formData.get('username') as string | null) ?? '';

  if (!username.trim()) throw new Error('Username is required');

  const supabase = createServerClient({ cookies });
  const {
    data: { session }
  } = await supabase.auth.getSession();
  if (!session?.user) throw new Error('Not authenticated');

  // Ensure username uniqueness (case-insensitive)
  const { data: existing } = await supabase.from('profiles').select('id').ilike('username', username).limit(1);
  if (existing && existing.length > 0 && existing[0].id !== session.user.id) {
    throw new Error('Username already taken');
  }

  const { error } = await supabase.from('profiles').update({ full_name, username }).eq('id', session.user.id);
  if (error) {
    console.error('updateProfile error', error);
    throw new Error('Failed to update profile');
  }

  revalidatePath('/settings');
}

export async function changePassword(formData: FormData) {
  const current = (formData.get('current') as string | null) ?? '';
  const next = (formData.get('next') as string | null) ?? '';
  if (!next) throw new Error('New password required');
  // Note: Supabase does not provide a direct changePassword via anon client; use update user with password
  const supabase = createServerClient({ cookies });
  const {
    data: { session }
  } = await supabase.auth.getSession();
  if (!session?.user) throw new Error('Not authenticated');

  const { error } = await supabase.auth.updateUser({ password: next });
  if (error) {
    console.error('changePassword error', error);
    throw new Error('Failed to change password');
  }

  revalidatePath('/settings');
}

export async function deleteAccount(formData: FormData) {
  // Best-effort delete: remove profile and related rows; cannot delete auth user without service role.
  const supabase = createServerClient({ cookies });
  const {
    data: { session }
  } = await supabase.auth.getSession();
  if (!session?.user) throw new Error('Not authenticated');

  const uid = session.user.id;
  // Delete profile (cascade will remove customers -> pipeline, reminders if FK cascade set)
  const { error } = await supabase.from('profiles').delete().eq('id', uid);
  if (error) {
    console.error('deleteAccount error', error);
    throw new Error('Failed to delete account data');
  }

  // Sign out client
  await supabase.auth.signOut();
  revalidatePath('/');
}
