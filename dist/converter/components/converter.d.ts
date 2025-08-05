import { Hex, RGB, HSL, HSV } from "../../types.js";
export declare function hexToRGB(input: Hex): RGB;
export declare function rgbToHSL(input: RGB): HSL;
export declare function rgbToHex({ r, g, b, a }: RGB): Hex;
export declare function rgbToHSV({ r, g, b, a }: RGB): HSV;
export declare function hslToRGB({ h, s, l, a }: HSL): RGB;
export declare function hsvToRGB({ h, s, v, a }: HSV): RGB;
