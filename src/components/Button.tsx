import type { ButtonHTMLAttributes } from 'react'

type ButtonVariant = 'solid' | 'outline' | 'subtle' | 'ghost'
type ButtonTone = 'primary' | 'accent' | 'destructive'
type ButtonSize = 'sm' | 'md' | 'lg'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: ButtonSize
  variant?: ButtonVariant
  tone?: ButtonTone
}

export function Button({
  className = '',
  size = 'md',
  tone = 'primary',
  variant = 'solid',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`ui-button ui-button--${variant} ui-button--${tone} ui-button--${size} ${className}`.trim()}
      {...props}
    />
  )
}
