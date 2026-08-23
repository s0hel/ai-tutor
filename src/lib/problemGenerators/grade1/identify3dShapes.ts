import type { ProblemGenerator } from "../types";
import { choice } from "../helpers";

const SOLIDS = [
  { name: "cube", description: "a box shape with 6 flat square faces, like a die" },
  { name: "sphere", description: "perfectly round in every direction, like a ball" },
  { name: "cone", description: "a circle at the bottom that narrows up to a single point, like an ice cream cone" },
  { name: "cylinder", description: "two flat circles connected by a curved side, like a soup can" },
] as const;

export const identify3dShapes: ProblemGenerator = {
  skillSlug: "g1-identify-3d-shapes",
  generate() {
    const solid = choice(SOLIDS);

    return {
      problemData: { instruction: `I'm thinking of a solid shape that is ${solid.description}. What shape is it?` },
      answerType: "text",
      correctAnswer: { type: "text", value: solid.name },
      hintLadder: [
        `Think about the solid shape described: ${solid.description}.`,
        `A shape that is ${solid.description} is called a "${solid.name}."`,
      ],
      explanation: `A shape that is ${solid.description} is a ${solid.name}.`,
    };
  },
};
