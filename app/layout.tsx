import type { Metadata, Viewport } from "next";
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "@fontsource-variable/inter/wght.css";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { businessAreas } from "@/data/business";
import type { MegaBusiness } from "@/components/layout/Header";
import { photos } from "@/data/photos";
import { businessPhoto } from "@/data/corporate";
import { hasPhoto } from "@/lib/photos";
import { JsonLd } from "@/components/ui/JsonLd";
import { siteConfig } from "@/data/config";
import { organizationJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: "%s | DAGYM 다짐",
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  applicationName: "DAGYM",
  authors: [{ name: "주식회사 다짐" }],
  creator: "주식회사 다짐",
  publisher: "주식회사 다짐",
  formatDetection: { telephone: false, email: false, address: false },
  alternates: { canonical: siteConfig.url },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: "DAGYM · 주식회사 다짐",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  twitter: { card: "summary_large_image", title: siteConfig.title, description: siteConfig.description },
  robots: { index: true, follow: true },
  /** 검색엔진 소유확인 (www.dagym-in.co.kr) — Google Search Console · 네이버 서치어드바이저 */
  verification: {
    google: "rl7JGqI-x2PVnqGtiAokCrV4LInCcJ-gNOLxqvVYr7s",
    other: { "naver-site-verification": "b7a8412875c30e6a9a3011bc4614cad33ba77c8f" },
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const toMega = (b: (typeof businessAreas)[number], group: MegaBusiness["group"]): MegaBusiness => {
    const photoId = businessPhoto[b.slug];
    const photo = photoId && hasPhoto(photoId) ? photos[photoId] : undefined;
    return { href: b.href, no: b.no, title: b.title, en: "", line: b.summary, group, image: photo ? { src: photo.file, alt: photo.alt } : undefined };
  };
  const megaBusiness: MegaBusiness[] = [
    ...businessAreas.filter((b) => b.slug !== "equipment").map((b) => toMega(b, "core1")),
    { href: "/hilink", no: "", title: "HILINK 플랫폼 구축 · 납품", en: "", line: "회원 · 출입 · 예약 · 정산 · 보고를 연결하는 자체 커뮤니티 운영 플랫폼", group: "core2" },
    ...businessAreas.filter((b) => b.slug === "equipment").map((b) => toMega(b, "support")),
  ];

  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="min-h-dvh bg-white">
        <JsonLd data={organizationJsonLd()} />
        <Header business={megaBusiness} />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
