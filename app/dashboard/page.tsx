import { getCurrentUser } from '../../lib/auth.server';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      </div>

      <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-8 text-center py-24">
        <h3 className="text-xl font-semibold mb-2">Welcome to Chatlio</h3>
        <p className="text-muted-foreground mb-6">You are successfully logged in. Your dashboard is ready.</p>
        <div className="inline-flex items-center justify-center text-sm rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 px-3 py-1 font-medium">
          System Status: Operational
        </div>
      </div>
    </div>
  );
}
