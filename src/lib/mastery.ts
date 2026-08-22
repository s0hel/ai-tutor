import { attemptStatsForTopic, skillPracticeDayCount } from "./repo";
import type { Skill } from "./skills";
import type { SkillState, SkillStatus } from "./types";

const MASTERY = {
  minStreak: 5,
  minAccuracy: 0.8,
  minAttempts: 8,
  minDistinctDays: 2,
};

export function evaluateMastery(
  profileId: number,
  skill: Skill,
  state: SkillState
): { status: SkillStatus; masteredAt: string | null } {
  if (state.status === "mastered") {
    return { status: "mastered", masteredAt: state.masteredAt };
  }

  const stats = attemptStatsForTopic(profileId, skill.subject, skill.slug, MASTERY.minAttempts);
  const days = skillPracticeDayCount(profileId, skill.subject, skill.slug);
  const accuracy = stats.total > 0 ? stats.correct / stats.total : 0;

  const justMastered =
    state.streak >= MASTERY.minStreak &&
    stats.total >= MASTERY.minAttempts &&
    accuracy >= MASTERY.minAccuracy &&
    days >= MASTERY.minDistinctDays;

  if (justMastered) {
    return { status: "mastered", masteredAt: new Date().toISOString() };
  }

  return { status: stats.total > 0 ? "practicing" : "not_started", masteredAt: null };
}
