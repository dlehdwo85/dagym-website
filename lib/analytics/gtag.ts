"use client";

/**
 * GA4 / GTM / Meta Pixel 이벤트 헬퍼 (HILINK lib/analytics/gtag.ts 와 같은 이벤트 이름).
 * 스크립트가 로드되지 않은 환경(ID 미설정 · 차단)에서도 안전하게 no-op 한다.
 * 이벤트는 dataLayer 에 push — GTM 운영으로 바꿔도 그대로 사용.
 */

export type CtaLocation =
  | "header"
  | "hero"
  | "home_core_business"
  | "home_hilink"
  | "operation_page"
  | "hilink_page"
  | "project_page"
  | "business_page"
  | "footer"
  | "cta_banner"
  | "contact_page"
  | "not_found";

export type CtaEvent = "contact_click" | "quote_click" | "phone_click" | "email_click";

type EventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    fbq?: (...args: unknown[]) => void;
  }
}

export function trackEvent(name: string, params: EventParams = {}): void {
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: name, ...params });
  } catch {
    /* noop */
  }
}

export function trackCtaClick(name: CtaEvent, location: CtaLocation, extra: EventParams = {}): void {
  trackEvent(name, { cta_location: location, ...extra });
}

/** Meta Pixel 표준 이벤트 (fbq 미로드 시 no-op) */
export function trackPixel(event: "PageView" | "Lead" | "Contact", params?: Record<string, unknown>): void {
  try {
    if (typeof window.fbq === "function") window.fbq("track", event, params);
  } catch {
    /* noop */
  }
}
