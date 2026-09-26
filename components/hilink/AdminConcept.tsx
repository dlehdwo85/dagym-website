import { Bell } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * HILINK 관리자 개념 UI — HILINK 공개 사이트의 AdminConcept(운영 대시보드) 와 같은 구성 · 색.
 * 실제 보호된 관리자 화면 · 메뉴 구조 · 데이터를 재현하지 않습니다. 모든 값은 샘플입니다.
 * 색은 HILINK 토큰 그대로 (brand #2563eb 계열, ink #0b1220 계열, surface #f8fafc 계열).
 */

function Stat({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className={cn("rounded-xl border p-3", accent ? "border-[#bfd7fe] bg-[#eff5ff]/60" : "border-[#e4e7ec] bg-white")}>
      <p className="text-[10px] text-[#667085]">{label}</p>
      <p className={cn("mt-0.5 text-[16px] font-bold", accent ? "text-[#1d4ed8]" : "text-[#0b1220]")}>{value}</p>
    </div>
  );
}

const alerts: [string, string][] = [
  ["신규 가입 승인 필요", "회원"],
  ["게스트하우스 예약 확인", "예약"],
  ["민원 답변 필요", "생활"],
  ["출입장치 상태 확인", "출입"],
];

const usage: [string, number][] = [
  ["헬스", 78],
  ["골프", 64],
  ["GX", 52],
  ["독서실", 84],
  ["게스트하우스", 40],
];

export function AdminConcept({ className }: { className?: string }) {
  return (
    <div className={cn("overflow-hidden rounded-2xl border border-[#e4e7ec] bg-white text-left shadow-2xl shadow-[#0b1220]/10", className)} aria-hidden>
      <div className="flex items-center gap-2 border-b border-[#e4e7ec] bg-[#f8fafc] px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-[#d0d5dd]" />
        <span className="size-2.5 rounded-full bg-[#d0d5dd]" />
        <span className="size-2.5 rounded-full bg-[#d0d5dd]" />
        <div className="ml-3 flex h-6 flex-1 items-center justify-between rounded-md bg-white px-3">
          <span className="text-[10px] text-[#98a2b3]">HI-LINK Admin</span>
          <span className="rounded bg-amber-50 px-1.5 text-[9px] font-bold text-amber-600">SAMPLE DATA</span>
        </div>
      </div>
      <div className="space-y-3 p-4 sm:p-5">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
          <Stat label="가입 승인 대기" value="12" accent />
          <Stat label="답장 필요 문의" value="5" accent />
          <Stat label="오늘 예약" value="84" />
          <Stat label="오늘 출입 인증" value="326" />
          <Stat label="미처리 업무" value="4" accent />
        </div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <div className="rounded-xl border border-[#e4e7ec] p-3">
            <div className="flex items-center gap-1.5">
              <Bell className="size-3.5 text-[#2563eb]" />
              <p className="text-[11px] font-bold text-[#1d2939]">운영 알림 — 조치가 필요한 일</p>
            </div>
            <ul className="mt-2 space-y-1.5">
              {alerts.map(([t, tag]) => (
                <li key={t} className="flex items-center justify-between rounded-lg bg-[#f8fafc] px-2.5 py-1.5">
                  <span className="text-[10.5px] font-medium text-[#1d2939]">{t}</span>
                  <span className="rounded-full bg-[#eff5ff] px-2 py-0.5 text-[9px] font-bold text-[#2563eb]">{tag}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-[#e4e7ec] p-3">
            <p className="text-[11px] font-bold text-[#1d2939]">시설 현황</p>
            <ul className="mt-2 space-y-1.5">
              {usage.map(([name, pct]) => (
                <li key={name}>
                  <div className="flex justify-between text-[10px] text-[#475467]">
                    <span>{name}</span>
                    <span className="font-semibold text-[#1d2939]">{pct}%</span>
                  </div>
                  <div className="mt-0.5 h-1.5 overflow-hidden rounded-full bg-[#f2f4f7]">
                    <div className="h-full rounded-full bg-[#3b76f6]" style={{ width: `${pct}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
