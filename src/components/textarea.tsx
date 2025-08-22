import React from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

import { FieldErrorMessage } from './fieldErrorMessage'
import { Label } from './label'

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  id: string
  error?: string
  register: UseFormRegisterReturn
}

export function Textarea({
  label,
  id,
  error,
  register,
  ...props
}: TextareaProps) {
  return (
    <div className="group">
      <Label
        htmlFor={id}
        className="label-md group-focus-within:text-orange-base"
      >
        {label}
      </Label>

      <div className="border-b-[1px] border-gray-100 px-0.5 py-3.5 focus-within:border-gray-400">
        <textarea
          id={id}
          className="w-full flex-1 text-gray-400 placeholder-gray-200 outline-none focus:placeholder-transparent focus:caret-orange-base"
          {...props}
          {...register}
        />
      </div>

      {error && <FieldErrorMessage message={error} />}
    </div>
  )
}
