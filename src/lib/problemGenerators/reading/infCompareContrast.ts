import type { ProblemGenerator } from "../types";
import { choice, makeOptions } from "../helpers";

interface CompareItem {
  passage: string;
  question: string;
  correctAnswer: string;
  distractors: [string, string, string];
}

const ITEMS: CompareItem[] = [
  {
    passage:
      "Both the fox and the wolf are wild canines that hunt for food, but the fox is much smaller and usually hunts alone, while wolves hunt in packs.",
    question: "What is one difference between foxes and wolves mentioned in the passage?",
    correctAnswer: "Foxes usually hunt alone, while wolves hunt in packs.",
    distractors: [
      "Foxes and wolves are not related animals.",
      "Only wolves are wild canines.",
      "Foxes are larger than wolves.",
    ],
  },
  {
    passage:
      "Both hurricanes and tornadoes are powerful rotating storms, but hurricanes form over warm ocean water and can last for days, while tornadoes form over land and usually last only minutes.",
    question: "What is one similarity between hurricanes and tornadoes mentioned in the passage?",
    correctAnswer: "Both are powerful rotating storms.",
    distractors: [
      "Both form only over land.",
      "Both typically last for several days.",
      "Neither storm involves rotation.",
    ],
  },
  {
    passage:
      "Both novels and short stories tell a fictional narrative, but novels are much longer and often follow several characters, while short stories are brief and usually focus on a single main event.",
    question: "What is one difference between novels and short stories mentioned in the passage?",
    correctAnswer: "Novels are longer and follow several characters, while short stories are brief.",
    distractors: [
      "Only novels are considered fiction.",
      "Short stories are always longer than novels.",
      "Novels never include more than one character.",
    ],
  },
  {
    passage:
      "Both crocodiles and alligators are large reptiles that live near water, but alligators have wider, U-shaped snouts, while crocodiles have narrower, V-shaped snouts.",
    question: "What is one similarity between crocodiles and alligators mentioned in the passage?",
    correctAnswer: "Both are large reptiles that live near water.",
    distractors: [
      "Both have identical snout shapes.",
      "Neither animal lives near water.",
      "Only crocodiles are reptiles.",
    ],
  },
  {
    passage:
      "Both soccer and basketball are team sports that use a ball, but soccer players mainly use their feet, while basketball players use their hands to score.",
    question: "What is one difference between soccer and basketball mentioned in the passage?",
    correctAnswer: "Soccer players mainly use their feet, while basketball players use their hands.",
    distractors: [
      "Soccer is not played with a ball.",
      "Basketball players are not allowed to run.",
      "Only soccer is considered a team sport.",
    ],
  },
  {
    passage:
      "Both the piano and the guitar are string instruments that can play many notes at once, but a piano uses hammers striking strings inside a wooden case, while a guitar's strings are plucked directly with fingers or a pick.",
    question: "What is one similarity between the piano and guitar mentioned in the passage?",
    correctAnswer: "Both are string instruments that can play many notes at once.",
    distractors: [
      "Both instruments are played by blowing air into them.",
      "Neither instrument uses strings.",
      "Only the guitar can play more than one note.",
    ],
  },
];

export const infCompareContrast: ProblemGenerator = {
  skillSlug: "inf-compare-contrast",
  generate() {
    const item = choice(ITEMS);
    const { options, correctId } = makeOptions(
      { kind: "text", value: item.correctAnswer },
      item.distractors.map((d) => ({ kind: "text" as const, value: d }))
    );

    return {
      problemData: {
        prompt: { kind: "none" },
        options,
        instruction: `Read this: "${item.passage}" ${item.question}`,
      },
      answerType: "choice",
      correctAnswer: { type: "choice", value: correctId },
      hintLadder: [
        `Look for clue words like both, similarly, but, or while that signal a comparison.`,
        `The answer is: "${item.correctAnswer}"`,
      ],
      explanation: `"${item.correctAnswer}" is what the passage says when comparing the two things.`,
    };
  },
};
