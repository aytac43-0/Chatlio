"use client";

import React from 'react';
import { useTheme } from '../lib/theme';
import Button from './Button';

export default function PreferencesForm() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <span className="text-sm">Theme</span>
        <select value={theme} onChange={(e) => setTheme(e.target.value as 'light'|'dark') } className="px-3 py-2 border rounded">
          <option value="system">System</option>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>
      <div>
        <Button variant="ghost">Save preferences</Button>
      </div>
    </div>
  );
}
