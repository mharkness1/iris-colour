import { RGB, HSL, Hex, HSV, Input } from "../../types"
import { isValidHex, isValidHSL, isValidHSV, isValidRGB } from "./validity"

// Parsers are called on string inputs and formot specified format into the type of that format.
// As well as performing format specific validation.

export function InputParser(format: string, input: string): Input | null {
    switch (format) {
        case "hex":
        case "rgb":
        case "hsl":
        case "hsv":
        case "default":
    }
    return null;
}

const parseHex = (input: string): Hex | null => {
    let hex = input.toLowerCase().trim()
     if (hex.trim().startsWith('#')) {
        hex = input.replace('#', '');
    }
    if (!isValidHex(hex)) return null
    return hex
}

const parseRGB = (input: string): RGB | null => {
    const match = input.match(/^(?:rgba?)?\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})(?:\s*,\s*(\d*\.?\d+))?\s*\)$/i);
    if (!match) return null;

    const r = Number(match[1]);
    const g = Number(match[2]);
    const b = Number(match[3]);
    const a = match[4] !== undefined ? parseFloat(match[4]) : undefined;

    const rgb: RGB = { r, g, b, a };
    return isValidRGB(rgb) ? rgb : null;
}

const parseHSL = (input: string): HSL | null => {
    const match = input.match(/^(?:hsla?)?\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%(?:\s*,\s*(\d*\.?\d+))?\s*\)$/i);
    if (!match) return null;

    const h = Number(match[1]);
    const s = Number(match[2]);
    const l = Number(match[3]);
    const a = match[4] !== undefined ? parseFloat(match[4]) : undefined;

    const hsl: HSL = { h, s, l, a };
    return isValidHSL(hsl) ? hsl : null;
}

const parseHSV = (input: string): HSV | null => {
    const match = input.match(/^(?:hsva?)?\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%(?:\s*,\s*(\d*\.?\d+))?\s*\)$/i);
    if (!match) return null;

    const h = Number(match[1]);
    const s = Number(match[2]);
    const v = Number(match[3]);
    const a = match[4] !== undefined ? parseFloat(match[4]) : undefined;

    const hsv: HSV = { h, s, v, a };
    return isValidHSV(hsv) ? hsv : null;
}
