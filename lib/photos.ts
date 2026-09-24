import "server-only";
import fs from "node:fs";
import path from "node:path";
import { photos, type PhotoId } from "@/data/photos";

/** public/ 에 사진 파일이 실제로 있는지 확인 (빌드 시점 · 서버 전용) */
export function hasPhoto(id: PhotoId): boolean {
  return fs.existsSync(path.join(process.cwd(), "public", photos[id].file));
}

export function getPhoto(id: PhotoId) {
  return hasPhoto(id) ? photos[id] : null;
}

/** 사진 자리 안내 박스를 보여줄지 (개발 서버 또는 명시적 플래그) */
export const showPhotoSlots =
  process.env.NEXT_PUBLIC_SHOW_PHOTO_SLOTS === "1" ||
  (process.env.NODE_ENV === "development" && process.env.NEXT_PUBLIC_SHOW_PHOTO_SLOTS !== "0");
