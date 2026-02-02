export function SkeletonLine({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse rounded bg-gray-200 ${className}`} />;
}

export function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-3">
      <SkeletonLine className="h-4 w-1/3" />
      <SkeletonLine className="h-3 w-2/3" />
      <SkeletonLine className="h-3 w-1/2" />
    </div>
  );
}

export function SkeletonTable({ rows = 5 }: { rows?: number }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div className="px-4 py-3 bg-gray-50">
        <SkeletonLine className="h-3 w-full" />
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="px-4 py-4 border-t border-gray-50 flex gap-4">
          <SkeletonLine className="h-3 w-12" />
          <SkeletonLine className="h-3 w-1/3" />
          <SkeletonLine className="h-3 w-1/4" />
          <SkeletonLine className="h-3 w-16" />
        </div>
      ))}
    </div>
  );
}
