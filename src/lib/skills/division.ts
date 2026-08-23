import type { Skill } from "./types";

export const DIVISION_SKILLS: Skill[] = [
  {
    slug: "div-1digit-divisor",
    subject: "math",
    gradeBand: "grade4-5",
    strand: "division",
    title: "Dividing by a 1-digit number",
    order: 1,
    generatorId: "div-1digit-divisor",
    videoId: "KFzcwWTEDDI",
    videoTitle: "Dividing numbers: intro to long division | 4th grade | Khan Academy",
    conceptBrief: {
      summary:
        "Division asks 'how many equal groups fit inside this number?' A good strategy is to estimate with a nearby round multiple, then adjust up or down.",
      workedExamples: ["84 ÷ 4: 4 × 20 = 80, that's close. 4 × 21 = 84. So 84 ÷ 4 = 21."],
      commonMisconceptions: [
        "Confusing which number is being split up (the dividend) and which is the group size (the divisor).",
        "Guessing without checking the answer by multiplying back.",
      ],
    },
  },
  {
    slug: "div-1digit-remainder",
    subject: "math",
    gradeBand: "grade4-5",
    strand: "division",
    title: "Dividing with a remainder",
    order: 2,
    generatorId: "div-1digit-remainder",
    videoId: "MbpmP1esh-Q",
    videoTitle: "Dividing numbers: example with remainders | Multiplication and division | Arithmetic | Khan Academy",
    conceptBrief: {
      summary:
        "Sometimes a number doesn't split evenly. Find the largest multiple of the divisor that's still less than the dividend — whatever's left over is the remainder. Write answers like '12 r 3'.",
      workedExamples: ["27 ÷ 4: 4 × 6 = 24, which is the closest without going over. 27 - 24 = 3. So 27 ÷ 4 = 6 r 3."],
      commonMisconceptions: [
        "Picking a multiple that's too big, going over the dividend.",
        "Forgetting to report the remainder at all.",
      ],
    },
  },
  {
    slug: "div-2digit-divisor",
    subject: "math",
    gradeBand: "grade4-5",
    strand: "division",
    title: "Dividing by a 2-digit number",
    order: 3,
    generatorId: "div-2digit-divisor",
    videoId: "KzdbThwGNGI",
    videoTitle: "Introduction to dividing by 2 digits | Khan Academy",
    conceptBrief: {
      summary:
        "Same idea as dividing by a 1-digit number, just with a bigger group size — estimate with a round number first, then refine your guess.",
      workedExamples: ["ease into it: 240 ÷ 20 = 12 as an estimate, then check 20 × 12 = 240. Exact match!"],
      commonMisconceptions: [
        "Underestimating how many times the 2-digit number fits in, especially with larger dividends.",
      ],
    },
  },
  {
    slug: "div-remainder-interpretation",
    subject: "math",
    gradeBand: "grade4-5",
    strand: "division",
    title: "Interpreting remainders in word problems",
    order: 4,
    generatorId: "div-remainder-interpretation",
    videoId: "P1qyjdh_sIw",
    videoTitle: "Introduction to remainders | Khan Academy",
    conceptBrief: {
      summary:
        "In real situations, what you do with a remainder depends on the question. If leftovers still need a spot (like needing another box), round UP. If the question only cares about full complete groups, ignore the remainder and keep the answer as is.",
      workedExamples: [
        "23 stickers, 5 per page: 23 ÷ 5 = 4 r 3. If asking 'how many pages are needed to hold them all?', round up to 5 pages.",
        "23 stickers, 5 per page: if asking 'how many FULL pages can you make?', the answer stays 4 — the 3 leftover don't make a full page.",
      ],
      commonMisconceptions: [
        "Always rounding up regardless of what the question actually asks.",
        "Always dropping the remainder without checking whether the leftovers matter.",
      ],
    },
  },
];
