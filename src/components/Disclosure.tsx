import { ChevronRight } from 'lucide-react'
import type { HTMLAttributes, ReactNode } from 'react'

type DisclosureProps = Omit<HTMLAttributes<HTMLDetailsElement>, 'title'> & {
  title: ReactNode
  defaultOpen?: boolean
}

export function Disclosure({
  className = '',
  title,
  defaultOpen = false,
  children,
  ...props
}: DisclosureProps) {
  return (
    <details className={`ui-disclosure ${className}`.trim()} open={defaultOpen} {...props}>
      <summary className="ui-disclosure__summary">
        <ChevronRight className="ui-disclosure__chevron" aria-hidden />
        <span className="ui-disclosure__title">{title}</span>
      </summary>
      <div className="ui-disclosure__content">{children}</div>
    </details>
  )
}
