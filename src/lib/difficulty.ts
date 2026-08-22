import { awardBadge, currentDailyStreak, distinctTopics, recordPracticeDay } from "./repo";
import type { SkillState, Subject } from "./types";

const MIN_LEVEL = 1;
const MAX_LEVEL = 10;

export function nextSkillState(state: SkillState, correct: boolean | null): SkillState {
  if (correct === null) return state;
  let { level, streak } = state;
  if (correct) {
    streak += 1;
    if (streak >= 2) level = Math.min(MAX_LEVEL, level + 0.5);
  } else {
    streak = 0;
    level = Math.max(MIN_LEVEL, level - 0.5);
  }
  return { ...state, level, streak, updatedAt: new Date().toISOString() };
}

export interface BadgeEvent {
  key: string;
  label: string;
}

export async function evaluateBadges(
  profileId: number,
  subject: Subject,
  state: SkillState,
  leveledUp: boolean
): Promise<BadgeEvent[]> {
  const earned: BadgeEvent[] = [];
  const badgeDefs: Record<string, string> = {
    first_steps: "First Steps",
    streak_5: "On a Roll",
    streak_10: "Superstar",
    math_explorer: "Math Explorer",
    reading_explorer: "Bookworm",
    gifted_explorer: "Brain Booster",
    level_up: "Level Up!",
    daily_streak_3: "3-Day Streak",
    daily_streak_7: "Weekly Champ",
  };
  const EXPLORER_BADGE: Record<Subject, string> = {
    math: "math_explorer",
    reading: "reading_explorer",
    gifted: "gifted_explorer",
  };

  const tryAward = async (key: string) => {
    if (await awardBadge(profileId, key)) earned.push({ key, label: badgeDefs[key] });
  };

  await tryAward("first_steps");
  if (state.streak >= 5) await tryAward("streak_5");
  if (state.streak >= 10) await tryAward("streak_10");
  if (leveledUp) await tryAward("level_up");

  const topics = await distinctTopics(profileId, subject);
  if (topics.length >= 5) {
    await tryAward(EXPLORER_BADGE[subject]);
  }

  await recordPracticeDay(profileId);
  const dailyStreak = await currentDailyStreak(profileId);
  if (dailyStreak >= 3) await tryAward("daily_streak_3");
  if (dailyStreak >= 7) await tryAward("daily_streak_7");

  return earned;
}
