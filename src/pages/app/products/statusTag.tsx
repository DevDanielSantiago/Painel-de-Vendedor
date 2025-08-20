import { Status } from '../../../api/types/product'
import { Tag } from './tag'

interface StatusTagProps {
  productStatus: keyof typeof Status
}

export function StatusTag({ productStatus }: StatusTagProps) {
  const tagColor =
    productStatus === 'available'
      ? 'blueDark'
      : productStatus === 'sold'
        ? 'success'
        : 'gray300'

  return <Tag color={tagColor}>{Status[productStatus]}</Tag>
}
