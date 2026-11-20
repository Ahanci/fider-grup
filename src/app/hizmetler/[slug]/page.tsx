import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, Phone } from "lucide-react";
import { regions, services, site } from "@/lib/site";
import { CtaBand, PageHero } from "@/components/Blocks";
import { iconMap } from "@/components/ServiceCard";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/hizmetler/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  if (!s) return {};
  return {
    title: s.title,
    description: s.seoDescription,
    alternates: { canonical: `/hizmetler/${s.slug}` },
    openGraph: { images: [s.image] },
  };
}

export default async function ServicePage({ params }: PageProps<"/hizmetler/[slug]">) {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  if (!s) notFound();
  const Icon = iconMap[s.icon];
  const others = services.filter((x) => x.slug !== s.slug);

  return (
    <>
      <PageHero eyebrow="Hizmetlerimiz" title={s.title} lead={s.short} />

      <div className="mx-auto mt-14 grid max-w-7xl gap-12 px-5 lg:grid-cols-[1fr_340px]">
        <article>
          <div className="relative aspect-[16/8] overflow-hidden rounded-3xl border border-line">
            <Image
              src={s.image}
              alt={s.title}
              fill
              priority
              sizes="(min-width:1024px) 60vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="mt-8 space-y-4 text-lg leading-relaxed text-fg/85">
            {s.intro.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <h2 className="mt-10 flex items-center gap-3 font-display text-2xl font-bold">
            <Icon className="size-6 text-brand" /> Kapsamımız
          </h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {s.items.map((i) => (
              <li key={i} className="flex gap-3 rounded-xl border border-line bg-surface p-4 text-sm">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-accent" />
                {i}
              </li>
            ))}
          </ul>

          <h2 className="mt-10 font-display text-2xl font-bold">Hizmet bölgelerimiz</h2>
          <p className="mt-3 text-muted">
            {regions.join(", ")} başta olmak üzere tüm Türkiye&apos;ye hizmet veriyoruz.
          </p>
        </article>

        <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-line bg-surface p-6">
            <h3 className="font-display text-lg font-semibold">Teklif alın</h3>
            <p className="mt-1 text-sm text-muted">Mühendis kadromuz kısa sürede dönüş yapar.</p>
            <Link
              href="/iletisim"
              className="mt-4 block rounded-full bg-brand px-5 py-3 text-center font-semibold text-brandink hover:brightness-110"
            >
              İletişim formu
            </Link>
            <a
              href={site.phoneHref}
              className="mt-3 flex items-center justify-center gap-2 rounded-full border border-line px-5 py-3 text-sm font-medium hover:border-accent"
            >
              <Phone className="size-4 text-accent" /> {site.phone}
            </a>
          </div>
          <div className="rounded-2xl border border-line bg-surface p-6">
            <h3 className="font-display text-lg font-semibold">Diğer hizmetler</h3>
            <ul className="mt-3 space-y-1">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link
                    href={`/hizmetler/${o.slug}`}
                    className="block rounded-lg px-2 py-2 text-sm text-muted hover:bg-surface2 hover:text-brand"
                  >
                    {o.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      <CtaBand />
    </>
  );
}
