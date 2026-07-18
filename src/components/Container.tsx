import type { HTMLAttributes } from 'react'

type ContainerSize = 'sm' | 'md' | 'lg'

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  size?: ContainerSize
}

export function Container({ className = '', size = 'md', ...props }: ContainerProps) {
  return <div className={`ui-container ui-container--${size} ${className}`.trim()} {...props} />
}
