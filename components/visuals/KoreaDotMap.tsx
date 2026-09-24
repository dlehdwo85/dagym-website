import type { Project } from "@/data/projects";

/*
 * 대한민국 dot-matrix 지도 — 좌표(location)가 입력된 현장만 표시합니다.
 * 외부 지도 API 없이 SVG 로 렌더링되어 가볍고 서버에서 생성됩니다.
 */

const LNG_MIN = 125.8;
const LNG_MAX = 129.8;
const LAT_MIN = 33.1;
const LAT_MAX = 38.7;
const W = 58; // 위도 36° 기준 경도 축소 비율을 반영한 가로 폭
const H = 100;

const toXY = (lng: number, lat: number) => ({
  x: ((lng - LNG_MIN) / (LNG_MAX - LNG_MIN)) * W,
  y: ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * H,
});

// 개략적인 남한 본토 윤곽 (경도, 위도)
const mainland: [number, number][] = [
  [126.1, 37.75], [126.6, 37.9], [127.1, 38.3], [128.35, 38.6], [128.6, 38.1], [129.05, 37.6],
  [129.35, 37.0], [129.45, 36.3], [129.55, 35.9], [129.35, 35.45], [129.05, 35.1], [128.6, 34.85],
  [128.0, 34.8], [127.6, 34.7], [127.3, 34.5], [126.8, 34.35], [126.3, 34.4], [126.35, 34.8],
  [126.45, 35.3], [126.5, 35.7], [126.75, 36.0], [126.5, 36.4], [126.15, 36.75], [126.6, 37.0],
  [126.65, 37.35],
];

function inside(poly: { x: number; y: number }[], x: number, y: number) {
  let hit = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const a = poly[i];
    const b = poly[j];
    if (a.y > y !== b.y > y && x < ((b.x - a.x) * (y - a.y)) / (b.y - a.y) + a.x) hit = !hit;
  }
  return hit;
}

const poly = mainland.map(([lng, lat]) => toXY(lng, lat));
const jeju = toXY(126.55, 33.38);
const STEP = 1.9;
const dots: { x: number; y: number }[] = [];
for (let y = STEP / 2; y < H; y += STEP) {
  for (let x = STEP / 2; x < W; x += STEP) {
    const inJeju = ((x - jeju.x) / 5) ** 2 + ((y - jeju.y) / 2.2) ** 2 <= 1;
    if (inside(poly, x, y) || inJeju) dots.push({ x, y });
  }
}

export function KoreaDotMap({ projects, className }: { projects: Project[]; className?: string }) {
  const located = projects.filter((p) => p.location);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className} role="img" aria-label={`운영 현장 지도: ${located.length}개 현장 표시`}>
      <g fill="rgba(255,255,255,0.18)">
        {dots.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r={0.42} />
        ))}
      </g>
      {located.map((p) => {
        const { x, y } = toXY(p.location!.lng, p.location!.lat);
        return (
          <g key={p.slug}>
            <circle cx={x} cy={y} r={2.2} fill="var(--color-accent)" opacity={0.25} />
            <circle cx={x} cy={y} r={0.9} fill="var(--color-accent-light)" />
            <title>{p.name}</title>
          </g>
        );
      })}
    </svg>
  );
}
