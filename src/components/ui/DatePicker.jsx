import { useEffect, useRef, useState } from 'react';
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../utils/cn';

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

function isSameDay(a, b) {
  return (
    !!a &&
    !!b &&
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function buildGrid(viewDate) {
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstOfMonth = new Date(year, month, 1);
  const startOffset = firstOfMonth.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells = [];
  for (let i = 0; i < startOffset; i++) {
    const d = new Date(year, month, 1 - (startOffset - i));
    cells.push({ date: d, inMonth: false });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ date: new Date(year, month, d), inMonth: true });
  }
  while (cells.length % 7 !== 0 || cells.length < 42) {
    const last = cells[cells.length - 1].date;
    const next = new Date(last);
    next.setDate(next.getDate() + 1);
    cells.push({ date: next, inMonth: false });
  }
  return cells;
}

export default function DatePicker({
  label,
  value,
  onChange,
  placeholder = 'Select date',
  minDate,
  maxDate,
  error,
  hint,
  className,
  containerClassName,
}) {
  const [open, setOpen] = useState(false);
  const [viewDate, setViewDate] = useState(value || new Date());
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

  const cells = buildGrid(viewDate);
  const today = new Date();

  const isDisabled = (date) => (minDate && date < minDate) || (maxDate && date > maxDate);

  const monthLabel = viewDate.toLocaleDateString(undefined, { month: 'long', year: 'numeric' });
  const displayValue = value
    ? value.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
    : '';

  return (
    <div className={cn('flex flex-col gap-1.5', containerClassName)} ref={ref}>
      {label && (
        <label className="text-sm font-medium text-neutral-700 dark:text-neutral-200">{label}</label>
      )}

      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className={cn(
            'flex h-10 w-full items-center gap-2 rounded-lg border bg-white px-3 text-left text-sm text-neutral-900 transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-offset-0',
            'dark:bg-neutral-900 dark:text-neutral-100',
            error
              ? 'border-danger-400 focus:border-danger-500 focus:ring-danger-200 dark:border-danger-500 dark:focus:ring-danger-900'
              : 'border-neutral-300 focus:border-primary-500 focus:ring-primary-100 dark:border-neutral-700 dark:focus:ring-primary-900',
            className
          )}
        >
          <CalendarDays size={16} className="shrink-0 text-neutral-400" />
          <span className={cn(!displayValue && 'text-neutral-400')}>
            {displayValue || placeholder}
          </span>
        </button>

        {open && (
          <div className="absolute z-40 mt-2 w-72 rounded-xl border border-neutral-200 bg-white p-3 shadow-lg dark:border-neutral-800 dark:bg-neutral-900">
            <div className="flex items-center justify-between px-1 pb-2">
              <button
                type="button"
                onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1))}
                className="rounded-md p-1 text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                <ChevronLeft size={16} />
              </button>
              <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                {monthLabel}
              </span>
              <button
                type="button"
                onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1))}
                className="rounded-md p-1 text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                <ChevronRight size={16} />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 px-1 pb-1 text-center text-xs font-medium text-neutral-400">
              {WEEKDAYS.map((d) => (
                <span key={d}>{d}</span>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1 px-1">
              {cells.map(({ date, inMonth }) => {
                const selected = isSameDay(date, value);
                const isToday = isSameDay(date, today);
                const disabled = isDisabled(date);

                return (
                  <button
                    key={date.toISOString()}
                    type="button"
                    disabled={disabled}
                    onClick={() => {
                      onChange?.(date);
                      setOpen(false);
                    }}
                    className={cn(
                      'flex h-8 w-8 items-center justify-center rounded-md text-sm transition-colors',
                      'disabled:cursor-not-allowed disabled:opacity-30',
                      !inMonth && 'text-neutral-300 dark:text-neutral-600',
                      inMonth && !selected && 'text-neutral-700 hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-800',
                      selected && 'bg-primary-600 text-white hover:bg-primary-600',
                      !selected && isToday && 'font-semibold text-primary-600 dark:text-primary-400'
                    )}
                  >
                    {date.getDate()}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {error ? (
        <p className="text-xs text-danger-600 dark:text-danger-400">{error}</p>
      ) : hint ? (
        <p className="text-xs text-neutral-500 dark:text-neutral-400">{hint}</p>
      ) : null}
    </div>
  );
}
