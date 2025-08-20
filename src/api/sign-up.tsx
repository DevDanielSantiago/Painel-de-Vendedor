import { api } from '../lib/axios'
import { seller } from './types/seller'

export interface SignUpBody {
  name: string
  phone: string
  avatarId: string | null
  email: string
  password: string
  passwordConfirmation: string
}

interface SignUpResponse {
  seller: seller
}

export async function signUp(body: SignUpBody): Promise<SignUpResponse> {
  const respose = await api.post<SignUpResponse>('/sellers', body)

  return respose.data
}
