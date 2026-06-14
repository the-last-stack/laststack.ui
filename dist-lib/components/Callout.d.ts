import type { HTMLAttributes } from 'react';
type CalloutTone = 'info' | 'success' | 'warning' | 'error';
type CalloutProps = HTMLAttributes<HTMLDivElement> & {
    tone?: CalloutTone;
    title?: string;
    flush?: boolean;
};
export declare function Callout({ className, tone, title, flush, children, ...props }: CalloutProps): import("react").JSX.Element;
export {};
