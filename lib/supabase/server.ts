import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * 서버 전용 Supabase 클라이언트 (HILINK lib/supabase/server.ts 와 동일).
 * HILINK와 같은 Supabase 프로젝트의 `leads` 테이블을 공용 CRM으로 사용한다.
 * SERVICE ROLE KEY는 서버 환경변수로만 주입하며 클라이언트 번들에 절대 노출하지 않는다.
 * 환경변수가 없으면 null — 호출부에서 저장 생략 경로로 처리한다.
 */
/**
 * 프로젝트 기본 주소만 남긴다 — 값 끝에 /rest/v1 · /auth/v1 · 슬래시가 붙어 있으면
 * supabase-js 가 /rest/v1/rest/v1/leads 로 요청해 저장이 404 로 실패한다 (HILINK lib/supabase/url.ts 와 동일)
 */
function supabaseUrl(): string | undefined {
  const raw = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  if (!raw) return undefined;
  return raw.replace(/\/+$/, "").replace(/\/(rest|auth)\/v1$/i, "").replace(/\/+$/, "");
}

export function getSupabaseAdmin(): SupabaseClient | null {
  const url = supabaseUrl();
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) return null;

  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
