import Image from "next/image";
import { Camera } from "lucide-react";
import { photos, type PhotoId } from "@/data/photos";
import { hasPhoto, showPhotoSlots } from "@/lib/photos";
import { cn } from "@/lib/cn";

type Props = {
  id: PhotoId;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

/**
 * 실제 사진 슬롯.
 * - 사진 파일이 있으면 next/image 로 렌더링
 * - 없으면 방문자에게는 아무것도 렌더링하지 않음 (null)
 * - 개발/검수 모드에서는 필요한 사진 규격을 점선 박스로 안내
 */
export function Photo({ id, className, sizes = "(min-width: 1024px) 50vw, 100vw", priority }: Props) {
  const slot = photos[id];
  if (hasPhoto(id)) {
    return (
      <div className={cn("relative overflow-hidden bg-paper-deep", className)}>
        <Image
          src={slot.file}
          alt={slot.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
          style={"focus" in slot && slot.focus ? { objectPosition: slot.focus } : undefined}
        />
      </div>
    );
  }
  if (!showPhotoSlots) return null;
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center gap-2 border-2 border-dashed border-line-strong bg-paper p-6 text-center",
        className,
      )}
      data-photo-slot={id}
    >
      <Camera className="size-6 text-muted" aria-hidden />
      <p className="text-sm font-semibold text-ink">사진 필요 · {id}</p>
      <p className="max-w-xs text-xs leading-relaxed text-muted">{slot.subject}</p>
      <p className="text-xs text-muted">
        {slot.size} · {slot.ratio}
      </p>
      <code className="mt-1 text-[11px] text-muted">public{slot.file}</code>
    </div>
  );
}

/** 사진 유무를 서버에서 판별해 레이아웃을 바꿀 때 사용 */
export function photoVisible(id: PhotoId) {
  return hasPhoto(id) || showPhotoSlots;
}
