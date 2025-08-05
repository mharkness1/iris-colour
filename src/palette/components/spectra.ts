import { Colour, Palette } from "../../types";
import { createColour } from "../../creator";
import { defaultBlendFactor, defaultMaxPaletteSize } from "./defaultConsts";

// Takes in two or three ordered colours and fills in the gap.

export function blendColours(
    col1: Colour,
    col2: Colour,
    blendFactor: number = defaultBlendFactor,
    inputName: string = "Blended",
): Colour {
    const t = Math.max(0, Math.min(1, blendFactor));

    const rbg1 = col1.rgb;
    const rgb2 = col2.rgb;

    const r = Math.round(rbg1.r + (rgb2.r - rbg1.r) * t);
    const g = Math.round(rbg1.g + (rgb2.g - rbg1.g) * t);
    const b = Math.round(rbg1.b + (rgb2.b - rbg1.b) * t);

    //Blend alpha if present for both
    const hasAlpha1 = rbg1.a !== undefined;
    const hasAlpha2 = rgb2.a !== undefined;
    let a: number | undefined = undefined;

    if (hasAlpha1 || hasAlpha2) {
        const alpha1 = rbg1.a ?? 1;
        const alpha2 = rgb2.a ?? 1;
        a = parseFloat((alpha1 + (alpha2 - alpha1) * t).toFixed(3));
    }

    const blended = createColour({ r, g, b, a}, inputName, "rgb")
    return blended;
}

export function genSpectrumPalette(
    col1: Colour,
    col2: Colour,
    steps: number = defaultMaxPaletteSize,
    name: string = `${col1.name}-${col2.name}-spectrum`
): Palette {
    const colours: Colour[] = [];

    for (let i = 0; i <= steps + 1; i++) {
        const t = i / (steps + 1);
        const blended = blendColours(col1, col2, t, `${name}-${i}`)
        if (blended) colours.push(blended);
    }

    return {
        name: name,
        type: "Spectrum",
        primary: col1,
        colours: colours,
    }

}