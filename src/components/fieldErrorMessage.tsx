import { AlertCircleIcon } from 'hugeicons-react'

interface FieldErrorMessageProps {
  message: string | undefined
}

export function FieldErrorMessage({ message }: FieldErrorMessageProps) {
  if (!message) return null

  return (
    <span className="body-xs flex items-center gap-1 p-1 text-danger">
      <AlertCircleIcon className="h-4 w-4" />
      {message}
    </span>
  )
}
