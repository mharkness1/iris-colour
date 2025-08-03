import { Colour, ColourModes, RGB, HSL, HSV, Hex } from "./types";
import { hexToRGB, rgbToHSL, rgbToHSV, rgbToHex, hslToRGB, hsvToRGB } from "./converter/components/converter";


// function works by guaranteeing the existence of RGB and then converting from that.
export function createColour(input: ColourModes, name: string = 'Unnamed', format?: string): Colour | null {
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

  const hex = rgbToHex(rgb);
  const hsl = rgbToHsl(rgb);
  const hsv = rgbToHsv(rgb);
  const luminance = getLuminance(rgb);

  return {
    hex,
    rgb,
    hsl,
    hsv,
    luminance,
    name,
  };
}


/*
export function createColour(input: Input, name = 'Unnamed'): Colour {
  if ('hex' in input) {
    rgb = hexToRgb(input.hex);
  } else if ('rgb' in input) {
    rgb = input.rgb;
  } else if ('hsl' in input) {
    rgb = hslToRgb(input.hsl);
  } else if ('hsv' in input) {
    rgb = hsvToRgb(input.hsv);
  } else {
    throw new Error('Unsupported input color format');
  }

  const hexCode = rgbToHex(rgb);
  const hsl = rgbToHsl(rgb);
  const hsv = rgbToHsv(rgb);
  const luminance = getLuminance(rgb);

  return {
    hexCode,
    hex: hexCode,
    rgb,
    hsl,
    hsv,
    luminance,
    name,
  };
}
*/