import "server-only";
import fs from "node:fs";
import path from "node:path";
import { videos, type VideoId } from "@/data/videos";

const exists = (p: string) => fs.existsSync(path.join(process.cwd(), "public", p));

/**
 * 재생 가능한 영상만 반환합니다.
 * - 원본 파일 + 포스터가 모두 있으면 "file"
 * - 원본 파일은 없고 embedUrl + 포스터가 있으면 "embed"
 * - 그 외에는 null (썸네일만으로 영상처럼 표시하지 않음)
 */
export function getPlayableVideo(id: VideoId) {
  const v = videos[id];
  const hasPoster = exists(v.poster);
  if (!hasPoster) return null;
  if (exists(v.file)) return { ...v, id, mode: "file" as const };
  if ("embedUrl" in v && v.embedUrl) return { ...v, id, mode: "embed" as const };
  return null;
}
