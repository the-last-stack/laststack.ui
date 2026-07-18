import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'solid' | 'outline' | 'subtle' | 'ghost'
type ButtonTone = 'primary' | 'accent' | 'destructive'
type ButtonSize = 'sm' | 'md' | 'lg'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: ButtonSize
  variant?: ButtonVariant
  tone?: ButtonTone
  loading?: boolean
  children?: ReactNode
}

export function Button({
  className = '',
  size = 'md',
  tone = 'primary',
  variant = 'solid',
  loading = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      aria-busy={loading || undefined}
      className={`ui-button ui-button--${variant} ui-button--${tone} ui-button--${size}${loading ? ' ui-button--loading' : ''} ${className}`.trim()}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <span aria-hidden className="ui-button__spinner" /> : null}
      {children}
    </button>
  )
}
