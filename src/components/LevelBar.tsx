"use client";

import { motion } from "framer-motion";

export default function LevelBar({ level, streak }: { level: number; streak: number }) {
  const safeLevel = typeof level === "number" && !Number.isNaN(level) ? level : 1;
  const pct = Math.min(100, Math.max(0, (safeLevel / 10) * 100));
  return (
    <div className="flex items-center gap-3">
      <div className="h-3 w-28 overflow-hidden rounded-full bg-white/60 sm:w-40">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-kip-teal to-kip-green"
          animate={{ width: `${pct}%` }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        />
      </div>
      <span className="whitespace-nowrap text-sm font-semibold text-kip-ink/70">
        Lvl {safeLevel.toFixed(1)} {streak >= 2 && `🔥${streak}`}
      </span>
    </div>
  );
}
