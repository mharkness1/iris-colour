import { Colour, Palette } from "../../types";
import { defaultStepSize } from "./defaultConsts";
// Triadic, quartic, analagous, etc.

export function genComplementPalette(col: Colour, setSize: number = defaultStepSize): Palette | null {
    return null
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

export type PaletteType = "Tint" | "Tones" | "Monochrome" | "Triadic" | "Analagous" | "Complementary" | "Tetradic" | "Custom" | "Spectrum"
