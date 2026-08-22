import type { Skill } from "./types";

export const MULTIPLICATION_SKILLS: Skill[] = [
  {
    slug: "mult-2digit-1digit",
    subject: "math",
    strand: "multiplication",
    title: "Multiplying a 2-digit number by a 1-digit number",
    order: 1,
    generatorId: "mult-2digit-1digit",
    conceptBrief: {
      summary:
        "To multiply a bigger number by a small one, split the bigger number into tens and ones, multiply each part separately, then add the results back together. This is called the distributive property.",
      workedExamples: [
        "23 × 4: split 23 into 20 and 3. 20 × 4 = 80, 3 × 4 = 12. 80 + 12 = 92.",
        "47 × 6: split 47 into 40 and 7. 40 × 6 = 240, 7 × 6 = 42. 240 + 42 = 282.",
      ],
      commonMisconceptions: [
        "Forgetting to multiply BOTH parts by the small number (only multiplying the tens, or only the ones).",
        "Adding the two partial products incorrectly by misaligning place value.",
      ],
    },
  },
  {
    slug: "mult-3digit-1digit",
    subject: "math",
    strand: "multiplication",
    title: "Multiplying a 3-digit number by a 1-digit number",
    order: 2,
    generatorId: "mult-3digit-1digit",
    conceptBrief: {
      summary:
        "Same idea as 2-digit multiplication, but now you split the number into hundreds and the rest, multiply each piece by the 1-digit number, then add the pieces together.",
      workedExamples: [
        "312 × 3: split into 300 and 12. 300 × 3 = 900, 12 × 3 = 36. 900 + 36 = 936.",
        "456 × 5: split into 400 and 56. 400 × 5 = 2000, 56 × 5 = 280. 2000 + 280 = 2280.",
      ],
      commonMisconceptions: [
        "Losing track of place value when the hundreds digit multiplies out to a big number.",
        "Forgetting to carry over when a partial product is greater than 9 in a column.",
      ],
    },
  },
  {
    slug: "mult-2digit-2digit",
    subject: "math",
    strand: "multiplication",
    title: "Multiplying two 2-digit numbers",
    order: 3,
    generatorId: "mult-2digit-2digit",
    conceptBrief: {
      summary:
        "Break one of the numbers into tens and ones, multiply the OTHER whole number by each part, then add the two results. This takes an extra step compared to single-digit multiplication, so it helps to write down the partial products.",
      workedExamples: [
        "23 × 14: split 14 into 10 and 4. 23 × 10 = 230, 23 × 4 = 92. 230 + 92 = 322.",
        "36 × 21: split 21 into 20 and 1. 36 × 20 = 720, 36 × 1 = 36. 720 + 36 = 756.",
      ],
      commonMisconceptions: [
        "Only multiplying by one part of the split number instead of both.",
        "Adding the partial products before lining up place value correctly.",
      ],
    },
  },
  {
    slug: "mult-multidigit",
    subject: "math",
    strand: "multiplication",
    title: "Multiplying larger numbers by a 2-digit number",
    order: 4,
    generatorId: "mult-multidigit",
    conceptBrief: {
      summary:
        "The same splitting strategy scales up: break the 2-digit number into tens and ones, multiply the larger number by each part, then add. It just takes more careful bookkeeping since the numbers are bigger.",
      workedExamples: [
        "1234 × 12: split 12 into 10 and 2. 1234 × 10 = 12340, 1234 × 2 = 2468. 12340 + 2468 = 14808.",
      ],
      commonMisconceptions: [
        "Losing a digit when writing out a large partial product.",
        "Rushing the addition step at the end and misaligning columns.",
      ],
    },
  },
  {
    slug: "mult-by-powers-of-ten",
    subject: "math",
    strand: "multiplication",
    title: "Multiplying by 10, 100, and 1000",
    order: 5,
    generatorId: "mult-by-powers-of-ten",
    conceptBrief: {
      summary:
        "Multiplying by 10, 100, or 1000 just shifts every digit to the left — you can find the answer fast by counting the zeros in the power of ten and adding that many zeros to the end of the other number.",
      workedExamples: ["47 × 10 = 470 (add 1 zero).", "47 × 100 = 4700 (add 2 zeros)."],
      commonMisconceptions: [
        "Adding the wrong number of zeros.",
        "Thinking this trick works for multiplying by any number, not just powers of ten.",
      ],
    },
  },
];
