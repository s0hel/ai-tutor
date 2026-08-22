"use client";

import { AnimatePresence, motion } from "framer-motion";

export default function BadgeToast({ label }: { label: string | null }) {
  return (
    <AnimatePresence>
      {label && (
        <motion.div
          initial={{ opacity: 0, y: -40, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.8 }}
          className="fixed top-4 left-1/2 z-50 -translate-x-1/2 rounded-full bg-kip-yellow px-6 py-3 text-center font-display text-lg font-semibold text-kip-ink shadow-lg"
        >
          🏅 New badge: {label}!
        </motion.div>
      )}
    </AnimatePresence>
  );
}
