import type { ButtonHTMLAttributes } from 'react';
type ButtonVariant = 'solid' | 'outline' | 'subtle' | 'ghost';
type ButtonTone = 'primary' | 'accent' | 'destructive';
type ButtonSize = 'sm' | 'md' | 'lg';
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    size?: ButtonSize;
    variant?: ButtonVariant;
    tone?: ButtonTone;
};
export declare function Button({ className, size, tone, variant, ...props }: ButtonProps): import("react").JSX.Element;
export {};
