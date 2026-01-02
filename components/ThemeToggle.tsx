"use client";

import React from 'react';
import { useTheme } from '../lib/theme';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Moon className="w-5 h-5" />
      ) : (
        <Sun className="w-5 h-5" />
      )}
    </button>
  );
}
