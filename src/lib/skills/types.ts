export type Strand = "multiplication" | "division" | "fractions" | "decimals" | "measurement-geometry";

export interface ConceptBrief {
  summary: string;
  workedExamples: string[];
  commonMisconceptions: string[];
}

export interface Skill {
  slug: string;
  subject: "math";
  strand: Strand;
  title: string;
  order: number;
  conceptBrief: ConceptBrief;
  generatorId: string;
}
