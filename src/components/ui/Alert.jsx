import { AlertTriangle, CheckCircle2, Info, X, XCircle } from 'lucide-react';
import { cn } from '../../utils/cn';

const variants = {
  info: {
    wrap: 'bg-info-50 border-info-200 text-info-800 dark:bg-info-500/10 dark:border-info-900 dark:text-info-300',
    icon: Info,
    iconColor: 'text-info-500',
  },
  success: {
    wrap: 'bg-success-50 border-success-200 text-success-800 dark:bg-success-500/10 dark:border-success-900 dark:text-success-300',
    icon: CheckCircle2,
    iconColor: 'text-success-500',
  },
  warning: {
    wrap: 'bg-warning-50 border-warning-200 text-warning-800 dark:bg-warning-500/10 dark:border-warning-900 dark:text-warning-300',
    icon: AlertTriangle,
    iconColor: 'text-warning-500',
  },
  danger: {
    wrap: 'bg-danger-50 border-danger-200 text-danger-800 dark:bg-danger-500/10 dark:border-danger-900 dark:text-danger-300',
    icon: XCircle,
    iconColor: 'text-danger-500',
  },
};

export default function Alert({ variant = 'info', title, children, onDismiss, className }) {
  const config = variants[variant];
  const Icon = config.icon;

  return (
    <div className={cn('flex gap-3 rounded-lg border px-4 py-3', config.wrap, className)}>
      <Icon size={18} className={cn('mt-0.5 shrink-0', config.iconColor)} />
      <div className="flex-1 text-sm">
        {title && <p className="font-medium">{title}</p>}
        {children && <div className={cn(title && 'mt-0.5', 'opacity-90')}>{children}</div>}
      </div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="shrink-0 rounded-md p-0.5 opacity-60 hover:opacity-100"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
