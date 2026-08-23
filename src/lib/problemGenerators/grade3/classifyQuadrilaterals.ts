import type { ProblemGenerator } from "../types";
import { choice } from "../helpers";

const QUADRILATERALS = [
  { name: "square", description: "4 equal sides and 4 right angles" },
  { name: "rectangle", description: "4 right angles, but the sides don't all have to be equal" },
  { name: "rhombus", description: "4 equal sides, but the angles don't have to be right angles" },
  { name: "trapezoid", description: "exactly one pair of parallel sides" },
] as const;

export const classifyQuadrilaterals: ProblemGenerator = {
  skillSlug: "g3-classify-quadrilaterals",
  generate() {
    const quad = choice(QUADRILATERALS);

    return {
      problemData: { instruction: `What is the name of a 4-sided shape with ${quad.description}?` },
      answerType: "text",
      correctAnswer: { type: "text", value: quad.name },
      hintLadder: [
        `Think about a 4-sided shape with ${quad.description}.`,
        `A shape with ${quad.description} is called a "${quad.name}."`,
      ],
      explanation: `A shape with ${quad.description} is a ${quad.name}.`,
    };
  },
};
