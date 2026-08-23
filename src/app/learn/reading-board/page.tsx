"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Mascot from "@/components/Mascot";
import ReadingBoard, { type ReadingBoardEntry } from "@/components/ReadingBoard";
import type { Profile } from "@/lib/types";
import { GRADE_BAND_META, defaultGradeBandForAge, type GradeBand, type ReadingStrand } from "@/lib/reading";

export default function ReadingBoardPage() {
  return (
    <Suspense
      fallback={
        <main className="flex flex-1 items-center justify-center">
          <Mascot mood="thinking" />
        </main>
      }
    >
      <ReadingBoardPageInner />
    </Suspense>
  );
}

function ReadingBoardPageInner() {
  const searchParams = useSearchParams();
  const profileId = Number(searchParams.get("profile"));

  const [profile, setProfile] = useState<Profile | null>(null);
  const [board, setBoard] = useState<ReadingBoardEntry[] | null>(null);
  const [strandMeta, setStrandMeta] = useState<Record<
    ReadingStrand,
    { label: string; emoji: string; order: number }
  > | null>(null);
  const [gradeBand, setGradeBand] = useState<GradeBand | null>(null);

  useEffect(() => {
    fetch("/api/profiles")
      .then((r) => r.json())
      .then((data: { profiles: Profile[] }) => setProfile(data.profiles.find((p) => p.id === profileId) ?? null));
  }, [profileId]);

  const resolvedGradeBand = gradeBand ?? (profile ? defaultGradeBandForAge(profile.age) : null);

  useEffect(() => {
    if (!profileId || !resolvedGradeBand) return;
    fetch(`/api/reading-skills/board?profileId=${profileId}&gradeBand=${resolvedGradeBand}`)
      .then((r) => r.json())
      .then((data) => {
        setBoard(data.board);
        setStrandMeta(data.strandMeta);
      });
  }, [profileId, resolvedGradeBand]);

  if (!profile || !board || !strandMeta || !resolvedGradeBand) {
    return (
      <main className="flex flex-1 items-center justify-center">
        <Mascot mood="thinking" />
      </main>
    );
  }

  const gradeBands = (Object.keys(GRADE_BAND_META) as GradeBand[]).sort(
    (a, b) => GRADE_BAND_META[a].order - GRADE_BAND_META[b].order
  );

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-3xl flex-1 flex-col px-4 py-6">
      <header className="mb-4 flex items-center justify-between">
        <Link href="/" className="text-2xl" aria-label="Back to profiles">
          ←
        </Link>
        <h1 className="font-display text-xl font-semibold text-kip-pink">📚 Reading Skills for {profile.name}</h1>
        <span className="w-6" />
      </header>

      <div className="mb-5 flex justify-center gap-2">
        {gradeBands.map((band) => (
          <button
            key={band}
            onClick={() => setGradeBand(band)}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold shadow-sm transition ${
              band === resolvedGradeBand ? "bg-kip-pink text-white" : "bg-white text-kip-ink/60 hover:text-kip-ink"
            }`}
          >
            {GRADE_BAND_META[band].label}
          </button>
        ))}
      </div>

      <ReadingBoard profileId={profileId} board={board} strandMeta={strandMeta} />
    </main>
  );
}
