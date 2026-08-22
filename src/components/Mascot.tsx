"use client";

import { motion } from "framer-motion";

export type MascotMood = "idle" | "thinking" | "happy" | "encouraging" | "celebrating";

const bodyBounce = {
  idle: { rotate: [0, -2, 0, 2, 0], transition: { duration: 4, repeat: Infinity } },
  thinking: { rotate: [0, -4, 0], transition: { duration: 1.6, repeat: Infinity } },
  happy: { scale: [1, 1.05, 1], transition: { duration: 0.6, repeat: Infinity } },
  encouraging: { rotate: [0, 3, -3, 0], transition: { duration: 1.2, repeat: Infinity } },
  celebrating: {
    y: [0, -18, 0, -10, 0],
    rotate: [0, -8, 8, -4, 0],
    transition: { duration: 0.9, repeat: Infinity },
  },
};

function Eyes({ mood }: { mood: MascotMood }) {
  if (mood === "thinking") {
    return (
      <>
        <circle cx="82" cy="98" r="7" fill="#2d2a4a" />
        <ellipse cx="128" cy="100" rx="8" ry="3" fill="#2d2a4a" />
      </>
    );
  }
  if (mood === "happy" || mood === "celebrating") {
    return (
      <>
        <path d="M70 96 Q82 82 94 96" stroke="#2d2a4a" strokeWidth="6" strokeLinecap="round" fill="none" />
        <path d="M116 96 Q128 82 140 96" stroke="#2d2a4a" strokeWidth="6" strokeLinecap="round" fill="none" />
      </>
    );
  }
  return (
    <>
      <circle cx="82" cy="98" r="9" fill="#2d2a4a" />
      <circle cx="85" cy="94" r="3" fill="white" />
      <circle cx="128" cy="98" r="9" fill="#2d2a4a" />
      <circle cx="131" cy="94" r="3" fill="white" />
    </>
  );
}

function Mouth({ mood }: { mood: MascotMood }) {
  if (mood === "thinking") {
    return <ellipse cx="105" cy="122" rx="6" ry="4" fill="#2d2a4a" />;
  }
  if (mood === "encouraging") {
    return <path d="M92 120 Q105 126 118 120" stroke="#2d2a4a" strokeWidth="5" strokeLinecap="round" fill="none" />;
  }
  return (
    <path
      d="M88 116 Q105 138 122 116"
      stroke="#2d2a4a"
      strokeWidth="5"
      strokeLinecap="round"
      fill={mood === "happy" || mood === "celebrating" ? "#ff8a5c" : "none"}
    />
  );
}

export default function Mascot({
  mood = "idle",
  size = 140,
  className = "",
}: {
  mood?: MascotMood;
  size?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={`inline-block ${className}`}
      animate={bodyBounce[mood]}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 210 210" width={size} height={size} role="img" aria-label={`Kip the tutor mascot, feeling ${mood}`}>
        <ellipse cx="105" cy="190" rx="55" ry="10" fill="#2d2a4a" opacity="0.08" />
        <path d="M55 60 L35 15 L80 45 Z" fill="var(--color-kip-orange)" />
        <path d="M155 60 L175 15 L130 45 Z" fill="var(--color-kip-orange)" />
        <path d="M55 60 L42 28 L72 48 Z" fill="#fff3e6" />
        <path d="M155 60 L168 28 L138 48 Z" fill="#fff3e6" />

        <circle cx="105" cy="112" r="78" fill="var(--color-kip-orange)" />
        <ellipse cx="105" cy="130" rx="46" ry="38" fill="#fff3e6" />

        <circle cx="45" cy="120" r="10" fill="#ffd7b0" opacity="0.8" />
        <circle cx="165" cy="120" r="10" fill="#ffd7b0" opacity="0.8" />

        <Eyes mood={mood} />
        <ellipse cx="105" cy="112" rx="6" ry="4" fill="#f4a259" />
        <Mouth mood={mood} />

        {mood === "celebrating" && (
          <>
            <motion.circle
              cx="30"
              cy="60"
              r="6"
              fill="var(--color-kip-yellow)"
              animate={{ y: [0, -14, 0], opacity: [1, 1, 0.6] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <motion.circle
              cx="185"
              cy="70"
              r="5"
              fill="var(--color-kip-teal)"
              animate={{ y: [0, -10, 0], opacity: [1, 1, 0.6] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }}
            />
            <motion.circle
              cx="170"
              cy="150"
              r="5"
              fill="var(--color-kip-pink)"
              animate={{ y: [0, -12, 0], opacity: [1, 1, 0.6] }}
              transition={{ duration: 0.9, repeat: Infinity, delay: 0.4 }}
            />
          </>
        )}
      </svg>
    </motion.div>
  );
}
