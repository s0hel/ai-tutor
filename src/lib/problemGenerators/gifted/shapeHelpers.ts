import { choice } from "../helpers";
import type {
  ChoiceRender,
  ShapeColor,
  ShapeFill,
  ShapeKind,
  ShapeRotation,
  ShapeSize,
  ShapeSpec,
} from "../../gifted/visualTypes";

// Re-exported for existing gifted generators that import these from here — the functions
// themselves are subject-neutral and now live in the shared helpers module.
export { shuffle, sampleDistinct, makeOptions } from "../helpers";

export const SHAPE_KINDS: ShapeKind[] = ["circle", "square", "triangle", "star", "pentagon", "hexagon", "diamond"];
export const SHAPE_COLORS: ShapeColor[] = ["purple", "teal", "yellow", "orange", "pink", "green", "red"];
export const SHAPE_FILLS: ShapeFill[] = ["solid", "outline", "striped", "dotted"];
export const SHAPE_SIZES: ShapeSize[] = ["sm", "md", "lg"];
export const SHAPE_ROTATIONS: ShapeRotation[] = [0, 45, 90, 135, 180, 225, 270, 315];

export function randomShape(overrides: Partial<ShapeSpec> = {}): ShapeSpec {
  return {
    shape: choice(SHAPE_KINDS),
    color: choice(SHAPE_COLORS),
    fill: choice(SHAPE_FILLS),
    size: "md",
    rotation: 0,
    ...overrides,
  };
}

export function shapesEqual(a: ShapeSpec, b: ShapeSpec): boolean {
  return (
    a.shape === b.shape &&
    a.color === b.color &&
    a.fill === b.fill &&
    a.size === b.size &&
    a.rotation === b.rotation &&
    a.count === b.count
  );
}

export function describeShape(spec: ShapeSpec): string {
  const parts = [spec.fill !== "solid" ? spec.fill : "", spec.color, spec.shape].filter(Boolean);
  return `the ${parts.join(" ")}`;
}

export function shapeRender(spec: ShapeSpec): ChoiceRender {
  return { kind: "shape", shape: spec };
}

export function conceptRender(conceptId: string): ChoiceRender {
  return { kind: "concept", concept: { conceptId } };
}

export function numberRender(value: number): ChoiceRender {
  return { kind: "number", value };
}

/** Generates `count` distinct-ish distractor shapes that differ from `base` in at least one attribute. */
export function distractorShapes(base: ShapeSpec, count: number): ShapeSpec[] {
  const out: ShapeSpec[] = [];
  let guard = 0;
  while (out.length < count && guard < 200) {
    guard++;
    const candidate = randomShape({ size: base.size });
    if (shapesEqual(candidate, base)) continue;
    if (out.some((s) => shapesEqual(s, candidate))) continue;
    out.push(candidate);
  }
  return out;
}
