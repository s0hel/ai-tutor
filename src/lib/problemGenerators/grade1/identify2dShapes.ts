import type { ProblemGenerator } from "../types";
import { choice } from "../helpers";

const SHAPES = [
  { name: "circle", description: "a round shape with no straight sides" },
  { name: "triangle", description: "3 straight sides" },
  { name: "square", description: "4 equal straight sides and 4 corners, all the same size" },
  { name: "rectangle", description: "4 straight sides with 2 long sides and 2 short sides" },
  { name: "hexagon", description: "6 straight sides" },
] as const;

export const identify2dShapes: ProblemGenerator = {
  skillSlug: "g1-identify-2d-shapes",
  generate() {
    const shape = choice(SHAPES);

    return {
      problemData: { instruction: `I'm thinking of a shape with ${shape.description}. What shape is it?` },
      answerType: "text",
      correctAnswer: { type: "text", value: shape.name },
      hintLadder: [
        `Think about the shape described: ${shape.description}.`,
        `A shape with ${shape.description} is called a "${shape.name}."`,
      ],
      explanation: `A shape with ${shape.description} is a ${shape.name}.`,
    };
  },
};
