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
  title: "다짐 DAGYM | 아파트 커뮤니티 · 스포츠시설 위탁운영",
  shortTitle: "DAGYM",
  description:
    "주식회사 다짐은 아파트 · 기업 · 호텔의 커뮤니티 시설과 스포츠시설을 현장 인력이 직접 운영하고, 자체 시스템 HILINK로 출입 · 예약 · 회원을 관리하는 커뮤니티 운영 회사입니다.",
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

/*
 * 아래 TODO_VERIFY 항목 중 일부는 다짐 제안서(Google Drive)에 기재되어 있습니다.
 * 공개 여부를 확인한 뒤 값을 입력하세요. 입력하기 전까지 사이트에는 해당 줄이 표시되지 않습니다.
 *   - 대표: 제안서 표지 기재
 *   - 대표 연락처 · 이메일: 제안서 표지 기재 (홈페이지 공개용 대표번호인지 확인 필요)
 */
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
  /** 사업 영역 (회사 제안서 기준) */
  domains: ["아파트 · 기업 · 호텔 커뮤니티 운영", "회원관리 · 출입 시스템 HILINK", "헬스기구 · 스크린골프 납품"],
  social: {
    instagram: TODO_VERIFY as Verifiable<string>,
    blog: TODO_VERIFY as Verifiable<string>,
    youtube: TODO_VERIFY as Verifiable<string>,
  },
} as const;


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
