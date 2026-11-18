import { LuArrowDown, LuArrowRight, LuMapPin } from "react-icons/lu";
import { profile } from "@/data/profile";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-svh flex-col justify-between px-5 pb-28 pt-8 sm:px-10 md:px-16"
    >
      <header className="hero-in flex items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.25em] text-muted" style={d(0)}>
        <span className="text-fg">{profile.callsign}</span>
        <span className="hidden items-center gap-2 sm:flex">
          <LuMapPin aria-hidden className="size-3.5" />
          {profile.coordinates}
        </span>
        <span>Portfolio / {new Date().getFullYear()}</span>
      </header>

      <div className="mx-auto w-full max-w-6xl py-16">
        <p className="hero-in flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-muted" style={d(100)}>
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-fg opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-fg" />
          </span>
          Callsign “{profile.callsign}”
        </p>

        <h1
          className="hero-in mt-6 text-[clamp(2.6rem,9vw,7.5rem)] font-medium leading-[0.95] tracking-[-0.04em] text-balance"
          style={d(200)}
        >
          {profile.name}
        </h1>

        <div className="hero-in mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-base text-muted sm:text-lg" style={d(320)}>
          <span className="text-fg">{profile.role}</span>
          <span aria-hidden className="h-px w-6 bg-line-strong" />
          <span>{profile.education}</span>
        </div>

        <blockquote
          className="hero-in mt-10 max-w-2xl border-l border-line-strong pl-5 font-serif text-2xl italic leading-snug text-fg/90 sm:text-3xl"
          style={d(440)}
        >
          “{profile.slogan}”
        </blockquote>

        <div className="hero-in mt-12 flex flex-wrap gap-3" style={d(560)}>
          <a
            href="#projects"
            className="group inline-flex h-12 items-center gap-2 rounded-full bg-fg px-6 text-sm font-medium text-ink transition-transform hover:-translate-y-0.5"
          >
            View projects
            <LuArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="#contact"
            className="inline-flex h-12 items-center rounded-full border border-line-strong px-6 text-sm font-medium text-fg transition-colors hover:bg-white/5"
          >
            Get in touch
          </a>
        </div>
      </div>

      <a
        href="#profile"
        className="hero-in mx-auto flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-muted transition-colors hover:text-fg"
        style={d(700)}
      >
        <LuArrowDown aria-hidden className="size-3.5 animate-bounce" />
        Scroll
      </a>
    </section>
  );
}
