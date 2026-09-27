import "server-only";

/**
 * DAGYM 문의 실시간 알림 — HILINK lib/email/notifyLead.ts 와 같은 채널 · 같은 환경변수.
 *
 * 수신: LEAD_NOTIFY_EMAIL (+ 선택 LEAD_NOTIFY_EMAIL_SECONDARY)
 * 채널 (설정된 것 모두 발송, 하나라도 성공하면 true):
 *  1. RESEND_API_KEY + LEAD_FROM_EMAIL
 *  2. SMTP_HOST / SMTP_PORT / SMTP_USER / SMTP_PASS (+ SMTP_FROM, SMTP_SECURE)
 *  3. LEAD_NOTIFY_WEBHOOK_URL — JSON POST
 * 전환 기간 호환: 구 DAGYM 변수(CONTACT_WEBHOOK_URL, RESEND_API_KEY + CONTACT_EMAIL_FROM/TO)만
 * 설정된 배포에서도 알림이 끊기지 않도록 보조 채널로 인식한다.
 *
 * 어떤 경우에도 throw 하지 않는다 — "이메일 OR DB 성공 = 접수 성공" 판정은 호출부에서.
 */

const DEFAULT_NOTIFY_EMAIL = "dagym-in@naver.com";

function recipients(): string[] {
  const primary = process.env.LEAD_NOTIFY_EMAIL || process.env.CONTACT_EMAIL_TO || DEFAULT_NOTIFY_EMAIL;
  const list = primary.split(",").map((s) => s.trim()).filter(Boolean);
  const secondary = process.env.LEAD_NOTIFY_EMAIL_SECONDARY?.trim();
  if (secondary && !list.includes(secondary)) list.push(secondary);
  return list;
}

function resendFrom(): string | undefined {
  return process.env.LEAD_FROM_EMAIL || process.env.CONTACT_EMAIL_FROM || undefined;
}

function webhookUrl(): string | undefined {
  return process.env.LEAD_NOTIFY_WEBHOOK_URL || process.env.CONTACT_WEBHOOK_URL || undefined;
}

export interface LeadNotification {
  /** 서버에서 생성한 고유 Lead ID — DB 행 id 와 동일 (장애 복구 시 중복 방지 Key) */
  leadId: string;
  /** Supabase CRM 저장 성공 여부 — 실패 시 이 메일이 문의 원본 백업 */
  crmSaved: boolean;
  createdAt: string;
  inquiryType: string;
  organization: string;
  region: string | null;
  facilityScale: string | null;
  households: number | null;
  name: string;
  phone: string;
  email: string | null;
  organizationType: string | null;
  services: string[];
  currentOperation: string | null;
  message: string | null;
  conversionPage: string | null;
  landingPage: string | null;
  referrer: string | null;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  utmContent: string | null;
  utmTerm: string | null;
  gclid: string | null;
  fbclid: string | null;
  deviceType: string | null;
}

/** 알림 채널이 하나라도 설정되어 있는가 */
export function hasNotifyChannel(): boolean {
  return Boolean(
    (process.env.RESEND_API_KEY && resendFrom()) ||
      (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) ||
      webhookUrl(),
  );
}

function buildSubject(lead: LeadNotification): string {
  return `[DAGYM 운영문의] ${lead.organization} / ${lead.inquiryType}`;
}

