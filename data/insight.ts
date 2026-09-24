/**
 * INSIGHT 콘텐츠 (NEWS · NOTICE · MEDIA · FAQ)
 *
 * 지금은 정적 배열이지만 lib/content.ts 의 getter 를 통해서만 읽으므로
 * 향후 Supabase 테이블 또는 Headless CMS(Sanity, Contentful 등)로 교체할 때
 * 컴포넌트 수정 없이 getter 구현만 바꾸면 됩니다.
 *
 * 권장 테이블 스키마 (posts):
 *   id uuid, slug text unique, category text, title text, excerpt text,
 *   body text[] (문단), date date, cover text, source text, url text, verified bool
 */

export type PostCategory = "news" | "notice" | "media";

export const postCategoryLabel: Record<PostCategory, string> = {
  news: "소식",
  notice: "공지",
  media: "언론",
};

export type Post = {
  slug: string;
  category: PostCategory;
  title: string;
  excerpt: string;
  body: string[];
  date: string; // YYYY-MM-DD
  cover?: string;
  source?: string;
  url?: string;
  /** false 인 동안 SAMPLE 뱃지 표시 */
  verified: boolean;
};

export const posts: Post[] = [
  {
    slug: "website-renewal",
    category: "notice",
    title: "다짐 홈페이지를 새로 열었습니다",
    excerpt: "사업영역, 현장 운영 방식, HILINK 시스템을 확인하고 온라인으로 운영 상담을 신청할 수 있습니다.",
    body: [
      "주식회사 다짐의 공식 홈페이지가 새롭게 개편되었습니다.",
      "새 홈페이지에서는 아파트 커뮤니티 위탁운영, 스포츠 · 피트니스 시설 운영, 기업 · 호텔 커뮤니티 운영, 운영 컨설팅 · 시설 개선, 운동기구 · 스크린골프 납품의 운영 내용을 확인하실 수 있습니다.",
      "다짐의 자체 커뮤니티 운영 시스템 HILINK의 주요 기능도 별도 페이지로 소개합니다.",
      "운영 상담은 문의하기 페이지에서 상담 유형과 시설 정보를 남겨 주시면 담당자가 확인 후 연락드립니다.",
    ],
    date: "2026-09-24",
    verified: true,
  },
];

export type Faq = { q: string; a: string; group: "운영" | "HILINK" | "계약" };

export const faqs: Faq[] = [
  {
    group: "운영",
    q: "어떤 시설까지 위탁운영이 가능한가요?",
    a: "헬스장, 골프연습장, GX룸, 독서실 · 스터디룸, 작은도서관, 사우나, 수영장, 게스트하우스, 키즈카페, 카페 등 커뮤니티 시설 전반을 운영합니다. 단지 상황에 따라 일부 시설만 위탁할 수도 있습니다.",
  },
  {
    group: "운영",
    q: "현재 다른 업체가 운영 중인데 전환할 수 있나요?",
    a: "가능합니다. 기존 계약 종료 시점에 맞춰 회원 · 이용권 데이터 이관, 인력 인수인계, 시스템 전환 일정을 함께 설계해 운영 공백 없이 전환합니다.",
  },
  {
    group: "운영",
    q: "입주 전인 신축 단지도 상담할 수 있나요?",
    a: "입주 전 단계가 가장 좋은 시점입니다. 시설 구성 검토, 운영 규정 · 요금 설계, 인력 채용, HILINK 세대 등록까지 입주 일정에 맞춰 준비합니다.",
  },
  {
    group: "HILINK",
    q: "HILINK만 별도로 도입할 수 있나요?",
    a: "가능합니다. 자체 운영 중인 단지나 시설도 HILINK의 출입 · 예약 · 결제 · 통계 기능을 도입할 수 있습니다. 도입 범위는 상담을 통해 결정합니다.",
  },
  {
    group: "HILINK",
    q: "안면인식 출입을 위해 어떤 장비가 필요한가요?",
    a: "출입 지점에 안면인식 단말기를 설치하고 HILINK와 연동합니다. 설치 위치와 수량은 현장 실사 후 제안드립니다.",
  },
  {
    group: "HILINK",
    q: "입주민 개인정보는 어떻게 관리되나요?",
    a: "출입 · 예약에 필요한 최소한의 정보만 수집하며, 관련 법령과 단지의 개인정보 처리 기준에 따라 관리합니다. 세부 정책은 도입 상담 시 안내드립니다.",
  },
  {
    group: "계약",
    q: "상담부터 운영 시작까지 얼마나 걸리나요?",
    a: "시설 규모와 인력 채용 범위에 따라 다릅니다. 현장 분석 후 인력 구성 · 시스템 구축 · 오픈 리허설을 포함한 일정을 제안서에 함께 안내드립니다.",
  },
  {
    group: "계약",
    q: "운영 결과는 어떻게 보고받나요?",
    a: "본사 운영 담당이 매주 현장을 방문해 점검하고, 매월 이용 현황 · 정산 · 민원 처리 · 개선 계획을 보고합니다. HILINK 관리자 화면에서 이용 · 매출 현황을 직접 열람할 수도 있습니다. 보고 형식은 계약 시 협의합니다.",
  },
];
