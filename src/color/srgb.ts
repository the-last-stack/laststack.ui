// sRGB and OKLCH, and the two operations the theme performs on colours.
//
// This is the arithmetic the browser does for `color-mix(in srgb, …)` and
// `oklch(from … l c h)`. It exists so a renderer without CSS can reach the same
// values; the stylesheet remains the engine on the web.

export type Rgb = {
  /** 0–255, gamma-encoded, as they appear in a hex literal. */
  r: number
  g: number
  b: number
}

const clamp = (n: number, lo: number, hi: number) => Math.min(Math.max(n, lo), hi)

const HEX = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i
const RGB_FN = /^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)/i

/** Hex (`#abc`, `#aabbcc`), `rgb()`, or the two keywords the theme mixes toward. */
export function parse(color: string): Rgb {
  const c = color.trim()
  if (c === 'white') return { r: 255, g: 255, b: 255 }
  if (c === 'black') return { r: 0, g: 0, b: 0 }

  const hex = HEX.exec(c)
  if (hex) {
    const h = hex[1]
    const wide = h.length === 3 ? [...h].map((d) => d + d).join('') : h
    return {
      r: Number.parseInt(wide.slice(0, 2), 16),
      g: Number.parseInt(wide.slice(2, 4), 16),
      b: Number.parseInt(wide.slice(4, 6), 16),
    }
  }

  const fn = RGB_FN.exec(c)
  if (fn) return { r: Number(fn[1]), g: Number(fn[2]), b: Number(fn[3]) }

  throw new Error(`unsupported colour: ${color}`)
}

export function format({ r, g, b }: Rgb): string {
  const hex = (n: number) =>
    clamp(Math.round(n), 0, 255)
      .toString(16)
      .padStart(2, '0')
  return `#${hex(r)}${hex(g)}${hex(b)}`
}

/**
 * `color-mix(in srgb, a pct%, b)`.
 *
 * The `srgb` interpolation space is gamma-encoded, so this is a plain channel
 * lerp — no linearisation. `srgb-linear` would be the other one.
 */
export function mix(a: string, b: string, pct: number): string {
  const x = parse(a)
  const y = parse(b)
  const w = pct / 100
  return format({
    r: x.r * w + y.r * (1 - w),
    g: x.g * w + y.g * (1 - w),
    b: x.b * w + y.b * (1 - w),
  })
}

// --- OKLab -----------------------------------------------------------------

const toLinear = (c: number) => {
  const n = c / 255
  return n <= 0.04045 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4
}

const toGamma = (n: number) => 255 * (n <= 0.0031308 ? n * 12.92 : 1.055 * n ** (1 / 2.4) - 0.055)

export type Oklch = { l: number; c: number; h: number }

export function toOklch(color: string): Oklch {
  const { r, g, b } = parse(color)
  const lr = toLinear(r)
  const lg = toLinear(g)
  const lb = toLinear(b)

  const l = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb)
  const m = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb)
  const s = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb)

  const okL = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s
  const okA = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s
  const okB = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s

  const h = (Math.atan2(okB, okA) * 180) / Math.PI
  return { l: okL, c: Math.hypot(okA, okB), h: h < 0 ? h + 360 : h }
}

/** Unclamped: channels outside 0–255 mean the colour is outside sRGB. */
function toRgbRaw({ l, c, h }: Oklch): Rgb {
  const rad = (h * Math.PI) / 180
  const a = c * Math.cos(rad)
  const b = c * Math.sin(rad)

  const l_ = (l + 0.3963377774 * a + 0.2158037573 * b) ** 3
  const m_ = (l - 0.1055613458 * a - 0.0638541728 * b) ** 3
  const s_ = (l - 0.0894841775 * a - 1.291485548 * b) ** 3

  return {
    r: toGamma(4.0767416621 * l_ - 3.3077115913 * m_ + 0.2309699292 * s_),
    g: toGamma(-1.2684380046 * l_ + 2.6097574011 * m_ - 0.3413193965 * s_),
    b: toGamma(-0.0041960863 * l_ - 0.7034186147 * m_ + 1.707614701 * s_),
  }
}

const EPSILON = 0.02
const inGamut = ({ r, g, b }: Rgb) =>
  Math.min(r, g, b) >= -EPSILON && Math.max(r, g, b) <= 255 + EPSILON

/**
 * OKLCH → sRGB, reducing chroma until the colour fits.
 *
 * Lightness and hue survive, chroma gives way — the same trade CSS makes, and
 * the reason the lightness of a derived step can be relied on for contrast even
 * where the hue can't hold its saturation.
 */
export function toRgb(oklch: Oklch): string {
  const direct = toRgbRaw(oklch)
  if (inGamut(direct)) return format(direct)

  let lo = 0
  let hi = oklch.c
  for (let i = 0; i < 24; i++) {
    const c = (lo + hi) / 2
    if (inGamut(toRgbRaw({ ...oklch, c }))) lo = c
    else hi = c
  }
  return format(toRgbRaw({ ...oklch, c: lo }))
}

/** `oklch(from color l c h)` — lightness replaced outright. */
export function setL(color: string, l: number): string {
  return toRgb({ ...toOklch(color), l })
}

/** `oklch(from color min(l, bound) c h)`. */
export function capL(color: string, bound: number): string {
  const o = toOklch(color)
  return o.l <= bound ? format(parse(color)) : toRgb({ ...o, l: bound })
}

/** `oklch(from color max(l, bound) c h)`. */
export function floorL(color: string, bound: number): string {
  const o = toOklch(color)
  return o.l >= bound ? format(parse(color)) : toRgb({ ...o, l: bound })
}
