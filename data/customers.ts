/** 주요 고객 (B2B 의사결정권자) — BUSINESS 페이지 */
export const customers = [
  { title: "시행사 · 건설사", body: "분양 경쟁력이 되는 커뮤니티 기획과 입주 초기 운영 세팅", href: "/business/consulting" },
  { title: "입주자대표회의", body: "투명한 운영 보고와 데이터 기반 의사결정", href: "/business/apartment-community" },
  { title: "관리사무소", body: "커뮤니티 운영 업무 이관과 정산 · 민원 부담 감소", href: "/business/apartment-community" },
  { title: "위탁관리회사", body: "관리 업무와 커뮤니티 운영의 명확한 역할 분담", href: "/business/apartment-community" },
  { title: "자산관리회사", body: "공용 공간 활용률과 자산 가치 관리", href: "/business/community-facility" },
  { title: "공공기관", body: "생활체육 · 복합시설의 프로그램과 운영 효율 진단", href: "/business/consulting" },
  { title: "기업 복지 담당자", body: "임직원 피트니스 · 라운지 운영과 이용 리포트", href: "/business/community-facility" },
  { title: "복합시설 운영사", body: "공간별 권한 · 예약 · 정산의 통합 운영", href: "/business/community-facility" },
  { title: "호텔 · 레지던스", body: "투숙객 · 입주자 대상 피트니스 · 웰니스 공간 운영", href: "/business/sports-fitness" },
  { title: "스포츠시설 소유주", body: "전문 인력 · 프로그램 · 회원 매출 위탁 운영", href: "/business/sports-fitness" },
];

/** 상세 페이지 slug → 문의폼 상담 유형 */
export const businessContactType: Record<string, string> = {
  "apartment-community": "apartment",
  "sports-fitness": "sports",
  "community-facility": "apartment",
  consulting: "consulting",
  equipment: "equipment",
};
