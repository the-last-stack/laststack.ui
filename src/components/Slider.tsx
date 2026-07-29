import type { CSSProperties, InputHTMLAttributes } from 'react'

type SliderTone = 'primary' | 'accent'

type SliderProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label: string
  tone?: SliderTone
  valueLabel?: string
}

const num = (v: unknown, fallback: number) => {
  const n = typeof v === 'number' ? v : Number(v)
  return Number.isFinite(n) ? n : fallback
}

export function Slider({
  className = '',
  label,
  tone = 'primary',
  valueLabel,
  style,
  ...props
}: SliderProps) {
  // The track is painted from theme tokens rather than left to the UA, so it
  // has to know how far along it is. `accent-color` alone only colours the
  // filled side; the rest stays whatever the browser draws, which doesn't
  // follow `color-scheme` reliably and so reads pale on a dark surface.
  const min = num(props.min, 0)
  const max = num(props.max, 100)
  const value = num(props.value ?? props.defaultValue, min)
  const pct = max === min ? 0 : Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100))

  return (
    <label className={`ui-slider ui-slider--${tone} ${className}`.trim()}>
      <span>
        {label}
        {valueLabel ? <strong>{valueLabel}</strong> : null}
      </span>
      <input type="range" style={{ '--slider-pct': `${pct}%`, ...style } as CSSProperties} {...props} />
    </label>
  )
}
