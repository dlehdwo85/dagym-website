import type { PhotoId } from "./photos";

/**
 * 사업영역 콘텐츠
 * 다짐의 운영 방식 설명.
 * 실적 수치 · 현장명은 포함하지 않습니다.
 */

export type BusinessDetail = {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  heroTitle: string;
  /** 한 문장 */
  heroSub: string;
  /** 누가 맡기는가 — 한 줄씩 */
  targets: { title: string; need: string }[];
  /** 운영 시설 (태그) */
  facilities: string[];
  /** 프로그램 — 제목 + 한 줄 */
  programs: { title: string; body: string }[];
  /** 인력 구성 — 역할 + 한 줄 */
  staffing: { role: string; work: string }[];
  /** HILINK 로 관리하는 것 — 한 문장 */
  system: string;
  /** 운영 보고 — 한 문장 */
  report: string;
  /** 추가 설명 블록 (예: 이용료 부과 방식) */
  extra?: { title: string; lead: string; rows: { title: string; body: string }[] };
  /** 위탁 범위 선택 */
  scopeOptions: { title: string; body: string }[];
  contactType: string;
};

export type BusinessArea = {
  no: string;
  slug: string;
  href: string;
  title: string;
  summary: string;
  points: string[];
  photo: PhotoId;
  detail: BusinessDetail;
};

