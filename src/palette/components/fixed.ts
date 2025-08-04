import { createColour } from "../../creator";
import { Colour, Palette } from "../../types";
import { defaultStepSize } from "./defaultConsts";
// Triadic, quartic, analagous, etc.

export function genComplement(col: Colour): Colour {
    let { h, s, l, a } = col.hsl;
    
    const complementHue = (h + 180) % 360;
    const name = `${col.name}-complement`;
    
    const complement = createColour({ h: complementHue, s, l, a}, name, 'hsl');

    if (!complement) {
        throw new Error('Failed to generate complement');
    }

    return complement
}

export function genTriadicPalette(col: Colour): Palette {
    const { h, s, l, a } = col.hsl;
    const name = `${col.name}-triadic`

    const Hue1 = (h + 120) % 360;
    const Hue2 = (h + 240) % 360;

    const colour1 = createColour({ h: Hue1, s, l, a }, `${col.name}-triad-1`, 'hsl');
    const colour2 = createColour({ h: Hue2, s, l, a }, `${col.name}-triad-2`, 'hsl');

    if (!colour1 || !colour2) {
        throw new Error('Failed to generate traidic palette');
    }

    const palette: Palette = {
        name: name,
        type: "Triadic",
        primary: col,
        colours: [col, colour1, colour2],
    };

    return palette
}

export function genAnalagousPalette(col: Colour, angle: number = 30): Palette {
    if (angle < 10 || angle >= 90) {
        throw new Error('Provided angle does not meet requirements: greater than 10 and less than or equal to 90')
    }
    
    const { h, s, l, a } = col.hsl;
    const name = `${col.name}-analagous`;
    
    const hue1 = (h + angle) % 360;
    const hue2 = (h - angle + 360) % 360;

    const colour1 = createColour({h: hue1, s, l, a}, `${col.name}-analagous-1`, 'hsl');
    const colour2 = createColour({h: hue2, s, l, a}, `${col.name}-analagous-2`, 'hsl');

    if (!colour1 || !colour2) {
        throw new Error('Failed to generate analagous palette')
    }

    const palette: Palette = {
        name: `${col.name}-analagous`,
        type: "Analagous",
        primary: col,
        colours: [colour2, col, colour1],
    };
    
    return palette
}

export function genTetradicPalette(col: Colour): Palette | null {
    return null
}

export function genQuadraticPalette(col: Colour): Palette | null {
    return null
}



//export type PaletteType = "Tint" | "Tones" | "Monochrome" | "Triadic" | "Analagous" | "Complementary" | "Tetradic"
