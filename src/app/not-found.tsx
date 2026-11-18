"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LuArrowLeft } from "react-icons/lu";

const ASCII_404 = String.raw`
 _  _      ___    _  _
| || |    / _ \  | || |
| || |_  | | | | | || |_
|__   _| | |_| | |__   _|
   |_|    \___/     |_|
`.slice(1);

export default function NotFound() {
  const pathname = usePathname();
  const [path, setPath] = useState("/unknown");
  useEffect(() => {
    if (pathname) setPath(pathname);
  }, [pathname]);
  const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

  return (
    <main className="flex min-h-svh items-center justify-center px-4 py-16">
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-line bg-panel/85 shadow-[0_30px_80px_-20px_rgb(0_0_0/0.9)] backdrop-blur-xl">
        <div className="flex items-center gap-2 border-b border-line px-4 py-3">
          <span className="size-3 rounded-full bg-white/20" />
          <span className="size-3 rounded-full bg-white/12" />
          <span className="size-3 rounded-full bg-white/8" />
          <span className="ml-3 truncate font-mono text-xs text-muted">aling@orbit: ~</span>
        </div>

        <div className="space-y-2 p-5 font-mono text-[13px] leading-relaxed sm:p-7 sm:text-sm">
          <p className="term-line break-all" style={d(200)}>
            <span className="text-muted">aling@orbit:~$</span> cd {path}
          </p>
          <p className="term-line break-all text-muted" style={d(600)}>
            bash: cd: {path}: No such file or directory
          </p>
          <p className="term-line" style={d(1000)}>
            <span className="text-muted">aling@orbit:~$</span> ./scan --signal
          </p>
          <p className="term-line text-muted" style={d(1400)}>
            [scan] sector empty. Page drifted out of orbit.
          </p>

          <pre
            aria-label="404"
            className="term-line overflow-x-auto py-4 text-[11px] leading-tight text-fg sm:text-sm"
            style={d(1800)}
          >
            {ASCII_404}
          </pre>

          <p className="term-line" style={d(2200)}>
            <span className="text-muted">aling@orbit:~$</span> cd ~
            <span className="cursor ml-1" />
          </p>
        </div>

        <div className="term-line border-t border-line px-5 py-4 sm:px-7" style={d(2400)}>
          <Link
            href="/"
            className="group inline-flex h-11 items-center gap-2 rounded-full bg-fg px-5 text-sm font-medium text-ink"
          >
            <LuArrowLeft aria-hidden className="size-4 transition-transform group-hover:-translate-x-0.5" />
            Return to base
          </Link>
        </div>
      </div>
    </main>
  );
}
