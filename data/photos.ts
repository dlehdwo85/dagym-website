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
  "hilink-app": {
    file: "/images/hilink/app-screen.png",
    subject: "HILINK 입주민 앱 실제 화면 캡처 (예약 또는 얼굴 등록 화면, 개인정보 가림 처리)",
    size: "1170 × 2532 (휴대폰 원본 캡처)",
    ratio: "휴대폰 세로 화면",
    usedIn: "홈 · HILINK 섹션 / HILINK 페이지",
    alt: "HILINK 입주민 앱 시설 예약 화면",
  },
  "hilink-admin": {
    file: "/images/hilink/admin-screen.png",
    subject: "HILINK 관리자(CRM) 실제 화면 캡처 (회원 · 예약 · 매출 화면, 개인정보 가림 처리)",
    size: "2560 × 1600 (PC 캡처)",
    ratio: "16:10",
    usedIn: "HILINK 페이지",
    alt: "HILINK 관리자 화면",
  },
  "hilink-device": {
    file: "/images/hilink/face-device.jpg",
    subject: "현장에 설치된 안면인식 출입 단말기 사진",
    size: "1600 × 2000 이상",
    ratio: "4:5",
    usedIn: "HILINK 페이지",
    alt: "커뮤니티센터 입구에 설치된 안면인식 출입 단말기",
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
} satisfies Record<string, PhotoSlot>;

export type PhotoId = keyof typeof photos;
