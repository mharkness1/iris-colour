# Iris (Library)

To the best of my knowledge this colour library does something that others do not. The purpose, rather than colour management or color palette recommendation is to allow users of the library to define a broad '*color language*'. This is defined over a variety of parameters shared between functions. A detailed list of these parameters and their impact is provided below.

The idea behind this library was that it would be utilised either on front/back end to programmatically generate colour palettes over an indeterminate number of colours elements/components. For instance, allowing a user specified 'base' and generating a predefined palette from that which nevertheless conforms to common traits e.g., hue or saturation step size, how gray or how white or how black colours are able to become etc.

The core of the library is the color interface.

```typescript
interface Colour {
    hex: string
    rgb: RGB
    hsl: HSL
    hsv: HSV
    luminance: number
    name: string
}
```

with the various colour components defined in turn, all colour formats allow for an additional alpha channel, although currently this isn't utilised by the library logic. For example:

```typescript
type RGB = {
    r: number
    g: number
    b: number
    a?: number
}
```

The other core feature is the palette type defined as:

```typescript
type Palette = {
    colours: Colour[]
    name: string
    type: PaletteType
    primary: Colour
}
```

Where primary is the colour that generated the palette, in most instances the primary will also be returned within the colours array care should be taken to filter, skip, or remove this colour by matching any of its more primative properties. Currently ```PaletteType``` is the union of string values taking any of: ```"Tints" | "Shades" | "Tones" | "Monochrome" | "Triadic" | "Analagous" | "Complementary" | "Tetradic" | "Custom" | "Spectrum" | "Quadratic"```

**Note: "Custom" is currently not supported.**

## Installation

```bash
npm install iris-colour@latest
```

## Functionality
### Utilities
1. Parsers

Each 

2. Validity Checkers
3. HTML/CSS Integration
4. Accessibility


### Colour Management
1. Colour Extensions - inversion and grayscale
2. Factory
3. Contrast


### Palettes
#### Constants
#### Palettes


## Future Versions
- Additional spectrum options i.e., 3 and 4 colours.
- Additional palettes - complementary colours splits, custom hsl transformations.
- Custom palette definitions.
- Prune, iterate over a palette given some given colour and remove colours that fail contrast/accessibility checks.

## Support 