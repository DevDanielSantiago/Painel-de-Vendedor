interface SkeletonProps {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-gray-300 ${className || 'h-5 w-full rounded-xl'}`}
    />
  )
}
