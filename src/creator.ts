import { Colour, ColourModes, RGB, HSL, HSV, Hex } from "./types";
import { hexToRGB, rgbToHSL, rgbToHSV, rgbToHex, hslToRGB, hsvToRGB } from "./converter/components/converter";


// function works by guaranteeing the existence of RGB and then converting from that.
export function createColour(input: ColourModes, name: string = 'Unnamed', format?: string): Colour | null {
    let rgb: RGB;
    // Handle HEX strings (with or without format hint)
    if (typeof input === 'string' || format?.toLowerCase() === 'hex') {
        try {
            rgb = hexToRGB(input as Hex);
        } catch {
            return null;
        }
    }

  // Handle inferred object type (RGB, HSL, HSV)
  else if (typeof input === 'object') {
    if ('r' in input && 'g' in input && 'b' in input) {
      rgb = input;
    } else if ('h' in input && 's' in input && 'l' in input) {
      rgb = hslToRgb(input);
    } else if ('h' in input && 's' in input && 'v' in input) {
      rgb = hsvToRgb(input);
    } else {
      return null;
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