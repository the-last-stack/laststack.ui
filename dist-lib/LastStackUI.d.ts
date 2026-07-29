import type { HTMLAttributes, ReactNode, RefObject } from 'react';
import type { LastStackThemeConfig } from './theme';
import './styles.css';
export declare function useLastStackScope(): RefObject<HTMLDivElement | null> | null;
export type LastStackScopeMode = 'auto' | 'root' | 'element';
type LastStackUIProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
    children: ReactNode;
    theme?: LastStackThemeConfig;
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
    scope?: LastStackScopeMode;
};
export declare function LastStackUI({ children, className, style, theme, scope, ...props }: LastStackUIProps): import("react").JSX.Element;
export {};
