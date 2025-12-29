"use client";
import React from 'react';
import { useTheme } from '../lib/theme';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <button
      aria-label="Toggle theme"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="px-2 py-1 border rounded"
    >
      {theme === 'dark' ? '🌙' : '☀️'}
    </button>
  );
}
