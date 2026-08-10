import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

const Textarea = forwardRef(function Textarea(
  { label, error, hint, id, className, containerClassName, required, rows = 4, ...rest },
  ref
) {
  const fieldId = id || rest.name;

  return (
    <div className={cn('flex flex-col gap-1.5', containerClassName)}>
      {label && (
        <label htmlFor={fieldId} className="text-sm font-medium text-neutral-700 dark:text-neutral-200">
          {label}
          {required && <span className="ml-0.5 text-danger-500">*</span>}
        </label>
      )}

      <textarea
        ref={ref}
        id={fieldId}
        rows={rows}
        aria-invalid={!!error}
        className={cn(
          'w-full resize-none rounded-lg border bg-white px-3 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-offset-0',
          'disabled:cursor-not-allowed disabled:bg-neutral-50 disabled:text-neutral-400',
          'dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder:text-neutral-500 dark:disabled:bg-neutral-800',
          error
            ? 'border-danger-400 focus:border-danger-500 focus:ring-danger-200 dark:border-danger-500 dark:focus:ring-danger-900'
            : 'border-neutral-300 focus:border-primary-500 focus:ring-primary-100 dark:border-neutral-700 dark:focus:ring-primary-900',
          className
        )}
        {...rest}
      />

      {error ? (
        <p className="text-xs text-danger-600 dark:text-danger-400">{error}</p>
      ) : hint ? (
        <p className="text-xs text-neutral-500 dark:text-neutral-400">{hint}</p>
      ) : null}
    </div>
  );
});

export default Textarea;
