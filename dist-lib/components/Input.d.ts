import type { InputHTMLAttributes } from 'react';
type InputSize = 'sm' | 'md' | 'lg';
type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
    inputSize?: InputSize;
    invalid?: boolean;
};
export declare function Input({ className, inputSize, invalid, ...props }: InputProps): import("react").JSX.Element;
export {};
