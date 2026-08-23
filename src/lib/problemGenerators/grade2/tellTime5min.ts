import type { ProblemGenerator } from "../types";
import { randInt } from "../helpers";

export const tellTime5min: ProblemGenerator = {
  skillSlug: "g2-tell-time-5min",
  generate() {
    const hour = randInt(1, 12);
    const minuteSteps = randInt(1, 11);
    const minutes = minuteSteps * 5;
    const displayTime = `${hour}:${String(minutes).padStart(2, "0")}`;

    return {
      problemData: {
        instruction: `On a clock, the hour hand is a little past the ${hour}, and the minute hand is pointing at the ${minuteSteps} (counting by 5s around the clock). What time is it?`,
      },
      answerType: "text",
      correctAnswer: { type: "text", value: displayTime, acceptedAliases: [`${hour}:${minutes}`] },
      hintLadder: [
        `Each number on the clock face stands for 5 minutes — the minute hand is at the ${minuteSteps}, so count by 5s: ${Array.from({ length: minuteSteps }, (_, i) => (i + 1) * 5).join(", ")}.`,
        `That's ${minutes} minutes, so the time is ${displayTime}.`,
      ],
      explanation: `The time is ${displayTime}.`,
    };
  },
};
