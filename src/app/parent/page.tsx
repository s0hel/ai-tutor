"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import AvatarIcon from "@/components/AvatarIcon";
import Mascot from "@/components/Mascot";
import { AVATARS, BADGES, type Attempt, type Badge, type Profile, type SkillState } from "@/lib/types";
import type { SkillBoardEntry } from "@/components/SkillBoard";
import type { Strand } from "@/lib/skills";

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
  reading: { total: number; correct: number; accuracy: number | null; topics: SkillState[] };
  recentAttempts: Attempt[];
  strandMeta: Record<Strand, { label: string; emoji: string; order: number }>;
}

function PinGate({ onSuccess }: { onSuccess: () => void }) {
  const [configured, setConfigured] = useState<boolean | null>(null);
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch("/api/parent/auth")
      .then((r) => r.json())
      .then((data) => {
        if (data.authed) onSuccess();
        else setConfigured(data.configured);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submit = async () => {
    setError(null);
    if (!configured && pin !== confirmPin) {
      setError("PINs don't match");
      return;
    }
    setSubmitting(true);
    const res = await fetch("/api/parent/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pin }),
    });
    setSubmitting(false);
    if (res.ok) {
      onSuccess();
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Something went wrong");
    }
  };

  if (configured === null) {
    return (
      <main className="flex flex-1 items-center justify-center">
        <Mascot mood="thinking" />
      </main>
    );
  }

  return (
    <main className="mx-auto flex w-full max-w-sm flex-1 flex-col items-center justify-center px-6 py-10 text-center">
      <Mascot mood="idle" />
      <h1 className="mt-4 font-display text-2xl font-semibold text-kip-ink">
        {configured ? "Enter Parent PIN" : "Create a Parent PIN"}
      </h1>
      <p className="mt-1 text-sm text-kip-ink/60">
        {configured
          ? "This keeps settings and progress private from the kids."
          : "Pick a 4-8 digit PIN. You'll use this to manage profiles and view progress."}
      </p>
      <input
        type="password"
        inputMode="numeric"
        value={pin}
        onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
        onKeyDown={(e) => e.key === "Enter" && submit()}
        placeholder="PIN"
        className="mt-6 w-40 rounded-2xl border-2 border-kip-purple/20 px-4 py-3 text-center text-2xl tracking-[0.3em] outline-none focus:border-kip-purple"
      />
      {!configured && (
        <input
          type="password"
          inputMode="numeric"
          value={confirmPin}
          onChange={(e) => setConfirmPin(e.target.value.replace(/\D/g, ""))}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder="Confirm PIN"
          className="mt-3 w-40 rounded-2xl border-2 border-kip-purple/20 px-4 py-3 text-center text-2xl tracking-[0.3em] outline-none focus:border-kip-purple"
        />
      )}
      {error && <p className="mt-3 text-sm font-medium text-kip-red">{error}</p>}
      <button
        onClick={submit}
        disabled={submitting || pin.length < 4}
        className="mt-6 rounded-full bg-kip-purple px-8 py-3 font-display font-semibold text-white shadow-md disabled:opacity-40"
      >
        {configured ? "Unlock" : "Create PIN"}
      </button>
      <Link href="/" className="mt-8 text-sm text-kip-ink/40">
        ← Back to profiles
      </Link>
    </main>
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

  const subjectCard = (label: string, data: StatsResponse["reading"]) => (
    <div className="rounded-2xl bg-white p-4 shadow-sm">
      <h4 className="font-display font-semibold text-kip-ink">{label}</h4>
      <p className="mt-1 text-sm text-kip-ink/60">
        {data.total} questions answered
        {data.accuracy !== null && ` · ${data.accuracy}% correct`}
      </p>
      <ul className="mt-2 space-y-1 text-sm">
        {data.topics.map((t) => (
          <li key={t.topic} className="flex justify-between text-kip-ink/70">
            <span>{t.topic}</span>
            <span>Lvl {t.level.toFixed(1)}</span>
          </li>
        ))}
        {data.topics.length === 0 && <li className="text-kip-ink/40">No topics practiced yet</li>}
      </ul>
    </div>
  );

  const mathBoardCard = () => {
    const strands = Array.from(new Set(stats.math.board.map((e) => e.skill.strand))).sort(
      (a, b) => stats.strandMeta[a].order - stats.strandMeta[b].order
    );
    return (
      <div className="rounded-2xl bg-white p-4 shadow-sm">
        <h4 className="font-display font-semibold text-kip-ink">🔢 Math</h4>
        <p className="mt-1 text-sm text-kip-ink/60">
          {stats.math.total} questions answered
          {stats.math.accuracy !== null && ` · ${stats.math.accuracy}% correct`}
        </p>
        <ul className="mt-2 space-y-1.5 text-sm">
          {strands.map((strand) => {
            const entries = stats.math.board.filter((e) => e.skill.strand === strand);
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
        {subjectCard("📚 Reading", stats.reading)}
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
        <Link href="/" className="text-sm font-medium text-kip-ink/50 hover:text-kip-ink">
          ← Back to profiles
        </Link>
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

      <div className="mt-8">
        <AddProfileForm onAdded={refresh} />
      </div>
    </main>
  );
}

export default function ParentPage() {
  const [authed, setAuthed] = useState(false);
  if (!authed) return <PinGate onSuccess={() => setAuthed(true)} />;
  return <Dashboard />;
}
