/**
 * 시설 운영 영상 (Video Slot Registry)
 *
 * 기존 사이트 「피트니스 운영 사례」(https://www.dagym1.com/피트니스-운영업) 의 `커뮤니티` 채널 영상 6개를
 * 리뉴얼 사이트에서 재사용하기 위한 목록입니다.
 *
 * 영상 표시 조건 (둘 중 하나)
 *   1) 원본 파일:  public{file} (mp4, H.264, 1080p 이하 권장) + public{poster} (jpg)
 *   2) 외부 삽입:  embedUrl (YouTube 등) + public{poster}
 * 조건을 만족하지 않으면 영상 타일은 방문자에게 표시되지 않습니다. (썸네일만으로 영상처럼 보이게 하지 않음)
 *
 * 재생 방식: 자동재생 없음 · 첫 재생 전까지 영상 데이터를 불러오지 않음(preload="none") ·
 *           사용자가 재생 버튼을 누르면 소리와 함께 재생 · 모바일은 화면 안에서 재생(playsInline)
 */

import type { Provenance } from "./media-types";

export type VideoSlot = {
  file: string;
  poster: string;
  /** 외부 삽입 주소 (예: https://www.youtube-nocookie.com/embed/<id>) — 원본 파일이 없을 때만 사용 */
  embedUrl?: string;
  title: string;
  facility: string;
  legacyPage: string;
  provenance: Provenance;
  siteName?: string;
  /** 재생 시간 (예: "0:42") — 확인된 값만 */
  duration?: string;
};

export const videos = {
  "video-fitness": {
    file: "/videos/fitness.mp4",
    poster: "/videos/fitness.jpg",
    title: "헬스장 운영",
    facility: "헬스장",
    legacyPage: "https://www.dagym1.com/피트니스-운영업",
    provenance: "unknown",
  },
  "video-golf": {
    file: "/videos/golf.mp4",
    poster: "/videos/golf.jpg",
    title: "골프장 운영",
    facility: "골프연습장",
    legacyPage: "https://www.dagym1.com/피트니스-운영업",
    provenance: "unknown",
  },
  "video-gx": {
    file: "/videos/gx.mp4",
    poster: "/videos/gx.jpg",
    title: "GX 운영",
    facility: "GX룸",
    legacyPage: "https://www.dagym1.com/피트니스-운영업",
    provenance: "unknown",
  },
  "video-cafe": {
    file: "/videos/cafe.mp4",
    poster: "/videos/cafe.jpg",
    title: "카페 운영",
    facility: "카페",
    legacyPage: "https://www.dagym1.com/피트니스-운영업",
    provenance: "unknown",
  },
  "video-library": {
    file: "/videos/library.mp4",
    poster: "/videos/library.jpg",
    title: "도서관 운영",
    facility: "작은도서관",
    legacyPage: "https://www.dagym1.com/피트니스-운영업",
    provenance: "unknown",
  },
  "video-guesthouse": {
    file: "/videos/guesthouse.mp4",
    poster: "/videos/guesthouse.jpg",
    title: "게스트하우스 운영",
    facility: "게스트하우스",
    legacyPage: "https://www.dagym1.com/피트니스-운영업",
    provenance: "unknown",
  },
} satisfies Record<string, VideoSlot>;

export type VideoId = keyof typeof videos;
