"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import AvatarIcon from "@/components/AvatarIcon";
import { AVATARS, BADGES, type Attempt, type Badge, type ParentInvite, type Profile, type SkillState } from "@/lib/types";
import type { SkillBoardEntry } from "@/components/SkillBoard";
import type { GTBoardEntry } from "@/components/GTBoard";
import type { ReadingBoardEntry } from "@/components/ReadingBoard";
import { GRADE_BAND_META, type Strand } from "@/lib/skills";
import type { Battery } from "@/lib/gifted";
import type { ReadingStrand } from "@/lib/reading";

interface StatsResponse {
  profile: Profile;
  dailyStreak: number;
  badges: Badge[];
  math: {
    total: number;
    correct: number;
    accuracy: number | null;
    topics: SkillState[];
    board: SkillBoardEntry[];
  };
  reading: {
    total: number;
    correct: number;
    accuracy: number | null;
    topics: SkillState[];
    board: ReadingBoardEntry[];
  };
  gifted: {
    total: number;
    correct: number;
    accuracy: number | null;
    topics: SkillState[];
    board: GTBoardEntry[];
  };
  recentAttempts: Attempt[];
  strandMeta: Record<Strand, { label: string; emoji: string; order: number }>;
  readingStrandMeta: Record<ReadingStrand, { label: string; emoji: string; order: number }>;
  batteryMeta: Record<Battery, { label: string; emoji: string; order: number }>;
}

