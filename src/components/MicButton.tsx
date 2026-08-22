"use client";

import { motion } from "framer-motion";

export default function MicButton({
  isListening,
  onClick,
  disabled,
}: {
  isListening: boolean;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: 0.92 }}
      aria-label={isListening ? "Stop listening" : "Speak your answer"}
      className={`relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-2xl text-white shadow-md transition-colors disabled:opacity-40 ${
        isListening ? "bg-kip-red" : "bg-kip-teal"
      }`}
    >
      {isListening && (
        <motion.span
          className="absolute inset-0 rounded-full bg-kip-red/50"
          animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
          transition={{ duration: 1.1, repeat: Infinity }}
        />
      )}
      <span className="relative">{isListening ? "⏺" : "🎤"}</span>
    </motion.button>
  );
}
