import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { site } from "@/lib/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});
const grotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: site.name,
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
    images: ["/img/orta-yuksek-gerilim.jpg"],
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#0b1220",
  colorScheme: "dark light",
};

const themeScript = `try{var t=localStorage.getItem('theme');if(t==='light')document.documentElement.dataset.theme='light'}catch(e){}`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  name: site.name,
  description: site.description,
  url: site.url,
  logo: `${site.url}/logo.png`,
  telephone: "+90 262 644 46 45",
  email: site.email,
  foundingDate: String(site.founded),
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    addressCountry: site.address.country,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="tr"
      className={`${inter.variable} ${grotesk.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="flex min-h-screen flex-col">
        <a
          href="#icerik"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2 focus:text-brandink"
        >
          İçeriğe geç
        </a>
        <Suspense fallback={<div className="h-[72px]" />}>
          <Header />
        </Suspense>
        <main id="icerik" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
