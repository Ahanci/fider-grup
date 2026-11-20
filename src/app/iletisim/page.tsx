import type { Metadata } from "next";
import { Mail, MapPin, Phone, Printer, Smartphone } from "lucide-react";
import { site } from "@/lib/site";
import { PageHero } from "@/components/Blocks";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "İletişim",
  description: `${site.name} iletişim bilgileri: ${site.address.street}, Gebze / Kocaeli. Tel: ${site.phone}`,
  alternates: { canonical: "/iletisim" },
};

export default function ContactPage() {
  const rows = [
    { Icon: MapPin, label: "Adres", value: `${site.address.street}, ${site.address.city} / ${site.address.region}` },
    { Icon: Phone, label: "Telefon", value: site.phone, href: site.phoneHref },
    { Icon: Smartphone, label: "Cep", value: site.mobile, href: site.mobileHref },
    { Icon: Printer, label: "Faks", value: site.fax },
    { Icon: Mail, label: "E-posta", value: site.email, href: `mailto:${site.email}` },
  ];
  return (
    <>
      <PageHero
        eyebrow="İletişim"
        title="Projenizi konuşalım"
        lead="Teklif ve bilgi almak için formu doldurun ya da bizi arayın."
      />
      <div className="mx-auto mt-14 grid max-w-7xl gap-10 px-5 lg:grid-cols-2">
        <div>
          <ul className="space-y-4">
            {rows.map(({ Icon, label, value, href }) => (
              <li key={label} className="flex items-start gap-4 rounded-2xl border border-line bg-surface p-5">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent">
                  <Icon className="size-5" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted">{label}</p>
                  {href ? (
                    <a href={href} className="font-medium hover:text-brand">
                      {value}
                    </a>
                  ) : (
                    <p className="font-medium">{value}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-6 overflow-hidden rounded-2xl border border-line">
            <iframe
              title="Fider Grup konumu"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=${encodeURIComponent(site.mapsQuery)}&output=embed`}
              className="h-72 w-full"
            />
          </div>
        </div>
        <ContactForm />
      </div>
    </>
  );
}
