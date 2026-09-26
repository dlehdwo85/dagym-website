import Image from "next/image";
import { hilinkDemo, type HilinkDemoId } from "@/data/hilinkDemo";
import { cn } from "@/lib/cn";

/**
 * HILINK 공개 데모 스크린샷 프레임 — HILINK 공개 사이트의 PhoneShot 과 같은 모양
 * (잉크 베젤 5px · 라운드 · 흰 인셋). 화면 UI 는 HILINK 디자인 그대로 둡니다.
 */
export function DemoPhone({
  id,
  className,
  priority,
  sizes = "(min-width: 1024px) 240px, 60vw",
}: {
  id: HilinkDemoId;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const d = hilinkDemo[id];
  return (
    <div className={cn("overflow-hidden rounded-[1.9rem] border-[5px] border-[#0b1220] bg-white p-1.5 shadow-[0_40px_80px_-40px_rgba(11,18,32,0.55)]", className)}>
      <Image src={d.src} alt={d.alt} width={d.width} height={d.height} priority={priority} sizes={sizes} className="h-auto w-full rounded-[0.95rem]" />
    </div>
  );
}
