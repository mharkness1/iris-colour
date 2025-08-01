import { Colour, RGB } from "../../types";


export function getLuminanceRGB({ r, g, b }: RGB): number {
    // Normalize RGB to [0, 1]
    const toLinear = (subCol: number): number => {
        const sRGB = subCol / 255;
        return sRGB <= 0.03928 ? sRGB / 12.92 : Math.pow((sRGB + 0.055) / 1.055, 2.4);
    };

    const R = toLinear(r);
    const G = toLinear(g);
    const B = toLinear(b);

    // Relative luminance formula (sRGB, per WCAG)
    return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}


export function getContrastRatioColour(color1: Colour, color2: Colour): number {
    const lum1 = getLuminanceRGB(color1.rgb);
    const lum2 = getLuminanceRGB(color2.rgb);

    const lighter = Math.max(lum1, lum2);
    const darker = Math.min(lum1, lum2);

    const ratio = (lighter + 0.05) / (darker + 0.05);
    return Math.round(ratio * 100) / 100; // rounded to 2 decimal places
}

/*
export function invertColour(col: Colour): Colour {
    const { r, g, b, a } = col.rgb;
    const returnColour: Colour
    return new Colour({ r: 255 - r, g: 255 - g, b: 255 - b, a});
}
*/

//TODO: add to grayscale as well as invert