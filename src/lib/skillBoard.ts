import { SKILLS, type Skill } from "./skills";
import { listSkillStates } from "./repo";
import type { SkillStatus } from "./types";

export interface SkillBoardEntry {
  skill: Skill;
  status: SkillStatus;
  level: number;
  recommended: boolean;
}

export function getSkillBoard(profileId: number): SkillBoardEntry[] {
  const states = listSkillStates(profileId, "math");
  const stateByTopic = new Map(states.map((s) => [s.topic, s]));

  const entries: SkillBoardEntry[] = SKILLS.map((skill) => {
    const state = stateByTopic.get(skill.slug);
    return {
      skill,
      status: state?.status ?? "not_started",
      level: state?.level ?? 1,
      recommended: false,
    };
  });

  const recommended = entries.find((e) => e.status !== "mastered");
  if (recommended) recommended.recommended = true;

  return entries;
}
