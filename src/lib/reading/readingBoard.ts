import { READING_SKILLS, type ReadingSkill } from "./index";
import { listSkillStates } from "../repo";
import type { SkillStatus } from "../types";

export interface ReadingBoardEntry {
  skill: ReadingSkill;
  status: SkillStatus;
  level: number;
  recommended: boolean;
}

export async function getReadingBoard(profileId: number): Promise<ReadingBoardEntry[]> {
  const states = await listSkillStates(profileId, "reading");
  const stateByTopic = new Map(states.map((s) => [s.topic, s]));

  const entries: ReadingBoardEntry[] = READING_SKILLS.map((skill) => {
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
