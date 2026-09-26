"use client";

/**
 * 영업 추적 (first-touch attribution).
 * 최초 진입 시 UTM 파라미터·광고 클릭 ID(gclid/fbclid)·리퍼러·랜딩 페이지를
 * sessionStorage에 보관하고, 운영 문의 제출 시 함께 전송한다.
 *
 * 쿠키 대신 sessionStorage를 사용해 제3자 전송·장기 보관 없이
 * 세션 범위로만 유지한다 (국내 개인정보 규제 관점에서 보수적인 선택).
 * 네이버 검색광고·Google Ads·Meta 광고 유입 추적에 사용된다.
 */

const STORAGE_KEY = "dagym_attribution";

export interface Attribution {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
  gclid: string | null;
  fbclid: string | null;
  landing_page: string | null;
  referrer: string | null;
}

const PARAM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "gclid",
  "fbclid",
] as const;

export function captureAttribution(): void {
  try {
    const existing = sessionStorage.getItem(STORAGE_KEY);
    const params = new URLSearchParams(window.location.search);
    const hasAdParams = PARAM_KEYS.some((k) => params.get(k));

    // 이미 저장된 최초 유입 정보가 있으면 유지한다 (first-touch).
    // 단, 저장 전에 새 광고 파라미터로 재진입한 경우는 갱신한다.
    if (existing && !hasAdParams) return;
    if (existing && hasAdParams) {
      const prev = JSON.parse(existing) as Attribution;
      const prevHadAd = PARAM_KEYS.some((k) => prev[k]);
      if (prevHadAd) return; // 최초 광고 유입 우선
    }

    const attribution: Attribution = {
      utm_source: params.get("utm_source"),
      utm_medium: params.get("utm_medium"),
      utm_campaign: params.get("utm_campaign"),
      utm_content: params.get("utm_content"),
      utm_term: params.get("utm_term"),
      gclid: params.get("gclid"),
      fbclid: params.get("fbclid"),
      landing_page: window.location.pathname + window.location.search,
      referrer: document.referrer || null,
    };
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(attribution));
  } catch {
    // storage 접근 불가 환경에서는 조용히 무시
  }
}

export function getAttribution(): Attribution | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Attribution) : null;
  } catch {
    return null;
  }
}

/** 문의 제출 → 성공 페이지에서 1회성 전환 이벤트 발화를 위한 플래그 */
const CONVERSION_FLAG = "dagym_lead_submitted";

export function markLeadSubmitted(): void {
  try {
    sessionStorage.setItem(CONVERSION_FLAG, "1");
  } catch {
    /* noop */
  }
}

/** 플래그를 소비(제거)하며 반환 — 새로고침·직접 방문 시 중복 전환을 막는다 */
export function consumeLeadSubmitted(): boolean {
  try {
    const v = sessionStorage.getItem(CONVERSION_FLAG);
    if (v) sessionStorage.removeItem(CONVERSION_FLAG);
    return v === "1";
  } catch {
    return false;
  }
}
