import { cn } from '../../utils/cn';

export default function DeviceFrame({ children, className }) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl dark:border-neutral-800 dark:bg-neutral-900',
        className
      )}
    >
      <div className="flex items-center gap-1.5 border-b border-neutral-100 px-4 py-3 dark:border-neutral-800">
        <span className="h-2.5 w-2.5 rounded-full bg-danger-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-warning-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-success-400" />
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}
