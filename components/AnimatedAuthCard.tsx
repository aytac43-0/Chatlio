"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function AnimatedAuthCard({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-md bg-white dark:bg-gray-900 p-6 rounded-lg shadow"
    >
      {children}
    </motion.div>
  );
}
