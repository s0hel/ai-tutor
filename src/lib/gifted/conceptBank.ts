/**
 * Curated real-world concepts for the Verbal battery (Picture Analogies, Sentence Completion,
 * Picture Classification). Verbal COGAT items test vocabulary/category knowledge, not shape
 * geometry, so these render as emoji (+ a short text label for disambiguation, since several
 * baby animals share their parent's emoji) rather than abstract ShapeSpecs.
 */
export type ConceptCategory =
  | "animal"
  | "vehicle"
  | "food"
  | "tool"
  | "clothing"
  | "furniture"
  | "nature"
  | "place"
  | "object"
  | "bodyPart"
  | "feeling";

export interface Concept {
  id: string;
  emoji: string;
  label: string;
  category: ConceptCategory;
  tags: string[];
}

export const CONCEPTS: Concept[] = [
  // Animals
  { id: "dog", emoji: "🐶", label: "dog", category: "animal", tags: ["pet", "land", "4legs"] },
  { id: "cat", emoji: "🐱", label: "cat", category: "animal", tags: ["pet", "land", "4legs"] },
  { id: "cow", emoji: "🐄", label: "cow", category: "animal", tags: ["farm", "land", "4legs", "milk"] },
  { id: "pig", emoji: "🐷", label: "pig", category: "animal", tags: ["farm", "land", "4legs"] },
  { id: "horse", emoji: "🐴", label: "horse", category: "animal", tags: ["farm", "land", "4legs"] },
  { id: "sheep", emoji: "🐑", label: "sheep", category: "animal", tags: ["farm", "land", "4legs", "wool"] },
  { id: "chicken", emoji: "🐔", label: "chicken", category: "animal", tags: ["farm", "2legs", "layseggs"] },
  { id: "duck", emoji: "🦆", label: "duck", category: "animal", tags: ["farm", "swims", "2legs", "layseggs"] },
  { id: "fish", emoji: "🐟", label: "fish", category: "animal", tags: ["water", "swims"] },
  { id: "bird", emoji: "🐦", label: "bird", category: "animal", tags: ["flies", "2legs", "wings"] },
  { id: "elephant", emoji: "🐘", label: "elephant", category: "animal", tags: ["wild", "land", "4legs", "big"] },
  { id: "lion", emoji: "🦁", label: "lion", category: "animal", tags: ["wild", "land", "4legs"] },
  { id: "tiger", emoji: "🐯", label: "tiger", category: "animal", tags: ["wild", "land", "4legs"] },
  { id: "bear", emoji: "🐻", label: "bear", category: "animal", tags: ["wild", "land", "4legs"] },
  { id: "rabbit", emoji: "🐰", label: "rabbit", category: "animal", tags: ["pet", "land", "4legs", "small"] },
  { id: "mouse", emoji: "🐭", label: "mouse", category: "animal", tags: ["land", "4legs", "small"] },
  { id: "frog", emoji: "🐸", label: "frog", category: "animal", tags: ["water", "land", "jumps"] },
  { id: "bee", emoji: "🐝", label: "bee", category: "animal", tags: ["flies", "small", "insect"] },
  { id: "butterfly", emoji: "🦋", label: "butterfly", category: "animal", tags: ["flies", "insect"] },
  { id: "snake", emoji: "🐍", label: "snake", category: "animal", tags: ["land", "no-legs"] },
  // Baby animals (share the parent's emoji where no distinct one exists — the label disambiguates)
  { id: "puppy", emoji: "🐶", label: "puppy", category: "animal", tags: ["baby", "pet"] },
  { id: "kitten", emoji: "🐱", label: "kitten", category: "animal", tags: ["baby", "pet"] },
  { id: "calf", emoji: "🐄", label: "calf", category: "animal", tags: ["baby", "farm"] },
  { id: "piglet", emoji: "🐷", label: "piglet", category: "animal", tags: ["baby", "farm"] },
  { id: "foal", emoji: "🐴", label: "foal", category: "animal", tags: ["baby", "farm"] },
  { id: "lamb", emoji: "🐑", label: "lamb", category: "animal", tags: ["baby", "farm"] },
  { id: "chick", emoji: "🐤", label: "chick", category: "animal", tags: ["baby", "farm"] },
  { id: "duckling", emoji: "🐥", label: "duckling", category: "animal", tags: ["baby", "farm"] },
  { id: "cub", emoji: "🐻", label: "cub", category: "animal", tags: ["baby", "wild"] },
  // Vehicles
  { id: "car", emoji: "🚗", label: "car", category: "vehicle", tags: ["wheels", "road"] },
  { id: "truck", emoji: "🚚", label: "truck", category: "vehicle", tags: ["wheels", "road"] },
  { id: "bus", emoji: "🚌", label: "bus", category: "vehicle", tags: ["wheels", "road"] },
  { id: "bike", emoji: "🚲", label: "bike", category: "vehicle", tags: ["wheels", "road"] },
  { id: "train", emoji: "🚂", label: "train", category: "vehicle", tags: ["wheels", "tracks"] },
  { id: "boat", emoji: "⛵", label: "boat", category: "vehicle", tags: ["water"] },
  { id: "airplane", emoji: "✈️", label: "airplane", category: "vehicle", tags: ["flies", "sky"] },
  { id: "helicopter", emoji: "🚁", label: "helicopter", category: "vehicle", tags: ["flies", "sky"] },
  // Foods
  { id: "apple", emoji: "🍎", label: "apple", category: "food", tags: ["fruit"] },
  { id: "banana", emoji: "🍌", label: "banana", category: "food", tags: ["fruit"] },
  { id: "pizza", emoji: "🍕", label: "pizza", category: "food", tags: ["meal"] },
  { id: "bread", emoji: "🍞", label: "bread", category: "food", tags: ["meal"] },
  { id: "cheese", emoji: "🧀", label: "cheese", category: "food", tags: ["dairy"] },
  { id: "egg", emoji: "🥚", label: "egg", category: "food", tags: ["breakfast"] },
  { id: "milk", emoji: "🥛", label: "milk", category: "food", tags: ["dairy", "drink"] },
  { id: "cake", emoji: "🎂", label: "cake", category: "food", tags: ["sweet"] },
  { id: "cookie", emoji: "🍪", label: "cookie", category: "food", tags: ["sweet"] },
  { id: "icecream", emoji: "🍦", label: "ice cream", category: "food", tags: ["sweet", "cold"] },
  { id: "carrot", emoji: "🥕", label: "carrot", category: "food", tags: ["vegetable"] },
  // Tools
  { id: "hammer", emoji: "🔨", label: "hammer", category: "tool", tags: [] },
  { id: "scissors", emoji: "✂️", label: "scissors", category: "tool", tags: [] },
  { id: "pencil", emoji: "✏️", label: "pencil", category: "tool", tags: [] },
  { id: "key", emoji: "🔑", label: "key", category: "tool", tags: [] },
  { id: "spoon", emoji: "🥄", label: "spoon", category: "tool", tags: [] },
  { id: "needle", emoji: "🪡", label: "needle", category: "tool", tags: [] },
  { id: "paintbrush", emoji: "🖌️", label: "paintbrush", category: "tool", tags: [] },
  { id: "wrench", emoji: "🔧", label: "wrench", category: "tool", tags: [] },
  // Objects tools act on (used for "usedFor" analogy pairs)
  { id: "door", emoji: "🚪", label: "door", category: "object", tags: [] },
  { id: "paper", emoji: "📄", label: "paper", category: "object", tags: [] },
  { id: "bowl", emoji: "🥣", label: "bowl", category: "object", tags: [] },
  { id: "nail", emoji: "🔩", label: "nail", category: "object", tags: [] },
  { id: "thread", emoji: "🧵", label: "thread", category: "object", tags: [] },
  { id: "wheel", emoji: "🛞", label: "wheel", category: "object", tags: [] },
  // Clothing
  { id: "shirt", emoji: "👕", label: "shirt", category: "clothing", tags: [] },
  { id: "hat", emoji: "🎩", label: "hat", category: "clothing", tags: [] },
  { id: "shoe", emoji: "👟", label: "shoe", category: "clothing", tags: [] },
  { id: "sock", emoji: "🧦", label: "sock", category: "clothing", tags: [] },
  { id: "glove", emoji: "🧤", label: "glove", category: "clothing", tags: [] },
  { id: "coat", emoji: "🧥", label: "coat", category: "clothing", tags: [] },
  // Furniture
  { id: "chair", emoji: "🪑", label: "chair", category: "furniture", tags: [] },
  { id: "bed", emoji: "🛏️", label: "bed", category: "furniture", tags: [] },
  { id: "sofa", emoji: "🛋️", label: "sofa", category: "furniture", tags: [] },
  { id: "lamp", emoji: "💡", label: "lamp", category: "furniture", tags: [] },
  // Nature
  { id: "sun", emoji: "☀️", label: "sun", category: "nature", tags: ["hot", "day"] },
  { id: "moon", emoji: "🌙", label: "moon", category: "nature", tags: ["night"] },
  { id: "star", emoji: "⭐", label: "star", category: "nature", tags: ["night"] },
  { id: "cloud", emoji: "☁️", label: "cloud", category: "nature", tags: [] },
  { id: "snowflake", emoji: "❄️", label: "snowflake", category: "nature", tags: ["cold"] },
  { id: "tree", emoji: "🌳", label: "tree", category: "nature", tags: [] },
  { id: "flower", emoji: "🌸", label: "flower", category: "nature", tags: [] },
  { id: "leaf", emoji: "🍃", label: "leaf", category: "nature", tags: [] },
  { id: "branch", emoji: "🌿", label: "branch", category: "nature", tags: [] },
  { id: "mountain", emoji: "⛰️", label: "mountain", category: "nature", tags: [] },
  { id: "ocean", emoji: "🌊", label: "ocean", category: "nature", tags: ["water"] },
  // Places
  { id: "nest", emoji: "🪺", label: "nest", category: "place", tags: [] },
  { id: "doghouse", emoji: "🏠", label: "doghouse", category: "place", tags: [] },
  { id: "barn", emoji: "🏚️", label: "barn", category: "place", tags: [] },
  { id: "beehive", emoji: "🍯", label: "beehive", category: "place", tags: [] },
  { id: "burrow", emoji: "🕳️", label: "burrow", category: "place", tags: [] },
  // Body parts
  { id: "hand", emoji: "✋", label: "hand", category: "bodyPart", tags: [] },
  { id: "finger", emoji: "👆", label: "finger", category: "bodyPart", tags: [] },
  { id: "eye", emoji: "👁️", label: "eye", category: "bodyPart", tags: [] },
  { id: "ear", emoji: "👂", label: "ear", category: "bodyPart", tags: [] },
  // Feelings
  { id: "happy", emoji: "😊", label: "happy", category: "feeling", tags: [] },
  { id: "sad", emoji: "😢", label: "sad", category: "feeling", tags: [] },
];

