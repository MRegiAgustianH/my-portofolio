"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { LuArrowUpRight } from "react-icons/lu";
import { SiGithub } from "react-icons/si";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { profile } from "@/data/profile";

type Day = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };
type State =
  | { status: "loading" }
  | { status: "error" }
  | { status: "ok"; days: Day[]; total: number };

const LEVELS = ["bg-white/[0.06]", "bg-white/25", "bg-white/45", "bg-white/70", "bg-white"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function Activity() {
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    const ctrl = new AbortController();
    fetch(`https://github-contributions-api.jogruber.de/v4/${profile.githubUser}?y=last`, {
      signal: ctrl.signal,
    })
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status));
        return r.json();
      })
      .then((data: { total?: Record<string, number>; contributions: Day[] }) => {
        const days = data.contributions ?? [];
        const total = data.total?.lastYear ?? days.reduce((sum, d) => sum + d.count, 0);
        setState({ status: "ok", days, total });
      })
      .catch(() => {
        if (!ctrl.signal.aborted) setState({ status: "error" });
      });
    return () => ctrl.abort();
  }, []);

  return (
    <section id="activity" className="mx-auto max-w-6xl px-5 py-28 sm:px-10 md:py-36">
      <SectionHeading index="04" kicker="Activity" title="Transmission history.">
        Contributions on GitHub over the last twelve months.
      </SectionHeading>

      <Reveal>
        <div className="rounded-3xl border border-line bg-panel/70 p-5 backdrop-blur [--cell:11px] sm:p-8 lg:[--cell:14px]">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-3 text-fg"
            >
              <SiGithub aria-hidden className="size-6" />
              <span className="font-mono text-sm">@{profile.githubUser}</span>
              <LuArrowUpRight aria-hidden className="size-4 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <Legend />
          </div>

          {state.status === "loading" && <Skeleton />}
          {state.status === "error" && (
            <div className="grid min-h-40 place-items-center rounded-2xl border border-dashed border-line-strong p-6 text-center">
              <p className="font-mono text-sm text-muted">
                Signal lost. See the full graph on{" "}
                <a href={profile.github} target="_blank" rel="noreferrer" className="text-fg underline underline-offset-4">
                  GitHub
                </a>
                .
              </p>
            </div>
          )}
          {state.status === "ok" && <Graph days={state.days} total={state.total} />}
        </div>
      </Reveal>
    </section>
  );
}

function Graph({ days, total }: { days: Day[]; total: number }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const { weeks, monthLabels, stats } = useMemo(() => {
    const first = new Date(`${days[0]?.date}T00:00:00`);
    const cells: (Day | null)[] = [...Array(isNaN(first.getDay()) ? 0 : first.getDay()).fill(null), ...days];
    const weeks: (Day | null)[][] = [];
    for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));

    let lastMonth = -1;
    const monthLabels = weeks.map((w) => {
      const d = w.find(Boolean);
      if (!d) return "";
      const m = new Date(`${d.date}T00:00:00`).getMonth();
      if (m === lastMonth) return "";
      lastMonth = m;
      return MONTHS[m];
    });
    // Drop a leading partial-month label that would collide with the next one.
    const nextIdx = monthLabels.findIndex((m, i) => i > 0 && m);
    if (monthLabels[0] && nextIdx > 0 && nextIdx < 3) monthLabels[0] = "";

    let longest = 0;
    let run = 0;
    let best: Day | null = null;
    let active = 0;
    for (const d of days) {
      if (d.count > 0) {
        run++;
        active++;
        longest = Math.max(longest, run);
      } else run = 0;
      if (!best || d.count > best.count) best = d;
    }
    // Current streak counts back from today (or yesterday if today is still empty).
    let current = 0;
    for (let i = days.length - 1; i >= 0; i--) {
      if (days[i].count > 0) current++;
      else if (i === days.length - 1) continue;
      else break;
    }

    return {
      weeks,
      monthLabels,
      stats: [
        { label: "Contributions", value: total.toLocaleString("en-US") },
        { label: "Active days", value: String(active) },
        { label: "Longest streak", value: `${longest}d` },
        { label: "Current streak", value: `${current}d` },
      ],
    };
  }, [days, total]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollLeft = el.scrollWidth;
  }, []);

  return (
    <>
      <div ref={scrollRef} className="thin-scroll overflow-x-auto pb-3">
        <div className="inline-flex flex-col gap-2">
          <div className="flex gap-[3px] pl-8 font-mono text-[10px] text-faint">
            {monthLabels.map((m, i) => (
              <span key={i} className="w-(--cell) overflow-visible whitespace-nowrap">
                {m}
              </span>
            ))}
          </div>
          <div className="flex gap-[3px]">
            <div className="mr-1 flex w-7 flex-col gap-[3px] font-mono text-[10px] leading-(--cell) text-faint">
              {["", "Mon", "", "Wed", "", "Fri", ""].map((d, i) => (
                <span key={i} className="h-(--cell)">
                  {d}
                </span>
              ))}
            </div>
            {weeks.map((w, wi) => (
              <div key={wi} className="flex flex-col gap-[3px]">
                {Array.from({ length: 7 }, (_, di) => {
                  const d = w[di];
                  if (!d) return <span key={di} className="size-(--cell)" />;
                  const label = `${d.count} contribution${d.count === 1 ? "" : "s"} on ${new Date(
                    `${d.date}T00:00:00`,
                  ).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`;
                  return (
                    <span
                      key={di}
                      title={label}
                      aria-label={label}
                      className={`size-(--cell) rounded-[3px] ${LEVELS[d.level] ?? LEVELS[0]}`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-panel px-5 py-4">
            <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">{s.label}</dt>
            <dd className="mt-1 text-2xl font-medium tracking-tight">{s.value}</dd>
          </div>
        ))}
      </dl>
    </>
  );
}

function Legend() {
  return (
    <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.15em] text-faint">
      Less
      {LEVELS.map((c) => (
        <span key={c} className={`size-(--cell) rounded-[3px] ${c}`} />
      ))}
      More
    </div>
  );
}

function Skeleton() {
  return (
    <div className="space-y-6" aria-label="Loading contributions">
      <div className="h-[110px] animate-pulse rounded-xl bg-white/[0.04]" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className="h-[74px] animate-pulse rounded-xl bg-white/[0.04]" />
        ))}
      </div>
    </div>
  );
}
