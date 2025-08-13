import { createColour } from "../../creator.js";
import { defaultBlackTolerance, defaultGrayTolerance, defaultLightnessSaturationStepSize, defaultMaxPaletteSize, defaultWhiteTolerance } from "./defaultConsts.js";
export function genMonochromePalette(col, blackTolerance = defaultBlackTolerance, whiteTolerance = defaultWhiteTolerance, grayTolerance = defaultGrayTolerance, maxSize = defaultMaxPaletteSize) {
    const { h, s, l, a } = col.hsl;
    const name = `${col.name}-monochrome`;
    const colours = [];
    const lightnessRange = [blackTolerance, 100 - whiteTolerance];
    const stepSizeL = (lightnessRange[1] - lightnessRange[0]) / (maxSize - 1);
    const saturationRange = [grayTolerance, 100];
    const stepSizeS = (saturationRange[1] - saturationRange[0]) / (maxSize - 1);
    for (let i = 0; i <= maxSize; i++) {
        const newL = Math.max(0, Math.min(100, blackTolerance + (stepSizeL * i)));
        const newS = Math.max(0, Math.min(100, grayTolerance + (stepSizeS * i)));
        const mono = createColour({ h, s: newS, l: newL, a }, `${name}-${i}`, 'hsl');
        if (mono)
            colours.push(mono);
    }
    return {
        name: name,
        type: "Monochrome",
        primary: col,
        colours: colours,
    };
}
export function genTints(col, stepSize = defaultLightnessSaturationStepSize, blackTolerance = defaultBlackTolerance, whiteTolerance = defaultWhiteTolerance, maxSize = defaultMaxPaletteSize) {
    let { h, s, l, a } = col.hsl;
    const name = `${col.name}-tint`;
    if (l < blackTolerance) {
        l = blackTolerance;
    }
    ;
    let steps = [];
    for (let i = l + stepSize; i < 100 - whiteTolerance; i += stepSize) {
        const tint = createColour({ h, s, l: i, a }, `${name}-${steps.length + 1}`, 'hsl');
        if (tint)
            steps.push(tint);
        if (steps.length >= maxSize)
            break;
    }
    return {
        name,
        type: "Tints",
        primary: col,
        colours: [col, ...steps],
    };
}
export function genShades(col, stepSize = defaultLightnessSaturationStepSize, blackTolerance = defaultBlackTolerance, whiteTolerance = defaultWhiteTolerance, maxSize = defaultMaxPaletteSize) {
    let { h, s, l, a } = col.hsl;
    const name = `${col.name}-shade`;
    if (l > 100 - whiteTolerance) {
        l = 100 - whiteTolerance;
    }
    ;
    let steps = [];
    for (let i = l - stepSize; i >= blackTolerance; i -= stepSize) {
        const shade = createColour({ h, s, l: i, a }, `${name}-${steps.length + 1}`, 'hsl');
        if (shade)
            steps.push(shade);
        if (steps.length >= maxSize)
            break;
    }
    return {
        name,
        type: "Shades",
        primary: col,
        colours: [...steps, col],
    };
}
export function genTones(col, stepSize = defaultLightnessSaturationStepSize, grayTolerance = defaultGrayTolerance, maxSize = defaultMaxPaletteSize) {
    const { h, s: originalS, l, a } = col.hsl;
    const name = `${col.name}-tone`;
    // Clamp the starting saturation
    const s = Math.max(grayTolerance, Math.min(100, originalS));
    const tones = [];
    // Step downward
    for (let i = s; i >= grayTolerance; i -= stepSize) {
        const tone = createColour({ h, s: i, l, a }, `${name}-s${i}`, 'hsl');
        if (tone)
            tones.push(tone);
        if (tones.length >= maxSize)
            break;
    }
    // Step upward
    for (let i = s + stepSize; i <= 100; i += stepSize) {
        if (tones.length >= maxSize)
            break;
        const tone = createColour({ h, s: i, l, a }, `${name}-s${i}`, 'hsl');
        if (tone)
            tones.push(tone);
    }
    // Sort by saturation so original color appears in the correct place
    tones.sort((a, b) => (a.hsl.s - b.hsl.s));
    return {
        name,
        type: "Tones",
        primary: col,
        colours: tones.slice(0, maxSize),
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
