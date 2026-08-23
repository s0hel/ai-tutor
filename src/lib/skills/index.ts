import type { GradeBand, Skill, Strand } from "./types";
import { MULTIPLICATION_SKILLS } from "./multiplication";
import { DIVISION_SKILLS } from "./division";
import { FRACTION_SKILLS } from "./fractions";
import { DECIMAL_SKILLS } from "./decimals";
import { MEASUREMENT_GEOMETRY_SKILLS } from "./measurementGeometry";
import { COUNTING_NUMBER_SENSE_SKILLS } from "./grade1/countingNumberSense";
import { ADDITION_SUBTRACTION_SKILLS } from "./grade1/additionSubtraction";
import { PLACE_VALUE_SKILLS } from "./grade1/placeValue";
import { SHAPES_GEOMETRY_SKILLS } from "./grade1/shapesGeometry";
import { MEASUREMENT_DATA_SKILLS } from "./grade1/measurementData";

export type { Skill, Strand, GradeBand, ConceptBrief } from "./types";

export const GRADE_BAND_META: Record<GradeBand, { label: string; order: number }> = {
  grade1: { label: "Grade 1", order: 1 },
  "grade4-5": { label: "Grade 4-5", order: 2 },
};

export const STRAND_META: Record<Strand, { label: string; emoji: string; order: number }> = {
  // grade4-5
  multiplication: { label: "Multiplication", emoji: "✖️", order: 1 },
  division: { label: "Division", emoji: "➗", order: 2 },
  fractions: { label: "Fractions", emoji: "🍕", order: 3 },
  decimals: { label: "Decimals", emoji: "🔟", order: 4 },
  "measurement-geometry": { label: "Measurement & Geometry", emoji: "📐", order: 5 },
  // grade1
  "counting-number-sense": { label: "Counting & Number Sense", emoji: "🔢", order: 1 },
  "addition-subtraction": { label: "Addition & Subtraction", emoji: "➕", order: 2 },
  "place-value": { label: "Place Value", emoji: "🧮", order: 3 },
  "shapes-geometry": { label: "Shapes & Geometry", emoji: "🔺", order: 4 },
  "measurement-data": { label: "Measurement & Data", emoji: "📏", order: 5 },
};

export const SKILLS: Skill[] = [
  ...MULTIPLICATION_SKILLS,
  ...DIVISION_SKILLS,
  ...FRACTION_SKILLS,
  ...DECIMAL_SKILLS,
  ...MEASUREMENT_GEOMETRY_SKILLS,
  ...COUNTING_NUMBER_SENSE_SKILLS,
  ...ADDITION_SUBTRACTION_SKILLS,
  ...PLACE_VALUE_SKILLS,
  ...SHAPES_GEOMETRY_SKILLS,
  ...MEASUREMENT_DATA_SKILLS,
];

export function getSkill(slug: string): Skill | undefined {
  return SKILLS.find((s) => s.slug === slug);
}

export function defaultGradeBandForAge(age: number): GradeBand {
  return age <= 7 ? "grade1" : "grade4-5";
}

export function listByStrand(gradeBand: GradeBand): { strand: Strand; skills: Skill[] }[] {
  const skillsInBand = SKILLS.filter((s) => s.gradeBand === gradeBand);
  const strands = Array.from(new Set(skillsInBand.map((s) => s.strand)));
  return strands
    .sort((a, b) => STRAND_META[a].order - STRAND_META[b].order)
    .map((strand) => ({
      strand,
      skills: skillsInBand.filter((s) => s.strand === strand).sort((a, b) => a.order - b.order),
    }));
}
