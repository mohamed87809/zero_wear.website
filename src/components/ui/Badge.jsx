// src/components/ui/Badge.jsx

const variantStyles = {
  default: 'bg-[#f9fafb] text-[#374151] border border-[#e5e7eb] dark:bg-white/5 dark:text-white/50 dark:border-white/10',
  success: 'bg-[#16a34a]/10 text-[#16a34a] border border-[#16a34a]/20 dark:bg-[#16a34a]/20 dark:text-[#16a34a]/10 dark:border-[#16a34a]/30',
  accent: 'bg-[#2563eb]/10 text-[#2563eb] border border-[#2563eb]/20 dark:bg-[#2563eb]/20 dark:text-[#2563eb]/10 dark:border-[#2563eb]/30',
  danger: 'bg-red-50 text-red-600 border border-red-200 dark:bg-red-100 dark:text-red-600 dark:border-red-200',
  outline: 'bg-transparent text-[#111827] border border-[#e5e7eb] dark:text-white/50 dark:border-white/10',
};

const sizeStyles = {
  sm: 'px-2.5 py-1 text-[11px]',
  md: 'px-3 py-1.5 text-xs',
};

function Badge({ children, variant = 'default', size = 'sm', className = '' }) {
  return (
    <span
      className={`
        inline-flex items-center gap-1 rounded-full font-semibold uppercase tracking-wide
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}

export default Badge;