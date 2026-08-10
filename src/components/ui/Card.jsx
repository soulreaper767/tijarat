import { cn } from '../../utils/cn';

export default function Card({
  title,
  subtitle,
  actions,
  padding = true,
  className,
  children,
}) {
  const hasHeader = title || subtitle || actions;

  return (
    <div
      className={cn(
        'flex h-full flex-col rounded-xl border border-neutral-200 bg-white shadow-sm',
        'dark:border-neutral-800 dark:bg-neutral-900',
        className
      )}
    >
      {hasHeader && (
        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-neutral-200 px-5 py-4 dark:border-neutral-800">
          <div className="min-w-0">
            {title && (
              <h3 className="truncate text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="mt-0.5 truncate text-xs text-neutral-500 dark:text-neutral-400">{subtitle}</p>
            )}
          </div>
          {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
        </div>
      )}

      <div className={cn('flex-1', padding && 'p-5')}>{children}</div>
    </div>
  );
}
