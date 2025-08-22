import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { ArrowLeft02Icon } from 'hugeicons-react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { editProduct } from '../../../api/edit-product'
import {
  getProductById,
  GetProductByIdResponse,
} from '../../../api/get-product-by-id'
import { getProductCategories } from '../../../api/get-product-categories'
import { uploadAttachments } from '../../../api/upload-attachments'
import { CustomSelect } from '../../../components/customSelect'
import { FieldErrorMessage } from '../../../components/fieldErrorMessage'
import { ImageUpload } from '../../../components/imageUpload'
import { InputWithIcon } from '../../../components/inputWithIcon'
import { Label } from '../../../components/label'
import { Skeleton } from '../../../components/skeleton'
import { Textarea } from '../../../components/textarea'
import { queryClient } from '../../../lib/react-query'
import { ChangeProductStatus } from './changeProductStatus'
import { StatusTag } from './statusTag'

const ACCEPTED_IMAGE_TYPES = ['image/png']

const priceRegex = /^\d{1,3}(\.\d{3})*(,\d{2})?$/ // 0.000,00

const editProductFormSchema = z.object({
  image: z
    .custom<FileList>()
    .optional()
    .refine(
      (files) => {
        return Array.from(files ?? []).every((file) =>
          ACCEPTED_IMAGE_TYPES.includes(file.type),
        )
      },
      {
        message: 'A imagem precisa ser do tipo PNG',
      },
    ),

  title: z.string().min(1, 'Informe o título'),

  price: z
    .string()
    .min(1, 'Informe o valor')
    .regex(priceRegex, 'Valor inválido')
    .refine(
      (val) => {
        const parsedValue = val.replace(/\./g, '').replace(',', '.')
        return parseFloat(parsedValue) > 0
      },
      { message: 'O Valor deve ser maior que zero' },
    ),

  description: z
    .string()
    .min(15, 'A descrição deve ter no mínimo 15 caracteres'),

  category: z.string().min(1, 'Selecione a categoria'),
})

export type EditProductForm = z.infer<typeof editProductFormSchema>

