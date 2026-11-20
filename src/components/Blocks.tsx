import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { references } from "@/lib/references";

export function PageHero({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="bg-grid absolute inset-0" aria-hidden />
      <div
        className="absolute -top-32 left-1/2 size-[520px] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl"
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-5 py-16 md:py-24">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold leading-tight md:text-5xl">
          {title}
        </h1>
        {lead && <p className="mt-4 max-w-2xl text-lg text-muted">{lead}</p>}
      </div>
    </section>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">{eyebrow}</p>
      <h2 className="mt-3 font-display text-3xl font-bold leading-tight md:text-4xl">{title}</h2>
      {lead && <p className="mt-3 text-muted">{lead}</p>}
    </div>
  );
}

export function CtaBand() {
  return (
    <section className="mx-auto mt-24 max-w-7xl px-5">
      <div className="relative overflow-hidden rounded-3xl border border-line bg-surface p-8 md:p-14">
        <div className="bg-grid absolute inset-0 opacity-70" aria-hidden />
        <div className="absolute -right-20 -top-20 size-80 rounded-full bg-brand/15 blur-3xl" aria-hidden />
        <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              Projeniz için <span className="glow-text">teklif</span> alın
            </h2>
            <p className="mt-2 max-w-xl text-muted">
              İhtiyacınızı anlatın, mühendis kadromuz kısa sürede size dönsün.
            </p>
          </div>
          <Link
            href="/iletisim"
            className="inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 font-semibold text-brandink transition hover:brightness-110"
          >
            Bize ulaşın <ArrowRight className="size-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function ReferenceMarquee() {
  const row = [...references, ...references];
  return (
    <div
      className="marquee relative overflow-hidden"
      style={{ maskImage: "linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)" }}
    >
      <ul className="marquee-track flex gap-4">
        {row.map((r, i) => (
          <li
            key={`${r.file}-${i}`}
            aria-hidden={i >= references.length}
            className="grid h-24 w-44 shrink-0 place-items-center rounded-2xl bg-white p-4"
          >
            <Image
              src={`/refs/${r.file}`}
              alt={i < references.length ? r.name : ""}
              width={150}
              height={64}
              className="h-full w-auto max-w-full object-contain"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
