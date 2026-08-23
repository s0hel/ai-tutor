import type { Skill } from "../types";

export const COUNTING_NUMBER_SENSE_SKILLS: Skill[] = [
  {
    slug: "g1-counting-to-20",
    subject: "math",
    gradeBand: "grade1",
    strand: "counting-number-sense",
    title: "Counting to 20",
    order: 1,
    generatorId: "g1-counting-to-20",
    videoId: "PEeUTQ0Gri8",
    videoTitle: "Counting in order | Counting | Early Math | Khan Academy",
    conceptBrief: {
      summary:
        "Counting means saying number names in order, one for each object, without skipping or repeating. Touching or pointing to each object as you count helps keep track.",
      workedExamples: [
        "Counting 14 apples: 1, 2, 3... 14 — touch one apple for each number word.",
      ],
      commonMisconceptions: [
        "Skipping a number or saying two numbers for one object (miscounting).",
        "Losing track of which objects have already been counted.",
      ],
    },
  },
  {
    slug: "g1-counting-to-120",
    subject: "math",
    gradeBand: "grade1",
    strand: "counting-number-sense",
    title: "Counting to 120",
    order: 2,
    generatorId: "g1-counting-to-120",
    videoId: "1AqkBdCBm9o",
    videoTitle: "Missing numbers between 0 and 120 | Counting | Early Math | Khan Academy",
    conceptBrief: {
      summary:
        "The counting sequence keeps following the same pattern past 20: after each decade word (twenty, thirty, forty...) you count the ones again (twenty-one, twenty-two...). Once you know the pattern, you can count all the way to 120.",
      workedExamples: ["After 29 comes 30. After 39 comes 40. The pattern repeats every ten numbers."],
      commonMisconceptions: [
        "Forgetting what comes after a decade number (e.g. saying '29, 30, 40' and skipping the 30s).",
        "Mixing up teen numbers with decade numbers (13 vs. 30).",
      ],
    },
  },
  {
    slug: "g1-skip-counting",
    subject: "math",
    gradeBand: "grade1",
    strand: "counting-number-sense",
    title: "Skip counting by 2s, 5s, and 10s",
    order: 3,
    generatorId: "g1-skip-counting",
    videoId: "UwWn84u6i8s",
    videoTitle: "Skip counting by 5 example | Addition and subtraction within 100 | Early Math | Khan Academy",
    conceptBrief: {
      summary:
        "Skip counting means counting by jumps of the same size instead of one at a time — by 2s, 5s, or 10s. It's a faster way to count groups of things.",
      workedExamples: ["Counting by 2s: 2, 4, 6, 8, 10...", "Counting by 5s: 5, 10, 15, 20...", "Counting by 10s: 10, 20, 30, 40..."],
      commonMisconceptions: [
        "Losing the pattern partway through and reverting to counting by ones.",
        "Mixing up the skip-counting sequences (e.g. switching between counting by 2s and 5s).",
      ],
    },
  },
  {
    slug: "g1-before-after-between",
    subject: "math",
    gradeBand: "grade1",
    strand: "counting-number-sense",
    title: "Before, after, and between",
    order: 4,
    generatorId: "g1-before-after-between",
    conceptBrief: {
      summary:
        "Numbers have a fixed order. The number before is one less, the number after is one more, and a number between two others fits right in the middle of the counting sequence.",
      workedExamples: ["The number before 8 is 7. The number after 8 is 9. The number between 7 and 9 is 8."],
      commonMisconceptions: [
        "Mixing up 'before' (one less) and 'after' (one more).",
        "Picking a number that isn't directly next to the given number in the counting sequence.",
      ],
    },
  },
  {
    slug: "g1-comparing-numbers",
    subject: "math",
    gradeBand: "grade1",
    strand: "counting-number-sense",
    title: "Comparing numbers",
    order: 5,
    generatorId: "g1-comparing-numbers",
    videoId: "nFsQA2Zvy1o",
    videoTitle: "Greater than and less than symbols | Applying mathematical reasoning | Pre-Algebra | Khan Academy",
    conceptBrief: {
      summary:
        "To compare two numbers, figure out which one is bigger (greater than), smaller (less than), or if they're the same (equal). A number further along in the counting sequence is bigger.",
      workedExamples: ["14 is greater than 9, since 14 comes after 9 when counting.", "6 is less than 11."],
      commonMisconceptions: [
        "Assuming a 2-digit number is always bigger just because it has more digits shown (usually true, but the actual comparison should still be checked).",
        "Mixing up which symbol/word means bigger vs. smaller.",
      ],
    },
  },
];