export function EditProduct() {
  const { id } = useParams() as { id: string }

  const navigate = useNavigate()

  const { data: { product } = {} } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductById({ id }),
    staleTime: Infinity,
  })

  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm<EditProductForm>({
    resolver: zodResolver(editProductFormSchema),
    values: {
      title: product?.title ?? '',
      price: product?.priceInCents ? centsToPrice(product?.priceInCents) : '',
      description: product?.description ?? '',
      category: product?.category.id ?? '',
    },
  })

  function priceToCents(price: string): number {
    const formattedPrice = price.replace(/\./g, '').replace(',', '.')

    return parseFloat(formattedPrice) * 100
  }

  function centsToPrice(cents: number): string {
    return (cents / 100).toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
    })
  }

  const { mutateAsync: uploadImage } = useMutation({
    mutationFn: uploadAttachments,
  })

  const { mutateAsync: editProductFn } = useMutation({
    mutationFn: editProduct,
    onSuccess({ product: editedProduct }) {
      queryClient.invalidateQueries({ queryKey: ['products'] })

      const cached = queryClient.getQueryData<GetProductByIdResponse>([
        'product',
        editedProduct.id,
      ])

      if (cached) {
        queryClient.setQueryData<GetProductByIdResponse>(
          ['product', editedProduct.id],
          {
            product: { ...cached.product, ...editedProduct },
          },
        )
      }
    },
  })

  const { data: categories = [] } = useQuery({
    queryKey: ['product-categories'],
    queryFn: getProductCategories,
    staleTime: Infinity,
  })

  const categoriesToSelect = categories?.map((category) => ({
    label: category.title,
    value: category.id,
  }))

  function handleGoBack() {
    navigate(-1)
  }

  async function handleEditProduct(data: EditProductForm) {
    try {
      let attachmentId = product?.attachments[0]?.id

      if (data.image?.length) {
        const files = new FormData()
        files.append('files', data.image[0])

        const uploadedImage = await uploadImage({ files })
        attachmentId = uploadedImage?.attachments[0]?.id
      }

      if (!attachmentId) {
        throw new Error()
      }

      await editProductFn({
        id,
        title: data.title,
        categoryId: data.category,
        description: data.description,
        priceInCents: priceToCents(data.price),
        attachmentsIds: [attachmentId],
      })

      toast.success('Produto editado com sucesso!')
    } catch (error) {
      toast.error('Erro ao editar.')
    }
  }

  return (
    <>
      <Helmet title="Edição de Produto" />

      <div className="mb-10 mt-8 flex">
        <div className="flex flex-col gap-2">
          <button
            onClick={handleGoBack}
            className="action-md flex items-center gap-2 p-0.5 text-orange-base hover:text-orange-dark"
          >
            <ArrowLeft02Icon className="h-5 w-5" />
            Voltar
          </button>

          <h2 className="title-md text-gray-500">Editar produto</h2>

          <p className="body-sm text-gray-300">
            Gerencie as informações do produto cadastrado
          </p>
        </div>

        <div className="ml-auto flex items-end pr-3">
          <ChangeProductStatus productId={id} productStatus={product?.status} />
        </div>
      </div>

      {product ? (
        <form className="flex gap-6" onSubmit={handleSubmit(handleEditProduct)}>
          <div>
            <div className="h-[340px] w-[415px]">
              <ImageUpload
                id="image"
                accept=".png"
                placeholder="Selecione a imagem do produto"
                previewURL={product.attachments[0]?.url}
                disabled={['sold', 'cancelled'].includes(product.status)}
                register={register('image')}
              />
            </div>

            {errors.image && (
              <FieldErrorMessage message={errors.image.message} />
            )}
          </div>

          <div className="flex w-[591px] flex-col gap-6 rounded-[20px] bg-white p-6">
            <div className="flex items-center justify-between">
              <p className="title-sm text-gray-300">Dados do produto</p>

              <StatusTag productStatus={product.status} />
            </div>

            <div className="flex flex-col gap-10">
              <div
                className={`flex flex-col gap-5
                ${['sold', 'cancelled'].includes(product.status) && 'opacity-55'}`}
              >
                <div className="flex gap-5">
                  <div className="w-[323px]">
                    <InputWithIcon
                      label="Título"
                      id="title"
                      placeholder="Nome do produto"
                      disabled={['sold', 'cancelled'].includes(product.status)}
                      error={errors?.title?.message}
                      register={register('title')}
                    />
                  </div>

                  <InputWithIcon
                    label="Valor"
                    icon={<div>R$</div>}
                    id="price"
                    placeholder="0,00"
                    disabled={['sold', 'cancelled'].includes(product.status)}
                    error={errors?.price?.message}
                    register={register('price')}
                  />
                </div>

                <Textarea
                  label="Descrição"
                  id="description"
                  rows={4}
                  placeholder="Escreva detalhes sobre o produto, tamanho e características"
                  disabled={['sold', 'cancelled'].includes(product.status)}
                  error={errors?.description?.message}
                  register={register('description')}
                />

                <div>
                  <Label htmlFor="category">Categoria</Label>
                  <CustomSelect
                    name="category"
                    options={categoriesToSelect}
                    placeholder="Selecione"
                    disabled={['sold', 'cancelled'].includes(product.status)}
                    control={control}
                  />

                  {errors.category && (
                    <FieldErrorMessage message={errors.category.message} />
                  )}
                </div>
              </div>

              <div className="flex h-12 gap-3">
                <Link to="/products" className="flex h-full w-full">
                  <button
                    type="button"
                    className={`action-md flex w-full items-center justify-center rounded-[.625rem] border border-orange-base bg-white px-4 text-orange-base transition-colors duration-200 
                    ${isSubmitting ? 'cursor-not-allowed opacity-55' : 'hover:border-orange-dark hover:text-orange-dark'}
                    `}
                    disabled={isSubmitting}
                  >
                    Cancelar
                  </button>
                </Link>

                <button
                  type="submit"
                  className={`action-md flex h-full w-full items-center justify-center rounded-[.625rem] bg-orange-base px-4 text-white transition-colors duration-200
                    ${
                      isSubmitting ||
                      ['sold', 'cancelled'].includes(product.status)
                        ? 'cursor-not-allowed opacity-55'
                        : 'hover:bg-orange-dark'
                    }
                `}
                  disabled={
                    isSubmitting ||
                    ['sold', 'cancelled'].includes(product.status)
                  }
                >
                  Salvar e atualizar
                </button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="flex gap-6">
          <div>
            <Skeleton className="h-[340px] w-[415px] rounded-xl" />
          </div>

          <div className="flex w-[591px] flex-col gap-6 rounded-[20px] bg-white p-6">
            <div className="flex items-center justify-between">
              <p className="title-sm text-gray-300">Dados do produto</p>

              <Skeleton className="h-5 w-20 rounded-xl" />
            </div>

            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-5">
                <div className="flex gap-5">
                  <div className="w-[301px]">
                    <Label htmlFor="title">Título</Label>
                    <Skeleton className="h-[49px] w-full rounded-xl" />
                  </div>

                  <div className="flex-1">
                    <Label htmlFor="price">Valor</Label>
                    <Skeleton className="h-[49px] w-full rounded-xl" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Descrição</Label>
                  <Skeleton className="h-[112px] w-full rounded-xl" />
                </div>

                <div>
                  <Label htmlFor="category">Categoria</Label>
                  <Skeleton className="h-[53px] w-full rounded-xl" />
                </div>
              </div>

              <div className="flex h-12 gap-3">
                <Link to="/products" className="flex h-full w-full">
                  <button className="action-md flex w-full items-center justify-center rounded-[.625rem] border border-orange-base bg-white px-4 text-orange-base  transition-colors duration-200 hover:border-orange-dark hover:text-orange-dark">
                    Cancelar
                  </button>
                </Link>

                <button
                  type="submit"
                  className="action-md flex h-full w-full cursor-not-allowed items-center justify-center rounded-[.625rem] bg-orange-base px-4 text-white opacity-55 transition-colors duration-200"
                  disabled={true}
                >
                  Salvar e atualizar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
