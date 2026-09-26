/**
 * 운영실적 (Track Record) — 단지 이미지 + 단지명만 보여줍니다.
 *
 * 표시하지 않는 정보: 현재/과거 운영 구분, 운영 기간, 세대수, 계약 형태 · 금액, 인력, 매출, HILINK 적용 여부.
 *
 * 이미지
 *   - public/images/projects/<slug>.jpg 로 저장하면 자동 표시됩니다. 파일이 없으면 이미지 없는 카드로 표시됩니다.
 *   - 해당 단지의 공식 조감도 · 공식 투시도 · 실제 외관 사진만 사용합니다 (imageSource 로 명시).
 *     AI 생성 조감도 · 스톡 이미지 · 다른 단지 이미지는 금지 — imageSource 가 없으면 이미지를 표시하지 않습니다.
 *   - 사용권이 확인된 이미지만. 기사 이미지 hotlink 금지.
 *   - 출처 · 사용권 확인 기록은 공개 저장소에 두지 않습니다.
 *
 * publicationApproved === true 인 항목만 빌드 데이터(portfolio)에 포함됩니다.
 */

export type PortfolioProject = {
  slug: string;
  name: string;
  /** public/ 기준 이미지 경로 */
  image: string;
  imageAlt: string;
  /** object-position (중요 건물 · 조경이 잘리지 않도록 단지별 조정) */
  imagePosition?: string;
  /** 이미지 출처 유형 — 지정된 경우에만 이미지를 표시 (생성 이미지 · 스톡 불가) */
  imageSource?: "official-rendering" | "official-perspective" | "actual-exterior";
  publicationApproved: boolean;
};

const img = (slug: string) => `/images/projects/${slug}.jpg`;

const allProjects: PortfolioProject[] = (
  [
    { slug: "hillstate-prugio-juan", name: "힐스테이트푸르지오 주안", imageSource: "official-perspective", imagePosition: "45% 55%" },
    { slug: "osan-the-sharp-elifore", name: "오산더샵엘리포레", imageSource: "official-rendering", imagePosition: "50% 50%" },
    { slug: "osan-raon-private-suite", name: "오산라온프라이빗스위트", imageSource: "official-perspective", imagePosition: "58% 50%" },
    { slug: "sinbang-sambu-renaissance", name: "신방삼부르네상스", imageSource: "official-perspective", imagePosition: "50% 50%" },
    { slug: "dujeong-acrotel", name: "두정아크로텔", imageSource: "official-rendering", imagePosition: "47% 60%" },
    { slug: "shin-asan-moaelga-vista-2", name: "신아산모아엘가비스타 2차", imageSource: "official-perspective", imagePosition: "50% 50%" },
    { slug: "eumseong-prugio-the-first", name: "음성푸르지오 더퍼스트", imageSource: "official-perspective", imagePosition: "55% 50%" },
    { slug: "eumseong-woomi-lynn-fullhouse", name: "음성우미린풀하우스", imageSource: "official-perspective", imagePosition: "55% 55%" },
    { slug: "jincheon-dongil-highvill-park-terrace", name: "진천 동일하이빌파크테라스", imageSource: "official-rendering", imagePosition: "50% 50%" },
    { slug: "samryong-hoban-forescent", name: "삼룡호반포레센트", imageSource: "official-rendering", imagePosition: "50% 50%" },
    { slug: "forena-notae-1", name: "한화포레나노태1단지", imageSource: "official-perspective", imagePosition: "50% 60%" },
    { slug: "forena-notae-2", name: "한화포레나노태2단지", imageSource: "official-perspective", imagePosition: "55% 65%" },
  ] as { slug: string; name: string; imageSource?: PortfolioProject["imageSource"]; imagePosition?: string }[]
).map((p) => ({
  ...p,
  image: img(p.slug),
  imageAlt: p.imageSource === "actual-exterior" ? `${p.name} 단지 외관` : `${p.name} 단지 조감도`,
  publicationApproved: true,
}));

/** 공개 승인된 단지만 — 빌드 시점에 필터링 */
export const portfolio: PortfolioProject[] = allProjects.filter((p) => p.publicationApproved);

/** 이전 코드 호환 */
export const publishedProjects = portfolio;
