import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Zap } from "lucide-react";
import { formatDate, type Post } from "@/lib/posts";

export function PostCard({ post, priority = false }: { post: Post; priority?: boolean }) {
  return (
    <Link
      href={`/makaleler/${post.slug}`}
      className="card-hover group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-surface2">
        {post.cover ? (
          <Image
            src={post.cover}
            alt={post.coverAlt}
            fill
            priority={priority}
            sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="grid h-full place-items-center bg-[radial-gradient(circle_at_30%_20%,var(--glow),transparent_60%)]">
            <div className="absolute inset-0 bg-grid opacity-60" />
            <Zap className="relative size-12 text-brand/80" />
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <time dateTime={post.date} className="text-xs font-medium uppercase tracking-wider text-accent">
          {formatDate(post.date)}
        </time>
        <h3 className="mt-2 font-display text-lg font-semibold leading-snug">{post.title}</h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted">{post.excerpt}</p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand">
          Devamını oku
          <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
