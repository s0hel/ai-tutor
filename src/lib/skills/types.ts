import type { ConceptBrief } from "../types";

export type { ConceptBrief };

export type GradeBand = "grade1" | "grade2" | "grade3" | "grade4-5";

export type Strand =
  // grade4-5
  | "multiplication"
  | "division"
  | "fractions"
  | "decimals"
  | "measurement-geometry"
  // grade1
  | "counting-number-sense"
  | "addition-subtraction"
  | "place-value"
  | "shapes-geometry"
  | "measurement-data"
  // grade2
  | "addition-subtraction-2"
  | "place-value-2"
  | "measurement-data-2"
  | "geometry-2"
  | "early-multiplication-2"
  // grade3
  | "multiplication-3"
  | "division-3"
  | "fractions-3"
  | "measurement-3"
  | "data-geometry-3";

export interface Skill {
  slug: string;
  subject: "math";
  gradeBand: GradeBand;
  strand: Strand;
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
