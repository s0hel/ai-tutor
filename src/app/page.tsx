"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Mascot from "@/components/Mascot";
import AvatarIcon from "@/components/AvatarIcon";
import type { Profile } from "@/lib/types";

export default function HomePage() {
  const [profiles, setProfiles] = useState<Profile[] | null>(null);
  const [active, setActive] = useState<Profile | null>(null);

  useEffect(() => {
    fetch("/api/profiles")
      .then((r) => r.json())
      .then((data) => setProfiles(data.profiles ?? []));
  }, []);

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center px-6 py-10 text-center">
      <Mascot mood="happy" size={120} />
      <h1 className="mt-4 font-display text-4xl font-semibold text-kip-purple sm:text-5xl">
        Kip&apos;s Learning Club
      </h1>
      <p className="mt-2 text-lg text-kip-ink/70">Who&apos;s ready to play and learn today?</p>

      <div className="mt-10 grid w-full grid-cols-2 gap-4 sm:grid-cols-3">
        {profiles === null &&
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-32 animate-pulse rounded-3xl bg-white/60" />
          ))}

        {profiles?.map((p) => (
          <motion.button
            key={p.id}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActive(p)}
            className="flex flex-col items-center gap-2 rounded-3xl bg-white p-5 shadow-md ring-2 ring-transparent transition hover:ring-kip-purple/40"
          >
            <AvatarIcon avatarKey={p.avatarKey} size={72} />
            <span className="font-display text-lg font-semibold text-kip-ink">{p.name}</span>
          </motion.button>
        ))}
      </div>

      {profiles?.length === 0 && (
        <div className="mt-6 rounded-2xl bg-white/70 p-6 text-kip-ink/70">
          No kid profiles yet. A grown-up can add one from the{" "}
          <Link href="/parent" className="font-semibold text-kip-purple underline">
            Parent Area
          </Link>
          .
        </div>
      )}

      <div className="mt-12 flex items-center gap-4">
        <Link href="/parent" className="text-sm font-medium text-kip-ink/40 hover:text-kip-ink/70">
          ⚙️ Parent Area
        </Link>
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- this hits an API route, not a page */}
        <a href="/api/auth/signout" className="text-sm font-medium text-kip-ink/40 hover:text-kip-ink/70">
          Sign out
        </a>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex items-center justify-center bg-kip-ink/40 p-6 backdrop-blur-sm"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm rounded-3xl bg-white p-8 text-center shadow-xl"
            >
              <AvatarIcon avatarKey={active.avatarKey} size={72} className="mx-auto" />
              <h2 className="mt-3 font-display text-2xl font-semibold text-kip-ink">
                Hi {active.name}! What do you want to practice?
              </h2>
              <div className="mt-6 flex flex-col gap-3">
                <Link
                  href={`/learn/board?profile=${active.id}`}
                  className="rounded-2xl bg-kip-teal px-6 py-4 font-display text-xl font-semibold text-white shadow-md transition hover:brightness-105"
                >
                  🔢 Math
                </Link>
                <Link
                  href={`/learn/reading-board?profile=${active.id}`}
                  className="rounded-2xl bg-kip-pink px-6 py-4 font-display text-xl font-semibold text-white shadow-md transition hover:brightness-105"
                >
                  📚 Reading
                </Link>
                <Link
                  href={`/learn/gt-board?profile=${active.id}`}
                  className="rounded-2xl bg-kip-orange px-6 py-4 font-display text-xl font-semibold text-white shadow-md transition hover:brightness-105"
                >
                  🧠 Brain Games
                </Link>
              </div>
              <button
                onClick={() => setActive(null)}
                className="mt-5 text-sm font-medium text-kip-ink/40"
              >
                Not me, go back
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
