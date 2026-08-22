export type Subject = "math" | "reading" | "gifted";

export interface ConceptBrief {
  summary: string;
  workedExamples: string[];
  commonMisconceptions: string[];
}

/** Minimal shape shared by math's `Skill` and gifted's `GTSkill` — enough for teach/practice/mastery to work generically across subjects. */
export interface TutorableSkill {
  slug: string;
  subject: Subject;
  title: string;
  conceptBrief: ConceptBrief;
}

export interface Profile {
  id: number;
  familyId: number;
  name: string;
  age: number;
  avatarKey: string;
  createdAt: string;
}

export interface Family {
  id: number;
  createdAt: string;
}

export interface Parent {
  id: number;
  familyId: number;
  googleSub: string;
  email: string;
  name: string | null;
  createdAt: string;
}

export interface ParentInvite {
  id: number;
  familyId: number;
  email: string;
  invitedByParentId: number;
  createdAt: string;
}

export type SkillStatus = "not_started" | "practicing" | "mastered";

export interface SkillState {
  profileId: number;
  subject: Subject;
  topic: string;
  level: number;
  streak: number;
  updatedAt: string;
  status: SkillStatus;
  masteredAt: string | null;
  lastReviewedAt: string | null;
  teachCompletedAt: string | null;
}

export interface Attempt {
  id: number;
  profileId: number;
  subject: Subject;
  topic: string;
  prompt: string;
  kidResponse: string | null;
  correct: number | null;
  timestamp: string;
}

export interface Badge {
  id: number;
  profileId: number;
  key: string;
  label: string;
  earnedAt: string;
}

export type ActivityType = "question" | "hint" | "feedback" | "story" | "celebration";

export interface TutorTurn {
  spokenText: string;
  displayText: string;
  activityType: ActivityType;
  topic: string;
  difficulty: number;
  isCorrectAnswer: boolean | null;
}

export interface ChatMessage {
  role: "tutor" | "kid";
  text: string;
  turn?: TutorTurn;
}

export const BADGES: Record<string, { label: string; description: string }> = {
  first_steps: { label: "First Steps", description: "Completed your first question" },
  streak_5: { label: "On a Roll", description: "5 correct answers in a row" },
  streak_10: { label: "Superstar", description: "10 correct answers in a row" },
  math_explorer: { label: "Math Explorer", description: "Tried 5 different math topics" },
  reading_explorer: { label: "Bookworm", description: "Tried 5 different reading topics" },
  gifted_explorer: { label: "Brain Booster", description: "Tried 5 different Brain Games puzzle types" },
  level_up: { label: "Level Up!", description: "Reached a new difficulty level" },
  daily_streak_3: { label: "3-Day Streak", description: "Practiced 3 days in a row" },
  daily_streak_7: { label: "Weekly Champ", description: "Practiced 7 days in a row" },
};

export const AVATARS = ["fox", "owl", "cat", "dragon", "robot", "bunny"] as const;
export type AvatarKey = (typeof AVATARS)[number];
