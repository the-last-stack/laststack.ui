import type { RefObject } from 'react';
type IntentColor = {
    default: string;
    muted: string;
    foreground: string;
    hover: string;
};
export type LastStackPalette = {
    primary: IntentColor;
    accent: IntentColor;
    success: IntentColor;
    warning: IntentColor;
    error: IntentColor;
    info: IntentColor;
    background: {
        default: string;
        muted: string;
        raised: string;
    };
    foreground: {
        default: string;
        muted: string;
        subtle: string;
    };
    border: {
        default: string;
        muted: string;
        focus: string;
    };
};
export type LastStackThemeValues = {
    palette: LastStackPalette;
};
export type LastStackColorValues = LastStackPalette;
export declare function useTheme(ref?: RefObject<HTMLElement | null>): LastStackThemeValues;
export declare function useLastStackColorValues(ref?: RefObject<HTMLElement | null>): LastStackPalette;
export {};
