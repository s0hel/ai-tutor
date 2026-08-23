import type { Skill } from "../types";

export const FRACTIONS_3_SKILLS: Skill[] = [
  {
    slug: "g3-unit-fractions",
    subject: "math",
    gradeBand: "grade3",
    strand: "fractions-3",
    title: "Unit fractions",
    order: 1,
    generatorId: "g3-unit-fractions",
    videoId: "jgWqSjgMAtw",
    videoTitle: "Fraction basics | Fractions | 3rd grade | Khan Academy",
    conceptBrief: {
      summary:
        "A unit fraction represents one equal part of a whole that's been split into a certain number of pieces. The bottom number (denominator) tells you how many equal pieces the whole is split into.",
      workedExamples: ["If a pizza is cut into 4 equal slices, one slice is 1/4 of the pizza."],
      commonMisconceptions: [
        "Thinking the pieces don't need to be equal in size.",
        "Mixing up which number goes on top (numerator) and which goes on bottom (denominator).",
      ],
    },
  },
  {
    slug: "g3-fractions-number-line",
    subject: "math",
    gradeBand: "grade3",
    strand: "fractions-3",
    title: "Fractions on a number line",
    order: 2,
    generatorId: "g3-fractions-number-line",
    videoId: "Z0WsfO-RI8Y",
    videoTitle: "Fractions on a number line | Fractions | 3rd grade | Khan Academy",
    conceptBrief: {
      summary:
        "A fraction can be placed on a number line between 0 and 1 by splitting that space into equal parts — the denominator tells you how many parts, and the numerator tells you how many of those parts to count over.",
      workedExamples: ["To find 3/4 on a number line from 0 to 1, split the space into 4 equal parts and count over 3 of them."],
      commonMisconceptions: [
        "Splitting the number line into the wrong number of equal parts.",
        "Counting from the wrong end of the number line.",
      ],
    },
  },
  {
    slug: "g3-equivalent-fractions-3",
    subject: "math",
    gradeBand: "grade3",
    strand: "fractions-3",
    title: "Equivalent fractions (intro)",
    order: 3,
    generatorId: "g3-equivalent-fractions-3",
    videoId: "oGAVi4xb7Sg",
    videoTitle: "Equivalent fractions with visuals | Fractions | 3rd grade | Khan Academy",
    conceptBrief: {
      summary:
        "Equivalent fractions look different but represent the same amount. A simple way to see this is doubling both the top and bottom number of a fraction.",
      workedExamples: ["1/2 is the same amount as 2/4 (both the numerator and denominator were doubled)."],
      commonMisconceptions: [
        "Changing only the numerator or only the denominator, which changes the actual value.",
        "Adding the same number to both instead of multiplying.",
      ],
    },
  },
  {
    slug: "g3-compare-fractions-3",
    subject: "math",
    gradeBand: "grade3",
    strand: "fractions-3",
    title: "Comparing simple fractions",
    order: 4,
    generatorId: "g3-compare-fractions-3",
    videoId: "_Esc4JPE_FY",
    videoTitle: "Comparing fractions with the same denominator | Math | 3rd grade | Khan Academy",
    conceptBrief: {
      summary:
        "When two fractions have the same denominator, the one with the bigger numerator is bigger. When they have the same numerator, the one with the smaller denominator is bigger (since the pieces are larger).",
      workedExamples: ["3/5 > 2/5 because 3 is more pieces of the same size.", "1/3 > 1/4 because thirds are bigger pieces than fourths."],
      commonMisconceptions: [
        "Assuming a bigger denominator always means a bigger fraction.",
        "Comparing numerators when the denominators are actually different.",
      ],
    },
  },
];
