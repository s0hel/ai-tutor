import type { ConceptBrief } from "../types";

export type { ConceptBrief };

export type GradeBand = "grade1" | "grade2" | "grade3" | "grade4-5";

export type ReadingStrand =
  // grade4-5
  | "vocabulary"
  | "comprehension"
  | "inference-analysis"
  | "authors-craft"
  | "fact-opinion-genre"
  // grade1
  | "phonics-sight-words"
  | "vocabulary-1"
  | "comprehension-1"
  | "story-elements-1"
  // grade2
  | "vocabulary-2"
  | "comprehension-2"
  | "story-elements-2"
  | "fact-opinion-2"
  // grade3
  | "vocabulary-3"
  | "comprehension-3"
  | "inference-3"
  | "authors-craft-3"
  | "fact-opinion-genre-3";

export interface ReadingSkill {
  slug: string;
  subject: "reading";
  gradeBand: GradeBand;
  strand: ReadingStrand;
  title: string;
  order: number;
  conceptBrief: ConceptBrief;
  generatorId: string;
  /** YouTube video ID for an optional free intro video (Khan Academy or similar) shown during the teach phase. */
  videoId?: string;
  /** Title of the linked video, for attribution/accessibility. */
  videoTitle?: string;
  /** Name of the channel/publisher, for attribution. Defaults to "Khan Academy" when a videoId is set but this is omitted. */
  videoSource?: string;
  /** Channel URL for the source attribution link. Defaults to khanacademy.org when videoSource is omitted. */
  videoSourceUrl?: string;
}
