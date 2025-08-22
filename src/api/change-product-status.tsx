import { api } from '../lib/axios'
import { product, Status } from './types/product'

export interface ChangeProductStatusParams {
  id: string
  status: keyof typeof Status
}

interface ChangeProductStatusResponse {
  product: product
}

export async function changeProductStatus({
  id,
  status,
}: ChangeProductStatusParams): Promise<ChangeProductStatusResponse> {
  const respose = await api.patch<ChangeProductStatusResponse>(
    `/products/${id}/${status}`,
  )

  return respose.data
}
