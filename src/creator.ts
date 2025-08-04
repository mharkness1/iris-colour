import { Colour, ColourModes, RGB, HSL, HSV, Hex } from "./types";
import { hexToRGB, rgbToHSL, rgbToHSV, rgbToHex, hslToRGB, hsvToRGB } from "./converter/components/converter";
import { getLuminanceRGB } from "./converter/components/helpers";


// function works by guaranteeing the existence of RGB and then converting from that. Input needs to be parsed to type before invoking this.
export function createColour(input: ColourModes, name: string = 'Unnamed', format?: string): Colour {
    let rgb: RGB;

    if (typeof input === 'string' || format?.toLowerCase() === 'hex') {
        try {
            rgb = hexToRGB(input as Hex);
        } catch {
            throw new Error('Input of type string given as input not valid hex');
        }
    }
    else if (typeof input === 'object') {
        if (('r' in input && 'g' in input && 'b' in input) || format?.toLowerCase() === 'rgb') {
            rgb = input as RGB;
        } else if (('h' in input && 's' in input && 'l' in input) || format?.toLowerCase() === 'hsl') {
            rgb = hslToRGB(input as HSL);
        } else if (('h' in input && 's' in input && 'v' in input) || format?.toLowerCase() === 'hsv') {
            rgb = hsvToRGB(input as HSV);
        } else {
            throw new Error('Object of unrecognised type was provided');
        }
    } else {
        throw new Error('Failed to determine correct format');
    }

  const hex = rgbToHex(rgb) as string;
  const hsl = rgbToHSL(rgb) as HSL;
  const hsv = rgbToHSV(rgb) as HSV;
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