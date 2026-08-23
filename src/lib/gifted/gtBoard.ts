import { GT_SKILLS, type GTSkill } from "./index";
import { listSkillStates } from "../repo";
import type { SkillStatus } from "../types";

export interface GTBoardEntry {
  skill: GTSkill;
  status: SkillStatus;
  level: number;
  recommended: boolean;
}

export async function getGTBoard(profileId: number): Promise<GTBoardEntry[]> {
  const states = await listSkillStates(profileId, "gifted");
  const stateByTopic = new Map(states.map((s) => [s.topic, s]));

  const entries: GTBoardEntry[] = GT_SKILLS.map((skill) => {
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
