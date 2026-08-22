import type { ProblemGenerator } from "../types";
import { choice, randInt } from "../helpers";

const ITEM_NOUNS = ["stickers", "cookies", "marbles", "pencils", "toy cars", "cupcakes"] as const;

export const divRemainderInterpretation: ProblemGenerator = {
  skillSlug: "div-remainder-interpretation",
  generate(level) {
    const groupSize = randInt(3, level < 5 ? 6 : 9);
    const fullGroups = randInt(level < 5 ? 3 : 6, level < 5 ? 8 : 15);
    const remainder = randInt(1, groupSize - 1);
    const totalItems = groupSize * fullGroups + remainder;
    const item = choice(ITEM_NOUNS);
    const roundUp = Math.random() < 0.5;
    const answer = roundUp ? fullGroups + 1 : fullGroups;

    return {
      problemData: {
        totalItems,
        groupSize,
        item,
        scenario: roundUp ? "containers-needed" : "full-groups-only",
      },
      answerType: "integer",
      correctAnswer: { type: "integer", value: answer },
      hintLadder: [
        `${totalItems} ÷ ${groupSize} = ${fullGroups} with ${remainder} left over.`,
        roundUp
          ? `Those ${remainder} leftover ${item} still need somewhere to go, so you need one more group than ${fullGroups}.`
          : `The question only asks about full, complete groups — the ${remainder} leftover ${item} don't count as another group.`,
      ],
      explanation: roundUp
        ? `${totalItems} ÷ ${groupSize} = ${fullGroups} remainder ${remainder}, and since the leftovers still need a spot, you round up to ${answer}.`
        : `${totalItems} ÷ ${groupSize} = ${fullGroups} remainder ${remainder}, and since only full groups count, the answer stays ${answer}.`,
    };
  },
};
