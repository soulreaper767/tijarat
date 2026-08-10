import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../utils/cn';

export default function Pagination({ page, pageSize, totalItems, onPageChange }) {
  const pageCount = Math.max(1, Math.ceil(totalItems / pageSize));
  const start = totalItems === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalItems);

  const pages = Array.from({ length: pageCount }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === pageCount || Math.abs(p - page) <= 1
  );

  return (
    <div className="flex flex-col items-center justify-between gap-3 border-t border-neutral-200 px-1 pt-4 dark:border-neutral-800 sm:flex-row">
      <p className="text-xs text-neutral-500 dark:text-neutral-400">
        Showing <span className="font-medium text-neutral-700 dark:text-neutral-300">{start}-{end}</span> of{' '}
        <span className="font-medium text-neutral-700 dark:text-neutral-300">{totalItems}</span>
      </p>

      <div className="flex items-center gap-1">
        <button
          type="button"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-500 hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-40 dark:text-neutral-400 dark:hover:bg-neutral-800"
        >
          <ChevronLeft size={16} />
        </button>

        {pages.map((p, i) => {
          const prev = pages[i - 1];
          const gap = prev !== undefined && p - prev > 1;
          return (
            <span key={p} className="flex items-center gap-1">
              {gap && <span className="px-1 text-xs text-neutral-400">…</span>}
              <button
                type="button"
                onClick={() => onPageChange(p)}
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-lg text-sm font-medium',
                  p === page
                    ? 'bg-primary-600 text-white'
                    : 'text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800'
                )}
              >
                {p}
              </button>
            </span>
          );
        })}

        <button
          type="button"
          disabled={page >= pageCount}
          onClick={() => onPageChange(page + 1)}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-500 hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-40 dark:text-neutral-400 dark:hover:bg-neutral-800"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
