import { Skeleton } from '../../../components/skeleton'

interface MetricCardprops {
  icon: React.ReactNode
  amount: number | undefined
  metric: string
  isLoading?: boolean
}

export function MetricCard({
  icon,
  amount,
  metric,
  isLoading,
}: MetricCardprops) {
  return (
    <div className="flex gap-4 rounded-[20px] bg-white pl-3 pr-7">
      {isLoading ? (
        <>
          <Skeleton className="my-3 h-[86px] w-20 rounded-xl" />

          <div className="flex flex-1 flex-col justify-between py-5">
            <Skeleton className="h-7 w-14 rounded-xl" />
            <Skeleton className="h-7 rounded-xl" />
          </div>
        </>
      ) : (
        <>
          <div className="my-3 flex h-[86px] w-20 items-center justify-center rounded-xl bg-blue-light">
            {icon}
          </div>
          <div className="flex flex-1 flex-col justify-between py-5">
            <h1 className="title-lg text-gray-400">{amount}</h1>

            <p className="body-xs text-gray-300">{metric}</p>
          </div>
        </>
      )}
    </div>
  )
}
