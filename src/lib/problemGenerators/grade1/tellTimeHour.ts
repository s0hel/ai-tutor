import type { ProblemGenerator } from "../types";
import { randInt } from "../helpers";

export const tellTimeHour: ProblemGenerator = {
  skillSlug: "g1-tell-time-hour",
  generate() {
    const hour = randInt(1, 12);
    const isHalf = Math.random() < 0.5;
    const displayTime = isHalf ? `${hour}:30` : `${hour}:00`;
    const minuteHandDescription = isHalf ? "pointing straight down at the 6" : "pointing straight up at the 12";
    const hourHandDescription = isHalf ? `pointing between the ${hour} and the ${(hour % 12) + 1}` : `pointing at the ${hour}`;

    return {
      problemData: {
        instruction: `On a clock, the hour hand is ${hourHandDescription}, and the minute hand is ${minuteHandDescription}. What time is it?`,
      },
      answerType: "text",
      correctAnswer: {
        type: "text",
        value: displayTime,
        acceptedAliases: isHalf ? [`half past ${hour}`, `${hour}:30`] : [`${hour} o'clock`, `${hour}:00`, String(hour)],
      },
      hintLadder: [
        isHalf
          ? `When the minute hand points straight down, it's half past the hour.`
          : `When the minute hand points straight up, it's exactly on the hour.`,
        `The time is ${displayTime}.`,
      ],
      explanation: `The time is ${displayTime}.`,
    };
  },
};
