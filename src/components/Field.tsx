import type { HTMLAttributes, ReactNode } from 'react'

type FieldProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  children: ReactNode
  label?: ReactNode
  hint?: ReactNode
  error?: ReactNode
  htmlFor?: string
}

export function Field({ className = '', children, label, hint, error, htmlFor, ...props }: FieldProps) {
  return (
    <div className={`ui-field ${className}`.trim()} {...props}>
      {label ? (
        <label className="ui-field__label" htmlFor={htmlFor}>
          {label}
        </label>
      ) : null}
      {children}
      {error ? (
        <p className="ui-field__error">{error}</p>
      ) : hint ? (
        <p className="ui-field__hint">{hint}</p>
      ) : null}
    </div>
  )
}
