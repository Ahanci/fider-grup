import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import { formatDate, getPost, getPosts, readingMinutes } from "@/lib/posts";
import { site } from "@/lib/site";
import { PostBody } from "@/components/PostBody";
import { PostCard } from "@/components/PostCard";
import { CtaBand } from "@/components/Blocks";

export async function generateStaticParams() {
  return (await getPosts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/makaleler/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = await getPost(slug);
  if (!p) return {};
  return {
    title: p.seoTitle || p.title,
    description: p.seoDescription || p.excerpt,
    alternates: { canonical: `/makaleler/${p.slug}` },
    openGraph: {
      type: "article",
      publishedTime: p.date,
      title: p.seoTitle || p.title,
      description: p.seoDescription || p.excerpt,
      images: p.cover ? [p.cover] : undefined,
    },
  };
}

export default async function PostPage({ params }: PageProps<"/makaleler/[slug]">) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const related = (await getPosts()).filter((p) => p.slug !== post.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    datePublished: post.date,
    description: post.excerpt,
    image: post.cover ? new URL(post.cover, site.url).toString() : undefined,
    author: { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name, logo: { "@type": "ImageObject", url: `${site.url}/logo.png` } },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article className="mx-auto max-w-3xl px-5 pt-12">
        <Link
          href="/makaleler"
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-brand"
        >
          <ArrowLeft className="size-4" /> Tüm makaleler
        </Link>
        <header className="mt-6">
          <div className="flex items-center gap-4 text-xs font-medium uppercase tracking-wider text-accent">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span className="flex items-center gap-1 text-muted normal-case tracking-normal">
              <Clock className="size-3.5" /> {readingMinutes(post)} dk okuma
            </span>
          </div>
          <h1 className="mt-3 font-display text-3xl font-bold leading-tight md:text-5xl">{post.title}</h1>
        </header>

        {post.cover && (
          <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-3xl border border-line">
            <Image
              src={post.cover}
              alt={post.coverAlt}
              fill
              priority
              sizes="(min-width:768px) 768px, 100vw"
              className="object-cover"
            />
          </div>
        )}

        <div className="mt-10">
          <PostBody post={post} />
        </div>
      </article>

      <section className="mx-auto mt-20 max-w-7xl px-5">
        <h2 className="font-display text-2xl font-bold">Diğer makaleler</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {related.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
