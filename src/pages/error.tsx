import { Link, useRouteError } from 'react-router-dom'

export function Error() {
  const error = useRouteError() as Error

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <h1 className="text-4xl font-bold">Ooops, algo aconteceu...</h1>

      <p className="body-md">
        Um erro aconteceu na aplicação, abaixo você encontra mais detalhes:
      </p>

      <pre className="body-sm">{error?.message || JSON.stringify(error)}</pre>

      <p className="body-md">
        Voltar para o{' '}
        <Link to="/" className="text-orange-base hover:text-orange-dark">
          Dashboard
        </Link>
      </p>
    </div>
  )
}
