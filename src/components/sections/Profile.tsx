import Image from "next/image";
import { LuGraduationCap, LuLanguages, LuMail, LuMapPin } from "react-icons/lu";
import { SiGithub, SiInstagram } from "react-icons/si";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { experience, profile } from "@/data/profile";
import { projects } from "@/data/projects";

export default function Profile() {
  const stats = [
    { value: String(projects.length), label: "Projects shipped" },
    { value: String(experience.length), label: "Roles held" },
    { value: "2023", label: "Building since" },
  ];

  return (
    <section id="profile" className="mx-auto max-w-6xl px-5 py-28 sm:px-10 md:py-36">
      <SectionHeading index="01" kicker="Profile" title="The person behind the callsign." />

      <div className="grid gap-10 lg:grid-cols-[minmax(0,380px)_1fr] lg:gap-16">
        {/* ID card */}
        <Reveal className="lg:sticky lg:top-10 lg:self-start">
          <div className="overflow-hidden rounded-3xl border border-line bg-panel/80 backdrop-blur">
            <div className="relative aspect-[4/5] overflow-hidden bg-[#d9d9d9]">
              <Image
                src="/profile.jpg"
                alt={`Portrait of ${profile.name}`}
                fill
                sizes="(min-width: 1024px) 380px, 100vw"
                className="object-cover object-[50%_30%] grayscale"
                priority={false}
              />
              <span className="absolute left-4 top-4 rounded-full bg-ink/80 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-fg backdrop-blur">
                ID · {profile.callsign}
              </span>
            </div>
            <div className="space-y-5 p-6">
              <div>
                <p className="text-xl font-medium tracking-tight">{profile.name}</p>
                <p className="mt-1 text-sm text-muted">{profile.role}</p>
              </div>
              <dl className="space-y-3 border-t border-line pt-5 text-sm">
                <Row icon={<LuMapPin />} label="Based in">
                  {profile.location}
                </Row>
                <Row icon={<LuGraduationCap />} label="Education">
                  {profile.education}
                </Row>
                <Row icon={<LuLanguages />} label="Languages">
                  {profile.languages.join(", ")}
                </Row>
              </dl>
              <div className="flex gap-2 border-t border-line pt-5">
                <IconLink href={`mailto:${profile.email}`} label="Email">
                  <LuMail />
                </IconLink>
                <IconLink href={profile.github} label="GitHub">
                  <SiGithub />
                </IconLink>
                <IconLink href={profile.instagram} label="Instagram">
                  <SiInstagram />
                </IconLink>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="space-y-16">
          <Reveal>
            <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-muted">About</h3>
            <div className="mt-5 space-y-5 text-lg leading-relaxed text-fg/90 text-pretty md:text-xl">
              {profile.about.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <dl className="grid grid-cols-3 divide-x divide-line rounded-2xl border border-line bg-panel/60 backdrop-blur">
              {stats.map((s) => (
                <div key={s.label} className="px-4 py-5 sm:px-6">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted sm:text-[11px]">
                    {s.label}
                  </dt>
                  <dd className="mt-2 text-3xl font-medium tracking-tight sm:text-4xl">{s.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal>
            <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-muted">Experience</h3>
            <ol className="relative mt-8 border-l border-line">
              {experience.map((job) => (
                <li key={`${job.role}-${job.org}`} className="relative pb-10 pl-8 last:pb-0">
                  <span
                    aria-hidden
                    className={`absolute -left-[5px] top-1.5 size-[9px] rounded-full border ${
                      job.current ? "border-fg bg-fg shadow-[0_0_12px_rgb(255_255_255/0.6)]" : "border-line-strong bg-ink"
                    }`}
                  />
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">{job.period}</p>
                  <p className="mt-2 text-xl font-medium tracking-tight">{job.role}</p>
                  <p className="mt-1 text-muted">{job.org}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Row({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <span aria-hidden className="mt-0.5 text-muted [&>svg]:size-4">
        {icon}
      </span>
      <dt className="sr-only">{label}</dt>
      <dd className="text-fg/90">{children}</dd>
    </div>
  );
}

function IconLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      aria-label={label}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className="grid size-11 place-items-center rounded-full border border-line text-muted transition-colors hover:border-line-strong hover:text-fg [&>svg]:size-[18px]"
    >
      {children}
    </a>
  );
}
