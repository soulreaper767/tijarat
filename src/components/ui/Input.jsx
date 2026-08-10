import { forwardRef, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '../../utils/cn';

const sizes = {
  sm: 'h-8 text-sm',
  md: 'h-10 text-sm',
  lg: 'h-11 text-base',
};

const Input = forwardRef(function Input(
  {
    label,
    error,
    hint,
    icon: Icon,
    size = 'md',
    type = 'text',
    id,
    className,
    containerClassName,
    required,
    ...rest
  },
  ref
) {
  const [showPassword, setShowPassword] = useState(false);
  const inputId = id || rest.name;
  const isPassword = type === 'password';
  const resolvedType = isPassword && showPassword ? 'text' : type;

  return (
    <div className={cn('flex flex-col gap-1.5', containerClassName)}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-neutral-700 dark:text-neutral-200"
        >
          {label}
          {required && <span className="ml-0.5 text-danger-500">*</span>}
        </label>
      )}

      <div className="relative">
        {Icon && (
          <Icon
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
          />
        )}

        <input
          ref={ref}
          id={inputId}
          type={resolvedType}
          aria-invalid={!!error}
          className={cn(
            'w-full rounded-lg border bg-white px-3 text-neutral-900 placeholder:text-neutral-400 transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-offset-0',
            'disabled:cursor-not-allowed disabled:bg-neutral-50 disabled:text-neutral-400',
            'dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder:text-neutral-500 dark:disabled:bg-neutral-800',
            error
              ? 'border-danger-400 focus:border-danger-500 focus:ring-danger-200 dark:border-danger-500 dark:focus:ring-danger-900'
              : 'border-neutral-300 focus:border-primary-500 focus:ring-primary-100 dark:border-neutral-700 dark:focus:ring-primary-900',
            Icon && 'pl-9',
            isPassword && 'pr-9',
            sizes[size],
            className
          )}
          {...rest}
        />

        {isPassword && (
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setShowPassword((s) => !s)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>

      {error ? (
        <p className="text-xs text-danger-600 dark:text-danger-400">{error}</p>
      ) : hint ? (
        <p className="text-xs text-neutral-500 dark:text-neutral-400">{hint}</p>
      ) : null}
    </div>
  );
});

export default Input;
