import type { Skill } from "../types";

export const ADDITION_SUBTRACTION_2_SKILLS: Skill[] = [
  {
    slug: "g2-add-2digit-regrouping",
    subject: "math",
    gradeBand: "grade2",
    strand: "addition-subtraction-2",
    title: "Adding 2-digit numbers with regrouping",
    order: 1,
    generatorId: "g2-add-2digit-regrouping",
    videoId: "8mcTsyV56jI",
    videoTitle: "Addition with regrouping | Addition and subtraction within 100 | Early Math | Khan Academy",
    conceptBrief: {
      summary:
        "When adding the ones column gives 10 or more, regroup: write down the ones digit and carry a group of ten over to the tens column.",
      workedExamples: ["27 + 15: ones are 7+5=12, write 2 and carry 1 ten. Tens are 2+1+1=4. So 27+15=42."],
      commonMisconceptions: [
        "Forgetting to carry the extra ten into the tens column.",
        "Writing the whole two-digit sum (12) in the ones place instead of just the ones digit.",
      ],
    },
  },
  {
    slug: "g2-subtract-2digit-regrouping",
    subject: "math",
    gradeBand: "grade2",
    strand: "addition-subtraction-2",
    title: "Subtracting 2-digit numbers with regrouping",
    order: 2,
    generatorId: "g2-subtract-2digit-regrouping",
    videoId: "egjDLFX9VHg",
    videoTitle: "Subtracting with regrouping (borrowing) | Early Math | Khan Academy",
    conceptBrief: {
      summary:
        "When the ones digit on top is smaller than the ones digit being subtracted, regroup: borrow a ten from the tens column and add it to the ones.",
      workedExamples: ["52 - 27: ones need borrowing — borrow 1 ten from 5 tens, making 12 - 7 = 5. Tens become 4 - 2 = 2. So 52-27=25."],
      commonMisconceptions: [
        "Subtracting the smaller digit from the larger digit regardless of which is on top (e.g. doing 7-2 instead of borrowing).",
        "Forgetting to reduce the tens digit by 1 after borrowing.",
      ],
    },
  },
  {
    slug: "g2-add-subtract-word-problems-2",
    subject: "math",
    gradeBand: "grade2",
    strand: "addition-subtraction-2",
    title: "Addition and subtraction word problems within 100",
    order: 3,
    generatorId: "g2-add-subtract-word-problems-2",
    conceptBrief: {
      summary:
        "Read the story carefully to decide if things are being combined (add) or if something is being removed/compared (subtract), then solve using the numbers within 100.",
      workedExamples: [
        "A class has 34 pencils and gets 18 more. How many now? 34 + 18 = 52.",
        "A class has 52 pencils and gives away 18. How many are left? 52 - 18 = 34.",
      ],
      commonMisconceptions: [
        "Picking the wrong operation because a keyword (like 'more') is misread as always meaning addition.",
        "Mixing up which number is the starting amount.",
      ],
    },
  },
  {
    slug: "g2-add-3digit-no-regroup",
    subject: "math",
    gradeBand: "grade2",
    strand: "addition-subtraction-2",
    title: "Adding 3-digit numbers without regrouping",
    order: 4,
    generatorId: "g2-add-3digit-no-regroup",
    conceptBrief: {
      summary:
        "Add 3-digit numbers by adding each place value column separately — hundreds with hundreds, tens with tens, ones with ones — from right to left.",
      workedExamples: ["213 + 154: ones 3+4=7, tens 1+5=6, hundreds 2+1=3. So 213+154=367."],
      commonMisconceptions: [
        "Adding digits from the wrong columns together (misaligning place value).",
        "Adding left to right and losing track of a column.",
      ],
    },
  },
];
