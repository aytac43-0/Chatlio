"use client";
import React from 'react';
import { motion } from 'framer-motion';

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string | null;
};

export default function Input({ label, error, ...props }: Props) {
  return (
    <motion.div className="w-full" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28 }}>
      {label && <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">{label}</label>}
      <input
        {...props}
        className="w-full px-3 py-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-shadow focus:outline-none focus-glow"
      />
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </motion.div>
  );
}
