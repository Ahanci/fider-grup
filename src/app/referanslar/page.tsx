import type { Metadata } from "next";
import Image from "next/image";
import { references } from "@/lib/references";
import { CtaBand, PageHero } from "@/components/Blocks";

export const metadata: Metadata = {
  title: "Referanslarımız",
  description: "Fider Grup'a güvenen kurum ve kuruluşlar: Türk Kızılayı, Shell, DeFacto, Medical Park ve daha fazlası.",
  alternates: { canonical: "/referanslar" },
};

export default function ReferencesPage() {
  return (
    <>
      <PageHero
        eyebrow="Referanslarımız"
        title="Bize güvenen kurumlar"
        lead="Sanayiden perakendeye, sağlıktan lojistiğe birçok sektörde projeler gerçekleştirdik."
      />
      <ul className="mx-auto mt-14 grid max-w-7xl grid-cols-2 gap-4 px-5 sm:grid-cols-3 lg:grid-cols-6">
        {references.map((r) => (
          <li
            key={r.file}
            className="card-hover grid aspect-[3/2] place-items-center rounded-2xl bg-white p-5"
          >
            <Image
              src={`/refs/${r.file}`}
              alt={r.name}
              width={200}
              height={120}
              className="h-full w-auto max-w-full object-contain"
            />
          </li>
        ))}
      </ul>
      <CtaBand />
    </>
  );
}
