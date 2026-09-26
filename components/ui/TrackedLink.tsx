"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { trackCtaClick, type CtaEvent, type CtaLocation } from "@/lib/analytics/gtag";

/**
 * 클릭 시 dataLayer 이벤트(contact_click 등)를 남기는 링크 (HILINK components/ui/TrackedLink.tsx).
 * mailto: / tel: / 외부 주소는 <a>, 내부 경로는 next/link.
 */
export function TrackedLink({
  href,
  event = "contact_click",
  location,
  onClick,
  ...rest
}: { href: string; event?: CtaEvent; location: CtaLocation } & Omit<ComponentProps<typeof Link>, "href">) {
  const handle: ComponentProps<typeof Link>["onClick"] = (e) => {
    trackCtaClick(event, location);
    onClick?.(e);
  };
  if (href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("http")) {
    const { prefetch: _p, replace: _r, scroll: _s, ...anchor } = rest as Record<string, unknown>;
    void _p;
    void _r;
    void _s;
    return <a href={href} onClick={handle} {...(anchor as ComponentProps<"a">)} />;
  }
  return <Link href={href} onClick={handle} {...rest} />;
}
