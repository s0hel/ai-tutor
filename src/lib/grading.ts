import { fractionsEqual, isReduced, reduceFraction, type FractionValue } from "./fractionMath";
import type { CanonicalAnswer } from "./problemGenerators/types";

function parseFraction(raw: string): FractionValue | null {
  const trimmed = raw.trim();

  const mixed = trimmed.match(/^(-?\d+)\s+(\d+)\s*\/\s*(\d+)$/);
  if (mixed) {
    const whole = Number(mixed[1]);
    const n = Number(mixed[2]);
    const d = Number(mixed[3]);
    if (d === 0) return null;
    const sign = whole < 0 ? -1 : 1;
    return { numerator: whole * d + sign * n, denominator: d };
  }

  const simple = trimmed.match(/^(-?\d+)\s*\/\s*(\d+)$/);
  if (simple) {
    const n = Number(simple[1]);
    const d = Number(simple[2]);
    if (d === 0) return null;
    return { numerator: n, denominator: d };
  }

  return null;
}

function normalizeText(raw: string): string {
  return raw.trim().toLowerCase().replace(/\s+/g, " ").replace(/[.!?]+$/, "");
}

export function gradeAnswer(raw: string, expected: CanonicalAnswer): { correct: boolean } {
  switch (expected.type) {
    case "integer": {
      const cleaned = raw.trim().replace(/,/g, "").replace(/^\+/, "");
      if (!/^-?\d+$/.test(cleaned)) return { correct: false };
      return { correct: Number(cleaned) === expected.value };
    }
    case "decimal": {
      let cleaned = raw.trim().replace(/,/g, "");
      if (cleaned.startsWith(".")) cleaned = `0${cleaned}`;
      if (cleaned.startsWith("-.")) cleaned = `-0${cleaned.slice(1)}`;
      if (!/^-?\d+(\.\d+)?$/.test(cleaned)) return { correct: false };
      return { correct: Math.abs(Number(cleaned) - expected.value) < 1e-9 };
    }
    case "fraction": {
      const submitted = parseFraction(raw);
      if (!submitted) return { correct: false };
      if (expected.requireSimplified) {
        return {
          correct: isReduced(submitted) && fractionsEqual(submitted, reduceFraction(expected.value)),
        };
      }
      return { correct: fractionsEqual(submitted, expected.value) };
    }
    case "text": {
      const normalized = normalizeText(raw);
      const candidates = [expected.value, ...(expected.acceptedAliases ?? [])].map((s) =>
        normalizeText(s)
      );
      return { correct: candidates.includes(normalized) };
    }
  }
}
