"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const COLORS = [
  "var(--color-kip-purple)",
  "var(--color-kip-teal)",
  "var(--color-kip-yellow)",
  "var(--color-kip-orange)",
  "var(--color-kip-pink)",
  "var(--color-kip-green)",
];

interface ConfettiPiece {
  id: number;
  x: number;
  delay: number;
  duration: number;
  color: string;
  rotate: number;
  size: number;
}

export default function Confetti({ pieces = 24 }: { pieces?: number }) {
  const [items, setItems] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    // Randomized per mount so each celebration looks a little different;
    // deliberately generated in an effect rather than during render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setItems(
      Array.from({ length: pieces }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 0.4,
        duration: 1.6 + Math.random() * 1.2,
        color: COLORS[i % COLORS.length],
        rotate: Math.random() * 360,
        size: 6 + Math.random() * 6,
      }))
    );
  }, [pieces]);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {items.map((item) => (
        <motion.span
          key={item.id}
          className="absolute top-[-5%] rounded-sm"
          style={{
            left: `${item.x}%`,
            width: item.size,
            height: item.size * 1.4,
            background: item.color,
          }}
          initial={{ y: 0, opacity: 1, rotate: 0 }}
          animate={{ y: "110vh", opacity: [1, 1, 0], rotate: item.rotate }}
          transition={{ duration: item.duration, delay: item.delay, ease: "easeIn" }}
        />
      ))}
    </div>
  );
}
