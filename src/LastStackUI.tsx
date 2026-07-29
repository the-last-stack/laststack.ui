import { createContext, useContext, useEffect, useLayoutEffect, useMemo, useRef } from 'react'
import type { HTMLAttributes, ReactNode, RefObject } from 'react'
import { createThemeStyle } from './theme'
import type { LastStackThemeConfig } from './theme'
import './styles.css'

/**
 * The element the theme actually lives on.
 *
 * `createThemeStyle` writes the seeds as inline custom properties on this
 * provider, not on `:root` — so anything reading computed colours has to read
 * *here*. Reading `document.documentElement` gets you the library defaults and
 * silently ignores the theme that was passed in.
 */
const LastStackScope = createContext<RefObject<HTMLDivElement | null> | null>(null)

export function useLastStackScope() {
  return useContext(LastStackScope)
}

const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect

export type LastStackScopeMode = 'auto' | 'root' | 'element'

type LastStackUIProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  children: ReactNode
  theme?: LastStackThemeConfig
  /**
   * Where the seeds are written.
   *
   * - `auto` (default) — also mirror them onto `<html>` when this is the
   *   outermost provider, so page-level CSS can see the theme. Nested providers
   *   stay local.
   * - `root` — always mirror onto `<html>`.
   * - `element` — never touch `<html>`. Use when the app is embedded in a page
   *   it doesn't own.
   */
  scope?: LastStackScopeMode
}

export function LastStackUI({
  children,
  className = '',
  style,
  theme,
  scope = 'auto',
  ...props
}: LastStackUIProps) {
  const ref = useRef<HTMLDivElement>(null)
  const parent = useContext(LastStackScope)

  // Inline styles on this element only reach its descendants. Anything that
  // resolves above it — `:root` custom properties defined by the app, the
  // `body` background, the overscroll area — would otherwise fall back to the
  // library defaults and paint in the wrong colour. So the outermost provider
  // mirrors the seeds onto <html> as well.
  const hoist = scope === 'root' || (scope === 'auto' && parent === null)

  // Theme configs are usually written inline, so a new object arrives every
  // render. Key the memo on the content, not the identity.
  const themeKey = theme ? JSON.stringify(theme) : ''
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const themeStyle = useMemo(() => (theme ? createThemeStyle(theme) : null), [themeKey])

  useIsomorphicLayoutEffect(() => {
    if (!hoist || !themeStyle) return

    const root = document.documentElement
    const entries = Object.entries(themeStyle) as [string, string][]
    const previous = entries.map(([prop]) => [prop, root.style.getPropertyValue(prop)] as const)

    for (const [prop, value] of entries) root.style.setProperty(prop, value)

    return () => {
      for (const [prop, value] of previous) {
        if (value) root.style.setProperty(prop, value)
        else root.style.removeProperty(prop)
      }
    }
  }, [hoist, themeStyle])

  return (
    <LastStackScope.Provider value={ref}>
      <div
        ref={ref}
        className={`ls-ui ${className}`.trim()}
        style={{ ...themeStyle, ...style }}
        {...props}
      >
        {children}
      </div>
    </LastStackScope.Provider>
  )
}
