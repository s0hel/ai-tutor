"use client";

import { useState } from "react";

export default function KhanVideo({
  videoId,
  title,
  source = "Khan Academy",
  sourceUrl = "https://www.khanacademy.org",
}: {
  videoId: string;
  title: string;
  source?: string;
  sourceUrl?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mx-4 mt-3 rounded-2xl border-2 border-kip-purple/10 bg-white px-4 py-3">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-2 text-left font-display text-sm font-semibold text-kip-purple"
      >
        <span>🎬 Watch a quick video first?</span>
        <span aria-hidden>{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <div className="mt-3">
          <div className="aspect-video w-full overflow-hidden rounded-xl bg-kip-cream">
            <iframe
              className="h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`}
              title={title}
              allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <p className="mt-1 text-xs text-kip-ink/40">
            Video by {source} ·{" "}
            <a href={sourceUrl} target="_blank" rel="noreferrer" className="underline">
              {sourceUrl.replace(/^https?:\/\//, "")}
            </a>
          </p>
        </div>
      )}
    </div>
  );
}
