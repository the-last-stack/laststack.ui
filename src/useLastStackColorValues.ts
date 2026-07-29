import { useEffect, useState } from 'react'
import type { RefObject } from 'react'
import { useLastStackScope } from './LastStackUI'

type IntentColor = {
  default: string
  muted: string
  foreground: string
  hover: string
}

export type LastStackPalette = {
  primary: IntentColor
  accent: IntentColor
  success: IntentColor
  warning: IntentColor
  error: IntentColor
  info: IntentColor
  background: {
    default: string
    muted: string
    raised: string
  }
  foreground: {
    default: string
    muted: string
    subtle: string
  }
  border: {
    default: string
    muted: string
    focus: string
  }
}

export type LastStackThemeValues = {
  palette: LastStackPalette
}

export type LastStackColorValues = LastStackPalette

const emptyIntentColor: IntentColor = {
  default: '',
  muted: '',
  foreground: '',
  hover: '',
}

const emptyPalette: LastStackPalette = {
  primary: emptyIntentColor,
  accent: emptyIntentColor,
  success: emptyIntentColor,
  warning: emptyIntentColor,
  error: emptyIntentColor,
  info: emptyIntentColor,
  background: {
    default: '',
    muted: '',
    raised: '',
  },
  foreground: {
    default: '',
    muted: '',
    subtle: '',
  },
  border: {
    default: '',
    muted: '',
    focus: '',
  },
}

const intentColorNames = ['primary', 'accent', 'success', 'warning', 'error', 'info'] as const

export function useTheme(ref?: RefObject<HTMLElement | null>): LastStackThemeValues {
  const scopeRef = useLastStackScope()
  const [palette, setPalette] = useState<LastStackPalette>(emptyPalette)

  useEffect(() => {
    // The theme is inline on the provider; documentElement only ever has the
    // library defaults, so falling back to it silently ignored the theme prop.
    const target = ref?.current ?? scopeRef?.current ?? document.documentElement
    const styles = getComputedStyle(target)
    const color = (name: string) => styles.getPropertyValue(`--color-${name}`).trim()

    setPalette({
      ...Object.fromEntries(
        intentColorNames.map((name) => [
          name,
          {
            default: color(name),
            muted: color(`${name}-tint`),
            foreground: color(`${name}-on-tint`),
            hover: color(`${name}-hover`),
          },
        ]),
      ) as Pick<LastStackPalette, (typeof intentColorNames)[number]>,
      background: {
        default: color('bg'),
        muted: color('bg-neutral'),
        raised: color('surface'),
      },
      foreground: {
        default: color('text-primary'),
        muted: color('text-secondary'),
        subtle: color('text-subtle'),
      },
      border: {
        default: color('border'),
        muted: color('border-neutral'),
        focus: color('border-focus'),
      },
    })
  }, [ref, scopeRef])

  return { palette }
}

export function useLastStackColorValues(ref?: RefObject<HTMLElement | null>) {
  return useTheme(ref).palette
}
