const STAGES = [
  { stage: 'Picking', count: 6 },
  { stage: 'Packing', count: 3 },
  { stage: 'Shipped', count: 21 },
];

export default function EcommerceFulfillmentMock({ className }) {
  return (
    <div className={`grid grid-cols-3 gap-2 ${className || ''}`}>
      {STAGES.map((col) => (
        <div key={col.stage} className="rounded-lg border border-neutral-100 p-3 text-center dark:border-neutral-800">
          <p className="text-2xl font-bold tabular-nums text-neutral-900 dark:text-neutral-100">{col.count}</p>
          <p className="mt-1 text-[11px] text-neutral-400">{col.stage}</p>
        </div>
      ))}
    </div>
  );
}
