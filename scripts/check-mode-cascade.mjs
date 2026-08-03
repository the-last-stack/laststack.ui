#!/usr/bin/env node
// Which mode block wins, for every shape a consumer can build.
//
// The light block re-declares the derived tokens on the provider (it has to —
// they can only resolve against the seeds, which live there), so `.dark` has to
// out-rank it. But `.light` has to be able to win too, for a light subtree
// inside a dark page. That balance is easy to get wrong by reordering or by
// missing one selector shape, so it's checked rather than reasoned about.
//
//   node scripts/check-mode-cascade.mjs

import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const css = readFileSync(join(dirname(fileURLToPath(import.meta.url)), '../src/theme.css'), 'utf8')

// Pull the selector list that precedes the mode-defining declaration.
function selectorsFor(marker) {
  const at = css.indexOf(marker)
  if (at < 0) throw new Error(`marker not found: ${marker}`)
  const head = css.slice(0, at)
  const open = head.lastIndexOf('{')
  const prevClose = head.lastIndexOf('}', open)
  const prevComment = head.lastIndexOf('*/', open)
  const start = Math.max(prevClose, prevComment) + (prevComment > prevClose ? 2 : 1)
  return {
    order: at,
    selectors: head
      .slice(start, open)
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean),
  }
}

const DARK_MARK = '--color-bg-neutral: color-mix(in srgb, var(--color-neutral) var(--dark-bg-neutral-mix), black)'
const LIGHT_MARK = '--color-bg-neutral: color-mix(in srgb, var(--color-neutral) var(--light-bg-neutral-mix), white)'

const dark = selectorsFor(DARK_MARK)
// The last occurrence of the light declaration is the provider/.light block;
// the first is the base :root block.
const lightAt = css.lastIndexOf(LIGHT_MARK)
const light = selectorsFor(css.slice(0, lightAt + 1).lastIndexOf(LIGHT_MARK) === lightAt ? LIGHT_MARK : LIGHT_MARK)
light.order = lightAt
light.selectors = (() => {
  const head = css.slice(0, lightAt)
  const open = head.lastIndexOf('{')
  const prevClose = head.lastIndexOf('}', open)
  const prevComment = head.lastIndexOf('*/', open)
  const start = Math.max(prevClose + 1, prevComment + 2)
  return head.slice(start, open).split(',').map((s) => s.trim()).filter(Boolean)
})()

const classesOf = (sel) => sel.split('.').filter(Boolean)
const specificity = (sel) => sel.split(/\s+/).reduce((n, part) => n + classesOf(part).length, 0)

// element = { classes: [...] }, ancestors listed outermost-first
function matches(sel, ancestors, element) {
  const parts = sel.trim().split(/\s+/)
  const subject = parts.at(-1)
  if (!classesOf(subject).every((c) => element.classes.includes(c))) return false

  let chain = [...ancestors]
  for (const part of parts.slice(0, -1).reverse()) {
    const need = classesOf(part)
    const idx = chain.map((a) => need.every((c) => a.classes.includes(c))).lastIndexOf(true)
    if (idx < 0) return false
    chain = chain.slice(0, idx)
  }
  return true
}

function winner(ancestors, element) {
  const best = (block) =>
    block.selectors
      .filter((s) => matches(s, ancestors, element))
      .reduce((m, s) => Math.max(m, specificity(s)), -1)

  const d = best(dark)
  const l = best(light)
  if (d < 0 && l < 0) return 'inherit'
  if (d === l) return dark.order > light.order ? 'dark' : 'light'
  return d > l ? 'dark' : 'light'
}

const el = (...classes) => ({ classes })

const CASES = [
  ['html.dark  >  provider', [el('dark')], el('ls-ui'), 'dark'],
  ['provider that is itself dark', [], el('ls-ui', 'dark'), 'dark'],
  ['html.dark  >  provider.light', [el('dark')], el('ls-ui', 'light'), 'light'],
  ['dark shell  >  light specimen', [el('ls-ui', 'dark')], el('ls-ui', 'light'), 'light'],
  ['light shell  >  dark specimen', [el('ls-ui')], el('dark'), 'dark'],
  ['provider, no mode set', [], el('ls-ui'), 'light'],
  ['catalog inside html.dark', [el('dark')], el('catalog'), 'dark'],
  ['nested provider inside dark', [el('dark'), el('ls-ui')], el('ls-ui'), 'dark'],
]

let failed = 0
console.log(`dark block: ${dark.selectors.length} selectors @${dark.order}`)
console.log(`light block: ${light.selectors.length} selectors @${light.order}\n`)

for (const [name, ancestors, element, expected] of CASES) {
  const got = winner(ancestors, element)
  const ok = got === expected
  if (!ok) failed++
  console.log(`  ${ok ? 'ok  ' : 'FAIL'}  ${name.padEnd(30)} -> ${got}${ok ? '' : `  (expected ${expected})`}`)
}

console.log(failed ? `\n${failed} failing` : '\nall mode scopes resolve correctly')
process.exit(failed ? 1 : 0)
