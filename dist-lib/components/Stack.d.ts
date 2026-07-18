import type { HTMLAttributes } from 'react';
type Gap = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type Align = 'start' | 'center' | 'end' | 'stretch';
type StackProps = HTMLAttributes<HTMLDivElement> & {
    gap?: Gap;
    align?: Align;
};
export declare function Stack({ className, gap, align, ...props }: StackProps): import("react").JSX.Element;
export {};
