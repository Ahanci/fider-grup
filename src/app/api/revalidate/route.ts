import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

// Sanity webhook: makale yayınlanınca/güncellenince önbelleği yeniler.
export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) return NextResponse.json({ error: "Secret tanımlı değil" }, { status: 500 });

  const { isValidSignature, body } = await parseBody<{ _type?: string; slug?: string }>(req, secret);
  if (!isValidSignature) return NextResponse.json({ error: "Geçersiz imza" }, { status: 401 });

  revalidateTag("post", "max");
  if (body?.slug) revalidateTag(`post:${body.slug}`, "max");
  return NextResponse.json({ revalidated: true });
}
