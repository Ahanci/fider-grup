<div align="center">

# ⚡ Fider Grup

**Elektrik Mühendislik Hizmetleri · Çayırova / Kocaeli**

Eski WordPress sitesinin yerine geçen; hızlı, modern ve SEO dostu kurumsal web sitesi.

![Next.js](https://img.shields.io/badge/Next.js_16-000?logo=nextdotjs) ![React](https://img.shields.io/badge/React_19-149eca?logo=react&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-3178c6?logo=typescript&logoColor=white) ![Tailwind](https://img.shields.io/badge/Tailwind_v4-0ea5e9?logo=tailwindcss&logoColor=white) ![Sanity](https://img.shields.io/badge/Sanity-f03e2f?logo=sanity&logoColor=white)

</div>

---

## İçindekiler

1. [Özellikler](#1-özellikler)
2. [Hızlı başlangıç](#2-hızlı-başlangıç)
3. [Proje yapısı](#3-proje-yapısı)
4. [Makaleler: eski içerik + Sanity](#4-makaleler-eski-içerik--sanity)
5. [Tasarım sistemi](#5-tasarım-sistemi)
6. [İletişim formu](#6-iletişim-formu)
7. [SEO ve eski adreslerin yönlendirilmesi](#7-seo-ve-eski-adreslerin-yönlendirilmesi)
8. [Vercel'de yayınlama ve alan adı](#8-vercelde-yayınlama-ve-alan-adı)
9. [Rakip analizi](#9-rakip-analizi-fibaelektrikcom)
10. [Güvenlik notları](#10-güvenlik-notları)
11. [Yapılacaklar](#11-yapılacaklar)

---

## 1. Özellikler

- **Next.js 16 (App Router) + Cache Components**: sayfalar statik üretilir, makale verisi `use cache` + etiketle önbelleğe alınır.
- **Makaleler**: sitede ilk günden eski siteden gelen **20 makale** vardır. Sanity bağlandığında yeni yazılar Sanity'den gelir, ikisi birleşir.
- **Koyu/açık tema**, devre-grid dokusu, cam efektli kartlar, kaydırmada beliren bölümler (`prefers-reduced-motion` desteği).
- 7 hizmet sayfası, Hakkımızda, Referanslar (logo şeridi), İletişim (form + harita), 404.
- SEO: `generateMetadata`, `sitemap.xml`, `robots.txt`, JSON-LD (Organization/LocalBusiness/Article), eski adreslerden **301 yönlendirmeleri**.
- İletişim formu: `zod` doğrulama, honeypot, hız sınırı, SMTP ile mail.
- Gömülü **Sanity Studio** (`/studio`) ve webhook ile anında yenileme.

| Katman | Seçim |
|---|---|
| Framework | Next.js 16, React 19, TypeScript, React Compiler |
| Stil | Tailwind CSS v4 (CSS değişkenleri ile tema) |
| Font | Space Grotesk (başlık) + Inter (gövde), `next/font` |
| İkon / animasyon | `lucide-react`, `framer-motion` |
| İçerik | Sanity (`next-sanity`, `@portabletext/react`) |
| Form | `react-hook-form` + `zod` + `nodemailer` |

---

## 2. Hızlı başlangıç

Gerekenler: **Node.js 20+**, Git.

```bash
npm install
cp .env.example .env.local   # Windows: copy .env.example .env.local
npm run dev                  # http://localhost:3000
```

Sanity **olmadan da** çalışır: makaleler `content/posts.json` dosyasından okunur.

| Komut | Ne yapar |
|---|---|
| `npm run dev` | Geliştirme sunucusu |
| `npm run build` | Üretim derlemesi (yayından önce hatasız olmalı) |
| `npm run start` | Derlenmiş siteyi çalıştırır |
| `npm run lint` | Kod kontrolü |
| `npx tsx --env-file=.env.local scripts/import-posts.ts` | Eski makaleleri Sanity'ye aktarır |

> Bu Next.js sürümünün API'leri eğitim verilerinden farklı olabilir. Kod yazmadan önce `node_modules/next/dist/docs/` altındaki ilgili rehbere bakın (`AGENTS.md`).

---

## 3. Proje yapısı

```
src/
  app/
    page.tsx                  # ana sayfa
    hizmetler/[slug]/         # 7 hizmet sayfası
    makaleler/                # liste + [slug] detay
    hakkimizda/ referanslar/ iletisim/
    api/iletisim/             # form → SMTP
    api/revalidate/           # Sanity webhook
    studio/[[...tool]]/       # gömülü Sanity Studio
    sitemap.ts robots.ts not-found.tsx
  components/                 # Header, Footer, Blocks, PostCard, ContactForm ...
  lib/
    site.ts                   # firma bilgileri + hizmet içerikleri (tek yer)
    posts.ts                  # makale veri katmanı (Sanity + yerel birleşimi)
    sanity.ts                 # client, GROQ sorguları
    references.ts             # referans logoları
sanity/schemaTypes/post.ts    # makale şeması
scripts/import-posts.ts       # eski makaleleri Sanity'ye aktarma
content/                      # eski siteden çıkan JSON (kaynak)
public/uploads/               # eski site görselleri (makale içi)
public/refs/  public/img/     # referans logoları, hizmet görselleri
```

Firma bilgisi (telefon, adres, e-posta) ve hizmet metinleri yalnızca [`src/lib/site.ts`](src/lib/site.ts) içinde tutulur.

| | |
|---|---|
| Firma | **Fider Grup** · Elektrik Mühendislik Hizmetleri · Kuruluş 2019 |
| Adres | Cumhuriyet Mah. Turgut Özal Cad. No:70 İç Kapı No:4, Çayırova / Kocaeli |
| Telefon / Cep | 0262 644 56 45 · 0554 236 15 87 |
| E-posta | info@fidergrup.com |

---

## 4. Makaleler: eski içerik + Sanity

**Mevcut durum:** `content/posts.json` içindeki 20 makale site açılışında yayındadır. HTML temizlenir (WordPress yorumları, stiller, kırık dış görseller kaldırılır), yerel görseller `public/uploads/` altından sunulur.

**Birleşim kuralı** ([`src/lib/posts.ts`](src/lib/posts.ts)): Sanity'deki makaleler + yerel makaleler tek listede, yeni → eski sıralı gösterilir. Aynı `slug` Sanity'de varsa Sanity sürümü kazanır. Yani:

- Sanity bağlanmadan: 20 eski makale görünür.
- Sanity bağlanınca: yeni makaleler listeye eklenir, eskiler yerinde kalır.
- Eskileri aktarınca: Sanity'deki kopyalar eskilerin yerini alır, çift kayıt olmaz.

### 4.1 Sanity'yi bağlama (bir kez)

1. [sanity.io/manage](https://www.sanity.io/manage) → yeni proje (ücretsiz plan), dataset `production`. **Project ID**'yi kopyalayın.
2. `.env.local` içine yazın:
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=xxxxxxxx
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_REVALIDATE_SECRET=uzun-rastgele-bir-metin
   ```
3. Sanity paneli → **API → CORS origins**: `http://localhost:3000`, Vercel adresiniz ve `https://fidergrup.com` (kimlik bilgisiyle izin).
4. `npm run dev` → `http://localhost:3000/studio` adresinde Sanity hesabıyla giriş yapın.

### 4.2 Eski makaleleri Sanity'ye aktarma (isteğe bağlı)

Sanity paneli → **API → Tokens** → *Editor* yetkili token oluşturup `.env.local` içine `SANITY_API_WRITE_TOKEN` olarak ekleyin (repoya **eklemeyin**), sonra:

```bash
npx tsx --env-file=.env.local scripts/import-posts.ts
```

Betik HTML'i Portable Text'e çevirir, yerel görselleri Sanity'ye yükler, `createOrReplace` ile yazar (tekrar çalıştırmak güvenlidir). Aktarımdan sonra Studio'da başlık seviyelerini ve tabloları gözle kontrol edin.

> Bu betik henüz gerçek bir Sanity projesiyle denenmedi; ilk çalıştırmada çıktıyı kontrol edin.

### 4.3 Yeni makale yayınlama ve anında yenileme

Studio → **Makale → Create → doldur → Publish**. Sitenin hemen güncellenmesi için webhook ekleyin:

Sanity paneli → **API → Webhooks → Create** → URL `https://SITENIZ/api/revalidate`, tetikleyici *Create/Update/Delete*, filtre `_type == "post"`, secret = `SANITY_REVALIDATE_SECRET`, projeksiyon `{ "slug": slug.current }`.

Webhook yoksa içerik en geç 1 saat içinde (önbellek süresi) görünür.

Ücretsiz planın limitleri değişebilir; kullanmadan önce [sanity.io/pricing](https://www.sanity.io/pricing) sayfasına bakın.

---

## 5. Tasarım sistemi

**Hissiyat:** güvenilir, mühendislik odaklı, teknolojik. Sıradan bir "tesisatçı" sitesi değil, enerji/teknoloji firması.

| Token | Koyu | Açık |
|---|---|---|
| Zemin | `#0B1220` | `#F5F7FB` |
| Yüzey | `#111A2E` | `#FFFFFF` |
| Vurgu 1 (CTA) | `#FFC400` elektrik sarısı | `#F5B800` |
| Vurgu 2 (parıltı) | `#22D3EE` cyan | `#0891B2` |
| Metin / ikincil | `#E6EDF7` / `#94A3B8` | `#0B1220` / `#475569` |

Renkler [`src/app/globals.css`](src/app/globals.css) içinde CSS değişkenleridir; Tailwind'de `bg-surface`, `text-brand`, `text-accent`, `border-line` gibi sınıflarla kullanılır. Tema seçimi `localStorage`'da saklanır ve sayfa çizilmeden önce uygulanır (parlama yok).

**Ana sayfa akışı:** Hero (devre animasyonu + 2 CTA) → rakamlar → 7 hizmet kartı → neden Fider Grup → referans şeridi (marquee) → son 3 makale → teklif çağrısı.

> **Önemli:** `content/` içindeki `services`, `team`, `testimonials`, `portfolio`, `projects`, `leadership`, `faqs` dosyaları satın alınan WordPress şablonunun **demo içeriğidir** ("Business Growth", Lorem Ipsum). Sitede kullanılmaz. Hakkımızda sayfasındaki Lorem Ipsum zaman çizelgesi de bilerek alınmadı.

---

## 6. İletişim formu

`POST /api/iletisim`: `zod` ile doğrular, honeypot alanını ve IP başına 10 dakikada 5 istek sınırını uygular, SMTP ile `info@fidergrup.com` adresine gönderir.

`.env.local` / Vercel ortam değişkenleri: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `CONTACT_TO`. Mail sunucusu eski hostingde kalır; DNS'te **MX/SPF kayıtlarına dokunmayın**. SMTP şifresi yalnızca Vercel ve `.env.local` içinde durur. Ayarlar yoksa form kullanıcıya hata gösterir, mesaj kaybolmaz (sunucu günlüğüne yazılır).

> Bellek içi hız sınırı sunucusuz ortamda örnek başınadır; yoğun spam görürseniz Vercel Firewall veya Upstash ekleyin.

---

## 7. SEO ve eski adreslerin yönlendirilmesi

[`next.config.ts`](next.config.ts) her derlemede `content/posts.json`'dan 301 yönlendirmesi üretir:

| Eski | Yeni |
|---|---|
| `/topraklama-olcumu-nedir-ve-nasil-yapilir` (20 makale) | `/makaleler/topraklama-olcumu-nedir-ve-nasil-yapilir` |
| `/makale` | `/makaleler` |
| `/elektrik-ariza` (7 hizmet) | `/hizmetler/elektrik-ariza` |

Yayın sonrası: Google Search Console'da alan adını doğrulayıp `https://fidergrup.com/sitemap.xml` adresini gönderin. Her sayfada canonical, Open Graph ve JSON-LD hazırdır. Eski `seoTitle` / `seoDescription` değerleri `posts.json`'da boşsa makale başlığı ve özeti kullanılır; önemli makaleler için Studio'dan elle girin.

---

## 8. Vercel'de yayınlama ve alan adı

1. Projeyi **özel (private)** bir GitHub reposuna gönderin.
2. vercel.com → **Add New → Project** → repoyu seçin (Next.js otomatik algılanır).
3. **Environment Variables**: `.env.example` içindeki değerler (`SANITY_API_WRITE_TOKEN` hariç) + `NEXT_PUBLIC_SITE_URL=https://fidergrup.com`.
4. Önce `*.vercel.app` adresinde tüm sayfaları, formu ve `/studio`'yu test edin.

> **Lisans uyarısı:** Vercel Hobby planı ticari olmayan kullanım içindir. Şirket sitesi için [vercel.com/pricing](https://vercel.com/pricing) ve kullanım şartlarını kontrol edin; gerekirse Pro gerekir.

**Alan adını taşıma** (DNS şu an Güzel Hosting panelinde):

1. Vercel → Settings → **Domains** → `fidergrup.com` ve `www.fidergrup.com` ekleyin; Vercel'in gösterdiği kayıt değerlerini kullanın (genelde apex `A 76.76.21.21`, `www` `CNAME cname.vercel-dns.com`, ekrandan teyit edin).
2. Güzel panel → DNS Yönetimi: `@` A kaydını (eski hosting `89.252.183.131`) ve `www` CNAME'ini Vercel değerleriyle değiştirin.
3. **Dokunmayın:** `@ MX`, `@ TXT` (SPF), `mail`, `webmail`, `smtp`, `imap`, `autodiscover`. Mail çalışmaya devam etmeli.
4. Yayılma sonrası siteyi, SSL'i ve mail akışını (gelen/giden) test edin.
5. **Eski hostingi hemen iptal etmeyin**; en az birkaç hafta tutun (yenileme tarihi **23.12.2026**).

---

## 9. Rakip analizi: fibaelektrik.com

Fiba Elektrik orta gerilim/trafo **ürün satışı** yapan bir firma; biz **mühendislik hizmeti** satıyoruz. Aldığımız dersler:

| Gözlem (Fiba) | Bizdeki karşılığı |
|---|---|
| 3 slaytlı hero + her ürün için "İncele" | Tek net hero + 2 CTA (slider yavaşlatır, tek mesaj daha güçlü) |
| Numaralı (01–08) kart ızgarası | Aynı yapı, 7 hizmet kartı |
| Sektör listesi, marka/distribütör bölümü, referans logoları | Referans logo şeridi + hizmet bölgeleri |
| Blog kök dizinde (`/{slug}/`), 13 makale | Makaleler `/makaleler/{slug}`, 20 makale, eski adresler 301 |
| Telefon üstte, iletişim yalnızca footer'da, belirgin form yok | Header'da telefon + "Teklif Al", ayrı iletişim sayfası, form ve harita |
| Katalog indirme bölümü | Henüz yok: hizmet tanıtım PDF'i eklenebilir |

Fiba'nın renk paleti incelenemedi (CSS okunmadı), bu yüzden tasarım kopya değil, README'deki kendi yönümüzdür. Fiba'dan makale veya görsel **alınmadı**.

---

## 10. Güvenlik notları

- Eski WordPress yedeğinde şüpheli bulgular vardı: çekirdek dosyalarda beklenmeyen tarihler (`wp-signup.php`, `readme.html`, `wp-login.php`) ve kökte 0 baytlık `test.php`. Bu dosyalar yeni siteye **taşınmadı**. Eski site yayında kaldığı sürece eklentileri ve yönetici kullanıcı listesini kontrol edin.
- `fidergrup-yedek/` klasörü (özellikle `wp-config.php`) veritabanı şifresi içerir: **asla GitHub'a yüklemeyin**, bu repoyla aynı klasörde tutmayın.
- `.env.local` Git'e girmez (`.gitignore`). Sanity yazma token'ı yalnızca yerelde, aktarım sırasında kullanılır.

---

## 11. Yapılacaklar

- [x] Next.js kurulumu, tasarım sistemi, ana sayfa, hizmet/hakkımızda/referans/iletişim sayfaları
- [x] 20 eski makalenin sitede yayını, makale liste/detay, 301 yönlendirmeleri
- [x] Sanity şeması, gömülü Studio, webhook rotası, aktarım betiği
- [x] sitemap, robots, JSON-LD, metadata
- [ ] Sanity projesini oluşturup `.env.local`'e Project ID girme
- [ ] Aktarım betiğini çalıştırma ve Studio'da kontrol
- [ ] SMTP bilgilerini girip formu test etme
- [ ] Gerçek rakamları (tamamlanan proje sayısı vb.) ana sayfaya ekleme
- [ ] Önemli makaleler için SEO başlığı/açıklaması girme
- [ ] Gerçek saha/proje fotoğrafları ekleme
- [ ] Lighthouse kontrolü (> 90), GitHub + Vercel yayını
- [ ] Alan adını taşıma, mail testi, Search Console
- [ ] Eski hostingi kapatma kararı (yenileme: 23.12.2026)
