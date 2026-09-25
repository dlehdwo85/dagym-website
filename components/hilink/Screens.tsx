import { Check, ScanFace } from "lucide-react";
import type { HilinkScreen } from "@/data/hilink";
import { cn } from "@/lib/cn";

/**
 * HILINK 기능 설명용 화면 구성 예시.
 * - 실제 수치 · 이름 · 현장명을 넣지 않고, 기능 라벨과 빈 막대만으로 화면 구조를 보여줍니다.
 * - 실제 캡처가 준비되면 data/photos.ts 의 hilink-* 슬롯으로 교체됩니다.
 */

function Bar({ w, className }: { w: string; className?: string }) {
  return <span className={cn("block h-2 rounded-[2px] bg-white/12", className)} style={{ width: w }} />;
}

function Chip({ children, tone = "muted" }: { children: React.ReactNode; tone?: "muted" | "on" | "off" }) {
  return (
    <span
      className={cn(
        "inline-flex h-5 items-center rounded-[2px] px-1.5 text-[10px] font-semibold",
        tone === "on" && "bg-signal/20 text-signal",
        tone === "off" && "bg-white/8 text-white/40",
        tone === "muted" && "bg-white/10 text-white/70",
      )}
    >
      {children}
    </span>
  );
}

/** 휴대폰 화면 틀 */
export function PhoneFrame({ children, title, className }: { children: React.ReactNode; title: string; className?: string }) {
  return (
    <div className={cn("flex aspect-[9/19] w-full flex-col overflow-hidden rounded-[8px] border border-white/12 bg-[#12161d] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)]", className)}>
      <div className="flex items-center justify-between px-4 pb-2 pt-3 font-display text-[10px] text-white/50">
        <span>HILINK</span>
        <span className="h-1 w-8 rounded-[2px] bg-white/20" />
      </div>
      <p className="px-4 pb-3 text-[13px] font-semibold text-white">{title}</p>
      <div className="flex-1 px-4 pb-4">{children}</div>
    </div>
  );
}

function MemberScreen() {
  const rows: [string, "on" | "off"][] = [
    ["이용중", "on"],
    ["이용중", "on"],
    ["만료", "off"],
    ["이용중", "on"],
    ["일시정지", "off"],
  ];
  return (
    <div className="space-y-2">
      {rows.map(([s, t], i) => (
        <div key={i} className="flex items-center gap-2.5 rounded-[2px] border border-white/8 p-2.5">
          <span className="size-6 shrink-0 rounded-[2px] bg-white/10" />
          <div className="flex-1 space-y-1.5">
            <Bar w="60%" />
            <Bar w="35%" className="bg-white/6" />
          </div>
          <Chip tone={t}>{s}</Chip>
        </div>
      ))}
      <div className="grid grid-cols-2 gap-2 pt-1 text-[10px] text-white/60">
        <span className="rounded-[2px] border border-white/8 p-2">이용권</span>
        <span className="rounded-[2px] border border-white/8 p-2">락커</span>
      </div>
    </div>
  );
}

function FaceScreen() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <div className="relative grid aspect-square w-3/4 place-items-center">
        {["left-0 top-0 border-l border-t", "right-0 top-0 border-r border-t", "bottom-0 left-0 border-b border-l", "bottom-0 right-0 border-b border-r"].map((c) => (
          <span key={c} className={cn("absolute size-6 border-signal", c)} />
        ))}
        <ScanFace className="size-16 text-white/35" strokeWidth={1} aria-hidden />
      </div>
      <p className="text-center text-[11px] leading-relaxed text-white/60">얼굴을 화면 안에 맞춰 주세요</p>
      <span className="h-8 w-full rounded-[2px] bg-signal/90 text-center text-[11px] font-semibold leading-8 text-navy-deep">등록하기</span>
    </div>
  );
}

function AccessScreen() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
      <div className="grid size-20 place-items-center rounded-[4px] border border-signal/50">
        <ScanFace className="size-10 text-signal" strokeWidth={1.25} aria-hidden />
      </div>
      <div className="flex items-center gap-1.5 text-[12px] font-semibold text-white">
        <Check className="size-3.5 text-signal" aria-hidden />
        출입 확인
      </div>
      <div className="w-full space-y-1.5 rounded-[2px] border border-white/8 p-3 text-left text-[10px] text-white/60">
        <p className="flex justify-between">
          이용권 <Chip tone="on">유효</Chip>
        </p>
        <p className="flex justify-between">
          출입 구역 <Chip>헬스 · GX</Chip>
        </p>
      </div>
    </div>
  );
}

