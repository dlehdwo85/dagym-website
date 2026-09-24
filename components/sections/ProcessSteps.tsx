import { cn } from "@/lib/cn";

type Step = { title: string; body: string };

/** 번호가 붙은 단계 목록 — 카드 대신 구분선 목록 */
export function ProcessSteps({ steps, columns = 3 }: { steps: Step[]; columns?: 2 | 3 }) {
  return (
    <ol className={cn("grid gap-x-10 border-t border-ink sm:grid-cols-2", columns === 3 && "lg:grid-cols-3")}>
      {steps.map((s, i) => (
        <li key={s.title} className="border-b border-line py-7">
          <p className="text-sm font-semibold text-brand">{String(i + 1).padStart(2, "0")}</p>
          <h3 className="t-h4 mt-2">{s.title}</h3>
          <p className="t-body mt-2 text-body">{s.body}</p>
        </li>
      ))}
    </ol>
  );
}
