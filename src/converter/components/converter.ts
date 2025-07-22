import { Hex, HexCode, RGB } from "../../types";

//Flow should mean the hex code is all lower case and is already of the correct type having been passed through the parser. But checks included.
export function hexToRGB(input: Hex | HexCode, hasAlpha: boolean = false): RGB | null {
    if (typeof input !== 'string') {
        throw new Error('Input must be string, something has gone wrong')
    }
    //standardise potential inputs, HexCode with hash support may not be necessary but just in case.
    let hexInput = input
    if (input.trim().startsWith('#')) {
        hexInput = input.replace('#', '');
    }
    //check for expected format.
    if (!/^[0-9a-f]{3}$|^[0-9a-f]{6}$|^[0-9a-f]{8}$/.test(input)) {
        throw new Error('Hex not in the correct or expected format, may need parsed')
    }
    let r: number, g: number, b: number, a: number | undefined;
    //short format - Iris doesn't use but for convenience
    if (hexInput.length === 3) {
        r = parseInt(hexInput[0] + hexInput[0], 16);
        g = parseInt(hexInput[1] + hexInput[1], 16);
        b = parseInt(hexInput[2] + hexInput[2], 16);
    } else if (hexInput.length === 4 && hasAlpha === true) {
        r = parseInt(hexInput[0] + hexInput[0], 16);
        g = parseInt(hexInput[1] + hexInput[1], 16);
        b = parseInt(hexInput[2] + hexInput[2], 16);
        a = parseInt(hexInput[3] + hexInput[3], 16) / 255;
    } else if (hexInput.length === 6) {
        r = parseInt(hexInput.slice(0, 2), 16);
        g = parseInt(hexInput.slice(2, 4), 16);
        b = parseInt(hexInput.slice(4, 6), 16);
    } else if (hexInput.length === 8 && hasAlpha === true) {
        r = parseInt(hexInput.slice(0, 2), 16);
        g = parseInt(hexInput.slice(2, 4), 16);
        b = parseInt(hexInput.slice(4, 6), 16);
        a = parseInt(hexInput.slice(6, 8), 16) / 255;
    } else {
        return null; //invalid hex input length, by this point should never be reached or Alpha flag
    }

    const rgb: RGB = a! == undefined ? { r, g, b, a } : { r, g, b};
    return rgb;
}