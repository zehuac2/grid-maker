/**
 * See https://michalzalecki.com/nominal-typing-in-typescript/ for
 */
export type Unit<Name extends string, T> = T & { __unit: Name };

/**
 * A css pixel unit (1/96 of an inch)
 */
export type Pixel = Unit<'Pixel', number>;

/**
 * A css inch
 */
export type Inch = Unit<'Inch', number>;

export function inchToPixel(inch: Inch): Pixel {
  if (isNaN(inch)) {
    return 0 as Pixel;
  }

  return Math.floor(inch * 96) as Pixel;
}

export function isValidPixel(inch: Inch): boolean {
  return !isNaN(inch) && inchToPixel(inch) !== 0;
}
