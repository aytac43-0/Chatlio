import React from 'react';

type Props = {
  title: string;
  value: number | string;
  icon?: string; // optional emoji or small icon string
  highlight?: 'primary' | 'success';
};

/**
 * Reusable KPI stat card.
 * Server-safe component (no client hooks) that renders a clean metric card.
 */
export default function StatCard({ title, value, icon, highlight }: Props) {
  const valueClasses =
    highlight === 'primary'
      ? 'text-primary'
      : highlight === 'success'
      ? 'text-success'
      : 'text-darkText';

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <div className="mt-2 flex items-baseline gap-3">
            <p className={`text-3xl font-semibold ${valueClasses}`}>{value}</p>
          </div>
        </div>
        {icon && (
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
            <span className="text-xl">{icon}</span>
          </div>
        )}
      </div>
    </div>
  );
}
