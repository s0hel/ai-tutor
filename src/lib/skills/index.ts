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
import { ADDITION_SUBTRACTION_2_SKILLS } from "./grade2/additionSubtraction2";
import { PLACE_VALUE_2_SKILLS } from "./grade2/placeValue2";
import { MEASUREMENT_DATA_2_SKILLS } from "./grade2/measurementData2";
import { GEOMETRY_2_SKILLS } from "./grade2/geometry2";
import { EARLY_MULTIPLICATION_2_SKILLS } from "./grade2/earlyMultiplication2";
import { MULTIPLICATION_3_SKILLS } from "./grade3/multiplication3";
import { DIVISION_3_SKILLS } from "./grade3/division3";
import { FRACTIONS_3_SKILLS } from "./grade3/fractions3";
import { MEASUREMENT_3_SKILLS } from "./grade3/measurement3";
import { DATA_GEOMETRY_3_SKILLS } from "./grade3/dataGeometry3";

export type { Skill, Strand, GradeBand, ConceptBrief } from "./types";

export const GRADE_BAND_META: Record<GradeBand, { label: string; order: number }> = {
  grade1: { label: "Grade 1", order: 1 },
  grade2: { label: "Grade 2", order: 2 },
  grade3: { label: "Grade 3", order: 3 },
  "grade4-5": { label: "Grade 4-5", order: 4 },
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
  // grade2
  "addition-subtraction-2": { label: "Addition & Subtraction", emoji: "➕", order: 1 },
  "place-value-2": { label: "Place Value", emoji: "🧮", order: 2 },
  "measurement-data-2": { label: "Measurement & Data", emoji: "📏", order: 3 },
  "geometry-2": { label: "Geometry", emoji: "🔺", order: 4 },
  "early-multiplication-2": { label: "Multiplication Foundations", emoji: "🔁", order: 5 },
  // grade3
  "multiplication-3": { label: "Multiplication", emoji: "✖️", order: 1 },
  "division-3": { label: "Division", emoji: "➗", order: 2 },
  "fractions-3": { label: "Fractions", emoji: "🍕", order: 3 },
  "measurement-3": { label: "Measurement", emoji: "📏", order: 4 },
  "data-geometry-3": { label: "Data & Geometry", emoji: "📊", order: 5 },
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
  ...ADDITION_SUBTRACTION_2_SKILLS,
  ...PLACE_VALUE_2_SKILLS,
  ...MEASUREMENT_DATA_2_SKILLS,
  ...GEOMETRY_2_SKILLS,
  ...EARLY_MULTIPLICATION_2_SKILLS,
  ...MULTIPLICATION_3_SKILLS,
  ...DIVISION_3_SKILLS,
  ...FRACTIONS_3_SKILLS,
  ...MEASUREMENT_3_SKILLS,
  ...DATA_GEOMETRY_3_SKILLS,
];

export function getSkill(slug: string): Skill | undefined {
  return SKILLS.find((s) => s.slug === slug);
}

export function defaultGradeBandForAge(age: number): GradeBand {
  if (age <= 6) return "grade1";
  if (age === 7) return "grade2";
  if (age === 8) return "grade3";
  return "grade4-5";
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
