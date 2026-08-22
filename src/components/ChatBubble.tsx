"use client";

import { motion } from "framer-motion";
import type { ChatMessage } from "@/lib/types";
import Mascot from "./Mascot";
import AvatarIcon from "./AvatarIcon";

export default function ChatBubble({
  message,
  avatarKey,
}: {
  message: ChatMessage;
  avatarKey: string;
}) {
  const isTutor = message.role === "tutor";
  const isCorrect = message.turn?.isCorrectAnswer;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-end gap-2 ${isTutor ? "justify-start" : "justify-end"}`}
    >
      {isTutor && <Mascot size={44} mood="idle" className="mb-1 shrink-0" />}
      <div
        className={`max-w-[78%] rounded-3xl px-5 py-3 text-lg leading-snug shadow-sm ${
          isTutor
            ? "bg-white text-kip-ink rounded-bl-md border-2 border-kip-purple/10"
            : "bg-kip-purple text-white rounded-br-md"
        }`}
      >
        <p className="whitespace-pre-line font-medium">{message.text}</p>
        {isTutor && isCorrect !== null && isCorrect !== undefined && (
          <span
            className={`mt-1 inline-block text-sm font-bold ${
              isCorrect ? "text-kip-green" : "text-kip-orange"
            }`}
          >
            {isCorrect ? "✓ Correct!" : "Keep trying!"}
          </span>
        )}
      </div>
      {!isTutor && <AvatarIcon avatarKey={avatarKey} size={40} className="mb-1 shrink-0" />}
    </motion.div>
  );
}
