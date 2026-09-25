import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

type Props = {
  /** 한글 소제목 */
  eyebrow?: string;
  /** 이전 버전 호환 */
  label?: string;
  /** 보조 영문 라벨 (선택) */
  en?: string;
  title: string;
  description?: React.ReactNode;
  id?: string;
  tone?: "light" | "dark";
  size?: "section" | "h2";
  align?: "left" | "center";
  className?: string;
};

/** 섹션 머리 — 소제목 → 제목 → 리드 문장 3단 구조 */
export function SectionHeader({ eyebrow, label, en, title, description, id, tone = "light", size = "section", align = "left", className }: Props) {
  const dark = tone === "dark";
  const kicker = eyebrow ?? label;
  return (
    <Reveal className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {(kicker || en) && (
        <p className={cn("flex items-center gap-3", align === "center" && "justify-center")}>
          {kicker && <span className={cn("eyebrow", dark && "!text-[#9dbcf0]")}>{kicker}</span>}
          {en && <span className={cn("label-en", dark ? "text-white/40" : "text-steel")}>{en}</span>}
        </p>
      )}
      <h2 id={id} className={cn(size === "section" ? "t-section" : "t-h2", "mt-4 sm:whitespace-pre-line", dark ? "text-white" : "text-ink")}>
        {title}
      </h2>
      {description && <p className={cn("t-lead mt-5", dark ? "text-white/70" : "text-body")}>{description}</p>}
    </Reveal>
  );
}
