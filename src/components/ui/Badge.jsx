import { cn } from '../../utils/cn';

const variants = {
  neutral: 'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300',
  primary: 'bg-primary-50 text-primary-700 dark:bg-primary-500/15 dark:text-primary-300',
  success: 'bg-success-50 text-success-700 dark:bg-success-500/15 dark:text-success-400',
  warning: 'bg-warning-50 text-warning-700 dark:bg-warning-500/15 dark:text-warning-400',
  danger: 'bg-danger-50 text-danger-700 dark:bg-danger-500/15 dark:text-danger-400',
  info: 'bg-info-50 text-info-700 dark:bg-info-500/15 dark:text-info-400',
};

const dotColors = {
  neutral: 'bg-neutral-400',
  primary: 'bg-primary-500',
  success: 'bg-success-500',
  warning: 'bg-warning-500',
  danger: 'bg-danger-500',
  info: 'bg-info-500',
};

export default function Badge({ variant = 'neutral', dot = false, className, children }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium',
        variants[variant],
        className
      )}
    >
      {dot && <span className={cn('h-1.5 w-1.5 rounded-full', dotColors[variant])} />}
      {children}
    </span>
  );
}
