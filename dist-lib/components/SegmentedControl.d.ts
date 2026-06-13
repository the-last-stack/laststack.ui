type SegmentedTone = 'primary' | 'accent';
type SegmentedSize = 'sm' | 'md' | 'lg';
type SegmentedOption<TValue extends string> = {
    label: string;
    value: TValue;
};
type SegmentedControlProps<TValue extends string> = {
    'aria-label': string;
    className?: string;
    onChange: (value: TValue) => void;
    options: readonly SegmentedOption<TValue>[];
    size?: SegmentedSize;
    tone?: SegmentedTone;
    value: TValue;
};
export declare function SegmentedControl<TValue extends string>({ 'aria-label': ariaLabel, className, onChange, options, size, tone, value, }: SegmentedControlProps<TValue>): import("react").JSX.Element;
export {};
