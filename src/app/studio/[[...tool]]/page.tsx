import StudioClient from "@/components/StudioClient";
import { sanityEnabled } from "@/lib/sanity";

export { metadata, viewport } from "next-sanity/studio";

export function generateStaticParams() {
  return [{ tool: [] as string[] }];
}

export default function StudioPage() {
  if (!sanityEnabled) {
    return (
      <div style={{ padding: 40, fontFamily: "sans-serif" }}>
        <h1>Sanity henüz bağlı değil</h1>
        <p>
          <code>.env.local</code> içine <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> değerini ekleyin
          (README bölüm 6).
        </p>
      </div>
    );
  }
  return <StudioClient />;
}
