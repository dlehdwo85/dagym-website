import { after } from "next/server";

/**
 * 웹사이트 문의 → 워크인(업무관리) 자동 등록 — 워크인 16차 연동 (dagym-workspace docs/handoff/WORKIN_V16_INQUIRY.md).
 *
 * - 기존 Supabase 저장 · 이메일 알림이 끝난 뒤 호출한다. 전송은 응답 이후 `after()` 에서 실행돼
 *   문의자 화면을 기다리게 하지 않고, 3초 timeout 으로 끊으며, 어떤 경우에도 throw 하지 않는다.
 * - 워크인 실패는 문의 접수 결과(성공/실패)에 영향이 없다. 누락분은 기존 CRM · 이메일로 처리된다.
 * - `WORKIN_INQUIRY_TOKEN` 이 비어 있으면 아무것도 하지 않는다 (토큰은 워크인 플랫폼 운영 화면에서 사이트별 발급).
 * - 워크인은 lead_id 로 중복 등록을 막는다 (재전송 안전).
 * - 개인정보는 로그에 남기지 않는다 — 실패 시 상태 코드 / 오류 종류만.
 */

const WORKIN_INQUIRY_URL = "https://dagym-workspace.vercel.app/api/integrations/inquiries";
const TIMEOUT_MS = 3000;

export interface WorkinInquiry {
  lead_id: string;
  /** 사이트 구분 (참고용 — 워크인은 토큰으로 사이트를 판별) */
  source: string;
  /** 표시용 한글 유형명 — 워크인이 이 값으로 섹션(위탁운영 / HILINK 플랫폼 / 운영 진단·컨설팅 / 기타)을 고른다 */
  inquiry_type: string;
  /** 사이트 내부 유형 코드 */
  inquiry_type_code?: string | null;
  organization: string;
  region?: string | null;
  facility_scale?: string | null;
  name: string;
  phone: string;
  email?: string | null;
  organization_type?: string | null;
  services: string[];
  current_operation?: string | null;
  message?: string | null;
  conversion_page?: string | null;
  landing_page?: string | null;
  referrer?: string | null;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  utm_content?: string | null;
  utm_term?: string | null;
  device_type?: string | null;
  submitted_at: string;
}

/** 응답 이후 워크인으로 문의를 보낸다. 토큰이 없으면 건너뛴다. 절대 throw 하지 않는다. */
export function forwardInquiryToWorkin(inquiry: WorkinInquiry): void {
  const token = process.env.WORKIN_INQUIRY_TOKEN?.trim();
  if (!token) return;
  // 빈 값은 보내지 않는다 (워크인은 선택 필드 누락을 허용)
  const body = Object.fromEntries(
    Object.entries(inquiry).filter(([, v]) => v !== null && v !== undefined && v !== ""),
  );
  try {
    after(() => sendToWorkin(token, body));
  } catch {
    console.warn("[workin] forward skipped (after unavailable)");
  }
}

async function sendToWorkin(token: string, body: Record<string, unknown>): Promise<void> {
  try {
    const res = await fetch(WORKIN_INQUIRY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(body),
      cache: "no-store",
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!res.ok) console.warn("[workin] forward failed:", res.status);
  } catch (cause) {
    console.warn("[workin] forward failed:", cause instanceof Error ? cause.name : "unknown");
  }
}
