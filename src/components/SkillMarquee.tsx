"use client";

import { useEffect, useRef } from "react";
import { skills } from "@/data/skills";

const COPIES = 3;

/**
 * Infinite row that drifts left → right and can be dragged/swiped.
 * Releasing a drag throws the row with momentum, then it eases back to its cruise speed.
 */
export default function SkillMarquee({
  from,
  to,
  speed = 36,
  label,
}: {
  from: number;
  to?: number;
  speed?: number;
  label: string;
}) {
  const items = skills.slice(from, to);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const setRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const set = setRef.current;
    if (!viewport || !track || !set) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cruise = reduce ? 0 : speed;

    let setW = set.offsetWidth;
    let x = -setW;
    let v = cruise;
    let hover = false;
    let dragging = false;
    let lastX = 0;
    let lastT = 0;
    let dragV = 0;
    let prev = performance.now();
    let raf = 0;

    const wrap = () => {
      if (setW <= 0) return;
      while (x >= 0) x -= setW;
      while (x < -setW) x += setW;
    };

    const tick = (t: number) => {
      const dt = Math.min((t - prev) / 1000, 0.05);
      prev = t;
      if (!dragging) {
        const target = hover ? cruise * 0.3 : cruise;
        v += (target - v) * Math.min(1, dt * 2.2);
        x += v * dt;
      }
      wrap();
      track.style.transform = `translate3d(${x}px,0,0)`;
      raf = requestAnimationFrame(tick);
    };

    const onDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      lastT = e.timeStamp;
      dragV = 0;
      viewport.setPointerCapture(e.pointerId);
      viewport.dataset.dragging = "true";
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      const dt = (e.timeStamp - lastT) / 1000;
      x += dx;
      if (dt > 0) dragV = dragV * 0.6 + (dx / dt) * 0.4;
      lastX = e.clientX;
      lastT = e.timeStamp;
    };
    const onUp = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      v = Math.max(-2500, Math.min(2500, dragV));
      if (viewport.hasPointerCapture(e.pointerId)) viewport.releasePointerCapture(e.pointerId);
      delete viewport.dataset.dragging;
    };
    const onEnter = () => (hover = true);
    const onLeave = () => (hover = false);

    const ro = new ResizeObserver(() => {
      const ratio = setW ? x / setW : -1;
      setW = set.offsetWidth;
      x = ratio * setW;
    });
    ro.observe(set);

    viewport.addEventListener("pointerdown", onDown);
    viewport.addEventListener("pointermove", onMove);
    viewport.addEventListener("pointerup", onUp);
    viewport.addEventListener("pointercancel", onUp);
    viewport.addEventListener("pointerenter", onEnter);
    viewport.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      viewport.removeEventListener("pointerdown", onDown);
      viewport.removeEventListener("pointermove", onMove);
      viewport.removeEventListener("pointerup", onUp);
      viewport.removeEventListener("pointercancel", onUp);
      viewport.removeEventListener("pointerenter", onEnter);
      viewport.removeEventListener("pointerleave", onLeave);
    };
  }, [speed]);

  return (
    <div
      ref={viewportRef}
      role="region"
      aria-label={label}
      className="fade-edges cursor-grab select-none overflow-hidden py-1 touch-pan-y data-[dragging]:cursor-grabbing"
    >
      <div ref={trackRef} className="flex w-max will-change-transform">
        {Array.from({ length: COPIES }, (_, copy) => (
          <ul
            key={copy}
            ref={copy === 0 ? setRef : undefined}
            aria-hidden={copy > 0 ? true : undefined}
            className="flex shrink-0 gap-3 pr-3"
          >
            {items.map(({ name, icon: Icon }) => (
              <li
                key={name}
                className="flex h-16 shrink-0 items-center gap-3 rounded-2xl border border-line bg-panel/70 px-5 backdrop-blur transition-colors hover:border-line-strong md:h-20 md:px-6"
              >
                <Icon aria-hidden className="size-5 text-fg md:size-6" />
                <span className="whitespace-nowrap text-sm font-medium text-fg/90 md:text-base">{name}</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
