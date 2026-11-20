"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, Moon, Phone, Sun, X } from "lucide-react";
import { nav, services, site } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);

  // Sayfa değişince mobil menüyü kapat (render sırasında, efektsiz)
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function toggleTheme() {
    const next = document.documentElement.dataset.theme !== "light";
    if (next) document.documentElement.dataset.theme = "light";
    else delete document.documentElement.dataset.theme;
    try {
      localStorage.setItem("theme", next ? "light" : "dark");
    } catch {}
  }

  const active = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href.split("/").slice(0, 2).join("/"));

  return (
    <header
      className={`sticky top-0 z-50 transition-colors ${
        scrolled || open ? "glass border-x-0 border-t-0" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5">
        <Link href="/" aria-label={`${site.name} ana sayfa`} className="flex items-center">
          <Image
            src="/logo.png"
            alt={site.name}
            width={160}
            height={44}
            priority
            className="h-10 w-auto rounded-md bg-white/95 px-2 py-1"
          />
        </Link>

        <nav aria-label="Ana menü" className="hidden items-center gap-1 lg:flex">
          {nav.map((item) =>
            "children" in item ? (
              <div key={item.label} className="group relative">
                <Link
                  href={item.href}
                  className={`flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:text-brand ${
                    pathname.startsWith("/hizmetler") ? "text-brand" : "text-fg/85"
                  }`}
                >
                  {item.label}
                  <ChevronDown className="size-4 transition-transform group-hover:rotate-180" />
                </Link>
                <div className="invisible absolute left-0 top-full w-80 pt-2 opacity-0 transition-all group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                  <div className="glass rounded-2xl p-2 shadow-2xl">
                    {services.map((s) => (
                      <Link
                        key={s.slug}
                        href={`/hizmetler/${s.slug}`}
                        className="block rounded-xl px-3 py-2.5 text-sm text-fg/85 hover:bg-surface2 hover:text-brand"
                      >
                        {s.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:text-brand ${
                  active(item.href) ? "text-brand" : "text-fg/85"
                }`}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={site.phoneHref}
            className="hidden items-center gap-2 rounded-full border border-line px-3.5 py-2 text-sm font-medium hover:border-accent md:flex"
          >
            <Phone className="size-4 text-accent" />
            {site.phone}
          </a>
          <Link
            href="/iletisim"
            className="hidden rounded-full bg-brand px-5 py-2 text-sm font-semibold text-brandink transition hover:brightness-110 sm:block"
          >
            Teklif Al
          </Link>
          <button
            onClick={toggleTheme}
            aria-label="Açık/koyu temayı değiştir"
            className="grid size-10 place-items-center rounded-full border border-line hover:border-accent"
          >
            <Sun className="size-4 [[data-theme=light]_&]:hidden" />
            <Moon className="hidden size-4 [[data-theme=light]_&]:block" />
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menüyü aç/kapat"
            aria-expanded={open}
            className="grid size-10 place-items-center rounded-full border border-line lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav aria-label="Mobil menü" className="mx-auto max-w-7xl px-5 pb-6 lg:hidden">
          <ul className="space-y-1">
            {nav.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="block rounded-xl px-3 py-3 text-base font-medium hover:bg-surface2"
                >
                  {item.label}
                </Link>
                {"children" in item && (
                  <ul className="ml-3 border-l border-line pl-3">
                    {services.map((s) => (
                      <li key={s.slug}>
                        <Link
                          href={`/hizmetler/${s.slug}`}
                          className="block rounded-lg px-3 py-2 text-sm text-muted hover:text-brand"
                        >
                          {s.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <Link
            href="/iletisim"
            className="mt-4 block rounded-full bg-brand px-5 py-3 text-center font-semibold text-brandink"
          >
            Teklif Al
          </Link>
        </nav>
      )}
    </header>
  );
}
