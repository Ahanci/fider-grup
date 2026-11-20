import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone, ShieldCheck, Timer, FileCheck2, Users } from "lucide-react";
import { getPosts } from "@/lib/posts";
import { references } from "@/lib/references";
import { regions, services, site, whyUs } from "@/lib/site";
import { ServiceCard } from "@/components/ServiceCard";
import { PostCard } from "@/components/PostCard";
import { CtaBand, ReferenceMarquee, SectionTitle } from "@/components/Blocks";
import { CountUp, Reveal } from "@/components/Reveal";

const whyIcons = [Timer, ShieldCheck, FileCheck2, Users];

export default async function Home() {
  const posts = (await getPosts()).slice(0, 3);

  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div className="bg-grid absolute inset-0 -z-10" aria-hidden />
        <div
          className="absolute -top-40 right-0 -z-10 size-[620px] rounded-full bg-accent/10 blur-3xl"
          aria-hidden
        />
        <div
          className="absolute -left-40 top-40 -z-10 size-[420px] rounded-full bg-brand/10 blur-3xl"
          aria-hidden
        />
        <svg
          className="absolute inset-x-0 top-0 -z-10 h-full w-full opacity-60"
          viewBox="0 0 1200 700"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
          aria-hidden
        >
          {[
            "M0 520 H260 L320 460 H620 L680 520 H1200",
            "M0 330 H180 L240 270 H520 L580 210 H900 L960 270 H1200",
            "M120 700 V560 L200 480 H380 L440 420 H760",
          ].map((d, i) => (
            <g key={i}>
              <path d={d} stroke="var(--line)" strokeWidth="1.5" />
              <path
                d={d}
                stroke="var(--accent)"
                strokeWidth="2"
                className="circuit-line"
                style={{ animationDelay: `${i * -2}s` }}
              />
            </g>
          ))}
        </svg>

        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 md:py-28 lg:grid-cols-[1.15fr_.85fr]">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              <span className="size-1.5 animate-pulse rounded-full bg-brand" />
              {site.tagline} · {site.founded}&apos;dan beri
            </p>
            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.08] sm:text-5xl lg:text-6xl">
              Elektrik mühendisliğinde <span className="glow-text">güvenilir</span> çözüm ortağınız
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              Orta ve yüksek gerilimden trafo işletme sorumluluğuna, ölçümden arıza tespitine kadar
              tesisinizin enerji altyapısını Gebze merkezli uzman kadromuzla yönetiyoruz.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/iletisim"
                className="inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 font-semibold text-brandink shadow-[0_0_40px_-8px_var(--brand)] transition hover:brightness-110"
              >
                Teklif Al <ArrowRight className="size-5" />
              </Link>
              <Link
                href="/hizmetler/orta-ve-yuksek-gerilim-sistemleri"
                className="inline-flex items-center gap-2 rounded-full border border-line px-7 py-3.5 font-semibold transition hover:border-accent"
              >
                Hizmetlerimiz
              </Link>
              <a
                href={site.phoneHref}
                className="inline-flex items-center gap-2 rounded-full px-4 py-3.5 text-sm font-medium text-muted hover:text-fg"
              >
                <Phone className="size-4 text-accent" /> {site.phone}
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-brand/20 via-transparent to-accent/20 blur-2xl" />
            <div className="relative overflow-hidden rounded-3xl border border-line">
              <Image
                src="/img/orta-yuksek-gerilim.jpg"
                alt="Yüksek gerilim hattı ve trafo altyapısı"
                width={960}
                height={720}
                priority
                sizes="(min-width:1024px) 40vw, 100vw"
                className="aspect-[4/3] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent" />
              <div className="glass absolute bottom-4 left-4 right-4 rounded-2xl p-4">
                <p className="text-xs uppercase tracking-wider text-accent">EMO yetki belgeli</p>
                <p className="font-display font-semibold">Trafo Yüksek Gerilim İşletme Sorumluluğu</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RAKAMLAR */}
      <section className="mx-auto max-w-7xl px-5">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">
          {[
            { v: <CountUp to={site.founded} />, l: "Kuruluş yılı" },
            { v: <CountUp to={services.length} />, l: "Hizmet alanı" },
            { v: <CountUp to={references.length} suffix="+" />, l: "Referans müşteri" },
            { v: "7/24", l: "Arıza desteği" },
          ].map((s) => (
            <div key={s.l} className="bg-surface p-6 text-center">
              <dt className="sr-only">{s.l}</dt>
              <dd className="font-display text-3xl font-bold text-brand md:text-4xl">{s.v}</dd>
              <p className="mt-1 text-sm text-muted">{s.l}</p>
            </div>
          ))}
        </dl>
      </section>

      {/* HİZMETLER */}
      <section className="mx-auto mt-24 max-w-7xl px-5">
        <SectionTitle
          eyebrow="Hizmetlerimiz"
          title="Enerji altyapınız için uçtan uca mühendislik"
          lead="Proje, uygulama, ölçüm ve bakım süreçlerini tek çatı altında yürütüyoruz."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 3) * 0.08}>
              <ServiceCard s={s} index={i} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* NEDEN */}
      <section className="mx-auto mt-24 max-w-7xl px-5">
        <div className="grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <div>
            <SectionTitle
              eyebrow="Neden Fider Grup"
              title="Sonuç odaklı, güvenli ve raporlanabilir"
              lead="Hızlı reaksiyon ve sonuç odaklı bakış açımızla hem işverenlere hem sektöre katkı sağlıyoruz."
            />
            <p className="mt-6 text-sm text-muted">
              Hizmet bölgelerimiz: {regions.join(" · ")} ve tüm Türkiye.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {whyUs.map((w, i) => {
              const Icon = whyIcons[i];
              return (
                <Reveal key={w.title} delay={i * 0.07}>
                  <div className="h-full rounded-2xl border border-line bg-surface p-6">
                    <Icon className="size-6 text-accent" />
                    <h3 className="mt-4 font-display text-lg font-semibold">{w.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{w.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* REFERANSLAR */}
      <section className="mt-24">
        <div className="mx-auto max-w-7xl px-5">
          <SectionTitle eyebrow="Referanslarımız" title="Güvenen kurumlar" />
        </div>
        <div className="mt-8">
          <ReferenceMarquee />
        </div>
      </section>

      {/* MAKALELER */}
      <section className="mx-auto mt-24 max-w-7xl px-5">
        <div className="flex items-end justify-between gap-4">
          <SectionTitle eyebrow="Makaleler" title="Elektrik dünyasından son yazılar" />
          <Link
            href="/makaleler"
            className="hidden shrink-0 items-center gap-1 text-sm font-semibold text-brand sm:inline-flex"
          >
            Tümünü gör <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {posts.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
