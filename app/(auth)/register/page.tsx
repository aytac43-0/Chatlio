"use client";
import React, { useState } from 'react';
import AnimatedAuthCard from '../../../components/AnimatedAuthCard';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import { isEmail, passwordStrength } from '../../../lib/validators';
import { signUpWithProfile } from '../../../lib/auth';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!agree) return setError('You must agree to the Terms of Service.');
    if (password !== confirm) return setError('Passwords do not match.');
    if (!isEmail(email)) return setError('Invalid email address.');

    const strength = passwordStrength(password);
    if (!strength.valid) return setError('Password is too weak. Use at least 8 characters, mixed case and numbers.');

    setLoading(true);
    try {
      await signUpWithProfile({ email: email.trim(), password, fullName: fullName.trim(), username: username.trim() });
      // On success, redirect to dashboard. Auth session may require email confirmation depending on Supabase settings.
      router.push('/dashboard');
    } catch (err: any) {
      // Map or display friendly error messages
      const msg = err?.message || 'Sign up failed. Please try again.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <AnimatedAuthCard>
        <h2 className="text-2xl font-semibold mb-4">Create your account</h2>
        <form className="space-y-3" onSubmit={handleSubmit}>
          <Input label="Full name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
          <Input label="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          <Input label="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Input label="Password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
          <Input label="Confirm password" value={confirm} onChange={(e) => setConfirm(e.target.value)} type="password" required />
          <div className="flex items-center gap-2">
            <input type="checkbox" id="agree" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
            <label htmlFor="agree" className="text-sm">I agree to the <a href="/terms-of-service" className="text-accent">Terms of Service</a> and <a href="/privacy-policy" className="text-accent">Privacy Policy</a></label>
          </div>
          {error && <p className="text-red-600">{error}</p>}
          <Button type="submit" disabled={loading}>{loading ? 'Creating...' : 'Create account'}</Button>
        </form>
      </AnimatedAuthCard>
    </div>
  );
}
