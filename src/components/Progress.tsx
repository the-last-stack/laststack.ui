import type { HTMLAttributes } from 'react'

type ProgressTone = 'primary' | 'accent' | 'info' | 'success' | 'warning' | 'error'
type ProgressSize = 'sm' | 'md' | 'lg'

type ProgressSegment = {
  value: number
  tone?: ProgressTone
}

type ProgressProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  value?: number
  max?: number
  tone?: ProgressTone
  size?: ProgressSize
  /**
   * Stacked parts of one total, in order. Use when the fill is made of things
   * that mean different things — earned vs. credited, spent vs. committed —
   * and blending them into one number would lose that. Overrides `value`.
   */
  segments?: readonly ProgressSegment[]
}

export function Progress({
  className = '',
  value = 0,
  max = 100,
  tone = 'primary',
  size = 'md',
  segments,
  ...props
}: ProgressProps) {
  const parts = segments ?? [{ value, tone }]
  const filled = parts.reduce((total, part) => total + Math.max(0, part.value), 0)
  const percent = (n: number) => (max <= 0 ? 0 : Math.min(100, (Math.max(0, n) / max) * 100))

  return (
    <div
      className={`ui-progress ui-progress--${size} ${className}`.trim()}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={filled}
      {...props}
    >
      {parts.map((part, i) => (
        <div
          key={`${i}-${part.tone ?? tone}`}
          className={`ui-progress__fill ui-progress__fill--${part.tone ?? tone}`}
          style={{ width: `${percent(part.value)}%` }}
        />
      ))}
    </div>
  )
}
