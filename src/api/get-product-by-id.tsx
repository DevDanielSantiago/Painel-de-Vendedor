import { api } from '../lib/axios'
import { product } from './types/product'

interface GetProductByIdParams {
  id: string
}

export interface GetProductByIdResponse {
  product: product
}

export async function getProductById({ id }: GetProductByIdParams) {
  const response = await api.get<GetProductByIdResponse>(`/products/${id}`)

  return response.data
}
