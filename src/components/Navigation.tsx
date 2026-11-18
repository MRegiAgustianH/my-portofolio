"use client";

import type { IconType } from "react-icons";
import { LuActivity, LuFolderGit2, LuHouse, LuLayers, LuSend, LuUser } from "react-icons/lu";
import { sections, type SectionId } from "@/data/profile";
import { useActiveSection } from "@/hooks/useActiveSection";

const ICONS: Record<SectionId, IconType> = {
  home: LuHouse,
  profile: LuUser,
  skills: LuLayers,
  projects: LuFolderGit2,
  activity: LuActivity,
  contact: LuSend,
};

const ids = sections.map((s) => s.id);

export default function Navigation() {
  const active = useActiveSection(ids);

  return (
    <>
      {/* Bottom sticky navbar */}
      <nav
        aria-label="Sections"
        className="fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-[max(1rem,env(safe-area-inset-bottom))]"
      >
        <ul className="flex items-center gap-1 rounded-full border border-line bg-ink/70 p-1.5 shadow-[0_10px_40px_-10px_rgb(0_0_0/0.8)] backdrop-blur-xl">
          {sections.map(({ id, label }) => {
            const Icon = ICONS[id];
            const isActive = active === id;
            return (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-label={label}
                  aria-current={isActive ? "true" : undefined}
                  className={`flex h-10 items-center gap-2 rounded-full px-3 text-sm transition-colors duration-300 ${
                    isActive ? "bg-fg text-ink" : "text-muted hover:bg-white/5 hover:text-fg"
                  }`}
                >
                  <Icon className="size-[18px] shrink-0" aria-hidden />
                  <span
                    className={`hidden whitespace-nowrap font-medium ${
                      isActive ? "md:inline" : "lg:inline"
                    }`}
                  >
                    {label}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Right-side dot indicator */}
      <nav
        aria-label="Page position"
        className="fixed right-2 top-1/2 z-40 -translate-y-1/2 sm:right-5"
      >
        <ul className="flex flex-col items-end gap-3">
          {sections.map(({ id, label }, i) => {
            const isActive = active === id;
            return (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-label={`Go to ${label}`}
                  className="group flex items-center gap-3 py-1"
                >
                  <span
                    className={`hidden font-mono text-[10px] uppercase tracking-[0.2em] transition-opacity duration-300 md:block ${
                      isActive ? "text-fg opacity-100" : "text-muted opacity-0 group-hover:opacity-100"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")} {label}
                  </span>
                  <span
                    className={`block w-1.5 rounded-full transition-all duration-500 sm:w-2 ${
                      isActive ? "h-6 bg-fg sm:h-8" : "h-1.5 bg-white/25 group-hover:bg-white/60 sm:h-2"
                    }`}
                  />
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
