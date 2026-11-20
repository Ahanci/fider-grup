import { createClient } from "next-sanity";
import { createImageUrlBuilder } from "@sanity/image-url";

export const sanityConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2025-01-01",
};

/** Sanity henüz bağlanmadıysa site yerel makalelerle çalışır. */
export const sanityEnabled = Boolean(sanityConfig.projectId);

export const client = createClient({
  ...sanityConfig,
  // Boş projectId createClient'ı patlatmasın diye yer tutucu; sanityEnabled=false iken çağrılmaz.
  projectId: sanityConfig.projectId || "placeholder",
  useCdn: true,
});

const builder = createImageUrlBuilder({
  projectId: sanityConfig.projectId || "placeholder",
  dataset: sanityConfig.dataset,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const urlFor = (source: any) => builder.image(source);

export const postsQuery = `*[_type=="post" && defined(slug.current)] | order(publishedAt desc){
  _id, title, "slug": slug.current, publishedAt, excerpt, mainImage, seoTitle, seoDescription
}`;

export const postQuery = `*[_type=="post" && slug.current==$slug][0]{
  _id, title, "slug": slug.current, publishedAt, excerpt, mainImage, body, seoTitle, seoDescription
}`;
