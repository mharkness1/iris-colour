# Iris (Library)

To the best of my knowledge this colour library does something that others do not. The purpose, rather than colour management or color palette recommendation is to allow users of the library to define a broad '*color language*'.

This is defined over a variety of parameters shared between functions. A detailed list of these parameters and their impact is provided below.

The idea behind this library was that it would be utilised either on front/back end to programmatically generate colour palettes over an indeterminate number of colours elements/components.

For instance, allowing a user specified 'base' and generating a predefined palette from that which nevertheless conforms to common traits e.g., hue or saturation step size, how gray or how white or how black colours are able to become etc.

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

with the various colour components defined in turn, all colour formats allow for an additional alpha channel, although currently this isn't utilised by the library logic. **Currently only RGB, HSL, HSV, Hex colour modes are supported**. For example:

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

Each colour mode has a corresponding parser function, it takes a string and return a conforming object of the relevant type e.g., ```parseRBG(input: string)```. They work by matching relevant regex statements and check the validity of the value range.

These are designed to be as flexible as possible. For instance the RGB parser matches against ```^(?:rgba?)?\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})(?:\s*,\s*(\d*\.?\d+))?\s*\)$/i``` and so will successfully parse any of the following strings or permutations of the formats:
- rgb(100,200,100)
- RGB(100, 200, 100)
- rgb (100,200,100)
- rgb(100 200 100 0.5)
- (100,200,100)
- (100 200 100)

*I've found this flexibility useful in binding it to custom front-end inputs, however, it does mean that one must be careful about what is being used as an imput string

There also exists a general parser. It takes a string and an optional format input: ```InputParser(input: string, format?: string)``` and returns the relevant object. Where the optional format input takes the case insensitive form of "hex", "rgb", "hsl", "hsv". If no format is supplied then it iterates through possibilities and return the first valid object.

**NOTE: in some cases inputs may satisfy the requirements of two modes e.g., 50, 50, 50 will satisfy both rgb and hsl requirements. In these cases the order of precedence is as follows: Hex, RGB, HSL, HSV.**

2. Validity Checkers

Each colour mode has a corresponding validity check, it takes an object of the specific type and checks it for the correct values e.g., ```isValidHex(input: Hex)```.

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