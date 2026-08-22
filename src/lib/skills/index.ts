import type { Skill, Strand } from "./types";
import { MULTIPLICATION_SKILLS } from "./multiplication";
import { DIVISION_SKILLS } from "./division";
import { FRACTION_SKILLS } from "./fractions";
import { DECIMAL_SKILLS } from "./decimals";
import { MEASUREMENT_GEOMETRY_SKILLS } from "./measurementGeometry";

export type { Skill, Strand, ConceptBrief } from "./types";

export const STRAND_META: Record<Strand, { label: string; emoji: string; order: number }> = {
  multiplication: { label: "Multiplication", emoji: "✖️", order: 1 },
  division: { label: "Division", emoji: "➗", order: 2 },
  fractions: { label: "Fractions", emoji: "🍕", order: 3 },
  decimals: { label: "Decimals", emoji: "🔟", order: 4 },
  "measurement-geometry": { label: "Measurement & Geometry", emoji: "📐", order: 5 },
};

export const SKILLS: Skill[] = [
  ...MULTIPLICATION_SKILLS,
  ...DIVISION_SKILLS,
  ...FRACTION_SKILLS,
  ...DECIMAL_SKILLS,
  ...MEASUREMENT_GEOMETRY_SKILLS,
];

export function getSkill(slug: string): Skill | undefined {
  return SKILLS.find((s) => s.slug === slug);
}

export function listByStrand(): { strand: Strand; skills: Skill[] }[] {
  const strands = Object.keys(STRAND_META) as Strand[];
  return strands
    .sort((a, b) => STRAND_META[a].order - STRAND_META[b].order)
    .map((strand) => ({
      strand,
      skills: SKILLS.filter((s) => s.strand === strand).sort((a, b) => a.order - b.order),
    }));
}
