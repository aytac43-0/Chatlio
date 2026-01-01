import { supabase } from './supabaseClient';

/**
 * Client-side auth helpers. Safe to import from Client Components.
 */
export async function checkUsernameAvailable(username: string): Promise<boolean> {
  const clean = username.trim();
  if (!clean) return false;

  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('id', { count: 'exact' })
      .ilike('username', clean)
      .limit(1);

    if (error) {
      console.error('checkUsernameAvailable error:', error);
      throw new Error('Unable to verify username availability. Please try again.');
    }

    return !(data && data.length > 0);
  } catch (err) {
    throw err;
  }
}

type SignUpParams = {
  email: string;
  password: string;
  fullName: string;
  username: string;
};

export async function signUpWithProfile(params: SignUpParams) {
  const { email, password, fullName, username } = params;

  if (!email || !password || !username) {
    throw new Error('Missing required signup information.');
  }

  const available = await checkUsernameAvailable(username);
  if (!available) throw new Error('That username is already taken. Please choose another.');

  try {
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName, username } }
    });

    if (signUpError) {
      console.error('supabase.signUp error:', signUpError);
      const msg = signUpError.message || 'Unable to create account. Please try again.';
      throw new Error(msg);
    }

    // Supabase auth user created. Profile creation is handled server-side by a DB trigger
    // to ensure transactional creation and avoid client-side races or RLS issues.
    const user = data?.user;
    if (!user || !user.id) throw new Error('Account created but no user id returned.');
    return user;
  } catch (err: any) {
    if (err instanceof Error) throw err;
    throw new Error('Sign up failed. Please try again.');
  }
}

export default {
  checkUsernameAvailable,
  signUpWithProfile
};
