import { Search } from 'lucide-react';
import { cn } from '../../utils/cn';

export default function SearchField({ placeholder = 'Search...', className, ...rest }) {
  return (
    <div className={cn('relative', className)}>
      <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
      <input
        type="text"
        placeholder={placeholder}
        className={cn(
          'h-10 w-full rounded-lg border border-neutral-200 bg-neutral-50 pl-9 pr-3 text-sm text-neutral-900 placeholder:text-neutral-400 transition-colors',
          'focus:border-primary-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-100',
          'dark:border-neutral-800 dark:bg-neutral-800/60 dark:text-neutral-100 dark:placeholder:text-neutral-500',
          'dark:focus:border-primary-500 dark:focus:bg-neutral-900 dark:focus:ring-primary-900'
        )}
        {...rest}
      />
    </div>
  );
}
