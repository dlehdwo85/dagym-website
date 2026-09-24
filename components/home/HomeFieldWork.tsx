import { fieldWork, operationProcess, weeklyVisit } from "@/data/home";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Photo, photoVisible } from "@/components/ui/Photo";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { cn } from "@/lib/cn";

/** 다짐이 현장에서 수행하는 업무와 운영 프로세스 */
export function HomeFieldWork() {
  const showPhoto = photoVisible("home-work");
  return (
    <section className="section-y bg-paper" aria-labelledby="fieldwork-title">
      <div className="container-x">
        <div className={cn("grid gap-12", showPhoto && "lg:grid-cols-12 lg:gap-16")}>
          {showPhoto && <Photo id="home-work" className="aspect-[4/5] lg:col-span-5" />}
          <div className={cn(showPhoto && "lg:col-span-7")}>
            <SectionHeader
              label="현장 업무"
              id="fieldwork-title"
              title={"커뮤니티센터의 하루를\n다짐 직원이 운영합니다."}
              description="아침 오픈부터 저녁 마감까지 현장에 상주하는 인력과, 매주 현장을 확인하는 본사 담당이 역할을 나눠 일합니다."
            />
            <dl className="mt-12 grid gap-x-10 sm:grid-cols-2">
              {fieldWork.map((w) => (
                <div key={w.role} className="border-t border-line-strong py-6">
                  <dt className="t-h4">{w.role}</dt>
                  <dd>
                    <ul className="mt-3 space-y-1.5 text-[0.9875rem] text-body">
                      {w.tasks.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="mt-20 lg:mt-28">
          <h3 className="t-h2">상담부터 정기 보고까지</h3>
          <p className="t-lead mt-4 max-w-3xl text-body">현장을 먼저 확인하고 운영안을 제안합니다. 운영이 시작된 뒤에도 본사가 매주 현장을 점검합니다.</p>
          <div className="mt-10">
            <ProcessSteps steps={operationProcess} />
          </div>
          <div className="mt-12 bg-white p-6 sm:p-8">
            <p className="font-semibold">운영 중 본사 정기 방문</p>
            <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {weeklyVisit.map((v) => (
                <li key={v.week}>
                  <p className="text-sm font-semibold text-brand">{v.week}</p>
                  <p className="mt-1 font-semibold">{v.title}</p>
                  <p className="mt-0.5 text-[0.9375rem] text-body">{v.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
