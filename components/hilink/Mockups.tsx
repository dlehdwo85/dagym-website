import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  ScanFace,
  KeyRound,
  Receipt,
  ChartColumn,
  Megaphone,
  Bell,
  LandPlot,
  Music,
  Armchair,
  DoorOpen,
  Check,
  Search,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { HilinkMark } from "@/components/ui/Logo";

/*
 * HILINK 제품 UI 목업.
 * 화면 속 수치 · 이름은 UI 예시(DEMO)이며 실제 운영 데이터가 아닙니다.
 * 실제 화면 캡처가 준비되면 <Media src="..."> 로 교체할 수 있습니다.
 */

function DemoChip({ className }: { className?: string }) {
  return (
    <span className={cn("rounded-[2px] border border-white/15 px-1.5 py-0.5 text-[9px] font-semibold tracking-[0.14em] text-white/45", className)}>
      DEMO
    </span>
  );
}

/* ------------------------------------------------------------------ Browser frame */
export function BrowserFrame({ children, className, url = "admin.hilink" }: { children: React.ReactNode; className?: string; url?: string }) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[6px] border border-white/10 bg-[#0f1520] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)]",
        className,
      )}
    >
      <div className="flex h-8 items-center gap-3 border-b border-white/5 bg-[#131a26] px-3">
        <div className="flex gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
        </div>
        <div className="mx-auto flex h-5 w-1/2 max-w-64 items-center justify-center rounded-[3px] bg-white/5 text-[10px] text-white/40">
          {url}
        </div>
      </div>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ Dashboard */
const sideItems = [
  { icon: LayoutDashboard, label: "대시보드", active: true },
  { icon: Users, label: "회원관리" },
  { icon: ScanFace, label: "출입관리" },
  { icon: CalendarCheck, label: "예약관리" },
  { icon: KeyRound, label: "락커" },
  { icon: Receipt, label: "매출" },
  { icon: ChartColumn, label: "통계" },
  { icon: Megaphone, label: "공지 · 알림" },
];

const bars = [38, 52, 44, 70, 88, 64, 30, 26, 48, 76, 92, 84, 58, 40];

