# LastStack UI

Unreasonably simple, brand-driven white label UI kit for React.

Six seed colors — two brand, four semantic — drive the entire component system. Surfaces, foregrounds, borders, and states all derive themselves from a single plain JavaScript object. No design token spreadsheet. No manual light/dark mode per component.

This repo is two things:

- **Component library** — publishable React package with a theme engine
- **Workbench** — deployable interactive app to tune and preview the theme in real time

---

## Using the library

```bash
npm install laststack.ui
```

Wrap your app in `LastStackUI` and pass a theme config:

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

The `theme` prop is optional — defaults ship out of the box.

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
    tint?: number           // 0–20, brand tint on surfaces (default 4)
    tintSource?: 'primary' | 'accent'
    lightBrightness?: number  // 0–12, surface lift in light mode (default 8)
    darkLift?: number         // 0–30, surface lift in dark mode (default 12)
  }
  clamps?: {
    primaryLight?: boolean  // keep primary legible on light surfaces
    primaryDark?: boolean   // keep primary legible on dark surfaces
    accentLight?: boolean
    accentDark?: boolean
  }
}
```

`createThemeStyle(config)` returns a CSS custom property object you can spread onto any element if you want to apply themes to scoped subtrees rather than the whole app.

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

The workbench is a standalone Vite app that lets you edit seed colors, surface settings, and contrast clamps live, then copy the resulting config object directly into your project.

```bash
npm install
npm run dev
```

To build and deploy it:

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
