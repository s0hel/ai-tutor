export interface FractionValue {
  numerator: number;
  denominator: number;
}

export function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return a || 1;
}

export function reduceFraction(f: FractionValue): FractionValue {
  const divisor = gcd(f.numerator, f.denominator);
  const sign = f.denominator < 0 ? -1 : 1;
  return { numerator: (f.numerator / divisor) * sign, denominator: Math.abs(f.denominator / divisor) };
}

export function fractionsEqual(a: FractionValue, b: FractionValue): boolean {
  return a.numerator * b.denominator === b.numerator * a.denominator;
}

export function isReduced(f: FractionValue): boolean {
  return gcd(f.numerator, f.denominator) === 1;
}
