"use client";
import React, { useState } from 'react';
import AnimatedAuthCard from '../../../components/AnimatedAuthCard';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import { supabase } from '../../../lib/supabaseClient';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) setError(error.message);
    else window.location.href = '/dashboard';
  }

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <AnimatedAuthCard>
        <h2 className="text-2xl font-semibold mb-4">Sign in to Chatlio</h2>
        <form className="space-y-3" onSubmit={handleSubmit}>
          <Input label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input label="Password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
          {error && <p className="text-red-600">{error}</p>}
            <div className="flex items-center justify-between">
              <Button type="submit" disabled={loading}>{loading ? 'Signing in...' : 'Sign in'}</Button>
              <a href="/reset-password" className="text-sm text-accent">Forgot?</a>
            </div>
        </form>
      </AnimatedAuthCard>
    </div>
  );
}
