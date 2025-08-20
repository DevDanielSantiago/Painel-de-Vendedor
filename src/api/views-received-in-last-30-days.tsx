import { api } from '../lib/axios'

interface getViewsReceivedInLast30DaysResponse {
  amount: number
}

export async function getViewsReceivedInLast30Days() {
  const response = await api.get<getViewsReceivedInLast30DaysResponse>(
    '/sellers/metrics/views',
  )

  return response.data
}
