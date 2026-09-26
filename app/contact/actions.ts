"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { hasNotifyChannel, notifyLead } from "@/lib/email/notifyLead";
import {
  CURRENT_OPERATIONS,
  INQUIRY_TYPE_VALUES,
  LEAD_SOURCE,
  ORGANIZATION_TYPES,
  REGIONS,
  SERVICES,
  inquiryTypeLabel,
} from "@/lib/lead/constants";

/**
 * DAGYM 운영 문의 접수 — HILINK app/contact/actions.ts 와 같은 파이프라인.
 * 검증(Zod) → Lead ID 생성 → ① Supabase `leads` 저장(공용 CRM, source=dagym-web) ② 이메일 알림
 * → 둘 중 하나라도 성공하면 접수 성공. 개인정보는 로그에 남기지 않는다.
 *
 * 필수: 문의 유형 / 회사·단지명 / 지역 / 담당자명 / 연락처 / 소속 / 관심 서비스 / 동의
 * 선택: 시설 규모·세대수 / 이메일 / 현재 운영 상황 / 문의 내용
 */

const optionalTrimmed = (max: number) => z.string().trim().max(max).optional().or(z.literal(""));

const leadSchema = z.object({
  inquiry_type: z.enum(INQUIRY_TYPE_VALUES, { message: "문의 유형을 선택해 주세요." }),
  organization: z.string().trim().min(2, "회사 또는 단지명을 입력해 주세요.").max(100),
  region: z.enum(REGIONS, { message: "지역을 선택해 주세요." }),
  facility_scale: optionalTrimmed(100),
  name: z.string().trim().min(2, "담당자명을 입력해 주세요.").max(50),
  phone: z.string().trim().regex(/^[0-9\-+() ]{9,20}$/, "연락처 형식을 확인해 주세요."),
  email: z.string().trim().email("이메일 형식을 확인해 주세요.").max(200).optional().or(z.literal("")),
  organization_type: z.enum(ORGANIZATION_TYPES, { message: "소속을 선택해 주세요." }),
  services: z.array(z.enum(SERVICES)).min(1, "관심 서비스를 하나 이상 선택해 주세요.").max(SERVICES.length),
  current_operation: z.enum(CURRENT_OPERATIONS).optional().or(z.literal("")),
  message: optionalTrimmed(3000),
  privacy_agree: z.literal("on", { message: "개인정보 수집·이용에 동의해 주세요." }),
  // 스팸 방지
  // honeypot — 길이 제한으로 검증 오류를 내면 봇에게 폼이 노출되므로 값만 받고 아래에서 조용히 무시
  company_website: z.string().max(2000).optional().or(z.literal("")),
  form_started_at: z.string().optional(),
  // 영업 추적 (first-touch)
  conversion_page: z.string().max(500).nullish(),
  utm_source: z.string().max(200).nullish(),
  utm_medium: z.string().max(200).nullish(),
  utm_campaign: z.string().max(200).nullish(),
  utm_content: z.string().max(200).nullish(),
  utm_term: z.string().max(200).nullish(),
  gclid: z.string().max(300).nullish(),
  fbclid: z.string().max(300).nullish(),
  landing_page: z.string().max(500).nullish(),
  referrer: z.string().max(500).nullish(),
});

/** 오류 시 화면 복원용 제출 값 — 로그에는 절대 출력하지 않는다 */
export interface LeadFormValues {
  inquiry_type: string;
  organization: string;
  region: string;
  facility_scale: string;
  name: string;
  phone: string;
  email: string;
  organization_type: string;
  services: string[];
  current_operation: string;
  message: string;
  privacy_agree: boolean;
}

export interface LeadFormState {
  status: "idle" | "success" | "error";
  /** validation: 입력 수정으로 해결 / system: 이메일 · DB 모두 실패 */
  kind?: "validation" | "system";
  message?: string;
  fieldErrors?: Record<string, string>;
  /** React 19 자동 form reset 대응 — 입력값 복원용 */
  values?: LeadFormValues;
  /** false = 스팸(honeypot) — 성공 화면은 보여주되 전환으로 집계하지 않음 */
  counted?: boolean;
}

