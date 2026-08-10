import { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../utils/cn';

const sizes = {
  sm: 'h-8 text-sm',
  md: 'h-10 text-sm',
  lg: 'h-11 text-base',
};

const Select = forwardRef(function Select(
  {
    label,
    error,
    hint,
    size = 'md',
    options = [],
    placeholder,
    id,
    className,
    containerClassName,
    required,
    ...rest
  },
  ref
) {
  const selectId = id || rest.name;

  return (
    <div className={cn('flex flex-col gap-1.5', containerClassName)}>
      {label && (
        <label
          htmlFor={selectId}
          className="text-sm font-medium text-neutral-700 dark:text-neutral-200"
        >
          {label}
          {required && <span className="ml-0.5 text-danger-500">*</span>}
        </label>
      )}

      <div className="relative">
        <select
          ref={ref}
          id={selectId}
          aria-invalid={!!error}
          defaultValue={rest.value === undefined && rest.defaultValue === undefined ? '' : undefined}
          className={cn(
            'w-full appearance-none rounded-lg border bg-white pl-3 pr-9 text-neutral-900 transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-offset-0',
            'disabled:cursor-not-allowed disabled:bg-neutral-50 disabled:text-neutral-400',
            'dark:bg-neutral-900 dark:text-neutral-100 dark:disabled:bg-neutral-800',
            error
              ? 'border-danger-400 focus:border-danger-500 focus:ring-danger-200 dark:border-danger-500 dark:focus:ring-danger-900'
              : 'border-neutral-300 focus:border-primary-500 focus:ring-primary-100 dark:border-neutral-700 dark:focus:ring-primary-900',
            sizes[size],
            className
          )}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </option>
          ))}
        </select>

        <ChevronDown
          size={16}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400"
        />
      </div>

      {error ? (
        <p className="text-xs text-danger-600 dark:text-danger-400">{error}</p>
      ) : hint ? (
        <p className="text-xs text-neutral-500 dark:text-neutral-400">{hint}</p>
      ) : null}
    </div>
  );
});

export default Select;
