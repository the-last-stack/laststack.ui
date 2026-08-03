export type Rgb = {
    /** 0–255, gamma-encoded, as they appear in a hex literal. */
    r: number;
    g: number;
    b: number;
};
/** Hex (`#abc`, `#aabbcc`), `rgb()`, or the two keywords the theme mixes toward. */
export declare function parse(color: string): Rgb;
export declare function format({ r, g, b }: Rgb): string;
/**
 * `color-mix(in srgb, a pct%, b)`.
 *
 * The `srgb` interpolation space is gamma-encoded, so this is a plain channel
 * lerp — no linearisation. `srgb-linear` would be the other one.
 */
export declare function mix(a: string, b: string, pct: number): string;
export type Oklch = {
    l: number;
    c: number;
    h: number;
};
export declare function toOklch(color: string): Oklch;
/**
 * OKLCH → sRGB, reducing chroma until the colour fits.
 *
 * Lightness and hue survive, chroma gives way — the same trade CSS makes, and
 * the reason the lightness of a derived step can be relied on for contrast even
 * where the hue can't hold its saturation.
 */
export declare function toRgb(oklch: Oklch): string;
/** `oklch(from color l c h)` — lightness replaced outright. */
export declare function setL(color: string, l: number): string;
/** `oklch(from color min(l, bound) c h)`. */
export declare function capL(color: string, bound: number): string;
/** `oklch(from color max(l, bound) c h)`. */
export declare function floorL(color: string, bound: number): string;
