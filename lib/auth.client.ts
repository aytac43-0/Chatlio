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

    const user = data?.user;
    if (!user || !user.id) throw new Error('Account created but no user id returned.');

    const profileRow = {
      id: user.id,
      email,
      full_name: fullName,
      username,
      role: 'user'
    };

    const { error: insertError } = await supabase.from('profiles').insert(profileRow);
    if (insertError) {
      console.error('profiles.insert error:', insertError);
      throw new Error('Account created but failed to create profile. If this persists, contact support.');
    }

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
