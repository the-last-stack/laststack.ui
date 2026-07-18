import type { HTMLAttributes } from 'react';
type Gap = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type Align = 'start' | 'center' | 'end' | 'stretch';
type Justify = 'start' | 'center' | 'end' | 'between';
type InlineProps = HTMLAttributes<HTMLDivElement> & {
    gap?: Gap;
    align?: Align;
    justify?: Justify;
    wrap?: boolean;
};
export declare function Inline({ className, gap, align, justify, wrap, ...props }: InlineProps): import("react").JSX.Element;
export {};
