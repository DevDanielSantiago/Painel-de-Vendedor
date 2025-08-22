import { api } from '../lib/axios'
import { product } from './types/product'

export interface CreateProductBody {
  title: string
  categoryId: string
  description: string | null
  priceInCents: number
  attachmentsIds: (string | null)[]
}

interface CreateProductResponse {
  product: product
}

export async function createProduct(
  body: CreateProductBody,
): Promise<CreateProductResponse> {
  const respose = await api.post<CreateProductResponse>('/products', body)

  return respose.data
}
