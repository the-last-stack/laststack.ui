import type { HTMLAttributes, ReactNode } from 'react';
import type { LastStackThemeConfig } from './theme';
import './styles.css';
type LastStackUIProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
    children: ReactNode;
    theme?: LastStackThemeConfig;
};
export declare function LastStackUI({ children, className, style, theme, ...props }: LastStackUIProps): import("react").JSX.Element;
export {};
