import React from 'react'

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  htmlFor: string
  children: React.ReactNode
}

export function Label({ htmlFor, children, ...props }: LabelProps) {
  return (
    <label htmlFor={htmlFor} {...props}>
      {children}
    </label>
  )
}
