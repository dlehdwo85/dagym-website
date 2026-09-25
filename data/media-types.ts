/**
 * 사진 · 영상 출처 구분
 *   dagym-site  : 다짐이 실제 운영하는 현장 사진 (공개 동의 시 현장명 표기 가능)
 *   hilink-demo : 공개 승인된 HILINK 제품 화면 · 장비 사진 (데모 데이터)
 *   generated   : 브랜드 · 서비스 설명용 생성 이미지 (Higgsfield 등).
 *                 "실제 DAGYM 직원 · 현장 · 운영 단지"로 표기하지 않으며, 운영실적 영역에는 사용하지 않음
 *   stock       : 스톡 이미지 — 사용하지 않는 것이 원칙 (docs/IMAGE_POLICY.md)
 *   unknown     : 출처 미확인 — 현장 사진처럼 표기하지 않음
 */
export type Provenance = "dagym-site" | "hilink-demo" | "generated" | "stock" | "unknown";
