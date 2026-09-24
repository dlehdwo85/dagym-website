#!/usr/bin/env node
/**
 * 기존 공식 사이트(Wix, www.dagym1.com)의 이미지 · 영상 자산을 조사하고 원본을 내려받습니다.
 *
 * 사용법 (인터넷에 연결된 PC 또는 네트워크 허용 후):
 *   node scripts/import-wix-assets.mjs            # 조사 + 원본 다운로드
 *   node scripts/import-wix-assets.mjs --dry-run  # 조사만 (다운로드 안 함)
 *
 * 결과:
 *   public/legacy/<페이지>/<파일>          — 원본 이미지 · 영상
 *   docs/legacy-assets.json                — 자산 목록 (원본 URL, 해상도, 페이지, 대체텍스트, 유형)
 *   docs/LEGACY_ASSETS_INVENTORY.md        — 같은 내용의 표
 *
 * 주의
 *   - Wix 이미지 주소의 /v1/fill/... 변환 부분을 제거해 원본 해상도 파일을 받습니다.
 *   - Wix Video(채널) 목록은 페이지 HTML 에 포함되지 않고 별도 API 로 불러오는 경우가 있습니다.
 *     영상이 0개로 나오면 Wix 관리자 → 미디어 관리자 / Wix Video 에서 원본을 직접 내려받아야 합니다.
 *   - 이 스크립트는 출처를 판정하지 않습니다. 결과 표의 "출처 구분" 은 사람이 확인해 채웁니다.
 */
import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const DRY = args.includes("--dry-run");
const BASE = (args.find((a) => a.startsWith("--base="))?.slice(7) ?? "https://www.dagym1.com").replace(/\/$/, "");
const MEDIA = args.find((a) => a.startsWith("--media="))?.slice(8) ?? "https://static.wixstatic.com";
const VIDEO = args.find((a) => a.startsWith("--video="))?.slice(8) ?? "https://video.wixstatic.com";
const ROOT = args.find((a) => a.startsWith("--root="))?.slice(7) ?? path.resolve(new URL(".", import.meta.url).pathname, "..");

const PAGES = [
  { key: "home", label: "홈", path: "/" },
  { key: "about-us", label: "회사 소개", path: "/about-us" },
  { key: "service-1", label: "서비스", path: "/service-1" },
  { key: "fitness-operation", label: "피트니스 운영 사례", path: "/" + encodeURIComponent("피트니스-운영업") },
];

const UA = "Mozilla/5.0 (DAGYM asset audit)";

/** 대체텍스트 · 파일명으로 권장 배치를 추정 (사람이 최종 확인) */
function suggest(text) {
  const t = text.toLowerCase();
  const rules = [
    [/수영|pool|swim/, "facility-pool (홈 · 아파트 커뮤니티 운영 시설)"],
    [/헬스|피트니스|fitness|gym/, "facility-fitness"],
    [/골프|golf/, "facility-golf"],
    [/gx|요가|필라테스|댄스/, "facility-gx"],
    [/카페|cafe|coffee/, "facility-cafe"],
    [/도서|독서|library|study/, "facility-library"],
    [/게스트|guest/, "facility-guesthouse"],
    [/hilink|하이링크/, "HILINK 로고 · 제품 화면 (시설 사진과 분리)"],
    [/logo|로고|dagym|다짐/, "브랜드 로고 (헤더 · 푸터)"],
  ];
  for (const [re, s] of rules) if (re.test(t)) return s;
  return "검토 필요";
}

