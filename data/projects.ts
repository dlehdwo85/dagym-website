/**
 * 운영실적 (Track Record) — 단지 이미지 + 단지명만 보여줍니다.
 *
 * 표시하지 않는 정보: 현재/과거 운영 구분, 운영 기간, 세대수, 계약 형태 · 금액, 인력, 매출, HILINK 적용 여부.
 *
 * 이미지
 *   - public/images/projects/<slug>.jpg 로 저장하면 자동 표시됩니다. 파일이 없으면 이미지 없는 카드로 표시됩니다.
 *   - 건설사 · 시행사 공식 조감도 또는 회사가 사용권을 가진 이미지만 사용합니다. 기사 이미지 hotlink 금지.
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
  publicationApproved: boolean;
};

const img = (slug: string) => `/images/projects/${slug}.jpg`;

const allProjects: PortfolioProject[] = [
  { slug: "hillstate-prugio-juan", name: "힐스테이트푸르지오 주안" },
  { slug: "osan-the-sharp-elifore", name: "오산더샵엘리포레" },
  { slug: "osan-raon-private-suite", name: "오산라온프라이빗스위트" },
  { slug: "sinbang-sambu-renaissance", name: "신방삼부르네상스" },
  { slug: "dujeong-acrotel", name: "두정아크로텔" },
  { slug: "shin-asan-moaelga-vista-2", name: "신아산모아엘가비스타 2차" },
  { slug: "eumseong-prugio-the-first", name: "음성푸르지오 더퍼스트" },
  { slug: "eumseong-woomi-lynn-fullhouse", name: "음성우미린풀하우스" },
  { slug: "jincheon-dongil-highvill-park-terrace", name: "진천 동일하이빌파크테라스" },
  { slug: "samryong-hoban-forescent", name: "삼룡호반포레센트" },
  { slug: "forena-notae-1", name: "한화포레나노태1단지" },
  { slug: "forena-notae-2", name: "한화포레나노태2단지" },
].map((p) => ({ ...p, image: img(p.slug), imageAlt: `${p.name} 단지 조감도`, publicationApproved: true }));

/** 공개 승인된 단지만 — 빌드 시점에 필터링 */
export const portfolio: PortfolioProject[] = allProjects.filter((p) => p.publicationApproved);

/** 이전 코드 호환 */
export const publishedProjects = portfolio;
