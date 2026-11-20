import type { Metadata } from "next";
import { getPosts } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";
import { CtaBand, PageHero } from "@/components/Blocks";

export const metadata: Metadata = {
  title: "Makaleler",
  description:
    "Topraklama ölçümü, trafo işletme, kablo çeşitleri, termal görüntüleme ve daha fazlası: Fider Grup elektrik mühendisliği makaleleri.",
  alternates: { canonical: "/makaleler" },
};

export default async function PostsPage() {
  const posts = await getPosts();
  return (
    <>
      <PageHero
        eyebrow="Makaleler"
        title="Elektrik mühendisliği rehberi"
        lead="Uzman kadromuzdan ölçüm, bakım, trafo ve tesisat konularında bilgilendirici yazılar."
      />
      <div className="mx-auto mt-14 grid max-w-7xl gap-5 px-5 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((p, i) => (
          <PostCard key={p.slug} post={p} priority={i < 3} />
        ))}
      </div>
      <CtaBand />
    </>
  );
}
