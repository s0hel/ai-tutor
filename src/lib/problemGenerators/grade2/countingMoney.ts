import type { ProblemGenerator } from "../types";
import { randInt } from "../helpers";

const COINS = [
  { name: "quarter", value: 25 },
  { name: "dime", value: 10 },
  { name: "nickel", value: 5 },
  { name: "penny", value: 1 },
] as const;

export const countingMoney: ProblemGenerator = {
  skillSlug: "g2-counting-money",
  generate() {
    const counts = COINS.map((c) => ({ ...c, count: randInt(0, 3) }));
    const nonZero = counts.filter((c) => c.count > 0);
    if (nonZero.length === 0) nonZero.push({ ...COINS[1], count: 2 });
    const total = nonZero.reduce((sum, c) => sum + c.value * c.count, 0);
    const description = nonZero.map((c) => `${c.count} ${c.name}${c.count > 1 ? "s" : ""}`).join(", ");

    return {
      problemData: { instruction: `How many cents is ${description} worth in total?` },
      answerType: "integer",
      correctAnswer: { type: "integer", value: total },
      hintLadder: [
        `Start with the coin worth the most, then add the smaller ones.`,
        nonZero.map((c) => `${c.count} × ${c.value}¢ = ${c.count * c.value}¢`).join(", "),
      ],
      explanation: `${description} = ${total}¢.`,
    };
  },
};
