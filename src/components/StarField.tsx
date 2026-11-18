"use client";

import { useEffect, useRef } from "react";

type Star = { r: number; a: number; bucket: number };

// Opacity × width buckets so each frame needs only a handful of stroke calls.
const BUCKETS = [
  { alpha: 0.28, width: 0.6 },
  { alpha: 0.45, width: 0.8 },
  { alpha: 0.65, width: 1 },
  { alpha: 0.9, width: 1.3 },
];

const BG = "5, 5, 6";
const SPEED = 0.045; // radians per second

export default function StarField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let cx = 0;
    let cy = 0;
    let stars: Star[] = [];
    let raf = 0;
    let last = performance.now();

    const seed = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Celestial pole sits upper-right; trails wheel around it.
      cx = w * 0.78;
      cy = h * 0.22;
      const maxR = Math.hypot(Math.max(cx, w - cx), Math.max(cy, h - cy));
      const count = Math.round(Math.min(900, Math.max(260, (w * h) / 1700)));
      stars = Array.from({ length: count }, () => ({
        r: Math.sqrt(Math.random()) * maxR,
        a: Math.random() * Math.PI * 2,
        bucket: Math.min(BUCKETS.length - 1, Math.floor(Math.random() ** 1.8 * BUCKETS.length)),
      }));

      ctx.fillStyle = `rgb(${BG})`;
      ctx.fillRect(0, 0, w, h);
    };

    const drawStatic = () => {
      for (const s of stars) {
        const b = BUCKETS[s.bucket];
        ctx.fillStyle = `rgba(236, 236, 240, ${b.alpha})`;
        ctx.beginPath();
        ctx.arc(cx + Math.cos(s.a) * s.r, cy + Math.sin(s.a) * s.r, b.width, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const frame = (t: number) => {
      const dt = Math.min((t - last) / 1000, 0.05);
      last = t;

      ctx.fillStyle = `rgba(${BG}, 0.06)`;
      ctx.fillRect(0, 0, w, h);
      ctx.lineCap = "round";

      for (let i = 0; i < BUCKETS.length; i++) {
        const b = BUCKETS[i];
        ctx.strokeStyle = `rgba(236, 236, 240, ${b.alpha})`;
        ctx.lineWidth = b.width;
        ctx.beginPath();
        for (const s of stars) {
          if (s.bucket !== i) continue;
          const a0 = s.a;
          s.a += SPEED * dt;
          ctx.moveTo(cx + Math.cos(a0) * s.r, cy + Math.sin(a0) * s.r);
          ctx.lineTo(cx + Math.cos(s.a) * s.r, cy + Math.sin(s.a) * s.r);
        }
        ctx.stroke();
      }

      raf = requestAnimationFrame(frame);
    };

    seed();
    if (reduce) drawStatic();
    else raf = requestAnimationFrame(frame);

    // Mobile browsers change innerHeight while scrolling (URL bar);
    // only reseed on width changes or large height changes.
    let prevW = w;
    let prevH = h;
    const onResize = () => {
      if (window.innerWidth === prevW && Math.abs(window.innerHeight - prevH) < 140) return;
      prevW = window.innerWidth;
      prevH = window.innerHeight;
      seed();
      if (reduce) drawStatic();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-20 h-dvh w-screen opacity-80"
    />
  );
}
