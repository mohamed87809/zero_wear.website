// src/components/ui/Input.jsx

import { forwardRef } from 'react';

const Input = forwardRef(
  (
    {
      label,
      name,
      id,
      error,
      required = false,
      className = '',
      containerClassName = '',
      ...rest
    },
    ref
  ) => {
    const inputId = id || name;

    return (
      <div className={`flex flex-col gap-1.5 ${containerClassName}`}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-[#111827]"
          >
            {label}
            {required && <span className="ml-0.5 text-red-500">*</span>}
          </label>
        )}

        <input
          id={inputId}
          name={name}
          ref={ref}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          className={`
            w-full rounded-xl border bg-white px-4 py-3 text-sm text-[#111827]
            placeholder:text-[#374151]/50
            focus:outline-none focus:ring-2 focus:ring-offset-1
            disabled:cursor-not-allowed disabled:bg-[#f9fafb] disabled:opacity-70
            transition-colors duration-150
            ${
              error
                ? 'border-red-400 focus:ring-red-400'
                : 'border-[#e5e7eb] focus:ring-[#2563eb]'
            }
            ${className}
          `}
          {...rest}
        />

        {error && (
          <p id={`${inputId}-error`} className="text-xs font-medium text-red-500">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;