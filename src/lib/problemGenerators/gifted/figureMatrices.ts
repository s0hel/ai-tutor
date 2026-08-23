import type { ProblemGenerator } from "../types";
import type { GTProblemData } from "../../gifted/visualTypes";
import type { ShapeRotation, ShapeSpec } from "../../gifted/visualTypes";
import { randInt } from "../helpers";
import {
  SHAPE_COLORS,
  SHAPE_FILLS,
  SHAPE_KINDS,
  SHAPE_SIZES,
  describeShape,
  makeOptions,
  randomShape,
  sampleDistinct,
  shapeRender,
  shapesEqual,
} from "./shapeHelpers";

type Attr = "rotation" | "fill" | "color" | "size" | "shape";
const ALL_ATTRS: Attr[] = ["rotation", "fill", "color", "size", "shape"];

function cyclicShift<T>(arr: readonly T[], current: T, k: number): T {
  const i = arr.indexOf(current);
  return arr[(i + k + arr.length) % arr.length];
}

interface Transform {
  attrs: Attr[];
  rotationDelta: number;
  fillShift: number;
  colorShift: number;
  sizeShift: number;
  shapeShift: number;
}

function randomTransform(numAttrs: number): Transform {
  const attrs = sampleDistinct(ALL_ATTRS, numAttrs, (a) => a);
  return {
    attrs,
    rotationDelta: [45, 90, 135, 180][randInt(0, 3)],
    fillShift: randInt(1, SHAPE_FILLS.length - 1),
    colorShift: randInt(1, SHAPE_COLORS.length - 1),
    sizeShift: randInt(1, SHAPE_SIZES.length - 1),
    shapeShift: randInt(1, SHAPE_KINDS.length - 1),
  };
}

function applyTransform(shape: ShapeSpec, t: Transform, only: Attr[] = t.attrs): ShapeSpec {
  const next = { ...shape };
  if (only.includes("rotation")) next.rotation = ((shape.rotation + t.rotationDelta) % 360) as ShapeRotation;
  if (only.includes("fill")) next.fill = cyclicShift(SHAPE_FILLS, shape.fill, t.fillShift);
  if (only.includes("color")) next.color = cyclicShift(SHAPE_COLORS, shape.color, t.colorShift);
  if (only.includes("size")) next.size = cyclicShift(SHAPE_SIZES, shape.size, t.sizeShift);
  if (only.includes("shape")) next.shape = cyclicShift(SHAPE_KINDS, shape.shape, t.shapeShift);
  return next;
}

export const figureMatrices: ProblemGenerator = {
  skillSlug: "gt-figure-matrices",
  generate(level) {
    const numAttrs = level < 4 ? 1 : level < 8 ? 2 : 3;
    const transform = randomTransform(numAttrs);
    const topLeft = randomShape();
    const topRight = applyTransform(topLeft, transform);

    let bottomLeft = randomShape();
    for (let guard = 0; shapesEqual(bottomLeft, topLeft) && guard < 10; guard++) bottomLeft = randomShape();
    const correct = applyTransform(bottomLeft, transform);

    const candidates: ShapeSpec[] = [];
    for (let i = 0; i < transform.attrs.length; i++) {
      const subset = transform.attrs.filter((_, idx) => idx !== i);
      candidates.push(applyTransform(bottomLeft, transform, subset));
    }
    candidates.push(applyTransform(bottomLeft, randomTransform(transform.attrs.length)));
    candidates.push(randomShape(), randomShape(), randomShape());

    const distractors = sampleDistinct(candidates, 3, (s) => JSON.stringify(s), [JSON.stringify(correct)]);
    while (distractors.length < 3) {
      const extra = randomShape();
      if (!shapesEqual(extra, correct) && !distractors.some((d) => shapesEqual(d, extra))) distractors.push(extra);
    }

    const { options, correctId } = makeOptions(shapeRender(correct), distractors.map(shapeRender));
    const attrLabel = transform.attrs.map((a) => (a === "rotation" ? "turn" : a)).join(" and ");

    const problemData: GTProblemData = {
      prompt: { kind: "matrix2x2", cells: [shapeRender(topLeft), shapeRender(topRight), shapeRender(bottomLeft), null] },
      options,
      instruction: "Which shape completes the pattern in the bottom-right box?",
    };

    return {
      problemData,
      answerType: "choice",
      correctAnswer: { type: "choice", value: correctId },
      hintLadder: [
        "Look at how the top-left shape changes into the top-right shape.",
        `The same change happens to the bottom-left shape — it becomes ${describeShape(correct)} shape.`,
      ],
      explanation: `The top-left shape becomes the top-right shape by changing its ${attrLabel}. The same change turns the bottom-left shape into ${describeShape(correct)} shape.`,
    };
  },
};
