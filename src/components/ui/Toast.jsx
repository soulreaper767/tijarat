import { createContext, useCallback, useContext, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AlertTriangle, CheckCircle2, Info, X, XCircle } from 'lucide-react';
import { cn } from '../../utils/cn';

const ToastContext = createContext(null);

const variants = {
  info: { icon: Info, iconColor: 'text-info-500' },
  success: { icon: CheckCircle2, iconColor: 'text-success-500' },
  warning: { icon: AlertTriangle, iconColor: 'text-warning-500' },
  danger: { icon: XCircle, iconColor: 'text-danger-500' },
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const idRef = useRef(0);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    ({ variant = 'info', title, description, duration = 4000 }) => {
      const id = ++idRef.current;
      setToasts((prev) => [...prev, { id, variant, title, description }]);
      if (duration) setTimeout(() => removeToast(id), duration);
      return id;
    },
    [removeToast]
  );

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      {createPortal(
        <div className="fixed bottom-4 right-4 z-[60] flex w-full max-w-sm flex-col gap-2">
          {toasts.map((toast) => {
            const config = variants[toast.variant];
            const Icon = config.icon;
            return (
              <div
                key={toast.id}
                className="animate-toast-in flex gap-3 rounded-lg border border-neutral-200 bg-white px-4 py-3 shadow-lg dark:border-neutral-800 dark:bg-neutral-900"
              >
                <Icon size={18} className={cn('mt-0.5 shrink-0', config.iconColor)} />
                <div className="flex-1 text-sm">
                  {toast.title && (
                    <p className="font-medium text-neutral-900 dark:text-neutral-100">{toast.title}</p>
                  )}
                  {toast.description && (
                    <p className="mt-0.5 text-neutral-500 dark:text-neutral-400">{toast.description}</p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => removeToast(toast.id)}
                  className="shrink-0 rounded-md p-0.5 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
                >
                  <X size={16} />
                </button>
              </div>
            );
          })}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within a ToastProvider');
  return ctx;
}