/** "1,200" · "1200세대" 처럼 순수 세대수면 숫자로 (HILINK households 컬럼 호환) */
function parseHouseholds(scale: string, inquiryType: string): number | null {
  if (inquiryType !== "operation" && !/세대/.test(scale)) return null;
  const m = scale.trim().match(/^([\d,]+)\s*(세대)?$/);
  if (!m) return null;
  const n = Number(m[1].replace(/,/g, ""));
  return Number.isInteger(n) && n > 0 && n < 100000 ? n : null;
}

/** 새 컬럼(inquiry_type · facility_scale) 미적용 DB 판별 — PostgREST 스키마 캐시 / Postgres undefined column */
function isMissingColumnError(error: { code?: string; message?: string } | null): boolean {
  if (!error) return false;
  return error.code === "PGRST204" || error.code === "42703" || /column .* (does not exist|could not find)/i.test(error.message ?? "");
}

export async function submitLead(_prev: LeadFormState, formData: FormData): Promise<LeadFormState> {
  const str = (k: string) => String(formData.get(k) ?? "");
  const opt = (k: string) => (formData.get(k) ? String(formData.get(k)) : null);

  const raw = {
    inquiry_type: str("inquiry_type"),
    organization: str("organization"),
    region: str("region"),
    facility_scale: str("facility_scale"),
    name: str("name"),
    phone: str("phone"),
    email: str("email"),
    organization_type: formData.get("organization_type") ? String(formData.get("organization_type")) : undefined,
    services: formData.getAll("services").map(String),
    current_operation: str("current_operation"),
    message: str("message"),
    privacy_agree: str("privacy_agree"),
    company_website: str("company_website"),
    form_started_at: opt("form_started_at") ?? undefined,
    conversion_page: opt("conversion_page"),
    utm_source: opt("utm_source"),
    utm_medium: opt("utm_medium"),
    utm_campaign: opt("utm_campaign"),
    utm_content: opt("utm_content"),
    utm_term: opt("utm_term"),
    gclid: opt("gclid"),
    fbclid: opt("fbclid"),
    landing_page: opt("landing_page"),
    referrer: opt("referrer"),
  };

  const values: LeadFormValues = {
    inquiry_type: raw.inquiry_type,
    organization: raw.organization,
    region: raw.region,
    facility_scale: raw.facility_scale,
    name: raw.name,
    phone: raw.phone,
    email: raw.email,
    organization_type: raw.organization_type ?? "",
    services: raw.services,
    current_operation: raw.current_operation,
    message: raw.message,
    privacy_agree: raw.privacy_agree === "on",
  };

  const parsed = leadSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { status: "error", kind: "validation", message: "입력하지 않았거나 잘못 입력한 항목이 있습니다.", fieldErrors, values };
  }
  const data = parsed.data;

  // honeypot 이 채워진 경우만 조용히 무시 (저장 · 알림 없이 성공 화면)
  if (data.company_website) return { status: "success", counted: false };
  // 빠른 제출은 차단하지 않고 로그만 남긴다 (정상 리드 유실 방지 — HILINK 방식)
  const startedAt = Number(data.form_started_at);
  if (Number.isFinite(startedAt) && Date.now() - startedAt < 1500) {
    console.warn("[leads] 비정상적으로 빠른 제출 (처리 계속):", Date.now() - startedAt, "ms");
  }

  const ua = (await headers()).get("user-agent") ?? "";
  const deviceType = /mobile|android|iphone|ipad/i.test(ua) ? "mobile" : "desktop";
  const typeLabel = inquiryTypeLabel(data.inquiry_type);
  const facilityScale = data.facility_scale || null;

  const base = {
    name: data.name,
    phone: data.phone,
    email: data.email || null,
    apartment_name: data.organization, // 공용 CRM 컬럼 — DAGYM 은 회사 / 단지명
    address: null,
    region: data.region,
    households: facilityScale ? parseHouseholds(facilityScale, data.inquiry_type) : null,
    organization_type: data.organization_type,
    interested_services: data.services,
    current_operation: data.current_operation || null,
    source: LEAD_SOURCE,
    landing_page: data.landing_page ?? null,
    conversion_page: data.conversion_page ?? null,
    referrer: data.referrer ?? null,
    utm_source: data.utm_source ?? null,
    utm_medium: data.utm_medium ?? null,
    utm_campaign: data.utm_campaign ?? null,
    utm_content: data.utm_content ?? null,
    utm_term: data.utm_term ?? null,
    gclid: data.gclid ?? null,
    fbclid: data.fbclid ?? null,
    device_type: deviceType,
  };

  const leadId = crypto.randomUUID();
  const supabase = getSupabaseAdmin();

  // 로컬 · 프리뷰에서 DB · 알림 채널이 모두 없으면 성공 UX만 검증 (Production 제외)
  if (!supabase && !hasNotifyChannel() && process.env.NODE_ENV !== "production") {
    console.warn("[leads] Supabase·알림 채널 모두 미설정(개발 환경) — 접수 시뮬레이션:", JSON.stringify({ leadId, organization: base.apartment_name }));
    return { status: "success" };
  }

  // ① Supabase CRM 저장 — 8초 timeout, 실패해도 throw 없이 결과만 남긴다
  let dbOk = false;
  if (supabase) {
    try {
      const full = { id: leadId, ...base, inquiry_type: data.inquiry_type, facility_scale: facilityScale, message: data.message || null };
      let { error } = await supabase.from("leads").insert(full).abortSignal(AbortSignal.timeout(8000));
      if (isMissingColumnError(error)) {
        // 마이그레이션(docs/sql/leads-dagym.sql) 전 DB — 유형 · 규모를 message 앞에 담아 재시도
        console.warn("[leads] inquiry_type/facility_scale 컬럼 없음 — message 포함 방식으로 저장");
        const prefixed =
          [`[문의 유형] ${typeLabel}`, facilityScale ? `[시설 규모] ${facilityScale}` : null, data.message || null].filter(Boolean).join("\n") || null;
        ({ error } = await supabase.from("leads").insert({ id: leadId, ...base, message: prefixed }).abortSignal(AbortSignal.timeout(8000)));
      }
      if (error) console.error("[leads] insert 실패:", error.code ?? "", (error.message ?? "").slice(0, 200));
      else dbOk = true;
    } catch (cause) {
      console.error("[leads] insert 예외/타임아웃:", cause instanceof Error ? cause.message.slice(0, 200) : "unknown");
    }
  }

  // ② 이메일 알림 — DB와 독립적인 Lead 원본 백업 (CRM 저장 결과를 본문에 표기)
  const emailOk = await notifyLead({
    leadId,
    crmSaved: dbOk,
    createdAt: new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" }),
    inquiryType: typeLabel,
    organization: base.apartment_name,
    region: base.region,
    facilityScale,
    households: base.households,
    name: base.name,
    phone: base.phone,
    email: base.email,
    organizationType: base.organization_type,
    services: base.interested_services,
    currentOperation: base.current_operation,
    message: data.message || null,
    conversionPage: base.conversion_page,
    landingPage: base.landing_page,
    referrer: base.referrer,
    utmSource: base.utm_source,
    utmMedium: base.utm_medium,
    utmCampaign: base.utm_campaign,
    utmContent: base.utm_content,
    utmTerm: base.utm_term,
    gclid: base.gclid,
    fbclid: base.fbclid,
    deviceType: base.device_type,
  });

  // ③ 판정 + 운영 로그 (Lead ID · 회사/단지명 · 결과만)
  const outcome = dbOk && emailOk ? "LEAD_FULL_SUCCESS" : dbOk ? "LEAD_DB_ONLY" : emailOk ? "LEAD_EMAIL_ONLY" : "LEAD_TOTAL_FAILURE";
  const summary = JSON.stringify({ leadId, organization: base.apartment_name });
  if (outcome === "LEAD_FULL_SUCCESS") console.log(`[leads] ${outcome}`, summary);
  else if (outcome === "LEAD_TOTAL_FAILURE") console.error(`[leads] ${outcome} — 이메일·DB 모두 실패, 리드 미확보:`, summary);
  else console.warn(`[leads] ${outcome}`, summary);

  if (outcome === "LEAD_TOTAL_FAILURE") {
    return {
      status: "error",
      kind: "system",
      message: "문의 접수 중 문제가 발생했습니다. 입력한 내용은 유지되어 있습니다. 잠시 후 다시 시도해 주세요.",
      values,
    };
  }
  return { status: "success" };
}
