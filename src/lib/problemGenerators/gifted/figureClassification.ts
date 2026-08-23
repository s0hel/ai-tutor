import type { ProblemGenerator } from "../types";
import type { GTProblemData, ShapeSpec } from "../../gifted/visualTypes";
import { choice } from "../helpers";
import { SHAPE_COLORS, SHAPE_FILLS, SHAPE_KINDS, SHAPE_ROTATIONS, makeOptions, randomShape, shapeRender, shapesEqual } from "./shapeHelpers";

type Attr = "shape" | "color" | "fill" | "rotation";

function attrLabel(attr: Attr): string {
  return attr === "rotation" ? "turn" : attr;
}

function withAttr(s: ShapeSpec, attr: Attr, value: ShapeSpec[Attr]): ShapeSpec {
  return { ...s, [attr]: value } as ShapeSpec;
}

export const figureClassification: ProblemGenerator = {
  skillSlug: "gt-figure-classification",
  generate(level) {
    const attrPool: Attr[] = level < 4 ? ["shape", "color"] : ["shape", "color", "fill", "rotation"];
    const attr = choice(attrPool);
    const valuePool = attr === "shape" ? SHAPE_KINDS : attr === "color" ? SHAPE_COLORS : attr === "fill" ? SHAPE_FILLS : SHAPE_ROTATIONS;
    const sharedValue = choice(valuePool as readonly ShapeSpec[Attr][]);

    const makeMatching = () => withAttr(randomShape(), attr, sharedValue);
    const row: ShapeSpec[] = [makeMatching(), makeMatching(), makeMatching()];
    const correct = makeMatching();

    const distractors: ShapeSpec[] = [];
    let guard = 0;
    while (distractors.length < 3 && guard < 200) {
      guard++;
      const candidate = randomShape();
      if (candidate[attr] === sharedValue) continue;
      if (distractors.some((d) => shapesEqual(d, candidate))) continue;
      distractors.push(candidate);
    }

    const { options, correctId } = makeOptions(shapeRender(correct), distractors.map(shapeRender));

    const problemData: GTProblemData = {
      prompt: { kind: "row3", items: [shapeRender(row[0]), shapeRender(row[1]), shapeRender(row[2])] },
      options,
      instruction: "These three shapes belong together. Which picture belongs with them?",
    };

    return {
      problemData,
      answerType: "choice",
      correctAnswer: { type: "choice", value: correctId },
      hintLadder: [
        "Look closely at what's the same about all three shapes in the row.",
        `They all have the same ${attrLabel(attr)} — pick the shape with a matching ${attrLabel(attr)}.`,
      ],
      explanation: `All three shapes share the same ${attrLabel(attr)}, so the answer is the other shape with that same ${attrLabel(attr)}.`,
    };
  },
};