function ReservationScreen() {
  const tabs = ["GX", "골프 타석", "독서실", "게스트룸"];
  const slots = ["on", "", "off", "", "", "off", "", "on", "", "off", "", ""];
  return (
    <div className="space-y-3">
      <div className="flex gap-1 overflow-hidden">
        {tabs.map((t, i) => (
          <span key={t} className={cn("shrink-0 rounded-[2px] px-2 py-1 text-[10px]", i === 1 ? "bg-white text-ink" : "bg-white/8 text-white/60")}>
            {t}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        {slots.map((s, i) => (
          <span
            key={i}
            className={cn(
              "h-7 rounded-[2px] border",
              s === "on" && "border-signal bg-signal/25",
              s === "off" && "border-white/5 bg-white/5 [background-image:repeating-linear-gradient(135deg,transparent_0_4px,rgba(255,255,255,0.06)_4px_5px)]",
              s === "" && "border-white/12",
            )}
          />
        ))}
      </div>
      <div className="flex gap-3 text-[9px] text-white/50">
        <span className="flex items-center gap-1">
          <i className="size-2 rounded-[1px] border border-white/30" /> 예약 가능
        </span>
        <span className="flex items-center gap-1">
          <i className="size-2 rounded-[1px] bg-signal" /> 선택
        </span>
        <span className="flex items-center gap-1">
          <i className="size-2 rounded-[1px] bg-white/15" /> 마감
        </span>
      </div>
      <span className="block h-8 w-full rounded-[2px] bg-signal/90 text-center text-[11px] font-semibold leading-8 text-navy-deep">예약하기</span>
    </div>
  );
}

function PaymentScreen() {
  const rows = ["월 이용료", "중도 가입 일할 계산", "중도 해지 일할 계산", "관리비 정산 반영"];
  return (
    <div className="space-y-2">
      {rows.map((r, i) => (
        <div key={r} className="flex items-center justify-between rounded-[2px] border border-white/8 p-2.5 text-[10px] text-white/70">
          {r}
          <Bar w={`${30 + i * 8}%`} className="max-w-16" />
        </div>
      ))}
      <div className="grid grid-cols-3 gap-1.5 pt-1 text-center text-[9px] text-white/55">
        {["카드", "관리비", "현장"].map((m) => (
          <span key={m} className="rounded-[2px] bg-white/6 py-2">
            {m}
          </span>
        ))}
      </div>
    </div>
  );
}

function DataScreen() {
  const bars = [42, 58, 50, 72, 64, 80, 68];
  return (
    <div className="space-y-3">
      <div className="flex h-28 items-end gap-1.5 border-b border-white/10 pb-1">
        {bars.map((h, i) => (
          <span key={i} className={cn("flex-1 rounded-t-[2px]", i === 5 ? "bg-signal" : "bg-white/15")} style={{ height: `${h}%` }} />
        ))}
      </div>
      <div className="flex gap-3 text-[9px] text-white/50">
        {["기간", "종목", "결제 방법"].map((l) => (
          <span key={l}>{l}</span>
        ))}
      </div>
      <div className="space-y-1.5">
        <Bar w="90%" />
        <Bar w="70%" className="bg-white/6" />
        <Bar w="80%" className="bg-white/6" />
      </div>
    </div>
  );
}

export function ScreenBody({ screen }: { screen: HilinkScreen }) {
  switch (screen) {
    case "member":
      return <MemberScreen />;
    case "face":
      return <FaceScreen />;
    case "access":
      return <AccessScreen />;
    case "reservation":
      return <ReservationScreen />;
    case "payment":
      return <PaymentScreen />;
    case "data":
      return <DataScreen />;
  }
}

const screenTitle: Record<HilinkScreen, string> = {
  member: "회원 관리",
  face: "얼굴 등록",
  access: "출입",
  reservation: "시설 예약",
  payment: "이용료 정산",
  data: "운영 현황",
};

export function PhoneScreen({ screen, className }: { screen: HilinkScreen; className?: string }) {
  return (
    <PhoneFrame title={screenTitle[screen]} className={className}>
      <ScreenBody screen={screen} />
    </PhoneFrame>
  );
}

/** 관리자 CRM 화면 구성 예시 */
export function AdminScreen({ className }: { className?: string }) {
  const menu = ["회원", "출입", "예약", "락커", "정산", "공지", "민원", "통계"];
  return (
    <div className={cn("overflow-hidden rounded-[8px] border border-white/12 bg-[#12161d] shadow-[0_50px_100px_-40px_rgba(0,0,0,0.8)]", className)}>
      <div className="flex items-center gap-1.5 border-b border-white/8 px-4 py-2.5">
        {[0, 1, 2].map((i) => (
          <span key={i} className="size-2 rounded-full bg-white/15" />
        ))}
        <span className="ml-3 font-display text-[10px] tracking-[0.12em] text-white/45">HILINK ADMIN</span>
      </div>
      <div className="grid grid-cols-[7.5rem_1fr]">
        <nav className="space-y-0.5 border-r border-white/8 p-3 text-[11px]">
          {menu.map((m, i) => (
            <p key={m} className={cn("rounded-[2px] px-2.5 py-1.5", i === 7 ? "bg-white/10 text-white" : "text-white/50")}>
              {m}
            </p>
          ))}
        </nav>
        <div className="space-y-4 p-4">
          <div className="grid grid-cols-3 gap-2.5">
            {["이용 현황", "예약", "정산"].map((k) => (
              <div key={k} className="rounded-[2px] border border-white/8 p-3">
                <p className="text-[10px] text-white/50">{k}</p>
                <Bar w="55%" className="mt-2.5 h-3 bg-white/15" />
              </div>
            ))}
          </div>
          <div className="rounded-[2px] border border-white/8 p-3">
            <div className="flex h-24 items-end gap-1">
              {[30, 45, 38, 60, 52, 70, 64, 76, 58, 82, 74, 88].map((h, i) => (
                <span key={i} className={cn("flex-1 rounded-t-[1px]", i === 11 ? "bg-signal" : "bg-white/14")} style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
          <div className="space-y-2">
            {[0, 1, 2].map((r) => (
              <div key={r} className="grid grid-cols-[1fr_1fr_3rem] items-center gap-3 border-b border-white/6 pb-2">
                <Bar w="80%" />
                <Bar w="60%" className="bg-white/6" />
                <Chip tone={r === 2 ? "off" : "on"}>{r === 2 ? "대기" : "완료"}</Chip>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export const SCREEN_NOTE = "기능 설명을 위한 화면 구성 예시입니다. 실제 화면과 다를 수 있습니다.";
