# LastStack UI

In theory, component systems are derived from just a few colors: two brand and 
four semantic (info, success, warning, error). But in practice getting them 
"right", with background and foregrounds that land well, supporting dark mode 
and light mode, with subtle changes for cards, kinds of buttons or badges, 
inputs, borders, hover states. I mean maybe I'm overcomplicating things but 
there's a reason I keep falling back into building the same damn ui with shadcn 
in every single product i try to build. 

Well, no more. It turns out you can really get most of the way there with some 
color mixing, especially if the theme you start with is coherent. There's still 
some fine tuning that the human eye just sorta has to feel out, but we can model 
that too with some knobs and sliders, right? 

So here we are. This is a component library with an intentionally small 
footprint that leverages tailwind because I like tailwind. You pass in your 
color theme with just 6 colors, and some fine tuning you might have worked out 
in the workbench, and that's it. No weird insane css directives and awkward 
building (i mean, it's there, but you don't have to deal with that for theming). 
Literally go to https://coolors.co/, find a color theme you like, paste it into 
the workbench and your web app will look pretty good, with those colors.

--- 

The repo has two parts:
 
- **Component library** -- publishable React package with the theme engine
- **Workbench** -- standalone app for tuning and previewing the theme live
---
 
## Using the library
 
```bash
npm install @the-last-stack/laststack.ui
```
 
React 19 or newer is a peer dependency, so bring your own `react` and
`react-dom`. Nothing else is needed at runtime — Tailwind builds this package
but doesn't have to build yours, because the stylesheet you import is already
compiled.
 
Wrap your app in `LastStackUI` with a theme config:
 
```tsx
import { LastStackUI, Button, Badge } from '@the-last-stack/laststack.ui'
import '@the-last-stack/laststack.ui/styles.css'
 
export function App() {
  return (
    <LastStackUI theme={{
      seeds: {
        primary: '#1a1a6e',
        accent: '#7ec8e3',
        info: '#4a90d9',
        success: '#4caf7d',
        warning: '#e0a020',
        error: '#d95555',
      }
    }}>
      <Button>click me</Button>
      <Badge tone="success">live</Badge>
    </LastStackUI>
  )
}
```
 
The `theme` prop is optional. Defaults work out of the box.
 
### Theme config
 
```ts
type LastStackThemeConfig = {
  seeds: {
    primary: string   // brand color 1
    accent: string    // brand color 2
    info: string
    success: string
    warning: string
    error: string
  }
  surface?: {
    tint?: number              // 0-20, brand tint on surfaces (default 4)
    tintSource?: 'primary' | 'accent'
    lightBrightness?: number   // 0-12, surface lift in light mode (default 8)
    darkLift?: number          // 0-30, surface lift in dark mode (default 12)
  }
  clamps?: {
    primaryLight?: boolean   // keep primary legible on light surfaces
    primaryDark?: boolean    // keep primary legible on dark surfaces
    accentLight?: boolean
    accentDark?: boolean
  }
}
```
 
If you want theme scoping below the app root, `createThemeStyle(config)` returns a CSS custom property object you can spread onto any element.
 
### Where the seeds land
 
Inline styles on the provider only reach its descendants. Anything resolving
*above* it — `:root` variables your app defines, the `body` background, the
overscroll area — would fall back to the library defaults and paint in the wrong
colour. So the outermost `LastStackUI` also mirrors the seeds onto `<html>`.
 
Control it with `scope`:
 
| value | behaviour |
|---|---|
| `auto` (default) | mirror onto `<html>` when outermost; nested providers stay local |
| `root` | always mirror onto `<html>` |
| `element` | never touch `<html>` — for apps embedded in a page they don't own |
 
The mirrored properties are restored on unmount.
 
### Light and dark mode
 
Add `dark` to any ancestor — usually `<html>`:
 
```js
document.documentElement.classList.add('dark')
```
 
Everything inside switches, including providers further down the tree.
 
To pin a subtree to light *inside* a dark ancestor — side-by-side specimens, a
printable panel — add the explicit `light` class:
 
```tsx
<div className="ls-ui light">…stays light…</div>
```
 
Why both exist: `LastStackUI` sets your seed colors on its own element, so the
derived tokens (surfaces, borders, text, tints) have to be re-declared there to
resolve against *your* colors rather than the defaults. That means the provider
always restates the mode it's in, and a `dark` ancestor has to out-specify it.
`light` is the escape hatch that ties on specificity and wins on order.
 
### Palette ramps
 
Every seed also generates a numbered scale, as CSS variables and as a hook:
 
```tsx
import { usePalette, stepTextTone } from 'laststack.ui'
 
const { primary } = usePalette()
primary[300]   // resolved colour value
primary.seed   // exactly the hex you passed in
```
 
```css
background: var(--color-primary-300);
```
 
