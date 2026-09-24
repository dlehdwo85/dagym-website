import { cn } from "@/lib/cn";
import { Reveal } from "./Reveal";

type Props = {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center" | "split";
  tone?: "light" | "dark";
  as?: "h1" | "h2";
  className?: string;
  action?: React.ReactNode;
  index?: string;
  id?: string;
};

/**
 * 섹션 제목 — eyebrow(영문 키워드) + 국문 대형 헤드라인 + 설명.
 * align="split" 은 데스크톱에서 제목과 설명을 좌우로 배치합니다.
 */
export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  as: Tag = "h2",
  className,
  action,
  index,
  id,
}: Props) {
  const dark = tone === "dark";
  return (
    <div
      className={cn(
        align === "center" && "mx-auto max-w-3xl text-center",
        align === "split" && "grid gap-8 lg:grid-cols-12 lg:items-end",
        className,
      )}
    >
      <div className={cn(align === "split" && "lg:col-span-7")}>
        <Reveal>
          <p
            className={cn(
              "t-eyebrow flex items-center gap-3",
              align === "center" && "justify-center",
              dark ? "text-accent-light" : "text-accent",
            )}
          >
            {index && <span className={cn("t-num", dark ? "text-white/40" : "text-mist-400")}>{index}</span>}
            <span aria-hidden className={cn("h-px w-8", dark ? "bg-accent-light/60" : "bg-accent/60")} />
            {eyebrow}
          </p>
        </Reveal>
        <Reveal delay={60}>
          <Tag id={id} className={cn("t-h2 mt-6 whitespace-pre-line", dark ? "text-white" : "text-ink")}>{title}</Tag>
        </Reveal>
      </div>
      {(description || action) && (
        <div className={cn(align === "split" ? "lg:col-span-5 lg:pb-2" : "mt-6")}>
          {description && (
            <Reveal delay={120}>
              <div
                className={cn(
                  "t-lead max-w-2xl",
                  align === "center" && "mx-auto",
                  dark ? "text-white/65" : "text-mist-600",
                )}
              >
                {description}
              </div>
            </Reveal>
          )}
          {action && (
            <Reveal delay={160}>
              <div className={cn("mt-8", align === "center" && "flex justify-center")}>{action}</div>
            </Reveal>
          )}
        </div>
      )}
    </div>
  );
}
