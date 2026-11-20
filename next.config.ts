import type { NextConfig } from "next";
import { readFileSync } from "node:fs";
import { join } from "node:path";

// Eski WordPress adreslerini yeni yapıya 301 ile yönlendir (SEO'yu korur).
function legacyRedirects() {
  const posts: { slug: string }[] = JSON.parse(
    readFileSync(join(process.cwd(), "content", "posts.json"), "utf8"),
  );
  const services = [
    "orta-ve-yuksek-gerilim-sistemleri",
    "zayif-akim-sistemleri",
    "kuvvetli-akim-tesisatlari",
    "elektrik-taahhut",
    "elektriksel-olcumler",
    "elektrik-ariza",
    "trafo-isletme-sorumlulugu",
  ];
  return [
    { source: "/makale", destination: "/makaleler", permanent: true },
    ...services.map((s) => ({
      source: `/${s}`,
      destination: `/hizmetler/${s}`,
      permanent: true,
    })),
    ...posts.map((p) => ({
      source: `/${p.slug}`,
      destination: `/makaleler/${p.slug}`,
      permanent: true,
    })),
  ];
}

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
  async redirects() {
    return legacyRedirects();
  },
};

export default nextConfig;
