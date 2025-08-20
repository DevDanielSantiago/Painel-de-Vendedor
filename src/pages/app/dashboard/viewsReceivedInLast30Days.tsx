import { useQuery } from '@tanstack/react-query'
import { UserMultipleIcon } from 'hugeicons-react'

import { getViewsReceivedInLast30Days } from '../../../api/views-received-in-last-30-days'
import { MetricCard } from './metricCard'

export function ViewsReceivedInLast30Days() {
  const { data: viewsReceived, isLoading: isLoadingViewsReceived } = useQuery({
    queryKey: ['mretics', 'views-received-in-last-30-days'],
    queryFn: getViewsReceivedInLast30Days,
  })

  return (
    <MetricCard
      icon={<UserMultipleIcon className="h-10 w-10" />}
      amount={viewsReceived?.amount}
      metric="Pessoas visitantes"
      isLoading={isLoadingViewsReceived}
    />
  )
}
