"use client";

import Image from "next/image";
import { useDeferredValue, useMemo, useState } from "react";
import { LuArrowUpRight, LuSearch, LuX } from "react-icons/lu";
import { SiGithub } from "react-icons/si";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { projects, type Project } from "@/data/projects";

const ALL = "All";

export default function Projects() {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState(ALL);
  const deferred = useDeferredValue(query);

  const tags = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of projects) for (const s of p.stack) counts.set(s, (counts.get(s) ?? 0) + 1);
    return [ALL, ...[...counts.entries()].sort((a, b) => b[1] - a[1]).map(([s]) => s)];
  }, []);

  const filtered = useMemo(() => {
    const q = deferred.trim().toLowerCase();
    return projects
      .map((p, i) => ({ p, n: i + 1 }))
      .filter(({ p }) => tag === ALL || p.stack.includes(tag))
      .filter(({ p }) =>
        !q
          ? true
          : [p.title, p.description, ...p.stack, ...p.features].join(" ").toLowerCase().includes(q),
      );
  }, [deferred, tag]);

  return (
    <section id="projects" className="mx-auto max-w-6xl px-5 py-28 sm:px-10 md:py-36">
      <SectionHeading index="03" kicker="Projects" title="Mission log.">
        Information systems, decision support, expert systems, IoT and simulation. Search or filter by stack.
      </SectionHeading>

      {/* Controls */}
      <Reveal className="mb-12 space-y-4">
        <label className="relative block">
          <span className="sr-only">Search projects</span>
          <LuSearch aria-hidden className="pointer-events-none absolute z-10 left-4 top-1/2 size-4 -translate-y-1/2 text-muted" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, feature or tech…"
            className="h-12 w-full rounded-full border border-line bg-panel/70 pl-11 pr-11 text-base text-fg placeholder:text-faint backdrop-blur transition-colors focus:border-line-strong focus:outline-none [&::-webkit-search-cancel-button]:hidden"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute z-10 right-2 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-full text-muted hover:bg-white/5 hover:text-fg"
            >
              <LuX className="size-4" />
            </button>
          )}
        </label>

        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by technology">
          {tags.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTag(t)}
              aria-pressed={tag === t}
              className={`h-9 rounded-full border px-4 font-mono text-xs uppercase tracking-[0.12em] transition-colors ${
                tag === t
                  ? "border-fg bg-fg text-ink"
                  : "border-line text-muted hover:border-line-strong hover:text-fg"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <p className="font-mono text-xs uppercase tracking-[0.2em] text-faint" aria-live="polite">
          Showing {filtered.length} of {projects.length}
        </p>
      </Reveal>

      {/* Log */}
      {filtered.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-line-strong px-6 py-16 text-center">
          <p className="font-mono text-sm text-muted">No signal for “{query}”.</p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setTag(ALL);
            }}
            className="mt-4 text-sm text-fg underline underline-offset-4"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <ol className="relative space-y-14 md:space-y-20 md:before:absolute md:before:bottom-0 md:before:left-[7px] md:before:top-2 md:before:w-px md:before:bg-line">
          {filtered.map(({ p, n }) => (
            <li key={p.slug} className="relative md:pl-14">
              <span aria-hidden className="absolute left-0 top-2 hidden size-[15px] rounded-full border border-line-strong bg-ink md:block">
                <span className="absolute inset-[4px] rounded-full bg-fg" />
              </span>
              <ProjectEntry project={p} n={n} />
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}

function ProjectEntry({ project: p, n }: { project: Project; n: number }) {
  return (
    <Reveal>
      <article className="grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:gap-10">
        <Screenshot project={p} />
        <div className="flex flex-col">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted">
            Log {String(n).padStart(2, "0")}
          </p>
          <h3 className="mt-3 text-2xl font-medium tracking-tight text-balance md:text-3xl">{p.title}</h3>
          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tech stack">
            {p.stack.map((s) => (
              <li key={s} className="rounded-full border border-line px-3 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-fg/80">
                {s}
              </li>
            ))}
          </ul>
          <p className="mt-5 leading-relaxed text-muted text-pretty">{p.description}</p>

          <h4 className="mt-6 font-mono text-[11px] uppercase tracking-[0.25em] text-faint">Key features</h4>
          <ul className="mt-3 space-y-2 text-sm text-fg/90">
            {p.features.map((f) => (
              <li key={f} className="flex gap-3">
                <span aria-hidden className="mt-[9px] h-px w-3 shrink-0 bg-muted" />
                {f}
              </li>
            ))}
          </ul>

          {(p.demo || p.repo) && (
            <div className="mt-7 flex flex-wrap gap-3">
              {p.demo && (
                <a
                  href={p.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-10 items-center gap-2 rounded-full bg-fg px-5 text-sm font-medium text-ink transition-transform hover:-translate-y-0.5"
                >
                  Visit website <LuArrowUpRight aria-hidden className="size-4" />
                </a>
              )}
              {p.repo && (
                <a
                  href={p.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-10 items-center gap-2 rounded-full border border-line-strong px-5 text-sm font-medium text-fg transition-colors hover:bg-white/5"
                >
                  <SiGithub aria-hidden className="size-4" /> Source code
                </a>
              )}
            </div>
          )}
        </div>
      </article>
    </Reveal>
  );
}

function Screenshot({ project: p }: { project: Project }) {
  return (
    <div className="group relative aspect-[16/10] overflow-hidden rounded-2xl border border-line bg-panel">
      {p.screenshot ? (
        <Image
          src={p.screenshot}
          alt={`Screenshot of ${p.title}`}
          fill
          sizes="(min-width: 1024px) 560px, 100vw"
          className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
        />
      ) : (
        <div className="grid-pattern absolute inset-0 grid place-items-center">
          <div className="text-center font-mono text-[11px] uppercase tracking-[0.25em] text-faint">
            <p className="text-muted">Screenshot</p>
            <p className="mt-1">/projects/{p.slug}.png</p>
          </div>
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/5" />
    </div>
  );
}