export const businessAreas: BusinessArea[] = [
  {
    no: "01",
    slug: "apartment-community",
    href: "/business/apartment-community",
    title: "공동주택 커뮤니티 위탁운영",
    summary: "헬스장, 골프연습장, GX룸, 독서실, 카페까지 단지 커뮤니티센터 전체를 한 회사가 맡아 운영합니다.",
    points: ["인포메이션 · 트레이너 · 강사 운영", "입주민 프로그램 · 이벤트", "월간 운영 보고"],
    photo: "home-apartment",
    detail: {
      metaTitle: "아파트 커뮤니티 위탁운영",
      metaDescription:
        "아파트 커뮤니티센터 위탁운영. 헬스장 · 골프연습장 · GX룸 · 독서실 · 카페 운영 인력, 입주민 프로그램, 안면인식 출입과 예약, 월간 운영 보고까지 다짐이 맡습니다.",
      keywords: ["아파트 커뮤니티 위탁운영", "커뮤니티센터 위탁운영", "주민공동시설 위탁운영", "아파트 헬스장 위탁운영"],
      heroTitle: "아파트 커뮤니티센터를\n통째로 맡아 운영합니다.",
      heroSub: "인력 · 프로그램 · 출입 · 정산 · 보고까지 한 회사가 책임집니다.",
      targets: [
        { title: "입주자대표회의", need: "운영사를 선정하고 결과를 확인해야 할 때" },
        { title: "관리사무소", need: "커뮤니티 민원 · 정산 부담을 덜고 싶을 때" },
        { title: "시행사 · 건설사", need: "입주 시점에 맞춰 운영을 준비할 때" },
        { title: "위탁관리회사", need: "관리와 커뮤니티 운영을 나누고 싶을 때" },
      ],
      facilities: ["헬스장", "골프연습장", "GX룸", "독서실", "작은도서관", "사우나", "수영장", "게스트하우스", "키즈카페", "카페"],
      programs: [
        { title: "입주민 OT", body: "처음 이용하는 입주민에게 운동 루틴을 안내합니다." },
        { title: "GX 프로그램", body: "수요 조사로 수업을 정하고 분기마다 조정합니다." },
        { title: "골프 레슨", body: "타석 이용과 레슨 시간을 나눠 운영합니다." },
        { title: "입주민 이벤트", body: "체험 수업 · 계절 행사로 이용을 넓힙니다." },
      ],
      staffing: [
        { role: "인포메이션", work: "회원 등록 · 시설 안내 · 민원 접수" },
        { role: "트레이너", work: "OT · PT · 기구 안전 지도" },
        { role: "GX 강사 · 골프 프로", work: "그룹 수업 · 골프 레슨" },
        { role: "본사 운영 담당", work: "정기 방문 · 직원 교육 · 대체 인력" },
      ],
      system: "안면인식 출입, 시설 예약, 이용료 정산을 HILINK로 관리합니다.",
      report: "매월 이용 현황 · 정산 · 민원 처리 결과를 보고합니다.",
      extra: {
        title: "이용료 부과 방식",
        lead: "단지 상황에 맞춰 함께 정합니다.",
        rows: [
          { title: "사용자 부담", body: "이용하는 세대만 부담" },
          { title: "혼합 부과", body: "기본 금액 + 추가 이용분" },
          { title: "전 세대 부과", body: "전 세대 부담, 좌석은 추첨" },
        ],
      },
      scopeOptions: [
        { title: "전체 위탁", body: "인력 · 프로그램 · 시설 관리 · HILINK · 정산까지 커뮤니티 운영 전체" },
        { title: "시설별 위탁", body: "헬스장, 골프연습장, GX룸 등 일부 시설만 운영" },
        { title: "시스템 도입", body: "운영은 단지에서 하고 HILINK 출입 · 예약 · 정산만 도입" },
      ],
      contactType: "apartment",
    },
  },
  {
    no: "02",
    slug: "sports-fitness",
    href: "/business/sports-fitness",
    title: "스포츠 · 피트니스 시설 운영",
    summary: "헬스장, 골프연습장, 필라테스 · GX 시설을 전문 인력과 회원관리 시스템으로 운영합니다.",
    points: ["트레이너 · 골프 프로 · 강사 운영", "회원권 · 레슨 · 락커 관리", "기구 점검과 안전 교육"],
    photo: "home-sports",
    detail: {
      metaTitle: "스포츠 · 피트니스 시설 위탁운영",
      metaDescription:
        "헬스장 · 골프연습장 · 필라테스 · GX 시설 위탁운영. 트레이너 · 골프 프로 · 강사 운영, 회원권과 레슨 관리, 기구 점검과 안전 교육을 다짐이 맡습니다.",
      keywords: ["피트니스 위탁운영", "골프연습장 위탁운영", "스포츠시설 위탁운영", "헬스장 위탁운영"],
      heroTitle: "스포츠시설의 수업과 회원,\n시설 관리를 맡습니다.",
      heroSub: "트레이너 · 강사 운영부터 회원 · 레슨 관리까지 맡고 결과를 보고합니다.",
      targets: [
        { title: "스포츠시설 소유주", need: "운영 인력과 품질이 고민일 때" },
        { title: "골프연습장 · 스튜디오", need: "레슨과 회원 관리를 맡기고 싶을 때" },
        { title: "신규 피트니스", need: "오픈 준비부터 운영까지 필요할 때" },
      ],
      facilities: ["헬스장", "골프연습장 · 스크린골프", "필라테스", "GX룸", "락커룸 · 샤워실"],
      programs: [
        { title: "PT · 재활", body: "재활 · 교정 교육을 이수한 트레이너가 진행합니다." },
        { title: "골프 레슨", body: "입문 · 중급 레슨과 타석 예약을 함께 관리합니다." },
        { title: "GX · 필라테스", body: "수요 조사로 수업을 구성합니다." },
      ],
      staffing: [
        { role: "센터 매니저", work: "현장 총괄 · 회원 상담 · 보고" },
        { role: "트레이너", work: "OT · PT · 안전 지도" },
        { role: "골프 프로 · GX 강사", work: "레슨 · 그룹 수업" },
        { role: "안내 인력", work: "회원 응대 · 락커 · 순회 점검" },
      ],
      system: "회원 · 이용권 · 출입 · 레슨 예약을 HILINK로 관리합니다.",
      report: "매월 회원 · 매출 · 수업 현황을 보고합니다.",
      scopeOptions: [
        { title: "전체 위탁", body: "인력 · 프로그램 · 회원 · 매출 관리 전체" },
        { title: "인력 · 프로그램 위탁", body: "트레이너 · 강사 운영과 수업 편성만" },
        { title: "시스템 도입", body: "HILINK 회원 · 출입 · 예약 관리만" },
      ],
      contactType: "sports",
    },
  },
  {
    no: "03",
    slug: "community-facility",
    href: "/business/community-facility",
    title: "기업 · 호텔 · 복합시설 커뮤니티 운영",
    summary: "기업 사옥, 호텔, 레지던스의 피트니스 · 라운지 등 공용 시설을 운영합니다.",
    points: ["이용자 유형별 출입 권한", "공용 시설 예약 · 대관", "이용 현황 보고"],
    photo: "business-community-facility",
    detail: {
      metaTitle: "기업 · 호텔 커뮤니티 시설 운영",
      metaDescription:
        "기업 사옥 · 호텔 · 레지던스의 피트니스, 라운지, 다목적실 등 공용 시설 운영. 이용자 유형별 출입 권한, 예약 · 대관, 이용 현황 보고를 다짐이 맡습니다.",
      keywords: ["기업 피트니스 운영", "호텔 피트니스 위탁운영", "레지던스 커뮤니티 운영", "복합시설 위탁운영"],
      heroTitle: "기업 · 호텔의 피트니스와\n부대시설을 운영합니다.",
      heroSub: "임직원 · 투숙객 · 입주자 등 이용자에 맞춘 기준으로 운영합니다.",
      targets: [
        { title: "호텔 · 레지던스", need: "피트니스 · 부대시설 운영을 맡기고 싶을 때" },
        { title: "기업 복지 담당자", need: "사내 피트니스 · 라운지를 운영해야 할 때" },
        { title: "자산관리 · 운영사", need: "복합시설 공용 공간을 관리할 때" },
      ],
      facilities: ["피트니스", "GX룸", "수영장", "라운지", "다목적실 · 회의실", "게스트룸"],
      programs: [
        { title: "그룹 수업", body: "근무 · 체류 시간대에 맞춰 편성합니다." },
        { title: "웰니스 클래스", body: "건강 관리 클래스와 계절 이벤트를 운영합니다." },
      ],
      staffing: [
        { role: "운영 매니저", work: "현장 총괄 · 고객사 보고" },
        { role: "트레이너 · 강사", work: "피트니스 지도 · 그룹 수업" },
        { role: "안내 인력", work: "이용자 응대 · 예약 확인 · 순회" },
      ],
      system: "이용자 유형별 출입 권한과 시설 예약 · 대관을 HILINK로 관리합니다.",
      report: "매월 시설별 이용 현황과 운영 이슈를 보고합니다.",
      scopeOptions: [
        { title: "전체 위탁", body: "인력 · 프로그램 · 시설 관리 · 시스템" },
        { title: "시스템 도입", body: "출입 권한 · 예약 · 대관 관리만" },
      ],
      contactType: "etc",
    },
  },
  {
    no: "04",
    slug: "consulting",
    href: "/business/consulting",
    title: "시설 운영 컨설팅 · 활성화",
    summary: "이용이 저조한 시설을 진단하고, 기구 보강 · 공간 전환 · 프로그램 개편으로 개선합니다.",
    points: ["시설 · 이용 현황 진단", "공간 전환 · 기구 보강 제안", "입주 전 운영 준비"],
    photo: "business-consulting",
    detail: {
      metaTitle: "커뮤니티 운영 컨설팅 · 시설 개선",
      metaDescription:
        "커뮤니티 시설 진단과 개선. 운동기구 보강, 천막 타석의 스크린골프 전환, 유휴 공간 활용, GX 프로그램 개편, 입주 전 운영 준비를 지원합니다.",
      keywords: ["커뮤니티 운영 컨설팅", "커뮤니티 시설 개선", "아파트 커뮤니티 활성화", "입주 전 커뮤니티 준비"],
      heroTitle: "쓰이지 않는 시설을\n다시 쓰이게 만듭니다.",
      heroSub: "직접 운영해 본 기준으로 진단하고, 실행할 수 있는 개선안을 냅니다.",
      targets: [
        { title: "입주자대표회의", need: "이용률이 낮거나 민원이 반복될 때" },
        { title: "시행사 · 건설사", need: "입주 전 운영 방식을 점검할 때" },
        { title: "시설 소유주", need: "기존 시설의 활용도를 높이고 싶을 때" },
      ],
      facilities: ["헬스장", "골프연습장", "GX룸", "독서실", "유휴 공간", "카페"],
      programs: [
        { title: "운동기구 보강", body: "부족한 기구 · 소도구를 채우고 스트레칭 존을 만듭니다." },
        { title: "골프 타석 전환", body: "천막 타석의 스크린 전환을 검토합니다." },
        { title: "유휴 공간 활용", body: "비어 있는 공간을 수요 있는 시설로 바꿉니다." },
        { title: "GX 프로그램 개편", body: "새 수업과 조명 · 음향 개선을 검토합니다." },
      ],
      staffing: [
        { role: "운영기획 담당", work: "현장 실사 · 이용 분석 · 개선안 작성" },
        { role: "현장 운영 인력", work: "개선 후 운영 전환 · 안정화" },
      ],
      system: "HILINK 출입 · 예약 데이터로 시설별 이용 현황을 분석합니다.",
      report: "진단 보고서와 개선 후 이용 변화를 보고합니다.",
      scopeOptions: [
        { title: "진단 · 제안", body: "현장 실사와 개선안 보고서" },
        { title: "개선 실행", body: "기구 보강 · 공간 전환 · 프로그램 개편 실행" },
        { title: "운영 연계", body: "개선 후 위탁운영으로 전환" },
      ],
      contactType: "consulting",
    },
  },
  {
    no: "지원",
    slug: "equipment",
    href: "/business/equipment",
    title: "시설 지원 (기구 · 스크린골프)",
    summary: "보조 서비스 — 운영 중 필요할 때 헬스기구 보강 · 교체와 스크린골프 타석 구축을 운영 경험을 바탕으로 지원합니다.",
    points: ["헬스기구 구성 · 납품", "스크린골프 타석 설치", "설치 후 점검 연계"],
    photo: "business-equipment",
    detail: {
      metaTitle: "운동기구 · 스크린골프 납품",
      metaDescription:
        "아파트 커뮤니티 · 스포츠시설 헬스기구와 스크린골프 납품. 이용자 구성에 맞춘 기구 구성, 설치, 안면인식 출입 · 예약 시스템 연동과 사후 점검을 지원합니다.",
      keywords: ["아파트 헬스기구 납품", "스크린골프 납품", "커뮤니티 운동기구", "피트니스 기구 납품"],
      heroTitle: "운영해 본 회사가\n기구를 고릅니다.",
      heroSub: "운영 현장에서 확인한 기준으로 기구와 타석을 구성합니다.",
      targets: [
        { title: "시행사 · 건설사", need: "신축 단지 기구를 구성할 때" },
        { title: "입주자대표회의", need: "노후 기구 교체 · 타석 전환을 검토할 때" },
        { title: "시설 소유주", need: "피트니스 · 골프 시설을 새로 만들 때" },
      ],
      facilities: ["헬스장 (유산소 · 근력)", "스트레칭 존", "필라테스 · GX룸", "스크린골프 타석"],
      programs: [
        { title: "기구 구성", body: "이용자 연령대에 맞춰 유산소 · 근력 비율을 정합니다." },
        { title: "스크린골프", body: "공간 크기에 맞춰 타석 설치를 제안합니다." },
      ],
      staffing: [{ role: "구축 담당", work: "구성안 작성 · 납품 · 설치 일정 관리" }],
      system: "기구 설치와 함께 출입 · 예약 시스템을 구축할 수 있습니다.",
      report: "설치 완료 보고 후 정기 점검을 안내합니다.",
      scopeOptions: [
        { title: "기구 납품", body: "구성 · 납품 · 설치" },
        { title: "구축 + 시스템", body: "기구 설치와 출입 · 예약 시스템 동시 구축" },
      ],
      contactType: "equipment",
    },
  },
];

export function getBusiness(slug: string) {
  return businessAreas.find((b) => b.slug === slug);
}
