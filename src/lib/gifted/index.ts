import type { Battery, GTSkill } from "./types";
import { VERBAL_SKILLS } from "./skills/verbal";
import { QUANTITATIVE_SKILLS } from "./skills/quantitative";
import { NONVERBAL_SKILLS } from "./skills/nonverbal";

export type { Battery, GTSkill, ConceptBrief } from "./types";

export const BATTERY_META: Record<Battery, { label: string; emoji: string; order: number }> = {
  verbal: { label: "Verbal", emoji: "💬", order: 1 },
  quantitative: { label: "Quantitative", emoji: "🔢", order: 2 },
  nonverbal: { label: "Nonverbal", emoji: "🧩", order: 3 },
};

export const GT_SKILLS: GTSkill[] = [...VERBAL_SKILLS, ...QUANTITATIVE_SKILLS, ...NONVERBAL_SKILLS];

export function getGTSkill(slug: string): GTSkill | undefined {
  return GT_SKILLS.find((s) => s.slug === slug);
}

export function listByBattery(): { battery: Battery; skills: GTSkill[] }[] {
  const batteries = Object.keys(BATTERY_META) as Battery[];
  return batteries
    .sort((a, b) => BATTERY_META[a].order - BATTERY_META[b].order)
    .map((battery) => ({
      battery,
      skills: GT_SKILLS.filter((s) => s.battery === battery).sort((a, b) => a.order - b.order),
    }));
}
