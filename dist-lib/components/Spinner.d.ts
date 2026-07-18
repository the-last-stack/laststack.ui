import type { HTMLAttributes } from 'react';
type SpinnerSize = 'sm' | 'md' | 'lg';
type SpinnerTone = 'primary' | 'accent' | 'neutral';
type SpinnerProps = HTMLAttributes<HTMLSpanElement> & {
    size?: SpinnerSize;
    tone?: SpinnerTone;
    label?: string;
};
export declare function Spinner({ className, size, tone, label, ...props }: SpinnerProps): import("react").JSX.Element;
export {};
