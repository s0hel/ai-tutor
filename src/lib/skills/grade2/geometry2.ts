import type { Skill } from "../types";

export const GEOMETRY_2_SKILLS: Skill[] = [
  {
    slug: "g2-shape-attributes",
    subject: "math",
    gradeBand: "grade2",
    strand: "geometry-2",
    title: "Identifying shapes by their attributes",
    order: 1,
    generatorId: "g2-shape-attributes",
    videoId: "10dTx1Zy_4w",
    videoTitle: "Recognizing shapes | Geometry | Early Math | Khan Academy",
    conceptBrief: {
      summary:
        "Shapes can be described and sorted by attributes like the number of angles (corners) and the number of sides/faces they have.",
      workedExamples: ["A pentagon has 5 angles and 5 sides.", "A cube has 6 faces."],
      commonMisconceptions: [
        "Miscounting the number of sides or angles on a shape.",
        "Confusing similarly-shaped polygons (pentagon vs. hexagon).",
      ],
    },
  },
  {
    slug: "g2-partition-equal-shares-2",
    subject: "math",
    gradeBand: "grade2",
    strand: "geometry-2",
    title: "Halves, thirds, and fourths",
    order: 2,
    generatorId: "g2-partition-equal-shares-2",
    conceptBrief: {
      summary:
        "A shape split into equal-sized parts can be described by how many parts it's divided into: 2 equal parts are halves, 3 equal parts are thirds, and 4 equal parts are fourths.",
      workedExamples: ["A pie cut into 3 equal slices — each slice is called a third."],
      commonMisconceptions: [
        "Thinking any set of pieces counts, even if the pieces aren't equal in size.",
        "Mixing up thirds (3 parts) and fourths (4 parts).",
      ],
    },
  },
  {
    slug: "g2-partition-rows-columns",
    subject: "math",
    gradeBand: "grade2",
    strand: "geometry-2",
    title: "Partitioning a rectangle into rows and columns",
    order: 3,
    generatorId: "g2-partition-rows-columns",
    conceptBrief: {
      summary:
        "A rectangle can be split into equal rows and columns of small squares. The total number of squares equals the number of rows multiplied by the number of columns.",
      workedExamples: ["A rectangle split into 3 rows and 4 columns has 3 × 4 = 12 small squares."],
      commonMisconceptions: [
        "Mixing up which dimension is rows and which is columns.",
        "Counting squares one at a time instead of multiplying rows by columns.",
      ],
    },
  },
];
