import type { AnchorHTMLAttributes, HTMLAttributes } from 'react'

type TabsTone = 'primary' | 'accent'
type TabsSize = 'sm' | 'md'

type TabsProps = HTMLAttributes<HTMLElement> & {
  tone?: TabsTone
  size?: TabsSize
  /** Draw the rule the active tab's underline sits on. */
  rule?: boolean
}

/**
 * Navigation tabs — a row of links, one of them current.
 *
 * Deliberately not ARIA `tablist`/`tab`: those promise tab panels in the same
 * document. These are links that change the page, so the active one is marked
 * `aria-current="page"`. For choosing a value in place, use SegmentedControl.
 */
export function Tabs({
  className = '',
  tone = 'primary',
  size = 'md',
  rule = false,
  ...props
}: TabsProps) {
  return (
    <nav
      className={`ui-tabs ui-tabs--${tone} ui-tabs--${size}${rule ? ' ui-tabs--rule' : ''} ${className}`.trim()}
      {...props}
    />
  )
}

type TabProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  active?: boolean
}

export function Tab({ className = '', active = false, ...props }: TabProps) {
  return (
    <a
      className={`ui-tab ${className}`.trim()}
      aria-current={active ? 'page' : undefined}
      {...props}
    />
  )
}
