import type { Metadata } from "next";
import Image from "next/image";
import { Eye, Target } from "lucide-react";
import { site } from "@/lib/site";
import { CtaBand, PageHero } from "@/components/Blocks";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description:
    "Fider Grup, 2019'dan beri elektrik taahhüt, mühendislik ve danışmanlık alanında hızlı reaksiyon ve sonuç odaklı hizmet sunar.",
  alternates: { canonical: "/hakkimizda" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Hakkımızda"
        title={`${site.name}: sektörün güvenilir mühendislik ortağı`}
      />
      <div className="mx-auto mt-14 grid max-w-7xl gap-12 px-5 lg:grid-cols-2 lg:items-center">
        <div className="space-y-5 text-lg leading-relaxed text-fg/85">
          <p>
            Elektrik taahhüt sektöründe yılların verdiği tecrübe ve bilgi birikimine sahip kurucularıyla
            yola çıkan {site.name}, {site.founded} itibarıyla sektörün köklü ve öncü bir kuruluşu olma
            yolundaki ilk adımını attı.
          </p>
          <p>
            En güçlü yönlerimiz; istekler ve talepler karşısında hızlı reaksiyon almak ve sonuç odaklı
            bakmaktır. Danışmanlık, proje tasarımı ve taahhüt alanlarında hem işverenlere hem sektöre
            katkı sağlamayı hedefliyoruz.
          </p>
          <p>
            Yenilikçi, iş ve işçi sağlığı güvenliğini ön planda tutan, profesyonel ve ekonomik çözüm
            vizyonuna sahip ekibimizle gerçekleştirdiğimiz projelerde kaliteli hizmet, müşteri memnuniyeti
            ve çevreci sosyal sorumluluk bilinciyle fark yaratıyoruz.
          </p>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-line">
          <Image
            src="/img/muhendis.jpg"
            alt="Elektrik mühendisi saha çalışması"
            fill
            sizes="(min-width:1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>

      <div className="mx-auto mt-16 grid max-w-7xl gap-5 px-5 md:grid-cols-2">
        <div className="rounded-2xl border border-line bg-surface p-8">
          <Eye className="size-7 text-accent" />
          <h2 className="mt-4 font-display text-2xl font-bold">Vizyonumuz</h2>
          <p className="mt-3 leading-relaxed text-muted">
            Sektörde Türkiye&apos;nin bir numaralı elektrik mühendislik şirketi olmak; hizmet kalitesiyle
            müşterilerimizin birinci tercihi olarak sürekliliği sağlamak; eğitime, sağlığa, çevreye ve
            tarihi değerlerimize sahip çıkarak daha bilinçli bir toplumun oluşmasına katkıda bulunmak.
          </p>
        </div>
        <div className="rounded-2xl border border-line bg-surface p-8">
          <Target className="size-7 text-brand" />
          <h2 className="mt-4 font-display text-2xl font-bold">Misyonumuz</h2>
          <p className="mt-3 leading-relaxed text-muted">
            Faaliyette bulunduğumuz sektörlerde bireye ve topluma saygılı, hukuka, ekonomik ve ahlaki
            ilkelere bağlı, sağlık, emniyet ve çevreye duyarlı olarak müşterilerimizin, çalışanlarımızın
            ve çözüm ortaklarımızın beklentilerini en üst seviyede karşılamak.
          </p>
        </div>
      </div>

      <CtaBand />
    </>
  );
}
