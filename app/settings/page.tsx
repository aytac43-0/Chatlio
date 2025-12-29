import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import ProfileForm from '../../components/ProfileForm';
import SecurityForm from '../../components/SecurityForm';
import PreferencesForm from '../../components/PreferencesForm';
import DangerZone from '../../components/DangerZone';
import React from 'react';

export default async function SettingsPage() {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.from('profiles').select('id, email, full_name, username').limit(1).single();

  const profile = data ?? null;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 bg-white dark:bg-gray-900 rounded shadow">
          <h2 className="font-semibold mb-3">Profile</h2>
          <ProfileForm profile={profile} />
        </div>
        <div className="p-4 bg-white dark:bg-gray-900 rounded shadow">
          <h2 className="font-semibold mb-3">Security</h2>
          <SecurityForm />
        </div>
      </div>

      <div className="p-4 bg-white dark:bg-gray-900 rounded shadow">
        <h2 className="font-semibold mb-3">Preferences</h2>
        <PreferencesForm />
      </div>

      <div className="p-4 bg-white dark:bg-gray-900 rounded shadow">
        <DangerZone />
      </div>
    </div>
  );
}

