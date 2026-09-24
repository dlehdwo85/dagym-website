import { Plus } from "lucide-react";
import type { Faq } from "@/data/insight";
import { JsonLd } from "@/components/ui/JsonLd";

/** FAQ — 네이티브 <details> (키보드 · 스크린리더 지원, JS 불필요) */
export function FaqList({ items, withSchema = true }: { items: Faq[]; withSchema?: boolean }) {
  return (
    <div>
      {withSchema && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
          }}
        />
      )}
      <ul className="border-t border-ink">
        {items.map((f) => (
          <li key={f.q} className="border-b border-line">
            <details className="group">
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
                <span className="text-[1.0625rem] font-semibold tracking-[-0.015em]">{f.q}</span>
                <Plus className="size-5 shrink-0 text-muted transition-transform duration-200 group-open:rotate-45" aria-hidden />
              </summary>
              <p className="t-body max-w-3xl pb-6 text-body">{f.a}</p>
            </details>
          </li>
        ))}
      </ul>
    </div>
  );
}
