import { useQuery } from '@tanstack/react-query'
import { SaleTag02Icon } from 'hugeicons-react'

import { getSoldProductsInLast30Days } from '../../../api/get-sold-products-in-last-30-days'
import { MetricCard } from './metricCard'

export function SoldProductsInLast30Days() {
  const { data: soldProducts, isLoading: isLoadingSoldProducts } = useQuery({
    queryKey: ['metrics', 'sold-products-in-last-30-days'],
    queryFn: getSoldProductsInLast30Days,
    staleTime: Infinity,
  })

  return (
    <MetricCard
      icon={<SaleTag02Icon className="h-10 w-10 text-blue-dark" />}
      amount={soldProducts?.amount}
      metric="Produtos vendidos"
      isLoading={isLoadingSoldProducts}
    />
  )
}
