import { cn } from "@/lib/cn";

type Props = {
  label?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  id?: string;
  as?: "h1" | "h2";
  className?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
};

/** 섹션 제목 — 짧은 한글 라벨 + 한글 제목 + 설명 */
export function SectionHeader({ label, title, description, id, as: Tag = "h2", className, align = "left", tone = "light" }: Props) {
  const dark = tone === "dark";
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {label && <p className={cn("t-label", dark ? "text-white/70" : "text-brand")}>{label}</p>}
      <Tag id={id} className={cn("t-h2 sm:whitespace-pre-line", label && "mt-3", dark ? "text-white" : "text-ink")}>
        {title}
      </Tag>
      {description && <div className={cn("t-lead mt-5", dark ? "text-white/75" : "text-body")}>{description}</div>}
    </div>
  );
}
