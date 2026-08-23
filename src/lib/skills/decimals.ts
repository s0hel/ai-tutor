import type { Skill } from "./types";

export const DECIMAL_SKILLS: Skill[] = [
  {
    slug: "decimal-place-value",
    subject: "math",
    gradeBand: "grade4-5",
    strand: "decimals",
    title: "Decimal place value",
    order: 1,
    generatorId: "decimal-place-value",
    videoId: "x-Dqe5U1TXA",
    videoTitle: "Decimal place value | Khan Academy",
    conceptBrief: {
      summary:
        "After the decimal point, the places are tenths, hundredths, then thousandths — each one ten times smaller than the last, just like whole-number place value but going the other direction.",
      workedExamples: ["In 5.482, the 4 is in the tenths place, 8 is in the hundredths place, and 2 is in the thousandths place."],
      commonMisconceptions: ["Mixing up the order — thinking hundredths comes before tenths."],
    },
  },
  {
    slug: "decimal-compare",
    subject: "math",
    gradeBand: "grade4-5",
    strand: "decimals",
    title: "Comparing decimals",
    order: 2,
    generatorId: "decimal-compare",
    videoId: "gAV9kwvoD6s",
    videoTitle: "Comparing decimals | Khan Academy",
    conceptBrief: {
      summary:
        "Line up the decimal points and compare digit by digit from the left — whole number part first, then tenths, then hundredths — until you find a difference.",
      workedExamples: ["0.7 vs 0.65: compare tenths first — 7 tenths is more than 6 tenths, so 0.7 is bigger."],
      commonMisconceptions: [
        "Thinking a decimal with more digits is automatically bigger (e.g. thinking 0.45 > 0.5 because 45 > 5).",
      ],
    },
  },
  {
    slug: "decimal-add-subtract",
    subject: "math",
    gradeBand: "grade4-5",
    strand: "decimals",
    title: "Adding and subtracting decimals",
    order: 3,
    generatorId: "decimal-add-subtract",
    videoId: "oLh_sIESQnY",
    videoTitle: "Adding decimals | Khan Academy",
    conceptBrief: {
      summary: "Line up the decimal points in a column, then add or subtract just like whole numbers.",
      workedExamples: ["3.25 + 1.40 = 4.65."],
      commonMisconceptions: ["Not lining up the decimal points, which misaligns the place values."],
    },
  },
  {
    slug: "decimal-fraction-convert",
    subject: "math",
    gradeBand: "grade4-5",
    strand: "decimals",
    title: "Converting fractions to decimals",
    order: 4,
    generatorId: "decimal-fraction-convert",
    videoId: "Gn2pdkvdbGQ",
    videoTitle: "Converting fractions to decimals | Khan Academy",
    conceptBrief: {
      summary: "A fraction with a denominator of 10 or 100 converts directly: the numerator becomes the decimal digits.",
      workedExamples: ["7/10 = 0.7.", "23/100 = 0.23."],
      commonMisconceptions: ["Miscounting the number of digits after the decimal point for hundredths."],
    },
  },
  {
    slug: "decimal-round",
    subject: "math",
    gradeBand: "grade4-5",
    strand: "decimals",
    title: "Rounding decimals",
    order: 5,
    generatorId: "decimal-round",
    conceptBrief: {
      summary:
        "To round, look at the digit just to the right of the place you're rounding to. 5 or more rounds up, 4 or less stays the same.",
      workedExamples: ["3.68 rounded to the nearest whole number: look at the tenths digit (6), which rounds up to 4."],
      commonMisconceptions: ["Looking at the wrong digit when deciding whether to round up."],
    },
  },
  {
    slug: "decimal-multiply-power-of-ten",
    subject: "math",
    gradeBand: "grade4-5",
    strand: "decimals",
    title: "Multiplying decimals by 10 and 100",
    order: 6,
    generatorId: "decimal-multiply-power-of-ten",
    conceptBrief: {
      summary: "Multiplying by 10 or 100 moves the decimal point right — one place for 10, two places for 100.",
      workedExamples: ["3.45 × 10 = 34.5.", "3.45 × 100 = 345."],
      commonMisconceptions: ["Moving the decimal point the wrong direction, or the wrong number of places."],
    },
  },
];
