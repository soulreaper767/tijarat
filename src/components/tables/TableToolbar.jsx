import SearchField from '../forms/SearchField';
import { cn } from '../../utils/cn';

export default function TableToolbar({ title, count, searchValue, onSearchChange, searchPlaceholder = 'Search...', actions, className }) {
  return (
    <div className={cn('flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between', className)}>
      {title && (
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">{title}</h3>
          {count !== undefined && (
            <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400">
              {count}
            </span>
          )}
        </div>
      )}

      <div className="flex items-center gap-2 sm:ml-auto">
        {onSearchChange && (
          <SearchField
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full sm:w-64"
          />
        )}
        {actions}
      </div>
    </div>
  );
}
