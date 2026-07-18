import type { HTMLAttributes, ReactNode } from 'react';
type FieldProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
    children: ReactNode;
    label?: ReactNode;
    hint?: ReactNode;
    error?: ReactNode;
    htmlFor?: string;
};
export declare function Field({ className, children, label, hint, error, htmlFor, ...props }: FieldProps): import("react").JSX.Element;
export {};
