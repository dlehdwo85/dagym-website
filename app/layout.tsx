import type { Metadata, Viewport } from "next";
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "@fontsource-variable/inter/wght.css";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
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
};

export const viewport: Viewport = {
  themeColor: "#081223",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        {/* 스크롤 reveal 은 JS 가 동작할 때만 적용 — 비활성 환경에서도 콘텐츠가 보이도록 */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="min-h-dvh bg-white">
        <JsonLd data={organizationJsonLd()} />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