function extract(html) {
  const images = new Map();
  const add = (uri, extra = {}) => {
    const clean = uri.replace(/\\\//g, "/");
    if (!images.has(clean)) images.set(clean, { uri: clean, ...extra });
    else Object.assign(images.get(clean), Object.fromEntries(Object.entries(extra).filter(([, v]) => v)));
  };

  // 1) 이미지 URL (변환 경로 포함)
  for (const m of html.matchAll(/static\.wixstatic\.com\/media\/([A-Za-z0-9_]+~mv2[A-Za-z0-9_]*\.(?:jpe?g|png|webp|gif))/g)) add(m[1]);
  for (const m of html.matchAll(/static\.wixstatic\.com\/media\/([A-Za-z0-9_]+\.(?:svg|png|jpe?g))/g)) add(m[1]);
  // 2) Wix 데이터 JSON 의 uri · width · height · alt
  for (const m of html.matchAll(/"uri"\s*:\s*"([A-Za-z0-9_]+~mv2[A-Za-z0-9_]*\.(?:jpe?g|png|webp|gif))"/g)) {
    const win = html.slice(Math.max(0, m.index - 400), m.index + 400);
    const w = win.match(/"width"\s*:\s*(\d+)/)?.[1];
    const h = win.match(/"height"\s*:\s*(\d+)/)?.[1];
    const alt = win.match(/"alt"\s*:\s*"([^"]*)"/)?.[1] ?? win.match(/"title"\s*:\s*"([^"]*)"/)?.[1];
    add(m[1], { width: w && Number(w), height: h && Number(h), alt });
  }
  // 3) <img alt> 연결
  for (const m of html.matchAll(/<img[^>]*src="[^"]*media\/([A-Za-z0-9_]+~mv2[A-Za-z0-9_]*\.(?:jpe?g|png|webp|gif))[^"]*"[^>]*>/g)) {
    const alt = m[0].match(/alt="([^"]*)"/)?.[1];
    add(m[1], { alt });
  }

  const videos = new Map();
  for (const m of html.matchAll(/video\.wixstatic\.com\/video\/([A-Za-z0-9_]+)\//g)) videos.set(m[1], { kind: "wix", id: m[1] });
  for (const m of html.matchAll(/"videoId"\s*:\s*"([A-Za-z0-9_]{10,})"/g)) videos.set(m[1], { kind: "wix", id: m[1] });
  for (const m of html.matchAll(/(?:youtube(?:-nocookie)?\.com\/(?:embed\/|watch\?v=)|youtu\.be\/)([\w-]{11})/g)) videos.set(m[1], { kind: "youtube", id: m[1] });
  for (const m of html.matchAll(/vimeo\.com\/(?:video\/)?(\d{6,})/g)) videos.set(m[1], { kind: "vimeo", id: m[1] });

  return { images: [...images.values()], videos: [...videos.values()] };
}

async function get(url) {
  const res = await fetch(url, { headers: { "User-Agent": UA }, redirect: "follow" });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res;
}

async function imageSize(buf) {
  try {
    const sharp = (await import("sharp")).default;
    const m = await sharp(buf).metadata();
    return { width: m.width, height: m.height };
  } catch {
    return {};
  }
}

const rows = [];
for (const page of PAGES) {
  const url = BASE + page.path;
  let html;
  try {
    html = await (await get(url)).text();
  } catch (e) {
    console.error(`✗ ${page.label} 페이지를 열 수 없습니다: ${e.message}`);
    rows.push({ page: page.label, pageUrl: url, type: "page", status: `접근 실패: ${e.message}` });
    continue;
  }
  const { images, videos } = extract(html);
  console.log(`• ${page.label}: 이미지 ${images.length}개, 영상 ${videos.length}개`);
  const dir = path.join(ROOT, "public", "legacy", page.key);
  if (!DRY) fs.mkdirSync(dir, { recursive: true });

  for (const img of images) {
    const original = `${MEDIA}/media/${img.uri}`;
    const row = { page: page.label, pageUrl: url, type: "image", source: original, alt: img.alt ?? "", width: img.width, height: img.height };
    if (!DRY) {
      try {
        const buf = Buffer.from(await (await get(original)).arrayBuffer());
        const file = path.join(dir, img.uri);
        fs.writeFileSync(file, buf);
        Object.assign(row, await imageSize(buf), { file: path.relative(ROOT, file), bytes: buf.length, status: "원본 확보" });
      } catch (e) {
        row.status = `다운로드 실패: ${e.message}`;
      }
    } else row.status = "조사만";
    row.suggest = suggest(`${img.alt ?? ""} ${img.uri}`);
    rows.push(row);
  }

  for (const v of videos) {
    const row = { page: page.label, pageUrl: url, type: `video/${v.kind}`, source: v.id, alt: "", status: "" };
    if (v.kind === "wix" && !DRY) {
      for (const q of ["1080p", "720p", "480p", "360p"]) {
        const src = `${VIDEO}/video/${v.id}/${q}/mp4/file.mp4`;
        try {
          const buf = Buffer.from(await (await get(src)).arrayBuffer());
          const file = path.join(dir, `${v.id}-${q}.mp4`);
          fs.writeFileSync(file, buf);
          Object.assign(row, { source: src, file: path.relative(ROOT, file), bytes: buf.length, quality: q, status: "원본 확보 (포스터 이미지는 별도 필요)" });
          break;
        } catch {
          row.status = "Wix 영상 파일을 받을 수 없음 — Wix 관리자에서 원본 다운로드 필요";
        }
      }
    } else if (v.kind !== "wix") {
      row.source = v.kind === "youtube" ? `https://www.youtube-nocookie.com/embed/${v.id}` : `https://player.vimeo.com/video/${v.id}`;
      row.status = "외부 삽입 가능 (videos.ts embedUrl 에 입력, 포스터 이미지 필요)";
    } else row.status = "조사만";
    rows.push(row);
  }
}

const outJson = path.join(ROOT, "docs", "legacy-assets.json");
fs.mkdirSync(path.dirname(outJson), { recursive: true });
fs.writeFileSync(outJson, JSON.stringify({ generatedAt: new Date().toISOString(), base: BASE, rows }, null, 2));

const md = [
  "# 기존 사이트 자산 조사 결과 (자동 생성)",
  "",
  `생성: ${new Date().toISOString()} · 대상: ${BASE}`,
  "",
  "`출처 구분`은 사람이 확인해 채웁니다: 다짐 운영 현장 / 스톡 / 미확인. 스톡 · 미확인 이미지는 현장 사진으로 표기하지 않습니다.",
  "",
  "| 페이지 | 유형 | 원본 · 파일 | 해상도 | 내용(대체텍스트) | 상태 | 권장 위치 | 출처 구분 |",
  "| --- | --- | --- | --- | --- | --- | --- | --- |",
  ...rows.map((r) =>
    `| ${r.page} | ${r.type} | ${r.file ? `\`${r.file}\`` : r.source ?? r.pageUrl} | ${r.width ? `${r.width}×${r.height}` : ""} | ${(r.alt || "").replace(/\|/g, "/")} | ${r.status} | ${r.suggest ?? ""} |  |`,
  ),
  "",
].join("\n");
fs.writeFileSync(path.join(ROOT, "docs", "LEGACY_ASSETS_INVENTORY.md"), md);
console.log(`\n자산 ${rows.length}건 → docs/legacy-assets.json, docs/LEGACY_ASSETS_INVENTORY.md`);
