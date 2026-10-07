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
    gtag?: (...args: unknown[]) => void;
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
  if (name === "phone_click") trackGoogleAdsConversion("phone");
}

type GoogleAdsConversionKind = "lead" | "phone";

/**
 * 다짐 Google Ads 전환 라벨.
 *
 * 과거에는 `NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL` / `..._PHONE_LABEL` 런타임 환경변수를 읽었는데,
 * Vercel에 그 변수가 없어서 빌드에 아무 값도 인라인되지 않았고 — `if (!label) return` 때문에
 * **전환이 한 건도 전송되지 않은 채로 조용히 통과**했다 (2026-10-08 Production 번들 실측: 라벨 0건).
 * 전환 라벨은 비밀값이 아니라 공개 클라이언트 식별자이므로 하이링크와 같이 코드에 상수로 둔다.
 * 그래야 값이 없으면 빌드/리뷰 단계에서 눈에 띈다.
 *
 * 값은 Google Ads 전환 액션의 eventSnippet 에서 글자 단위로 복사한다. 숫자 1 과 소문자 l 은
 * 화면에서 구분이 어렵다 — 하이링크에서 실제로 이 둘을 혼동해 Primary 전환이 집계되지 않았다.
 *
 * 현재 상태: 다짐 전용 전환 액션(DAGYM_문의폼제출 · DAGYM_전화클릭)이 **아직 Google Ads에 없다.**
 * 하이링크 전환 액션으로 보내면 두 브랜드 리드가 한 액션에 섞여 귀속이 망가지므로 보내지 않는다.
 * 액션이 생기면 아래 값만 채우면 된다. 그때까지는 전송하지 않고 한 번만 경고를 남긴다.
 */
const ADS_ID = "AW-18479878897";
const ADS_LABELS: Record<GoogleAdsConversionKind, string | null> = {
  lead: null, // DAGYM_문의폼제출 생성 후 eventSnippet 의 send_to 뒷부분을 넣는다
  phone: null, // DAGYM_전화클릭 생성 후 같은 방식
};

let warned = false;

export function trackGoogleAdsConversion(kind: GoogleAdsConversionKind): void {
  try {
    if (typeof window.gtag !== "function") return;
    const label = ADS_LABELS[kind];
    if (!label) {
      // 조용히 사라지지 않게 한 번은 남긴다. 운영 중 전환 0건의 원인을 바로 알 수 있다.
      if (!warned) {
        warned = true;
        console.warn("[ads] 다짐 전환 액션이 아직 없어 Google Ads 전환을 보내지 않았습니다 (lib/analytics/gtag.ts ADS_LABELS).");
      }
      return;
    }
    window.gtag("event", "conversion", { send_to: `${ADS_ID}/${label}` });
  } catch {
    /* noop */
  }
}

/** Meta Pixel 표준 이벤트 (fbq 미로드 시 no-op) */
export function trackPixel(event: "PageView" | "Lead" | "Contact", params?: Record<string, unknown>): void {
  try {
    if (typeof window.fbq === "function") window.fbq("track", event, params);
  } catch {
    /* noop */
  }
}
