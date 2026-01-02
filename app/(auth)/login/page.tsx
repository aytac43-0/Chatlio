"use client";

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { PasswordInput } from '@/components/PasswordInput';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.refresh();
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 auth-bg animate-in fade-in duration-500">
      <div className="w-full max-w-md">
        {/* Back Link */}
        <Link href="/" className="group inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Return to homepage
        </Link>

        <div className="rounded-xl border bg-card text-card-foreground shadow-sm glass overflow-hidden">
          <div className="flex flex-col space-y-1.5 p-6 bg-gradient-to-b from-white/5 to-transparent">
            <h3 className="font-semibold tracking-tight text-2xl text-center">Welcome back</h3>
            <p className="text-sm text-muted-foreground text-center">
              Enter your credentials to access your account
            </p>
          </div>
          <div className="p-6 pt-0">
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 text-sm bg-destructive/10 text-destructive rounded-md border border-destructive/20 animate-in slide-in-from-top-2">
                  {error}
                </div>
              )}
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none" htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="hello@example.com"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 focus-glow transition-all duration-200"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium leading-none" htmlFor="password">Password</label>
                  <Link href="/forgot-password" className="text-sm text-primary hover:underline">Forgot password?</Link>
                </div>
                <PasswordInput
                  id="password"
                  name="password"
                  required
                  className="focus-glow transition-all duration-200"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] duration-200"
              >
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Sign In
              </button>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">Don't have an account? </span>
              <Link href="/register" className="font-medium text-primary hover:underline">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
