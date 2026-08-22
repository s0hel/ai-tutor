import type { ProblemGenerator } from "../types";
import { choice } from "../helpers";

const SHAPES = [
  { name: "triangle", sides: 3, description: "3 straight sides" },
  { name: "quadrilateral", sides: 4, description: "4 straight sides" },
  { name: "pentagon", sides: 5, description: "5 straight sides" },
  { name: "hexagon", sides: 6, description: "6 straight sides" },
  { name: "octagon", sides: 8, description: "8 straight sides" },
] as const;

export const classifyShape: ProblemGenerator = {
  skillSlug: "geo-classify-shape",
  generate(level) {
    const pool = level < 5 ? SHAPES.slice(0, 3) : SHAPES;
    const shape = choice(pool);

    return {
      problemData: { sides: shape.sides, description: shape.description },
      answerType: "text",
      correctAnswer: { type: "text", value: shape.name, acceptedAliases: shape.name === "quadrilateral" ? ["quad"] : [] },
      hintLadder: [
        `Count the straight sides described: ${shape.description}.`,
        `A closed shape with ${shape.sides} straight sides is called a "${shape.name}."`,
      ],
      explanation: `A shape with ${shape.description} is a ${shape.name}.`,
    };
  },
};
