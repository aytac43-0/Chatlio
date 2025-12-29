"use client";

import React, { createContext, useContext, useState, useCallback } from 'react';

type ToastType = 'success' | 'error' | 'info';
type ToastItem = { id: string; type: ToastType; message: string };

const ToastContext = createContext<{
  toast: (type: ToastType, message: string) => void;
}>({ toast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

const ConfirmContext = createContext<{
  confirm: (message: string) => Promise<boolean>;
}>({ confirm: async () => false });

export function useConfirm() {
  return useContext(ConfirmContext);
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const toast = useCallback((type: ToastType, message: string) => {
    const id = String(Date.now()) + Math.random().toString(16).slice(2, 8);
    const t = { id, type, message };
    setToasts((s) => [...s, t]);
    setTimeout(() => setToasts((s) => s.filter((x) => x.id !== id)), 4500);
  }, []);

  // Simple confirm implementation using Promise and state
  const [confirmState, setConfirmState] = useState<{ open: boolean; message: string; resolve?: (v: boolean)=>void }>({ open: false, message: '' });

  const confirm = useCallback((message: string) => {
    return new Promise<boolean>((resolve) => {
      setConfirmState({ open: true, message, resolve });
    });
  }, []);

  function handleConfirmAnswer(answer: boolean) {
    if (confirmState.resolve) confirmState.resolve(answer);
    setConfirmState({ open: false, message: '' });
  }

  return (
    <ToastContext.Provider value={{ toast }}>
      <ConfirmContext.Provider value={{ confirm }}>
        {children}

        {/* Toast container */}
        <div className="fixed right-4 bottom-4 z-50 flex flex-col gap-2">
          {toasts.map((t) => (
            <div key={t.id} className={`px-4 py-2 rounded shadow text-white ${t.type === 'success' ? 'bg-green-600' : t.type === 'error' ? 'bg-red-600' : 'bg-gray-800'}`}>
              {t.message}
            </div>
          ))}
        </div>

        {/* Confirm modal */}
        {confirmState.open && (
          <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
            <div className="bg-white dark:bg-gray-900 p-6 rounded shadow max-w-md w-full">
              <p className="mb-4">{confirmState.message}</p>
              <div className="flex justify-end gap-2">
                <button className="px-3 py-2 rounded bg-gray-200" onClick={() => handleConfirmAnswer(false)}>Cancel</button>
                <button className="px-3 py-2 rounded bg-red-600 text-white" onClick={() => handleConfirmAnswer(true)}>Confirm</button>
              </div>
            </div>
          </div>
        )}
      </ConfirmContext.Provider>
    </ToastContext.Provider>
  );
}
