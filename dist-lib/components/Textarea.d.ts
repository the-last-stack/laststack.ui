import type { TextareaHTMLAttributes } from 'react';
type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
    invalid?: boolean;
};
export declare function Textarea({ className, invalid, ...props }: TextareaProps): import("react").JSX.Element;
export {};
