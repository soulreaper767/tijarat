import { cn } from '../../utils/cn';

export default function Tabs({ tabs, value, onChange, className }) {
  return (
    <div className={cn('flex items-center gap-1 border-b border-neutral-200 dark:border-neutral-800', className)}>
      {tabs.map((tab) => {
        const isActive = tab.id === value;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={cn(
              'relative flex items-center gap-2 px-3.5 py-2.5 text-sm font-medium transition-colors',
              isActive
                ? 'text-primary-600 dark:text-primary-400'
                : 'text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200'
            )}
          >
            {tab.icon && <tab.icon size={15} />}
            {tab.label}
            {tab.count !== undefined && (
              <span
                className={cn(
                  'rounded-full px-1.5 py-0.5 text-xs',
                  isActive
                    ? 'bg-primary-50 text-primary-600 dark:bg-primary-500/15 dark:text-primary-400'
                    : 'bg-neutral-100 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400'
                )}
              >
                {tab.count}
              </span>
            )}
            {isActive && (
              <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-primary-600 dark:bg-primary-400" />
            )}
          </button>
        );
      })}
    </div>
  );
}
