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
npm install laststack.ui
```
 
Wrap your app in `LastStackUI` with a theme config:
 
```tsx
import { LastStackUI, Button, Badge } from 'laststack.ui'
import 'laststack.ui/styles.css'
 
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
 
### Components
 
| Component | Notes |
|---|---|
| `Button` | `variant`: solid · outline · subtle · ghost. `tone`: primary · accent · destructive. `size`: sm · md · lg |
| `Badge` | `tone`: primary · accent · info · success · warning · error. `size`: sm · md · lg |
| `Card` | `variant`: default · elevated · interactive |
| `Checkbox` | Controlled, accessible |
| `SegmentedControl` | Single-select tab strip |
| `Slider` | Controlled range input |
 
### CSS
 
```js
import 'laststack.ui/styles.css'      // base styles (required)
import 'laststack.ui/tailwind.css'    // tailwind v4 layer (optional)
import 'laststack.ui/theme.css'       // CSS custom props only (optional)
import 'laststack.ui/components.css'  // component styles only (optional)
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
| `npm run preview` | Preview the workbench production build |
 

