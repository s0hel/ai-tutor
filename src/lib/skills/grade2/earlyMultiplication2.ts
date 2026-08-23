import type { Skill } from "../types";

export const EARLY_MULTIPLICATION_2_SKILLS: Skill[] = [
  {
    slug: "g2-odd-even-numbers",
    subject: "math",
    gradeBand: "grade2",
    strand: "early-multiplication-2",
    title: "Odd and even numbers",
    order: 1,
    generatorId: "g2-odd-even-numbers",
    videoId: "SFRTTUtAjg4",
    videoTitle: "Introduction to even and odd numbers | 3rd grade | Khan Academy",
    conceptBrief: {
      summary:
        "A number is even if it can be split into two equal groups with nothing left over — even numbers always end in 0, 2, 4, 6, or 8. Otherwise, it's odd.",
      workedExamples: ["8 is even because it splits into two groups of 4.", "7 is odd because one group would have an extra left over."],
      commonMisconceptions: [
        "Only checking the first digit of a number instead of the last (ones) digit.",
        "Assuming all numbers that 'feel big' are even.",
      ],
    },
  },
  {
    slug: "g2-equal-groups",
    subject: "math",
    gradeBand: "grade2",
    strand: "early-multiplication-2",
    title: "Equal groups (repeated addition)",
    order: 2,
    generatorId: "g2-equal-groups",
    videoId: "j5c6pqAP2IA",
    videoTitle: "Repeated addition example | Addition and subtraction within 100 | Early Math | Khan Academy",
    conceptBrief: {
      summary:
        "When you have several groups with the same number of things in each, you can find the total by adding the group size repeatedly — one time for each group.",
      workedExamples: ["4 groups of 3 stickers: 3 + 3 + 3 + 3 = 12 stickers total."],
      commonMisconceptions: [
        "Adding the number of groups to the group size instead of adding the group size repeatedly.",
        "Losing count of how many times to add the group size.",
      ],
    },
  },
  {
    slug: "g2-arrays-repeated-addition",
    subject: "math",
    gradeBand: "grade2",
    strand: "early-multiplication-2",
    title: "Arrays and repeated addition",
    order: 3,
    generatorId: "g2-arrays-repeated-addition",
    conceptBrief: {
      summary:
        "An array arranges objects in equal rows. You can find the total by adding the row's amount once for every row — this is the foundation for multiplication.",
      workedExamples: ["An array with 4 rows of 5 dots: 5 + 5 + 5 + 5 = 20 dots total."],
      commonMisconceptions: [
        "Miscounting the number of rows or the amount in each row.",
        "Adding the wrong number of times (off by one row).",
      ],
    },
  },
];
