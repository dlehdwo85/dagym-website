import Image from "next/image";
import { brandAssets } from "@/data/config";
import { cn } from "@/lib/cn";

/** DAGYM 로고 — 공식 로고 파일(brandAssets)이 있으면 이미지, 없으면 텍스트 워드마크 */
export function Logo({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  const file = tone === "light" ? (brandAssets.dagymWhite ?? brandAssets.dagym) : brandAssets.dagym;
  if (file) {
    return <Image src={file.src} alt="DAGYM 다짐" width={file.width} height={file.height} className={cn("h-7 w-auto", className)} priority />;
  }
  return (
    <span className={cn("inline-flex items-baseline gap-2", tone === "light" ? "text-white" : "text-ink", className)}>
      <span className="text-[1.25rem] font-extrabold tracking-[0.06em]">DAGYM</span>
      <span className={cn("text-[0.8125rem] font-medium", tone === "light" ? "text-white/70" : "text-muted")}>다짐</span>
    </span>
  );
}

/** HILINK 로고 — 제품 로고는 시설 사진과 분리해 HILINK 영역에서만 사용 */
export function HilinkLogo({ className }: { className?: string }) {
  const file = brandAssets.hilink;
  if (!file) return null;
  return <Image src={file.src} alt="HILINK" width={file.width} height={file.height} className={cn("h-10 w-auto", className)} />;
}
