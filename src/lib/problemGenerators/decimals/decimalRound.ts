import type { ProblemGenerator } from "../types";
import { choice, randInt } from "../helpers";

export const decimalRound: ProblemGenerator = {
  skillSlug: "decimal-round",
  generate(level) {
    const whole = randInt(0, 9);
    const tenths = randInt(0, 9);
    const hundredths = randInt(0, 9);
    const decimalText = `${whole}.${tenths}${hundredths}`;
    const decimalValue = Number(decimalText);
    const roundTo = choice(level < 5 ? (["whole"] as const) : (["whole", "tenth"] as const));

    const answer = roundTo === "whole" ? Math.round(decimalValue) : Number(decimalValue.toFixed(1));

    return {
      problemData: { decimal: decimalText, roundTo },
      answerType: roundTo === "whole" ? "integer" : "decimal",
      correctAnswer:
        roundTo === "whole"
          ? { type: "integer", value: answer }
          : { type: "decimal", value: answer },
      hintLadder: [
        roundTo === "whole"
          ? `Look at the digit right after the decimal point to decide whether to round up or down.`
          : `Look at the hundredths digit to decide whether the tenths digit rounds up or stays.`,
        roundTo === "whole"
          ? `${decimalText} is closer to ${answer} than to any other whole number.`
          : `${decimalText} rounds to ${answer} at the nearest tenth.`,
      ],
      explanation: `${decimalText} rounded to the nearest ${roundTo === "whole" ? "whole number" : "tenth"} is ${answer}.`,
    };
  },
};
