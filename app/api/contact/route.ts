import { NextResponse } from "next/server";
import { inquiryTypes, validateContact, type ContactPayload } from "@/lib/contact";
import { deliverLead, getDeliveryStatus, type Lead } from "@/lib/contact-delivery";

/** 접수 경로 설정 여부 확인용 (비밀값은 노출하지 않음) */
export async function GET() {
  return NextResponse.json(getDeliveryStatus());
}

/** 운영 상담 접수 */
export async function POST(request: Request) {
  let body: Partial<ContactPayload>;
  try {
    body = (await request.json()) as Partial<ContactPayload>;
  } catch {
    return NextResponse.json({ ok: false, code: "bad_request", message: "잘못된 요청입니다." }, { status: 400 });
  }

  const errors = validateContact(body);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, code: "invalid", errors, message: "입력 내용을 확인해 주세요." }, { status: 422 });
  }

  // honeypot — 봇 요청은 전달하지 않음
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: false, code: "rejected", message: "전송할 수 없는 요청입니다." }, { status: 400 });
  }

  if (!getDeliveryStatus().ready) {
    return NextResponse.json(
      {
        ok: false,
        code: "not_configured",
        message: "현재 온라인 상담 접수가 연결되어 있지 않아 신청서가 전달되지 않았습니다.",
      },
      { status: 503 },
    );
  }

  const str = (v: unknown, max = 200) => (typeof v === "string" ? v.trim().slice(0, max) : "");
  const lead: Lead = {
    receivedAt: new Date().toISOString(),
    type: str(body.type),
    typeLabel: inquiryTypes.find((t) => t.value === body.type)?.label ?? "",
    organization: str(body.organization),
    role: str(body.role),
    name: str(body.name),
    phone: str(body.phone, 20),
    email: str(body.email),
    region: str(body.region),
    facilities: Array.isArray(body.facilities) ? body.facilities.filter((f): f is string => typeof f === "string").slice(0, 20) : [],
    scale: str(body.scale),
    message: str(body.message, 3000),
  };

  const result = await deliverLead(lead);
  if (!result.ok) {
    return NextResponse.json(
      { ok: false, code: "delivery_failed", message: "일시적인 오류로 신청서가 전달되지 않았습니다. 잠시 후 다시 시도해 주세요." },
      { status: 502 },
    );
  }
  return NextResponse.json({ ok: true, delivered: result.delivered });
}
