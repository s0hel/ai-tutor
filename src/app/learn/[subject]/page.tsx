"use client";

import { Suspense, use, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import Mascot, { type MascotMood } from "@/components/Mascot";
import ChatBubble from "@/components/ChatBubble";
import MicButton from "@/components/MicButton";
import LevelBar from "@/components/LevelBar";
import BadgeToast from "@/components/BadgeToast";
import Confetti from "@/components/Confetti";
import { useSpeech } from "@/hooks/useSpeech";
import type { ChatMessage, Profile, Subject, TutorTurn } from "@/lib/types";

const SUBJECT_META: Record<Subject, { title: string; color: string; emoji: string }> = {
  math: { title: "Math Time", color: "bg-kip-teal", emoji: "🔢" },
  reading: { title: "Reading Time", color: "bg-kip-pink", emoji: "📚" },
};

function computeStreak(messages: ChatMessage[]): number {
  let streak = 0;
  for (let i = messages.length - 1; i >= 0; i--) {
    const turn = messages[i].turn;
    if (!turn || turn.isCorrectAnswer === null || turn.isCorrectAnswer === undefined) continue;
    if (turn.isCorrectAnswer) streak++;
    else break;
  }
  return streak;
}

export default function LearnPage({ params }: { params: Promise<{ subject: string }> }) {
  return (
    <Suspense
      fallback={
        <main className="flex flex-1 items-center justify-center">
          <Mascot mood="thinking" />
        </main>
      }
    >
      <LearnPageInner params={params} />
    </Suspense>
  );
}

function LearnPageInner({ params }: { params: Promise<{ subject: string }> }) {
  const { subject: rawSubject } = use(params);
  const subject = (rawSubject === "reading" ? "reading" : "math") as Subject;
  const meta = SUBJECT_META[subject];
  const searchParams = useSearchParams();
  const profileId = Number(searchParams.get("profile"));

  const [profile, setProfile] = useState<Profile | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [badgeToast, setBadgeToast] = useState<string | null>(null);
  const [confettiKey, setConfettiKey] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [mood, setMood] = useState<MascotMood>("idle");

  const initialized = useRef(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const speech = useSpeech();

  useEffect(() => {
    fetch("/api/profiles")
      .then((r) => r.json())
      .then((data: { profiles: Profile[] }) => {
        setProfile(data.profiles.find((p) => p.id === profileId) ?? null);
      });
  }, [profileId]);

  const sendTurn = async (history: ChatMessage[]) => {
    setLoading(true);
    setError(null);
    setMood("thinking");
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profileId, subject, history }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error ?? "Something went wrong");
      }
      const data: { turn: TutorTurn; badgesEarned: { key: string; label: string }[] } = await res.json();
      const tutorMessage: ChatMessage = { role: "tutor", text: data.turn.displayText, turn: data.turn };
      setMessages((prev) => [...prev, tutorMessage]);
      speech.speak(data.turn.spokenText);

      if (data.turn.isCorrectAnswer === true || data.turn.activityType === "celebration") {
        setMood("celebrating");
      } else if (data.turn.isCorrectAnswer === false) {
        setMood("encouraging");
      } else {
        setMood("idle");
      }

      if (data.badgesEarned.length > 0) {
        setShowConfetti(true);
        setConfettiKey((k) => k + 1);
        setBadgeToast(data.badgesEarned[0].label);
        setTimeout(() => setShowConfetti(false), 2200);
        setTimeout(() => setBadgeToast(null), 3200);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
      setMood("idle");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!profile || initialized.current) return;
    initialized.current = true;
    sendTurn([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, loading]);

  const submitAnswer = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    const next = [...messages, { role: "kid" as const, text: trimmed }];
    setMessages(next);
    setInput("");
    sendTurn(next);
  };

  const lastTurn = [...messages].reverse().find((m) => m.turn)?.turn;

  if (!profile) {
    return (
      <main className="flex flex-1 items-center justify-center">
        <Mascot mood="thinking" />
      </main>
    );
  }

  return (
    <main className="flex min-h-dvh flex-1 flex-col bg-kip-cream">
      <header className={`flex items-center justify-between gap-3 px-4 py-3 text-white ${meta.color}`}>
        <Link href="/" className="text-2xl" aria-label="Back to profiles">
          ←
        </Link>
        <div className="flex flex-col items-center">
          <span className="font-display text-lg font-semibold">
            {meta.emoji} {meta.title}
          </span>
          {lastTurn && <LevelBar level={lastTurn.difficulty} streak={computeStreak(messages)} />}
        </div>
        <div className="flex items-center gap-2">
          <Mascot mood={mood} size={40} className="shrink-0" />
        <button
          onClick={() => speech.setMuted((m) => !m)}
          className="text-2xl"
          aria-label={speech.muted ? "Unmute tutor voice" : "Mute tutor voice"}
        >
          {speech.muted ? "🔇" : "🔊"}
        </button>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-4 py-6">
        {messages.map((m, i) => (
          <ChatBubble key={i} message={m} avatarKey={profile.avatarKey} />
        ))}
        {loading && (
          <div className="flex items-center gap-2">
            <Mascot mood="thinking" size={44} />
            <div className="flex gap-1 rounded-full bg-white px-4 py-3 shadow-sm">
              <span className="h-2 w-2 animate-bounce rounded-full bg-kip-purple/50 [animation-delay:-0.3s]" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-kip-purple/50 [animation-delay:-0.15s]" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-kip-purple/50" />
            </div>
          </div>
        )}
        {error && (
          <div className="rounded-2xl bg-kip-red/10 px-4 py-3 text-kip-red">
            {error}{" "}
            <button
              className="font-semibold underline"
              onClick={() => sendTurn(messages)}
              disabled={loading}
            >
              Try again
            </button>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      <div className="sticky bottom-0 flex items-center gap-2 border-t-2 border-kip-purple/10 bg-white px-4 py-3">
        {speech.sttSupported && (
          <MicButton
            isListening={speech.isListening}
            disabled={loading}
            onClick={() => {
              if (speech.isListening) {
                speech.stopListening();
              } else {
                speech.startListening((text) => submitAnswer(text));
              }
            }}
          />
        )}
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submitAnswer(input)}
          placeholder="Type your answer..."
          disabled={loading}
          className="min-w-0 flex-1 rounded-full border-2 border-kip-purple/15 bg-kip-cream px-5 py-3 text-lg outline-none focus:border-kip-purple/50"
        />
        <button
          onClick={() => submitAnswer(input)}
          disabled={loading || !input.trim()}
          className="shrink-0 rounded-full bg-kip-purple px-6 py-3 font-display font-semibold text-white shadow-md disabled:opacity-40"
        >
          Send
        </button>
      </div>

      <AnimatePresence>{showConfetti && <Confetti key={confettiKey} />}</AnimatePresence>
      <BadgeToast label={badgeToast} />
    </main>
  );
}
