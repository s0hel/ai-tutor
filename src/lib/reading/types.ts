import type { ConceptBrief } from "../types";

export type { ConceptBrief };

export type ReadingStrand = "vocabulary" | "comprehension" | "inference-analysis" | "authors-craft" | "fact-opinion-genre";

export interface ReadingSkill {
  slug: string;
  subject: "reading";
  strand: ReadingStrand;
  title: string;
  order: number;
  conceptBrief: ConceptBrief;
  generatorId: string;
}