export const CATEGORY_LABELS: Record<ConceptCategory, string> = {
  animal: "animals",
  vehicle: "vehicles",
  food: "foods",
  tool: "tools",
  clothing: "clothes",
  furniture: "furniture",
  nature: "things in nature",
  place: "places",
  object: "objects",
  bodyPart: "parts of your body",
  feeling: "feelings",
};

const byId = new Map(CONCEPTS.map((c) => [c.id, c]));
export function getConcept(id: string): Concept {
  const c = byId.get(id);
  if (!c) throw new Error(`Unknown concept: ${id}`);
  return c;
}

export type RelationName = "babyOf" | "livesIn" | "usedFor" | "opposite" | "partOf";

/** Precomputed [subject, object] concept-id pairs for each relation, e.g. babyOf: ["puppy", "dog"] means "a puppy is a baby dog". */
export const RELATIONS: Record<RelationName, [string, string][]> = {
  babyOf: [
    ["puppy", "dog"],
    ["kitten", "cat"],
    ["calf", "cow"],
    ["piglet", "pig"],
    ["foal", "horse"],
    ["lamb", "sheep"],
    ["chick", "chicken"],
    ["duckling", "duck"],
    ["cub", "bear"],
  ],
  livesIn: [
    ["bird", "nest"],
    ["dog", "doghouse"],
    ["cow", "barn"],
    ["bee", "beehive"],
    ["rabbit", "burrow"],
    ["fish", "ocean"],
  ],
  usedFor: [
    ["key", "door"],
    ["pencil", "paper"],
    ["scissors", "paper"],
    ["spoon", "bowl"],
    ["hammer", "nail"],
    ["needle", "thread"],
  ],
  opposite: [
    ["elephant", "mouse"],
    ["sun", "snowflake"],
    ["sun", "moon"],
    ["happy", "sad"],
  ],
  partOf: [
    ["wheel", "car"],
    ["leaf", "tree"],
    ["branch", "tree"],
    ["finger", "hand"],
  ],
};

export interface Riddle {
  tag: string;
  question: string;
}

/** "Which one ___?" templates keyed by a tag — Sentence Completion picks a concept with the tag as the answer. */
export const RIDDLES: Riddle[] = [
  { tag: "flies", question: "Which one flies in the sky?" },
  { tag: "swims", question: "Which one swims in the water?" },
  { tag: "pet", question: "Which one is a pet you could have at home?" },
  { tag: "farm", question: "Which one lives on a farm?" },
  { tag: "wild", question: "Which one lives in the wild?" },
  { tag: "baby", question: "Which one is a baby animal?" },
  { tag: "sweet", question: "Which one tastes sweet?" },
  { tag: "cold", question: "Which one feels cold?" },
  { tag: "hot", question: "Which one feels hot?" },
  { tag: "wheels", question: "Which one has wheels?" },
  { tag: "insect", question: "Which one is a bug?" },
  { tag: "water", question: "Which one lives in water?" },
];
