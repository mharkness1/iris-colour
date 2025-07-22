import { Colour, RGB } from "../../types";
import { getContrastRatioColour } from "../../converter/components/helpers";

export function isAccessible(foreground: Colour, background: Colour, level: 'AA' | 'AAA' = 'AA', largeText: boolean = false): boolean {
    const ratio = getContrastRatioColour(foreground, background);

    if (level === 'AA') {
        return largeText ? ratio >= 3 : ratio >= 4.5;
    } else if (level === 'AAA') {
        return largeText ? ratio >= 4.5 : ratio >= 7;
    }

    return false;
}

export function toCssString(col: Colour): string {
    const { r, g, b, a } = col.rgb;
    return a !== undefined ? `rgba(${r}, ${g}, ${b}, ${+a.toFixed(3)})` : `rgb(${r}, ${g}, ${b})`;
}