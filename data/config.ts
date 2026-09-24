/**
 * 사이트 전역 설정 · 회사 기본정보 · 신뢰 지표
 *
 * ⚠️ 확인되지 않은 사실(사업자등록번호, 주소, 대표번호, 운영 현장 수, 세대수 등)은
 *    절대 임의로 채우지 않고 TODO_VERIFY 로 남겨 둡니다.
 *    TODO_VERIFY 값은 UI 에서 자동으로 "업데이트 예정" 상태로 표시되며,
 *    실제 값으로 교체하는 순간 모든 페이지에 반영됩니다.
 */

export const TODO_VERIFY = "TODO_VERIFY" as const;
export type Verifiable<T> = T | typeof TODO_VERIFY;

export function isVerified<T>(value: Verifiable<T> | undefined | null): value is T {
  return value !== undefined && value !== null && value !== TODO_VERIFY;
}

export const siteConfig = {
  name: "DAGYM",
  title: "DAGYM | 아파트 커뮤니티 위탁운영 · HILINK 스마트 운영 플랫폼",
  shortTitle: "DAGYM",
  description:
    "주식회사 다짐은 아파트·주거시설·기업·복합시설의 커뮤니티 공간을 현장 운영 인력과 자체 운영 플랫폼 HILINK로 함께 운영하는 커뮤니티 운영 전문 기업입니다.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.dagym1.com").replace(/\/$/, ""),
  locale: "ko_KR",
  tagline: "운영과 기술을 하나로.",
  statement: "공간의 가치를 운영으로 완성하다.",
  keywords: [
    "아파트 커뮤니티 위탁운영",
    "커뮤니티센터 위탁운영",
    "아파트 헬스장 위탁운영",
    "골프연습장 위탁운영",
    "스포츠시설 위탁운영",
    "주민공동시설 위탁운영",
    "피트니스 위탁운영",
    "커뮤니티 운영 플랫폼",
    "아파트 출입관리",
    "안면인식 출입통제",
    "커뮤니티 예약 시스템",
    "HILINK",
    "다짐",
  ],
} as const;

export const company = {
  nameKo: "주식회사 다짐",
  nameEn: "DAGYM Co., Ltd.",
  ceo: TODO_VERIFY as Verifiable<string>,
  businessNumber: TODO_VERIFY as Verifiable<string>,
  mailOrderNumber: TODO_VERIFY as Verifiable<string>,
  phone: TODO_VERIFY as Verifiable<string>,
  fax: TODO_VERIFY as Verifiable<string>,
  email: TODO_VERIFY as Verifiable<string>,
  address: TODO_VERIFY as Verifiable<string>,
  founded: TODO_VERIFY as Verifiable<string>,
  businessHours: TODO_VERIFY as Verifiable<string>, // 예: "평일 09:00 – 18:00 (주말·공휴일 휴무)"
  /** 기존 공식 사이트 (www.dagym1.com) 기준으로 확인된 사업 영역 */
  domains: [
    "아파트·기업 공용시설 위탁운영",
    "피트니스 운영 컨설팅",
    "스포츠 프로그램 기획",
  ],
  social: {
    instagram: TODO_VERIFY as Verifiable<string>,
    blog: TODO_VERIFY as Verifiable<string>,
    youtube: TODO_VERIFY as Verifiable<string>,
  },
} as const;

/** UI 에서 미확인 값 대신 보여줄 문구 */
export const PENDING_LABEL = "업데이트 예정";

export type Metric = {
  key: string;
  label: string;
  labelKo: string;
  /** 숫자 지표. null 이면 확인 전(TODO_VERIFY) 상태로 표시됩니다. */
  value: number | null;
  /** 숫자가 아닌 지표 (예: 플랫폼명) */
  text?: string;
  prefix?: string;
  suffix?: string;
  note: string;
  verifyNote?: string;
};

/**
 * HOME · COMPANY 의 신뢰 지표.
 * value 에 실제 숫자를 입력하면 Count-up 애니메이션과 함께 노출됩니다.
 */
export const metrics: Metric[] = [
  {
    key: "sites",
    label: "Operating Sites",
    labelKo: "운영 현장",
    value: null, // TODO_VERIFY: 현재 운영 중인 현장 수
    suffix: "곳",
    note: "아파트 · 기업 · 복합시설",
    verifyNote: "TODO_VERIFY",
  },
  {
    key: "households",
    label: "Managed Households",
    labelKo: "관리 세대",
    value: null, // TODO_VERIFY: 운영 현장 합산 세대수
    suffix: "세대",
    note: "운영 단지 합산 세대수",
    verifyNote: "TODO_VERIFY",
  },
  {
    key: "facilities",
    label: "Community Facilities",
    labelKo: "운영 가능 시설 유형",
    value: 12, // data/facilities.ts 의 시설 유형 수와 동일하게 유지
    suffix: "종",
    note: "피트니스부터 게스트하우스까지",
  },
  {
    key: "platform",
    label: "Digital Platform",
    labelKo: "자체 운영 플랫폼",
    value: null,
    text: "HILINK",
    note: "회원 · 출입 · 예약 · 결제 · 통계",
  },
];

/**
 * 파트너 / 고객사 로고. 확인된 파트너만 입력합니다.
 * { name: "OO건설", logo: "/images/partners/oo.svg" }
 */
export const partners: { name: string; logo?: string }[] = [
  // TODO_VERIFY: 실제 협력사·고객사 목록
];

/**
 * 회사 연혁. 확인된 사실만 입력합니다.
 * { year: "2024", items: ["..."] }
 */
export const history: { year: string; items: string[] }[] = [
  // TODO_VERIFY: 사업 연혁
];

/** 인증 · 수상 · 특허 — 확인된 항목만 */
export const certifications: { title: string; issuer?: string; year?: string }[] = [
  // TODO_VERIFY
];
