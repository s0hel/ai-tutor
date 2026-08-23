import type { Skill } from "../types";

export const PLACE_VALUE_SKILLS: Skill[] = [
  {
    slug: "g1-tens-and-ones",
    subject: "math",
    gradeBand: "grade1",
    strand: "place-value",
    title: "Tens and ones",
    order: 1,
    generatorId: "g1-tens-and-ones",
    videoId: "wx2gI8iwMCA",
    videoTitle: "Introduction to place value | Place value (tens and hundreds) | Early Math | Khan Academy",
    conceptBrief: {
      summary:
        "Any 2-digit number can be broken into a number of tens and a number of ones. The tens digit tells you how many groups of ten, and the ones digit tells you how many single ones are left over.",
      workedExamples: ["34 = 3 tens and 4 ones (3 groups of ten, plus 4 more)."],
      commonMisconceptions: [
        "Mixing up which digit represents the tens and which represents the ones.",
        "Thinking '3 tens' means the number 3 instead of 30.",
      ],
    },
  },
  {
    slug: "g1-place-value-compare",
    subject: "math",
    gradeBand: "grade1",
    strand: "place-value",
    title: "Comparing 2-digit numbers using place value",
    order: 2,
    generatorId: "g1-place-value-compare",
    conceptBrief: {
      summary:
        "To compare 2-digit numbers, look at the tens digit first — whichever number has more tens is bigger. Only compare the ones digit if the tens digits are the same.",
      workedExamples: ["52 vs. 47: 52 has 5 tens, 47 has 4 tens, so 52 is bigger.", "52 vs. 58: same tens digit, so compare ones: 58 is bigger."],
      commonMisconceptions: [
        "Comparing the ones digit first instead of the tens digit.",
        "Assuming a number is bigger just because a specific digit looks bigger, without checking its place value.",
      ],
    },
  },
  {
    slug: "g1-add-subtract-tens",
    subject: "math",
    gradeBand: "grade1",
    strand: "place-value",
    title: "Adding and subtracting tens",
    order: 3,
    generatorId: "g1-add-subtract-tens",
    conceptBrief: {
      summary:
        "When adding or subtracting a multiple of ten, only the tens digit changes — the ones digit stays the same. Think of it as adding or removing whole groups of ten.",
      workedExamples: ["40 + 30 = 70 (4 tens + 3 tens = 7 tens).", "70 - 20 = 50 (7 tens - 2 tens = 5 tens)."],
      commonMisconceptions: [
        "Accidentally changing the ones digit when it should stay the same.",
        "Miscounting the number of tens being added or removed.",
      ],
    },
  },
];
