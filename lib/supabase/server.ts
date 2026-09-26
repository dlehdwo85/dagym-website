import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * 서버 전용 Supabase 클라이언트 (HILINK lib/supabase/server.ts 와 동일).
 * HILINK와 같은 Supabase 프로젝트의 `leads` 테이블을 공용 CRM으로 사용한다.
 * SERVICE ROLE KEY는 서버 환경변수로만 주입하며 클라이언트 번들에 절대 노출하지 않는다.
 * 환경변수가 없으면 null — 호출부에서 저장 생략 경로로 처리한다.
 */
export function getSupabaseAdmin(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) return null;

  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
