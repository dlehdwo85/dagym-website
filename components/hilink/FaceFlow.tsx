import { DoorOpen, ScanFace, Smartphone, Ticket } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * 얼굴 자가등록 흐름 — HILINK 공개 사이트(출입 섹션)의 표현과 같은 4단계.
 * 실제 개인정보 화면 · 단말기 캡처는 사용하지 않습니다.
 */
const steps = [
  { label: "앱에서 얼굴 등록", Icon: Smartphone },
  { label: "등록 완료 · 이용권 확인", Icon: Ticket },
  { label: "출입 단말 안면 인증", Icon: ScanFace },
  { label: "문 열림 — 출입 기록 자동 수집", Icon: DoorOpen },
];

export function FaceFlow({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-2xl border border-white/10 bg-white/5 p-6", className)}>
      <p className="text-[1.0625rem] font-bold text-white">얼굴 등록도 입주민이 직접.</p>
      <p className="mt-1.5 text-sm text-white/65">현장 방문 없이 앱에서 안면정보를 등록하고 시설 이용권한과 연결합니다.</p>
      <ol className="mt-5 space-y-2.5" aria-label="얼굴 자가등록 후 출입까지의 흐름">
        {steps.map(({ label, Icon }, i) => (
          <li key={label} className="flex items-center gap-3">
            <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-[#2563eb]/25 text-[#93bbfd]">
              <Icon className="size-4" aria-hidden />
            </span>
            <span className="text-sm font-semibold text-white/90">
              <span className="mr-2 text-xs text-white/40">{String(i + 1).padStart(2, "0")}</span>
              {label}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
