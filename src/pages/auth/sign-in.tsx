import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { AccessIcon, ArrowRight02Icon, Mail02Icon } from 'hugeicons-react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import z from 'zod'

import { signIn } from '../../api/sign-in'
import { InputWithIcon } from '../../components/inputWithIcon'

const signInFormSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(1, 'Informe a senha'),
})

type SignInForm = z.infer<typeof signInFormSchema>

export function SignIn() {
  const [searchParams] = useSearchParams()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<SignInForm>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: searchParams.get('email') ?? '',
    },
  })

  const navigate = useNavigate()

  const { mutateAsync: authenticate } = useMutation({
    mutationFn: signIn,
  })

  async function handleSignIn(data: SignInForm) {
    try {
      await authenticate({ email: data.email, password: data.password })

      navigate('/')
    } catch (error) {
      toast.error('Credenciais inválidas.')
    }
  }

  return (
    <>
      <Helmet title="Login" />

      <div className="h-full w-full rounded-[32px] bg-white px-20 py-[4.5rem]">
        <div className="flex h-full flex-col gap-12">
          <div className="flex flex-col gap-2 ">
            <h2 className="title-md text-gray-500">Acesse sua conta</h2>
            <p className="body-sm">Informe seu e-mail e senha para entrar</p>
          </div>

          <form
            className="flex flex-col gap-5"
            onSubmit={handleSubmit(handleSignIn)}
          >
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

            <button
              className={`mt-12 flex h-14 w-full items-center justify-between rounded-[.625rem] bg-orange-base px-5 text-white transition-colors duration-200
              ${isSubmitting ? 'cursor-not-allowed opacity-55' : 'hover:bg-orange-dark'}`}
              disabled={isSubmitting}
              type="submit"
            >
              <span className="action-md">Acessar</span>
              <ArrowRight02Icon className="h-6 w-6" />
            </button>
          </form>

          <div className="mt-auto space-y-5">
            <p className="body-md text-gray-300">Ainda não tem uma conta?</p>

            <div>
              <Link to="/sign-up">
                <button
                  className={`flex h-14 w-full items-center justify-between rounded-[.625rem] border-[1px] border-orange-base px-5 text-orange-base transition-colors duration-200                            
                ${isSubmitting ? 'cursor-not-allowed opacity-55' : 'hover:border-orange-dark hover:text-orange-dark'}`}
                  disabled={isSubmitting}
                >
                  <span className="action-md">Cadastrar</span>
                  <ArrowRight02Icon className="h-6 w-6" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
