"use client";
import React, { useState } from 'react';
import AnimatedAuthCard from '../../../components/AnimatedAuthCard';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import { supabase } from '../../../lib/supabaseClient';

export default function ResetPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function handle(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: window.location.origin + '/login' });
    setLoading(false);
    if (error) setMsg(error.message);
    else setMsg('Check your email for reset instructions.');
  }

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <AnimatedAuthCard>
        <h2 className="text-2xl font-semibold mb-4">Reset password</h2>
        <form onSubmit={handle} className="space-y-3">
          <Input label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          {msg && <p className="text-sm text-gray-600">{msg}</p>}
          <Button type="submit" disabled={loading}>{loading ? 'Sending...' : 'Send reset'}</Button>
        </form>
      </AnimatedAuthCard>
    </div>
  );
}
