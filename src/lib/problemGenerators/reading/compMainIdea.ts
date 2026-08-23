import type { ProblemGenerator } from "../types";
import { choice, makeOptions } from "../helpers";

interface MainIdeaItem {
  passage: string;
  correctIdea: string;
  distractors: [string, string, string];
}

const ITEMS: MainIdeaItem[] = [
  {
    passage:
      "Honeybees visit flowers to collect nectar, which they turn into honey back at the hive. As they move from flower to flower, pollen sticks to their bodies and gets carried along, helping plants reproduce. Without bees, many fruits and vegetables would struggle to grow.",
    correctIdea: "Bees help plants grow while collecting food for themselves.",
    distractors: [
      "Bees only visit flowers that are brightly colored.",
      "Honey is made entirely inside a flower.",
      "Bees are the only insects that pollinate flowers.",
    ],
  },
  {
    passage:
      "Maria practiced free throws every single day after school, even when her arms were sore. Her coach noticed her improvement and moved her up to the varsity team. By the end of the season, Maria had become one of the most reliable shooters on the squad.",
    correctIdea: "Consistent practice helped Maria become a much better basketball player.",
    distractors: [
      "Maria's coach was too strict with the team.",
      "Basketball practice happens every day after school.",
      "Varsity teams only accept the tallest players.",
    ],
  },
  {
    passage:
      "Volcanoes form when melted rock, called magma, pushes up through cracks in the Earth's crust. When a volcano erupts, the magma — now called lava — can flow for miles, destroying buildings and forests in its path. Scientists study volcanoes closely to predict eruptions and warn nearby towns.",
    correctIdea: "Volcanoes form from magma and can be dangerous, so scientists study them to protect people.",
    distractors: [
      "Lava only travels a few feet before stopping.",
      "All volcanoes erupt at the exact same time each year.",
      "Magma is a type of rock found only underwater.",
    ],
  },
  {
    passage:
      "The class took a field trip to the science museum, where they watched a planetarium show about the solar system and did a hands-on experiment mixing chemicals to create a color-changing reaction. Several students said it was the best school trip they'd ever taken.",
    correctIdea: "A class enjoyed a fun and educational trip to a science museum.",
    distractors: [
      "The planetarium show was about ocean animals.",
      "The students disliked the chemistry experiment.",
      "The field trip lasted an entire week.",
    ],
  },
  {
    passage:
      "Wolves live and hunt in groups called packs, usually led by an experienced pair. Working together lets them take down prey much larger than a single wolf could manage alone, and pack members also help raise and protect the pups.",
    correctIdea: "Wolves rely on teamwork within their pack to hunt and raise their young.",
    distractors: [
      "Wolves always hunt completely alone.",
      "Only the oldest wolf in a pack is allowed to eat.",
      "Wolf pups are raised by other animal species.",
    ],
  },
  {
    passage:
      "Before refrigerators were common, people used to store blocks of ice cut from frozen lakes to keep food cold through the summer. Ice was cut in winter, packed in sawdust to slow melting, and delivered door-to-door by workers called icemen.",
    correctIdea: "People once used stored winter ice, delivered by icemen, to keep food cold before refrigerators existed.",
    distractors: [
      "Refrigerators were invented before ice delivery began.",
      "Icemen only worked during the summer months.",
      "Sawdust was used to make the ice colder.",
    ],
  },
];

export const compMainIdea: ProblemGenerator = {
  skillSlug: "comp-main-idea",
  generate() {
    const item = choice(ITEMS);
    const { options, correctId } = makeOptions(
      { kind: "text", value: item.correctIdea },
      item.distractors.map((d) => ({ kind: "text" as const, value: d }))
    );

    return {
      problemData: {
        prompt: { kind: "none" },
        options,
        instruction: `Read this passage: "${item.passage}" What is the main idea of this passage?`,
      },
      answerType: "choice",
      correctAnswer: { type: "choice", value: correctId },
      hintLadder: [
        `Think about what the WHOLE passage is mostly about, not just one detail from it.`,
        `The passage is mainly about: ${item.correctIdea}`,
      ],
      explanation: `The main idea is: "${item.correctIdea}" — it captures what the whole passage is about, not just a single detail.`,
    };
  },
};
