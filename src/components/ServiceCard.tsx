import Link from "next/link";
import { ArrowUpRight, Cable, Gauge, HardHat, ShieldCheck, Wifi, Wrench, Zap } from "lucide-react";
import type { Service, ServiceIcon } from "@/lib/site";

export const iconMap: Record<ServiceIcon, typeof Zap> = {
  zap: Zap,
  cable: Cable,
  wifi: Wifi,
  hardhat: HardHat,
  gauge: Gauge,
  wrench: Wrench,
  shield: ShieldCheck,
};

export function ServiceCard({ s, index }: { s: Service; index: number }) {
  const Icon = iconMap[s.icon];
  return (
    <Link
      href={`/hizmetler/${s.slug}`}
      className="card-hover group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface p-6"
    >
      <span className="absolute right-5 top-4 font-display text-5xl font-bold text-fg/[0.05]">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="grid size-12 place-items-center rounded-xl bg-brand/10 text-brand ring-1 ring-brand/30">
        <Icon className="size-6" />
      </span>
      <h3 className="mt-5 font-display text-xl font-semibold leading-snug">{s.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{s.short}</p>
      <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-accent">
        İncele
        <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}
