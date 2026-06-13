type SegmentedTone = 'primary' | 'accent'
type SegmentedSize = 'sm' | 'md' | 'lg'

type SegmentedOption<TValue extends string> = {
  label: string
  value: TValue
}

type SegmentedControlProps<TValue extends string> = {
  'aria-label': string
  className?: string
  onChange: (value: TValue) => void
  options: readonly SegmentedOption<TValue>[]
  size?: SegmentedSize
  tone?: SegmentedTone
  value: TValue
}

export function SegmentedControl<TValue extends string>({
  'aria-label': ariaLabel,
  className = '',
  onChange,
  options,
  size = 'md',
  tone = 'primary',
  value,
}: SegmentedControlProps<TValue>) {
  return (
    <div
      aria-label={ariaLabel}
      className={`ui-segmented ui-segmented--${tone} ui-segmented--${size} ${className}`.trim()}
      role="radiogroup"
    >
      {options.map((option) => (
        <button
          aria-checked={option.value === value}
          key={option.value}
          onClick={() => onChange(option.value)}
          role="radio"
          type="button"
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
