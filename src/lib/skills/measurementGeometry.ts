import type { Skill } from "./types";

export const MEASUREMENT_GEOMETRY_SKILLS: Skill[] = [
  {
    slug: "geo-area-rectangle",
    subject: "math",
    gradeBand: "grade4-5",
    strand: "measurement-geometry",
    title: "Area of a rectangle",
    order: 1,
    generatorId: "geo-area-rectangle",
    videoId: "Q3wfb0CPhIY",
    videoTitle: "Area of rectangles and the distributive property | Measurement | Pre-Algebra | Khan Academy",
    conceptBrief: {
      summary: "Area measures how much surface a shape covers. For a rectangle, area = length × width.",
      workedExamples: ["A rectangle 6 units long and 4 units wide has area 6 × 4 = 24 square units."],
      commonMisconceptions: ["Adding length and width instead of multiplying them (that gives perimeter, not area)."],
    },
  },
  {
    slug: "geo-perimeter-rectangle",
    subject: "math",
    gradeBand: "grade4-5",
    strand: "measurement-geometry",
    title: "Perimeter of a rectangle",
    order: 2,
    generatorId: "geo-perimeter-rectangle",
    videoId: "LoaBd-sPzkU",
    videoTitle: "Perimeter and area: the basics | Perimeter, area, and volume | Geometry | Khan Academy",
    conceptBrief: {
      summary:
        "Perimeter is the total distance around the outside of a shape. For a rectangle, add up all four sides: 2 × (length + width).",
      workedExamples: ["A rectangle 6 units long and 4 units wide has perimeter 2 × (6 + 4) = 20 units."],
      commonMisconceptions: ["Multiplying length and width instead of adding them (that gives area, not perimeter)."],
    },
  },
  {
    slug: "geo-classify-shape",
    subject: "math",
    gradeBand: "grade4-5",
    strand: "measurement-geometry",
    title: "Classifying shapes by number of sides",
    order: 3,
    generatorId: "geo-classify-shape",
    videoId: "IaoZhhx_I9s",
    videoTitle: "Math Antics - Polygons",
    videoSource: "Math Antics",
    videoSourceUrl: "https://www.mathantics.com",
    conceptBrief: {
      summary:
        "Shapes are named by how many straight sides they have: 3 sides = triangle, 4 = quadrilateral, 5 = pentagon, 6 = hexagon, 8 = octagon.",
      workedExamples: ["A shape with 6 straight sides is a hexagon."],
      commonMisconceptions: ["Mixing up pentagon (5) and hexagon (6)."],
    },
  },
  {
    slug: "geo-classify-angle",
    subject: "math",
    gradeBand: "grade4-5",
    strand: "measurement-geometry",
    title: "Classifying angles",
    order: 4,
    generatorId: "geo-classify-angle",
    videoId: "ALhv3Rlydig",
    videoTitle: "Acute right and obtuse angles | Angles and intersecting lines | Geometry | Khan Academy",
    conceptBrief: {
      summary:
        "An angle less than 90° is acute, exactly 90° is a right angle, and more than 90° (but less than 180°) is obtuse.",
      workedExamples: ["A 45° angle is acute. A 90° angle is right. A 120° angle is obtuse."],
      commonMisconceptions: ["Thinking any 'wide-looking' angle is obtuse without checking against 90°."],
    },
  },
  {
    slug: "geo-unit-conversion",
    subject: "math",
    gradeBand: "grade4-5",
    strand: "measurement-geometry",
    title: "Converting between units of measurement",
    order: 5,
    generatorId: "geo-unit-conversion",
    videoId: "M9bisHkXbKc",
    videoTitle: "U.S. customary units: distance | 4th grade | Khan Academy",
    conceptBrief: {
      summary:
        "To convert from a bigger unit to a smaller one (like feet to inches), multiply by how many small units fit in one big unit.",
      workedExamples: ["3 feet = 3 × 12 = 36 inches (since 1 foot = 12 inches)."],
      commonMisconceptions: ["Dividing instead of multiplying when converting to a smaller unit."],
    },
  },
];
