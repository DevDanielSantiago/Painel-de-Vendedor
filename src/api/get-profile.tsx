import { api } from '../lib/axios'
import { seller } from './types/seller'

interface GetProfileResponse {
  seller: seller
}

export async function getProfile() {
  const response = await api.get<GetProfileResponse>('/sellers/me')

  return response.data?.seller
}
