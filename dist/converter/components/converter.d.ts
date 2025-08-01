import { Hex, HexCode, RGB, HSL, HSV } from "../../types.js";
export declare function hexToRGB(input: Hex | HexCode): RGB | null;
export declare function rgbToHSL(input: RGB): HSL | null;
export declare function rgbToHex({ r, g, b, a }: RGB): Hex | null;
export declare function rgbToHsv({ r, g, b, a }: RGB): HSV;
