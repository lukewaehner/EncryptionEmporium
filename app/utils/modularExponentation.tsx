/**
 * Perform modular exponentiation: (base^exponent) % modulus
 * This function computes (base^exponent) % modulus efficiently using exponentiation by squaring.
 *
 * @param base - The base number (c in m = c^d mod n)
 * @param exponent - The exponent (d in m = c^d mod n)
 * @param modulus - The modulus (n in m = c^d mod n)
 * @returns The result of (base^exponent) % modulus
 */

const modularExponentiation = (
  base: number,
  exponent: number,
  modulus: number
): number => {
  if (modulus === 1) return 0;

  let result = 1;
  let b = base % modulus;

  while (exponent > 0) {
    if (exponent % 2 === 1) {
      result = (result * b) % modulus;
    }
    exponent = Math.floor(exponent / 2);
    b = (b * b) % modulus;
  }

  return result;
};
