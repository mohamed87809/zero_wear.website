// src/components/ui/Button.jsx

import { motion } from 'framer-motion';

const variantStyles = {
  primary:
    'bg-[#111827] text-white hover:bg-[#374151] focus-visible:ring-[#111827] dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:focus-visible:ring-white/10',
  secondary:
    'bg-[#2563eb] text-white hover:bg-[#1d4ed8] focus-visible:ring-[#2563eb]',
  outline:
    'bg-transparent text-[#111827] border border-[#e5e7eb] hover:bg-[#f9fafb] focus-visible:ring-[#111827] dark:text-white/50 dark:border-white/10',
  ghost:
    'bg-transparent text-[#374151] hover:bg-[#f9fafb] focus-visible:ring-[#374151] dark:text-white/50 dark:hover:bg-white/10 dark:focus-visible:ring-white/50',
  danger:
    'bg-transparent text-red-600 border border-red-200 hover:bg-red-50 focus-visible:ring-red-500 dark:text-red-400 dark:border-red-600 dark:hover:bg-red-600/10 dark:focus-visible:ring-red-400',
};

const sizeStyles = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
};

function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  disabled = false,
  type = 'button',
  className = '',
  onClick,
  ...rest
}) {
  const isDisabled = disabled || isLoading;

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      whileTap={!isDisabled ? { scale: 0.97 } : undefined}
      className={`
        inline-flex items-center justify-center gap-2 rounded-xl font-medium
        transition-colors duration-200 ease-in-out
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
        disabled:cursor-not-allowed disabled:opacity-50 dark:disabled:opacity-60
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...rest}
    >
      {isLoading && (
        <svg
          className="h-4 w-4 animate-spin text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
      )}
      {children}
    </motion.button>
  );
}

export default Button;