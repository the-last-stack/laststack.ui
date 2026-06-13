import type { HTMLAttributes, ReactNode } from 'react'
import { createThemeStyle } from './theme'
import type { LastStackThemeConfig } from './theme'
import './styles.css'

type LastStackUIProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  children: ReactNode
  theme?: LastStackThemeConfig
}

export function LastStackUI({ children, className = '', style, theme, ...props }: LastStackUIProps) {
  return (
    <div
      className={`ls-ui ${className}`.trim()}
      style={{ ...(theme ? createThemeStyle(theme) : null), ...style }}
      {...props}
    >
      {children}
    </div>
  )
}
