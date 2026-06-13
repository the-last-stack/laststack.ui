import type { CSSProperties } from 'react'

export const seedColorNames = [
  'primary',
  'accent',
  'info',
  'success',
  'warning',
  'error',
] as const

export type SeedColorName = (typeof seedColorNames)[number]
export type ThemeSeeds = Record<SeedColorName, string>
export type ThemeTintSource = 'primary' | 'accent'
export type ThemeClampKey = 'primaryLight' | 'primaryDark' | 'accentLight' | 'accentDark'
export type ThemeClampConfig = Record<ThemeClampKey, boolean>

export type LastStackThemeConfig = {
  seeds: ThemeSeeds
  clamps?: Partial<ThemeClampConfig>
  surface?: {
    tint?: number
    tintSource?: ThemeTintSource
    lightBrightness?: number
    darkLift?: number
  }
}

export type ResolvedLastStackThemeConfig = {
  seeds: ThemeSeeds
  clamps: ThemeClampConfig
  surface: {
    tint: number
    tintSource: ThemeTintSource
    lightBrightness: number
    darkLift: number
  }
}

export type LastStackThemeStyle = CSSProperties &
  Record<`--color-${SeedColorName}`, string> &
  Record<`--color-action-${'primary' | 'accent'}-${'light' | 'dark'}`, string> & {
    '--dark-bg-neutral-mix': string
    '--dark-border-neutral-mix': string
    '--dark-surface-neutral-mix': string
    '--light-bg-neutral-mix': string
    '--light-border-neutral-mix': string
    '--light-surface-neutral-mix': string
    '--surface-tint-color': string
    '--surface-tint': string
    '--surface-tint-half': string
    '--surface-border-tint': string
  }

export const defaultThemeConfig: ResolvedLastStackThemeConfig = {
  seeds: {
    primary: '#292966',
    accent: '#9ac2d9',
    info: '#4f8fbf',
    success: '#5fa868',
    warning: '#d9a441',
    error: '#c9626b',
  },
  clamps: {
    primaryLight: true,
    primaryDark: true,
    accentLight: true,
    accentDark: true,
  },
  surface: {
    tint: 4,
    tintSource: 'primary',
    lightBrightness: 8,
    darkLift: 12,
  },
}

export function createThemeConfig(config: LastStackThemeConfig): ResolvedLastStackThemeConfig {
  return {
    seeds: {
      ...defaultThemeConfig.seeds,
      ...config.seeds,
    },
    clamps: {
      ...defaultThemeConfig.clamps,
      ...config.clamps,
    },
    surface: {
      ...defaultThemeConfig.surface,
      ...config.surface,
    },
  }
}

export function createThemeStyle(config: LastStackThemeConfig): LastStackThemeStyle {
  const theme = createThemeConfig(config)
  const { clamps, seeds, surface } = theme

  return {
    '--color-primary': seeds.primary,
    '--color-accent': seeds.accent,
    '--color-info': seeds.info,
    '--color-success': seeds.success,
    '--color-warning': seeds.warning,
    '--color-error': seeds.error,
    '--color-action-primary-light': actionColor('primary', 'light', clamps.primaryLight),
    '--color-action-primary-dark': actionColor('primary', 'dark', clamps.primaryDark),
    '--color-action-accent-light': actionColor('accent', 'light', clamps.accentLight),
    '--color-action-accent-dark': actionColor('accent', 'dark', clamps.accentDark),
    '--light-bg-neutral-mix': `${12 - surface.lightBrightness}%`,
    '--light-surface-neutral-mix': `${Math.max(9 - surface.lightBrightness, 0)}%`,
    '--light-border-neutral-mix': `${Math.min(30 - surface.lightBrightness, 34)}%`,
    '--dark-bg-neutral-mix': `${surface.darkLift}%`,
    '--dark-surface-neutral-mix': `${Math.min(surface.darkLift + 4, 38)}%`,
    '--dark-border-neutral-mix': `${Math.min(surface.darkLift + 16, 56)}%`,
    '--surface-tint-color': `var(--color-${surface.tintSource})`,
    '--surface-tint': `${surface.tint}%`,
    '--surface-tint-half': `${surface.tint / 2}%`,
    '--surface-border-tint': `${Math.min(surface.tint * 2.5, 24)}%`,
  }
}

function actionColor(seed: 'primary' | 'accent', mode: 'light' | 'dark', isClamped: boolean) {
  if (!isClamped) {
    return `var(--color-${seed})`
  }

  const lightness = mode === 'light' ? 'min(l, 0.55)' : 'max(l, 0.72)'
  return `oklch(from var(--color-${seed}) ${lightness} c h)`
}
