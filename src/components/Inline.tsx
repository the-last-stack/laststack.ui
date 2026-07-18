import type { HTMLAttributes } from 'react'

type Gap = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type Align = 'start' | 'center' | 'end' | 'stretch'
type Justify = 'start' | 'center' | 'end' | 'between'

type InlineProps = HTMLAttributes<HTMLDivElement> & {
  gap?: Gap
  align?: Align
  justify?: Justify
  wrap?: boolean
}

export function Inline({
  className = '',
  gap = 'md',
  align = 'center',
  justify = 'start',
  wrap = false,
  ...props
}: InlineProps) {
  return (
    <div
      className={`ui-inline ui-inline--gap-${gap} ui-inline--align-${align} ui-inline--justify-${justify}${wrap ? ' ui-inline--wrap' : ''} ${className}`.trim()}
      {...props}
    />
  )
}
