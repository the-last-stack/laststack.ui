import type { HTMLAttributes } from 'react'

type SpinnerSize = 'sm' | 'md' | 'lg'
type SpinnerTone = 'primary' | 'accent' | 'neutral'

type SpinnerProps = HTMLAttributes<HTMLSpanElement> & {
  size?: SpinnerSize
  tone?: SpinnerTone
  label?: string
}

export function Spinner({
  className = '',
  size = 'md',
  tone = 'primary',
  label = 'Loading',
  ...props
}: SpinnerProps) {
  return (
    <span
      aria-label={label}
      className={`ui-spinner ui-spinner--${size} ui-spinner--${tone} ${className}`.trim()}
      role="status"
      {...props}
    />
  )
}
