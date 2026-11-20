import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/posts";
import { services, site } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();
  const u = (p: string) => `${site.url}${p}`;
  return [
    { url: u("/"), priority: 1 },
    ...["/hakkimizda", "/referanslar", "/iletisim", "/makaleler"].map((p) => ({ url: u(p), priority: 0.7 })),
    ...services.map((s) => ({ url: u(`/hizmetler/${s.slug}`), priority: 0.9 })),
    ...posts.map((p) => ({ url: u(`/makaleler/${p.slug}`), lastModified: p.date, priority: 0.6 })),
  ];
}
