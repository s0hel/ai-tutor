import type { Skill } from "../types";

export const MEASUREMENT_3_SKILLS: Skill[] = [
  {
    slug: "g3-elapsed-time",
    subject: "math",
    gradeBand: "grade3",
    strand: "measurement-3",
    title: "Elapsed time",
    order: 1,
    generatorId: "g3-elapsed-time",
    videoId: "gZzsYhyjIXA",
    videoTitle: "Time word problem (puzzle) | Math | 3rd grade | Khan Academy",
    conceptBrief: {
      summary:
        "Elapsed time is how much time passes between a start time and an end time. Count forward from the start time in convenient jumps (like hours, then minutes) to reach the end time.",
      workedExamples: ["From 2:00 to 2:45 is 45 minutes of elapsed time."],
      commonMisconceptions: [
        "Subtracting the times like regular numbers instead of counting time correctly (60 minutes in an hour, not 100).",
        "Losing track when the time crosses over an hour mark.",
      ],
    },
  },
  {
    slug: "g3-area-counting-squares",
    subject: "math",
    gradeBand: "grade3",
    strand: "measurement-3",
    title: "Area by counting unit squares",
    order: 2,
    generatorId: "g3-area-counting-squares",
    videoId: "YA7ZrKcbteA",
    videoTitle: "Measuring area with partial unit squares | Math | 3rd grade | Khan Academy",
    conceptBrief: {
      summary:
        "Area measures how much space a shape covers, measured in square units. One way to find it is to count how many unit squares fit inside the shape.",
      workedExamples: ["A rectangle made of a 3-by-4 grid of squares has an area of 12 square units."],
      commonMisconceptions: [
        "Counting the squares along the edge (perimeter) instead of all the squares filling the shape.",
        "Miscounting rows or columns of squares.",
      ],
    },
  },
  {
    slug: "g3-area-multiply-sides",
    subject: "math",
    gradeBand: "grade3",
    strand: "measurement-3",
    title: "Area of a rectangle (multiplying side lengths)",
    order: 3,
    generatorId: "g3-area-multiply-sides",
    videoId: "mu3HHCdYYtY",
    videoTitle: "Transitioning from counting to multiplying to find area | 3rd grade | Khan Academy",
    conceptBrief: {
      summary:
        "Instead of counting every square one at a time, you can find a rectangle's area faster by multiplying its length by its width.",
      workedExamples: ["A rectangle 5 units long and 3 units wide has area 5 × 3 = 15 square units."],
      commonMisconceptions: [
        "Adding the length and width instead of multiplying them (that gives perimeter, not area).",
      ],
    },
  },
  {
    slug: "g3-perimeter-3",
    subject: "math",
    gradeBand: "grade3",
    strand: "measurement-3",
    title: "Perimeter of a rectangle",
    order: 4,
    generatorId: "g3-perimeter-3",
    videoId: "Wz8grvnFDHM",
    videoTitle: "Perimeter word problem (tables) | Math | 3rd grade | Khan Academy",
    conceptBrief: {
      summary: "Perimeter is the total distance around the outside of a shape — add up the length of all its sides.",
      workedExamples: ["A rectangle 5 units long and 3 units wide has perimeter 5+3+5+3 = 16 units."],
      commonMisconceptions: ["Multiplying the sides instead of adding them (that gives area, not perimeter)."],
    },
  },
  {
    slug: "g3-liquid-volume-mass",
    subject: "math",
    gradeBand: "grade3",
    strand: "measurement-3",
    title: "Liquid volume and mass",
    order: 5,
    generatorId: "g3-liquid-volume-mass",
    videoId: "zqduFg0s5Q4",
    videoTitle: "Intuition for grams | Measurement and geometry | 3rd grade | Khan Academy",
    conceptBrief: {
      summary:
        "Liquid volume is measured in units like liters, and mass (how heavy something is) is measured in units like grams or kilograms. Word problems about these work just like other addition/subtraction problems.",
      workedExamples: ["A bag of rice has a mass of 3 kilograms. Another bag has a mass of 2 kilograms. Together they have a mass of 5 kilograms."],
      commonMisconceptions: [
        "Mixing up volume (how much space something takes up) and mass (how heavy it is).",
        "Forgetting to keep track of which unit the answer should be in.",
      ],
    },
  },
];
