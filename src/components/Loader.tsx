"use client";

import { useEffect, useState } from "react";

const WORD = "ALING";
const START_DELAY = 300;
const STEP = 170;
const HOLD = 700;
const FADE = 700;

export default function Loader() {
  const [typed, setTyped] = useState(0);
  const [phase, setPhase] = useState<"typing" | "fading" | "done">("typing");

  useEffect(() => {
    const root = document.documentElement;
    root.style.overflow = "hidden";

    const timers: number[] = [];
    for (let i = 1; i <= WORD.length; i++) {
      timers.push(window.setTimeout(() => setTyped(i), START_DELAY + i * STEP));
    }
    const typedAt = START_DELAY + WORD.length * STEP;
    timers.push(window.setTimeout(() => setPhase("fading"), typedAt + HOLD));
    timers.push(
      window.setTimeout(() => {
        setPhase("done");
        root.style.overflow = "";
        root.dataset.loaded = "true";
      }, typedAt + HOLD + FADE),
    );

    return () => {
      timers.forEach(clearTimeout);
      root.style.overflow = "";
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      role="status"
      aria-label="Loading"
      className={`loader fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink transition-opacity ease-out ${
        phase === "fading" ? "opacity-0" : "opacity-100"
      }`}
      style={{ transitionDuration: `${FADE}ms` }}
    >
      <p className="font-mono text-5xl font-medium tracking-[0.35em] text-fg sm:text-7xl">
        <span className="pl-[0.35em]">{WORD.slice(0, typed)}</span>
        <span className="cursor" />
      </p>
      <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.3em] text-faint">
        {typed < WORD.length ? "establishing uplink" : "signal locked"}
      </p>
      <noscript>
        <style>{`.loader{display:none}`}</style>
      </noscript>
    </div>
  );
}
