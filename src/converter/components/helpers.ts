import { RGB } from "../../types";


export function getLuminanceRGB({ r, g, b, a}: RGB): number {
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