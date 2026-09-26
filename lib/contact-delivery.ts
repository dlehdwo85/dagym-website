import "server-only";

/**
 * 문의 접수 경로 (서버 전용)
 *
 * 하나 이상 설정되어 있어야 "접수 완료" 로 처리됩니다. 설정이 없으면 문의폼은 제출을 막고 안내 문구를 보여줍니다.
 *   1) CONTACT_WEBHOOK_URL            — JSON POST (Google Apps Script → 구글 시트/메일, Slack, Make 등)
 *   2) RESEND_API_KEY + CONTACT_EMAIL_TO — 이메일 발송 (https://resend.com)
 *      CONTACT_EMAIL_FROM (선택)       — 발신 주소, 기본값 "DAGYM 홈페이지 <onboarding@resend.dev>"
 *
 * 설정 방법과 담당자 확인 위치: docs/CONTACT_SETUP.md
 */

export type Lead = {
  receivedAt: string;
  type: string;
  typeLabel: string;
  organization: string;
  role: string;
  name: string;
  phone: string;
  email: string;
  region: string;
  facilities: string[];
  scale: string;
  currentOperation: string;
  message: string;
};

type Channel = "webhook" | "email";

export function getDeliveryStatus(): { ready: boolean; channels: Channel[] } {
  const channels: Channel[] = [];
  if (process.env.CONTACT_WEBHOOK_URL) channels.push("webhook");
  if (process.env.RESEND_API_KEY && process.env.CONTACT_EMAIL_TO) channels.push("email");
  return { ready: channels.length > 0, channels };
}

function leadText(lead: Lead) {
  return [
    `[다짐 홈페이지 운영 상담] ${lead.typeLabel}`,
    ``,
    `회사/단지명: ${lead.organization}`,
    `구분: ${lead.role || "-"}`,
    `담당자: ${lead.name}`,
    `연락처: ${lead.phone}`,
    `이메일: ${lead.email}`,
    `지역: ${lead.region}`,
    `시설: ${lead.facilities.join(", ") || "-"}`,
    `규모: ${lead.scale || "-"}`,
    `현재 운영 방식: ${lead.currentOperation || "-"}`,
    ``,
    lead.message,
    ``,
    `접수 시각: ${lead.receivedAt}`,
  ].join("\n");
}

async function sendWebhook(lead: Lead) {
  const res = await fetch(process.env.CONTACT_WEBHOOK_URL!, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: leadText(lead), lead }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`webhook ${res.status}`);
}

async function sendEmail(lead: Lead) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_EMAIL_FROM || "DAGYM 홈페이지 <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL_TO!.split(",").map((s) => s.trim()),
      reply_to: lead.email,
      subject: `[운영 상담] ${lead.typeLabel} · ${lead.organization} · ${lead.name}`,
      text: leadText(lead),
    }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`resend ${res.status}`);
}

/** 설정된 모든 경로로 전달하고, 하나라도 성공하면 접수된 것으로 봅니다. */
export async function deliverLead(lead: Lead) {
  const { channels } = getDeliveryStatus();
  const results = await Promise.allSettled(channels.map((c) => (c === "webhook" ? sendWebhook(lead) : sendEmail(lead))));
  const delivered = channels.filter((_, i) => results[i].status === "fulfilled");
  results.forEach((r, i) => {
    if (r.status === "rejected") console.error(`[contact] ${channels[i]} delivery failed`, r.reason);
  });
  return { delivered, ok: delivered.length > 0 };
}
