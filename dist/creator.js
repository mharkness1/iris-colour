import { hexToRGB, rgbToHSL, rgbToHSV, rgbToHex, hslToRGB, hsvToRGB } from "./converter/components/converter.js";
import { getLuminanceRGB } from "./converter/components/helpers.js";
// function works by guaranteeing the existence of RGB and then converting from that. Input needs to be parsed to type before invoking this.
export function createColour(input, name = 'Unnamed', format) {
    let rgb;
    if (typeof input === 'string' || format?.toLowerCase() === 'hex') {
        try {
            rgb = hexToRGB(input);
        }
        catch {
            throw new Error('Input of type string given as input not valid hex');
        }
    }
    else if (typeof input === 'object') {
        if (('r' in input && 'g' in input && 'b' in input) || format?.toLowerCase() === 'rgb') {
            rgb = input;
        }
        else if (('h' in input && 's' in input && 'l' in input) || format?.toLowerCase() === 'hsl') {
            rgb = hslToRGB(input);
        }
        else if (('h' in input && 's' in input && 'v' in input) || format?.toLowerCase() === 'hsv') {
            rgb = hsvToRGB(input);
        }
        else {
            throw new Error('Object of unrecognised type was provided');
        }
    }
    else {
        throw new Error('Failed to determine correct format');
    }
    const hex = rgbToHex(rgb);
    const hsl = rgbToHSL(rgb);
    const hsv = rgbToHSV(rgb);
    const luminance = getLuminanceRGB(rgb);
    return {
        hex,
        rgb,
        hsl,
        hsv,
        luminance,
        name,
    };
}
