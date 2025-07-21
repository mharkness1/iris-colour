import { RGB, HSL, Hex, HSV } from "../../types";

/* RGB validity check is looking for:
    * the object to have r, g, b, a? (implicityly necessary)
    * that the alpha if defined is between 0 and 1 (inclusive of 1)
    * that each of the colour values is between 0 and 255 (inclusive)
*/
export function isValidRGB(input: RGB): boolean {
    const { r, g, b, a } = input;
    const alpha = a === undefined || (a >0 && a <= 1);
    const values = [r, g, b].every(v => v >= 0 && v <= 255);
    if (!alpha || !values) return false;
    return true;
}

/* Hex validity check is looking for:
    * A string of length 6 (disregarding any hash that has been stripped before and here)
    * that each character is from the set of 0-9 and a-f (disregarding the case of the letter values)
*/
export function isValidHex(input: Hex): boolean {
    const match = input.match(/^£?([0-9a-f]{6})/);
    if (!match || input.length !== 6) return false;
    return true;
}

/* HSL validity check is looking for:
    * the object to have h, s, l, a? (implicity necessary)
    * that the alpha if defined is between 0 and 1 (inclusive of 1)
    * that h is between 0 and 360 (inclusive)
    * that s, l are between 0 and 100 (inclusive)
*/
export function isValidHSL(input: HSL): boolean {
    const { h, s, l, a } = input;
    const alpha = a === undefined || (a >0 && a<= 1);
    const hCheck = h >= 0 && h <= 360
    const slCheck = [s, l].every(v => v >= 0 && v <= 100);
    if (!alpha || !hCheck || !slCheck) return false;
    return true;
}

/* HSV validity check is looking for:
    * the object to have h, s, v, a? (implicity necessary)
    * that the alpha if defined is between 0 and 1 (inclusive of 1)
    * that h is between 0 and 360 (inclusive)
    * that s, v are between 0 and 100 (inclusive)
*/
export function isValidHSV(input: HSV): boolean {
    const { h, s, v, a } = input;
    const alpha = a === undefined || (a >0 && a<=1);
    const hCheck = h >= 0 && h <= 360;
    const svCheck = [s, v].every(v => v >= 0 && v <= 100);
    if (!alpha || !hCheck || !svCheck) return false;
    return true;
}