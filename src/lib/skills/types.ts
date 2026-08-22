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
  /** YouTube video ID for an optional free intro video (Khan Academy or similar) shown during the teach phase. */
  videoId?: string;
  /** Title of the linked video, for attribution/accessibility. */
  videoTitle?: string;
  /** Name of the channel/publisher, for attribution. Defaults to "Khan Academy" when a videoId is set but this is omitted. */
  videoSource?: string;
  /** Channel URL for the source attribution link. Defaults to khanacademy.org when videoSource is omitted. */
  videoSourceUrl?: string;
}
