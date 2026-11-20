import { PortableText, type PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";
import type { Post } from "@/lib/posts";

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      return (
        <figure>
          <Image
            src={urlFor(value).width(1200).auto("format").url()}
            alt={value.alt ?? ""}
            width={1200}
            height={800}
            className="h-auto w-full rounded-2xl border border-line"
          />
          {value.alt && <figcaption>{value.alt}</figcaption>}
        </figure>
      );
    },
  },
  marks: {
    link: ({ value, children }) => (
      <a href={value?.href} target={value?.href?.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
        {children}
      </a>
    ),
  },
};

export function PostBody({ post }: { post: Post }) {
  if (post.body) {
    return (
      <div className="prose-fider">
        <PortableText value={post.body} components={components} />
      </div>
    );
  }
  // Eski siteden gelen içerik: build-time'da temizlenmiş, güvenilir kaynak (kendi yedeğimiz).
  return <div className="prose-fider" dangerouslySetInnerHTML={{ __html: post.html ?? "" }} />;
}
