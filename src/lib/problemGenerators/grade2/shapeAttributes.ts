import type { ProblemGenerator } from "../types";
import { choice } from "../helpers";

const SHAPES = [
  { name: "triangle", sides: 3 },
  { name: "quadrilateral", sides: 4 },
  { name: "pentagon", sides: 5 },
  { name: "hexagon", sides: 6 },
  { name: "octagon", sides: 8 },
] as const;

export const shapeAttributes: ProblemGenerator = {
  skillSlug: "g2-shape-attributes",
  generate() {
    const shape = choice(SHAPES);
    const askForSides = Math.random() < 0.5;

    if (askForSides) {
      return {
        problemData: { instruction: `How many sides (and angles) does a ${shape.name} have?` },
        answerType: "integer",
        correctAnswer: { type: "integer", value: shape.sides },
        hintLadder: [`Think about the shape "${shape.name}" and count its straight sides.`, `A ${shape.name} has ${shape.sides} sides and ${shape.sides} angles.`],
        explanation: `A ${shape.name} has ${shape.sides} sides.`,
      };
    }

    return {
      problemData: { instruction: `What is the name of a shape with ${shape.sides} straight sides and ${shape.sides} angles?` },
      answerType: "text",
      correctAnswer: { type: "text", value: shape.name },
      hintLadder: [`Count the sides described: ${shape.sides}.`, `A shape with ${shape.sides} sides is called a "${shape.name}."`],
      explanation: `A shape with ${shape.sides} sides is a ${shape.name}.`,
    };
  },
};
