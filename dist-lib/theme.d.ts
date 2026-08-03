import type { CSSProperties } from 'react';
export declare const seedColorNames: readonly ["primary", "accent", "info", "success", "warning", "error"];
export type SeedColorName = (typeof seedColorNames)[number];
export type ThemeSeeds = Record<SeedColorName, string>;
export type ThemeTintSource = 'primary' | 'accent';
export type ThemeClampKey = 'primaryLight' | 'primaryDark' | 'accentLight' | 'accentDark';
export type ThemeClampConfig = Record<ThemeClampKey, boolean>;
export type LastStackThemeConfig = {
    seeds: ThemeSeeds;
    clamps?: Partial<ThemeClampConfig>;
    surface?: {
        tint?: number;
        tintSource?: ThemeTintSource;
        lightBrightness?: number;
        darkLift?: number;
    };
};
export type ResolvedLastStackThemeConfig = {
    seeds: ThemeSeeds;
    clamps: ThemeClampConfig;
    surface: {
        tint: number;
        tintSource: ThemeTintSource;
        lightBrightness: number;
        darkLift: number;
    };
};
export type LastStackThemeStyle = CSSProperties & Record<`--color-${SeedColorName}`, string> & Record<`--color-action-${'primary' | 'accent'}-${'light' | 'dark'}`, string> & {
    '--dark-bg-neutral-mix': string;
    '--dark-border-neutral-mix': string;
    '--dark-surface-neutral-mix': string;
    '--light-bg-neutral-mix': string;
    '--light-border-neutral-mix': string;
    '--light-surface-neutral-mix': string;
    '--surface-tint-color': string;
    '--surface-tint': string;
    '--surface-tint-half': string;
    '--surface-border-tint': string;
};
export declare const defaultThemeConfig: ResolvedLastStackThemeConfig;
export declare function createThemeConfig(config: LastStackThemeConfig): ResolvedLastStackThemeConfig;
/**
 * How far each surface token travels from neutral, as percentages.
 *
 * The stylesheet takes these as custom properties and the DOM-free palette
 * takes them as numbers, so they are computed once here rather than twice.
 */
export declare function surfaceMixes(surface: ResolvedLastStackThemeConfig['surface']): {
    lightBg: number;
    lightSurface: number;
    lightBorder: number;
    darkBg: number;
    darkSurface: number;
    darkBorder: number;
    tint: number;
    tintHalf: number;
    borderTint: number;
};
export declare function createThemeStyle(config: LastStackThemeConfig): LastStackThemeStyle;
