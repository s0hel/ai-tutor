import type { AvatarKey } from "@/lib/types";

const EMOJI: Record<AvatarKey, string> = {
  fox: "🦊",
  owl: "🦉",
  cat: "🐱",
  dragon: "🐉",
  robot: "🤖",
  bunny: "🐰",
};

const BG: Record<AvatarKey, string> = {
  fox: "bg-kip-orange",
  owl: "bg-kip-purple",
  cat: "bg-kip-pink",
  dragon: "bg-kip-green",
  robot: "bg-kip-teal",
  bunny: "bg-kip-yellow",
};

export default function AvatarIcon({
  avatarKey,
  size = 64,
  className = "",
}: {
  avatarKey: string;
  size?: number;
  className?: string;
}) {
  const key = (avatarKey in EMOJI ? avatarKey : "fox") as AvatarKey;
  return (
    <div
      className={`flex items-center justify-center rounded-full shadow-inner ${BG[key]} ${className}`}
      style={{ width: size, height: size, fontSize: size * 0.55 }}
    >
      <span>{EMOJI[key]}</span>
    </div>
  );
}

export { EMOJI as AVATAR_EMOJI };
