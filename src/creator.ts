import { Colour, Input } from "./types";

export function createColour(input: Input, name: string = 'Unnamed', format?: string): Colour | null {
    
    return null
}

/*
export function createColour(input: InputColor, name = 'Unnamed'): Colour {
  let rgb: RGB;

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