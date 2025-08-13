import { Hex, RGB, HSL, HSV } from "../../types";

//Flow should mean the hex code is all lower case and is already of the correct type having been passed through the parser. But checks included.
export function hexToRGB(input: Hex): RGB {
    if (typeof input !== 'string') {
        throw new Error('Input must be string, something has gone wrong')
    }
    //standardise potential inputs, HexCode with hash support may not be necessary but just in case.
    let hexInput = input
    if (input.trim().startsWith('#')) {
        hexInput = input.replace('#', '');
    }
    //check for expected format.
    if (!/^[0-9a-f]{3}$|^[0-9a-f]{6}$|^[0-9a-f]{8}$/.test(input)) {
        throw new Error('Hex not in the correct or expected format, may need parsed')
    }
    let r: number, g: number, b: number, a: number | undefined;
    //short format - Iris doesn't use but for convenience
    if (hexInput.length === 3) {
        r = parseInt(hexInput[0] + hexInput[0], 16);
        g = parseInt(hexInput[1] + hexInput[1], 16);
        b = parseInt(hexInput[2] + hexInput[2], 16);
    } else if (hexInput.length === 4) {
        r = parseInt(hexInput[0] + hexInput[0], 16);
        g = parseInt(hexInput[1] + hexInput[1], 16);
        b = parseInt(hexInput[2] + hexInput[2], 16);
        a = parseInt(hexInput[3] + hexInput[3], 16) / 255;
    } else if (hexInput.length === 6) {
        r = parseInt(hexInput.slice(0, 2), 16);
        g = parseInt(hexInput.slice(2, 4), 16);
        b = parseInt(hexInput.slice(4, 6), 16);
    } else if (hexInput.length === 8) {
        r = parseInt(hexInput.slice(0, 2), 16);
        g = parseInt(hexInput.slice(2, 4), 16);
        b = parseInt(hexInput.slice(4, 6), 16);
        a = parseInt(hexInput.slice(6, 8), 16) / 255;
    } else {
        throw new Error('Hex of invalid length'); //invalid hex input length, by this point should never be reached or Alpha flag
    }

    const rgb: RGB = a! == undefined ? { r, g, b, a } : { r, g, b};
    return rgb;
}

export function rgbToHSL(input: RGB): HSL {
    const { r, g, b, a } = input;
    const rNorm = r / 255;
    const gNorm = g / 255;
    const bNorm = b / 255;

    const max = Math.max(rNorm, gNorm, bNorm);
    const min = Math.min(rNorm, gNorm, bNorm);
    const delta = max - min;

    let h = 0;
    let s = 0;
    const l = (max + min) / 2

    if (delta !== 0) {
        s = delta / (1 - Math.abs(2 * l - 1));

        switch (max) {
            case rNorm:
                h = 60 * (((gNorm - bNorm) / delta) % 6);
                break;
            case gNorm:
                h = 60 * (((bNorm - rNorm) / delta) + 2);
                break;
            case bNorm:
                h = 60 * (((rNorm - gNorm) / delta) + 4);
                break;
        }
    }

    if (h < 0) h += 360;

    return {
        h: Math.round(h),
        s: Math.round(s * 100),
        l: Math.round(l * 100),
        ...(a !== undefined ? { a } : {})
    };
}

export function rgbToHex({ r, g, b, a }: RGB): Hex {
    const toHex = (val: number): string => {
        const clamped = Math.max(0, Math.min(255, Math.round(val)));
        return clamped.toString(16).padStart(2, '0');
    }

    const rHex = toHex(r);
    const gHex = toHex(g);
    const bHex = toHex(b);

    if (a !== undefined) {
        const alpha = Math.max(0, Math.min(1, a));
        const aHex = toHex(alpha * 255);
        return `${rHex}${gHex}${bHex}${aHex}`;
    }

    return `${rHex}${gHex}${bHex}`;
}

export function rgbToHSV({ r, g, b, a }: RGB): HSV {
    const rNorm = r / 255;
    const gNorm = g / 255;
    const bNorm = b / 255;

    const max = Math.max(rNorm, gNorm, bNorm);
    const min = Math.min(rNorm, gNorm, bNorm);
    const delta = max - min;

    let h = 0;
    let s = 0;
    const v = max;

    if (delta !== 0) {
        s = delta / max;

        switch (max) {
            case rNorm:
                h = 60 * (((gNorm - bNorm) / delta) % 6);
                break;
            case gNorm:
                h = 60 * (((bNorm - rNorm) / delta) + 2);
                break;
            case bNorm:
                h = 60 * (((rNorm - gNorm) / delta) + 4);
                break;
        }

        if (h < 0) h += 360;
    }

    return {
        h: Math.round(h),
        s: Math.round(s * 100),
        v: Math.round(v * 100),
        ...(a !== undefined ? { a } : {})
    };
}

export function hslToRGB({ h, s, l, a}: HSL): RGB {
    s /= 100;
    l /= 100;

    const c = (1 - Math.abs(2 * l - 1)) * s;
    const hPrime = h / 60;
    const x = c * (1 - Math.abs((hPrime % 2) - 1));

    let r = 0, g = 0, b = 0;

    if (0 <= hPrime && hPrime < 1) [r, g, b] = [c, x, 0];
    else if (1 <= hPrime && hPrime < 2) [r, g, b] = [x, c, 0];
    else if (2 <= hPrime && hPrime < 3) [r, g, b] = [0, c, x];
    else if (3 <= hPrime && hPrime < 4) [r, g, b] = [0, x, c];
    else if (4 <= hPrime && hPrime < 5) [r, g, b] = [x, 0, c];
    else if (5 <= hPrime && hPrime < 6) [r, g, b] = [c, 0, x];

    const m = l - c / 2;
    const clamp255 = (v: number) => Math.max(0, Math.min(255, Math.round(v * 255)));

    const rgb: RGB = {
        r: clamp255(r + m),
        g: clamp255(g + m),
        b: clamp255(b + m),
    };

    if (a !== undefined) {
        rgb.a = a;
    }

    return rgb;
}

export function hsvToRGB({ h, s, v, a}: HSV): RGB {
    h = ((h % 360) + 360) % 360;
    s /= 100;
    v /= 100;

    const c = v * s;
    const hPrime = h / 60;
    const x = c * (1 - Math.abs((hPrime % 2) - 1));

    let r = 0, g = 0, b = 0;

    if (0 <= hPrime && hPrime < 1) [r, g, b] = [c, x, 0];
    else if (1 <= hPrime && hPrime < 2) [r, g, b] = [x, c, 0];
    else if (2 <= hPrime && hPrime < 3) [r, g, b] = [0, c, x];
    else if (3 <= hPrime && hPrime < 4) [r, g, b] = [0, x, c];
    else if (4 <= hPrime && hPrime < 5) [r, g, b] = [x, 0, c];
    else if (5 <= hPrime && hPrime < 6) [r, g, b] = [c, 0, x];

    const m = v - c;

    const rgb: RGB = {
        r: Math.round((r + m) * 255),
        g: Math.round((g + m) * 255),
        b: Math.round((b + m) * 255),
    };

    if (a !== undefined) {
        rgb.a = a;
    }

    return rgb;
}