Steps are `50 100 200 … 900 950`.
 
**Lightness is fixed per step; the seed supplies hue and chroma.** Step 300 is
the same lightness whatever colour you passed in, which is what makes the
number comparable across intents — `primary-200` and `error-200` are equally
light. The seed is never snapped into the scale; a seed that happens to be very
light or very dark would otherwise skew every step around it. It stays
available as `seed`.
 
Because lightness is fixed, legibility is a property of the number:
 
| step | text |
|---|---|
| ≤ 500 | black |
| ≥ 600 | white |
 
True for every hue — `stepTextTone(step)` returns `'dark' | 'light'`. The ladder
jumps from L .68 at 500 to L .53 at 600 on purpose, stepping over the band
around L .56 where neither black nor white reaches 4.5:1, so no step is ever
illegible both ways.
 
The ramp is **mode-independent**. Dark mode doesn't change the scale, it changes
which step you reach for — the same button might be `700` in light and `300` in
dark.
 
### Components
 
Every component spreads the rest of its props onto the element it renders, so
`className`, `id`, handlers and ARIA attributes all pass through.
 
| Component | Notes |
|---|---|
| `Button` | `variant`: solid · outline · subtle · ghost. `tone`: primary · accent · destructive. `size`: sm · md · lg |
| `Badge` | `tone`: primary · accent · info · success · warning · error · muted. `size`: sm · md · lg |
| `Callout` | `tone`: info · success · warning · error, each with its own icon. `title` optional |
| `Card` | `variant`: default · elevated · interactive. With `CardTitle` and `CardDescription` |
| `Text` | `tone`: default · muted · subtle. `size`: sm · md · lg. `weight`: normal · medium · strong |
| `Checkbox` | Controlled, accessible. `tone`: primary · accent |
| `Input` · `Textarea` | Form controls, styled from the theme |
| `Field` | Label, hint and error wrapper for a control |
| `SegmentedControl` | Single-select tab strip |
| `Slider` | Controlled range input. `tone`: primary · accent |
| `Tabs` · `Tab` | Navigation strip. `tone`: primary · accent. `size`: sm · md |
| `Table` | With `TableHead`, `TableBody`, `TableRow`, `TableCell`, `TableHeaderCell`. `size`: sm · md |
| `Progress` | `value` and `max`. `tone`: the six seeds. `size`: sm · md · lg |
| `Spinner` | `tone`: primary · accent · neutral. `size`: sm · md · lg. `label` for screen readers |
| `Disclosure` | Collapsible `<details>`. `title` required, `defaultOpen` optional |
| `Container` | Page-width wrapper. `size`: sm · md · lg |
| `Stack` · `Inline` | Vertical and horizontal layout. `gap`: none · xs · sm · md · lg · xl, plus `align` and `justify` |
 
### Hooks
 
`useTheme()` and `useLastStackColorValues()` read the resolved theme from
inside the provider — the mixed palette, not just the six seeds you passed in.
 
### Without a DOM
 
`@the-last-stack/laststack.ui/color` derives the same tokens as flat colour
values. It imports no CSS and touches no DOM, so a React Native bundler can
load it.
 
```js
import { derivePalette } from '@the-last-stack/laststack.ui/color'
 
const p = derivePalette({ seeds }, isDark ? 'dark' : 'light')
p.bg            // '#111114'
p.actionPrimary // the clamped brand colour, legible on that background
p.errorOnTint   // what to write on p.errorTint
```
 
The stylesheet stays the engine on the web — it gamut-maps, re-derives per
scope, and makes the mode a class. This is those rules written out a second
time for renderers that have none of that, and `npm run check:palette` fails
the build if the two stop agreeing.
 
The numbered ramps are web-only: they overshoot sRGB chroma on purpose and
rely on the browser pulling it back.
 
### CSS
 
```js
import '@the-last-stack/laststack.ui/styles.css'      // base styles (required)
import '@the-last-stack/laststack.ui/tailwind.css'    // tailwind v4 layer (optional)
import '@the-last-stack/laststack.ui/theme.css'       // CSS custom props only (optional)
import '@the-last-stack/laststack.ui/components.css'  // component styles only (optional)
```
 
---
 
## Workbench
 
A standalone Vite app. Edit seed colors, surface settings, and contrast clamps live, then copy the resulting config object straight into your project.
 
```bash
npm install
npm run dev
```
 
To build and deploy:
 
```bash
npm run build
```
 
---
 
## Scripts
 
| Command | What it does |
|---|---|
| `npm run dev` | Start the workbench dev server |
| `npm run build` | Build the workbench for deployment |
| `npm run build:lib` | Build the component library package |
| `npm run check:palette` | Diff the DOM-free palette against the stylesheet (needs a build) |
| `npm run preview` | Preview the workbench production build |
 

