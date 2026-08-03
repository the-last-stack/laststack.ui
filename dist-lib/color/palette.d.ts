import { type LastStackThemeConfig, type SeedColorName } from '../theme';
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
export type PaletteMode = 'light' | 'dark';
/** Neutral is not a seed — nothing about the brand chooses it. */
export declare const NEUTRAL = "#88888c";
export type ColorTokens = Record<SeedColorName, string> & {
    bg: string;
    surface: string;
    border: string;
    bgNeutral: string;
    surfaceNeutral: string;
    borderNeutral: string;
    textPrimary: string;
    textSecondary: string;
    textSubtle: string;
    actionPrimary: string;
    actionAccent: string;
} & Record<`${SeedColorName}Tint`, string> & Record<`${SeedColorName}OnTint`, string>;
/**
 * Every token, resolved for one mode.
 *
 * ```ts
 * const p = derivePalette({ seeds }, 'dark')
 * p.bg           // '#141420'
 * p.successOnTint
 * ```
 */
export declare function derivePalette(config: LastStackThemeConfig, mode: PaletteMode): ColorTokens;
