import { useEffect, useRef, useState } from 'react';
import { AlertTriangle, Bell, CheckCircle2, PackageCheck } from 'lucide-react';
import { cn } from '../../utils/cn';

const NOTIFICATIONS = [
  {
    id: 1,
    icon: AlertTriangle,
    iconColor: 'text-warning-500',
    title: 'Low stock alert',
    description: 'Energy Drink 250ml is below reorder threshold.',
    time: '12m ago',
    unread: true,
  },
  {
    id: 2,
    icon: CheckCircle2,
    iconColor: 'text-success-500',
    title: 'Payment recorded',
    description: 'Rs 450,000 collected from ABC Distributors.',
    time: '1h ago',
    unread: true,
  },
  {
    id: 3,
    icon: PackageCheck,
    iconColor: 'text-primary-500',
    title: 'Order fulfilled',
    description: 'Order #ORD-4821 has been shipped to Lahore.',
    time: 'Yesterday',
    unread: false,
  },
];

export default function NotificationMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const unreadCount = NOTIFICATIONS.filter((n) => n.unread).length;

  useEffect(() => {
    if (!open) return;
    const onClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onClickOutside);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onClickOutside);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="relative rounded-lg p-2 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-200"
      >
        <Bell size={19} />
        {unreadCount > 0 && (
          <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-danger-500 text-[10px] font-semibold text-white">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 z-40 mt-2 w-80 rounded-xl border border-neutral-200 bg-white shadow-lg dark:border-neutral-800 dark:bg-neutral-900">
          <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-3 dark:border-neutral-800">
            <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">Notifications</span>
            <span className="text-xs text-neutral-400">{unreadCount} unread</span>
          </div>

          <div className="max-h-80 overflow-y-auto">
            {NOTIFICATIONS.map((n) => (
              <div
                key={n.id}
                className={cn(
                  'flex gap-3 border-b border-neutral-100 px-4 py-3 last:border-0 dark:border-neutral-800',
                  n.unread && 'bg-primary-50/40 dark:bg-primary-500/5'
                )}
              >
                <n.icon size={16} className={cn('mt-0.5 shrink-0', n.iconColor)} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-neutral-900 dark:text-neutral-100">
                    {n.title}
                  </p>
                  <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">{n.description}</p>
                  <p className="mt-1 text-xs text-neutral-400 dark:text-neutral-500">{n.time}</p>
                </div>
                {n.unread && <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-500" />}
              </div>
            ))}
          </div>

          <button
            type="button"
            className="w-full rounded-b-xl border-t border-neutral-200 py-2.5 text-center text-xs font-medium text-primary-600 hover:bg-neutral-50 dark:border-neutral-800 dark:text-primary-400 dark:hover:bg-neutral-800"
          >
            View all notifications
          </button>
        </div>
      )}
    </div>
  );
}
