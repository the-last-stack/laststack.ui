import type { ComponentType, HTMLAttributes } from 'react'
import { CircleCheck, Info, TriangleAlert, XCircle } from 'lucide-react'

type CalloutTone = 'info' | 'success' | 'warning' | 'error'

type CalloutProps = HTMLAttributes<HTMLDivElement> & {
  tone?: CalloutTone
  title?: string
  flush?: boolean
}

const Icon = {
  info: Info,
  success: CircleCheck,
  warning: TriangleAlert,
  error: XCircle,
} satisfies Record<CalloutTone, ComponentType<{ size?: number; 'aria-hidden'?: boolean }>>

export function Callout({ className = '', tone = 'info', title, flush = false, children, ...props }: CalloutProps) {
  const ToneIcon = Icon[tone]
  return (
    <div
      className={`ui-callout ui-callout--${tone}${flush ? ' ui-callout--flush' : ''} ${className}`.trim()}
      {...props}
    >
      <ToneIcon size={16} aria-hidden />
      <div className="ui-callout__content">
        {title && <p className="ui-callout__title">{title}</p>}
        {children}
      </div>
    </div>
  )
}
