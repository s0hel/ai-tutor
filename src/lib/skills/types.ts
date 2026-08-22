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
  /** YouTube video ID for an optional Khan Academy intro video shown during the teach phase. */
  videoId?: string;
  /** Title of the linked video, for attribution/accessibility. */
  videoTitle?: string;
}
