import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone, Smartphone } from "lucide-react";
import { services, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Image
            src="/logo.png"
            alt={site.name}
            width={160}
            height={44}
            className="h-10 w-auto rounded-md bg-white/95 px-2 py-1"
          />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            {site.tagline}. {site.founded}&apos;dan beri Çayırova / Kocaeli merkezli, tüm Türkiye&apos;ye
            hizmet.
          </p>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-brand">
            Hizmetler
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/hizmetler/${s.slug}`} className="text-muted hover:text-fg">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-brand">
            Kurumsal
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            {[
              ["/hakkimizda", "Hakkımızda"],
              ["/referanslar", "Referanslar"],
              ["/makaleler", "Makaleler"],
              ["/iletisim", "İletişim"],
            ].map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="hover:text-fg">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-brand">
            İletişim
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-accent" />
              <span>
                {site.address.street}, {site.address.city} / {site.address.region}
              </span>
            </li>
            <li className="flex gap-3">
              <Phone className="size-4 shrink-0 text-accent" />
              <a href={site.phoneHref} className="hover:text-fg">
                {site.phone}
              </a>
            </li>
            <li className="flex gap-3">
              <Smartphone className="size-4 shrink-0 text-accent" />
              <a href={site.mobileHref} className="hover:text-fg">
                {site.mobile}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail className="size-4 shrink-0 text-accent" />
              <a href={`mailto:${site.email}`} className="hover:text-fg">
                {site.email}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line py-5 text-center text-xs text-muted">
        © {site.founded} {site.name}. Tüm hakları saklıdır.
      </div>
    </footer>
  );
}
