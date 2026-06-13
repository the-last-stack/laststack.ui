import type { HTMLAttributes } from 'react'

type CardVariant = 'default' | 'elevated' | 'interactive'

type CardProps = HTMLAttributes<HTMLDivElement> & {
  variant?: CardVariant
}

export function Card({ className = '', variant = 'default', ...props }: CardProps) {
  return <div className={`ui-card ui-card--${variant} ${className}`.trim()} {...props} />
}

export function CardTitle({ className = '', ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={`ui-card__title ${className}`.trim()} {...props} />
}

export function CardDescription({ className = '', ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={`ui-card__description ${className}`.trim()} {...props} />
}
