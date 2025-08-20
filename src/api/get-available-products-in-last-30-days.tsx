import { api } from '../lib/axios'

interface GetAvailableProductsInLast30DaysResponse {
  amount: number
}

export async function getAvailableProductsInLast30Days() {
  const response = await api.get<GetAvailableProductsInLast30DaysResponse>(
    '/sellers/metrics/products/available',
  )

  return response.data
}