function buildBody(lead: LeadNotification): string {
  const line = (label: string, value: string | null | undefined) => `${label}: ${value?.trim() ? value : "-"}`;
  return [
    "DAGYM 홈페이지에서 새 운영 문의가 접수되었습니다.",
    "",
    line("Lead ID", lead.leadId),
    line("접수일시", lead.createdAt),
    line("문의 유형", lead.inquiryType),
    "",
    line("회사 / 단지명", lead.organization),
    line("지역", lead.region),
    line("시설 규모 / 세대수", lead.facilityScale),
    line("세대수(숫자)", lead.households ? `${lead.households.toLocaleString("ko-KR")}세대` : null),
    "",
    line("담당자명", lead.name),
    line("연락처", lead.phone),
    line("이메일", lead.email),
    line("소속", lead.organizationType),
    line("관심 서비스", lead.services.join(", ") || null),
    line("현재 운영 상황", lead.currentOperation),
    line("문의 내용", lead.message),
    "",
    "--- 유입 정보 ---",
    line("문의 페이지", lead.conversionPage),
    line("최초 유입 페이지", lead.landingPage),
    line("Referrer", lead.referrer),
    line("utm_source", lead.utmSource),
    line("utm_medium", lead.utmMedium),
    line("utm_campaign", lead.utmCampaign),
    line("utm_content", lead.utmContent),
    line("utm_term", lead.utmTerm),
    line("gclid", lead.gclid),
    line("fbclid", lead.fbclid),
    line("기기", lead.deviceType),
    "",
    lead.crmSaved
      ? "CRM 저장 상태: 저장 완료"
      : "CRM 저장 상태: 저장 실패 — 이 메일이 문의 원본입니다. Supabase 복구 후 위 Lead ID로 수동 등록하세요.",
    ...adminLinkLines(lead),
  ].join("\n");
}

/**
 * 공용 CRM(HILINK 관리자) 상세 링크.
 * DAGYM 자체 /admin 은 없으므로 NEXT_PUBLIC_SITE_URL(DAGYM 도메인)을 쓰지 않고,
 * CRM_ADMIN_BASE_URL(서버 전용)이 설정된 경우에만 링크를 붙인다.
 */
function adminLinkLines(lead: LeadNotification): string[] {
  const base = process.env.CRM_ADMIN_BASE_URL?.trim().replace(/\/$/, "");
  if (!base || !lead.crmSaved) return [];
  return ["", `관리자에서 문의 확인: ${base}/admin/leads/${lead.leadId}`];
}

async function sendViaResend(subject: string, text: string): Promise<void> {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: resendFrom(), to: recipients(), subject, text }),
    signal: AbortSignal.timeout(10000),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}`);
}

async function sendViaSmtp(subject: string, text: string): Promise<void> {
  const nodemailer = (await import("nodemailer")).default;
  const port = Number(process.env.SMTP_PORT ?? 465);
  const secure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : port === 465;
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  });
  await transporter.sendMail({
    from: process.env.SMTP_FROM ?? process.env.SMTP_USER,
    to: recipients().join(", "),
    subject,
    text,
  });
}

async function sendViaWebhook(subject: string, text: string): Promise<void> {
  const res = await fetch(webhookUrl() as string, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ subject, text }),
    signal: AbortSignal.timeout(10000),
  });
  if (!res.ok) throw new Error(`Webhook ${res.status}`);
}

/** 알림 발송 — 성공한 채널이 하나라도 있으면 true. 절대 throw 하지 않는다. */
export async function notifyLead(lead: LeadNotification): Promise<boolean> {
  const subject = buildSubject(lead);
  const body = buildBody(lead);

  const jobs: Promise<void>[] = [];
  if (process.env.RESEND_API_KEY && resendFrom()) jobs.push(sendViaResend(subject, body));
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) jobs.push(sendViaSmtp(subject, body));
  if (webhookUrl()) jobs.push(sendViaWebhook(subject, body));

  if (jobs.length === 0) {
    console.warn("[leads] 알림 채널 미설정(RESEND/SMTP/WEBHOOK)");
    return false;
  }

  const results = await Promise.allSettled(jobs);
  for (const r of results) {
    // 오류 메시지에 수신 주소 · 본문이 섞이지 않도록 메시지만 짧게 남긴다
    if (r.status === "rejected") {
      console.error("[leads] 알림 발송 실패:", r.reason instanceof Error ? r.reason.message.slice(0, 200) : "unknown");
    }
  }
  return results.some((r) => r.status === "fulfilled");
}
