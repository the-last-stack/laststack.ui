import type { HTMLAttributes } from 'react';
type TextTone = 'default' | 'muted' | 'subtle';
type TextSize = 'sm' | 'md' | 'lg';
type TextWeight = 'normal' | 'medium' | 'strong';
type TextProps = HTMLAttributes<HTMLSpanElement> & {
    tone?: TextTone;
    size?: TextSize;
    weight?: TextWeight;
};
export declare function Text({ className, tone, size, weight, ...props }: TextProps): import("react").JSX.Element;
export {};
