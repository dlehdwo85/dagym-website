/**
 * 문의(Lead) 공용 상수 — ContactForm(클라이언트)과 submitLead(서버 액션)가 같은 목록으로 검증한다.
 * ("use server" 파일은 상수를 export 할 수 없어 별도 모듈로 분리)
 *
 * 구조 · 저장 방식은 HILINK 문의 시스템(hilink-website lib/constants/lead.ts)을 따르고,
 * 선택지만 DAGYM 사업(위탁운영 · 기업/호텔 · 스포츠시설 · 시설지원)에 맞췄다.
 */

/** 문의 유형 — URL `?type=` 값과 1:1 (CTA 맥락 자동 선택) */
export const INQUIRY_TYPES = [
  { value: "operation", label: "커뮤니티 위탁운영" },
  { value: "hilink", label: "HILINK 플랫폼" },
  { value: "consulting", label: "운영 진단 · 컨설팅" },
  { value: "corporate", label: "기업 · 호텔 · 복합시설" },
  { value: "sports", label: "스포츠시설 운영" },
  { value: "facility", label: "시설지원" },
  { value: "etc", label: "기타" },
] as const;

export type InquiryType = (typeof INQUIRY_TYPES)[number]["value"];
export const INQUIRY_TYPE_VALUES = INQUIRY_TYPES.map((t) => t.value) as [InquiryType, ...InquiryType[]];

export function inquiryTypeLabel(value: string): string {
  return INQUIRY_TYPES.find((t) => t.value === value)?.label ?? value;
}

/** 예전 CTA 링크(?type=proposal 등) 호환 — 외부에 남아 있는 옛 주소도 올바른 유형으로 열리게 */
const TYPE_ALIASES: Record<string, InquiryType> = {
  proposal: "operation",
  apartment: "operation",
  "new-community": "operation",
  diagnosis: "consulting",
  equipment: "facility",
  hotel: "corporate",
};

export function normalizeInquiryType(raw: string | null | undefined): InquiryType | null {
  if (!raw) return null;
  if ((INQUIRY_TYPE_VALUES as readonly string[]).includes(raw)) return raw as InquiryType;
  return TYPE_ALIASES[raw] ?? null;
}

/** 광역 시 · 도 — HILINK REGIONS 와 동일한 값 · 순서 (한 CRM에서 같은 기준으로 필터) */
export const REGIONS = [
  "서울",
  "경기",
  "인천",
  "충남",
  "충북",
  "대전",
  "세종",
  "강원",
  "전북",
  "전남",
  "광주",
  "경북",
  "경남",
  "대구",
  "부산",
  "울산",
  "제주",
] as const;

/** 소속 — HILINK 6종 + DAGYM 고객군(기업 · 호텔 · 스포츠시설). URL `?org=` 로 사전 선택 */
export const ORGANIZATION_TYPES = [
  "입주자대표회의",
  "관리사무소",
  "위탁관리회사",
  "건설사",
  "시행사",
  "기업",
  "호텔",
  "스포츠시설",
  "기타",
] as const;

/** 관심 서비스 — 복수 선택, 최소 1개 */
export const SERVICES = [
  "커뮤니티 위탁운영",
  "HILINK 플랫폼",
  "회원관리",
  "출입관리",
  "안면인식 출입",
  "시설예약",
  "결제 · 정산",
  "피트니스",
  "골프연습장",
  "GX · 프로그램",
  "운영 컨설팅",
  "시설개선",
  "시설지원",
] as const;

/** 문의 유형별 기본 선택 서비스 (사용자가 바꿀 수 있음) */
export const DEFAULT_SERVICES: Record<InquiryType, (typeof SERVICES)[number][]> = {
  operation: ["커뮤니티 위탁운영"],
  hilink: ["HILINK 플랫폼"],
  consulting: ["운영 컨설팅"],
  corporate: ["커뮤니티 위탁운영"],
  sports: ["피트니스"],
  facility: ["시설지원"],
  etc: [],
};

/** 현재 운영 상황 — 선택 */
export const CURRENT_OPERATIONS = [
  "신규 입주 예정",
  "신규 시설 구축",
  "자치운영",
  "기존 위탁운영",
  "운영사 교체 검토",
  "일부 시설만 위탁",
  "플랫폼만 도입",
  "기존 시스템 교체",
  "기타",
] as const;

/** 공용 CRM(HILINK Supabase leads)에서 DAGYM 문의를 구분하는 source 값 */
export const LEAD_SOURCE = "dagym-web";
