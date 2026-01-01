"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function CreateBusinessModal({ onCreate }: { onCreate?: (name: string) => void }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');

  return (
    <div>
      <button onClick={() => setOpen(true)} className="px-3 py-1 bg-primary text-white rounded">Create Business</button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white dark:bg-gray-900 rounded-lg p-6 z-10 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-3">Create Business</h3>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Business name" className="w-full px-3 py-2 rounded-md border mb-3" />
            <div className="flex justify-end gap-2">
              <button className="px-3 py-1" onClick={() => setOpen(false)}>Cancel</button>
              <button className="px-3 py-1 bg-primary text-white rounded" onClick={() => { onCreate?.(name); setOpen(false); }}>Create</button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
