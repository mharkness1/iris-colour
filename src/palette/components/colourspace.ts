import { createColour } from "../../creator";
import { Colour, Palette } from "../../types"
import { defaultBlackTolerance, defaultGrayTolerance, defaultLightnessSaturationStepSize, defaultMaxPaletteSize, defaultWhiteTolerance } from "./defaultConsts";

export function genMonochromePalette(
    col: Colour,
    blackTolerance: number = defaultBlackTolerance,
    whiteTolerance: number = defaultWhiteTolerance,
    grayTolerance: number = defaultGrayTolerance,
    maxSize: number = defaultMaxPaletteSize
): Palette {
    const { h, s, l, a } = col.hsl;
    const name = `${col.name}-monochrome`;

    const colours: Colour[] = [];
    const lightnessRange = [blackTolerance, 100-whiteTolerance];
    const stepSizeL = (lightnessRange[1] - lightnessRange[0]) / maxSize;
    const saturationRange = [grayTolerance, 100];
    const stepSizeS = (saturationRange[1] - saturationRange[0]) / maxSize;

    for (let i = 1; i <= maxSize; i++) {
        const newL = Math.max(0, Math.min(100, blackTolerance + (stepSizeL * i)));
        const newS = Math.max(0, Math.min(100, grayTolerance + (stepSizeS * i)));

        if (newL === l && newS === s){
            colours.push(col)
        };

        const mono = createColour({ h, s: newS, l: newL, a }, `${name}-${i}`, 'hsl');
        if (mono) colours.push(mono);
    }

    return {
        name: name,
        type: "Monochrome",
        primary: col,
        colours: colours,
    };
}

export function genTints(
    col: Colour,
    stepSize: number = defaultLightnessSaturationStepSize,
    blackTolerance: number = defaultBlackTolerance,
    whiteTolerance: number = defaultWhiteTolerance,
    maxSize: number = defaultMaxPaletteSize, 
): Palette {
    let { h, s, l, a } = col.hsl;
    const name = `${col.name}-tint`;

    if (l < blackTolerance) {
        l = blackTolerance;
    };

    let steps: Colour[] = [];
    for (let i = l + stepSize; i < 100 - whiteTolerance; i+=stepSize) {
        const tint = createColour({ h, s, l: i, a }, `${name}-${steps.length + 1}`, 'hsl');
        if (tint) steps.push(tint);
        if (steps.length >= maxSize) break;
    }

    return {
        name,
        type: "Tints",
        primary: col,
        colours: [col, ...steps],
    };
}

export function genShades(
    col: Colour,
    stepSize: number = defaultLightnessSaturationStepSize,
    blackTolerance: number = defaultBlackTolerance,
    whiteTolerance: number = defaultWhiteTolerance,
    maxSize: number = defaultMaxPaletteSize
): Palette {
    let { h, s, l, a } = col.hsl;
    const name = `${col.name}-shade`;

    if (l > whiteTolerance) {
        l = whiteTolerance;
    };

    let steps: Colour[] = [];
    for (let i = l - stepSize; i >= blackTolerance; i-=stepSize) {
        const shade = createColour({ h, s, l: i, a }, `${name}-${steps.length + 1}`, 'hsl');
        if (shade) steps.push(shade);
        if (steps.length >= maxSize) break;
    }

    return {
        name,
        type: "Shades",
        primary: col,
        colours: [col, ...steps],
    };
}

export function genTones(
    col: Colour,
    stepSize: number = defaultLightnessSaturationStepSize,
    grayTolerance: number = defaultGrayTolerance,
    maxSize: number = defaultMaxPaletteSize,
): Palette {
    let { h, s, l, a } = col.hsl;
    const name = `${col.name}-tone`;

    if (s < grayTolerance) {
        s = grayTolerance;
    };

    let steps: Colour[] = [];
    for (let i = s - stepSize; i >= grayTolerance; i-=stepSize) {
        const tone = createColour({ h, s: i, l, a }, `${name}-${steps.length + 1}`, 'hsl');
        if (tone) steps.push(tone);
        if (steps.length >= maxSize) break;
    }

    return {
        name,
        type: "Tones",
        primary: col,
        colours: [col, ...steps],
    };
}

/* "Tint" | "Tones" | "Monochrome" 

Tint:
A tint is produced by mixing a color with white.
This lightens the color, making it brighter and less intense.
For example, adding white to red creates pink, which is a tint of red.

Shade:
A shade is created by mixing a color with black.
This darkens the color, making it deeper and less bright.
For example, adding black to blue creates a darker blue, which is a shade of blue.

Tone:
A tone is created by mixing a color with gray (which is a mixture of black and white).
This reduces the intensity or saturation of the color, making it appear duller or more muted.
*/