export function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function choice<T>(arr: readonly T[]): T {
  return arr[randInt(0, arr.length - 1)];
}
