import { LuArrowUpRight, LuMail, LuMapPin } from "react-icons/lu";
import { SiGithub, SiInstagram } from "react-icons/si";
import Reveal from "@/components/Reveal";
import { profile } from "@/data/profile";

export default function Contact() {
  const channels = [
    { label: "Email", value: profile.email, href: `mailto:${profile.email}`, icon: LuMail },
    { label: "GitHub", value: profile.githubUser, href: profile.github, icon: SiGithub },
    { label: "Instagram", value: `@${profile.instagramHandle}`, href: profile.instagram, icon: SiInstagram },
    { label: "Location", value: profile.location, icon: LuMapPin },
  ];

  return (
    <section id="contact" className="mx-auto flex min-h-[85svh] max-w-6xl flex-col px-5 pb-36 pt-28 sm:px-10 md:pt-36">
      <Reveal>
        <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-muted">
          <span className="text-fg">05</span>
          <span className="h-px w-8 bg-line-strong" />
          Contact
        </p>
        <h2 className="mt-5 text-[clamp(2.75rem,9vw,7rem)] font-medium leading-[0.95] tracking-[-0.04em]">
          Open a channel.
        </h2>
        <p className="mt-6 max-w-xl text-lg text-muted text-pretty">
          Have a project, a system to build, or a class to run? Send a message and I’ll get back to you.
        </p>
        <a
          href={`mailto:${profile.email}`}
          className="group mt-10 inline-flex max-w-full items-center gap-3 border-b border-line-strong pb-2 text-xl font-medium tracking-tight transition-colors hover:border-fg sm:text-3xl"
        >
          <span className="truncate">{profile.email}</span>
          <LuArrowUpRight aria-hidden className="size-6 shrink-0 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
        </a>
      </Reveal>

      <Reveal className="mt-16">
        <ul className="divide-y divide-line border-y border-line">
          {channels.map(({ label, value, href, icon: Icon }) => {
            const inner = (
              <>
                <span className="flex items-center gap-4">
                  <Icon aria-hidden className="size-5 text-muted" />
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted">{label}</span>
                </span>
                <span className="flex min-w-0 items-center gap-2 text-right text-fg">
                  <span className="truncate">{value}</span>
                  {href && (
                    <LuArrowUpRight aria-hidden className="size-4 shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  )}
                </span>
              </>
            );
            return (
              <li key={label}>
                {href ? (
                  <a
                    href={href}
                    {...(href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
                    className="group flex items-center justify-between gap-4 py-5 transition-colors hover:bg-white/[0.03] sm:px-2"
                  >
                    {inner}
                  </a>
                ) : (
                  <div className="flex items-center justify-between gap-4 py-5 sm:px-2">{inner}</div>
                )}
              </li>
            );
          })}
        </ul>
      </Reveal>

      <footer className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-20 font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span>Callsign {profile.callsign} · Over and out</span>
      </footer>
    </section>
  );
}
