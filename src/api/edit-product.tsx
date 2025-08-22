import { api } from '../lib/axios'
import { product } from './types/product'

export interface EditProductBody {
  id: string
  title: string
  categoryId: string
  description: string
  priceInCents: number
  attachmentsIds: string[]
}

interface EditProductResponse {
  product: product
}

export async function editProduct({
  id,
  ...body
}: EditProductBody): Promise<EditProductResponse> {
  const respose = await api.put<EditProductResponse>(`/products/${id}`, body)

  return respose.data
}
