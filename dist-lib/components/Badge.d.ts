import type { HTMLAttributes } from 'react';
type BadgeTone = 'primary' | 'accent' | 'info' | 'success' | 'warning' | 'error';
type BadgeSize = 'sm' | 'md' | 'lg';
type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
    tone?: BadgeTone;
    size?: BadgeSize;
};
export declare function Badge({ className, size, tone, ...props }: BadgeProps): import("react").JSX.Element;
export {};
