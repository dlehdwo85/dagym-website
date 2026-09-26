/**
 * HILINK 공개 데모 화면 — HILINK 공개 사이트(hilink-website.vercel.app/product/demo/…)에
 * 실제로 노출되는 입주민 앱 캡처를 그대로 복사한 파일만 사용합니다.
 * (공개 URL 접근 · 파일 해시 일치 확인 후 복사. 비공개 관리자 화면 · 내부 캡처는 넣지 않습니다.)
 */

export type HilinkDemoId =
  | "home"
  | "community"
  | "allServices"
  | "board"
  | "life"
  | "storeCategories"
  | "passes"
  | "store";

export type HilinkDemo = { src: string; width: number; height: number; label: string; alt: string };

export const hilinkDemo: Record<HilinkDemoId, HilinkDemo> = {
  home: {
    src: "/images/hilink/demo/apartment-home.webp",
    width: 994,
    height: 2000,
    label: "입주민 앱",
    alt: "HILINK 입주민 앱 홈 — 공지사항 · 이용권 구매 · 결제내역 · 나의 예약 바로가기와 내 이용권",
  },
  community: {
    src: "/images/hilink/demo/apartment-community.webp",
    width: 996,
    height: 2000,
    label: "시설 이용",
    alt: "HILINK 커뮤니티 시설 화면 — 헬스장 · 골프연습장 · 골프락커 · GX · 독서실 · 카페 · 게스트하우스 · 스크린룸 이용권",
  },
  allServices: {
    src: "/images/hilink/demo/apartment-all-services.webp",
    width: 995,
    height: 2000,
    label: "전체 서비스",
    alt: "HILINK 전체 서비스 — 공지사항 · 이용권 · 결제내역 · 예약 · 방문증 · 관리비 · 민원 · 출입이력 · 주차 · 전자투표 등",
  },
  board: {
    src: "/images/hilink/demo/apartment-board.webp",
    width: 995,
    height: 2000,
    label: "게시판 · 민원",
    alt: "HILINK 커뮤니티 게시판 — 전체게시판 · 민원 · 공지사항 · 입대의 카테고리",
  },
  life: {
    src: "/images/hilink/demo/apartment-life.webp",
    width: 993,
    height: 2000,
    label: "생활 서비스",
    alt: "HILINK 생활제안 — 상품구매 · 카페 · 입주민센터 · 시설예약 바로가기와 추천 서비스",
  },
  storeCategories: {
    src: "/images/hilink/demo/resident-store-categories.webp",
    width: 923,
    height: 2000,
    label: "이용권 구매",
    alt: "HILINK 이용권 구매 — 헬스장 · 골프장 · 카페 · 레슨 · GX · 사우나 등 카테고리",
  },
  passes: {
    src: "/images/hilink/demo/resident-passes.webp",
    width: 923,
    height: 2000,
    label: "내 이용권",
    alt: "HILINK 내 이용권 — 사용 가능한 이용권과 이용 기간",
  },
  store: {
    src: "/images/hilink/demo/resident-store.webp",
    width: 923,
    height: 2000,
    label: "결제",
    alt: "HILINK 결제 · 상품 구매 — 월 사용금액과 이용권 구매 카테고리",
  },
};

/** 대표 3화면 (홈 · /hilink Hero) */
export const hilinkHeroDemos: HilinkDemoId[] = ["home", "community", "allServices"];

/** 기능 ↔ 실제 화면 매칭 (/hilink) */
export const hilinkDemoFeatures: { id: HilinkDemoId; title: string; body: string }[] = [
  { id: "home", title: "입주민 앱", body: "공지 · 이용권 · 예약을 한 화면에서" },
  { id: "community", title: "시설 이용", body: "헬스 · 골프 · GX · 독서실 이용권과 예약" },
  { id: "allServices", title: "전체 서비스", body: "관리비 · 민원 · 방문증 · 주차 · 전자투표까지" },
  { id: "board", title: "게시판 · 민원", body: "공지 · 민원 · 입대의 게시판" },
  { id: "life", title: "생활 서비스", body: "상품 구매 · 카페 · 입주민센터" },
  { id: "storeCategories", title: "이용권 구매", body: "시설별 이용권을 앱에서 구매" },
  { id: "passes", title: "내 이용권", body: "이용 기간과 잔여 현황 확인" },
  { id: "store", title: "결제", body: "월 사용금액과 결제 내역" },
];
