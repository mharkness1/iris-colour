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

with the various colour components defined in turn, all colour formats allow for an additional alpha channel, although currently this isn't utilised by the library logic. **NOTE: currently only RGB, HSL, HSV, Hex colour modes are supported**. For example:

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

**NOTE: "Custom" is currently not supported.**

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

*I've found this flexibility useful in binding it to custom front-end inputs, however, it does mean that one must be careful about what is being used as an imput string.*

There also exists a general parser. It takes a string and an optional format input: ```InputParser(input: string, format?: string)``` and returns the relevant object. Where the optional format input takes the case insensitive form of "hex", "rgb", "hsl", "hsv". If no format is supplied then it iterates through possibilities and return the first valid object.

**NOTE: in some cases inputs may satisfy the requirements of two modes e.g., 50, 50, 50 will satisfy both rgb and hsl requirements. In these cases the order of precedence is as follows: Hex, RGB, HSL, HSV.**

2. Validity Checkers

Each colour mode has a corresponding validity check, it takes an object of the specific type and checks it for the correct values e.g., ```isValidHex(input: Hex)``` checks using ```/^#?([0-9a-f]{6})/``` i.e., an optional # and at least 6 characters from the digits 0-9 or letters a-f (lowercase only, which is done automatically by the parser). And ```isValidHSL(input: HSL)``` checks that the object has h, s, l, a? (implicity necessary), that the alpha if defined is between 0 and 1 (inclusive of 1), that h is between 0 and 360 (inclusive), and that s, l are between 0 and 100 (inclusive).

3. Converters

The library contains the following converters:
- Hex to RGB
- RGB to Hex
- RGB to HSL
- RGB to HSV
- HSL to RGB
- HSV to RGB

With these 6 converter functions of the form lowercasemodeToUPPERCASEMODE e.g., ```hexToRGB()``` allow users to convert, potentially via a chain, from one format to any other supported format.

4. HTML/CSS Integration

The function ```toCssString(col: colour)``` takes an object of the Colour type and returns the rgb string form compatible with CSS i.e., rgb(100, 100, 100) (supports alpha inclusion).

So it can be utilised directly in browser. In a react component I've used: ```const cssColour = toCssString(colour)``` and ```style={{background: cssColour}}``` as an example.

5. Accessibility

- Luminance

By construction colour objects have a luminance value calculated with the exposed function ```getLuminanceRGB({ r, g, b }: RGB)``` which returns the relative luminance calculated as per WCAG. This can be directly utilised to determine overlay text colour e.g., ```const useWhite = (colour.luminance < 0.3 )``` combined with ```style={{ color: useWhite ? "#ffffff" : "#000000" }}``` 

**NOTE: to use white overlay the generally suggested value for luminance is 0.179**

- Contrast Ratio

The luminance value is used to calculate the contrast ratio between two colours. The exposed function ```getContrastRatioColour(colour1: Colour, colour2: Colour)``` return the contrast ratio as a number.

- Accessibility

The exposed function ```isAccessible(foreground: Colour, background: Colour, level: "AA" | "AAA" = "AA", largeText: boolean = false)``` returns a true/false value reflecting whether, given the parameters the accepted WCAG accessibility standard is complied with.

### Colour Management
1. Colour Extensions - inversion and grayscale

- Inversion

```invertColour(col: Colour)``` takes a colour and returns the 'inversion' i.e., r: 255 - r, g: 255 - g, b: 255 - b.

- Grayscale

```toGrayscale(col: Colour)``` takes a colour and returns the grayscale equivalent i.e., just the lightness component of its HSL representation.

2. Factory

To create a colour object easily use: ```createColour(input: ColourModes, name: string = 'Unnamed', format?: string)``` This is a flexible factory function. It checks whether the input is a string (or if the format is "hex") and whether it meets the expected format. Or whether the input is an object with the attributes expected of RGB, HSL, or HSV.

**NOTE: generally it is wise to parse an input, which checks both validity and type.**

The function then populates a colour object with the necessary properties (it does this by first guaranteeing the existence of the RGB property) and returns that colour object.


### Palettes

The palette generation element of the library has two key elements: shared parameters, and the palette generation functions themselves. All palette generation occurs with HSL primarily.

#### Constants

| Name | Description | Default Value | Palettes |
| --- | --- | --- | --- |
| GrayTolerance | Minimum saturation that can be reached | 10 | Monochrome, Tones |
| BlackTolerance | Minimum lightness that can be reached | 10 | Monochrome, Tints, Shades |
| WhiteTolerance | Maximum lightness that can be reached | 10 | Monochrome, Tints, Shades |
| LightnessSaturationStepSize | Amount lightness and saturation change each step | 10 | Tints, Shades, Tones |
| SpectrumSize | Number of intermediary colours | 6 | Spectrum |
| AnalagousAngle | Variation of hue for analagous colours | 30 | Analagous |
| HueStepSize | Amount hue changes each step | 60 | N/A |
| MaxPaletteSize | Maximum number of colours returned | 6 | Monochrome, Tints, Shades, Tones |
| BlendFactor | How far between two colours an intermediary is generated | 0.5 | N/A |

**NOTE: BlendFactor and HueStepSize are not currently implemented directly**

#### Palettes

### Additional Features
- Name

## Future Versions
- Additional spectrum options i.e., 3 and 4 colours.
- Additional palettes - complementary colours splits, custom hsl transformations.
- Custom palette definitions.
- Prune, iterate over a palette given some given colour and remove colours that fail contrast/accessibility checks.

## Support 