import { createColour } from "../../creator";
import { Colour, Palette } from "../../types";
import { defaultStepSize } from "./defaultConsts";
// Triadic, quartic, analagous, etc.

export function genComplementPalette(col: Colour): Colour {
    let { h, s, l, a } = col.hsl;
    
    const complementHue = (h + 180) % 360;
    const name = `${col.name}-complement`;
    
    const complement = createColour({ h: complementHue, s, l, a}, name, 'hsl');

    if (!complement) {
        throw new Error('Failed to generate complement');
    }

    return complement
}

export function genTriadicPalette(col: Colour): Palette | null {
    return null
}

export function genAnalagousPalette(col: Colour): Palette | null {
    return null
}

export function genTetradicPalette(col: Colour): Palette | null {
    return null
}

export function genQuadraticPalette(col: Colour): Palette | null {
    return null
}



//export type PaletteType = "Tint" | "Tones" | "Monochrome" | "Triadic" | "Analagous" | "Complementary" | "Tetradic"
