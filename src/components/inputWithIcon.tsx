import { ViewIcon, ViewOffIcon } from 'hugeicons-react'
import React, { useState } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

import { FieldErrorMessage } from './fieldErrorMessage'
import { Label } from './label'

interface InputWithIconProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  icon?: React.ReactNode
  type?: 'text' | 'password'
  id: string
  error?: string
  register: UseFormRegisterReturn
}

export function InputWithIcon({
  label,
  value,
  icon,
  type = 'text',
  id,
  error,
  register,
  ...props
}: InputWithIconProps) {
  const [isFilled, setIsFilled] = useState(
    value !== undefined && value !== null && value !== '',
  )

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsFilled(event.target.value.trim() !== '')

    if (register.onChange) {
      register.onChange(event)
    }
  }

  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="group flex flex-col">
      <Label
        htmlFor={id}
        className="label-md group-focus-within:text-orange-base"
      >
        {label}
      </Label>

      <div className="flex items-center gap-2 border-b-[1px] border-gray-100 px-[2px] py-3 focus-within:border-gray-400">
        {icon && (
          <div
            className={`flex h-6 w-6 items-center justify-center group-focus-within:text-orange-base
                ${error ? 'text-danger' : isFilled ? 'text-orange-base' : 'text-gray-200'}
            `}
          >
            {icon}
          </div>
        )}

        <input
          type={type === 'password' && !showPassword ? 'password' : 'text'}
          id={id}
          className="body-md my-[2.5px] w-full text-gray-400 placeholder-gray-200 outline-none focus:placeholder-transparent focus:caret-orange-base"
          {...props}
          {...register}
          onChange={handleInputChange}
        />

        {type === 'password' && (
          <button type="button" onMouseDown={togglePasswordVisibility}>
            <div className="h-6 w-6 text-gray-300">
              {showPassword ? <ViewIcon /> : <ViewOffIcon />}
            </div>
          </button>
        )}
      </div>

      {error && <FieldErrorMessage message={error} />}
    </div>
  )
}
