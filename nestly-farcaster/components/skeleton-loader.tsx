export function SkeletonLoader() {
  return <div className="bg-muted animate-pulse rounded-lg h-full" />
}

export function AttractionCardSkeleton() {
  return (
    <div className="bg-white border border-border rounded-xl overflow-hidden">
      <SkeletonLoader />
      <div className="p-5 space-y-4">
        <div className="h-6 bg-muted rounded animate-pulse" />
        <div className="space-y-2">
          <div className="h-4 bg-muted rounded animate-pulse" />
          <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
        </div>
        <div className="h-10 bg-muted rounded-lg animate-pulse" />
      </div>
    </div>
  )
}

export function AttractionDetailSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-64 bg-muted rounded-lg animate-pulse" />
      <div className="space-y-4">
        <div className="h-8 bg-muted rounded animate-pulse w-1/2" />
        <div className="h-4 bg-muted rounded animate-pulse w-1/3" />
        <div className="space-y-2">
          <div className="h-4 bg-muted rounded animate-pulse" />
          <div className="h-4 bg-muted rounded animate-pulse" />
        </div>
      </div>
    </div>
  )
}
