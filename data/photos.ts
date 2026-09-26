import type { Provenance } from "./media-types";

/**
 * 사이트에 들어갈 사진 목록 (Photo Slot Registry)
 *
 * 사용 방법
 *   1) 아래 표의 file 경로와 같은 이름으로 사진을 public/ 아래에 넣습니다.
 *      예) public/images/home/hero.jpg
 *   2) 다시 빌드하면 자동으로 사진이 노출됩니다. (코드 수정 불필요)
 *
 * 사진이 없는 동안
 *   - 첫 화면(hero)은 단색 배경으로 표시됩니다.
 *   - 그 외 사진 영역은 방문자에게 보이지 않도록 숨겨지고, 레이아웃이 텍스트 중심으로 바뀝니다.
 *   - 개발 서버(npm run dev) 또는 NEXT_PUBLIC_SHOW_PHOTO_SLOTS=1 로 빌드하면
 *     사진이 들어갈 자리와 권장 규격이 점선 박스로 표시됩니다.
 *
 * 사진 기준
 *   - 다짐이 실제 운영하는 현장 사진만 사용합니다. (AI 생성 이미지 · 타사 사진 · 스톡 사진 사용 금지)
 *   - 입주민 얼굴이 식별되는 사진은 동의를 받은 경우에만 사용합니다.
 *   - JPG 또는 WebP, 긴 변 기준 권장 해상도 이상. next/image 가 AVIF/WebP 로 자동 변환합니다.
 */

export type PhotoSlot = {
  file: string;
  /** 어떤 장면이 필요한지 */
  subject: string;
  /** 권장 크기 (px) */
  size: string;
  /** 비율 — 레이아웃이 이 비율로 크롭합니다 */
  ratio: string;
  /** 사이트 내 사용 위치 */
  usedIn: string;
  alt: string;
  /** 크롭 시 중심점 (CSS object-position) */
  focus?: string;
  /** 데스크톱(lg 이상) 크롭 중심점 — 모바일과 달라야 할 때만 */
  focusLg?: string;
  /** 기존 공식 사이트(dagym1.com)에서 가져올 자산이면 해당 페이지 */
  legacyPage?: string;
  /**
   * 사진 출처 구분 — 파일을 넣을 때 반드시 확인해 입력합니다.
   *   "dagym-site" : 다짐이 실제 운영하는 현장 (siteName 이 있으면 현장명 표기 가능)
   *   "stock"      : 스톡 · 구매 이미지 → 현장 사진처럼 표기하지 않음
   *   "unknown"    : 출처 미확인 → 현장 사진처럼 표기하지 않음
   */
  provenance?: Provenance;
  /** 공개 동의가 확인된 현장명 (provenance 가 "dagym-site" 일 때만 표기) */
  siteName?: string;
};

