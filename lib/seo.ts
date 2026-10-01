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
      siteName: `${company.nameKo} (${siteConfig.name})`,
      title: `${title} | ${company.nameKo}`,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${company.nameKo} — ${title}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${company.nameKo}`,
      description,
      images: [ogImage],
    },
  };
}

/** WebSite structured data — 검색 결과의 사이트 이름 (주식회사 다짐) */
export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: company.nameKo,
    alternateName: [company.brand, "다짐"],
    url: company.website,
    inLanguage: "ko-KR",
  };
}

/** Organization structured data (확인된 값만 포함) */
export function organizationJsonLd() {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.nameKo,
    legalName: company.nameKo,
    alternateName: [company.brand, "다짐", company.nameEn],
    url: company.website,
    logo: absoluteUrl("/icon.svg"),
    description: siteConfig.description,
    knowsAbout: siteConfig.keywords,
  };
  if (isVerified(company.phone)) data.telephone = company.phone;
  if (isVerified(company.email)) data.email = company.email;
  if (isVerified(company.businessNumber)) data.taxID = company.businessNumber;
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
