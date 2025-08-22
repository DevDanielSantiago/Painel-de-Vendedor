import { useMutation } from '@tanstack/react-query'
import { Tick02Icon, UnavailableIcon } from 'hugeicons-react'
import { toast } from 'sonner'

import {
  changeProductStatus,
  ChangeProductStatusParams,
} from '../../../api/change-product-status'
import { GetProductByIdResponse } from '../../../api/get-product-by-id'
import { Status } from '../../../api/types/product'
import { Skeleton } from '../../../components/skeleton'
import { queryClient } from '../../../lib/react-query'

interface ChangeProductStatusProps {
  productId: string
  productStatus: keyof typeof Status | undefined
}

export function ChangeProductStatus({
  productId,
  productStatus,
}: ChangeProductStatusProps) {
  const {
    mutateAsync: changeProductStatusFn,
    isPending: isChangindProductStatus,
  } = useMutation({
    mutationFn: changeProductStatus,
    onSuccess(_, { id, status }) {
      const cached = queryClient.getQueryData<GetProductByIdResponse>([
        'product',
        id,
      ])

      if (cached) {
        queryClient.setQueryData<GetProductByIdResponse>(['product', id], {
          product: { ...cached.product, status },
        })
      }

      queryClient.invalidateQueries({ queryKey: ['products'] })

      queryClient.invalidateQueries({
        queryKey: ['metrics', 'sold-products-in-last-30-days'],
      })
      queryClient.invalidateQueries({
        queryKey: ['metrics', 'available-roducts-in-last-30-days'],
      })
    },
  })

  async function handleChangeProductStatus({
    id,
    status,
  }: ChangeProductStatusParams) {
    try {
      await changeProductStatusFn({ id, status })

      toast.success(`Status do produto alterado com sucesso!`)
    } catch (error) {
      toast.error('Erro ao alterar o status do produto.')
    }
  }

  return (
    <div className="flex gap-4 text-orange-base">
      {productStatus === 'available' ? (
        <>
          <button
            className={`action-sm flex items-end gap-2 p-0.5
                  ${
                    isChangindProductStatus
                      ? 'opacity-55'
                      : 'hover:text-orange-dark'
                  }`}
            disabled={isChangindProductStatus}
            onClick={() =>
              handleChangeProductStatus({ id: productId, status: 'sold' })
            }
          >
            <Tick02Icon className="h-5 w-5" />
            Marcar como vendido
          </button>

          <button
            className={`action-sm flex items-end gap-2 p-0.5
                  ${
                    isChangindProductStatus
                      ? 'opacity-55'
                      : 'hover:text-orange-dark'
                  }`}
            disabled={isChangindProductStatus}
            onClick={() =>
              handleChangeProductStatus({ id: productId, status: 'cancelled' })
            }
          >
            <UnavailableIcon className="h-5 w-5" />
            Desativar anúncio
          </button>
        </>
      ) : productStatus === 'sold' ? (
        <>
          <button
            className={`action-sm flex items-end gap-2 p-0.5
                  ${
                    isChangindProductStatus
                      ? 'opacity-55'
                      : 'hover:text-orange-dark'
                  }`}
            disabled={isChangindProductStatus}
            onClick={() =>
              handleChangeProductStatus({ id: productId, status: 'available' })
            }
          >
            <Tick02Icon className="h-5 w-5" />
            Marcar como disponível
          </button>

          <button
            className="action-sm flex items-end gap-2 p-0.5 opacity-55"
            disabled
          >
            <UnavailableIcon className="h-5 w-5" />
            Produto vendiddo
          </button>
        </>
      ) : productStatus === 'cancelled' ? (
        <>
          <button
            className={`action-sm flex items-end gap-2 p-0.5
                  ${
                    isChangindProductStatus
                      ? 'opacity-55'
                      : 'hover:text-orange-dark'
                  }`}
            disabled={isChangindProductStatus}
            onClick={() =>
              handleChangeProductStatus({ id: productId, status: 'available' })
            }
          >
            <Tick02Icon className="h-5 w-5" />
            Reativar produto
          </button>

          <button
            className="action-sm flex items-end gap-2 p-0.5 opacity-55"
            disabled
          >
            <UnavailableIcon className="h-5 w-5" />
            Produto desabilitado
          </button>
        </>
      ) : (
        <>
          <Skeleton className="h-6 w-[170px] rounded-xl" />
          <Skeleton className="h-6 w-[170px] rounded-xl" />
        </>
      )}
    </div>
  )
}
