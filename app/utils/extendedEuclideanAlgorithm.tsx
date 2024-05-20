/**
 * Function to find the modular inverse using the Extended Euclidean Algorithm
 * @param a - The number to find the inverse of (e)
 * @param m - The modulus (phi)
 * @returns The modular inverse (d)
 */

const modularInverse = (a: number, m: number): number => {
  let m0 = m;
  let y = 0,
    x = 1;

  if (m === 1) return 0;

  while (a > 1) {
    // q is quotient
    const q = Math.floor(a / m);
    let t = m;

    // m is remainder now, process same as Euclid's algo
    m = a % m;
    a = t;
    t = y;

    // Update x and y
    y = x - q * y;
    x = t;
  }

  // Make x positive
  if (x < 0) x += m0;

  return x;
};
