import type { HTMLAttributes } from 'react'

type TextTone = 'default' | 'muted' | 'subtle'
type TextSize = 'sm' | 'md' | 'lg'
type TextWeight = 'normal' | 'medium' | 'strong'

type TextProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: TextTone
  size?: TextSize
  weight?: TextWeight
}

export function Text({
  className = '',
  tone = 'default',
  size = 'md',
  weight = 'normal',
  ...props
}: TextProps) {
  return (
    <span
      className={`ui-text ui-text--${tone} ui-text--${size} ui-text--${weight} ${className}`.trim()}
      {...props}
    />
  )
}
