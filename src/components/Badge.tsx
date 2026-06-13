import type { HTMLAttributes } from 'react'

type BadgeTone = 'primary' | 'accent' | 'info' | 'success' | 'warning' | 'error'
type BadgeSize = 'sm' | 'md' | 'lg'

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: BadgeTone
  size?: BadgeSize
}

export function Badge({ className = '', size = 'md', tone = 'primary', ...props }: BadgeProps) {
  return (
    <span className={`ui-badge ui-badge--${tone} ui-badge--${size} ${className}`.trim()} {...props} />
  )
}
