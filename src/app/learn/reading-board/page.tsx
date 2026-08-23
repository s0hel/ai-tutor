"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Mascot from "@/components/Mascot";
import ReadingBoard, { type ReadingBoardEntry } from "@/components/ReadingBoard";
import type { Profile } from "@/lib/types";
import type { ReadingStrand } from "@/lib/reading";

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

  useEffect(() => {
    fetch("/api/profiles")
      .then((r) => r.json())
      .then((data: { profiles: Profile[] }) => setProfile(data.profiles.find((p) => p.id === profileId) ?? null));
  }, [profileId]);

  useEffect(() => {
    if (!profileId) return;
    fetch(`/api/reading-skills/board?profileId=${profileId}`)
      .then((r) => r.json())
      .then((data) => {
        setBoard(data.board);
        setStrandMeta(data.strandMeta);
      });
  }, [profileId]);

  if (!profile || !board || !strandMeta) {
    return (
      <main className="flex flex-1 items-center justify-center">
        <Mascot mood="thinking" />
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-3xl flex-1 flex-col px-4 py-6">
      <header className="mb-4 flex items-center justify-between">
        <Link href="/" className="text-2xl" aria-label="Back to profiles">
          ←
        </Link>
        <h1 className="font-display text-xl font-semibold text-kip-pink">📚 Reading Skills for {profile.name}</h1>
        <span className="w-6" />
      </header>
      <ReadingBoard profileId={profileId} board={board} strandMeta={strandMeta} />
    </main>
  );
}
