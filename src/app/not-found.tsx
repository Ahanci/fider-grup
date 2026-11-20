import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto grid max-w-xl place-items-center px-5 py-32 text-center">
      <p className="font-display text-7xl font-bold glow-text">404</p>
      <h1 className="mt-4 font-display text-2xl font-semibold">Sayfa bulunamadı</h1>
      <p className="mt-2 text-muted">Aradığınız sayfa taşınmış veya kaldırılmış olabilir.</p>
      <Link href="/" className="mt-8 rounded-full bg-brand px-7 py-3 font-semibold text-brandink">
        Ana sayfaya dön
      </Link>
    </div>
  );
}