export const photos = {
  "home-hero": {
    file: "/images/home/hero.jpg",
    subject: "운영 중인 아파트 커뮤니티 피트니스 또는 골프연습장 전경 (밝은 조명, 사람 1~2명 또는 무인)",
    size: "2400 × 1400 이상",
    ratio: "가로형 (모바일에서는 세로로 크롭됨 — 피사체를 가운데에 배치)",
    usedIn: "홈 첫 화면 전체 배경",
    alt: "다짐이 운영하는 커뮤니티 피트니스센터",
    focus: "center",
  },
  /* ---------------------------------------------------------------
   * 브랜드 비주얼 (실제 사진이 없으면 생성 이미지 허용 — docs/IMAGE_POLICY.md)
   * 생성 이미지는 provenance: "generated" 로 두고, 실제 현장 · 직원으로 표기하지 않습니다.
   * ------------------------------------------------------------- */
  /* 홈 Hero — 생성 이미지 (브랜드 비주얼)에서 인물이 없는 공간 부분만 잘라 사용. 실제 현장이 아님 */
  /* 홈 Hero (wide) — 인물 없는 21:9 생성 이미지. 왼쪽 40%는 흰 벽(텍스트 영역), 오른쪽에 데스크 · 게이트 · 피트니스 */
  "hero-community-lobby": {
    file: "/images/hero/hero-access-lobby-v2-21x9.webp",
    subject: "커뮤니티센터 출입구 — 데스크에 바로 붙은 스피드 게이트, 오른쪽 게이트 앞면에 슬림 얼굴인식 단말 1대, 유리벽 너머 피트니스. 우회 동선 없음 · 인물 없음",
    size: "2400 × 1029",
    ratio: "21:9 (가로)",
    usedIn: "홈 첫 화면 (와이드 Hero 배경)",
    alt: "안내 데스크에 붙은 스피드 게이트와 게이트의 얼굴인식 단말, 그 너머 피트니스가 보이는 커뮤니티센터 출입구",
    focus: "70% center",
    focusLg: "20% center",
    provenance: "generated",
  },
  "hero-community-space": {
    file: "/images/hero/hero-community-space.webp",
    subject: "커뮤니티센터 인포메이션 데스크 · 출입 게이트 · 유리 너머 피트니스. 인물 없이 공간만",
    size: "1010 × 1520",
    ratio: "2:3 (세로)",
    usedIn: "홈 첫 화면 (분할 Hero 오른쪽)",
    alt: "커뮤니티센터 인포메이션 데스크와 유리 너머 피트니스 공간",
    focus: "50% 40%",
    provenance: "generated",
  },
  /* 사업 상세 Hero — 생성 브랜드 비주얼 (실제 현장 아님, 인물 없음) */
  /* 운영 방식 · 회사소개 — 사람 없는 실사형 공간 (생성) */
  "visual-operations-desk": {
    file: "/images/operation/operations-desk.webp",
    subject: "커뮤니티센터 입구 운영 데스크 — 게시판 · 출입 게이트 · 안쪽 헬스장 (사람 없음, 다큐멘터리 톤)",
    size: "2400 × 1357",
    ratio: "16:9",
    usedIn: "홈 운영 방식",
    alt: "게시판과 안내 데스크, 안면인식 출입 게이트가 있는 커뮤니티센터 입구와 안쪽 헬스장",
    provenance: "generated",
  },
  "visual-company-atrium": {
    file: "/images/company/community-atrium.webp",
    subject: "복층 커뮤니티센터 아트리움 — 라운지와 유리벽 시설",
    size: "1600 × 1195",
    ratio: "4:3",
    usedIn: "회사소개 인트로",
    alt: "라운지와 유리벽 시설이 이어진 복층 커뮤니티센터 아트리움",
    provenance: "generated",
  },
  "visual-business-apartment": {
    file: "/images/business/apartment.webp",
    subject: "아파트 커뮤니티센터 — 라운지 · 인포메이션 · 유리 너머 헬스장 · 스크린골프 타석",
    size: "1600 × 1207",
    ratio: "4:3",
    usedIn: "사업 상세 — 공동주택 커뮤니티 위탁운영 Hero",
    alt: "라운지와 인포메이션, 헬스장, 스크린골프 타석이 함께 있는 아파트 커뮤니티센터",
    provenance: "generated",
  },
  "visual-business-apartment-wide": {
    file: "/images/business/apartment-wide.webp",
    subject: "아파트 커뮤니티 골프연습장 · GX룸 · 스터디 라운지",
    size: "2400 × 1029",
    ratio: "21:9",
    usedIn: "사업 상세 — 아파트 커뮤니티 운영 범위",
    alt: "골프연습장과 GX룸, 스터디 라운지가 이어진 아파트 커뮤니티 시설",
    provenance: "generated",
  },
  "visual-business-sports": {
    file: "/images/business/sports.webp",
    subject: "피트니스 전경 — 유리 너머 GX 스튜디오 · 실내 골프 타석 (사람 없음)",
    size: "1600 × 1195",
    ratio: "4:3",
    usedIn: "사업 상세 — 스포츠 · 피트니스 Hero",
    alt: "유리 너머 GX 스튜디오와 실내 골프 타석이 보이는 피트니스 전경",
    provenance: "generated",
  },
  "visual-business-sports-wide": {
    file: "/images/business/sports-wide.webp",
    subject: "대형 피트니스 클럽 — 유산소 · 프리웨이트 · GX 스튜디오",
    size: "2400 × 1029",
    ratio: "21:9",
    usedIn: "사업 상세 — 스포츠 · 피트니스 운영 범위",
    alt: "창가를 따라 늘어선 유산소 기구와 프리웨이트 존이 있는 피트니스 클럽",
    provenance: "generated",
  },
  "visual-business-hotel": {
    file: "/images/business/hotel.webp",
    subject: "호텔 웰니스 — 라운지 · 유리 너머 피트니스 · 실내 수영장",
    size: "1600 × 1207",
    ratio: "4:3",
    usedIn: "사업 상세 — 기업 · 호텔 Hero",
    alt: "호텔 라운지와 유리 너머 피트니스, 실내 수영장",
    provenance: "generated",
  },
  "visual-business-corporate-wide": {
    file: "/images/business/corporate-wide.webp",
    subject: "기업 사옥 복지층 — 사내 피트니스 · 임직원 라운지 · 다목적실",
    size: "2400 × 1029",
    ratio: "21:9",
    usedIn: "사업 상세 — 기업 · 호텔 운영 범위",
    alt: "사내 피트니스와 임직원 라운지, 다목적실이 있는 기업 사옥 복지 공간",
    provenance: "generated",
  },
  "visual-business-consulting": {
    file: "/images/business/consulting.webp",
    subject: "점검용 태블릿이 놓인 카운터와 라운지 · 헬스장 전경 (사람 없음)",
    size: "1600 × 1195",
    ratio: "4:3",
    usedIn: "사업 상세 — 운영 컨설팅 Hero",
    alt: "점검용 태블릿과 메모가 놓인 카운터 너머의 커뮤니티 라운지와 헬스장",
    provenance: "generated",
  },
  "visual-business-consulting-wide": {
    file: "/images/business/consulting-wide.webp",
    subject: "개선을 앞둔 커뮤니티 다목적실 · 스터디 라운지 — 체크리스트 · 줄자 (사람 없음)",
    size: "2400 × 1029",
    ratio: "21:9",
    usedIn: "사업 상세 — 운영 컨설팅 진단 대상",
    alt: "체크리스트와 줄자가 놓인 개선 전 커뮤니티 다목적실",
    provenance: "generated",
  },
  "visual-business-equipment": {
    file: "/images/business/equipment.webp",
    subject: "설치 중인 새 운동기구 — 보호 비닐 · 포장 박스 · 공구 (사람 없음)",
    size: "1600 × 1195",
    ratio: "4:3",
    usedIn: "사업 상세 — 시설 지원 Hero",
    alt: "보호 비닐을 씌운 새 운동기구와 포장 박스가 놓인 설치 중인 피트니스룸",
    provenance: "generated",
  },
  "visual-business-equipment-wide": {
    file: "/images/business/equipment-wide.webp",
    subject: "새로 구축한 스크린골프 타석 3개",
    size: "2400 × 1029",
    ratio: "21:9",
    usedIn: "사업 상세 — 시설 지원 구축 범위",
    alt: "새로 구축한 스크린골프 타석 세 곳",
    provenance: "generated",
  },





  "home-apartment": {
    file: "/images/home/apartment-community.jpg",
    subject: "아파트 커뮤니티센터 내부 (인포메이션 데스크 또는 라운지 전경)",
    size: "1600 × 1200 이상",
    ratio: "4:3",
    usedIn: "홈 · 사업영역 · 아파트 커뮤니티 위탁운영",
    alt: "아파트 커뮤니티센터 인포메이션 데스크",
  },
  "home-sports": {
    file: "/images/home/sports-facility.jpg",
    subject: "헬스장 또는 스크린골프 타석 전경",
    size: "1600 × 1200 이상",
    ratio: "4:3",
    usedIn: "홈 · 사업영역 · 스포츠 · 피트니스 시설 운영",
    alt: "다짐이 운영하는 헬스장",
  },
  "home-work": {
    file: "/images/home/field-work.jpg",
    subject: "현장 업무 장면 — 트레이너의 입주민 OT, 기구 점검, 인포메이션 응대 중 하나",
    size: "1600 × 2000 이상",
    ratio: "4:5 (세로형)",
    usedIn: "홈 · 현장 업무",
    alt: "다짐 트레이너가 입주민에게 기구 사용법을 안내하는 모습",
  },



  "hilink-admin": {
    file: "/images/hilink/admin-screen.png",
    subject: "관리자(CRM) 실제 화면은 사용하지 않음 — 개념 UI(데모 배지)로 대체",
    size: "-",
    ratio: "16:10",
    usedIn: "사용 안 함",
    alt: "HILINK 관리자 화면",
  },

  "company-team": {
    file: "/images/company/team.jpg",
    subject: "다짐 직원 단체 사진 또는 본사 회의 장면",
    size: "2000 × 1250 이상",
    ratio: "16:10",
    usedIn: "회사소개",
    alt: "다짐 운영팀",
  },
  "business-apartment-community": {
    file: "/images/business/apartment-community.jpg",
    subject: "아파트 커뮤니티센터 전경 또는 GX룸 수업 장면",
    size: "2400 × 1200 이상",
    ratio: "2:1",
    usedIn: "아파트 커뮤니티 위탁운영 상세 상단",
    alt: "아파트 커뮤니티센터",
  },
  "business-sports-fitness": {
    file: "/images/business/sports-fitness.jpg",
    subject: "헬스장 또는 골프연습장 전경",
    size: "2400 × 1200 이상",
    ratio: "2:1",
    usedIn: "스포츠 · 피트니스 시설 운영 상세 상단",
    alt: "스포츠 · 피트니스 시설",
  },
  "business-community-facility": {
    file: "/images/business/community-facility.jpg",
    subject: "기업 · 호텔 · 레지던스 내 피트니스 또는 라운지",
    size: "2400 × 1200 이상",
    ratio: "2:1",
    usedIn: "기업 · 호텔 커뮤니티 운영 상세 상단",
    alt: "기업 · 호텔 커뮤니티 시설",
  },
  "business-consulting": {
    file: "/images/business/consulting.jpg",
    subject: "시설 개선 전후 비교 또는 현장 실사 장면",
    size: "2400 × 1200 이상",
    ratio: "2:1",
    usedIn: "운영 컨설팅 · 시설 개선 상세 상단",
    alt: "커뮤니티 시설 현장 점검",
  },
  "business-equipment": {
    file: "/images/business/equipment.jpg",
    subject: "납품 · 설치한 운동기구 또는 스크린골프 타석",
    size: "2400 × 1200 이상",
    ratio: "2:1",
    usedIn: "운동기구 · 스크린골프 납품 상세 상단",
    alt: "설치된 운동기구",
  },

  /* ---------------------------------------------------------------
   * 커뮤니티 시설별 사진 — 홈 · 아파트 커뮤니티 위탁운영 상세의 "운영 시설" 갤러리
   * 기존 사이트(dagym1.com) 홈 · 서비스 페이지의 시설 이미지를 우선 사용합니다.
   * ------------------------------------------------------------- */
  "facility-pool": {
    file: "/images/facilities/pool.jpg",
    subject: "커뮤니티 수영장 전경 (기존 사이트 홈 메인 수영장 이미지)",
    size: "2000 × 1500 이상",
    ratio: "4:3",
    usedIn: "홈 · 아파트 커뮤니티 위탁운영 — 운영 시설",
    alt: "커뮤니티 수영장",
    legacyPage: "https://www.dagym1.com/ (메인 이미지)",
    provenance: "unknown",
  },
  "facility-fitness": {
    file: "/images/facilities/fitness-v2.webp",
    subject: "아파트 커뮤니티 피트니스 전경 — 런닝머신 · 웨이트 머신 · 프리웨이트 존 (사람 없음)",
    size: "1600 × 1195",
    ratio: "4:3",
    usedIn: "홈 · 커뮤니티 운영 범위",
    alt: "런닝머신과 웨이트 머신, 프리웨이트 존이 있는 커뮤니티 피트니스",
    provenance: "generated"
  },
  "facility-golf": {
    file: "/images/facilities/golf-v2.webp",
    subject: "아파트 커뮤니티 스크린골프 연습장 — 타석 여러 개 · 스크린 · 프로젝터 · 센서 키오스크 · 클럽 거치대 · 매트 (사람 없음)",
    size: "1600 × 1195",
    ratio: "4:3",
    usedIn: "홈 · 커뮤니티 운영 범위",
    alt: "스크린과 매트, 클럽 거치대를 갖춘 타석이 나란히 있는 아파트 커뮤니티 스크린골프 연습장",
    provenance: "generated"
  },
  "facility-gx": {
    file: "/images/facilities/gx-v2.webp",
    subject: "GX · 필라테스 스튜디오 — 우드 바닥 · 거울벽 · 바레 · 리포머 · 매트 · 간접조명 (사람 없음)",
    size: "1600 × 1195",
    ratio: "4:3",
    usedIn: "홈 · 커뮤니티 운영 범위",
    alt: "필라테스 리포머와 GX 매트, 거울벽과 바레가 있는 밝은 GX · 필라테스 스튜디오",
    provenance: "generated"
  },
  "facility-cafe": {
    file: "/images/facilities/crop/cafe.jpg",
    subject: "커뮤니티 카페",
    size: "1600 × 1200 이상",
    ratio: "4:3",
    usedIn: "홈 · 아파트 커뮤니티 위탁운영 — 운영 시설",
    alt: "커뮤니티 카페",
    legacyPage: "https://www.dagym1.com/",
    provenance: "unknown",
  },
  "facility-library": {
    file: "/images/facilities/study.webp",
    subject: "아파트 독서실 — 개별 학습석 · 스탠드 조명 (사람 없음)",
    size: "1600 × 1195",
    ratio: "4:3",
    usedIn: "홈 · 커뮤니티 운영 범위",
    alt: "개별 학습석과 스탠드 조명이 있는 아파트 독서실",
    provenance: "generated"
  },
  "facility-guesthouse": {
    file: "/images/facilities/guesthouse.jpg",
    subject: "게스트하우스 객실",
    size: "1600 × 1200 이상",
    ratio: "4:3",
    usedIn: "홈 · 아파트 커뮤니티 위탁운영 — 운영 시설",
    alt: "커뮤니티 게스트하우스",
    legacyPage: "https://www.dagym1.com/",
    provenance: "unknown",
  },
  "company-banner": {
    file: "/images/company/banner.jpg",
    subject: "기존 회사소개 페이지 상단 배너",
    size: "2400 × 1000 이상",
    ratio: "12:5",
    usedIn: "회사소개 상단",
    alt: "다짐 회사소개",
    legacyPage: "https://www.dagym1.com/about-us",
    provenance: "unknown",
  },
} satisfies Record<string, PhotoSlot>;

export type PhotoId = keyof typeof photos;
