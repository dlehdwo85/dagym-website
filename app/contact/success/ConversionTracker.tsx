"use client";

import { useEffect } from "react";
import { consumeLeadSubmitted } from "@/lib/analytics/utm";
import { trackEvent, trackPixel } from "@/lib/analytics/gtag";

/**
 * /contact/success 도착 시 1회성 전환 이벤트 (HILINK ConversionTracker 와 동일).
 * 폼 제출 직후 기록한 세션 플래그가 있을 때만 발화하고 즉시 소비 —
 * 새로고침 · 뒤로가기 · 직접 방문에서는 전환이 발생하지 않는다.
 */
export function ConversionTracker() {
  useEffect(() => {
    if (!consumeLeadSubmitted()) return;
    trackEvent("form_success", { form: "lead" });
    trackPixel("Lead");
  }, []);
  return null;
}
