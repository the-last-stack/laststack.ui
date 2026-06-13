import type { InputHTMLAttributes } from 'react';
type SliderTone = 'primary' | 'accent';
type SliderProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
    label: string;
    tone?: SliderTone;
    valueLabel?: string;
};
export declare function Slider({ className, label, tone, valueLabel, ...props }: SliderProps): import("react").JSX.Element;
export {};
