import { useQuery } from '@tanstack/react-query'
import { Store04Icon } from 'hugeicons-react'

import { getAvailableProductsInLast30Days } from '../../../api/get-available-products-in-last-30-days'
import { MetricCard } from './metricCard'

export function AvailableProductsInLast30Days() {
  const { data: availableProducts, isLoading: isLoadingAvailableProducts } =
    useQuery({
      queryKey: ['metrics', 'available-roducts-in-last-30-days'],
      queryFn: getAvailableProductsInLast30Days,
      staleTime: Infinity,
    })

  return (
    <MetricCard
      icon={<Store04Icon className="h-10 w-10 text-blue-dark" />}
      amount={availableProducts?.amount}
      metric="Produtos anunciados"
      isLoading={isLoadingAvailableProducts}
    />
  )
}
