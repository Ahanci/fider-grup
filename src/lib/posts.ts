import { readFileSync } from "node:fs";
import { join } from "node:path";
import { cacheLife, cacheTag } from "next/cache";
import type { PortableTextBlock } from "@portabletext/types";
import { client, postQuery, postsQuery, sanityEnabled, urlFor } from "./sanity";

export type Post = {
  slug: string;
  title: string;
  date: string; // ISO
  excerpt: string;
  cover: string | null;
  coverAlt: string;
  seoTitle: string | null;
  seoDescription: string | null;
  /** Sanity gövdesi */
  body?: PortableTextBlock[];
  /** Eski siteden gelen, temizlenmiş HTML gövde */
  html?: string;
  source: "sanity" | "local";
};

type LocalPost = {
  slug: string;
  title: string;
  date: string;
  excerpt: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  html: string;
};

type SanityPost = {
  title: string;
  slug: string;
  publishedAt: string;
  excerpt?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mainImage?: any;
  seoTitle?: string;
  seoDescription?: string;
  body?: PortableTextBlock[];
};

const ENTITIES: Record<string, string> = {
  "&nbsp;": " ",
  "&amp;": "&",
  "&quot;": '"',
  "&#8217;": "’",
  "&#8220;": "“",
  "&#8221;": "”",
  "&#8211;": "–",
  "&#8230;": "…",
  "&hellip;": "…",
  "&lt;": "<",
  "&gt;": ">",
};

function decode(s: string) {
  return s.replace(/&[#a-z0-9]+;/gi, (m) => ENTITIES[m] ?? m);
}

function plain(html: string) {
  return decode(html.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
}

/** WordPress HTML'ini temizler: yorumlar, stiller, kırık dış görseller. */
function cleanHtml(html: string) {
  return html
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<(script|style|iframe)[\s\S]*?<\/\1>/gi, "")
    // dış sitelere hotlink verilmiş görselleri (ve saran bağlantıları) kaldır
    .replace(/<a\b[^>]*>\s*<img\b[^>]*src="https?:[^"]*"[^>]*>\s*<\/a>/gi, "")
    .replace(/<img\b[^>]*src="https?:[^"]*"[^>]*>/gi, "")
    .replace(/\s(style|class|width|height|srcset|sizes|data-[\w-]+)="[^"]*"/gi, "")
    .replace(/<img\b([^>]*)src="([^"]+)"/gi, (_m, pre, src) =>
      `<img loading="lazy" decoding="async"${pre}src="${encodeURI(decodeURI(src))}"`,
    )
    .replace(/<h1\b/gi, "<h2").replace(/<\/h1>/gi, "</h2>")
    .replace(/&nbsp;/g, " ")
    .replace(/<(p|div|span)>\s*(<br\s*\/?>)?\s*<\/\1>/gi, "")
    .trim();
}

function firstLocalImage(html: string) {
  const m = html.match(/<img\b[^>]*src="(\/uploads\/[^"]+)"/i);
  return m ? encodeURI(decodeURI(m[1])) : null;
}

let localCache: Post[] | null = null;
function loadLocal(): Post[] {
  if (localCache) return localCache;
  const raw: LocalPost[] = JSON.parse(
    readFileSync(join(process.cwd(), "content", "posts.json"), "utf8"),
  );
  localCache = raw.map((p) => {
    let html = cleanHtml(p.html);
    const cover = firstLocalImage(html);
    if (cover) {
      // Kapak olarak gösterilen ilk görseli gövdeden çıkar (aksi halde iki kez görünür).
      html = html.replace(/(?:<figure>\s*)?<img\b[^>]*>(?:\s*<\/figure>)?/i, "");
    }
    // Art arda tekrarlanan aynı görselleri tekle
    html = html.replace(
      /(<img\b[^>]*src="([^"]+)"[^>]*>)((?:\s|<\/?(?:figure|p|a)\b[^>]*>)*)<img\b[^>]*src="\2"[^>]*>/gi,
      "$1",
    );
    return {
      slug: p.slug,
      title: decode(p.title),
      date: new Date(p.date).toISOString(),
      excerpt: (p.excerpt ? plain(p.excerpt) : plain(html).slice(0, 180)).slice(0, 200),
      cover,
      coverAlt: decode(p.title),
      seoTitle: p.seoTitle,
      seoDescription: p.seoDescription,
      html,
      source: "local" as const,
    };
  });
  return localCache;
}

function fromSanity(p: SanityPost): Post {
  return {
    slug: p.slug,
    title: p.title,
    date: p.publishedAt,
    excerpt: p.excerpt ?? "",
    cover: p.mainImage
      ? urlFor(p.mainImage).width(1200).height(675).fit("crop").auto("format").url()
      : null,
    coverAlt: p.mainImage?.alt ?? p.title,
    seoTitle: p.seoTitle ?? null,
    seoDescription: p.seoDescription ?? null,
    body: p.body,
    source: "sanity",
  };
}

/**
 * Tüm makaleler: Sanity (varsa) + eski siteden gelen yerel makaleler.
 * Aynı slug Sanity'de de varsa Sanity sürümü kazanır, böylece içe aktarım
 * sonrası çift kayıt oluşmaz.
 */
export async function getPosts(): Promise<Post[]> {
  "use cache";
  cacheTag("post");
  cacheLife("hours");

  const local = loadLocal();
  let remote: Post[] = [];
  if (sanityEnabled) {
    try {
      remote = (await client.fetch<SanityPost[]>(postsQuery)).map(fromSanity);
    } catch (e) {
      console.error("Sanity makaleleri alınamadı, yerel içerik kullanılıyor:", e);
    }
  }
  const slugs = new Set(remote.map((p) => p.slug));
  return [...remote, ...local.filter((p) => !slugs.has(p.slug))].sort(
    (a, b) => +new Date(b.date) - +new Date(a.date),
  );
}

export async function getPost(slug: string): Promise<Post | null> {
  "use cache";
  cacheTag("post", `post:${slug}`);
  cacheLife("hours");

  if (sanityEnabled) {
    try {
      const p = await client.fetch<SanityPost | null>(postQuery, { slug });
      if (p) return fromSanity(p);
    } catch (e) {
      console.error("Sanity makalesi alınamadı:", e);
    }
  }
  return loadLocal().find((p) => p.slug === slug) ?? null;
}

export function formatDate(iso: string) {
  return new Intl.DateTimeFormat("tr-TR", { dateStyle: "long" }).format(new Date(iso));
}

export function readingMinutes(p: Post) {
  const text = p.html
    ? plain(p.html)
    : (p.body ?? [])
        .map((b) => ("children" in b ? (b.children as { text?: string }[]).map((c) => c.text ?? "").join("") : ""))
        .join(" ");
  return Math.max(1, Math.round(text.split(/\s+/).length / 200));
}
