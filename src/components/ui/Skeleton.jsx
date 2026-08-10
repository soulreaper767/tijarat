import { cn } from '../../utils/cn';

export default function Skeleton({ className }) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-800',
        className
      )}
    />
  );
}
