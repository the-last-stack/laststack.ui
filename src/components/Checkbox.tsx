import type { InputHTMLAttributes, ReactNode } from 'react'

type CheckboxTone = 'primary' | 'accent'

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  children: ReactNode
  tone?: CheckboxTone
}

export function Checkbox({ children, className = '', tone = 'primary', ...props }: CheckboxProps) {
  return (
    <label className={`ui-checkbox ui-checkbox--${tone} ${className}`.trim()}>
      <input type="checkbox" {...props} />
      <span>{children}</span>
    </label>
  )
}
