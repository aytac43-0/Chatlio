"use client";
import React from 'react';

export default function Modal({ open, onClose, children }: { open: boolean; onClose: ()=>void; children: React.ReactNode }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-4 rounded shadow max-w-lg w-full">
        <button className="mb-2 text-sm" onClick={onClose}>Close</button>
        {children}
      </div>
    </div>
  );
}
