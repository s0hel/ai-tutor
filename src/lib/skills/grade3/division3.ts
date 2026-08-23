import type { Skill } from "../types";

export const DIVISION_3_SKILLS: Skill[] = [
  {
    slug: "g3-div-facts",
    subject: "math",
    gradeBand: "grade3",
    strand: "division-3",
    title: "Division facts",
    order: 1,
    generatorId: "g3-div-facts",
    videoId: "MTzTqvzWzm8",
    videoTitle: "Division 1 | Multiplication and division | Arithmetic | Khan Academy",
    conceptBrief: {
      summary:
        "Division splits a number into equal groups and tells you how many are in each group (or how many groups there are). It's the opposite of multiplication.",
      workedExamples: ["42 ÷ 6 = 7, because 6 groups of 7 make 42."],
      commonMisconceptions: [
        "Mixing up which number is being split (the total) and which is the group size.",
        "Forgetting a related multiplication fact that would make the division easy.",
      ],
    },
  },
  {
    slug: "g3-div-word-problems-3",
    subject: "math",
    gradeBand: "grade3",
    strand: "division-3",
    title: "Division word problems",
    order: 2,
    generatorId: "g3-div-word-problems-3",
    conceptBrief: {
      summary:
        "When a story describes sharing a total equally into groups, or splitting a total into equal-sized groups, divide to find the answer.",
      workedExamples: ["24 cookies shared equally among 4 friends: 24 ÷ 4 = 6 cookies each."],
      commonMisconceptions: [
        "Multiplying instead of dividing when a story describes equal sharing.",
        "Mixing up which number is the total and which is the number of groups.",
      ],
    },
  },
  {
    slug: "g3-mult-div-relationship",
    subject: "math",
    gradeBand: "grade3",
    strand: "division-3",
    title: "Multiplication and division fact families",
    order: 3,
    generatorId: "g3-mult-div-relationship",
    videoId: "qcMJ1pN36r4",
    videoTitle: "Examples relating multiplication to division | 3rd grade | Khan Academy",
    conceptBrief: {
      summary:
        "Multiplication and division facts are related — if you know one multiplication fact, you automatically know two division facts that go with it.",
      workedExamples: ["From 6 × 7 = 42, you also know 42 ÷ 7 = 6 and 42 ÷ 6 = 7."],
      commonMisconceptions: [
        "Not seeing the connection between a multiplication fact and its related division facts.",
        "Mixing up which number in the family is the product (total) versus a factor.",
      ],
    },
  },
];
