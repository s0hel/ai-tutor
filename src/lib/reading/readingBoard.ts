import { READING_SKILLS, type GradeBand, type ReadingSkill } from "./index";
import { listSkillStates } from "../repo";
import type { SkillStatus } from "../types";

export interface ReadingBoardEntry {
  skill: ReadingSkill;
  status: SkillStatus;
  level: number;
  recommended: boolean;
}

/** Pass a gradeBand to scope the board (and its "recommended next" pick) to just that grade's skills — omit it for a full, ungrouped overview (used by the parent dashboard). */
export async function getReadingBoard(profileId: number, gradeBand?: GradeBand): Promise<ReadingBoardEntry[]> {
  const states = await listSkillStates(profileId, "reading");
  const stateByTopic = new Map(states.map((s) => [s.topic, s]));

  const skillsInScope = gradeBand ? READING_SKILLS.filter((s) => s.gradeBand === gradeBand) : READING_SKILLS;

  const entries: ReadingBoardEntry[] = skillsInScope.map((skill) => {
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
