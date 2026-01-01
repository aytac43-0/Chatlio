"use server";

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

/**
 * Server Action: createContact
 * Accepts a FormData instance with fields: name, email, phone, notes
 * Validates inputs, inserts a new row into `customers` with owner_id = auth.uid(),
 * and revalidates the `/contacts` path on success.
 */
export async function createContact(formData: FormData) {
  const name = (formData.get('name') as string | null)?.trim() ?? '';
  const email = (formData.get('email') as string | null)?.trim() ?? null;
  const phone = (formData.get('phone') as string | null)?.trim() ?? null;
  const notes = (formData.get('notes') as string | null)?.trim() ?? null;

  if (!name) {
    throw new Error('Name is required');
  }

  if (email && !/\S+@\S+\.\S+/.test(email)) {
    throw new Error('Invalid email address');
  }

  const supabase = createServerClient({ cookies });

  // Ensure we have an authenticated user
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const payload = {
    owner_id: user.id,
    name,
    email,
    phone,
    notes
  } as any;

  const { error } = await supabase.from('customers').insert(payload);
  if (error) {
    console.error('createContact error', error);
    throw new Error('Failed to create contact. Please try again.');
  }

  // Revalidate the contacts page so server components show fresh data
  revalidatePath('/contacts');
}

/**
 * Server Action: deleteContact
 * Expects FormData with `id` field (customer id). Respects RLS — deletion will only
 * succeed if the current user is the owner.
 */
export async function deleteContact(formData: FormData) {
  const id = (formData.get('id') as string | null) ?? '';
  if (!id) throw new Error('Missing contact id');

  const supabase = createServerActionClient({ cookies });

  const { error } = await supabase.from('customers').delete().eq('id', id);
  if (error) {
    console.error('deleteContact error', error);
    throw new Error('Failed to delete contact. Please try again.');
  }

  revalidatePath('/contacts');
}