function InviteCoParent() {
  const [email, setEmail] = useState("");
  const [invites, setInvites] = useState<ParentInvite[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const refresh = useCallback(() => {
    fetch("/api/parent/invites")
      .then((r) => r.json())
      .then((data: { invites: ParentInvite[] }) => setInvites(data.invites ?? []));
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const submit = async () => {
    setError(null);
    setSubmitting(true);
    const res = await fetch("/api/parent/invites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    setSubmitting(false);
    if (res.ok) {
      setEmail("");
      refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Something went wrong");
    }
  };

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">
      <h3 className="font-display text-lg font-semibold text-kip-ink">Invite a co-parent</h3>
      <p className="mt-1 text-sm text-kip-ink/60">
        They&apos;ll get access to these profiles once they sign in with Google using this email.
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="co-parent@example.com"
          className="rounded-xl border-2 border-kip-purple/15 px-3 py-2 outline-none focus:border-kip-purple"
        />
        <button
          onClick={submit}
          disabled={submitting || !email.trim()}
          className="rounded-full bg-kip-teal px-5 py-2 font-semibold text-white disabled:opacity-40"
        >
          Invite
        </button>
      </div>
      {error && <p className="mt-2 text-sm text-kip-red">{error}</p>}
      {invites.length > 0 && (
        <ul className="mt-3 space-y-1 text-sm text-kip-ink/60">
          {invites.map((i) => (
            <li key={i.id}>Pending: {i.email}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

function AddProfileForm({ onAdded }: { onAdded: () => void }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState(7);
  const [avatarKey, setAvatarKey] = useState<string>(AVATARS[0]);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const submit = async () => {
    setError(null);
    setSubmitting(true);
    const res = await fetch("/api/profiles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, age, avatarKey }),
    });
    setSubmitting(false);
    if (res.ok) {
      setName("");
      onAdded();
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Something went wrong");
    }
  };

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">
      <h3 className="font-display text-lg font-semibold text-kip-ink">Add a kid profile</h3>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="rounded-xl border-2 border-kip-purple/15 px-3 py-2 outline-none focus:border-kip-purple"
        />
        <input
          type="number"
          min={4}
          max={14}
          value={age}
          onChange={(e) => setAge(Number(e.target.value))}
          className="w-20 rounded-xl border-2 border-kip-purple/15 px-3 py-2 outline-none focus:border-kip-purple"
        />
        <div className="flex gap-1">
          {AVATARS.map((a) => (
            <button
              key={a}
              onClick={() => setAvatarKey(a)}
              className={`rounded-full ring-2 transition ${avatarKey === a ? "ring-kip-purple" : "ring-transparent"}`}
            >
              <AvatarIcon avatarKey={a} size={36} />
            </button>
          ))}
        </div>
        <button
          onClick={submit}
          disabled={submitting || !name.trim()}
          className="rounded-full bg-kip-teal px-5 py-2 font-semibold text-white disabled:opacity-40"
        >
          Add
        </button>
      </div>
      {error && <p className="mt-2 text-sm text-kip-red">{error}</p>}
    </div>
  );
}

function ProfileStats({ profile }: { profile: Profile }) {
  const [stats, setStats] = useState<StatsResponse | null>(null);

  useEffect(() => {
    fetch(`/api/parent/stats?profileId=${profile.id}`)
      .then((r) => r.json())
      .then(setStats);
  }, [profile.id]);

  if (!stats) return <p className="mt-4 text-sm text-kip-ink/50">Loading...</p>;

  const readingBoardCard = () => {
    const strands = Array.from(new Set(stats.reading.board.map((e) => e.skill.strand))).sort(
      (a, b) => stats.readingStrandMeta[a].order - stats.readingStrandMeta[b].order
    );
    return (
      <div className="rounded-2xl bg-white p-4 shadow-sm">
        <h4 className="font-display font-semibold text-kip-ink">📚 Reading</h4>
        <p className="mt-1 text-sm text-kip-ink/60">
          {stats.reading.total} questions answered
          {stats.reading.accuracy !== null && ` · ${stats.reading.accuracy}% correct`}
        </p>
        <ul className="mt-2 space-y-1.5 text-sm">
          {strands.map((strand) => {
            const entries = stats.reading.board.filter((e) => e.skill.strand === strand);
            const mastered = entries.filter((e) => e.status === "mastered").length;
            const practicing = entries.filter((e) => e.status === "practicing").length;
            return (
              <li key={strand} className="flex justify-between text-kip-ink/70">
                <span>
                  {stats.readingStrandMeta[strand].emoji} {stats.readingStrandMeta[strand].label}
                </span>
                <span>
                  {mastered}/{entries.length} mastered{practicing > 0 && ` · ${practicing} practicing`}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  const mathBoardCard = () => {
    const gradeBands = Array.from(new Set(stats.math.board.map((e) => e.skill.gradeBand))).sort(
      (a, b) => GRADE_BAND_META[a].order - GRADE_BAND_META[b].order
    );
    return (
      <div className="rounded-2xl bg-white p-4 shadow-sm">
        <h4 className="font-display font-semibold text-kip-ink">🔢 Math</h4>
        <p className="mt-1 text-sm text-kip-ink/60">
          {stats.math.total} questions answered
          {stats.math.accuracy !== null && ` · ${stats.math.accuracy}% correct`}
        </p>
        {gradeBands.map((band) => {
          const bandEntries = stats.math.board.filter((e) => e.skill.gradeBand === band);
          const strands = Array.from(new Set(bandEntries.map((e) => e.skill.strand))).sort(
            (a, b) => stats.strandMeta[a].order - stats.strandMeta[b].order
          );
          return (
            <div key={band} className="mt-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-kip-ink/40">
                {GRADE_BAND_META[band].label}
              </p>
              <ul className="mt-1 space-y-1.5 text-sm">
                {strands.map((strand) => {
                  const entries = bandEntries.filter((e) => e.skill.strand === strand);
                  const mastered = entries.filter((e) => e.status === "mastered").length;
                  const practicing = entries.filter((e) => e.status === "practicing").length;
                  return (
                    <li key={strand} className="flex justify-between text-kip-ink/70">
                      <span>
                        {stats.strandMeta[strand].emoji} {stats.strandMeta[strand].label}
                      </span>
                      <span>
                        {mastered}/{entries.length} mastered{practicing > 0 && ` · ${practicing} practicing`}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    );
  };

  const giftedBoardCard = () => {
    const batteries = Array.from(new Set(stats.gifted.board.map((e) => e.skill.battery))).sort(
      (a, b) => stats.batteryMeta[a].order - stats.batteryMeta[b].order
    );
    return (
      <div className="rounded-2xl bg-white p-4 shadow-sm">
        <h4 className="font-display font-semibold text-kip-ink">🧠 Brain Games</h4>
        <p className="mt-1 text-sm text-kip-ink/60">
          {stats.gifted.total} questions answered
          {stats.gifted.accuracy !== null && ` · ${stats.gifted.accuracy}% correct`}
        </p>
        <ul className="mt-2 space-y-1.5 text-sm">
          {batteries.map((battery) => {
            const entries = stats.gifted.board.filter((e) => e.skill.battery === battery);
            const mastered = entries.filter((e) => e.status === "mastered").length;
            const practicing = entries.filter((e) => e.status === "practicing").length;
            return (
              <li key={battery} className="flex justify-between text-kip-ink/70">
                <span>
                  {stats.batteryMeta[battery].emoji} {stats.batteryMeta[battery].label}
                </span>
                <span>
                  {mastered}/{entries.length} mastered{practicing > 0 && ` · ${practicing} practicing`}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  return (
    <div className="mt-4 space-y-4">
      <div className="flex flex-wrap gap-3">
        <div className="rounded-2xl bg-kip-yellow/30 px-4 py-2 text-sm font-semibold text-kip-ink">
          🔥 {stats.dailyStreak}-day streak
        </div>
        {stats.badges.map((b) => (
          <div key={b.id} className="rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-kip-ink shadow-sm">
            🏅 {BADGES[b.key]?.label ?? b.key}
          </div>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {mathBoardCard()}
        {readingBoardCard()}
        {giftedBoardCard()}
      </div>

      <div className="rounded-2xl bg-white p-4 shadow-sm">
        <h4 className="font-display font-semibold text-kip-ink">Recent activity</h4>
        <ul className="mt-2 max-h-64 space-y-2 overflow-y-auto text-sm">
          {stats.recentAttempts.map((a) => (
            <li key={a.id} className="border-b border-kip-purple/5 pb-2 last:border-0">
              <p className="font-medium text-kip-ink/80">{a.prompt}</p>
              <p className="text-kip-ink/50">
                Answered: &quot;{a.kidResponse}&quot; ·{" "}
                <span className={a.correct === 1 ? "text-kip-green" : "text-kip-orange"}>
                  {a.correct === 1 ? "correct" : "incorrect"}
                </span>
              </p>
            </li>
          ))}
          {stats.recentAttempts.length === 0 && (
            <li className="text-kip-ink/40">No activity yet</li>
          )}
        </ul>
      </div>
    </div>
  );
}

function Dashboard() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [selected, setSelected] = useState<Profile | null>(null);

  const refresh = useCallback(() => {
    fetch("/api/profiles")
      .then((r) => r.json())
      .then((data: { profiles: Profile[] }) => {
        setProfiles(data.profiles ?? []);
        setSelected((prev) => prev ?? data.profiles?.[0] ?? null);
      });
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const remove = async (id: number) => {
    if (!confirm("Remove this profile and all of its progress? This can't be undone.")) return;
    await fetch(`/api/profiles/${id}`, { method: "DELETE" });
    setSelected(null);
    refresh();
  };

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-8">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-semibold text-kip-purple">Parent Area</h1>
        <div className="flex items-center gap-4">
          <Link href="/" className="text-sm font-medium text-kip-ink/50 hover:text-kip-ink">
            ← Back to profiles
          </Link>
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- this hits an API route, not a page */}
          <a href="/api/auth/signout" className="text-sm font-medium text-kip-ink/50 hover:text-kip-ink">
            Sign out
          </a>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {profiles.map((p) => (
          <button
            key={p.id}
            onClick={() => setSelected(p)}
            className={`flex items-center gap-2 rounded-full px-3 py-1.5 shadow-sm transition ${
              selected?.id === p.id ? "bg-kip-purple text-white" : "bg-white text-kip-ink"
            }`}
          >
            <AvatarIcon avatarKey={p.avatarKey} size={24} />
            <span className="font-medium">{p.name}</span>
            <span
              role="button"
              onClick={(e) => {
                e.stopPropagation();
                remove(p.id);
              }}
              className="ml-1 opacity-60 hover:opacity-100"
            >
              ✕
            </span>
          </button>
        ))}
      </div>

      {selected && <ProfileStats key={selected.id} profile={selected} />}

      <div className="mt-8 space-y-4">
        <AddProfileForm onAdded={refresh} />
        <InviteCoParent />
      </div>
    </main>
  );
}

export default function ParentPage() {
  return <Dashboard />;
}
