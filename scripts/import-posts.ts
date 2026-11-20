/**
 * Eski siteden gelen 20 makaleyi Sanity'ye aktarır.
 * Kullanım:  npx tsx --env-file=.env.local scripts/import-posts.ts
 * Gerekli:   NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_WRITE_TOKEN
 * Tekrar çalıştırmak güvenlidir (createOrReplace).
 */
import { createReadStream, existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@sanity/client";
import { htmlToBlocks } from "@portabletext/block-tools";
import { Schema } from "@sanity/schema";
import { JSDOM } from "jsdom";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const token = process.env.SANITY_API_WRITE_TOKEN;
if (!projectId || !token) {
  console.error("NEXT_PUBLIC_SANITY_PROJECT_ID ve SANITY_API_WRITE_TOKEN gerekli.");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2025-01-01",
  token,
  useCdn: false,
});

// Blok içerik şeması (post.body ile aynı yapı)
const defaultSchema = Schema.compile({
  name: "default",
  types: [
    {
      type: "object",
      name: "post",
      fields: [
        {
          name: "body",
          type: "array",
          of: [{ type: "block" }, { type: "image", fields: [{ name: "alt", type: "string" }] }],
        },
      ],
    },
  ],
});
const blockContentType = defaultSchema
  .get("post")
  .fields.find((f: { name: string }) => f.name === "body").type;

type Post = {
  id: number;
  slug: string;
  title: string;
  date: string;
  excerpt: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  html: string;
};

const imageCache = new Map<string, string>();
async function uploadImage(src: string): Promise<string | null> {
  const rel = decodeURIComponent(src).replace(/^\//, "");
  const file = join(process.cwd(), "public", rel);
  if (!existsSync(file)) return null;
  const hit = imageCache.get(file);
  if (hit) return hit;
  const asset = await client.assets.upload("image", createReadStream(file), {
    filename: rel.split("/").pop(),
  });
  imageCache.set(file, asset._id);
  return asset._id;
}

function clean(html: string) {
  return html
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<a\b[^>]*>\s*<img\b[^>]*src="https?:[^"]*"[^>]*>\s*<\/a>/gi, "")
    .replace(/<img\b[^>]*src="https?:[^"]*"[^>]*>/gi, "")
    .replace(/&nbsp;/g, " ");
}

async function main() {
  const posts: Post[] = JSON.parse(readFileSync(join(process.cwd(), "content", "posts.json"), "utf8"));

  for (const p of posts) {
    const blocks = htmlToBlocks(clean(p.html), blockContentType, {
      parseHtml: (html) => new JSDOM(html).window.document,
      rules: [
        {
          deserialize(el, _next, block) {
            if (el.nodeName !== "IMG") return undefined;
            const src = (el as HTMLImageElement).getAttribute("src") ?? "";
            return block({ _type: "image", _sanityLocalSrc: src, alt: (el as HTMLImageElement).alt || undefined });
          },
        },
      ],
    });

    // Yerel görselleri Sanity'ye yükle ve referansla
    let cover: string | null = null;
    for (const b of blocks as Array<Record<string, unknown>>) {
      if (b._type === "image") {
        const src = b._sanityLocalSrc as string;
        delete b._sanityLocalSrc;
        const id = await uploadImage(src);
        if (id) {
          b.asset = { _type: "reference", _ref: id };
          cover ??= id;
        } else {
          b._remove = true;
        }
      }
    }
    const body = (blocks as Array<Record<string, unknown>>).filter((b) => !b._remove);

    await client.createOrReplace({
      _id: `post-${p.id}`,
      _type: "post",
      title: p.title,
      slug: { _type: "slug", current: p.slug },
      publishedAt: new Date(p.date).toISOString(),
      excerpt: (p.excerpt ?? "").replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").trim().slice(0, 200),
      seoTitle: p.seoTitle ?? undefined,
      seoDescription: p.seoDescription ?? undefined,
      mainImage: cover ? { _type: "image", asset: { _type: "reference", _ref: cover } } : undefined,
      body,
    });
    console.log("✓", p.slug);
  }
  console.log(`Bitti: ${posts.length} makale aktarıldı.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
