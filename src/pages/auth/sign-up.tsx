import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import {
  AccessIcon,
  ArrowRight02Icon,
  CallIcon,
  Mail02Icon,
  UserIcon,
} from 'hugeicons-react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import z from 'zod'

import { signUp } from '../../api/sign-up'
import { uploadAttachments } from '../../api/upload-attachments'
import { FieldErrorMessage } from '../../components/fieldErrorMessage'
import { ImageUpload } from '../../components/imageUpload'
import { InputWithIcon } from '../../components/inputWithIcon'
import { formatPhone } from '../utils/formatPhone'

const ACCEPTED_IMAGE_TYPES = ['image/png']

const signUpFormSchema = z
  .object({
    avatar: z
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

    fullName: z.string().min(3, 'Informe seu nome completo'),

    phone: z.string().refine(
      (val) => {
        const digitsOnly = val.replace(/\D/g, '')
        return digitsOnly.length === 10 || digitsOnly.length === 11
      },
      {
        message: 'Telefone inválido',
      },
    ),

    email: z.string().email('E-mail inválido'),

    password: z.string().min(3, 'A senha deve ter pelo menos 3 caracteres'),

    passwordConfirmation: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    path: ['passwordConfirmation'],
    message: 'As senhas não coincidem',
  })

type SignUpForm = z.infer<typeof signUpFormSchema>

export function SignUp() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<SignUpForm>({ resolver: zodResolver(signUpFormSchema) })

  const { mutateAsync: uploadAvatar } = useMutation({
    mutationFn: uploadAttachments,
  })

  const { mutateAsync: signUpFn } = useMutation({
    mutationFn: signUp,
  })

  async function handleSignUp(data: SignUpForm) {
    try {
      let attachmentId = null

      if (data.avatar?.length) {
        const files = new FormData()
        files.append('files', data.avatar[0])

        const uploadedAvatar = await uploadAvatar({ files })

        attachmentId = uploadedAvatar?.attachments[0]?.id

        if (!attachmentId) throw new Error()
      }

      await signUpFn({
        name: data.fullName,
        phone: data.phone,
        email: data.email,
        avatarId: attachmentId,
        password: data.password,
        passwordConfirmation: data.passwordConfirmation,
      })

      toast.success('Cadastro realizado com sucesso!', {
        action: {
          label: 'Login',
          onClick: () => navigate(`/sign-in?email=${data.email}`),
        },
      })
    } catch (error) {
      toast.error('Erro ao cadastrar.')
    }
  }

  return (
    <>
      <Helmet title="Cadastro" />

      <div className="scrollbar flex h-full w-full flex-col gap-20 overflow-y-scroll rounded-[32px] bg-white px-20 py-[4.5rem]">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-2 ">
            <h2 className="title-md text-gray-500">Crie sua conta</h2>
            <p className="body-sm">Informe seus dados pessoais e de acesso </p>
          </div>

          <form className="space-y-12" onSubmit={handleSubmit(handleSignUp)}>
            <div className="space-y-5">
              <h3 className="title-sm text-gray-500">Perfil</h3>

              <div>
                <div className="h-[120px] w-[120px] ">
                  <ImageUpload
                    id="avatar"
                    accept=".png"
                    register={register('avatar')}
                  />
                </div>

                {errors.avatar && (
                  <FieldErrorMessage message={errors.avatar.message} />
                )}
              </div>

              <InputWithIcon
                label="Nome"
                icon={<UserIcon />}
                id="fullName"
                placeholder="Seu nome completo"
                error={errors?.fullName?.message}
                register={register('fullName')}
              />

              <InputWithIcon
                label="Telefone"
                icon={<CallIcon />}
                id="phone"
                placeholder="(00) 00000-0000"
                error={errors?.phone?.message}
                register={{
                  ...register('phone'),
                  onChange: async (event) => {
                    const masked = formatPhone(event.target.value)

                    event.target.value = masked.length > 0 ? masked : null

                    return await register('phone').onChange(event)
                  },
                }}
              />
            </div>

            <div className="space-y-5">
              <h3 className="title-sm text-gray-500">Acesso</h3>

              <InputWithIcon
                label="E-mail"
                icon={<Mail02Icon />}
                id="email"
                placeholder="Seu e-mail cadastrado"
                error={errors?.email?.message}
                register={register('email')}
              />

              <InputWithIcon
                label="Senha"
                icon={<AccessIcon />}
                type="password"
                id="password"
                placeholder="Sua senha de acesso"
                error={errors?.password?.message}
                register={register('password')}
              />

              <InputWithIcon
                label="Confirmar senha"
                icon={<AccessIcon />}
                type="password"
                id="passwordConfirmation"
                placeholder="Confirme a senha"
                error={errors?.passwordConfirmation?.message}
                register={register('passwordConfirmation')}
              />
            </div>

            <button
              className={`mt-12 flex h-14 w-full items-center justify-between rounded-[.625rem] bg-orange-base px-5 text-white transition-colors duration-200
              ${isSubmitting ? 'cursor-not-allowed opacity-55' : 'hover:bg-orange-dark'}`}
              disabled={isSubmitting}
              type="submit"
            >
              <span className="action-md">Cadastrar</span>
              <ArrowRight02Icon className="h-6 w-6" />
            </button>
          </form>
        </div>

        <div className="mt-auto space-y-5">
          <p className="body-md text-gray-300">Já tem uma conta?</p>

          <div>
            <Link to="/sign-in">
              <button
                className={`flex h-14 w-full items-center justify-between rounded-[.625rem] border-[1px] border-orange-base px-5 text-orange-base transition-colors duration-200                            
                ${isSubmitting ? 'cursor-not-allowed opacity-55' : 'hover:border-orange-dark hover:text-orange-dark'}`}
                disabled={isSubmitting}
              >
                <span className="action-md">Acessar</span>
                <ArrowRight02Icon className="h-6 w-6" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
