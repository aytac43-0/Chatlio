"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const saved = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
      if (saved === 'dark' || saved === 'light' || saved === 'system') return saved as Theme;
    } catch (e) {}
    // Default to dark for a solid base as requested
    return 'dark';
  });

  useEffect(() => {
    try { localStorage.setItem('theme', theme); } catch (e) {}

    const resolved = theme === 'system'
      ? (typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)')?.matches ? 'dark' : 'light')
      : theme;

    if (resolved === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
