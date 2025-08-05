import { Colour, Palette } from "../../types.js";
export declare function genMonochromePalette(col: Colour, blackTolerance?: number, whiteTolerance?: number, grayTolerance?: number, maxSize?: number): Palette;
export declare function genTints(col: Colour, stepSize?: number, blackTolerance?: number, whiteTolerance?: number, maxSize?: number): Palette;
export declare function genShades(col: Colour, stepSize?: number, blackTolerance?: number, whiteTolerance?: number, maxSize?: number): Palette;
export declare function genTones(col: Colour, stepSize?: number, grayTolerance?: number, maxSize?: number): Palette;
