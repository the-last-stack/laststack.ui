import type { HTMLAttributes } from 'react';
type CardVariant = 'default' | 'elevated' | 'interactive';
type CardProps = HTMLAttributes<HTMLDivElement> & {
    variant?: CardVariant;
};
export declare function Card({ className, variant, ...props }: CardProps): import("react").JSX.Element;
export declare function CardTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>): import("react").JSX.Element;
export declare function CardDescription({ className, ...props }: HTMLAttributes<HTMLParagraphElement>): import("react").JSX.Element;
export {};
