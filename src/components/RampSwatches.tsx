import { rampSteps, stepTextTone, usePalette } from '../palette'
import { seedColorNames } from '../theme'

/**
 * The generated scales, laid out intent by intent.
 *
 * The label inside each swatch is coloured by `stepTextTone(step)` rather than
 * by anything measured off the swatch — so if the ladder is right, every label
 * is legible, and if it drifts, this is where you see it first. The seed chip
 * sits outside the scale on purpose: it is not one of the steps.
 */
export function RampSwatches() {
  const palette = usePalette()

  return (
    <div className="grid gap-4">
      {seedColorNames.map((intent) => (
        <div key={intent} className="grid gap-1.5">
          <div className="flex items-baseline gap-2">
            <span className="text-[0.88rem] font-semibold text-text-primary">{intent}</span>
            <span
              className="inline-block h-3 w-3 rounded-full border border-border align-middle"
              style={{ background: `var(--color-${intent})` }}
            />
            <span className="font-mono text-[0.72rem] text-text-secondary">seed {palette[intent].seed}</span>
          </div>

          <div
            className="grid gap-1"
            style={{ gridTemplateColumns: `repeat(${rampSteps.length}, minmax(0, 1fr))` }}
          >
            {rampSteps.map((step) => (
              <div
                key={step}
                className="grid h-14 min-w-0 content-between rounded-md p-1.5"
                style={{
                  background: `var(--color-${intent}-${step})`,
                  color: stepTextTone(step) === 'dark' ? '#000' : '#fff',
                }}
                title={`--color-${intent}-${step}`}
              >
                <span className="font-mono text-[0.7rem] font-medium">{step}</span>
                <span className="font-mono text-[0.6rem] opacity-80">
                  {stepTextTone(step) === 'dark' ? 'black' : 'white'}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
