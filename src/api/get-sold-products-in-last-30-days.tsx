import { api } from '../lib/axios'

interface GetSoldProductsInLast30DaysResponse {
  amount: number
}

export async function getSoldProductsInLast30Days() {
  const response = await api.get<GetSoldProductsInLast30DaysResponse>(
    '/sellers/metrics/products/sold',
  )

  return response.data
}
