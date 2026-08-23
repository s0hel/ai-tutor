import type { Skill } from "../types";

export const MULTIPLICATION_3_SKILLS: Skill[] = [
  {
    slug: "g3-mult-facts",
    subject: "math",
    gradeBand: "grade3",
    strand: "multiplication-3",
    title: "Multiplication facts",
    order: 1,
    generatorId: "g3-mult-facts",
    videoId: "RNxwasijbAo",
    videoTitle: "Intro to multiplication | Multiplication and division | Arithmetic | Khan Academy",
    conceptBrief: {
      summary:
        "Multiplication is repeated addition: multiplying two numbers tells you the total when you have that many equal groups. Knowing your facts up to 10×10 makes math much faster.",
      workedExamples: ["6 × 7 means 6 groups of 7 (or 7 groups of 6): 6 × 7 = 42."],
      commonMisconceptions: [
        "Confusing a multiplication fact with a nearby addition fact.",
        "Miscounting when skip-counting up to find the product.",
      ],
    },
  },
  {
    slug: "g3-mult-by-10",
    subject: "math",
    gradeBand: "grade3",
    strand: "multiplication-3",
    title: "Multiplying by 10",
    order: 2,
    generatorId: "g3-mult-by-10",
    videoId: "uHHnwafYivk",
    videoTitle: "Multiplying 10s | Math | 4th grade | Khan Academy",
    conceptBrief: {
      summary: "Multiplying any number by 10 just adds a zero to the end — it shifts every digit one place to the left.",
      workedExamples: ["6 × 10 = 60.", "23 × 10 = 230."],
      commonMisconceptions: ["Adding the wrong number of zeros.", "Thinking this trick works for any number, not just 10."],
    },
  },
  {
    slug: "g3-mult-word-problems-3",
    subject: "math",
    gradeBand: "grade3",
    strand: "multiplication-3",
    title: "Multiplication word problems",
    order: 3,
    generatorId: "g3-mult-word-problems-3",
    videoId: "_rA8eEel6Hg",
    videoTitle: "Solving multiplication word problems | 3rd grade math (Illustrative Math-aligned) | Khan Academy",
    conceptBrief: {
      summary:
        "When a story describes several equal groups, multiply the number of groups by the size of each group to find the total.",
      workedExamples: ["5 baskets with 6 apples each: 5 × 6 = 30 apples total."],
      commonMisconceptions: [
        "Adding the two numbers instead of multiplying them.",
        "Mixing up which number is the number of groups and which is the group size (though the product is the same either way, it can cause confusion writing the equation).",
      ],
    },
  },
  {
    slug: "g3-mult-properties",
    subject: "math",
    gradeBand: "grade3",
    strand: "multiplication-3",
    title: "Multiplication properties",
    order: 4,
    generatorId: "g3-mult-properties",
    videoId: "um2nlNVM_YM",
    videoTitle: "Properties and patterns for multiplication | 3rd grade | Khan Academy",
    conceptBrief: {
      summary:
        "Multiplication has helpful properties: the commutative property means you can swap the order of the numbers and get the same answer (3 × 4 = 4 × 3).",
      workedExamples: ["3 × 4 = 12, and 4 × 3 = 12 — same answer, different order."],
      commonMisconceptions: [
        "Assuming this swap trick works for subtraction or division too (it doesn't).",
      ],
    },
  },
];
