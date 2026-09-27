"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { captureAttribution } from "@/lib/analytics/utm";
import { trackEvent } from "@/lib/analytics/gtag";

/**
 * 전역: 최초 유입 정보(UTM/gclid/fbclid/리퍼러/랜딩)를 보존하고,
 * 라우트 전환 시 SPA page_view 이벤트를 dataLayer로 전송한다.
 */
export function AttributionCapture() {
  const pathname = usePathname();

  useEffect(() => {
    captureAttribution();
  }, []);

  useEffect(() => {
    trackEvent("page_view", { page_path: pathname });
  }, [pathname]);

  return null;
}
