/**
 * 사진 · 영상 출처 구분
 *   dagym-site  : 다짐이 실제 운영하는 현장 (공개 동의 시 현장명 표기 가능)
 *   hilink-demo : HILINK 공식 사이트에 공개된 제품 자산 (실제 앱 UI + 공개용 데모 데이터, 단말기 사진)
 *   stock       : 스톡 · 구매 이미지 — 현장 사진처럼 표기하지 않음
 *   unknown     : 출처 미확인 — 현장 사진처럼 표기하지 않음
 */
export type Provenance = "dagym-site" | "hilink-demo" | "stock" | "unknown";
