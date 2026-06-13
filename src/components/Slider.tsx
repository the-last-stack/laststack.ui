import type { InputHTMLAttributes } from 'react'

type SliderTone = 'primary' | 'accent'

type SliderProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label: string
  tone?: SliderTone
  valueLabel?: string
}

export function Slider({ className = '', label, tone = 'primary', valueLabel, ...props }: SliderProps) {
  return (
    <label className={`ui-slider ui-slider--${tone} ${className}`.trim()}>
      <span>
        {label}
        {valueLabel ? <strong>{valueLabel}</strong> : null}
      </span>
      <input type="range" {...props} />
    </label>
  )
}
