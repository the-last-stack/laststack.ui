import type { HTMLAttributes } from 'react';
type ProgressTone = 'primary' | 'accent' | 'info' | 'success' | 'warning' | 'error';
type ProgressSize = 'sm' | 'md' | 'lg';
type ProgressSegment = {
    value: number;
    tone?: ProgressTone;
};
type ProgressProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
    value?: number;
    max?: number;
    tone?: ProgressTone;
    size?: ProgressSize;
    /**
     * Stacked parts of one total, in order. Use when the fill is made of things
     * that mean different things — earned vs. credited, spent vs. committed —
     * and blending them into one number would lose that. Overrides `value`.
     */
    segments?: readonly ProgressSegment[];
};
export declare function Progress({ className, value, max, tone, size, segments, ...props }: ProgressProps): import("react").JSX.Element;
export {};
