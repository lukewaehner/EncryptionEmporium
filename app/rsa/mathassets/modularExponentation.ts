export const modularExponentation = (
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
