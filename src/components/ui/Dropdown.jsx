import { useEffect, useRef, useState } from 'react';
import { cn } from '../../utils/cn';

export default function Dropdown({ trigger, items, align = 'right', className }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

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
    <div className="relative inline-block" ref={ref}>
      <div onClick={() => setOpen((o) => !o)}>{trigger}</div>

      {open && (
        <div
          className={cn(
            'absolute z-40 mt-2 min-w-[12rem] rounded-lg border border-neutral-200 bg-white py-1 shadow-lg',
            'dark:border-neutral-800 dark:bg-neutral-900',
            align === 'right' ? 'right-0' : 'left-0',
            className
          )}
        >
          {items.map((item, i) =>
            item.type === 'divider' ? (
              <div key={i} className="my-1 h-px bg-neutral-200 dark:bg-neutral-800" />
            ) : (
              <button
                key={item.label}
                type="button"
                disabled={item.disabled}
                onClick={() => {
                  item.onClick?.();
                  setOpen(false);
                }}
                className={cn(
                  'flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm transition-colors',
                  'disabled:cursor-not-allowed disabled:opacity-50',
                  item.danger
                    ? 'text-danger-600 hover:bg-danger-50 dark:text-danger-400 dark:hover:bg-danger-500/10'
                    : 'text-neutral-700 hover:bg-neutral-50 dark:text-neutral-200 dark:hover:bg-neutral-800'
                )}
              >
                {item.icon && <item.icon size={15} />}
                {item.label}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
}
