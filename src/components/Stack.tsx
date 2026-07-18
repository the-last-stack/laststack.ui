import type { HTMLAttributes } from 'react'

type Gap = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type Align = 'start' | 'center' | 'end' | 'stretch'

type StackProps = HTMLAttributes<HTMLDivElement> & {
  gap?: Gap
  align?: Align
}

export function Stack({ className = '', gap = 'md', align = 'stretch', ...props }: StackProps) {
  return (
    <div
      className={`ui-stack ui-stack--gap-${gap} ui-stack--align-${align} ${className}`.trim()}
      {...props}
    />
  )
}
