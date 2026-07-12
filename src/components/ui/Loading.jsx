// src/components/ui/Loading.jsx

export function Spinner({ size = 'md', className = '' }) {
  const sizeStyles = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-[3px]',
    lg: 'h-12 w-12 border-4',
  };

  return (
    <div
      role="status"
      aria-label="Loading"
      className={`
        animate-spin rounded-full border-[#e5e7eb] border-t-[#2563eb]
        ${sizeStyles[size]}
        ${className}
      `}
    />
  );
}

export function Skeleton({ className = '' }) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-[#e5e7eb] ${className}`}
      aria-hidden="true"
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <Skeleton className="aspect-[3/4] w-full rounded-2xl" />
      <Skeleton className="h-4 w-3/4 rounded-md" />
      <Skeleton className="h-4 w-1/3 rounded-md" />
    </div>
  );
}

function Loading({ label = 'Loading...', fullScreen = false }) {
  return (
    <div
      className={`
        flex flex-col items-center justify-center gap-3
        ${fullScreen ? 'min-h-screen' : 'py-16'}
      `}
    >
      <Spinner size="lg" />
      {label && <p className="text-sm font-medium text-[#374151]">{label}</p>}
    </div>
  );
}

export default Loading;