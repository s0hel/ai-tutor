import type { Skill } from "../types";

export const PLACE_VALUE_2_SKILLS: Skill[] = [
  {
    slug: "g2-hundreds-tens-ones",
    subject: "math",
    gradeBand: "grade2",
    strand: "place-value-2",
    title: "Hundreds, tens, and ones",
    order: 1,
    generatorId: "g2-hundreds-tens-ones",
    videoId: "1ACa-NW8-TU",
    videoTitle: "Ones, Tens, & Hundreds | Place Value for Kids | Khan Academy Kids",
    conceptBrief: {
      summary:
        "A 3-digit number is made of hundreds, tens, and ones. Each place tells you how many groups of that size are in the number.",
      workedExamples: ["342 = 3 hundreds, 4 tens, and 2 ones."],
      commonMisconceptions: [
        "Mixing up which digit is the hundreds place vs. the tens place.",
        "Thinking '3 hundreds' means the digit 3 instead of the value 300.",
      ],
    },
  },
  {
    slug: "g2-expanded-form",
    subject: "math",
    gradeBand: "grade2",
    strand: "place-value-2",
    title: "Writing numbers in expanded form",
    order: 2,
    generatorId: "g2-expanded-form",
    videoId: "WC5XbVwhcog",
    videoTitle: "Intro to Expanded Form | Place Value for Kids | Khan Academy Kids",
    conceptBrief: {
      summary:
        "Expanded form breaks a number into the value of each digit added together — hundreds plus tens plus ones.",
      workedExamples: ["327 in expanded form is 300 + 20 + 7."],
      commonMisconceptions: [
        "Writing the digit itself instead of its actual place value (writing 3 instead of 300).",
        "Leaving out a place value that's a zero instead of just omitting it correctly.",
      ],
    },
  },
  {
    slug: "g2-compare-3digit-numbers",
    subject: "math",
    gradeBand: "grade2",
    strand: "place-value-2",
    title: "Comparing 3-digit numbers",
    order: 3,
    generatorId: "g2-compare-3digit-numbers",
    conceptBrief: {
      summary:
        "Compare 3-digit numbers by looking at the hundreds digit first. If those match, compare the tens digit, and if those match too, compare the ones digit.",
      workedExamples: ["452 vs. 398: 452 has 4 hundreds, 398 has 3 hundreds, so 452 is bigger."],
      commonMisconceptions: [
        "Comparing the ones or tens digit before checking the hundreds digit.",
        "Assuming more digits always means bigger without actually checking a same-length case carefully.",
      ],
    },
  },
  {
    slug: "g2-skip-counting-100s",
    subject: "math",
    gradeBand: "grade2",
    strand: "place-value-2",
    title: "Skip counting by 5s, 10s, and 100s",
    order: 4,
    generatorId: "g2-skip-counting-100s",
    conceptBrief: {
      summary:
        "Skip counting by 5s, 10s, or 100s means jumping ahead by that same amount each time, which is a fast way to count larger groups of things.",
      workedExamples: ["Counting by 100s: 100, 200, 300, 400...", "Counting by 5s: 5, 10, 15, 20..."],
      commonMisconceptions: [
        "Losing the pattern partway and reverting to counting by ones.",
        "Adding the wrong amount for the jump size being used.",
      ],
    },
  },
];
