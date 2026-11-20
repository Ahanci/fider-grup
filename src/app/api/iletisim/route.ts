import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { contactSchema } from "@/lib/contact";
import { site } from "@/lib/site";

// Basit bellek içi hız sınırı (sunucusuz ortamda örnek başına çalışır; ciddi koruma için Upstash/WAF ekleyin).
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (limited(ip)) return NextResponse.json({ error: "Çok fazla istek" }, { status: 429 });

  const parsed = contactSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Geçersiz veri" }, { status: 400 });
  // Honeypot dolu ise sessizce başarılı dön
  if (parsed.data.website) return NextResponse.json({ ok: true });

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.error("SMTP ortam değişkenleri tanımlı değil; mesaj gönderilemedi.");
    return NextResponse.json({ error: "Mail yapılandırılmamış" }, { status: 503 });
  }

  const { name, phone, email, message } = parsed.data;
  try {
    const transport = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT ?? 465),
      secure: Number(SMTP_PORT ?? 465) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });
    await transport.sendMail({
      from: `"${site.name} Web" <${SMTP_USER}>`,
      to: CONTACT_TO ?? site.email,
      replyTo: email,
      subject: `Web sitesi iletişim formu: ${name.replace(/[\r\n]/g, " ")}`,
      html: `<p><b>Ad:</b> ${esc(name)}<br><b>Telefon:</b> ${esc(phone)}<br><b>E-posta:</b> ${esc(email)}</p><p>${esc(message).replace(/\n/g, "<br>")}</p>`,
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Mail gönderilemedi:", e);
    return NextResponse.json({ error: "Gönderilemedi" }, { status: 500 });
  }
}
