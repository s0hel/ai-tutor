import type { ProblemGenerator } from "../types";
import { choice, makeOptions } from "../helpers";

interface DetailItem {
  passage: string;
  question: string;
  correctDetail: string;
  distractors: [string, string, string];
}

const ITEMS: DetailItem[] = [
  {
    passage:
      "Octopuses are famous for their intelligence. They can solve simple puzzles, open jars to reach food inside, and even use coconut shells as portable shelters. Some octopuses have also been observed squeezing through gaps barely wider than their own eyeballs.",
    question: "Which detail from the passage shows that octopuses can use tools?",
    correctDetail: "They use coconut shells as portable shelters.",
    distractors: [
      "They can squeeze through very narrow gaps.",
      "They are considered highly intelligent animals.",
      "Their eyeballs are wider than most gaps they fit through.",
    ],
  },
  {
    passage:
      "The Great Barrier Reef, located off the coast of Australia, is the largest coral reef system in the world. It stretches over 1,400 miles and is home to thousands of species of fish, coral, and other marine life. Rising ocean temperatures have damaged parts of the reef in recent years.",
    question: "Which detail supports the idea that the Great Barrier Reef is enormous?",
    correctDetail: "It stretches over 1,400 miles.",
    distractors: [
      "It is located off the coast of Australia.",
      "Rising temperatures have damaged parts of it.",
      "It contains coral and marine life.",
    ],
  },
  {
    passage:
      "Building the first transcontinental railroad in the United States took over six years and employed tens of thousands of workers, many of them immigrants. Crews laid tracks through mountains, deserts, and harsh winters, often working in extremely dangerous conditions.",
    question: "Which detail shows how difficult the construction work was?",
    correctDetail: "Crews worked through mountains, deserts, and harsh winters in dangerous conditions.",
    distractors: [
      "The railroad took over six years to complete.",
      "Tens of thousands of workers were employed.",
      "Many of the workers were immigrants.",
    ],
  },
  {
    passage:
      "Penguins can't fly, but they are excellent swimmers, using their flipper-like wings to 'fly' through the water instead. Some species can dive over 500 feet deep and hold their breath for more than 20 minutes while hunting for fish.",
    question: "Which detail shows that penguins are strong divers?",
    correctDetail: "Some species can dive over 500 feet deep.",
    distractors: [
      "Penguins cannot fly through the air.",
      "Penguins have flipper-like wings.",
      "Penguins hunt for fish in the ocean.",
    ],
  },
  {
    passage:
      "The invention of the printing press in the 1400s allowed books to be copied far faster than by hand. Within decades, the price of books dropped dramatically, and literacy rates across Europe began to rise as more people gained access to reading material.",
    question: "Which detail shows that the printing press made reading more accessible to ordinary people?",
    correctDetail: "The price of books dropped dramatically within decades.",
    distractors: [
      "The printing press was invented in the 1400s.",
      "Books were previously copied by hand.",
      "The press could copy books faster than before.",
    ],
  },
  {
    passage:
      "Deserts receive very little rainfall, but many plants and animals have adapted to survive there. Cacti store water in their thick stems, while desert foxes have large ears that release body heat to help them stay cool during scorching days.",
    question: "Which detail explains how desert foxes stay cool?",
    correctDetail: "Their large ears release body heat.",
    distractors: [
      "Deserts receive very little rainfall.",
      "Cacti store water in their thick stems.",
      "Desert days can be scorching hot.",
    ],
  },
];

export const compSupportingDetails: ProblemGenerator = {
  skillSlug: "comp-supporting-details",
  generate() {
    const item = choice(ITEMS);
    const { options, correctId } = makeOptions(
      { kind: "text", value: item.correctDetail },
      item.distractors.map((d) => ({ kind: "text" as const, value: d }))
    );

    return {
      problemData: {
        prompt: { kind: "none" },
        options,
        instruction: `Read this passage: "${item.passage}" ${item.question}`,
      },
      answerType: "choice",
      correctAnswer: { type: "choice", value: correctId },
      hintLadder: [
        `Go back to the passage and look for the exact detail that answers the question.`,
        `The detail that answers it is: "${item.correctDetail}"`,
      ],
      explanation: `"${item.correctDetail}" is the detail from the passage that answers the question.`,
    };
  },
};
