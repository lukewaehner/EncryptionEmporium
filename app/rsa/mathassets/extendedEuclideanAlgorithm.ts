export const extendedEuclideanAlgorithm = (a: number, b: number) => {
  let x0 = 1,
    x1 = 0,
    y0 = 0,
    y1 = 1;
  while (b !== 0) {
    let q = Math.floor(a / b);
    [a, b] = [b, a % b];
    [x0, x1] = [x1, x0 - q * x1];
    [y0, y1] = [y1, y0 - q * y1];
  }
  return { gcd: a, x: x0, y: y0 };
};

// Function to find the modular inverse using the Extended Euclidean Algorithm
export const modularInverse = (e: number, phi: number): number => {
  const { x, gcd } = extendedEuclideanAlgorithm(e, phi);
  if (gcd !== 1) {
    throw new Error("Inverse does not exist");
  }
  return ((x % phi) + phi) % phi; // Ensure the result is positive
};
