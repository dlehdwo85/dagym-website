import type { Metadata } from "next";
import { company, isVerified, siteConfig } from "@/data/config";

export function absoluteUrl(path = "/") {
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
};

/** 페이지별 title · description · canonical · Open Graph 를 일관되게 생성합니다. */
export function pageMetadata({ title, description, path, keywords, image }: PageMetaInput): Metadata {
  const url = absoluteUrl(path);
  const ogImage = image ?? "/opengraph-image";
  return {
    title,
    description,
    keywords: keywords ?? [...siteConfig.keywords],
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url,
      siteName: `${siteConfig.name} · ${company.nameKo}`,
      title: `${title} | DAGYM`,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: `DAGYM — ${title}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | DAGYM`,
      description,
      images: [ogImage],
    },
  };
}

/** Organization structured data (확인된 값만 포함) */
export function organizationJsonLd() {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.nameKo,
    alternateName: [company.nameEn, "DAGYM", "다짐"],
    url: siteConfig.url,
    logo: absoluteUrl("/icon.svg"),
    description: siteConfig.description,
    knowsAbout: siteConfig.keywords,
  };
  if (isVerified(company.phone)) data.telephone = company.phone;
  if (isVerified(company.email)) data.email = company.email;
  if (isVerified(company.address))
    data.address = { "@type": "PostalAddress", streetAddress: company.address, addressCountry: "KR" };
  return data;
}

export function serviceJsonLd(input: { name: string; description: string; path: string; serviceType: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    serviceType: input.serviceType,
    description: input.description,
    url: absoluteUrl(input.path),
    areaServed: { "@type": "Country", name: "대한민국" },
    provider: { "@type": "Organization", name: company.nameKo, url: siteConfig.url },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
