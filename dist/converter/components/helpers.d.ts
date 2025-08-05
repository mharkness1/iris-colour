import { Colour, RGB } from "../../types.js";
export declare function getLuminanceRGB({ r, g, b }: RGB): number;
export declare function getContrastRatioColour(color1: Colour, color2: Colour): number;
export declare function invertColour(col: Colour): Colour;
export declare function toGrayscale(col: Colour): Colour;
