import Reveal from "./Reveal";

export default function SectionHeading({
  index,
  kicker,
  title,
  children,
}: {
  index: string;
  kicker: string;
  title: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <Reveal className="mb-12 md:mb-16">
      <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-muted">
        <span className="text-fg">{index}</span>
        <span className="h-px w-8 bg-line-strong" />
        {kicker}
      </p>
      <h2 className="mt-5 max-w-3xl text-4xl font-medium tracking-tight text-balance sm:text-5xl md:text-6xl">
        {title}
      </h2>
      {children && <div className="mt-5 max-w-2xl text-base text-muted text-pretty md:text-lg">{children}</div>}
    </Reveal>
  );
}
