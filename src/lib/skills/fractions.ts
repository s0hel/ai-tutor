import type { Skill } from "./types";

export const FRACTION_SKILLS: Skill[] = [
  {
    slug: "fraction-equivalent",
    subject: "math",
    strand: "fractions",
    title: "Finding equivalent fractions",
    order: 1,
    generatorId: "fraction-equivalent",
    videoId: "N1X0vf5PUz4",
    videoTitle: "Intro to equivalent fractions | Khan Academy",
    conceptBrief: {
      summary:
        "Equivalent fractions represent the same amount written differently. If you multiply (or divide) both the numerator and denominator by the same number, the value doesn't change.",
      workedExamples: ["2/3 = 4/6 (multiplied top and bottom by 2).", "3/5 = 9/15 (multiplied top and bottom by 3)."],
      commonMisconceptions: [
        "Multiplying only the numerator or only the denominator, which changes the actual value.",
        "Adding the same number to both instead of multiplying.",
      ],
    },
  },
  {
    slug: "fraction-compare",
    subject: "math",
    strand: "fractions",
    title: "Comparing fractions",
    order: 2,
    generatorId: "fraction-compare",
    videoId: "zRjLZROI7wc",
    videoTitle: "Intro to comparing fractions with different denominators | Khan Academy",
    conceptBrief: {
      summary:
        "To compare fractions with different denominators, rewrite both with a common denominator first, then just compare the numerators.",
      workedExamples: ["Compare 2/3 and 3/4: common denominator 12 gives 8/12 and 9/12. 9/12 is bigger, so 3/4 > 2/3."],
      commonMisconceptions: [
        "Assuming the fraction with the bigger numerator or bigger denominator is automatically bigger.",
      ],
    },
  },
  {
    slug: "fraction-add-like",
    subject: "math",
    strand: "fractions",
    title: "Adding fractions with the same denominator",
    order: 3,
    generatorId: "fraction-add-like",
    conceptBrief: {
      summary: "When denominators already match, just add the numerators and keep the denominator the same.",
      workedExamples: ["1/5 + 2/5 = 3/5."],
      commonMisconceptions: ["Adding the denominators too, instead of keeping them the same."],
    },
  },
  {
    slug: "fraction-add-unlike",
    subject: "math",
    strand: "fractions",
    title: "Adding fractions with different denominators",
    order: 4,
    generatorId: "fraction-add-unlike",
    videoId: "bcCLKACsYJ0",
    videoTitle: "Adding fractions with unlike denominators | Khan Academy",
    conceptBrief: {
      summary:
        "First find a common denominator, rewrite both fractions using it, then add the numerators like before.",
      workedExamples: ["1/3 + 1/4: common denominator 12 gives 4/12 + 3/12 = 7/12."],
      commonMisconceptions: [
        "Adding numerators and denominators straight across without finding a common denominator first.",
      ],
    },
  },
  {
    slug: "fraction-simplify",
    subject: "math",
    strand: "fractions",
    title: "Simplifying fractions to lowest terms",
    order: 5,
    generatorId: "fraction-simplify",
    videoId: "WPimvspI0_c",
    videoTitle: "Fractions in lowest terms | Khan Academy",
    conceptBrief: {
      summary:
        "A fraction is in lowest terms when the numerator and denominator share no common factor besides 1. Find the largest number that divides evenly into both, then divide both by it.",
      workedExamples: ["8/12: both divide evenly by 4. 8÷4=2, 12÷4=3, so 8/12 = 2/3."],
      commonMisconceptions: [
        "Stopping after dividing by a common factor that isn't the largest one, leaving the fraction not fully simplified.",
      ],
    },
  },
  {
    slug: "fraction-mixed-improper",
    subject: "math",
    strand: "fractions",
    title: "Converting between mixed numbers and improper fractions",
    order: 6,
    generatorId: "fraction-mixed-improper",
    conceptBrief: {
      summary:
        "To go from a mixed number to an improper fraction: multiply the whole number by the denominator, add the numerator, and keep the same denominator. To go the other way: divide the numerator by the denominator — the quotient is the whole number, and the remainder becomes the new numerator.",
      workedExamples: ["2 1/3 → (2×3+1)/3 = 7/3.", "7/3 → 7÷3 = 2 remainder 1 → 2 1/3."],
      commonMisconceptions: ["Forgetting to add the numerator after multiplying the whole number by the denominator."],
    },
  },
  {
    slug: "fraction-multiply-whole",
    subject: "math",
    strand: "fractions",
    title: "Multiplying a fraction by a whole number",
    order: 7,
    generatorId: "fraction-multiply-whole",
    conceptBrief: {
      summary: "Multiply only the numerator by the whole number — the denominator stays the same.",
      workedExamples: ["2/5 × 3 = 6/5."],
      commonMisconceptions: ["Multiplying the denominator too, which changes the value."],
    },
  },
];
