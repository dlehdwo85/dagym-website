/** 문의폼 스키마 · 검증 — 클라이언트와 API Route 에서 동일하게 사용합니다. */

export const inquiryTypes = [
  { value: "apartment", label: "아파트 커뮤니티 위탁운영" },
  { value: "sports", label: "스포츠시설 위탁운영" },
  { value: "hilink", label: "HILINK 도입" },
  { value: "new-community", label: "신규 커뮤니티 구축" },
  { value: "consulting", label: "운영 컨설팅" },
  { value: "equipment", label: "기구 납품" },
  { value: "etc", label: "기타" },
] as const;

export type InquiryType = (typeof inquiryTypes)[number]["value"];

export const facilityOptions = [
  "피트니스",
  "골프",
  "GX · 필라테스",
  "수영장",
  "사우나",
  "독서실 · 도서관",
  "게스트하우스",
  "키즈카페",
  "카페 · 라운지",
  "기타",
] as const;

export const regionOptions = [
  "서울",
  "경기",
  "인천",
  "부산",
  "대구",
  "광주",
  "대전",
  "울산",
  "세종",
  "강원",
  "충북",
  "충남",
  "전북",
  "전남",
  "경북",
  "경남",
  "제주",
] as const;

export const organizationRoles = [
  "시행사 · 건설사",
  "입주자대표회의",
  "관리사무소 · 위탁관리사",
  "자산관리 · 운영사",
  "기업 · 공공기관",
  "시설 소유주",
  "기타",
] as const;

export type ContactPayload = {
  type: string;
  organization: string;
  role: string;
  name: string;
  phone: string;
  email: string;
  region: string;
  facilities: string[];
  scale: string;
  message: string;
  privacy: boolean;
  /** 스팸 방지용 honeypot — 사람이 입력하지 않는 필드 */
  website?: string;
};

export type ContactErrors = Partial<Record<keyof ContactPayload, string>>;

const PHONE_RE = /^0\d{1,2}-?\d{3,4}-?\d{4}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(input: Partial<ContactPayload>): ContactErrors {
  const errors: ContactErrors = {};
  const s = (v: unknown) => (typeof v === "string" ? v.trim() : "");

  if (!inquiryTypes.some((t) => t.value === input.type)) errors.type = "상담 유형을 선택해 주세요.";
  if (s(input.organization).length < 2) errors.organization = "회사명 또는 단지명을 입력해 주세요.";
  if (s(input.name).length < 2) errors.name = "담당자 성함을 입력해 주세요.";
  if (!PHONE_RE.test(s(input.phone).replace(/\s/g, ""))) errors.phone = "연락 가능한 전화번호를 입력해 주세요. (예: 010-1234-5678)";
  if (!EMAIL_RE.test(s(input.email))) errors.email = "올바른 이메일 주소를 입력해 주세요.";
  if (!s(input.region)) errors.region = "지역을 선택해 주세요.";
  if (s(input.message).length < 10) errors.message = "문의 내용을 10자 이상 입력해 주세요.";
  if (s(input.message).length > 3000) errors.message = "문의 내용은 3,000자 이내로 입력해 주세요.";
  if (!input.privacy) errors.privacy = "개인정보 수집 · 이용에 동의해 주세요.";

  return errors;
}

export function formatPhone(value: string) {
  const d = value.replace(/\D/g, "").slice(0, 11);
  if (d.startsWith("02")) {
    if (d.length <= 2) return d;
    if (d.length <= 5) return `${d.slice(0, 2)}-${d.slice(2)}`;
    if (d.length <= 9) return `${d.slice(0, 2)}-${d.slice(2, 5)}-${d.slice(5)}`;
    return `${d.slice(0, 2)}-${d.slice(2, 6)}-${d.slice(6, 10)}`;
  }
  if (d.length <= 3) return d;
  if (d.length <= 7) return `${d.slice(0, 3)}-${d.slice(3)}`;
  if (d.length <= 10) return `${d.slice(0, 3)}-${d.slice(3, 6)}-${d.slice(6)}`;
  return `${d.slice(0, 3)}-${d.slice(3, 7)}-${d.slice(7)}`;
}
