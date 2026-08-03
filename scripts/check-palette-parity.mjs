#!/usr/bin/env node
// Does the DOM-free palette still say what the stylesheet says?
//
// The web reads its colours from theme.css and React Native reads them from
// src/color, which is two implementations of one set of rules. What drifts is
// the rules — a mix percentage, a clamp bound, a token that only got added on
// one side — so that is what this compares, by evaluating the CSS declarations
// with the palette's own arithmetic and diffing the results.
//
// Only the default seeds can be checked: they are the only ones the stylesheet
// contains. That is enough, because a rule that is wrong is wrong at any seed.
//
// Runs after the library build, against what ships.
//
//   node scripts/check-palette-parity.mjs

import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const { capL, defaultThemeConfig, derivePalette, floorL, format, mix, parse, setL } = await import(
  join(here, '../dist-lib/color.js')
)

const css = readFileSync(join(here, '../src/theme.css'), 'utf8')

// --- the stylesheet as scopes ----------------------------------------------

/** Every rule block, as its selector list and its custom-property declarations. */
function blocks(source) {
  const stripped = source.replace(/\/\*[\s\S]*?\*\//g, '')
  const out = []
  const re = /([^{}]+)\{([^{}]*)\}/g
  let m
  while ((m = re.exec(stripped))) {
    const decls = new Map()
    for (const line of m[2].split(';')) {
      const at = line.indexOf(':')
      if (at < 0) continue
      const name = line.slice(0, at).trim()
      if (name.startsWith('--')) decls.set(name, line.slice(at + 1).trim())
    }
    out.push({ selectors: m[1].trim(), decls })
  }
  return out
}

const all = blocks(css)
const scope = (mode) => {
  const wanted = all.filter((b) =>
    mode === 'dark' ? b.selectors.includes('.dark') : b.selectors.includes('.light'),
  )
  // Root last: a mode block overrides it, never the other way round.
  const roots = all.filter((b) => b.selectors.includes(':root'))
  return [...wanted, ...roots]
}

const lookup = (name, mode) => {
  for (const b of scope(mode)) if (b.decls.has(name)) return b.decls.get(name)
  throw new Error(`${name} is not declared for ${mode}`)
}

// --- evaluating the subset of CSS the theme uses ---------------------------

/** Split on `sep`, ignoring anything nested inside parentheses. */
function splitTop(input, sep) {
  const out = []
  let depth = 0
  let start = 0
  for (let i = 0; i < input.length; i++) {
    const ch = input[i]
    if (ch === '(') depth++
    else if (ch === ')') depth--
    else if (depth === 0 && (sep === ' ' ? /\s/.test(ch) : ch === sep)) {
      out.push(input.slice(start, i))
      start = i + 1
    }
  }
  out.push(input.slice(start))
  return out.map((s) => s.trim()).filter(Boolean)
}

const inner = (expr) => expr.slice(expr.indexOf('(') + 1, expr.lastIndexOf(')'))

function evaluate(expr, mode) {
  const e = expr.trim()

  if (e.startsWith('var(')) return evaluate(lookup(inner(e).trim(), mode), mode)

  if (e.startsWith('color-mix(')) {
    const args = splitTop(inner(e), ',')
    if (args[0].replace(/\s+/g, ' ') !== 'in srgb') {
      throw new Error(`only 'in srgb' is modelled, got '${args[0]}'`)
    }
    const first = splitTop(args[1], ' ')
    return mix(evaluate(first[0], mode), evaluate(args[2], mode), percent(first[1], mode))
  }

  if (e.startsWith('oklch(')) {
    const [from, color, lightness] = splitTop(inner(e), ' ')
    if (from !== 'from') throw new Error(`only relative oklch() is modelled: ${e}`)
    const base = evaluate(color, mode)
    const bound = /^(min|max)\(/.test(lightness)
      ? Number(splitTop(inner(lightness), ',')[1])
      : Number(lightness)
    if (Number.isNaN(bound)) throw new Error(`unreadable lightness: ${lightness}`)
    if (lightness.startsWith('min(')) return capL(base, bound)
    if (lightness.startsWith('max(')) return floorL(base, bound)
    return setL(base, bound)
  }

  return format(parse(e))
}

function percent(expr, mode) {
  const e = expr.trim()
  const raw = e.startsWith('var(') ? lookup(inner(e).trim(), mode) : e
  const n = Number(raw.trim().replace('%', ''))
  if (Number.isNaN(n)) throw new Error(`unreadable percentage: ${expr}`)
  return n
}

// --- the comparison --------------------------------------------------------

/** `primaryOnTint` -> `--color-primary-on-tint`. */
const cssName = (key) => `--color-${key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)}`

// Tokens the stylesheet carries that the palette deliberately doesn't: the
// numbered ramps, and the states only a pointer can reach.
const NOT_PORTED = /^--color-.*(-\d+|-hover|-tint-color)$|^--color-(neutral|border-focus)$/
const INTERNAL = /^--color-action-\w+-(light|dark)$/

let failed = 0
for (const mode of ['light', 'dark']) {
  const tokens = derivePalette(defaultThemeConfig, mode)
  const names = Object.keys(tokens).sort()
  console.log(`\n${mode} — ${names.length} tokens`)

  for (const key of names) {
    const name = cssName(key)
    let expected
    try {
      expected = evaluate(lookup(name, mode), mode)
    } catch (err) {
      failed++
      console.log(`  FAIL  ${key.padEnd(16)} ${err.message}`)
      continue
    }
    const ok = expected.toLowerCase() === tokens[key].toLowerCase()
    if (!ok) failed++
    console.log(
      `  ${ok ? 'ok  ' : 'FAIL'}  ${key.padEnd(16)} ${tokens[key]}${ok ? '' : `  (css says ${expected})`}`,
    )
  }
}

// Not a failure — a new token in the stylesheet is a decision, and this is
// where it becomes visible rather than silent.
const ported = new Set(
  Object.keys(derivePalette(defaultThemeConfig, 'light')).map((k) => cssName(k)),
)
const uncovered = [
  ...new Set(
    all
      .flatMap((b) => [...b.decls.keys()])
      .filter((n) => n.startsWith('--color-'))
      .filter((n) => !ported.has(n) && !NOT_PORTED.test(n) && !INTERNAL.test(n)),
  ),
].sort()
if (uncovered.length) console.log(`\nweb-only, not ported: ${uncovered.join(', ')}`)

console.log(failed ? `\n${failed} failing` : '\npalette matches the stylesheet')
process.exit(failed ? 1 : 0)
