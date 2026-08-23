import type { ChoiceOption, ChoiceRender } from "../gifted/visualTypes";

export function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function choice<T>(arr: readonly T[]): T {
  return arr[randInt(0, arr.length - 1)];
}

export function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = randInt(0, i);
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/** Picks `n` distinct random items from `arr` using `key` to dedupe, excluding anything matching `exclude`. */
export function sampleDistinct<T>(arr: T[], n: number, key: (t: T) => string, exclude: string[] = []): T[] {
  const seen = new Set(exclude);
  const pool = shuffle(arr);
  const picked: T[] = [];
  for (const item of pool) {
    const k = key(item);
    if (seen.has(k)) continue;
    seen.add(k);
    picked.push(item);
    if (picked.length === n) break;
  }
  return picked;
}

const OPTION_IDS = ["A", "B", "C", "D"];

/** Shuffles the correct render in among distractors and assigns stable A/B/C/D ids. Returns the options plus the correct id. */
export function makeOptions(
  correct: ChoiceRender,
  distractors: ChoiceRender[]
): { options: ChoiceOption[]; correctId: string } {
  const renders = shuffle([correct, ...distractors]);
  const options: ChoiceOption[] = renders.map((render, i) => ({ id: OPTION_IDS[i], render }));
  const correctId = options[renders.indexOf(correct)].id;
  return { options, correctId };
}
