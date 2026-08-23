import { SKILLS, type GradeBand, type Skill } from "./skills";
import { listSkillStates } from "./repo";
import type { SkillStatus } from "./types";

export interface SkillBoardEntry {
  skill: Skill;
  status: SkillStatus;
  level: number;
  recommended: boolean;
}

/** Pass a gradeBand to scope the board (and its "recommended next" pick) to just that grade's skills — omit it for a full, ungrouped overview (used by the parent dashboard). */
export async function getSkillBoard(profileId: number, gradeBand?: GradeBand): Promise<SkillBoardEntry[]> {
  const states = await listSkillStates(profileId, "math");
  const stateByTopic = new Map(states.map((s) => [s.topic, s]));
  const skillsInScope = gradeBand ? SKILLS.filter((s) => s.gradeBand === gradeBand) : SKILLS;

  const entries: SkillBoardEntry[] = skillsInScope.map((skill) => {
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
