import { Check } from "lucide-react";
import { whyDagym } from "@/data/home";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

type Key = (typeof whyDagym)[number]["key"];

/** 각 경쟁력을 설명하는 작은 UI 비주얼 */
function WhyVisual({ k }: { k: Key }) {
  if (k === "operation") {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-5 p-6" aria-hidden>
        <div className="border border-ink bg-white px-4 py-2 text-[0.8125rem] font-semibold">센터장</div>
        <div className="h-5 w-px bg-mist-300" />
        <div className="relative grid w-full grid-cols-2 gap-2 sm:grid-cols-4">
          <div className="absolute -top-5 left-[12.5%] right-[12.5%] hidden h-px bg-mist-300 sm:block" />
          {["트레이너", "골프 프로", "GX 강사", "안내 · CS"].map((r) => (
            <div key={r} className="border border-mist-300 bg-white px-2 py-2 text-center text-[0.75rem] text-mist-700">
              {r}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 text-[0.6875rem] text-mist-500">
          <span className="size-1.5 rounded-full bg-accent" /> 대체 인력 풀 운영
        </div>
      </div>
    );
  }
  if (k === "technology") {
    return (
      <div className="flex h-full items-center justify-center bg-navy-950 p-6" aria-hidden>
        <div className="grid w-full max-w-sm grid-cols-2 gap-2">
          {["안면인식 출입", "강좌 예약", "타석 · 좌석", "락커", "결제", "공지 · Push"].map((f, i) => (
            <div key={f} className="flex items-center gap-2 border border-white/10 bg-white/[0.04] px-3 py-2.5 text-[0.75rem] text-white/80">
              <span className={cn("size-1.5 rounded-full", i === 0 ? "animate-pulse-dot bg-signal-light" : "bg-signal")} />
              {f}
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (k === "standardization") {
    return (
      <div className="flex h-full items-center justify-center p-6" aria-hidden>
        <div className="w-full max-w-sm border border-mist-200 bg-white p-4 shadow-[0_20px_40px_-24px_rgb(13_26_49/0.25)]">
          <div className="flex items-center justify-between text-[0.75rem]">
            <span className="font-semibold">오픈 체크리스트</span>
            <span className="t-num text-mist-500">06:00</span>
          </div>
          <ul className="mt-3 space-y-2 text-[0.75rem] text-mist-700">
            {["출입 단말기 · 조명 점검", "기구 안전 상태 확인", "락커 · 샤워실 위생 점검", "당일 예약 · 강사 배치 확인"].map((t, i) => (
              <li key={t} className="flex items-center gap-2">
                <span className={cn("flex size-4 items-center justify-center border", i < 3 ? "border-ink bg-ink text-white" : "border-mist-300")}>
                  {i < 3 && <Check className="size-3" />}
                </span>
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-3 h-1 bg-mist-100">
            <div className="h-full w-3/4 bg-accent" />
          </div>
        </div>
      </div>
    );
  }
  const data = [42, 58, 51, 66, 72, 64, 80];
  return (
    <div className="flex h-full items-center justify-center p-6" aria-hidden>
      <div className="w-full max-w-sm">
        <div className="flex items-baseline justify-between">
          <span className="text-[0.75rem] font-semibold">요일별 시설 이용률</span>
          <span className="rounded-[2px] border border-mist-300 px-1.5 text-[0.5625rem] font-semibold tracking-[0.14em] text-mist-500">
            DEMO
          </span>
        </div>
        <div className="mt-4 flex h-32 items-end gap-2 border-b border-mist-300">
          {data.map((v, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-1">
              <div className={cn("w-full", i === 6 ? "bg-accent" : "bg-navy-800/80")} style={{ height: `${v * 1.4}px` }} />
            </div>
          ))}
        </div>
        <div className="mt-2 flex justify-between text-[0.625rem] text-mist-500">
          {["월", "화", "수", "목", "금", "토", "일"].map((d) => (
            <span key={d} className="flex-1 text-center">
              {d}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function WhyDagym() {
  return (
    <section className="section-y bg-mist-50" aria-labelledby="why-title">
      <div className="container-x">
        <SectionHeader
          index="02"
          eyebrow="Why DAGYM"
          id="why-title"
          title={"단순한 시설 관리가 아닌\n운영 전체를 설계합니다."}
          description="사람, 시스템, 프로세스, 데이터. 커뮤니티 운영의 네 가지 요소를 한 회사가 책임질 때 운영 품질이 일정해집니다."
          align="split"
        />
        <ol className="mt-14 grid gap-px bg-mist-200 lg:mt-20 lg:grid-cols-2">
          {whyDagym.map((item, i) => (
            <Reveal as="li" key={item.key} delay={(i % 2) * 90} className="bg-white">
              <article className="grid h-full sm:grid-cols-2">
                <div className="flex flex-col p-7 lg:p-9">
                  <div className="flex items-center gap-3">
                    <span className="t-num text-sm text-mist-400">{String(i + 1).padStart(2, "0")}</span>
                    <span className="t-eyebrow text-accent">{item.en}</span>
                  </div>
                  <h3 className="t-h3 mt-6">{item.title}</h3>
                  <p className="mt-4 text-[0.9375rem] leading-relaxed text-mist-600">{item.body}</p>
                  <ul className="mt-auto space-y-2 pt-7 text-[0.8125rem] text-mist-700">
                    {item.points.map((p) => (
                      <li key={p} className="flex items-center gap-2">
                        <span className="h-px w-3 bg-accent" aria-hidden />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={cn("min-h-60 border-t border-mist-200 sm:border-l sm:border-t-0", item.key !== "technology" && "bg-blueprint-light bg-mist-50")}>
                  <WhyVisual k={item.key} />
                </div>
              </article>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
