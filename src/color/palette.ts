import {
  createThemeConfig,
  type LastStackThemeConfig,
  type SeedColorName,
  surfaceMixes,
} from '../theme'
import { capL, floorL, mix, setL } from './srgb'

/**
 * The theme's tokens as flat colour values, for a renderer with no CSS.
 *
 * `theme.css` stays the engine on the web — it gamut-maps the ramps, re-derives
 * per scope, and makes the mode a class. This is the same rules written out for
 * React Native, which has none of that. The two are checked against each other
 * by `scripts/check-palette-parity.mjs`; when a rule moves, both move in the
 * same review or the build fails.
 *
 * The numbered ramps are deliberately absent. They overshoot sRGB chroma on
 * purpose and lean on the browser to pull it back, and nothing outside the web
 * reads a step.
 */

export type PaletteMode = 'light' | 'dark'

/** Neutral is not a seed — nothing about the brand chooses it. */
export const NEUTRAL = '#88888c'

/** Lightness the action colours are held to, so a label stays legible on them. */
const ACTION_L = { light: 0.55, dark: 0.72 } as const

/** Lightness a tinted foreground takes in dark mode, where mixing to black can't work. */
const ON_TINT_L_DARK = 0.78

/** How far each intent's tint travels; the brand pair carries more than the signals. */
const TINT_LIGHT: Record<SeedColorName, number> = {
  primary: 12,
  accent: 22,
  info: 14,
  success: 14,
  warning: 14,
  error: 14,
}

const ON_TINT_LIGHT: Record<SeedColorName, number> = {
  primary: 76,
  accent: 64,
  info: 70,
  success: 70,
  warning: 70,
  error: 70,
}

const TINT_DARK = 18

export type ColorTokens = Record<SeedColorName, string> & {
  bg: string
  surface: string
  border: string
  bgNeutral: string
  surfaceNeutral: string
  borderNeutral: string
  textPrimary: string
  textSecondary: string
  textSubtle: string
  actionPrimary: string
  actionAccent: string
} & Record<`${SeedColorName}Tint`, string> &
  Record<`${SeedColorName}OnTint`, string>

/**
 * Every token, resolved for one mode.
 *
 * ```ts
 * const p = derivePalette({ seeds }, 'dark')
 * p.bg           // '#141420'
 * p.successOnTint
 * ```
 */
export function derivePalette(config: LastStackThemeConfig, mode: PaletteMode): ColorTokens {
  const { seeds, clamps, surface } = createThemeConfig(config)
  const m = surfaceMixes(surface)
  const dark = mode === 'dark'

  // Every neutral in the theme is the one grey pushed toward whichever end the
  // mode lives at; the tint is what stops the result reading as grey.
  const toward = dark ? 'black' : 'white'
  const tintColor = seeds[surface.tintSource]

  const bgNeutral = mix(NEUTRAL, toward, dark ? m.darkBg : m.lightBg)
  const surfaceNeutral = mix(NEUTRAL, toward, dark ? m.darkSurface : m.lightSurface)
  const borderNeutral = mix(NEUTRAL, toward, dark ? m.darkBorder : m.lightBorder)

  const bg = mix(tintColor, bgNeutral, m.tint)

  // Text runs the other way — toward the end the background isn't at — and the
  // three steps are the same ladder read from opposite ends.
  const text = (light: number, darkPct: number) =>
    mix(NEUTRAL, dark ? 'white' : 'black', dark ? darkPct : light)

  const action = (seed: SeedColorName, clamped: boolean) => {
    if (!clamped) return seeds[seed]
    return dark ? floorL(seeds[seed], ACTION_L.dark) : capL(seeds[seed], ACTION_L.light)
  }

  const tint = (seed: SeedColorName) =>
    dark ? mix(seeds[seed], bg, TINT_DARK) : mix(seeds[seed], 'white', TINT_LIGHT[seed])

  const onTint = (seed: SeedColorName) =>
    dark ? setL(seeds[seed], ON_TINT_L_DARK) : mix(seeds[seed], 'black', ON_TINT_LIGHT[seed])

  return {
    ...seeds,

    bgNeutral,
    surfaceNeutral,
    borderNeutral,
    bg,
    // Light halves the tint on cards so they separate from the page by
    // brightness; dark has no headroom for that and tints them equally.
    surface: mix(tintColor, surfaceNeutral, dark ? m.tint : m.tintHalf),
    border: mix(tintColor, borderNeutral, m.borderTint),

    textPrimary: text(85, 12),
    textSecondary: text(55, 45),
    textSubtle: text(35, 60),

    actionPrimary: action('primary', dark ? clamps.primaryDark : clamps.primaryLight),
    actionAccent: action('accent', dark ? clamps.accentDark : clamps.accentLight),

    primaryTint: tint('primary'),
    accentTint: tint('accent'),
    infoTint: tint('info'),
    successTint: tint('success'),
    warningTint: tint('warning'),
    errorTint: tint('error'),

    primaryOnTint: onTint('primary'),
    accentOnTint: onTint('accent'),
    infoOnTint: onTint('info'),
    successOnTint: onTint('success'),
    warningOnTint: onTint('warning'),
    errorOnTint: onTint('error'),
  }
}
