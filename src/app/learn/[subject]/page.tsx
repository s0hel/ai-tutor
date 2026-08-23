"use client";

import { Suspense, use, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import Mascot, { type MascotMood } from "@/components/Mascot";
import ChatBubble from "@/components/ChatBubble";
import MicButton from "@/components/MicButton";
import LevelBar from "@/components/LevelBar";
import BadgeToast from "@/components/BadgeToast";
import Confetti from "@/components/Confetti";
import KhanVideo from "@/components/KhanVideo";
import VisualPrompt from "@/components/gifted/VisualPrompt";
import ChoiceGrid from "@/components/gifted/ChoiceGrid";
import { useSpeech } from "@/hooks/useSpeech";
import type { ChatMessage, Profile, Subject, TutorTurn } from "@/lib/types";
import type { ChoiceOption, VisualSpec } from "@/lib/gifted/visualTypes";

const SUBJECT_META: Record<Subject, { title: string; color: string; emoji: string }> = {
  math: { title: "Math Time", color: "bg-kip-teal", emoji: "🔢" },
  reading: { title: "Reading Skills", color: "bg-kip-pink", emoji: "📚" },
  gifted: { title: "Brain Games", color: "bg-kip-orange", emoji: "🧠" },
};

/** All subjects (math, reading, gifted) follow the fixed-skill teach→practice pattern: skillSlug required, board redirect, level/streak. */
function isSkillSubject(subject: Subject): boolean {
  return !!subject;
}

function boardPathFor(subject: Subject): string {
  if (subject === "gifted") return "/learn/gt-board";
  if (subject === "reading") return "/learn/reading-board";
  return "/learn/board";
}

interface PresentedProblem {
  answerType: "choice";
  prompt: VisualSpec;
  options: ChoiceOption[];
}

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
  const subject = (rawSubject === "reading" ? "reading" : rawSubject === "gifted" ? "gifted" : "math") as Subject;
  const meta = SUBJECT_META[subject];
  const searchParams = useSearchParams();
  const router = useRouter();
  const profileId = Number(searchParams.get("profile"));
  const skillSlug = searchParams.get("skill");

  const [profile, setProfile] = useState<Profile | null>(null);
  const [skillTitle, setSkillTitle] = useState<string | null>(null);
  const [skillVideo, setSkillVideo] = useState<{
    videoId: string;
    title: string;
    source?: string;
    sourceUrl?: string;
  } | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [badgeToast, setBadgeToast] = useState<string | null>(null);
  const [confettiKey, setConfettiKey] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [mood, setMood] = useState<MascotMood>("idle");
  const [phase, setPhase] = useState<"teach" | "practice">("teach");
  const [presentedProblem, setPresentedProblem] = useState<PresentedProblem | null>(null);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [selectedCorrect, setSelectedCorrect] = useState<boolean | null>(null);

  const initialized = useRef(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const speech = useSpeech();

  useEffect(() => {
    if (isSkillSubject(subject) && !skillSlug) {
      router.replace(`${boardPathFor(subject)}?profile=${profileId}`);
    }
  }, [subject, skillSlug, profileId, router]);

  useEffect(() => {
    fetch("/api/profiles")
      .then((r) => r.json())
      .then((data: { profiles: Profile[] }) => {
        setProfile(data.profiles.find((p) => p.id === profileId) ?? null);
      });
  }, [profileId]);

  useEffect(() => {
    if (!isSkillSubject(subject) || !skillSlug) return;
    if (subject === "math") {
      fetch("/api/skills")
        .then((r) => r.json())
        .then(
          (data: {
            strands: {
              skills: {
                slug: string;
                title: string;
                videoId?: string;
                videoTitle?: string;
                videoSource?: string;
                videoSourceUrl?: string;
              }[];
            }[];
          }) => {
            const found = data.strands.flatMap((s) => s.skills).find((s) => s.slug === skillSlug);
            setSkillTitle(found?.title ?? null);
            setSkillVideo(
              found?.videoId
                ? {
                    videoId: found.videoId,
                    title: found.videoTitle ?? found.title,
                    source: found.videoSource,
                    sourceUrl: found.videoSourceUrl,
                  }
                : null
            );
          }
        );
    } else if (subject === "reading") {
      fetch("/api/reading-skills")
        .then((r) => r.json())
        .then(
          (data: {
            strands: {
              skills: {
                slug: string;
                title: string;
                videoId?: string;
                videoTitle?: string;
                videoSource?: string;
                videoSourceUrl?: string;
              }[];
            }[];
          }) => {
            const found = data.strands.flatMap((s) => s.skills).find((s) => s.slug === skillSlug);
            setSkillTitle(found?.title ?? null);
            setSkillVideo(
              found?.videoId
                ? {
                    videoId: found.videoId,
                    title: found.videoTitle ?? found.title,
                    source: found.videoSource,
                    sourceUrl: found.videoSourceUrl,
                  }
                : null
            );
          }
        );
    } else {
      fetch("/api/gt-skills")
        .then((r) => r.json())
        .then((data: { batteries: { skills: { slug: string; title: string }[] }[] }) => {
          const found = data.batteries.flatMap((b) => b.skills).find((s) => s.slug === skillSlug);
          setSkillTitle(found?.title ?? null);
          setSkillVideo(null);
        });
    }
  }, [subject, skillSlug]);

  const sendTurn = async (history: ChatMessage[], opts?: { startPractice?: boolean }) => {
    setLoading(true);
    setError(null);
    setMood("thinking");
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          profileId,
          subject,
          history,
          skillSlug: isSkillSubject(subject) ? skillSlug : undefined,
          startPractice: opts?.startPractice ?? false,
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error ?? "Something went wrong");
      }
      const data: {
        turns: TutorTurn[];
        phase: "teach" | "practice";
        badgesEarned: { key: string; label: string }[];
        masteredSkill?: string | null;
        presentedProblem?: PresentedProblem;
      } = await res.json();

      setPhase(data.phase);
      const newMessages: ChatMessage[] = data.turns.map((turn) => ({
        role: "tutor",
        text: turn.displayText,
        turn,
      }));
      setMessages((prev) => [...prev, ...newMessages]);
      const lastTurnData = data.turns[data.turns.length - 1];
      speech.speak(data.turns.map((t) => t.spokenText).join(" "));

      if (lastTurnData.isCorrectAnswer === true || lastTurnData.activityType === "celebration") {
        setMood("celebrating");
      } else if (lastTurnData.isCorrectAnswer === false) {
        setMood("encouraging");
      } else {
        setMood("idle");
      }

      if (data.phase !== "practice") {
        setPresentedProblem(null);
      } else if (typeof lastTurnData.isCorrectAnswer === "boolean") {
        setSelectedCorrect(lastTurnData.isCorrectAnswer);
      }
      if (data.presentedProblem) {
        setPresentedProblem(data.presentedProblem);
        setSelectedOptionId(null);
        setSelectedCorrect(null);
      }

      if (data.masteredSkill) {
        setShowConfetti(true);
        setConfettiKey((k) => k + 1);
        setBadgeToast("Skill Mastered! 🌟");
        setTimeout(() => setShowConfetti(false), 2200);
        setTimeout(() => setBadgeToast(null), 3200);
      } else if (data.badgesEarned.length > 0) {
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
    if (!profile || initialized.current || (isSkillSubject(subject) && !skillSlug)) return;
    initialized.current = true;
    sendTurn([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile, skillSlug]);

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

  const selectChoice = (optionId: string) => {
    if (loading) return;
    setSelectedOptionId(optionId);
    setSelectedCorrect(null);
    submitAnswer(optionId);
  };

  const startPractice = () => {
    sendTurn(messages, { startPractice: true });
  };

  const lastTurn = [...messages].reverse().find((m) => m.turn)?.turn;

  if (!profile || (isSkillSubject(subject) && !skillSlug)) {
    return (
      <main className="flex flex-1 items-center justify-center">
        <Mascot mood="thinking" />
      </main>
    );
  }

  const showChoiceUI = phase === "practice" && !!presentedProblem;

  return (
    <main className="flex min-h-dvh flex-1 flex-col bg-kip-cream">
      <header className={`flex items-center justify-between gap-3 px-4 py-3 text-white ${meta.color}`}>
        <Link
          href={isSkillSubject(subject) ? `${boardPathFor(subject)}?profile=${profileId}` : "/"}
          className="text-2xl"
          aria-label="Back"
        >
          ←
        </Link>
        <div className="flex flex-col items-center">
          <span className="font-display text-lg font-semibold">
            {meta.emoji} {isSkillSubject(subject) && skillTitle ? skillTitle : meta.title}
          </span>
          {lastTurn && isSkillSubject(subject) && <LevelBar level={lastTurn.difficulty} streak={computeStreak(messages)} />}
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
        {subject === "math" && phase === "teach" && skillVideo && (
          <KhanVideo
            videoId={skillVideo.videoId}
            title={skillVideo.title}
            source={skillVideo.source}
            sourceUrl={skillVideo.sourceUrl}
          />
        )}
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
        {showChoiceUI && (
          <div className="flex flex-col items-center gap-4 self-center">
            <VisualPrompt spec={presentedProblem.prompt} />
            <ChoiceGrid
              options={presentedProblem.options}
              onSelect={selectChoice}
              disabled={loading}
              selectedId={selectedOptionId}
              selectedCorrect={selectedCorrect}
            />
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      {isSkillSubject(subject) && phase === "teach" && (
        <div className="flex justify-center border-t-2 border-kip-purple/10 bg-white px-4 py-2">
          <button
            onClick={startPractice}
            disabled={loading}
            className="rounded-full bg-kip-purple px-8 py-2.5 font-display text-base font-semibold text-white shadow-md transition hover:brightness-105 disabled:opacity-40"
          >
            Ready — Start Practice →
          </button>
        </div>
      )}

      {!showChoiceUI && (
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
            placeholder={isSkillSubject(subject) && phase === "teach" ? "Ask Kip a question..." : "Type your answer..."}
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
      )}

      <AnimatePresence>{showConfetti && <Confetti key={confettiKey} />}</AnimatePresence>
      <BadgeToast label={badgeToast} />
    </main>
  );
}
