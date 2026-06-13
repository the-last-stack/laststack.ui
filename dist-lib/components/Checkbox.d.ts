import type { InputHTMLAttributes, ReactNode } from 'react';
type CheckboxTone = 'primary' | 'accent';
type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
    children: ReactNode;
    tone?: CheckboxTone;
};
export declare function Checkbox({ children, className, tone, ...props }: CheckboxProps): import("react").JSX.Element;
export {};
