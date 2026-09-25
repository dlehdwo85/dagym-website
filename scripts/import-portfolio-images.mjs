#!/usr/bin/env node
/**
 * 운영실적 단지 이미지 가져오기
 *
 * 사용권이 확인된 원본 이미지를 한 폴더에 <slug>.<확장자> 이름으로 모아 두고 실행합니다.
 *   node scripts/import-portfolio-images.mjs ~/Downloads/dagym-portfolio
 *
 * - 긴 변 1600px 이하로 줄이고(확대하지 않음) JPG(품질 85)로 public/images/projects/<slug>.jpg 에 저장합니다.
 * - slug 목록은 data/projects.ts 와 같습니다. 모르는 파일명은 건너뜁니다.
 * - 가로 1200px 미만 원본은 경고를 출력합니다 (카드에서 흐리게 보일 수 있음).
 * - 해당 단지의 공식 조감도 · 투시도 · 실제 외관 사진만 사용합니다. AI 생성 · 스톡 이미지 금지.
 *   가져온 뒤 data/projects.ts 에서 단지별 imageSource 를 지정해야 사이트에 표시됩니다.
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const slugs = [
  "hillstate-prugio-juan",
  "osan-the-sharp-elifore",
  "osan-raon-private-suite",
  "sinbang-sambu-renaissance",
  "dujeong-acrotel",
  "shin-asan-moaelga-vista-2",
  "eumseong-prugio-the-first",
  "eumseong-woomi-lynn-fullhouse",
  "jincheon-dongil-highvill-park-terrace",
  "samryong-hoban-forescent",
  "forena-notae-1",
  "forena-notae-2",
];

const src = process.argv[2];
if (!src || !fs.existsSync(src)) {
  console.error("사용법: node scripts/import-portfolio-images.mjs <이미지 폴더>");
  process.exit(1);
}
const out = path.join(process.cwd(), "public", "images", "projects");
fs.mkdirSync(out, { recursive: true });

let done = 0;
for (const file of fs.readdirSync(src)) {
  const slug = path.parse(file).name;
  if (!slugs.includes(slug)) {
    console.log(`건너뜀: ${file} (알 수 없는 이름)`);
    continue;
  }
  const input = path.join(src, file);
  const meta = await sharp(input).metadata();
  if ((meta.width ?? 0) < 1200) console.warn(`주의: ${file} 가로 ${meta.width}px — 1200px 이상 원본을 권장합니다.`);
  await sharp(input).rotate().resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true }).jpeg({ quality: 85, mozjpeg: true }).toFile(path.join(out, `${slug}.jpg`));
  console.log(`저장: public/images/projects/${slug}.jpg (${meta.width}×${meta.height})`);
  done++;
}
const missing = slugs.filter((s) => !fs.existsSync(path.join(out, `${s}.jpg`)));
console.log(`\n다음: data/projects.ts 에서 저장한 단지의 imageSource 를 지정하세요.`);
console.log(`${done}개 저장. 아직 없는 단지: ${missing.length ? missing.join(", ") : "없음"}`);
