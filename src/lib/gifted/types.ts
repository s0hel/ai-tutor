import type { ConceptBrief } from "../types";

export type { ConceptBrief };

export type Battery = "verbal" | "quantitative" | "nonverbal";

export interface GTSkill {
  slug: string;
  subject: "gifted";
  battery: Battery;
  title: string;
  order: number;
  /** Short "here's how this puzzle type works" strategy tip — COGAT items don't have a taught concept the way math does. */
  conceptBrief: ConceptBrief;
  generatorId: string;
}
