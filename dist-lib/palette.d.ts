import type { RefObject } from 'react';
import type { SeedColorName } from './theme';
export declare const rampSteps: readonly [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
export type RampStep = (typeof rampSteps)[number];
/**
 * Which text colour is legible on a given step.
 *
 * Lightness is fixed per step, so this is a property of the number alone — it
 * holds for every hue, and there is no in-between case: the ladder deliberately
 * skips the band where neither black nor white clears 4.5:1.
 */
export declare function stepTextTone(step: RampStep): 'dark' | 'light';
export type Ramp = Record<RampStep, string> & {
    /** The exact colour passed in as a seed. Never snapped into the scale — the
     *  ramp is a derived thing, the brand colour is the brand colour. */
    seed: string;
};
export type Palette = Record<SeedColorName, Ramp>;
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
export declare function usePalette(ref?: RefObject<HTMLElement | null>): Palette;
