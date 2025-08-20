import { api } from '../lib/axios'
import { product } from './types/product'

export interface GetSellerProductsQuery {
  search?: string | null
  status?: string | null
}

interface GetSellerProductsResponse {
  products: product[]
}

export async function getSellerProducts({
  search,
  status,
}: GetSellerProductsQuery) {
  const response = await api.get<GetSellerProductsResponse>('/products/me', {
    params: {
      search,
      status,
    },
  })

  return response.data?.products
}
