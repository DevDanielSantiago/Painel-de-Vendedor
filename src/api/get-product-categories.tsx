import { api } from '../lib/axios'
import { category } from './types/category'

interface GetProductCategoriesResponse {
  categories: category[]
}

export async function getProductCategories() {
  const response = await api.get<GetProductCategoriesResponse>('/categories')

  return response.data?.categories
}
