import type { InputHTMLAttributes } from 'react'

type InputSize = 'sm' | 'md' | 'lg'

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  inputSize?: InputSize
  invalid?: boolean
}

export function Input({ className = '', inputSize = 'md', invalid = false, ...props }: InputProps) {
  return (
    <input
      aria-invalid={invalid || undefined}
      className={`ui-input ui-input--${inputSize}${invalid ? ' ui-input--invalid' : ''} ${className}`.trim()}
      {...props}
    />
  )
}
