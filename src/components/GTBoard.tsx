"use client";

import Link from "next/link";
import type { Battery, GTSkill } from "@/lib/gifted";
import type { SkillStatus } from "@/lib/types";

export interface GTBoardEntry {
  skill: GTSkill;
  status: SkillStatus;
  level: number;
  recommended: boolean;
}

const STATUS_META: Record<SkillStatus, { label: string; className: string }> = {
  not_started: { label: "Not started", className: "bg-white text-kip-ink/50 border-2 border-kip-purple/10" },
  practicing: { label: "Practicing", className: "bg-kip-yellow/30 text-kip-ink border-2 border-kip-yellow/40" },
  mastered: { label: "Mastered ⭐", className: "bg-kip-green/20 text-kip-green border-2 border-kip-green/40" },
};

export default function GTBoard({
  profileId,
  board,
  batteryMeta,
}: {
  profileId: number;
  board: GTBoardEntry[];
  batteryMeta: Record<Battery, { label: string; emoji: string; order: number }>;
}) {
  const batteries = Array.from(new Set(board.map((e) => e.skill.battery))).sort(
    (a, b) => batteryMeta[a].order - batteryMeta[b].order
  );

  return (
    <div className="flex flex-col gap-6">
      {batteries.map((battery) => (
        <section key={battery}>
          <h2 className="mb-2 font-display text-lg font-semibold text-kip-ink">
            {batteryMeta[battery].emoji} {batteryMeta[battery].label}
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {board
              .filter((e) => e.skill.battery === battery)
              .map((entry) => {
                const meta = STATUS_META[entry.status];
                return (
                  <Link
                    key={entry.skill.slug}
                    href={`/learn/gifted?profile=${profileId}&skill=${entry.skill.slug}`}
                    className="relative flex flex-col gap-2 rounded-2xl bg-white p-4 shadow-sm ring-2 ring-transparent transition hover:ring-kip-orange/30"
                  >
                    {entry.recommended && (
                      <span className="absolute -top-2 -right-2 rounded-full bg-kip-orange px-2 py-0.5 text-xs font-bold text-white shadow">
                        Recommended
                      </span>
                    )}
                    <span className="font-display font-semibold text-kip-ink">{entry.skill.title}</span>
                    <span className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${meta.className}`}>{meta.label}</span>
                  </Link>
                );
              })}
          </div>
        </section>
      ))}
    </div>
  );
}
