import { ImageUploadIcon } from 'hugeicons-react'
import { useState } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

interface ImageUploadProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string
  previewURL?: string
  disabled?: boolean
  register: UseFormRegisterReturn
}

export function ImageUpload({
  placeholder,
  previewURL,
  register,
  disabled = false,
  ...props
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | undefined>(previewURL)

  function handleChangeFile(imagePreviewUrl: string) {
    setPreview(imagePreviewUrl)
  }

  return (
    <label className="group relative flex h-full w-full items-center justify-center overflow-hidden rounded-xl bg-shape">
      <input
        type="file"
        className={`absolute inset-0 opacity-0
          ${!disabled && 'cursor-pointer'}`}
        disabled={disabled}
        {...props}
        {...register}
        onChange={(e) => {
          const file = e.target.files ? e.target.files[0] : null
          if (file) {
            const imagePreviewUrl = URL.createObjectURL(file)
            handleChangeFile(imagePreviewUrl)
          }
        }}
      />

      {preview && (
        <img
          src={preview}
          className="absolute h-full w-full object-cover"
          alt="Preview da imagem"
        />
      )}

      <div
        className={`absolute inset-0 flex flex-col items-center justify-center gap-4
          ${preview && 'bg-black bg-opacity-60 opacity-0'}
          ${!disabled && 'cursor-pointer transition-opacity group-hover:opacity-100'}`}
      >
        <ImageUploadIcon
          className={`h-8 w-8
            ${preview ? 'text-white' : 'text-orange-base'}
          `}
        />

        {placeholder && (
          <p
            className={`body-sm max-w-[159px] text-center
              ${preview ? 'text-white' : 'text-gray-300'}
            `}
          >
            {placeholder}
          </p>
        )}
      </div>
    </label>
  )
}
