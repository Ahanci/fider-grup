import { defineField, defineType } from "sanity";

export default defineType({
  name: "post",
  title: "Makale",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Başlık", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "Adres (slug)",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Yayın tarihi",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "excerpt",
      title: "Kısa özet",
      type: "text",
      rows: 3,
      validation: (r) => r.max(200),
    }),
    defineField({
      name: "mainImage",
      title: "Kapak görseli",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alternatif metin" }],
    }),
    defineField({
      name: "body",
      title: "İçerik",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", type: "string", title: "Alternatif metin" }],
        },
      ],
    }),
    defineField({ name: "seoTitle", title: "SEO başlığı", type: "string" }),
    defineField({ name: "seoDescription", title: "SEO açıklaması", type: "text", rows: 2 }),
  ],
  orderings: [
    {
      title: "Yayın tarihi (yeni → eski)",
      name: "dateDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: { select: { title: "title", subtitle: "publishedAt", media: "mainImage" } },
});
