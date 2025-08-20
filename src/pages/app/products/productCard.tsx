import { product } from '../../../api/types/product'
import { Skeleton } from '../../../components/skeleton'
import { StatusTag } from './statusTag'
import { Tag } from './tag'

export function ProductCard({
  title,
  description,
  priceInCents,
  status,
  category,
  attachments,
}: product) {
  return (
    <div className="hover:border-blue-base relative flex w-[331px] cursor-pointer flex-col gap-1 rounded-[20px] border-2 border-transparent bg-white p-1">
      <div className="h-36">
        <img
          src={attachments[0]?.url}
          className="h-full w-full rounded-2xl object-cover"
          alt="Imagem do produto"
        />
      </div>

      <div className="flex h-[94px] flex-col gap-2 px-3 pb-4 pt-3">
        <div className="flex items-center justify-between gap-4">
          <div className="subtitle text-gray-400">
            <p>{title}</p>
          </div>

          <div className="flex gap-1 text-gray-500">
            <span className="label-md mt-1">R$</span>
            <p className="title-sm">
              {(priceInCents / 100).toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
              })}
            </p>
          </div>
        </div>

        <pre className="body-sm truncate-multiline h-full text-gray-300">
          {description}
        </pre>
      </div>

      <div className="end absolute right-3 top-3 flex h-5 gap-1">
        <StatusTag productStatus={status} />

        <Tag color="gray400">{category?.title}</Tag>
      </div>
    </div>
  )
}

export function ProductCardSkeleton() {
  return (
    <div className="flex w-[331px] flex-col gap-1 rounded-[20px] border-2 border-transparent bg-white p-1">
      <Skeleton className="h-36 w-full rounded-2xl" />

      <div className="flex h-[94px] flex-col gap-2 px-3 pb-4 pt-3">
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-32 rounded-2xl" />

          <Skeleton className="h-5 w-28 rounded-2xl" />
        </div>

        <Skeleton className="h-full w-full rounded-2xl" />
      </div>
    </div>
  )
}
