import React from 'react';
import DealCard from './DealCard';

type Deal = {
  id: string;
  title: string;
  amount?: number | null;
  status: string;
  customer_name?: string | null;
};

type Props = {
  grouped: Record<string, Deal[]>;
};

const STATUS_ORDER = ['new', 'contacted', 'offer_sent', 'won', 'lost'];

export default function PipelineBoard({ grouped }: Props) {
  return (
    <div className="flex gap-4 overflow-auto pb-6">
      {STATUS_ORDER.map((status) => (
        <div key={status} className="min-w-[260px] bg-gray-50 dark:bg-gray-800 p-3 rounded">
          <h3 className="font-semibold mb-2 capitalize">{status.replace('_', ' ')}</h3>
          <div>
            {(grouped[status] ?? []).map((d) => (
              <DealCard key={d.id} deal={d} />
            ))}
            {(grouped[status] ?? []).length === 0 && <div className="text-sm text-gray-500">No deals</div>}
          </div>
        </div>
      ))}
    </div>
  );
}
