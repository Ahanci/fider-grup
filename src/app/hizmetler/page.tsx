import type { Metadata } from "next";
import { services } from "@/lib/site";
import { ServiceCard } from "@/components/ServiceCard";
import { CtaBand, PageHero } from "@/components/Blocks";

export const metadata: Metadata = {
  title: "Hizmetlerimiz",
  description:
    "Orta ve yüksek gerilim, trafo işletme sorumluluğu, elektriksel ölçümler, arıza tespiti ve elektrik taahhüt hizmetleri.",
  alternates: { canonical: "/hizmetler" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Hizmetlerimiz"
        title="Enerji altyapınız için uçtan uca mühendislik"
        lead="Proje, uygulama, ölçüm ve bakım süreçlerini tek çatı altında yürütüyoruz."
      />
      <div className="mx-auto mt-14 grid max-w-7xl gap-5 px-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <ServiceCard key={s.slug} s={s} index={i} />
        ))}
      </div>
      <CtaBand />
    </>
  );
}
