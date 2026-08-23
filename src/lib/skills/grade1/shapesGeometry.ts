import type { Skill } from "../types";

export const SHAPES_GEOMETRY_SKILLS: Skill[] = [
  {
    slug: "g1-identify-2d-shapes",
    subject: "math",
    gradeBand: "grade1",
    strand: "shapes-geometry",
    title: "Identifying 2D shapes",
    order: 1,
    generatorId: "g1-identify-2d-shapes",
    videoId: "USIQ-DN15Oo",
    videoTitle: "Circles, Squares, Triangles, and Rectangles | Learning Shapes | Khan Academy Kids",
    conceptBrief: {
      summary:
        "Flat shapes are named by their number of sides and corners: a circle has no straight sides, a triangle has 3, a square/rectangle has 4 (with square having all equal sides), and a hexagon has 6.",
      workedExamples: ["A shape with 3 straight sides and 3 corners is a triangle."],
      commonMisconceptions: [
        "Confusing a square with a rectangle (a square IS a special rectangle with all equal sides).",
        "Miscounting the number of sides on a shape.",
      ],
    },
  },
  {
    slug: "g1-identify-3d-shapes",
    subject: "math",
    gradeBand: "grade1",
    strand: "shapes-geometry",
    title: "Identifying 3D shapes",
    order: 2,
    generatorId: "g1-identify-3d-shapes",
    conceptBrief: {
      summary:
        "Solid shapes take up space in three dimensions. A cube looks like a box with 6 square faces, a sphere is perfectly round like a ball, a cone has a circular base and a point on top, and a cylinder looks like a can.",
      workedExamples: ["A ball-shaped object is a sphere.", "A soup can shape is a cylinder."],
      commonMisconceptions: [
        "Confusing a circle (a flat 2D shape) with a sphere (a solid 3D shape).",
        "Mixing up a cone and a cylinder.",
      ],
    },
  },
  {
    slug: "g1-partition-shapes",
    subject: "math",
    gradeBand: "grade1",
    strand: "shapes-geometry",
    title: "Halves and fourths",
    order: 3,
    generatorId: "g1-partition-shapes",
    videoId: "0lSTXtwPuOU",
    videoTitle: "Halves and fourths | Geometry | Early Math | Khan Academy",
    conceptBrief: {
      summary:
        "A shape split into 2 equal parts makes halves — each part is called 'one half.' Split into 4 equal parts, each part is called 'one fourth' (or one quarter).",
      workedExamples: ["A pizza cut into 2 equal slices — each slice is one half.", "A sandwich cut into 4 equal pieces — each piece is one fourth."],
      commonMisconceptions: [
        "Thinking any 2 pieces count as halves, even if they aren't equal in size.",
        "Mixing up halves (2 equal parts) and fourths (4 equal parts).",
      ],
    },
  },
];
