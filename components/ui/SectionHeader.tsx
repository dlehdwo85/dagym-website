import { MaskText } from "@/components/motion/MaskText";
import { cn } from "@/lib/cn";

type Props = {
  /** 영문 대문자 라벨 */
  eyebrow?: string;
  /** 이전 버전 호환 (한글 라벨) */
  label?: string;
  title: string;
  description?: React.ReactNode;
  id?: string;
  tone?: "light" | "dark";
  size?: "section" | "h2";
  className?: string;
};

export function SectionHeader({ eyebrow, label, title, description, id, tone = "light", size = "section", className }: Props) {
  const dark = tone === "dark";
  return (
    <div className={cn("max-w-4xl", className)}>
      {(eyebrow || label) && <p className={cn("eyebrow", dark ? "text-white/45" : "text-steel")}>{eyebrow ?? label}</p>}
      <MaskText id={id} text={title} className={cn(size === "section" ? "t-section" : "t-h2", "mt-5")} />
      {description && <p className={cn("t-lead mt-7 max-w-2xl", dark ? "text-white/65" : "text-body")}>{description}</p>}
    </div>
  );
}
