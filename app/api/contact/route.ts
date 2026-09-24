import { NextResponse } from "next/server";
import { inquiryTypes, validateContact, type ContactPayload } from "@/lib/contact";

/**
 * 운영 상담 접수 API
 * - 서버에서도 동일한 검증 규칙을 적용합니다.
 * - CONTACT_WEBHOOK_URL 이 설정되어 있으면 JSON 으로 전달합니다 (Slack · Make · Zapier · 자체 CRM 등).
 * - 향후 Supabase 연결 시 이 핸들러에서 insert 하도록 교체하면 됩니다.
 */
export async function POST(request: Request) {
  let body: Partial<ContactPayload>;
  try {
    body = (await request.json()) as Partial<ContactPayload>;
  } catch {
    return NextResponse.json({ ok: false, message: "잘못된 요청입니다." }, { status: 400 });
  }

  // honeypot — 봇으로 판단되면 조용히 성공 처리
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const errors = validateContact(body);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors, message: "입력 내용을 확인해 주세요." }, { status: 422 });
  }

  const str = (v: unknown, max = 200) => (typeof v === "string" ? v.trim().slice(0, max) : "");
  const lead = {
    receivedAt: new Date().toISOString(),
    type: str(body.type),
    typeLabel: inquiryTypes.find((t) => t.value === body.type)?.label ?? "",
    organization: str(body.organization),
    role: str(body.role),
    name: str(body.name),
    phone: str(body.phone, 20),
    email: str(body.email),
    region: str(body.region),
    facilities: Array.isArray(body.facilities) ? body.facilities.filter((f) => typeof f === "string").slice(0, 20) : [],
    scale: str(body.scale),
    message: str(body.message, 3000),
  };

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: `[DAGYM 운영 상담] ${lead.typeLabel} · ${lead.organization} · ${lead.name} (${lead.phone})`,
          lead,
        }),
      });
      if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    } catch (error) {
      console.error("[contact] webhook delivery failed", error);
      return NextResponse.json(
        { ok: false, message: "일시적인 오류로 접수되지 않았습니다. 잠시 후 다시 시도해 주세요." },
        { status: 502 },
      );
    }
  } else {
    console.info("[contact] new lead (CONTACT_WEBHOOK_URL 미설정)", lead);
  }

  return NextResponse.json({ ok: true });
}
