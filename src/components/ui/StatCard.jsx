import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { cn } from '../../utils/cn';

export default function StatCard({ label, value, delta, trend = 'up', icon: Icon, className }) {
  const isUp = trend === 'up';

  return (
    <div
      className={cn(
        'flex h-full min-h-[124px] flex-col justify-between rounded-xl border border-neutral-200 bg-white p-5 shadow-sm',
        'dark:border-neutral-800 dark:bg-neutral-900',
        className
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="truncate text-sm font-medium text-neutral-500 dark:text-neutral-400">
          {label}
        </span>
        {Icon && (
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600 dark:bg-primary-500/15 dark:text-primary-400">
            <Icon size={16} />
          </span>
        )}
      </div>

      <div>
        <div className="truncate text-2xl font-semibold tabular-nums tracking-tight text-neutral-900 dark:text-neutral-50">
          {value}
        </div>

        <div
          className={cn(
            'mt-2 inline-flex items-center gap-1 text-xs font-medium',
            !delta && 'invisible',
            isUp ? 'text-success-600 dark:text-success-400' : 'text-danger-600 dark:text-danger-400'
          )}
        >
          {isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {delta || '—'}
        </div>
      </div>
    </div>
  );
}