export function DashboardMockup({ className, compact }: { className?: string; compact?: boolean }) {
  return (
    <BrowserFrame className={className}>
      <div className="flex text-white" role="img" aria-label="HILINK 관리자 대시보드 화면 예시: 실시간 이용 인원, 오늘 예약, 매출, 시간대별 이용 그래프">
        <aside className={cn("shrink-0 border-r border-white/5 bg-[#0c111a] p-3", compact ? "hidden sm:block sm:w-32" : "hidden w-40 sm:block")}>
          <HilinkMark className="mb-5 text-[11px]" />
          <ul className="space-y-0.5">
            {sideItems.map(({ icon: I, label, active }) => (
              <li
                key={label}
                className={cn(
                  "flex items-center gap-2 rounded-[3px] px-2 py-1.5 text-[10px]",
                  active ? "bg-signal/15 text-white" : "text-white/45",
                )}
              >
                <I className={cn("size-3", active && "text-signal-light")} aria-hidden />
                {label}
              </li>
            ))}
          </ul>
        </aside>
        <div className="min-w-0 flex-1 p-3 sm:p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[9px] text-white/40">OO단지 커뮤니티센터</p>
              <p className="text-[12px] font-semibold">오늘의 운영 현황</p>
            </div>
            <div className="flex items-center gap-2">
              <DemoChip />
              <span className="flex items-center gap-1 text-[9px] text-emerald-300/80">
                <span className="animate-pulse-dot size-1.5 rounded-full bg-emerald-400" aria-hidden />
                LIVE
              </span>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2 lg:grid-cols-4">
            {[
              { k: "현재 이용 인원", v: "86", u: "명" },
              { k: "오늘 예약", v: "214", u: "건" },
              { k: "이번 달 매출", v: "3,420", u: "만원" },
              { k: "만료 예정 회원", v: "37", u: "명" },
            ].map((m, i) => (
              <div key={m.k} className="rounded-[4px] border border-white/5 bg-white/[0.03] p-2.5">
                <p className="text-[9px] text-white/40">{m.k}</p>
                <p className="t-num mt-1 text-[16px] font-semibold">
                  {m.v}
                  <span className="ml-0.5 text-[9px] font-normal text-white/40">{m.u}</span>
                </p>
                <div className="mt-2 h-[2px] w-full bg-white/5">
                  <div className="h-full bg-signal" style={{ width: `${[72, 58, 81, 24][i]}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-2 grid gap-2 lg:grid-cols-5">
            <div className="rounded-[4px] border border-white/5 bg-white/[0.03] p-3 lg:col-span-3">
              <div className="flex items-center justify-between">
                <p className="text-[10px] text-white/60">시간대별 출입</p>
                <p className="text-[9px] text-white/35">06 — 22시</p>
              </div>
              <div className="mt-3 flex h-20 items-end gap-[3px]" aria-hidden>
                {bars.map((h, i) => (
                  <div
                    key={i}
                    className={cn("flex-1 rounded-t-[1px]", i === 10 ? "bg-signal" : "bg-white/15")}
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>
            <div className="rounded-[4px] border border-white/5 bg-white/[0.03] p-3 lg:col-span-2">
              <p className="text-[10px] text-white/60">시설 이용률</p>
              <ul className="mt-2 space-y-2">
                {[
                  { n: "피트니스", p: 78 },
                  { n: "골프 타석", p: 92 },
                  { n: "GX", p: 64 },
                  { n: "독서실", p: 55 },
                ].map((f) => (
                  <li key={f.n} className="text-[9px]">
                    <div className="flex justify-between text-white/55">
                      <span>{f.n}</span>
                      <span className="t-num">{f.p}%</span>
                    </div>
                    <div className="mt-1 h-1 bg-white/5">
                      <div className="h-full bg-white/50" style={{ width: `${f.p}%` }} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {!compact && (
            <div className="mt-2 rounded-[4px] border border-white/5 bg-white/[0.03] p-3">
              <p className="text-[10px] text-white/60">최근 출입</p>
              <ul className="mt-2 divide-y divide-white/5 text-[9px]">
                {[
                  ["07:42", "101동 ****호", "피트니스", "안면인식"],
                  ["07:40", "105동 ****호", "골프 3번 타석", "예약 확인"],
                  ["07:38", "103동 ****호", "독서실 A-12", "좌석 배정"],
                ].map((r) => (
                  <li key={r[0] + r[1]} className="grid grid-cols-4 gap-2 py-1.5 text-white/50">
                    <span className="t-num">{r[0]}</span>
                    <span>{r[1]}</span>
                    <span>{r[2]}</span>
                    <span className="text-right text-signal-light">{r[3]}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </BrowserFrame>
  );
}

/* ------------------------------------------------------------------ Phone */
export function PhoneFrame({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "relative w-[15rem] rounded-[2.1rem] border border-white/15 bg-[#05070b] p-[7px] shadow-[0_40px_80px_-24px_rgba(0,0,0,0.7)]",
        className,
      )}
    >
      <div className="relative overflow-hidden rounded-[1.7rem] bg-[#f5f6f8]">
        <div className="absolute left-1/2 top-2 z-10 h-4 w-16 -translate-x-1/2 rounded-full bg-[#05070b]" aria-hidden />
        {children}
      </div>
    </div>
  );
}

export function PhoneAppMockup({ className }: { className?: string }) {
  return (
    <PhoneFrame className={className}>
      <div className="h-[29rem] text-ink" role="img" aria-label="HILINK 입주민 앱 화면 예시: 오늘의 예약과 시설 예약 메뉴">
        <div className="bg-navy-950 px-4 pb-5 pt-9 text-white">
          <div className="flex items-center justify-between">
            <HilinkMark className="text-[11px]" />
            <Bell className="size-3.5 text-white/60" aria-hidden />
          </div>
          <p className="mt-4 text-[10px] text-white/50">OO단지 · 101동</p>
          <p className="text-[14px] font-semibold">안녕하세요, 입주민님</p>
          <div className="mt-3 flex items-center gap-2 rounded-[6px] bg-white/10 p-2.5">
            <ScanFace className="size-5 text-signal-light" aria-hidden />
            <div className="text-[9px] leading-tight">
              <p className="font-semibold">얼굴 등록 완료</p>
              <p className="text-white/50">카드 없이 출입할 수 있어요</p>
            </div>
          </div>
        </div>
        <div className="px-4 py-4">
          <p className="text-[10px] font-semibold">시설 예약</p>
          <div className="mt-2 grid grid-cols-4 gap-2">
            {[
              { i: Music, l: "GX" },
              { i: LandPlot, l: "골프" },
              { i: Armchair, l: "독서실" },
              { i: DoorOpen, l: "대관" },
            ].map(({ i: I, l }) => (
              <div key={l} className="flex flex-col items-center gap-1 rounded-[6px] bg-white py-2 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
                <I className="size-4 text-navy-800" aria-hidden />
                <span className="text-[8px] text-mist-600">{l}</span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-[10px] font-semibold">오늘의 예약</p>
          <ul className="mt-2 space-y-2">
            {[
              { t: "07:00", n: "골프 3번 타석", s: "확정" },
              { t: "19:30", n: "필라테스 B반", s: "대기 2" },
            ].map((r) => (
              <li key={r.n} className="flex items-center justify-between rounded-[6px] bg-white p-2.5 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
                <div>
                  <p className="t-num text-[11px] font-semibold">{r.t}</p>
                  <p className="text-[9px] text-mist-500">{r.n}</p>
                </div>
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-[8px] font-semibold",
                    r.s === "확정" ? "bg-signal-soft text-signal" : "bg-mist-100 text-mist-600",
                  )}
                >
                  {r.s}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-3 rounded-[6px] border border-dashed border-mist-300 p-2.5">
            <p className="text-[9px] font-semibold">공지</p>
            <p className="mt-0.5 text-[8.5px] leading-snug text-mist-500">사우나 정기 점검 안내 (수요일 10:00–14:00)</p>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

/* ------------------------------------------------------------------ Face terminal */
export function FaceTerminalMockup({ className }: { className?: string }) {
  return (
    <div className={cn("w-[10.5rem]", className)} role="img" aria-label="HILINK 안면인식 출입 단말기 예시: 얼굴 인증 완료 화면">
      <div className="rounded-[14px] border border-white/15 bg-[#0a0d13] p-2 shadow-[0_40px_80px_-24px_rgba(0,0,0,0.7)]">
        <div className="mx-auto mb-1.5 size-1.5 rounded-full bg-white/20" aria-hidden />
        <div className="relative aspect-[3/4.4] overflow-hidden rounded-[8px] bg-gradient-to-b from-[#16233b] to-[#0b1220]">
          <svg viewBox="0 0 100 140" className="absolute inset-0 size-full" aria-hidden>
            <g fill="none" stroke="var(--color-signal-light)" strokeWidth="1.4">
              <path d="M22 30 V22 H30 M70 22 H78 V30 M78 92 V100 H70 M30 100 H22 V92" />
            </g>
            <ellipse cx="50" cy="56" rx="17" ry="21" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
            <path d="M28 104 C32 86 68 86 72 104" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
            <g fill="var(--color-signal-light)" opacity=".8">
              <circle cx="43" cy="52" r="0.9" />
              <circle cx="57" cy="52" r="0.9" />
              <circle cx="50" cy="60" r="0.9" />
              <circle cx="45" cy="67" r="0.9" />
              <circle cx="55" cy="67" r="0.9" />
            </g>
          </svg>
          <div className="animate-scroll-cue absolute inset-x-6 top-0 h-full" aria-hidden>
            <div className="h-px w-full bg-gradient-to-r from-transparent via-signal-light to-transparent" />
          </div>
          <div className="absolute inset-x-2 bottom-2 rounded-[4px] bg-emerald-500/15 px-2 py-1.5 text-center text-white">
            <p className="flex items-center justify-center gap-1 text-[9px] font-semibold text-emerald-300">
              <Check className="size-3" aria-hidden /> 인증되었습니다
            </p>
            <p className="text-[8px] text-white/60">피트니스 · 이용권 D-42</p>
          </div>
        </div>
        <p className="mt-1.5 text-center text-[8px] tracking-[0.2em] text-white/35">HILINK FACE</p>
      </div>
      <div className="mx-auto h-10 w-3 bg-gradient-to-b from-[#1b2230] to-transparent" aria-hidden />
    </div>
  );
}

/* ------------------------------------------------------------------ Booking */
export function BookingMockup({ className }: { className?: string }) {
  const bays = ["1번", "2번", "3번", "4번", "5번", "6번"];
  const slots = ["06:00", "06:30", "07:00", "07:30", "08:00"];
  const taken = new Set(["0-0", "0-2", "1-1", "2-0", "2-1", "2-3", "3-2", "4-0", "4-4", "5-1", "5-2"]);
  return (
    <BrowserFrame className={className} url="admin.hilink / 예약">
      <div className="p-4 text-white" role="img" aria-label="HILINK 골프 타석 예약 현황 화면 예시">
        <div className="flex items-center justify-between">
          <p className="text-[12px] font-semibold">골프 타석 예약</p>
          <div className="flex items-center gap-2">
            <DemoChip />
            <div className="flex rounded-[3px] bg-white/5 p-0.5 text-[9px]">
              <span className="rounded-[2px] bg-signal px-2 py-0.5">타석</span>
              <span className="px-2 py-0.5 text-white/45">GX</span>
              <span className="px-2 py-0.5 text-white/45">좌석</span>
              <span className="px-2 py-0.5 text-white/45">대관</span>
            </div>
          </div>
        </div>
        <div className="mt-4 overflow-hidden">
          <div className="grid grid-cols-[3rem_repeat(6,1fr)] gap-1 text-[9px]">
            <span />
            {bays.map((b) => (
              <span key={b} className="text-center text-white/40">
                {b}
              </span>
            ))}
            {slots.map((s, si) => (
              <div key={s} className="contents">
                <span className="t-num flex items-center text-white/40">{s}</span>
                {bays.map((b, bi) => {
                  const isTaken = taken.has(`${bi}-${si}`);
                  const mine = bi === 2 && si === 2;
                  return (
                    <span
                      key={b + s}
                      className={cn(
                        "h-6 rounded-[2px] border",
                        mine
                          ? "border-signal bg-signal/40"
                          : isTaken
                            ? "border-white/5 bg-white/15"
                            : "border-white/10 bg-transparent",
                      )}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-4 text-[9px] text-white/45">
          <span className="flex items-center gap-1.5"><span className="size-2 bg-white/15" />예약됨</span>
          <span className="flex items-center gap-1.5"><span className="size-2 border border-white/20" />예약 가능</span>
          <span className="flex items-center gap-1.5"><span className="size-2 bg-signal/60" />선택</span>
          <span className="ml-auto">세대별 1일 1회 · 노쇼 3회 시 7일 제한</span>
        </div>
      </div>
    </BrowserFrame>
  );
}

/* ------------------------------------------------------------------ Analytics */
export function AnalyticsMockup({ className }: { className?: string }) {
  const line = [30, 34, 33, 40, 44, 42, 50, 56, 55, 62, 66, 72];
  const max = 80;
  const pts = line.map((v, i) => `${(i / (line.length - 1)) * 100},${100 - (v / max) * 100}`).join(" ");
  return (
    <BrowserFrame className={className} url="admin.hilink / 통계">
      <div className="p-4 text-white" role="img" aria-label="HILINK 월별 이용 · 매출 통계 화면 예시">
        <div className="flex items-center justify-between">
          <p className="text-[12px] font-semibold">월간 운영 리포트</p>
          <DemoChip />
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {[
            ["월 이용 건수", "12,480"],
            ["예약률", "84%"],
            ["노쇼율", "3.2%"],
          ].map(([k, v]) => (
            <div key={k} className="rounded-[4px] border border-white/5 bg-white/[0.03] p-2.5">
              <p className="text-[9px] text-white/40">{k}</p>
              <p className="t-num mt-1 text-[15px] font-semibold">{v}</p>
            </div>
          ))}
        </div>
        <div className="mt-2 rounded-[4px] border border-white/5 bg-white/[0.03] p-3">
          <p className="text-[10px] text-white/60">월별 이용 추이</p>
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="mt-2 h-24 w-full" aria-hidden>
            {[25, 50, 75].map((y) => (
              <line key={y} x1="0" x2="100" y1={y} y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
            ))}
            <polyline points={`0,100 ${pts} 100,100`} fill="rgba(58,109,255,0.15)" stroke="none" />
            <polyline points={pts} fill="none" stroke="var(--color-signal-light)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
          </svg>
          <div className="mt-1 flex justify-between text-[8px] text-white/30">
            <span>1월</span>
            <span>6월</span>
            <span>12월</span>
          </div>
        </div>
        <div className="mt-2 grid grid-cols-2 gap-2 text-[9px]">
          {[
            ["피트니스", 42],
            ["골프", 31],
            ["GX · 필라테스", 18],
            ["기타", 9],
          ].map(([n, p]) => (
            <div key={n as string} className="flex items-center gap-2 text-white/55">
              <span className="w-16 shrink-0">{n}</span>
              <div className="h-1 flex-1 bg-white/5">
                <div className="h-full bg-white/45" style={{ width: `${p}%` }} />
              </div>
              <span className="t-num w-6 text-right">{p}%</span>
            </div>
          ))}
        </div>
      </div>
    </BrowserFrame>
  );
}

/* ------------------------------------------------------------------ Access log */
export function AccessMockup({ className }: { className?: string }) {
  return (
    <div className={cn("grid items-end gap-4 sm:grid-cols-[auto_1fr]", className)}>
      <FaceTerminalMockup className="mx-auto sm:mx-0" />
      <BrowserFrame url="admin.hilink / 출입">
        <div className="p-4 text-white" role="img" aria-label="HILINK 출입 기록 화면 예시">
          <div className="flex items-center justify-between">
            <p className="text-[12px] font-semibold">출입 기록</p>
            <div className="flex items-center gap-2">
              <DemoChip />
              <div className="flex items-center gap-1 rounded-[3px] bg-white/5 px-2 py-1 text-[9px] text-white/40">
                <Search className="size-3" aria-hidden /> 동 · 호수 검색
              </div>
            </div>
          </div>
          <ul className="mt-3 divide-y divide-white/5 text-[9.5px]">
            {[
              ["07:42:10", "피트니스", "승인", "이용권 유효"],
              ["07:41:55", "사우나", "승인", "이용권 유효"],
              ["07:40:02", "피트니스", "거부", "이용권 만료"],
              ["07:38:47", "독서실", "승인", "좌석 A-12"],
              ["07:36:20", "GX룸", "승인", "예약 확인"],
            ].map((r) => (
              <li key={r[0]} className="grid grid-cols-[4.5rem_1fr_auto] items-center gap-3 py-2 text-white/55">
                <span className="t-num">{r[0]}</span>
                <span>
                  {r[1]} <span className="text-white/30">· {r[3]}</span>
                </span>
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-[8.5px] font-semibold",
                    r[2] === "승인" ? "bg-emerald-400/15 text-emerald-300" : "bg-red-400/15 text-red-300",
                  )}
                >
                  {r[2]}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </BrowserFrame>
    </div>
  );
}
