import { Camera, Video } from "lucide-react";
import { Photo } from "@/components/ui/Photo";
import { VideoPlayer } from "@/components/ui/VideoPlayer";
import { photos, type PhotoId, type PhotoSlot } from "@/data/photos";
import { videos, type VideoId } from "@/data/videos";
import { hasPhoto, showPhotoSlots } from "@/lib/photos";
import { getPlayableVideo } from "@/lib/videos";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/ui/Reveal";

/** 커뮤니티 복합시설 구성 — 한 시설당 사진 또는 영상 하나 (같은 시설 반복 없음) */
const facilityMedia: { name: string; photo: PhotoId; video?: VideoId }[] = [
  { name: "수영장", photo: "facility-pool" },
  { name: "헬스장", photo: "facility-fitness", video: "video-fitness" },
  { name: "골프연습장", photo: "facility-golf", video: "video-golf" },
  { name: "GX룸", photo: "facility-gx", video: "video-gx" },
  { name: "카페", photo: "facility-cafe", video: "video-cafe" },
  { name: "작은도서관", photo: "facility-library", video: "video-library" },
  { name: "게스트하우스", photo: "facility-guesthouse", video: "video-guesthouse" },
];

function Caption({ name, isVideo, siteName }: { name: string; isVideo: boolean; siteName?: string }) {
  return (
    <figcaption className="mt-3 flex items-center justify-between gap-3 text-[0.9375rem]">
      <span className="font-semibold">{name}</span>
      <span className="text-sm text-muted">{isVideo ? "영상" : siteName ? siteName : ""}</span>
    </figcaption>
  );
}

/**
 * 운영 시설 사진 · 영상 갤러리.
 * 실제 파일이 있는 시설만 보여주며, 하나도 없으면 섹션 전체를 숨깁니다.
 * 출처가 "dagym-site" 이고 현장명이 있는 경우에만 현장명을 표기합니다.
 */
export function FacilityMedia({ title, description, id }: { title: string; description?: string; id: string }) {
  const items = facilityMedia
    .map((f) => {
      const video = f.video ? getPlayableVideo(f.video) : null;
      if (video) return { ...f, kind: "video" as const, video };
      if (hasPhoto(f.photo)) return { ...f, kind: "photo" as const };
      if (showPhotoSlots) return { ...f, kind: "slot" as const };
      return null;
    })
    .filter((x) => x !== null);

  // 시설 범위를 보여주는 섹션이므로 실제 사진 · 영상이 3개 시설 이상일 때만 노출 (검수 모드 제외)
  const realCount = items.filter((i) => i.kind !== "slot").length;
  if (!showPhotoSlots && realCount < 3) return null;
  if (items.length === 0) return null;
  // 4열 그리드에서 마지막 줄이 비지 않도록, 개수가 4n+3 이면 첫 타일을 2칸으로
  const featureFirst = items.length % 4 === 3;

  return (
    <section className="section-y bg-white" aria-labelledby={id}>
      <div className="container-x">
        <div className="max-w-3xl">
          <p className="t-label text-brand">운영 시설</p>
          <h2 id={id} className="t-h2 mt-3 sm:whitespace-pre-line">
            {title}
          </h2>
          {description && <p className="t-lead mt-5 text-body">{description}</p>}
        </div>
        <ul className="mt-12 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => {
            const big = featureFirst && i === 0;
            const aspect = big ? "aspect-[4/3] sm:aspect-[2.75/1] lg:aspect-[2.85/1]" : "aspect-[4/3]";
            const photoSlot: PhotoSlot = photos[it.photo];
            const siteName = photoSlot.provenance === "dagym-site" ? photoSlot.siteName : undefined;
            return (
              <Reveal as="li" key={it.name} delay={(i % 4) * 70} className={cn(big && "sm:col-span-2")}>
                <figure>
                  {it.kind === "video" && (
                    <VideoPlayer
                      mode={it.video.mode}
                      src={it.video.mode === "file" ? it.video.file : (it.video.embedUrl as string)}
                      poster={it.video.poster}
                      title={`${it.name} ${it.video.title}`}
                      className={aspect}
                    />
                  )}
                  {it.kind === "photo" && <Photo id={it.photo} className={cn("visual-frame", aspect)} />}
                  {it.kind === "slot" && (
                    <div
                      data-photo-slot={it.photo}
                      className={cn("flex flex-col items-center justify-center gap-1.5 border-2 border-dashed border-line-strong bg-paper p-5 text-center", aspect)}
                    >
                      <span className="flex items-center gap-2 text-muted">
                        <Camera className="size-5" aria-hidden />
                        {it.video && <Video className="size-5" aria-hidden />}
                      </span>
                      <p className="text-sm font-semibold">
                        {it.video ? "영상 또는 사진 필요" : "사진 필요"} · {it.name}
                      </p>
                      <code className="text-[11px] text-muted">public{photoSlot.file}</code>
                      {it.video && <code className="text-[11px] text-muted">public{videos[it.video].file} + {videos[it.video].poster}</code>}
                    </div>
                  )}
                  <Caption name={it.name} isVideo={it.kind === "video"} siteName={siteName} />
                </figure>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
