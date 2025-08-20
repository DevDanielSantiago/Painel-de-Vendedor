import { ArrowDown01Icon, Cancel01Icon, Tick02Icon } from 'hugeicons-react'
import React, { useState } from 'react'
import { Control, Controller } from 'react-hook-form'

interface SelectOption {
  label: string
  value: string
}

interface CustomSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  name: string
  options: SelectOption[]
  placeholder?: string
  icon?: React.ReactNode // Tipo como React.ReactNode, para receber um elemento React para o ícone
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>
}

export function CustomSelect({
  name,
  options,
  placeholder = 'Selecione uma opção',
  icon,
  control,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = () => setIsOpen(!isOpen)

  return (
    <div className="relative">
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange } }) => {
          const selectedOption =
            options.find((option) => option.value === value) ?? undefined

          return (
            <>
              <div
                className={`flex items-center gap-2 border-b-[1px] px-[2px] py-3.5
                ${isOpen ? 'border-gray-400 ' : 'border-gray-100 '}`}
              >
                {icon && (
                  <div
                    className={`flex h-6 w-6 items-center justify-center text-gray-200
                  ${(isOpen || value) && 'text-orange-base'}`}
                  >
                    {icon}
                  </div>
                )}

                <div
                  className="flex flex-1 cursor-pointer items-center gap-2"
                  onClick={toggleOpen}
                >
                  <span
                    className={`body-md flex-1 
                    ${value ? 'text-gray-400' : 'text-gray-200'}`}
                  >
                    {selectedOption?.label || placeholder}
                  </span>

                  {value && (
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-shape">
                      <Cancel01Icon
                        className="h-4 w-4"
                        onClick={(e) => {
                          e.stopPropagation()
                          onChange('')
                        }}
                      />
                    </span>
                  )}

                  <ArrowDown01Icon
                    className={`h-6 w-6 transition-transform duration-200
                    ${isOpen && '-scale-y-100 transform'}
                `}
                  />
                </div>
              </div>

              {isOpen && (
                <div className="absolute mt-1 flex w-full flex-col rounded-lg border border-shape bg-white shadow-lg">
                  {options.map((option) => (
                    <div
                      key={option.value}
                      className="flex h-12 cursor-pointer items-center gap-2 px-4"
                      onClick={() => {
                        onChange(option.value)
                        setIsOpen(false)
                      }}
                    >
                      <p
                        className={`body-sm flex h-full w-full items-center 
                        ${
                          value === option.value
                            ? 'text-orange-base'
                            : 'text-gray-300 hover:text-orange-dark'
                        }
                        `}
                      >
                        {option.label}
                      </p>

                      {value === option.value && (
                        <Tick02Icon className="h-6 w-6 text-orange-base" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </>
          )
        }}
      />
    </div>
  )
}
