import type { ButtonHTMLAttributes, ReactNode } from 'react';
type ButtonVariant = 'solid' | 'outline' | 'subtle' | 'ghost';
type ButtonTone = 'primary' | 'accent' | 'destructive';
type ButtonSize = 'sm' | 'md' | 'lg';
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    size?: ButtonSize;
    variant?: ButtonVariant;
    tone?: ButtonTone;
    loading?: boolean;
    children?: ReactNode;
};
export declare function Button({ className, size, tone, variant, loading, disabled, children, ...props }: ButtonProps): import("react").JSX.Element;
export {};
