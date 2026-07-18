import type { HTMLAttributes } from 'react';
type ContainerSize = 'sm' | 'md' | 'lg';
type ContainerProps = HTMLAttributes<HTMLDivElement> & {
    size?: ContainerSize;
};
export declare function Container({ className, size, ...props }: ContainerProps): import("react").JSX.Element;
export {};
