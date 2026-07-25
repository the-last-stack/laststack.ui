import type { AnchorHTMLAttributes, HTMLAttributes } from 'react';
type TabsTone = 'primary' | 'accent';
type TabsSize = 'sm' | 'md';
type TabsProps = HTMLAttributes<HTMLElement> & {
    tone?: TabsTone;
    size?: TabsSize;
    /** Draw the rule the active tab's underline sits on. */
    rule?: boolean;
};
/**
 * Navigation tabs — a row of links, one of them current.
 *
 * Deliberately not ARIA `tablist`/`tab`: those promise tab panels in the same
 * document. These are links that change the page, so the active one is marked
 * `aria-current="page"`. For choosing a value in place, use SegmentedControl.
 */
export declare function Tabs({ className, tone, size, rule, ...props }: TabsProps): import("react").JSX.Element;
type TabProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
    active?: boolean;
};
export declare function Tab({ className, active, ...props }: TabProps): import("react").JSX.Element;
export {};
