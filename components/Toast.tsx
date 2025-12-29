"use client";
import React, { useEffect } from 'react';

export default function Toast({ message, onClose }: { message: string | null; onClose: ()=>void }) {
  useEffect(() => {
    if (!message) return;
    const id = setTimeout(onClose, 4000);
    return () => clearTimeout(id);
  }, [message, onClose]);

  if (!message) return null;
  return (
    <div className="fixed right-4 bottom-4 bg-gray-900 text-white px-4 py-2 rounded">{message}</div>
  );
}
