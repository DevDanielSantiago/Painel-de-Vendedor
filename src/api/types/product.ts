import { attachment } from './attachment'
import { category } from './category'
import { seller } from './seller'

export enum Status {
  available = 'Anunciado',
  sold = 'Vendido',
  cancelled = 'Desabilitado',
}

export type product = {
  id: string
  title: string
  description: string
  priceInCents: number
  status: keyof typeof Status
  owner: seller
  category: category
  attachments: attachment[]
}
