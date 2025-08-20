import { api } from '../lib/axios'

interface GetSoldProductsInLast30DaysResponse {
  viewsPerDay: {
    date: Date
    amount: number
  }[]
}

export async function getViewsPerDayInLast30Days() {
  const response = await api.get<GetSoldProductsInLast30DaysResponse>(
    '/sellers/metrics/views/days',
  )

  return response.data?.viewsPerDay
}
