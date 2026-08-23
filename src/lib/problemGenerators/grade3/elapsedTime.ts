import type { ProblemGenerator } from "../types";
import { randInt } from "../helpers";

export const elapsedTime: ProblemGenerator = {
  skillSlug: "g3-elapsed-time",
  generate() {
    const startHour = randInt(1, 11);
    const startMinuteSteps = randInt(0, 11);
    const startMinute = startMinuteSteps * 5;
    const durationSteps = randInt(1, 11 - startMinuteSteps);
    const duration = durationSteps * 5;
    const endMinute = startMinute + duration;
    const startDisplay = `${startHour}:${String(startMinute).padStart(2, "0")}`;
    const endDisplay = `${startHour}:${String(endMinute).padStart(2, "0")}`;

    return {
      problemData: {
        instruction: `A movie starts at ${startDisplay} and ends at ${endDisplay}. How many minutes long is the movie?`,
      },
      answerType: "integer",
      correctAnswer: { type: "integer", value: duration },
      hintLadder: [
        `Count by 5s from the start time's minutes to the end time's minutes.`,
        `From ${startMinute} minutes to ${endMinute} minutes is ${duration} minutes.`,
      ],
      explanation: `From ${startDisplay} to ${endDisplay} is ${duration} minutes.`,
    };
  },
};
