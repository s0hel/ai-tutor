/** Abstract shape used by the Nonverbal battery and as dot-group visuals in Quantitative. */
export type ShapeKind = "circle" | "square" | "triangle" | "star" | "pentagon" | "hexagon" | "diamond";
export type ShapeColor = "purple" | "teal" | "yellow" | "orange" | "pink" | "green" | "red";
export type ShapeFill = "solid" | "outline" | "striped" | "dotted";
export type ShapeSize = "sm" | "md" | "lg";
export type ShapeRotation = 0 | 45 | 90 | 135 | 180 | 225 | 270 | 315;

export interface ShapeSpec {
  shape: ShapeKind;
  color: ShapeColor;
  fill: ShapeFill;
  size: ShapeSize;
  rotation: ShapeRotation;
  /** For dot-group number visuals: repeat this shape N times instead of rendering one. */
  count?: number;
}

/** Real-world concept used by the Verbal battery (vocabulary/category knowledge, not shapes). References conceptBank.ts by id. */
export interface ConceptSpec {
  conceptId: string;
}

export type ChoiceRender =
  | { kind: "shape"; shape: ShapeSpec }
  | { kind: "concept"; concept: ConceptSpec }
  | { kind: "number"; value: number }
  /** Plain written text — used by subjects (e.g. reading) whose answer options are words/sentences rather than pictures. */
  | { kind: "text"; value: string };

export interface ChoiceOption {
  id: string;
  render: ChoiceRender;
}

/** What's shown as the question. `none` is for read-aloud-only items (Sentence Completion) with no picture prompt. */
export type VisualSpec =
  | { kind: "none" }
  | { kind: "matrix2x2"; cells: [ChoiceRender, ChoiceRender, ChoiceRender, null] }
  | { kind: "row3"; items: [ChoiceRender, ChoiceRender, ChoiceRender] }
  | { kind: "analogy"; a: ChoiceRender; b: ChoiceRender; c: ChoiceRender }
  | { kind: "sequence"; items: (ChoiceRender | null)[] }
  | { kind: "balance"; left: (ChoiceRender | null)[]; right: (ChoiceRender | null)[] };

/** Shared shape of `GeneratedProblem.problemData` for every gifted-subject generator. Index signature keeps it assignable to/from the generic `Record<string, unknown>` problemData field. */
export interface GTProblemData {
  prompt: VisualSpec;
  options: ChoiceOption[];
  /** Short natural-language question for the LLM to phrase and for spokenText — the LLM never invents this, only rewords it. */
  instruction: string;
  [key: string]: unknown;
}
