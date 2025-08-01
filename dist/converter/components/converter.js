//Flow should mean the hex code is all lower case and is already of the correct type having been passed through the parser. But checks included.
export function hexToRGB(input) {
    if (typeof input !== 'string') {
        throw new Error('Input must be string, something has gone wrong');
    }
    //standardise potential inputs, HexCode with hash support may not be necessary but just in case.
    let hexInput = input;
    if (input.trim().startsWith('#')) {
        hexInput = input.replace('#', '');
    }
    //check for expected format.
    if (!/^[0-9a-f]{3}$|^[0-9a-f]{6}$|^[0-9a-f]{8}$/.test(input)) {
        throw new Error('Hex not in the correct or expected format, may need parsed');
    }
    let r, g, b, a;
    //short format - Iris doesn't use but for convenience
    if (hexInput.length === 3) {
        r = parseInt(hexInput[0] + hexInput[0], 16);
        g = parseInt(hexInput[1] + hexInput[1], 16);
        b = parseInt(hexInput[2] + hexInput[2], 16);
    }
    else if (hexInput.length === 4) {
        r = parseInt(hexInput[0] + hexInput[0], 16);
        g = parseInt(hexInput[1] + hexInput[1], 16);
        b = parseInt(hexInput[2] + hexInput[2], 16);
        a = parseInt(hexInput[3] + hexInput[3], 16) / 255;
    }
    else if (hexInput.length === 6) {
        r = parseInt(hexInput.slice(0, 2), 16);
        g = parseInt(hexInput.slice(2, 4), 16);
        b = parseInt(hexInput.slice(4, 6), 16);
    }
    else if (hexInput.length === 8) {
        r = parseInt(hexInput.slice(0, 2), 16);
        g = parseInt(hexInput.slice(2, 4), 16);
        b = parseInt(hexInput.slice(4, 6), 16);
        a = parseInt(hexInput.slice(6, 8), 16) / 255;
    }
    else {
        return null; //invalid hex input length, by this point should never be reached or Alpha flag
    }
    const rgb = a == undefined ? { r, g, b, a } : { r, g, b };
    return rgb;
}
export function rgbToHSL(input) {
    const { r, g, b, a } = input;
    const rNorm = r / 255;
    const gNorm = r / 255;
    const bNorm = b / 255;
    const max = Math.max(rNorm, gNorm, bNorm);
    const min = Math.min(rNorm, gNorm, bNorm);
    const delta = max - min;
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;
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
    if (h < 0)
        h += 360;
    return {
        h: Math.round(h),
        s: Math.round(s * 100),
        l: Math.round(l * 100),
        ...(a !== undefined ? { a } : {})
    };
}
export function rgbToHex({ r, g, b, a }) {
    const toHex = (val) => {
        const clamped = Math.max(0, Math.min(255, Math.round(val)));
        return clamped.toString(16).padStart(2, '0');
    };
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
export function rgbToHsv({ r, g, b, a }) {
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
        if (h < 0)
            h += 360;
    }
    return {
        h: Math.round(h),
        s: Math.round(s * 100),
        v: Math.round(v * 100),
        ...(a !== undefined ? { a } : {})
    };
}
