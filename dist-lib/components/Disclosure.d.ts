import type { HTMLAttributes, ReactNode } from 'react';
type DisclosureProps = Omit<HTMLAttributes<HTMLDetailsElement>, 'title'> & {
    title: ReactNode;
    defaultOpen?: boolean;
};
export declare function Disclosure({ className, title, defaultOpen, children, ...props }: DisclosureProps): import("react").JSX.Element;
export {};
