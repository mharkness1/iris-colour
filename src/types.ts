//Colour in the RGB colour mode. Values range from 0 to 255. Alpha is optional and is between 0 and 1 (for RGBA support)

export type RGB = {
    r: number
    g: number
    b: number
    a?: number
};

//Colour in the HSL colour mode. h, hue: between 0 and 360; s, saturation and l, lightness: between 0 and 100. Alpha is optional between 0 and 1.

export type HSL = {
    h: number
    s: number
    l: number
    a?: number
}

//Colour in the HSV colour mode. h, hue: between 0 and 360; s, saturation and v, lightness: between 0 and 100. Alpha is optional between 0 and 1.

export type HSV = {
    h: number
    s: number
    v: number
    a?: number
}

// Potential colour input types - arrive as strings and sent to the parser
export type ColourModes = RGB | HSL | HSV 

// Hexcode acceptance as haven't decided how to handle that yet
export type HexCode = `#${string}`

// Hex as string for completeness of type
export type Hex = string

// All available potential input types including hexcode
export type Input = ColourModes | HexCode | Hex

// Available palette types, implementation dependent - might extend to be their own types with the necessary settings/hyper params
export type PaletteType = "Tint" | "Tones" | "Monochrome" | "Triadic" | "Analagous" | "Complementary" | "Tetradic" | "Custom" | "Sequence"

// Basic system type of colour
export interface Colour {
    hexCode: HexCode
    hex: string
    rgb: RGB
    hsl: HSL
    hsv: HSV
    luminance: number
    name: string
}

export type Palette = {
    colours: Colour[]
    name: string
    type: PaletteType
}