import { useEffect, useState } from 'react'
import type { RefObject } from 'react'
import { useLastStackScope } from './LastStackUI'
import { seedColorNames } from './theme'
import type { SeedColorName } from './theme'

export const rampSteps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const
export type RampStep = (typeof rampSteps)[number]

/**
 * Which text colour is legible on a given step.
 *
 * Lightness is fixed per step, so this is a property of the number alone — it
 * holds for every hue, and there is no in-between case: the ladder deliberately
 * skips the band where neither black nor white clears 4.5:1.
 */
export function stepTextTone(step: RampStep): 'dark' | 'light' {
  return step <= 500 ? 'dark' : 'light'
}

export type Ramp = Record<RampStep, string> & {
  /** The exact colour passed in as a seed. Never snapped into the scale — the
   *  ramp is a derived thing, the brand colour is the brand colour. */
  seed: string
}

export type Palette = Record<SeedColorName, Ramp>

const emptyRamp = (): Ramp =>
  ({ ...Object.fromEntries(rampSteps.map((s) => [s, ''])), seed: '' }) as Ramp

const emptyPalette = (): Palette =>
  Object.fromEntries(seedColorNames.map((n) => [n, emptyRamp()])) as Palette

/**
 * Custom properties don't resolve to colours on their own — `getComputedStyle`
 * hands back the unresolved `oklch(from …)` expression. Painting each one onto
 * a throwaway element and reading back `color` makes the browser do the work,
 * which also covers `color-mix()` and relative colour syntax without us
 * reimplementing any of it.
 */
function readColors(scope: HTMLElement, names: string[]): string[] {
  const probe = document.createElement('span')
  probe.style.cssText = 'position:absolute;width:0;height:0;visibility:hidden;pointer-events:none'
  scope.appendChild(probe)

  const styles = getComputedStyle(probe)
  const out = names.map((name) => {
    probe.style.color = ''
    probe.style.color = `var(${name})`
    return styles.color
  })

  probe.remove()
  return out
}

/**
 * The generated scales for every intent, resolved to real colour values.
 *
 * ```ts
 * const { primary } = usePalette()
 * primary[300]   // 'oklch(...)' resolved to a concrete colour
 * primary.seed   // exactly what you passed in
 * ```
 *
 * Pass a ref to read a nested scope; by default it reads the nearest provider.
 */
export function usePalette(ref?: RefObject<HTMLElement | null>): Palette {
  const scopeRef = useLastStackScope()
  const [palette, setPalette] = useState<Palette>(emptyPalette)

  useEffect(() => {
    const scope = ref?.current ?? scopeRef?.current ?? document.documentElement
    if (!scope) return

    const names = seedColorNames.flatMap((intent) => [
      `--color-${intent}`,
      ...rampSteps.map((step) => `--color-${intent}-${step}`),
    ])

    const read = () => {
      const values = readColors(scope, names)
      let i = 0
      setPalette(
        Object.fromEntries(
          seedColorNames.map((intent) => {
            const seed = values[i++]
            const ramp = Object.fromEntries(rampSteps.map((step) => [step, values[i++]]))
            return [intent, { ...ramp, seed }]
          }),
        ) as Palette,
      )
    }

    read()

    // Seeds are inline styles on the provider and modes are classes, so live
    // theme tuning changes neither state nor props here. Watch the attributes
    // instead of going stale.
    const observer = new MutationObserver(read)
    observer.observe(scope, { attributes: true, attributeFilter: ['style', 'class'] })
    return () => observer.disconnect()
  }, [ref, scopeRef])

  return palette
}
