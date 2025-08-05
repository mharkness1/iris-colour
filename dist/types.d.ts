export type RGB = {
    r: number;
    g: number;
    b: number;
    a?: number;
};
export type HSL = {
    h: number;
    s: number;
    l: number;
    a?: number;
};
export type HSV = {
    h: number;
    s: number;
    v: number;
    a?: number;
};
export type ColourModes = RGB | HSL | HSV | Hex;
export type Hex = string;
export type PaletteType = "Tints" | "Shades" | "Tones" | "Monochrome" | "Triadic" | "Analagous" | "Complementary" | "Tetradic" | "Custom" | "Spectrum" | "Quadratic";
export interface Colour {
    hex: string;
    rgb: RGB;
    hsl: HSL;
    hsv: HSV;
    luminance: number;
    name: string;
}
export type Palette = {
    colours: Colour[];
    name: string;
    type: PaletteType;
    primary: Colour;
};
