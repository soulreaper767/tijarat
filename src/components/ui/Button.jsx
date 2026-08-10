import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/cn';

const variants = {
  primary:
    'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 focus-visible:ring-primary-500 dark:bg-primary-500 dark:hover:bg-primary-400',
  secondary:
    'bg-neutral-100 text-neutral-900 hover:bg-neutral-200 active:bg-neutral-300 focus-visible:ring-neutral-400 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700',
  outline:
    'border border-neutral-300 text-neutral-700 hover:bg-neutral-50 active:bg-neutral-100 focus-visible:ring-neutral-400 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800',
  ghost:
    'text-neutral-700 hover:bg-neutral-100 active:bg-neutral-200 focus-visible:ring-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-800',
  danger:
    'bg-danger-600 text-white hover:bg-danger-700 active:bg-danger-700 focus-visible:ring-danger-500',
  inverse:
    'border border-white/30 text-white hover:bg-white/10 active:bg-white/15 focus-visible:ring-white/60',
};

const sizes = {
  sm: 'h-8 px-3 text-sm gap-1.5',
  md: 'h-10 px-4 text-sm gap-2',
  lg: 'h-11 px-5 text-base gap-2',
};

const iconSizes = {
  sm: 14,
  md: 16,
  lg: 18,
};

export default function Button({
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconRight: IconRight,
  loading = false,
  fullWidth = false,
  disabled = false,
  className,
  children,
  ...rest
}) {
  return (
    <button
      disabled={disabled || loading}
      className={cn(
        'inline-flex items-center justify-center rounded-lg font-medium transition-colors duration-150',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ring-offset-white dark:ring-offset-neutral-950',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className
      )}
      {...rest}
    >
      {loading ? (
        <Loader2 size={iconSizes[size]} className="animate-spin" />
      ) : (
        Icon && <Icon size={iconSizes[size]} />
      )}
      {children}
      {!loading && IconRight && <IconRight size={iconSizes[size]} />}
    </button>
  );
}
