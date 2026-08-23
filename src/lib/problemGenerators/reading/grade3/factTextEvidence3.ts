import type { ProblemGenerator } from "../../types";
import { choice, makeOptions } from "../../helpers";

interface EvidenceItem {
  passage: string;
  claim: string;
  correctEvidence: string;
  distractors: [string, string, string];
}

const ITEMS: EvidenceItem[] = [
  {
    passage:
      "Ants are very strong for their size. An ant can carry up to 50 times its own body weight. Ants also live in large groups called colonies, and some colonies can have thousands of ants working together.",
    claim: "Ants are strong for their size.",
    correctEvidence: "An ant can carry up to 50 times its own body weight.",
    distractors: [
      "Ants live in large groups called colonies.",
      "Some colonies can have thousands of ants.",
      "Ants work together in their colony.",
    ],
  },
  {
    passage:
      "Reading every day helps kids learn new words. Studies show that students who read for twenty minutes a day learn far more words than those who don't. Libraries also offer free books for anyone to borrow.",
    claim: "Reading every day builds a bigger vocabulary.",
    correctEvidence: "Students who read for twenty minutes a day learn far more words than those who don't.",
    distractors: [
      "Libraries offer free books for anyone to borrow.",
      "Some books have colorful pictures on every page.",
      "Reading can be done at home or at school.",
    ],
  },
  {
    passage:
      "Drinking enough water keeps your body working well. Water helps carry nutrients to your muscles and brain, giving you more energy. Doctors also recommend washing your hands often to stay healthy.",
    claim: "Water gives your body more energy.",
    correctEvidence: "Water helps carry nutrients to your muscles and brain, giving you more energy.",
    distractors: [
      "Doctors recommend washing your hands often.",
      "Water can be found in rivers and lakes.",
      "Some people prefer juice over water.",
    ],
  },
  {
    passage:
      "Elephants are very smart animals. They can recognize themselves in a mirror, which very few animals can do. Elephants also live in tight family groups, and adult elephants can weigh over 12,000 pounds.",
    claim: "Elephants are highly intelligent.",
    correctEvidence: "They can recognize themselves in a mirror, which very few animals can do.",
    distractors: [
      "Elephants live in tight family groups.",
      "Adult elephants can weigh over 12,000 pounds.",
      "Elephants have very large ears.",
    ],
  },
  {
    passage:
      "Bees are important for growing food. About one out of every three bites of food people eat depends on bees carrying pollen between plants. Bees also make honey, and a hive can hold thousands of bees.",
    claim: "Bees play a big role in helping food grow.",
    correctEvidence: "About one out of every three bites of food people eat depends on bees carrying pollen between plants.",
    distractors: [
      "Bees also make honey.",
      "A hive can hold thousands of bees.",
      "Bees can sting when they feel threatened.",
    ],
  },
  {
    passage:
      "Sleeping enough is important for kids. Getting a full night's sleep helps kids focus better in school and remember what they learned. Doctors also suggest turning off screens an hour before bedtime.",
    claim: "Sleep helps kids do better in school.",
    correctEvidence: "Getting a full night's sleep helps kids focus better in school and remember what they learned.",
    distractors: [
      "Doctors suggest turning off screens an hour before bedtime.",
      "Some kids like to read before bed.",
      "Bedtime is usually around eight or nine o'clock.",
    ],
  },
];

export const factTextEvidence3: ProblemGenerator = {
  skillSlug: "g3-fact-text-evidence",
  generate() {
    const item = choice(ITEMS);
    const { options, correctId } = makeOptions(
      { kind: "text", value: item.correctEvidence },
      item.distractors.map((d) => ({ kind: "text" as const, value: d }))
    );

    return {
      problemData: {
        prompt: { kind: "none" },
        options,
        instruction: `Read this passage: "${item.passage}" Which sentence from the passage best supports this claim: "${item.claim}"?`,
      },
      answerType: "choice",
      correctAnswer: { type: "choice", value: correctId },
      hintLadder: [
        `Go back to the passage and find the sentence that directly backs up the claim, not just one on the same topic.`,
        `The strongest evidence is: "${item.correctEvidence}"`,
      ],
      explanation: `"${item.correctEvidence}" directly supports the claim: "${item.claim}"`,
    };
  },
};
