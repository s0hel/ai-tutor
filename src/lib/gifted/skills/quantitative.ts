import type { GTSkill } from "../types";

export const QUANTITATIVE_SKILLS: GTSkill[] = [
  {
    slug: "gt-number-analogies",
    subject: "gifted",
    battery: "quantitative",
    title: "Number Analogies",
    order: 1,
    generatorId: "gt-number-analogies",
    conceptBrief: {
      summary:
        "You'll see a pair of numbers that follow a rule (like 'add 3' or 'double it'), then a third number. Figure out the rule from the first pair, then apply the SAME rule to the third number.",
      workedExamples: [
        "2 is to 5 as 4 is to 7 — the rule is 'add 3'. Add 3 to 4 to get 7.",
        "3 is to 6 as 5 is to 10 — the rule is 'double it'. Double 5 to get 10.",
      ],
      commonMisconceptions: [
        "Guessing a rule that only works for the first pair without checking it makes sense.",
        "Mixing up addition and subtraction when figuring out the rule.",
      ],
    },
  },
  {
    slug: "gt-number-puzzles",
    subject: "gifted",
    battery: "quantitative",
    title: "Number Puzzles",
    order: 2,
    generatorId: "gt-number-puzzles",
    conceptBrief: {
      summary:
        "A balance scale has the same total number of shapes on both sides. Count what's on each side, then figure out how many more shapes are needed to make both sides equal.",
      workedExamples: [
        "Left side has 7 shapes, right side has 4 shapes plus some more — 3 more shapes are needed because 4 + 3 = 7.",
        "Left side has 10 shapes, right side has 6 plus some more — 4 more are needed because 6 + 4 = 10.",
      ],
      commonMisconceptions: [
        "Counting the shapes on only one side instead of comparing both sides.",
        "Adding instead of finding the difference between the two sides.",
      ],
    },
  },
  {
    slug: "gt-number-series",
    subject: "gifted",
    battery: "quantitative",
    title: "Number Series",
    order: 3,
    generatorId: "gt-number-series",
    conceptBrief: {
      summary:
        "A list of numbers follows a pattern. Figure out what's happening from one number to the next, then use that same pattern to find the next number.",
      workedExamples: [
        "2, 4, 6, 8, ? — each number goes up by 2, so the next number is 10.",
        "1, 2, 4, 8, ? — each number doubles, so the next number is 16.",
      ],
      commonMisconceptions: [
        "Only looking at two numbers instead of checking the pattern holds across the whole list.",
        "Missing patterns that alternate between two different steps.",
      ],
    },
  },
];
