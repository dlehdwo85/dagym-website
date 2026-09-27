-- DAGYM 운영 문의를 HILINK 공용 CRM(public.leads)에 함께 저장하기 위한 보조 마이그레이션.
-- HILINK lib/supabase/schema.sql 을 먼저 적용한 같은 Supabase 프로젝트에서 실행한다.
-- 여러 번 실행해도 안전(idempotent)하며, 기존 행 · 컬럼 · RLS 는 변경하지 않는다.
--
--  - source       : DAGYM 문의는 'dagym-web' (기존 HILINK 문의는 'website' 그대로)
--  - apartment_name: DAGYM 은 "회사 / 단지명"을 저장 (컬럼명은 공용 스키마 유지)
--  - households   : 순수 세대수로 입력된 경우만 숫자로 저장 (그 외 null)

alter table public.leads add column if not exists inquiry_type text;   -- operation | hilink | consulting | corporate | sports | facility | etc
alter table public.leads add column if not exists facility_scale text; -- 예) 1,200세대 / 호텔 250객실 / 피트니스 500평

create index if not exists leads_source_idx on public.leads (source);

-- 적용 전에도 DAGYM 접수는 끊기지 않는다: 서버가 컬럼 부재(PGRST204/42703)를 감지하면
-- 문의 유형 · 시설 규모를 message 앞에 담아 다시 저장한다.
